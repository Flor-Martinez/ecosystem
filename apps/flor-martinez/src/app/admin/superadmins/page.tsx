import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { checkIsAdminAction, getSuperAdminEmailsAction } from '@/actions/licenses';
import AdminSuperadminsClient from './AdminSuperadminsClient';

export const metadata: Metadata = {
  title: 'Superadmins | Admin',
  robots: { index: false, follow: false },
};

export default async function AdminSuperadminsPage() {
  const adminCheck = await checkIsAdminAction();

  if (!adminCheck.isAdmin) {
    notFound();
  }

  const adminsRes = await getSuperAdminEmailsAction();

  return (
    <AdminSuperadminsClient
      initialAdmins={adminsRes.emails || []}
      primaryAdmins={adminsRes.primaryEmails || []}
    />
  );
}
