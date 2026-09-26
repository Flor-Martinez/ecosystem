import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { checkIsAdminAction } from '@/actions/licenses';
import { getCvOrdersAction } from '@/actions/cvOrders';
import AdminCvsClient from './AdminCvsClient';

export const metadata: Metadata = {
  title: 'Pedidos de CVs | Admin',
  robots: { index: false, follow: false },
};

export default async function AdminCvsPage() {
  const adminCheck = await checkIsAdminAction();

  if (!adminCheck.isAdmin) {
    notFound();
  }

  const cvOrdersRes = await getCvOrdersAction();

  return <AdminCvsClient initialOrders={cvOrdersRes.orders || []} />;
}
