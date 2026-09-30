import { redirect } from 'next/navigation';
import { solutionsData } from '@/data/solutions';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return solutionsData.map((item) => ({
    slug: item.slug,
  }));
}

export default async function LegacySolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const targetSlug = slug === 'organizador-de-finanzas' ? 'finanzas-en-orden' : slug;
  redirect(`/${targetSlug}`);
}
