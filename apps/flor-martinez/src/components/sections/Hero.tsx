import React from 'react';
import Image from 'next/image';
import { Sparkles, ShieldCheck, ArrowDown, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FMMonogram } from '@/components/ui/BrandLogo';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero} id="inicio">
      {/* Decorative Brand Sparkles & Lines */}
      <div className={styles.decorWave} aria-hidden="true" />

      <Container size="wide">
        {/* Main Hero Presentation */}
        <div className={styles.heroMainGrid}>
          {/* Left: Presentation Text */}
          <div className={styles.heroTextCol}>
            <div className={styles.brandTagline}>
              <span className={styles.sparkleIcon}>✦</span>
              <span className={styles.taglineText}>MARCA PERSONAL & ECOSISTEMA PROFESIONAL</span>
              <span className={styles.sparkleIcon}>✦</span>
            </div>

            <h1 className={styles.title}>Flor Martinez</h1>

            <p className={styles.subtitle}>
              Comercio Exterior <span className={styles.bullet}>·</span> Marketing <span className={styles.bullet}>·</span> Desarrollo Profesional
            </p>

            <p className={styles.description}>
              Articulo consultoría estratégica para negocios internacionales, soluciones de comunicación
              y programas prácticos de empleabilidad y crecimiento de carrera.
            </p>

            <div className={styles.quickMetrics}>
              <div className={styles.metricItem}>
                <ShieldCheck size={18} className={styles.metricIcon} />
                <span>Rigor Operativo & Comercial</span>
              </div>
              <div className={styles.metricItem}>
                <Sparkles size={18} className={styles.metricIcon} />
                <span>3 Unidades de Impacto</span>
              </div>
            </div>

            {/* Quick Hero Actions */}
            <div className={styles.heroActionRow}>
              <Button href="#proyectos" variant="primary" size="lg" className={styles.heroPrimaryBtn}>
                <span>Explorar Ecosistema</span>
                <ArrowDown size={18} />
              </Button>
              <a
                href="http://localhost:3001"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroAcademyLiveBtn}
              >
                <span>Academia En Vivo</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* Right: Real Editorial Portrait Photo */}
          <div className={styles.heroPhotoCol}>
            <div className={styles.photoFrame}>
              <div className={styles.photoContainer}>
                <Image
                  src="/images/flor-hero.jpg"
                  alt="Flor Martinez — Especialista en Comercio Exterior, Marketing y Mentora Profesional"
                  width={520}
                  height={650}
                  priority
                  className={styles.portraitImg}
                />
              </div>

              {/* Floating Verified Badge */}
              <div className={styles.floatingBadge}>
                <FMMonogram size={42} variant="circle-navy" />
                <div className={styles.floatingBadgeText}>
                  <span className={styles.floatingName}>Flor Martinez</span>
                  <span className={styles.floatingRole}>Fundadora & Directora</span>
                </div>
              </div>

              {/* Live Status Pill */}
              <div className={styles.liveIndicatorPill}>
                <span className={styles.pulsingDot} />
                <span>Ecosistema Activo · 2025</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
