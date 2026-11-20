import React from 'react';
import { ArrowRight, GraduationCap, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import styles from './TrialBanner.module.css';

export function TrialBanner() {
  return (
    <section className={styles.section}>
      <Container size="wide">
        <div className={styles.bannerCard}>
          <div className={styles.content}>
            <div className={styles.badge}>
              <Sparkles size={13} />
              <span>Conocé el Campus</span>
            </div>
            <h3 className={styles.title}>¿Querés probar la Academia antes de sumarte?</h3>
            <p className={styles.description}>
              Ingresá al Campus Virtual, explorá la plataforma por dentro y descubrí cómo el Método EBL te ayuda a ordenar tu búsqueda laboral desde el primer día.
            </p>
          </div>
          <div className={styles.actions}>
            <Button href="/campus" variant="primary" size="lg" className={styles.btn}>
              <GraduationCap size={18} />
              <span>Probar el Campus Virtual</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
