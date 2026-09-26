'use server';

import fs from 'fs';
import path from 'path';
import { db } from '@repo/db';
import { getLicensesListAction } from './licenses';
import { getCvOrdersAction } from './cvOrders';

export interface CustomerMetricRecord {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  purchases: {
    itemTitle: string;
    date: string;
    amount: string;
    channel?: string;
  }[];
}

const LOCAL_STORAGE_DIR = path.join(process.cwd(), '.data');
const USERS_FILE = path.join(LOCAL_STORAGE_DIR, 'users.json');

function ensureUsersFileExists() {
  try {
    if (!fs.existsSync(LOCAL_STORAGE_DIR)) {
      fs.mkdirSync(LOCAL_STORAGE_DIR, { recursive: true });
    }
    if (!fs.existsSync(USERS_FILE)) {
      const defaultUsers = [
        {
          id: 'u_1',
          name: 'Santiago Martinez',
          email: 'santisose01@gmail.com',
          createdAt: new Date('2025-08-10').toISOString(),
        },
        {
          id: 'u_2',
          name: 'Flor Martinez',
          email: 'licenciadaflormartinez@gmail.com',
          createdAt: new Date('2025-08-11').toISOString(),
        },
      ];
      fs.writeFileSync(USERS_FILE, JSON.stringify(defaultUsers, null, 2), 'utf8');
    }
  } catch (err) {
    console.error('Error al inicializar users.json:', err);
  }
}

export async function trackUserSignup(name: string, email: string) {
  ensureUsersFileExists();
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf8');
    const users: any[] = JSON.parse(raw);
    const formattedEmail = email.toLowerCase().trim();
    if (!users.some((u) => u.email.toLowerCase() === formattedEmail)) {
      users.push({
        id: 'u_' + Date.now().toString(36),
        name: name.trim(),
        email: formattedEmail,
        createdAt: new Date().toISOString(),
      });
      fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
    }
  } catch (err) {
    console.error('Error tracking user signup:', err);
  }
}

function withTimeout<T>(promise: Promise<T>, timeoutMs = 250): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('DB Timeout')), timeoutMs)
    ),
  ]);
}

let cachedMetrics: { data: any; timestamp: number } | null = null;

export async function getAdminMetricsAction() {
  const now = Date.now();
  if (cachedMetrics && now - cachedMetrics.timestamp < 5000) {
    return cachedMetrics.data;
  }

  ensureUsersFileExists();
  let dbUsers: any[] = [];
  try {
    dbUsers = await withTimeout(
      db.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      250
    );
  } catch {
    // fallback if DB not reachable or timeout
  }

  let localUsers: any[] = [];
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf8');
    localUsers = JSON.parse(raw);
  } catch {
    localUsers = [];
  }

  // Combine DB users and local users without duplicates
  const userMap = new Map<string, { id: string; name: string; email: string; createdAt: string }>();

  for (const u of [...dbUsers, ...localUsers]) {
    const key = u.email.toLowerCase().trim();
    if (!userMap.has(key)) {
      userMap.set(key, {
        id: u.id,
        name: u.name || (key.split('@')[0] ?? 'Usuario'),
        email: u.email,
        createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : new Date().toISOString(),
      });
    }
  }

  const [licensesRes, cvOrdersRes] = await Promise.all([
    getLicensesListAction(),
    getCvOrdersAction(),
  ]);

  const licenses = licensesRes.licenses || [];
  const cvOrders = cvOrdersRes.orders || [];

  // Map purchases to users by email
  const customersList: CustomerMetricRecord[] = Array.from(userMap.values()).map((user) => {
    const userEmail = user.email.toLowerCase().trim();
    const userLicenses = licenses.filter(
      (l) => l.customerEmail.toLowerCase().trim() === userEmail
    );
    const userCvOrders = cvOrders.filter(
      (c) => c.customerEmail.toLowerCase().trim() === userEmail
    );

    const purchases = [
      ...userLicenses.map((lic) => ({
        itemTitle: 'Planilla "Finanzas en Orden" (' + lic.licenseKey + ')',
        date: lic.createdAt,
        amount: '$14.900 ARS',
        channel: lic.channel,
      })),
      ...userCvOrders.map((cv) => ({
        itemTitle: 'Servicio "Te Hago Tu CV" (' + cv.orderNumber + ')',
        date: cv.createdAt,
        amount: `$${cv.priceARS.toLocaleString('es-AR')} ARS`,
        channel: cv.channel,
      })),
    ];

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      purchases,
    };
  });

  // Also include customers who bought licenses/CVs but haven't registered an account yet
  for (const lic of licenses) {
    const licEmail = lic.customerEmail.toLowerCase().trim();
    if (!userMap.has(licEmail)) {
      customersList.push({
        id: 'cust_lic_' + lic.id,
        name: lic.customerName || (licEmail.split('@')[0] ?? 'Cliente'),
        email: lic.customerEmail,
        createdAt: lic.createdAt,
        purchases: [
          {
            itemTitle: 'Planilla "Finanzas en Orden" (' + lic.licenseKey + ')',
            date: lic.createdAt,
            amount: '$14.900 ARS',
            channel: lic.channel,
          },
        ],
      });
    }
  }

  for (const cv of cvOrders) {
    const cvEmail = cv.customerEmail.toLowerCase().trim();
    if (!userMap.has(cvEmail) && !customersList.some((c) => c.email.toLowerCase() === cvEmail)) {
      customersList.push({
        id: 'cust_cv_' + cv.id,
        name: cv.customerName || (cvEmail.split('@')[0] ?? 'Cliente'),
        email: cv.customerEmail,
        createdAt: cv.createdAt,
        purchases: [
          {
            itemTitle: 'Servicio "Te Hago Tu CV" (' + cv.orderNumber + ')',
            date: cv.createdAt,
            amount: `$${cv.priceARS.toLocaleString('es-AR')} ARS`,
            channel: cv.channel,
          },
        ],
      });
    }
  }

  const totalRegisteredAccounts = userMap.size;
  const totalLicensesSold = licenses.length;
  const totalCvOrdersSold = cvOrders.length;
  const pendingCvOrdersCount = cvOrders.filter((c) => c.status === 'PENDIENTE').length;
  const estimatedRevenueARS =
    licenses.length * 14900 + cvOrders.reduce((sum, c) => sum + (c.priceARS || 29900), 0);

  const result = {
    success: true,
    totalAccounts: totalRegisteredAccounts,
    totalLicenses: totalLicensesSold,
    totalCvOrders: totalCvOrdersSold,
    pendingCvOrders: pendingCvOrdersCount,
    totalRevenueARS: estimatedRevenueARS,
    customers: customersList,
  };

  cachedMetrics = { data: result, timestamp: now };
  return result;
}
