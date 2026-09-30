import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { checkIsAdminAction } from '@/actions/licenses';
import { getSolutionReviewsAction } from '@/actions/solutionReviews';
import AdminOpinionesClient from './AdminOpinionesClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Opiniones & Reseñas de Clientes | Admin',
  robots: { index: false, follow: false },
};

export default async function AdminOpinionesPage() {
  const adminCheck = await checkIsAdminAction();

  if (!adminCheck.isAdmin) {
    notFound();
  }

  const reviewsRes = await getSolutionReviewsAction(undefined, true);

  return (
    <AdminOpinionesClient
      initialReviews={reviewsRes.reviews || []}
      initialStats={
        reviewsRes.stats || {
          totalReviews: 0,
          averageRating: 5.0,
          visibleReviewsCount: 0,
        }
      }
    />
  );
}
