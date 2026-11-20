import React from 'react';
import { ArrowRight, FolderDown, Zap, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import styles from './FinalCTA.module.css';

export function FinalCTA() {
  return (
    <section className={styles.section}>
      <Container size="wide">
        <div className={styles.banner}>
          <div className={styles.bgGlow1} />
          <div className={styles.bgGlow2} />

          <div className={styles.content}>
            <div className={styles.topBadge}>
              <Zap size={14} className={styles.zapIcon} />
              <span>Empezá a transformar tu búsqueda hoy</span>
            </div>

            <h2 className={styles.title}>
              Tu talento merece estar en el radar de las mejores empresas
            </h2>

            <p className={styles.subtitle}>
              Sumate al Método EBL, organizá tus postulaciones con el tracker profesional y empezá a recibir las respuestas que estás esperando.
            </p>

            <div className={styles.actions}>
              <Button href="/campus" variant="white" size="lg" className={styles.primaryBtn}>
                <span>Ingresar al Campus Virtual</span>
                <ArrowRight size={18} />
              </Button>

              <Button href="#planes-suscripcion" variant="outline" size="lg" className={styles.secondaryBtn}>
                <span>Ver Promo Lanzamiento ($20.000)</span>
              </Button>
            </div>

            <div className={styles.guaranteeRow}>
              <span className={styles.guaranteeItem}>
                <ShieldCheck size={16} />
                <span>Acceso por 1 año completo</span>
              </span>
              <span className={styles.guaranteeDot}>•</span>
              <span className={styles.guaranteeItem}>
                <span>Plantillas editables en Word & Notion</span>
              </span>
              <span className={styles.guaranteeDot}>•</span>
              <span className={styles.guaranteeItem}>
                <span>Feedback y respuestas de Flor</span>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
