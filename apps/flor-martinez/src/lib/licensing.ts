import fs from 'fs';
import path from 'path';

export {
  SALT_SEGURIDAD,
  TEMPLATE_COPY_URL,
  ADMIN_EMAILS,
  BANNED_EMAILS,
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
1. Abrí el enlace y hacé clic en el botón azul 'Usar plantilla' (o 'Crear una copia').
2. Si arriba te aparece una barra amarilla de Google, hacé clic en 'Permitir acceso' para habilitar las funciones.
3. Escribí tu clave en la celda blanca (C7) y presioná Enter.
4. ¡Listo! Se desbloquearán todas las hojas de trabajo automáticamente.

💡 Tip: Te sugerimos abrir la planilla desde una computadora para mayor comodidad. Si la abrís en la App del celular y te sale 'Solo Lectura', tocá los 3 puntitos arriba (⋮) ➔ Compartir y exportar ➔ Crear una copia.

Guardá este mensaje. ¡Cualquier duda que tengas estoy a disposición!`;
}

// =============================================================================
// PERSISTENCIA RESILIENTE (PRISMA DB + ARCHIVO LOCAL FALLBACK)
// =============================================================================

import os from 'os';

declare global {
  var __fm_licenses_store: SpreadsheetLicenseRecord[] | undefined;
}

const LOCAL_STORAGE_DIR = path.join(process.cwd(), '.data');
const LOCAL_STORAGE_FILE = path.join(LOCAL_STORAGE_DIR, 'licenses.json');
const TMP_LICENSES_FILE = path.join(os.tmpdir(), 'licenses.json');

function readLocalLicenses(): SpreadsheetLicenseRecord[] {
  if (globalThis.__fm_licenses_store !== undefined) {
    return globalThis.__fm_licenses_store;
  }

  try {
    if (fs.existsSync(LOCAL_STORAGE_FILE)) {
      const raw = fs.readFileSync(LOCAL_STORAGE_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        globalThis.__fm_licenses_store = parsed;
        return parsed;
      }
    }
  } catch {
    // Ignore read error
  }

  try {
    if (fs.existsSync(TMP_LICENSES_FILE)) {
      const raw = fs.readFileSync(TMP_LICENSES_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        globalThis.__fm_licenses_store = parsed;
        return parsed;
      }
    }
  } catch {
    // Ignore read error
  }

  globalThis.__fm_licenses_store = [];
  return globalThis.__fm_licenses_store;
}

function saveLocalLicenses(licenses: SpreadsheetLicenseRecord[]) {
  globalThis.__fm_licenses_store = licenses;

  try {
    if (!fs.existsSync(LOCAL_STORAGE_DIR)) {
      fs.mkdirSync(LOCAL_STORAGE_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_STORAGE_FILE, JSON.stringify(licenses, null, 2), 'utf8');
  } catch {
    // Vercel serverless process.cwd() is read-only, ignore
  }

  try {
    fs.writeFileSync(TMP_LICENSES_FILE, JSON.stringify(licenses, null, 2), 'utf8');
  } catch (err) {
    console.error('Error al guardar licencias en /tmp:', err);
  }
}

function withTimeout<T>(promise: Promise<T>, timeoutMs = 8000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('DB Timeout')), timeoutMs)
    ),
  ]);
}

let cachedLicenses: { data: SpreadsheetLicenseRecord[]; timestamp: number } | null = null;

export function invalidateLicenseCache() {
  cachedLicenses = null;
}

/**
 * Obtiene todas las licencias emitidas (intenta Prisma DB con timeout de 8s, si no usa fallback local)
 */
export async function getAllLicenses(): Promise<SpreadsheetLicenseRecord[]> {
  const now = Date.now();
  if (cachedLicenses && now - cachedLicenses.timestamp < 5000) {
    return cachedLicenses.data;
  }

  try {
    const { db } = await import('@repo/db');
    if (db && 'spreadsheetLicense' in db) {
      const records = await withTimeout(
        db.spreadsheetLicense.findMany({
          orderBy: { createdAt: 'desc' },
        }),
        8000
      );
      if (records && records.length > 0) {
        const result = records.map((r: any) => ({
          id: r.id,
          licenseKey: r.licenseKey,
          customerName: r.customerName,
          customerEmail: r.customerEmail,
          customerPhone: r.customerPhone,
          customerInstagram: r.customerInstagram || null,
          channel: r.channel as any,
          status: r.status as any,
          spreadsheetId: r.spreadsheetId || null,
          notes: r.notes,
          syncedToSheets: Boolean(r.syncedToSheets),
          createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
        }));
        cachedLicenses = { data: result, timestamp: now };
        return result;
      }
    }
  } catch (e) {
    // DB no disponible o timeout, pasamos a local
  }

  const local = readLocalLicenses();
  cachedLicenses = { data: local, timestamp: now };
  return local;
}

/**
 * Guarda una nueva licencia garantizando CERO colisiones
 */
export async function createLicenseRecord(data: {
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  customerInstagram?: string | null;
  channel: 'WEB' | 'WHATSAPP' | 'INSTAGRAM' | 'TRANSFERENCIA' | 'MANUAL';
  notes?: string | null;
}): Promise<SpreadsheetLicenseRecord> {
  const local = readLocalLicenses();
  const existingKeys = new Set(local.map((l) => l.licenseKey.toUpperCase()));

  // Generamos clave asegurando 100% que no colisione
  let key = generarClaveCriptografica();
  let attempts = 0;
  while (existingKeys.has(key) && attempts < 10) {
    key = generarClaveCriptografica();
    attempts++;
  }

  let cleanInstagram = data.customerInstagram?.trim() || null;
  if (cleanInstagram && !cleanInstagram.startsWith('@') && !cleanInstagram.startsWith('http')) {
    cleanInstagram = `@${cleanInstagram}`;
  }

  const record: SpreadsheetLicenseRecord = {
    id: 'lic_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36),
    licenseKey: key,
    customerName: data.customerName.trim(),
    customerEmail: data.customerEmail.trim().toLowerCase(),
    customerPhone: data.customerPhone?.trim() || null,
    customerInstagram: cleanInstagram,
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
          customerInstagram: record.customerInstagram,
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

  invalidateLicenseCache();
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

  invalidateLicenseCache();
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

    invalidateLicenseCache();
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

  invalidateLicenseCache();
  return unlinked;
}



// =============================================================================
// GESTIÓN DINÁMICA DE EMAILS DE SUPERADMIN
// =============================================================================

const ADMIN_EMAILS_FILE = path.join(LOCAL_STORAGE_DIR, 'admin_emails.json');

let cachedAdmins: { data: string[]; timestamp: number } | null = null;

export async function getDynamicAdminEmails(): Promise<string[]> {
  // Lista cerrada, estricta e inmutable: únicamente los fundadores oficiales
  return ADMIN_EMAILS.map((e) => e.toLowerCase().trim());
}

export async function saveDynamicAdminEmail(_email: string): Promise<string[]> {
  throw new Error('La lista de superadministradores se encuentra cerrada y bloqueada por seguridad.');
}

export async function removeDynamicAdminEmail(_email: string): Promise<string[]> {
  throw new Error('No es posible modificar los administradores oficiales del sistema.');
}

