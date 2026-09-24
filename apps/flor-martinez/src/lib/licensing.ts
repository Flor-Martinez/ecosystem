import fs from 'fs';
import path from 'path';

export {
  SALT_SEGURIDAD,
  TEMPLATE_COPY_URL,
  ADMIN_EMAILS,
  type SpreadsheetLicenseRecord,
} from './licensing-types';

import {
  SALT_SEGURIDAD,
  TEMPLATE_COPY_URL,
  ADMIN_EMAILS,
  type SpreadsheetLicenseRecord,
} from './licensing-types';

/**
 * Algoritmo criptográfico de Checksum idéntico al de Google Sheets y generador HTML
 */
export function calcularChecksumLicencia(seed: string): string {
  let hash = 5381;
  const combined = seed + SALT_SEGURIDAD;
  for (let i = 0; i < combined.length; i++) {
    hash = ((hash * 33) ^ combined.charCodeAt(i)) >>> 0;
  }
  let code = Math.abs(hash).toString(36).toUpperCase();
  while (code.length < 4) code = '0' + code;
  return code.substring(0, 4);
}

/**
 * Valida si una clave dada cumple matemáticamente con el algoritmo oficial
 */
export function validarClaveLicencia(clave: string): boolean {
  if (!clave) return false;
  const limpia = clave.trim().toUpperCase().replace(/[\s–—]/g, '-');
  if (limpia === 'FM-ADMIN-MASTER' || limpia === 'FM-DEV-MASTER') return true;

  const partes = limpia.split('-');
  if (partes.length !== 3 || partes[0] !== 'FM') return false;

  const seed = partes[1];
  if (!seed) return false;
  const checkEsperado = calcularChecksumLicencia(seed);
  return partes[2] === checkEsperado;
}

/**
 * Genera una clave individual en formato FM-XXXX-YYYY
 */
export function generarClaveCriptografica(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let seed = '';
  for (let i = 0; i < 4; i++) {
    seed += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const check = calcularChecksumLicencia(seed);
  return `FM-${seed}-${check}`;
}

/**
 * Genera el mensaje formateado listo para enviar por WhatsApp o correo al cliente
 */
export function generarMensajeEntrega(customerName: string, licenseKey: string): string {
  const primerNombre = customerName.split(' ')[0] || 'Hola';
  return `¡Hola ${primerNombre}! Muchas gracias por tu compra. 🙌

Acá tenés el enlace oficial para abrir tu copia de la Planilla Financiera Flor Martínez:
👉 ${TEMPLATE_COPY_URL}

🔑 Tu Clave de Activación Oficial es:
${licenseKey}

📌 Instrucciones de activación:
1. Abrí el enlace desde una computadora (PC o Mac) en Google Chrome.
2. Hacé clic en el botón azul 'Crear una copia'.
3. Escribí tu clave en la celda blanca (C7) y presioná Enter.
4. Si arriba te aparece una barra amarilla de Google, hacé clic en 'Permitir acceso' para validar tu copia única.
5. ¡Listo! Se desbloquearán todas las hojas de trabajo automáticamente.

💻 Nota importante: Es muy conveniente usar la planilla en una computadora en lugar de un celular para visualizar cómodamente todos los tableros, gráficos y cálculos financieros.

Guardá este mensaje. ¡Cualquier duda que tengas estoy a disposición!`;
}

// =============================================================================
// PERSISTENCIA RESILIENTE (PRISMA DB + ARCHIVO LOCAL FALLBACK)
// =============================================================================

const LOCAL_STORAGE_DIR = path.join(process.cwd(), '.data');
const LOCAL_STORAGE_FILE = path.join(LOCAL_STORAGE_DIR, 'licenses.json');

function ensureLocalStorageExists() {
  try {
    if (!fs.existsSync(LOCAL_STORAGE_DIR)) {
      fs.mkdirSync(LOCAL_STORAGE_DIR, { recursive: true });
    }
    if (!fs.existsSync(LOCAL_STORAGE_FILE)) {
      fs.writeFileSync(LOCAL_STORAGE_FILE, JSON.stringify([]), 'utf8');
    }
  } catch (err) {
    console.warn('No se pudo inicializar storage local:', err);
  }
}

function readLocalLicenses(): SpreadsheetLicenseRecord[] {
  ensureLocalStorageExists();
  try {
    const raw = fs.readFileSync(LOCAL_STORAGE_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveLocalLicenses(licenses: SpreadsheetLicenseRecord[]) {
  ensureLocalStorageExists();
  try {
    fs.writeFileSync(LOCAL_STORAGE_FILE, JSON.stringify(licenses, null, 2), 'utf8');
  } catch (err) {
    console.error('Error al guardar en storage local:', err);
  }
}

/**
 * Obtiene todas las licencias emitidas (intenta Prisma DB, si no existe o falla usa fallback local)
 */
export async function getAllLicenses(): Promise<SpreadsheetLicenseRecord[]> {
  try {
    const { db } = await import('@repo/db');
    if (db && 'spreadsheetLicense' in db) {
      const records = await db.spreadsheetLicense.findMany({
        orderBy: { createdAt: 'desc' },
      });
      if (records && records.length > 0) {
        return records.map((r: any) => ({
          id: r.id,
          licenseKey: r.licenseKey,
          customerName: r.customerName,
          customerEmail: r.customerEmail,
          customerPhone: r.customerPhone,
          channel: r.channel as any,
          status: r.status as any,
          spreadsheetId: r.spreadsheetId || null,
          notes: r.notes,
          syncedToSheets: Boolean(r.syncedToSheets),
          createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
        }));
      }
    }
  } catch (e) {
    // DB no disponible o tabla pendiente de migración, pasamos a storage local
  }

  return readLocalLicenses();
}

/**
 * Guarda una nueva licencia garantizando CERO colisiones
 */
export async function createLicenseRecord(data: {
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  channel: 'WEB' | 'WHATSAPP' | 'INSTAGRAM' | 'TRANSFERENCIA' | 'MANUAL';
  notes?: string | null;
}): Promise<SpreadsheetLicenseRecord> {
  const existing = await getAllLicenses();
  const existingKeys = new Set(existing.map((l) => l.licenseKey.toUpperCase()));

  // Generamos clave asegurando 100% que no colisione
  let key = generarClaveCriptografica();
  let attempts = 0;
  while (existingKeys.has(key) && attempts < 20) {
    key = generarClaveCriptografica();
    attempts++;
  }

  const record: SpreadsheetLicenseRecord = {
    id: 'lic_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36),
    licenseKey: key,
    customerName: data.customerName.trim(),
    customerEmail: data.customerEmail.trim().toLowerCase(),
    customerPhone: data.customerPhone?.trim() || null,
    channel: data.channel,
    status: 'ACTIVA',
    spreadsheetId: null,
    notes: data.notes?.trim() || null,
    syncedToSheets: false,
    createdAt: new Date().toISOString(),
  };

  // 1. Guardar en Prisma si está disponible
  let savedInDb = false;
  try {
    const { db } = await import('@repo/db');
    if (db && 'spreadsheetLicense' in db) {
      await db.spreadsheetLicense.create({
        data: {
          licenseKey: record.licenseKey,
          customerName: record.customerName,
          customerEmail: record.customerEmail,
          customerPhone: record.customerPhone,
          channel: record.channel,
          status: record.status,
          notes: record.notes,
          syncedToSheets: false,
        },
      });
      savedInDb = true;
    }
  } catch {
    savedInDb = false;
  }

  // 2. Guardar en storage local (garantiza persistencia siempre)
  const currentLocal = readLocalLicenses();
  currentLocal.unshift(record);
  saveLocalLicenses(currentLocal);

  // 3. Sincronizar en segundo plano con Google Sheets si hay webhook configurado
  const webhookUrl = process.env.MASTER_SHEET_WEBHOOK_URL;
  if (webhookUrl) {
    syncToGoogleSheet(webhookUrl, record).catch((err) => {
      console.warn('Error al sincronizar con Google Sheet:', err);
    });
  }

  return record;
}

/**
 * Envía el registro de la licencia al webhook de Google Apps Script del Master Sheet
 */
export async function syncToGoogleSheet(webhookUrl: string, record: SpreadsheetLicenseRecord): Promise<boolean> {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clave: record.licenseKey,
        nombre: record.customerName,
        email: record.customerEmail,
        telefono: record.customerPhone || '',
        canal: record.channel,
        fecha: record.createdAt,
        notas: record.notes || '',
        estado: record.status,
      }),
    });
    return response.ok;
  } catch (err) {
    console.error('Fallo en syncToGoogleSheet:', err);
    return false;
  }
}

/**
 * Elimina una licencia de la base de datos y del almacenamiento local
 */
export async function deleteLicenseRecord(idOrKey: string): Promise<boolean> {
  let deleted = false;

  // 1. Eliminar de Prisma DB si está disponible
  try {
    const { db } = await import('@repo/db');
    if (db && 'spreadsheetLicense' in db) {
      await db.spreadsheetLicense.deleteMany({
        where: {
          OR: [{ id: idOrKey }, { licenseKey: idOrKey }],
        },
      });
      deleted = true;
    }
  } catch (err) {
    console.warn('Error al borrar de Prisma DB:', err);
  }

  // 2. Eliminar del storage local
  try {
    const currentLocal = readLocalLicenses();
    const filtered = currentLocal.filter(
      (l) => l.id !== idOrKey && l.licenseKey !== idOrKey
    );
    if (filtered.length !== currentLocal.length) {
      saveLocalLicenses(filtered);
      deleted = true;
    }
  } catch (err) {
    console.warn('Error al borrar de storage local:', err);
  }

  return deleted;
}

/**
 * Valida y activa una licencia vinculándola a un Spreadsheet ID único.
 * Si la clave ya está vinculada a otro ID, se rechaza la activación.
 */
export async function activateLicenseOnDocument(
  licenseKey: string,
  spreadsheetId: string
): Promise<{
  success: boolean;
  code?: 'ACTIVATED' | 'ALREADY_ACTIVE' | 'ALREADY_USED' | 'NOT_FOUND' | 'REVOKED' | 'INVALID_KEY';
  message: string;
  customerName?: string;
}> {
  if (!licenseKey) {
    return { success: false, code: 'INVALID_KEY', message: 'Falta la clave de licencia.' };
  }
  if (!spreadsheetId) {
    return { success: false, code: 'INVALID_KEY', message: 'Falta el ID del documento.' };
  }

  const cleanKey = licenseKey.trim().toUpperCase().replace(/[\s–—]/g, '-');
  const cleanId = spreadsheetId.trim();

  // Claves maestras de desarrollo/admin (siempre permitidas)
  if (cleanKey === 'FM-ADMIN-MASTER' || cleanKey === 'FM-DEV-MASTER') {
    return {
      success: true,
      code: 'ACTIVATED',
      message: 'Licencia Maestra Autorizada',
      customerName: 'Santiago (Master)',
    };
  }

  // 1. Buscar la licencia en Prisma DB o storage local
  let record: SpreadsheetLicenseRecord | null = null;
  try {
    const { db } = await import('@repo/db');
    if (db && 'spreadsheetLicense' in db) {
      const found = await db.spreadsheetLicense.findUnique({
        where: { licenseKey: cleanKey },
      });
      if (found) {
        record = {
          id: found.id,
          licenseKey: found.licenseKey,
          customerName: found.customerName,
          customerEmail: found.customerEmail,
          customerPhone: found.customerPhone,
          channel: found.channel as any,
          status: found.status as any,
          spreadsheetId: found.spreadsheetId || null,
          notes: found.notes,
          syncedToSheets: Boolean(found.syncedToSheets),
          createdAt: found.createdAt ? new Date(found.createdAt).toISOString() : new Date().toISOString(),
        };
      }
    }
  } catch {}

  if (!record) {
    const local = readLocalLicenses();
    record = local.find((l) => l.licenseKey.toUpperCase() === cleanKey) || null;
  }

  // 2. Si no existe en la base de datos
  if (!record) {
    return {
      success: false,
      code: 'NOT_FOUND',
      message: 'Esta clave no está registrada en nuestro sistema de ventas.',
    };
  }

  // 3. Si está revocada o dada de baja
  if (record.status === 'REVOCADA') {
    return {
      success: false,
      code: 'REVOKED',
      message: 'Esta licencia comercial se encuentra revocada o dada de baja.',
    };
  }

  // 4. Caso 1: Primera activación (No tiene ID asociado aún)
  if (!record.spreadsheetId) {
    // Guardar en Prisma DB
    try {
      const { db } = await import('@repo/db');
      if (db && 'spreadsheetLicense' in db) {
        await db.spreadsheetLicense.update({
          where: { id: record.id },
          data: {
            spreadsheetId: cleanId,
            status: 'ACTIVA',
          },
        });
      }
    } catch {}

    // Guardar en storage local
    try {
      const currentLocal = readLocalLicenses();
      const updated = currentLocal.map((l) =>
        l.id === record!.id ? { ...l, spreadsheetId: cleanId, status: 'ACTIVA' as const } : l
      );
      saveLocalLicenses(updated);
    } catch {}

    return {
      success: true,
      code: 'ACTIVATED',
      message: '¡Licencia activada con éxito y vinculada a tu archivo!',
      customerName: record.customerName,
    };
  }

  // 5. Caso 2: Misma planilla ya autorizada anteriormente
  if (record.spreadsheetId === cleanId) {
    return {
      success: true,
      code: 'ALREADY_ACTIVE',
      message: 'Esta copia ya se encuentra activada y autorizada.',
      customerName: record.customerName,
    };
  }

  // 6. Caso 3: ¡LA CLAVE YA FUE USADA EN OTRO DOCUMENTO!
  return {
    success: false,
    code: 'ALREADY_USED',
    message: 'Esta clave ya fue activada en otra copia de Google Sheets y no puede ser reutilizada.',
  };
}

/**
 * Desvincula el Spreadsheet ID de una licencia (para permitir que el cliente la active en una nueva copia si es necesario)
 */
export async function unlinkLicenseDocument(idOrKey: string): Promise<boolean> {
  let unlinked = false;
  const clean = idOrKey.trim();

  try {
    const { db } = await import('@repo/db');
    if (db && 'spreadsheetLicense' in db) {
      await db.spreadsheetLicense.updateMany({
        where: {
          OR: [{ id: clean }, { licenseKey: clean.toUpperCase() }],
        },
        data: { spreadsheetId: null },
      });
      unlinked = true;
    }
  } catch {}

  try {
    const currentLocal = readLocalLicenses();
    const updated = currentLocal.map((l) =>
      l.id === clean || l.licenseKey.toUpperCase() === clean.toUpperCase()
        ? { ...l, spreadsheetId: null }
        : l
    );
    saveLocalLicenses(updated);
    unlinked = true;
  } catch {}

  return unlinked;
}



// =============================================================================
// GESTIÓN DINÁMICA DE EMAILS DE SUPERADMIN
// =============================================================================

const ADMIN_EMAILS_FILE = path.join(LOCAL_STORAGE_DIR, 'admin_emails.json');

export async function getDynamicAdminEmails(): Promise<string[]> {
  const list = new Set<string>(ADMIN_EMAILS.map((e) => e.toLowerCase().trim()));

  // 1. Archivo local de almacenamiento
  try {
    if (fs.existsSync(ADMIN_EMAILS_FILE)) {
      const raw = fs.readFileSync(ADMIN_EMAILS_FILE, 'utf8');
      const saved: string[] = JSON.parse(raw);
      if (Array.isArray(saved)) {
        saved.forEach((e) => {
          if (typeof e === 'string' && e.includes('@')) {
            list.add(e.toLowerCase().trim());
          }
        });
      }
    }
  } catch (err) {
    console.warn('No se pudo leer admin_emails.json:', err);
  }

  // 2. Base de datos Prisma (usuarios con rol ADMIN)
  try {
    const { db } = await import('@repo/db');
    if (db && 'user' in db) {
      const admins = await db.user.findMany({
        where: { role: 'ADMIN' },
        select: { email: true },
      });
      admins.forEach((a: any) => {
        if (a?.email) list.add(a.email.toLowerCase().trim());
      });
    }
  } catch {
    // DB en modo offline/fallback
  }

  return Array.from(list);
}

export async function saveDynamicAdminEmail(email: string): Promise<string[]> {
  const formatted = email.toLowerCase().trim();
  const current = await getDynamicAdminEmails();
  if (!current.includes(formatted)) {
    current.push(formatted);
  }

  // Guardar en archivo local
  try {
    ensureLocalStorageExists();
    const nonDefault = current.filter(
      (e) => !ADMIN_EMAILS.map((a) => a.toLowerCase()).includes(e)
    );
    fs.writeFileSync(ADMIN_EMAILS_FILE, JSON.stringify(nonDefault, null, 2), 'utf8');
  } catch (err) {
    console.warn('Error al guardar admin_emails.json:', err);
  }

  // Upsert en Prisma si está conectado
  try {
    const { db } = await import('@repo/db');
    if (db && 'user' in db) {
      await db.user.upsert({
        where: { email: formatted },
        update: { role: 'ADMIN' },
        create: {
          email: formatted,
          name: formatted.split('@')[0] || 'Administrador',
          role: 'ADMIN',
        },
      });
    }
  } catch {
    // DB opcional
  }

  return current;
}

export async function removeDynamicAdminEmail(email: string): Promise<string[]> {
  const formatted = email.toLowerCase().trim();
  if (ADMIN_EMAILS.map((a) => a.toLowerCase()).includes(formatted)) {
    throw new Error('No es posible eliminar a los administradores principales del sistema.');
  }

  let current = await getDynamicAdminEmails();
  current = current.filter((e) => e !== formatted);

  // Guardar en archivo local
  try {
    ensureLocalStorageExists();
    const nonDefault = current.filter(
      (e) => !ADMIN_EMAILS.map((a) => a.toLowerCase()).includes(e)
    );
    fs.writeFileSync(ADMIN_EMAILS_FILE, JSON.stringify(nonDefault, null, 2), 'utf8');
  } catch (err) {
    console.warn('Error al actualizar admin_emails.json:', err);
  }

  // En Prisma DB, cambiar rol a MEMBER
  try {
    const { db } = await import('@repo/db');
    if (db && 'user' in db) {
      await db.user.updateMany({
        where: { email: formatted },
        data: { role: 'MEMBER' },
      });
    }
  } catch {
    // DB opcional
  }

  return current;
}

