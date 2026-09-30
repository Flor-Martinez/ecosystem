import React from 'react';
import Link from 'next/link';
import { ArrowRight, GraduationCap, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import styles from './CTA.module.css';

export function CTA() {
  return (
    <section className={styles.ctaSection}>
      <Container size="wide">
        <div className={styles.ctaBox}>
          <div className={styles.badgeWrapper}>
            <span className={styles.ctaBadge}>Conversemos</span>
          </div>

          <h2 className={styles.title}>
            ¿Listo para dar el próximo paso en tus proyectos o desarrollo profesional?
          </h2>

          <p className={styles.description}>
            Ya sea que busques asesoramiento estratégico, formación en empleabilidad a través de la Academia
            o explorar una colaboración comercial, estoy a disposición para coordinar una conversación directa.
          </p>

          <div className={styles.buttonGroup}>
            <Button
              href="/contacto"
              variant="white"
              size="lg"
              leftIcon={<Mail size={18} />}
              rightIcon={<ArrowRight size={18} />}
            >
              Contactar a Flor
            </Button>

            <Link
              href="/proyecto/academia-flor-martinez"
              className={styles.secondaryCta}
            >
              <GraduationCap size={18} />
              <span>Ver Ficha de la Academia</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
