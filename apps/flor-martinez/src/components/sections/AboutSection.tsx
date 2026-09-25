import React from 'react';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Trajectory } from '@/components/sections/Trajectory';
import styles from './AboutSection.module.css';

export function AboutSection() {
  return (
    <section className={styles.section} id="sobre-mi">
      {/* Header presentation */}
      <div className={styles.headerArea}>
        <Container size="wide">
          <div className={styles.headerBadgeWrap}>
            <Badge variant="primary" size="md">
              Biografía & Trayectoria
            </Badge>
          </div>

          <div className={styles.leadGrid}>
            <div className={styles.leadTextCol}>
              <h2 className={styles.sectionTitle}>Sobre Flor Martinez</h2>
              <p className={styles.leadParagraph}>
                Licenciada en Comercio Internacional y Máster en Dirección Comercial (OBS Business School – Universidad de Barcelona).
                Gerente de Oficina Mendoza en logística multinacional y creadora de contenido profesional sobre empleabilidad y desarrollo de carrera con +50.000 seguidores.
              </p>

              <div className={styles.tagPills}>
                <span className={styles.tagPill}>Comercio Internacional</span>
                <span className={styles.tagPill}>Dirección Comercial</span>
                <span className={styles.tagPill}>Desarrollo Profesional</span>
              </div>
            </div>

            <div className={styles.leadPhotoCol}>
              <div className={styles.standingFrame}>
                <Image
                  src="/images/flor_standing_2.jpg"
                  alt="Flor Martinez — Liderazgo y desarrollo profesional"
                  width={420}
                  height={560}
                  className={styles.standingImg}
                />
                <div className={styles.standingBadge}>
                  <ShieldCheck size={20} color="#1E3A5F" />
                  <span>Enfoque Práctico & Resultados</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Trajectory Timeline (Carrera & Formación) */}
      <Trajectory />
    </section>
  );
}
