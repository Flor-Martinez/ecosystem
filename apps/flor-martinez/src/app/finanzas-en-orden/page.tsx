import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSolutionBySlug } from '@/data/solutions';
import SolutionDetailClient from '../soluciones/[slug]/SolutionDetailClient';

export async function generateMetadata(): Promise<Metadata> {
  const solution = getSolutionBySlug('finanzas-en-orden');

  if (!solution) {
    return {
      title: 'Finanzas en Orden | Flor Martínez',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flormartinezok.com';
  const canonicalUrl = `${siteUrl}/finanzas-en-orden`;

  return {
    title: `${solution.title} — ${solution.tagline} | Flor Martínez`,
    description: solution.shortDescription || solution.fullDescription,
    keywords: [
      solution.title,
      solution.category,
      'Flor Martínez',
      'Finanzas en orden',
      'Plantilla Excel Google Sheets',
      'Organizador financiero',
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

export default async function FinanzasEnOrdenPage() {
  const solution = getSolutionBySlug('finanzas-en-orden');

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
      url: `${siteUrl}/finanzas-en-orden`,
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
