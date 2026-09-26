import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { checkIsAdminAction } from '@/actions/licenses';
import { getAdminMetricsAction } from '@/actions/metrics';
import AdminClientesClient from './AdminClientesClient';

export const metadata: Metadata = {
  title: 'Gestión de Clientes | Admin',
  robots: { index: false, follow: false },
};

export default async function AdminClientesPage() {
  const adminCheck = await checkIsAdminAction();

  if (!adminCheck.isAdmin) {
    notFound();
  }

  const metricsRes = await getAdminMetricsAction();

  return (
    <AdminClientesClient
      metrics={{
        totalAccounts: metricsRes.totalAccounts || 0,
        totalLicenses: metricsRes.totalLicenses || 0,
        totalCvOrders: metricsRes.totalCvOrders || 0,
        totalRevenueARS: metricsRes.totalRevenueARS || 0,
        customers: metricsRes.customers || [],
      }}
    />
  );
}
