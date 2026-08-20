import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { CourseCatalogView } from '@/components/courses/CourseCatalogView';

export const metadata: Metadata = {
  title: 'Catálogo de Cursos & Workshops — Academia Flor Martinez',
  description:
    'Explorá todos los programas prácticos de optimización de CV, posicionamiento en LinkedIn, preparación de entrevistas y estrategias de búsqueda laboral.',
};

export default function CursosPage() {
  return (
    <main>
      <Suspense fallback={<div style={{ padding: '8rem 2rem', textAlign: 'center' }}>Cargando catálogo...</div>}>
        <CourseCatalogView />
      </Suspense>
    </main>
  );
}
