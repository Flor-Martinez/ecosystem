import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import styles from './Intro.module.css';

export function Intro() {
  return (
    <section className={styles.intro} id="sobre-mi">
      <Container size="wide">
        <div className={styles.aboutSplitGrid}>
          {/* Left: Full-Body Standing Editorial Photo */}
          <div className={styles.photoWrapper}>
            <div className={styles.standingPhotoFrame}>
              <Image
                src="/images/flor-standing.jpg"
                alt="Flor Martinez — Profesional en Comercio Exterior y Marketing"
                width={460}
                height={600}
                className={styles.standingImg}
              />
              <div className={styles.photoCaption}>
                <span className={styles.captionName}>Flor Martinez</span>
                <span className={styles.captionLocation}>Buenos Aires · Proyección Global</span>
              </div>
            </div>
          </div>

          {/* Right: Clean Concise Bio */}
          <div className={styles.narrativeContent}>
            <div className={styles.tagWrap}>
              <span className={styles.preTag}>PERFIL & ENFOQUE</span>
            </div>

            <h2 className={styles.title}>
              Articulando la precisión del comercio internacional con la estrategia de marca
            </h2>

            <div className={styles.narrativeText}>
              <p>
                Mi carrera se construye en la intersección de dos mundos: la rigurosidad operativa
                del <strong>Comercio Exterior</strong> y la capacidad de comunicar valor del <strong>Marketing Estratégico</strong>.
              </p>
              <p>
                A través de este ecosistema conecto soluciones formativas, consultoría empresarial y herramientas
                concretas de crecimiento profesional, con una premisa clara: resultados reales sin rodeos teóricos.
              </p>
            </div>

            <div className={styles.highlightsList}>
              <div className={styles.highlightItem}>
                <CheckCircle2 size={18} className={styles.checkIcon} />
                <span>Enfoque 100% práctico y aplicable</span>
              </div>
              <div className={styles.highlightItem}>
                <CheckCircle2 size={18} className={styles.checkIcon} />
                <span>Metodología probada en operaciones y empleabilidad</span>
              </div>
              <div className={styles.highlightItem}>
                <CheckCircle2 size={18} className={styles.checkIcon} />
                <span>Acompañamiento cercano y personalizado</span>
              </div>
            </div>

            <div className={styles.aboutCtaRow}>
              <Link href="/sobre-mi" className={styles.aboutLink}>
                <span>Conocer biografía y trayectoria completa</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
