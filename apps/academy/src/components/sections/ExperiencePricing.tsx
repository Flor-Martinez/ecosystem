import React from 'react';
import { Check, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { experienceProgram } from '@/data/experience';
import styles from './ExperiencePricing.module.css';

export function ExperiencePricing() {
  return (
    <section className={styles.section} id="planes-suscripcion">
      <Container size="wide">
        <SectionHeader
          badge="Inversión en tu Carrera"
          badgeVariant="primary"
          title="Elegí el plan de membresía para tu búsqueda"
          subtitle="Sumate a la Experiencia Búsqueda Laboral con acceso inmediato a los módulos, campus, tracker, agenda y charlas semanales de Zoom."
        />

        <div className={styles.pricingGrid}>
          {experienceProgram.plans.map((plan) => (
            <div
              key={plan.id}
              className={`${styles.planCard} ${plan.featured ? styles.featuredCard : ''}`}
            >
              {plan.badge && (
                <div className={styles.planBadge}>
                  <Sparkles size={12} />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div className={styles.cardHeader}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.priceWrap}>
                  <span className={styles.priceMain}>{plan.price}</span>
                  <span className={styles.billingPeriod}>/ {plan.billingPeriod}</span>
                </div>
                {plan.originalPrice && (
                  <span className={styles.originalPrice}>Antes {plan.originalPrice}</span>
                )}
                {plan.installmentsNote && (
                  <span className={styles.installments}>{plan.installmentsNote}</span>
                )}
              </div>

              <div className={styles.divider} />

              <div className={styles.featuresSection}>
                <span className={styles.featuresTitle}>Todo lo que incluye:</span>
                <ul className={styles.featuresList}>
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className={styles.featItem}>
                      <div className={styles.checkWrap}>
                        <Check size={14} />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.cardAction}>
                <Button
                  href="/contacto"
                  variant={plan.featured ? 'primary' : 'outline'}
                  size="lg"
                  className={styles.planBtn}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight size={16} />
                </Button>

                <div className={styles.guaranteeNote}>
                  <ShieldCheck size={14} />
                  <span>Garantía de satisfacción · Acceso inmediato</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
