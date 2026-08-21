import React from 'react';
import type { Metadata } from 'next';
import { TestVocacionalClient } from './TestVocacionalClient';

export const metadata: Metadata = {
  title: 'Test Vocacional Gratuito & Orientación Laboral — Flor Martinez Academia',
  description:
    'Descubrí tu perfil profesional, tu arquetipo de trabajo y los roles con mayor proyección con el Test Vocacional interactivo de 12 preguntas de Flor Martínez. Diagnóstico gratuito y orientaciones prácticas para tu CV y LinkedIn.',
  keywords: [
    'test vocacional',
    'test vocacional gratis',
    'orientacion laboral',
    'arquetipos laborales',
    'perfil profesional',
    'busqueda de empleo',
    'roles de trabajo',
    'flor martinez',
    'cv ats',
    'estrategia laboral',
  ],
  openGraph: {
    title: 'Test Vocacional Gratuito & Orientación Laboral — Academia Flor Martinez',
    description:
      'Evaluá tus preferencias en 12 situaciones reales y descubrí tus fortalezas profesionales y puestos ideales en el mercado.',
    type: 'website',
    url: 'https://flor-martinez-academia.vercel.app/test-vocacional',
    siteName: 'Academia Flor Martinez',
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test Vocacional Gratuito & Orientación Laboral — Academia Flor Martinez',
    description:
      'Descubrí tu arquetipo laboral y roles con mayor proyección con el test interactivo gratuito de Flor Martínez.',
  },
  alternates: {
    canonical: '/test-vocacional',
  },
};

export default function TestVocacionalPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: 'Test Vocacional y de Orientación Laboral Gratuito',
    description:
      'Test interactivo de 12 preguntas situacionales para identificar tu arquetipo laboral (Estratégico, Analítico, Personas, Creativo) y los puestos con mayor afinidad en el mercado de trabajo.',
    educationalLevel: 'Professional / Vocational Education',
    timeRequired: 'PT5M',
    provider: {
      '@type': 'Organization',
      name: 'Academia Flor Martínez',
      url: 'https://flor-martinez-academia.vercel.app',
      sameAs: [
        'https://www.linkedin.com',
        'https://www.instagram.com',
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TestVocacionalClient />
    </>
  );
}
