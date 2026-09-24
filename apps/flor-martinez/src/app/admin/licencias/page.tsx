import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { checkIsAdminAction } from '@/actions/licenses';
import { getAllLicenses, type SpreadsheetLicenseRecord } from '@/lib/licensing';
import AdminLicenciasClient from './AdminLicenciasClient';

export const metadata: Metadata = {
  title: 'Gestor de Licencias (Superadmin) | Flor Martínez',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLicenciasPage() {
  const adminCheck = await checkIsAdminAction();

  // Stealth 404: Si no está autenticado como Superadmin, muestra 404
  if (!adminCheck.isAdmin) {
    notFound();
  }

  let initialLicenses: SpreadsheetLicenseRecord[] = [];
  try {
    initialLicenses = await getAllLicenses();
  } catch {
    initialLicenses = [];
  }

  return (
    <AdminLicenciasClient
      initialIsAdmin={adminCheck.isAdmin}
      initialAdminEmail={adminCheck.email}
      initialLicenses={initialLicenses}
    />
  );
}
