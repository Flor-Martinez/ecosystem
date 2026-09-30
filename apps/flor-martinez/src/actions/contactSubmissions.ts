'use server';

import fs from 'fs';
import path from 'path';

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

const LOCAL_STORAGE_DIR = path.join(process.cwd(), '.data');
const CONTACTS_FILE = path.join(LOCAL_STORAGE_DIR, 'contact_submissions.json');

function ensureContactsFileExists() {
  try {
    if (!fs.existsSync(LOCAL_STORAGE_DIR)) {
      fs.mkdirSync(LOCAL_STORAGE_DIR, { recursive: true });
    }
    if (!fs.existsSync(CONTACTS_FILE)) {
      const initialSampleContacts: ContactSubmissionRecord[] = [
        {
          id: 'cnt_1',
          name: 'Valeria Fernández',
          email: 'valeria.fernandez@gmail.com',
          motivo: 'consultoria',
          mensaje: 'Hola Flor, me gustaría consultar por un asesoramiento personalizado en logística de comercio exterior para nuestra Pyme.',
          status: 'PENDIENTE',
          createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        },
        {
          id: 'cnt_2',
          name: 'Gonzalo Morales',
          email: 'gmorales.tech@gmail.com',
          motivo: 'agencia',
          mensaje: 'Buenas tardes. Queremos renovar la estrategia digital y web de nuestra marca B2B. ¿Podríamos coordinar una llamada?',
          status: 'ATENDIDO',
          createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
        },
      ];
      fs.writeFileSync(CONTACTS_FILE, JSON.stringify(initialSampleContacts, null, 2), 'utf8');
    }
  } catch (err) {
    console.error('Error al inicializar contact_submissions.json:', err);
  }
}

function readContacts(): ContactSubmissionRecord[] {
  ensureContactsFileExists();
  try {
    const raw = fs.readFileSync(CONTACTS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveContacts(contacts: ContactSubmissionRecord[]) {
  ensureContactsFileExists();
  try {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2), 'utf8');
  } catch (err) {
    console.error('Error al guardar contact_submissions.json:', err);
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
