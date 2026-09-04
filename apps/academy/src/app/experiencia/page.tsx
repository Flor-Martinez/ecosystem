import React from 'react';
import type { Metadata } from 'next';
import {
  Sparkles,
  ArrowRight,
  Zap,
  Check,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ExperienceFeature } from '@/components/sections/ExperienceFeature';
import { ExperienceTools } from '@/components/sections/ExperienceTools';
import { ExperiencePricing } from '@/components/sections/ExperiencePricing';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FinalCTA } from '@/components/sections/FinalCTA';
import styles from './experiencia.module.css';

export const metadata: Metadata = {
  title: 'Experiencia Búsqueda Laboral — Academia Flor Martinez',
  description:
    'El programa integral con membresía, clases en vivo, armado de CV ATS, estrategia en LinkedIn, simulación de entrevistas y tracker de búsquedas activas.',
};

export default function ExperienciaPage() {
  return (
    <main className={styles.main}>
      {/* 1. HERO OF THE EXPERIENCE */}
      <section className={styles.heroSection}>
        <Container size="wide">
          <div className={styles.heroGrid}>
            <div className={styles.heroMain}>
              <div className={styles.badgeWrap}>
                <Badge variant="primary" size="md">
                  <Zap size={14} className={styles.zapIcon} />
                  <span>Programa Integral & Membresía Activa</span>
                </Badge>
              </div>

              <h1 className={styles.title}>
                Experiencia <span className={styles.titleHighlight}>Búsqueda Laboral</span>
              </h1>

              <p className={styles.subtitle}>
                La búsqueda de trabajo no tiene por qué ser solitaria ni desordenada. Te acompañamos semana a semana con un método integral que combina clases prácticas, revisión en vivo de tus documentos en sesiones grupales y herramientas exclusivas para gestionar tus postulaciones.
              </p>

              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <strong className={styles.statNumber}>5</strong>
                  <span className={styles.statLabel}>Ejes Formativos</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <strong className={styles.statNumber}>Semanal</strong>
                  <span className={styles.statLabel}>Sesiones en Vivo</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <strong className={styles.statNumber}>100%</strong>
                  <span className={styles.statLabel}>Plantillas & Tracker</span>
                </div>
              </div>

              <div className={styles.heroActions}>
                <Button href="#planes-suscripcion" variant="primary" size="lg">
                  <span>Ver Planes de Membresía</span>
                  <ArrowRight size={18} />
                </Button>
                <Button href="#herramientas-experiencia" variant="outline" size="lg">
                  <span>Explorar Herramientas</span>
                </Button>
              </div>
            </div>

            {/* Right Feature Card */}
            <div className={styles.heroSidebar}>
              <div className={styles.highlightCard}>
                <div className={styles.highlightHeader}>
                  <Sparkles size={18} className={styles.sparkleIcon} />
                  <strong>¿Qué incluye tu membresía activa?</strong>
                </div>

                <ul className={styles.highlightList}>
                  <li>
                    <Check size={16} className={styles.checkIcon} />
                    <div>
                      <strong>Armado de CV ATS & Plantillas</strong>
                      <span>Modelos editables en Word y Notion testeados con algoritmos.</span>
                    </div>
                  </li>
                  <li>
                    <Check size={16} className={styles.checkIcon} />
                    <div>
                      <strong>Estrategia & SEO en LinkedIn</strong>
                      <span>Perfil estelar y fórmulas de conexión con reclutadores.</span>
                    </div>
                  </li>
                  <li>
                    <Check size={16} className={styles.checkIcon} />
                    <div>
                      <strong>Simulación de Entrevistas</strong>
                      <span>Método STAR y técnicas de negociación salarial.</span>
                    </div>
                  </li>
                  <li>
                    <Check size={16} className={styles.checkIcon} />
                    <div>
                      <strong>Tracker de Búsquedas & Agenda</strong>
                      <span>Tu panel para no perder ningún follow-up de RRHH.</span>
                    </div>
                  </li>
                  <li>
                    <Check size={16} className={styles.checkIcon} />
                    <div>
                      <strong>Sesiones Semanales en Vivo</strong>
                      <span>Revisión de tu CV y consultas cara a cara con nuestro equipo.</span>
                    </div>
                  </li>
                  <li>
                    <Check size={16} className={styles.checkIcon} />
                    <div>
                      <strong>Cupones Tienda Flor Martinez</strong>
                      <span>Descuentos exclusivos en papelería de autor y planners.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. THE 5 CORE MODULES */}
      <ExperienceFeature />

      {/* 3. EXCLUSIVE TOOLS (TRACKER, CALENDAR, ZOOM, TIENDA) */}
      <ExperienceTools />

      {/* 4. PRICING PLANS & SUBSCRIPTION */}
      <ExperiencePricing />

      {/* 5. TESTIMONIALS */}
      <TestimonialsSection />

      {/* 6. FINAL CTA */}
      <FinalCTA />
    </main>
  );
}
