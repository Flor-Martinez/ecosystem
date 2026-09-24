import React from 'react';
import { Metadata } from 'next';
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
  let initialLicenses: SpreadsheetLicenseRecord[] = [];

  if (adminCheck.isAdmin) {
    try {
      initialLicenses = await getAllLicenses();
    } catch {
      initialLicenses = [];
    }
  }

  return (
    <AdminLicenciasClient
      initialIsAdmin={adminCheck.isAdmin}
      initialAdminEmail={adminCheck.email}
      initialLicenses={initialLicenses}
    />
  );
}
