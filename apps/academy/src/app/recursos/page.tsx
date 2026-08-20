import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { ResourceCatalogView } from '@/components/resources/ResourceCatalogView';

export const metadata: Metadata = {
  title: 'Recursos Gratuitos de Empleabilidad — Academia Flor Martinez',
  description:
    'Descargá plantillas de CV en formato editorial, checklists de control de postulaciones, guías de LinkedIn y directorios de empleo remoto 100% gratis.',
};

export default function RecursosPage() {
  return (
    <main>
      <Suspense fallback={<div style={{ padding: '8rem 2rem', textAlign: 'center' }}>Cargando biblioteca de recursos...</div>}>
        <ResourceCatalogView />
      </Suspense>
    </main>
  );
}
