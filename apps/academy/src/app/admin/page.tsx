import React from 'react';
import { Metadata } from 'next';
import AdminDashboardClient from './AdminDashboardClient';

export const metadata: Metadata = {
  title: 'Panel de Administración | Academia Flor Martinez',
  description: 'Panel de gestión exclusivo para Superadmins de la Academia Flor Martinez.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminDashboardClient />;
}
