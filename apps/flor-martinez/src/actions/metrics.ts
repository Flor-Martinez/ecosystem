'use server';

import fs from 'fs';
import path from 'path';
import { db } from '@repo/db';
import { getLicensesListAction } from './licenses';

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

export async function getAdminMetricsAction() {
  ensureUsersFileExists();
  let dbUsers: any[] = [];
  try {
    dbUsers = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    // fallback if DB not reachable
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

  const licensesRes = await getLicensesListAction();
  const licenses = licensesRes.licenses || [];

  // Map purchases to users by email
  const customersList: CustomerMetricRecord[] = Array.from(userMap.values()).map((user) => {
    const userLicenses = licenses.filter(
      (l) => l.customerEmail.toLowerCase().trim() === user.email.toLowerCase().trim()
    );

    const purchases = userLicenses.map((lic) => ({
      itemTitle: 'Planilla "Finanzas en Orden" (Licencia ' + lic.licenseKey + ')',
      date: lic.createdAt,
      amount: '$14.900 ARS',
      channel: lic.channel,
    }));

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      purchases,
    };
  });

  // Also include customers who bought licenses but haven't registered an account yet
  for (const lic of licenses) {
    const licEmail = lic.customerEmail.toLowerCase().trim();
    if (!userMap.has(licEmail)) {
      customersList.push({
        id: 'cust_' + lic.id,
        name: lic.customerName || (licEmail.split('@')[0] ?? 'Cliente'),
        email: lic.customerEmail,
        createdAt: lic.createdAt,
        purchases: [
          {
            itemTitle: 'Planilla "Finanzas en Orden" (Licencia ' + lic.licenseKey + ')',
            date: lic.createdAt,
            amount: '$14.900 ARS',
            channel: lic.channel,
          },
        ],
      });
    }
  }

  const totalRegisteredAccounts = userMap.size;
  const totalLicensesSold = licenses.length;
  const estimatedRevenueARS = licenses.length * 14900;

  return {
    success: true,
    totalAccounts: totalRegisteredAccounts,
    totalLicenses: totalLicensesSold,
    totalRevenueARS: estimatedRevenueARS,
    customers: customersList,
  };
}
