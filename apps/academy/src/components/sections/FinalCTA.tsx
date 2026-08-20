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
              Elegí el taller que necesitás resolver, descargá las plantillas y empezá a recibir las respuestas que estás esperando.
            </p>

            <div className={styles.actions}>
              <Button href="/cursos" variant="white" size="lg" className={styles.primaryBtn}>
                <span>Explorar todos los cursos</span>
                <ArrowRight size={18} />
              </Button>

              <Button href="/recursos" variant="outline" size="lg" className={styles.secondaryBtn}>
                <FolderDown size={18} />
                <span>Ver biblioteca gratuita</span>
              </Button>
            </div>

            <div className={styles.guaranteeRow}>
              <span className={styles.guaranteeItem}>
                <ShieldCheck size={16} />
                <span>Acceso inmediato de por vida</span>
              </span>
              <span className={styles.guaranteeDot}>•</span>
              <span className={styles.guaranteeItem}>
                <span>Plantillas editables en Word & Notion</span>
              </span>
              <span className={styles.guaranteeDot}>•</span>
              <span className={styles.guaranteeItem}>
                <span>Soporte directo para tus dudas</span>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
