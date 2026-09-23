'use server';

import { cookies } from 'next/headers';
import {
  createLicenseRecord,
  getAllLicenses,
  generarMensajeEntrega,
  ADMIN_EMAILS,
  TEMPLATE_COPY_URL,
  SpreadsheetLicenseRecord,
} from '@/lib/licensing';
import { getCurrentUserAction, loginUserAction } from './auth';

const ADMIN_COOKIE_NAME = 'fm_admin_session';

export async function checkIsAdminAction(): Promise<{ isAdmin: boolean; email?: string }> {
  // 1. Verificación por cookie de sesión de Superadmin (funciona siempre, incluso offline)
  try {
    const cookieStore = await cookies();
    const adminEmailCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (adminEmailCookie) {
      const emailLower = adminEmailCookie.toLowerCase().trim();
      if (ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(emailLower)) {
        return { isAdmin: true, email: adminEmailCookie };
      }
    }
  } catch {
    // ignorar error de lectura de cookie
  }

  // 2. Verificación por sesión de usuario estándar en Base de Datos
  try {
    const user = await getCurrentUserAction();
    if (user && user.email) {
      const emailLower = user.email.toLowerCase().trim();
      const isAdmin =
        ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(emailLower) ||
        user.role === 'ADMIN';

      return { isAdmin, email: user.email };
    }
  } catch {
    // Si la DB no está conectada, se apoya en el fallback
  }

  return { isAdmin: false };
}

/**
 * Permite a Santi o Flor autenticarse de forma segura con su email autorizado para acceder al panel
 */
export async function authenticateAdminAction(email: string) {
  if (!email || !email.includes('@')) {
    return { success: false, error: 'Ingresá un correo electrónico válido.' };
  }
  const emailLower = email.toLowerCase().trim();
  const isAllowed = ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(emailLower);

  if (!isAllowed) {
    return {
      success: false,
      error: 'Este correo no cuenta con permisos de Superadministrador.',
    };
  }

  // 1. Establecer cookie segura de sesión de Superadmin (garantiza acceso inmediato)
  try {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, emailLower, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 días
      path: '/',
    });
  } catch (err) {
    console.warn('No se pudo guardar la cookie de sesión admin:', err);
  }

  // 2. Intentar registrar/actualizar en DB si está activa
  try {
    await loginUserAction(emailLower, emailLower === 'santisose01@gmail.com' ? 'Santiago' : 'Flor Martínez');
  } catch {
    // Si la DB está apagada o sin migrar, el acceso ya está garantizado por la cookie
  }

  return {
    success: true,
    user: {
      email: emailLower,
      name: emailLower === 'santisose01@gmail.com' ? 'Santiago' : 'Flor Martínez',
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
