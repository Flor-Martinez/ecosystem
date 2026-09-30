import { Metadata } from 'next';
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return {
      title: 'Solución no encontrada | Flor Martínez',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flormartinezok.com';
  const canonicalUrl = `${siteUrl}/soluciones/${solution.slug}`;

  return {
    title: `${solution.title} — ${solution.tagline} | Flor Martínez`,
    description: solution.shortDescription || solution.fullDescription,
    keywords: [
      solution.title,
      solution.category,
      'Flor Martínez',
      'Finanzas en orden',
      'Plantilla Excel Google Sheets',
      'Te Hago Tu CV',
      'CV Profesional ATS',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${solution.title} | Flor Martínez`,
      description: solution.shortDescription,
      url: canonicalUrl,
      siteName: 'Flor Martínez Ecosystem',
      locale: 'es_AR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${solution.title} | Flor Martínez`,
      description: solution.shortDescription,
    },
  };
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flormartinezok.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: solution.title,
    description: solution.shortDescription,
    category: solution.category,
    brand: {
      '@type': 'Brand',
      name: 'Flor Martínez',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'ARS',
      price: solution.priceARS,
      availability: 'https://schema.org/InStock',
      url: `${siteUrl}/soluciones/${solution.slug}`,
    },
    aggregateRating: solution.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: solution.rating,
          reviewCount: solution.reviewsCount || 15,
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SolutionDetailClient solution={solution} />
    </>
  );
}
