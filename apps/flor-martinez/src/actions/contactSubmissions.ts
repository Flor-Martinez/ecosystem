'use server';

import fs from 'fs';
import path from 'path';
import os from 'os';

export interface ContactSubmissionRecord {
  id: string;
  name: string;
  email: string;
  motivo: string;
  mensaje: string;
  status: 'PENDIENTE' | 'ATENDIDO';
  createdAt: string;
  updatedAt: string;
}

declare global {
  var __fm_contacts_store: ContactSubmissionRecord[] | undefined;
}

const LOCAL_STORAGE_DIR = path.join(process.cwd(), '.data');
const LOCAL_CONTACTS_FILE = path.join(LOCAL_STORAGE_DIR, 'contact_submissions.json');
const TMP_CONTACTS_FILE = path.join(os.tmpdir(), 'contact_submissions.json');

const initialSampleContacts: ContactSubmissionRecord[] = [];

function readContacts(): ContactSubmissionRecord[] {
  if (globalThis.__fm_contacts_store !== undefined) {
    return globalThis.__fm_contacts_store;
  }

  try {
    if (fs.existsSync(LOCAL_CONTACTS_FILE)) {
      const raw = fs.readFileSync(LOCAL_CONTACTS_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        globalThis.__fm_contacts_store = parsed;
        return parsed;
      }
    }
  } catch {
    // Ignore read error
  }

  try {
    if (fs.existsSync(TMP_CONTACTS_FILE)) {
      const raw = fs.readFileSync(TMP_CONTACTS_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        globalThis.__fm_contacts_store = parsed;
        return parsed;
      }
    }
  } catch {
    // Ignore read error
  }

  globalThis.__fm_contacts_store = [...initialSampleContacts];
  saveContacts(globalThis.__fm_contacts_store);
  return globalThis.__fm_contacts_store;
}

function saveContacts(contacts: ContactSubmissionRecord[]) {
  globalThis.__fm_contacts_store = contacts;

  try {
    if (!fs.existsSync(LOCAL_STORAGE_DIR)) {
      fs.mkdirSync(LOCAL_STORAGE_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_CONTACTS_FILE, JSON.stringify(contacts, null, 2), 'utf8');
  } catch {
    // Vercel serverless process.cwd() is read-only, ignore
  }

  try {
    fs.writeFileSync(TMP_CONTACTS_FILE, JSON.stringify(contacts, null, 2), 'utf8');
  } catch (err) {
    console.error('Error al guardar contacto en /tmp:', err);
  }
}

export async function getContactSubmissionsAction(): Promise<{
  success: boolean;
  contacts?: ContactSubmissionRecord[];
  pendingCount?: number;
  error?: string;
}> {
  try {
    const contacts = readContacts();
    contacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const pendingCount = contacts.filter((c) => c.status === 'PENDIENTE').length;
    return { success: true, contacts, pendingCount };
  } catch {
    return { success: false, error: 'Error al cargar las consultas de contacto.' };
  }
}

export async function createContactSubmissionAction(params: {
  name: string;
  email: string;
  motivo?: string;
  mensaje: string;
}): Promise<{ success: boolean; contact?: ContactSubmissionRecord; error?: string }> {
  try {
    const { name, email, motivo = 'consultoria', mensaje } = params;

    if (!name || !email || !mensaje) {
      return { success: false, error: 'Nombre, correo y mensaje son obligatorios.' };
    }

    const contacts = readContacts();
    const newContact: ContactSubmissionRecord = {
      id: 'cnt_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      motivo: motivo.trim(),
      mensaje: mensaje.trim(),
      status: 'PENDIENTE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    contacts.unshift(newContact);
    saveContacts(contacts);

    return { success: true, contact: newContact };
  } catch (err) {
    console.error('Error al registrar mensaje de contacto:', err);
    return { success: false, error: 'Ocurrió un error al enviar tu consulta.' };
  }
}

export async function updateContactStatusAction(
  id: string,
  newStatus: 'PENDIENTE' | 'ATENDIDO'
): Promise<{ success: boolean; contact?: ContactSubmissionRecord; error?: string }> {
  try {
    const contacts = readContacts();
    const index = contacts.findIndex((c) => c.id === id);
    if (index === -1) {
      return { success: false, error: 'Consulta no encontrada.' };
    }

    const updated: ContactSubmissionRecord = {
      ...contacts[index]!,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };

    contacts[index] = updated;
    saveContacts(contacts);

    return { success: true, contact: updated };
  } catch {
    return { success: false, error: 'Error al actualizar estado.' };
  }
}

export async function deleteContactSubmissionAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    let contacts = readContacts();
    const initialLen = contacts.length;
    contacts = contacts.filter((c) => c.id !== id);

    if (contacts.length === initialLen) {
      return { success: false, error: 'Consulta no encontrada.' };
    }

    saveContacts(contacts);
    return { success: true };
  } catch {
    return { success: false, error: 'Error al eliminar consulta.' };
  }
}
