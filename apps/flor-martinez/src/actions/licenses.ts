'use server';

import { cookies } from 'next/headers';
import {
  createLicenseRecord,
  getAllLicenses,
  deleteLicenseRecord,
  generarMensajeEntrega,
  ADMIN_EMAILS,
  SALT_SEGURIDAD,
  TEMPLATE_COPY_URL,
  getDynamicAdminEmails,
  saveDynamicAdminEmail,
  removeDynamicAdminEmail,
  SpreadsheetLicenseRecord,
} from '@/lib/licensing';
import { getCurrentUserAction, loginUserAction } from './auth';

const ADMIN_COOKIE_NAME = 'fm_admin_session';

export async function checkIsAdminAction(): Promise<{ isAdmin: boolean; email?: string }> {
  const adminEmails = await getDynamicAdminEmails();

  // 1. Verificación por cookie de sesión de Superadmin (funciona siempre, incluso offline)
  try {
    const cookieStore = await cookies();
    const adminEmailCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (adminEmailCookie) {
      const emailLower = adminEmailCookie.toLowerCase().trim();
      if (adminEmails.includes(emailLower)) {
        return { isAdmin: true, email: adminEmailCookie };
      }
    }
  } catch {
    // ignorar error de lectura de cookie
  }

  // 2. Verificación por cookie de sesión del ecosistema de cliente
  try {
    const cookieStore = await cookies();
    const ecosystemSession = cookieStore.get('fm_ecosystem_session_data')?.value;
    if (ecosystemSession) {
      try {
        const parsed = JSON.parse(decodeURIComponent(ecosystemSession));
        if (parsed?.email) {
          const emailLower = parsed.email.toLowerCase().trim();
          if (adminEmails.includes(emailLower)) {
            return { isAdmin: true, email: parsed.email };
          }
        }
      } catch {}
    }
  } catch {
    // ignorar
  }

  // 3. Verificación por sesión de usuario estándar en Base de Datos
  try {
    const user = await getCurrentUserAction();
    if (user && user.email) {
      const emailLower = user.email.toLowerCase().trim();
      const isAdmin =
        adminEmails.includes(emailLower) ||
        user.role === 'ADMIN';

      if (isAdmin) {
        return { isAdmin: true, email: user.email };
      }
    }
  } catch {
    // Si la DB no está conectada, se apoya en el fallback
  }

  return { isAdmin: false };
}

/**
 * Permite a Santi o Flor autenticarse de forma segura mediante clave maestra
 */
export async function authenticateAdminWithSecretAction(secret: string) {
  if (!secret) {
    return { success: false, error: 'Ingresá la contraseña maestra de acceso.' };
  }

  const validSecrets = [
    process.env.ADMIN_SECRET_KEY,
    'FlorMartinez2026!',
    SALT_SEGURIDAD,
  ].filter(Boolean);

  const isValid = validSecrets.includes(secret.trim());

  if (!isValid) {
    return {
      success: false,
      error: 'Contraseña maestra incorrecta. Acceso denegado.',
    };
  }

  const adminEmail = 'santisose01@gmail.com';

  // 1. Establecer cookie segura de sesión de Superadmin
  try {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, adminEmail, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 días
      path: '/',
    });
  } catch (err) {
    console.warn('No se pudo guardar la cookie de sesión admin:', err);
  }

  return {
    success: true,
    user: {
      email: adminEmail,
      name: 'Santiago (Superadmin)',
      role: 'ADMIN',
    },
  };
}

export async function adminLogoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_COOKIE_NAME);
  } catch (err) {
    console.warn('Error al borrar cookie admin:', err);
  }
  return { success: true };
}

/**
 * Emite una nueva licencia comercial (usada tanto en checkout web como en superadmin manual)
 */
export async function issueLicenseAction(params: {
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  channel: 'WEB' | 'WHATSAPP' | 'INSTAGRAM' | 'TRANSFERENCIA' | 'MANUAL';
  notes?: string | null;
}) {
  if (!params.customerName || !params.customerName.trim()) {
    return { success: false, error: 'El nombre del cliente es obligatorio.' };
  }
  if (!params.customerEmail || !params.customerEmail.includes('@')) {
    return { success: false, error: 'Ingresá un correo electrónico válido.' };
  }

  try {
    const record = await createLicenseRecord({
      customerName: params.customerName,
      customerEmail: params.customerEmail,
      customerPhone: params.customerPhone,
      channel: params.channel,
      notes: params.notes,
    });

    const deliveryMessage = generarMensajeEntrega(record.customerName, record.licenseKey);

    return {
      success: true,
      license: record,
      copyUrl: TEMPLATE_COPY_URL,
      deliveryMessage,
    };
  } catch (err: any) {
    console.error('Error en issueLicenseAction:', err);
    return { success: false, error: 'Ocurrió un error al generar la licencia.' };
  }
}

/**
 * Obtiene todas las licencias emitidas (solo accesible por administradores autorizados)
 */
export async function getLicensesListAction(): Promise<{
  success: boolean;
  licenses?: SpreadsheetLicenseRecord[];
  error?: string;
}> {
  const adminCheck = await checkIsAdminAction();
  if (!adminCheck.isAdmin) {
    return {
      success: false,
      error: 'No tenés permisos para ver el listado de licencias.',
    };
  }

  try {
    const list = await getAllLicenses();
    return { success: true, licenses: list };
  } catch (err) {
    console.error('Error en getLicensesListAction:', err);
    return { success: false, error: 'Error al consultar las licencias.' };
  }
}

/**
 * Elimina permanentemente una licencia comercial
 */
export async function deleteLicenseAction(licenseId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const adminCheck = await checkIsAdminAction();
  if (!adminCheck.isAdmin) {
    return { success: false, error: 'No autorizado para eliminar licencias.' };
  }

  if (!licenseId) {
    return { success: false, error: 'ID de licencia no válido.' };
  }

  try {
    await deleteLicenseRecord(licenseId);
    return { success: true };
  } catch (err: any) {
    console.error('Error en deleteLicenseAction:', err);
    return { success: false, error: err.message || 'Error al eliminar la licencia.' };
  }
}

/**
 * Obtiene la lista de correos con permisos de Superadmin
 */
export async function getSuperAdminEmailsAction(): Promise<{
  success: boolean;
  emails?: string[];
  primaryEmails?: string[];
  error?: string;
}> {
  const adminCheck = await checkIsAdminAction();
  if (!adminCheck.isAdmin) {
    return { success: false, error: 'No autorizado' };
  }

  try {
    const emails = await getDynamicAdminEmails();
    return {
      success: true,
      emails,
      primaryEmails: ADMIN_EMAILS.map((e) => e.toLowerCase().trim()),
    };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error al obtener administradores' };
  }
}

/**
 * Agrega un nuevo correo a la lista de Superadmins
 */
export async function addSuperAdminEmailAction(email: string): Promise<{
  success: boolean;
  emails?: string[];
  error?: string;
}> {
  const adminCheck = await checkIsAdminAction();
  if (!adminCheck.isAdmin) {
    return { success: false, error: 'No autorizado' };
  }

  const cleanEmail = email?.trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, error: 'Ingresá un correo electrónico válido.' };
  }

  try {
    const updated = await saveDynamicAdminEmail(cleanEmail);
    return { success: true, emails: updated };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error al guardar administrador' };
  }
}

/**
 * Remueve un correo de la lista de Superadmins
 */
export async function removeSuperAdminEmailAction(email: string): Promise<{
  success: boolean;
  emails?: string[];
  error?: string;
}> {
  const adminCheck = await checkIsAdminAction();
  if (!adminCheck.isAdmin) {
    return { success: false, error: 'No autorizado' };
  }

  const cleanEmail = email?.trim().toLowerCase();
  try {
    const updated = await removeDynamicAdminEmail(cleanEmail);
    return { success: true, emails: updated };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error al remover administrador' };
  }
}

