import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  checkIsAdminAction,
  getLicensesListAction,
} from '@/actions/licenses';
import { getAdminMetricsAction } from '@/actions/metrics';
import { getContactSubmissionsAction } from '@/actions/contactSubmissions';
import { getSolutionReviewsAction } from '@/actions/solutionReviews';
import AdminDashboardClient from './AdminDashboardClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Panel de Control | Superadmin',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const [adminCheck, licensesRes, metricsRes, contactsRes, reviewsRes] = await Promise.all([
    checkIsAdminAction(),
    getLicensesListAction(),
    getAdminMetricsAction(),
    getContactSubmissionsAction(),
    getSolutionReviewsAction(undefined, true),
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
      pendingContactCount={contactsRes.pendingCount || 0}
      totalContactCount={contactsRes.contacts?.length || 0}
      totalReviewsCount={reviewsRes.stats?.totalReviews || 0}
      averageRating={reviewsRes.stats?.averageRating || 5.0}
    />
  );
}
