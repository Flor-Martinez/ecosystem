'use client';

import React, { useState } from 'react';
import { Check, Sparkles, ShieldCheck, ArrowRight, Zap, GraduationCap } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { ExperiencePurchaseModal } from './ExperiencePurchaseModal';
import styles from './ExperiencePricing.module.css';

const planFeatures = [
  'Más de 35 lecciones prácticas en video HD (7 Módulos Troncales + Módulos Extra)',
  'Tracker de Postulaciones profesional para organizar y medir tus procesos',
  'Agenda & Calendario de seguimiento semanal de búsquedas',
  'Descarga de todas las plantillas editables de CV en Word y Notion',
  'Espacio de comentarios y consultas con respuestas directas de Flor en cada clase',
  'Evaluaciones y certificación digital de cada módulo aprobado',
  'Acceso garantizado durante 1 año completo (12 meses) sin costos recurrentes',
];

export function ExperiencePricing() {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  return (
    <section className={styles.section} id="planes-suscripcion">
      <Container size="wide">
        <SectionHeader
          badge="Inversión en tu Carrera"
          badgeVariant="primary"
          title="Acceso Completo a la Experiencia Búsqueda Laboral"
          subtitle="Un único pago para transformar tu perfil y postularte con seguridad, con acceso irrestricto por un año entero."
        />

        <div className={styles.pricingGrid}>
          <div className={`${styles.planCard} ${styles.featuredCard}`}>
            <div className={styles.planBadge}>
              <Sparkles size={12} />
              <span>PROMO LANZAMIENTO · PAGO ÚNICO</span>
            </div>

            <div className={styles.cardHeader}>
              <h3 className={styles.planName}>Pase Anual Completo — Método EBL</h3>
              <div className={styles.priceWrap}>
                <span className={styles.priceMain}>$ 25.000 ARS</span>
                <span className={styles.billingPeriod}>/ pago único</span>
              </div>
              <span className={styles.originalPrice}>Precio regular: $ 34.900 ARS</span>
              <span className={styles.installments}>Acceso por 1 año entero · Sin suscripciones mensuales</span>
            </div>

            <div className={styles.divider} />

            <div className={styles.featuresSection}>
              <span className={styles.featuresTitle}>Todo lo que incluye tu acceso:</span>
              <ul className={styles.featuresList}>
                {planFeatures.map((feat, idx) => (
                  <li key={idx} className={styles.featItem}>
                    <div className={styles.checkWrap}>
                      <Check size={14} />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.cardFooter}>
              <Button
                type="button"
                variant="primary"
                size="lg"
                className={styles.planBtn}
                onClick={() => setIsPurchaseModalOpen(true)}
              >
                <GraduationCap size={18} />
                <span>Sumarme con Promo Lanzamiento</span>
                <ArrowRight size={16} />
              </Button>
              <div className={styles.guaranteeNote}>
                <ShieldCheck size={16} />
                <span>Activación inmediata en el Campus Virtual</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Checkout / Purchase Modal */}
      <ExperiencePurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
      />
    </section>
  );
}
