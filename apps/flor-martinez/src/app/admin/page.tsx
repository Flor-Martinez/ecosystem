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
  const [adminCheck, licensesRes, metricsRes] = await Promise.all([
    checkIsAdminAction(),
    getLicensesListAction(),
    getAdminMetricsAction(),
  ]);

  // Stealth 404: Si no está autenticado como Superadmin, muestra la pantalla 404
  if (!adminCheck.isAdmin) {
    notFound();
  }

  return (
    <AdminDashboardClient
      currentAdminEmail={adminCheck.email || ''}
      licensesCount={licensesRes.licenses?.length || 0}
      cvOrdersCount={metricsRes.totalCvOrders || 0}
      pendingCvOrdersCount={metricsRes.pendingCvOrders || 0}
      totalCustomersCount={metricsRes.totalAccounts || 0}
      totalRevenueARS={metricsRes.totalRevenueARS || 0}
    />
  );
}
