import { notFound } from 'next/navigation';
import { solutionsData, getSolutionBySlug } from '@/data/solutions';
import SolutionDetailClient from './SolutionDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return solutionsData.map((item) => ({
    slug: item.slug,
  }));
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  return <SolutionDetailClient solution={solution} />;
}
