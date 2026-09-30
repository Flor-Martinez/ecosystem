import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { checkIsAdminAction } from '@/actions/licenses';
import { getContactSubmissionsAction } from '@/actions/contactSubmissions';
import AdminConsultasClient from './AdminConsultasClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Consultas Web & Mensajes Directos | Admin',
  robots: { index: false, follow: false },
};

export default async function AdminConsultasPage() {
  const adminCheck = await checkIsAdminAction();

  if (!adminCheck.isAdmin) {
    notFound();
  }

  const contactsRes = await getContactSubmissionsAction();

  return (
    <AdminConsultasClient
      initialContacts={contactsRes.contacts || []}
      initialPendingCount={contactsRes.pendingCount || 0}
    />
  );
}
