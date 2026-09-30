import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSolutionBySlug } from '@/data/solutions';
import SolutionDetailClient from '../soluciones/[slug]/SolutionDetailClient';

export async function generateMetadata(): Promise<Metadata> {
  const solution = getSolutionBySlug('te-hago-tu-cv');

  if (!solution) {
    return {
      title: 'Te Hago Tu CV | Flor Martínez',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flormartinezok.com';
  const canonicalUrl = `${siteUrl}/te-hago-tu-cv`;

  return {
    title: `${solution.title} — ${solution.tagline} | Flor Martínez`,
    description: solution.shortDescription || solution.fullDescription,
    keywords: [
      solution.title,
      solution.category,
      'Flor Martínez',
      'Te Hago Tu CV',
      'CV Profesional ATS',
      'Currículum Vitae',
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

export default async function TeHagoTuCvPage() {
  const solution = getSolutionBySlug('te-hago-tu-cv');

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
      url: `${siteUrl}/te-hago-tu-cv`,
    },
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
