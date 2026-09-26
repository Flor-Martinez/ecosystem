'use server';

import fs from 'fs';
import path from 'path';
import { trackUserSignup } from './metrics';

export interface CvOrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  priceARS: number;
  channel: 'WEB' | 'WHATSAPP' | 'INSTAGRAM' | 'TRANSFERENCIA' | 'MANUAL';
  status: 'PENDIENTE' | 'ENTREGADO' | 'CANCELADO';
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

const LOCAL_STORAGE_DIR = path.join(process.cwd(), '.data');
const CV_ORDERS_FILE = path.join(LOCAL_STORAGE_DIR, 'cv_orders.json');

function ensureCvOrdersFileExists() {
  try {
    if (!fs.existsSync(LOCAL_STORAGE_DIR)) {
      fs.mkdirSync(LOCAL_STORAGE_DIR, { recursive: true });
    }
    if (!fs.existsSync(CV_ORDERS_FILE)) {
      const initialSampleOrders: CvOrderRecord[] = [
        {
          id: 'cv_ord_1',
          orderNumber: 'FM-CV-2026-001',
          customerName: 'Mariano Benítez',
          customerEmail: 'marianobenitez@gmail.com',
          customerPhone: '+54 9 11 5544-3322',
          priceARS: 29900,
          channel: 'WEB',
          status: 'ENTREGADO',
          notes: 'Reestructuración aprobada con éxito.',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ];
      fs.writeFileSync(CV_ORDERS_FILE, JSON.stringify(initialSampleOrders, null, 2), 'utf8');
    }
  } catch (err) {
    console.error('Error al inicializar cv_orders.json:', err);
  }
}

function readCvOrders(): CvOrderRecord[] {
  ensureCvOrdersFileExists();
  try {
    const raw = fs.readFileSync(CV_ORDERS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveCvOrders(orders: CvOrderRecord[]) {
  ensureCvOrdersFileExists();
  try {
    fs.writeFileSync(CV_ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
  } catch (err) {
    console.error('Error al guardar cv_orders.json:', err);
  }
}

export async function getCvOrdersAction(): Promise<{
  success: boolean;
  orders?: CvOrderRecord[];
  error?: string;
}> {
  try {
    const orders = readCvOrders();
    // Sort descending by date
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return { success: true, orders };
  } catch (err) {
    return { success: false, error: 'Error al cargar los pedidos de CVs.' };
  }
}

export async function createCvOrderAction(params: {
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  channel?: 'WEB' | 'WHATSAPP' | 'INSTAGRAM' | 'TRANSFERENCIA' | 'MANUAL';
  priceARS?: number;
  notes?: string | null;
  status?: 'PENDIENTE' | 'ENTREGADO' | 'CANCELADO';
}): Promise<{ success: boolean; order?: CvOrderRecord; error?: string }> {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      channel = 'MANUAL',
      priceARS = 29900,
      notes,
      status = 'PENDIENTE',
    } = params;

    if (!customerName || !customerEmail) {
      return { success: false, error: 'El nombre y correo del cliente son requeridos.' };
    }

    // Auto-track user in metrics signup database
    await trackUserSignup(customerName, customerEmail);

    const orders = readCvOrders();
    const count = orders.length + 1;
    const orderNumber = `FM-CV-${new Date().getFullYear()}-${String(count).padStart(3, '0')}`;

    const newOrder: CvOrderRecord = {
      id: 'cv_ord_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      orderNumber,
      customerName: customerName.trim(),
      customerEmail: customerEmail.toLowerCase().trim(),
      customerPhone: customerPhone ? customerPhone.trim() : null,
      priceARS,
      channel,
      status,
      notes: notes ? notes.trim() : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    orders.unshift(newOrder);
    saveCvOrders(orders);

    return { success: true, order: newOrder };
  } catch (err) {
    console.error('Error al crear pedido de CV:', err);
    return { success: false, error: 'Ocurrió un error al registrar el pedido de CV.' };
  }
}

export async function updateCvOrderStatusAction(
  id: string,
  newStatus: 'PENDIENTE' | 'ENTREGADO' | 'CANCELADO'
): Promise<{ success: boolean; order?: CvOrderRecord; error?: string }> {
  try {
    const orders = readCvOrders();
    const index = orders.findIndex((o) => o.id === id);
    const targetOrder = orders[index];

    if (index === -1 || !targetOrder) {
      return { success: false, error: 'Pedido de CV no encontrado.' };
    }

    const updated: CvOrderRecord = {
      ...targetOrder,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };

    orders[index] = updated;
    saveCvOrders(orders);

    return { success: true, order: updated };
  } catch (err) {
    console.error('Error al actualizar estado del pedido de CV:', err);
    return { success: false, error: 'Error al cambiar estado.' };
  }
}

export async function deleteCvOrderAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    let orders = readCvOrders();
    const initialLength = orders.length;
    orders = orders.filter((o) => o.id !== id);

    if (orders.length === initialLength) {
      return { success: false, error: 'Pedido de CV no encontrado.' };
    }

    saveCvOrders(orders);
    return { success: true };
  } catch (err) {
    console.error('Error al eliminar pedido de CV:', err);
    return { success: false, error: 'Error al eliminar el pedido.' };
  }
}
