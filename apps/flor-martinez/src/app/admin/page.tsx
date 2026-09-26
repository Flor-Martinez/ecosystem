import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  checkIsAdminAction,
  getSuperAdminEmailsAction,
  getLicensesListAction,
} from '@/actions/licenses';
import { getAdminMetricsAction } from '@/actions/metrics';
import AdminDashboardClient from './AdminDashboardClient';

export const metadata: Metadata = {
  title: 'Panel de Control | Superadmin',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const adminCheck = await checkIsAdminAction();

  // Stealth 404: Si no está autenticado como Superadmin, muestra la pantalla 404
  if (!adminCheck.isAdmin) {
    notFound();
  }

  // Carga inicial de datos
  const adminsRes = await getSuperAdminEmailsAction();
  const licensesRes = await getLicensesListAction();
  const metricsRes = await getAdminMetricsAction();

  return (
    <AdminDashboardClient
      currentAdminEmail={adminCheck.email || ''}
      initialAdmins={adminsRes.emails || []}
      primaryAdmins={adminsRes.primaryEmails || []}
      licensesCount={licensesRes.licenses?.length || 0}
      metrics={metricsRes}
    />
  );
}
