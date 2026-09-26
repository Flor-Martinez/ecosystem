import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { checkIsAdminAction, getLicensesListAction } from '@/actions/licenses';
import AdminLicenciasClient from '../licencias/AdminLicenciasClient';

export const metadata: Metadata = {
  title: 'Finanzas en Orden | Admin',
  robots: { index: false, follow: false },
};

export default async function AdminFinanzasEnOrdenPage() {
  const [adminCheck, licensesRes] = await Promise.all([
    checkIsAdminAction(),
    getLicensesListAction(),
  ]);

  if (!adminCheck.isAdmin) {
    notFound();
  }

  return (
    <AdminLicenciasClient
      initialIsAdmin={adminCheck.isAdmin}
      initialAdminEmail={adminCheck.email}
      initialLicenses={licensesRes.licenses || []}
    />
  );
}
