import React from 'react';
import type { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { ExperienceTools } from '@/components/sections/ExperienceTools';
import { FinalCTA } from '@/components/sections/FinalCTA';
import styles from './herramientas.module.css';

export const metadata: Metadata = {
  title: 'Herramientas de Búsqueda Laboral & Tracker — Academia Flor Martinez',
  description:
    'Explorá las herramientas exclusivas de la Academia: Tracker de postulaciones activas, agenda semanal de entrevistas, sesiones en vivo con feedback profesional y cupones de descuento.',
};

export default function HerramientasPage() {
  return (
    <main className={styles.main}>
      {/* 1. HERO */}
      <section className={styles.heroSection}>
        <Container size="wide">
          <div className={styles.heroBadgeWrap}>
            <Badge variant="primary" size="md">
              <Sparkles size={14} className={styles.sparkleIcon} />
              <span>Plataforma & Herramientas Exclusivas</span>
            </Badge>
          </div>

          <h1 className={styles.heroTitle}>
            El set de herramientas para organizar tu búsqueda laboral
          </h1>

          <p className={styles.heroSubtitle}>
            Dejá las planillas sueltas y los mails desordenados. Como miembro de la Academia tenés acceso a un panel interactivo para medir cada etapa de tu proceso de selección.
          </p>
        </Container>
      </section>

      {/* 2. INTERACTIVE TOOLS SUITE */}
      <ExperienceTools />

      {/* 3. FINAL CTA */}
      <FinalCTA />
    </main>
  );
}
