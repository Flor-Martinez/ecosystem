import React from 'react';
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

            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryCta}
            >
              <GraduationCap size={18} />
              <span>Explorar la Academia</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
