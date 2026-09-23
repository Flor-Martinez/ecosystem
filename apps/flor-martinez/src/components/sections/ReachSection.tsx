import React from 'react';
import Image from 'next/image';
import { Sparkles, Users, Award, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from '@/components/ui/Icons';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import styles from './ReachSection.module.css';

export function ReachSection() {
  return (
    <section className={styles.section} id="alcance">
      <Container size="wide">
        <div className={styles.gridContainer}>
          {/* Left Column: Photo 3 Portrait & Verified Card */}
          <div className={styles.portraitCol}>
            <div className={styles.portraitCard}>
              <div className={styles.imageWrapper}>
                <Image
                  src="/images/flor_portrait_3.jpg"
                  alt="Flor Martinez — Comunidad y Presencia Digital"
                  width={460}
                  height={560}
                  className={styles.portraitImg}
                />
              </div>

              {/* Verified Ribbon Overlay */}
              <div className={styles.verifiedOverlay}>
                <div className={styles.verifiedHeader}>
                  <Sparkles size={16} className={styles.sparkleIcon} />
                  <span>Presencia Digital Consolidada</span>
                </div>
                <p className={styles.verifiedSub}>
                  Comunidad activa en constante interacción sobre marca personal, comercio exterior y crecimiento profesional.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Reach Metrics */}
          <div className={styles.metricsCol}>
            <div className={styles.badgeWrap}>
              <Badge variant="primary" size="md">
                <Users size={14} className={styles.badgeIcon} />
                Alcance & Comunidad Digital
              </Badge>
            </div>

            <h2 className={styles.title}>
              Una audiencia activa que respalda el impacto del Ecosistema
            </h2>

            <p className={styles.description}>
              El valor de una marca profesional se mide en la confianza de su comunidad. A través de contenidos diarios, análisis de mercado y mentoría, construimos una red de alto nivel profesional y profesionalismo.
            </p>

            {/* Metrics Cards Grid */}
            <div className={styles.statsGrid}>
              {/* Stat 1: Instagram */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.statCard} ${styles.statInstagram}`}
              >
                <div className={styles.statHeader}>
                  <div className={styles.iconBoxInsta}>
                    <InstagramIcon size={22} />
                  </div>
                  <ArrowUpRight size={18} className={styles.statArrow} />
                </div>
                <div className={styles.statNumber}>+35.000</div>
                <div className={styles.statLabel}>Seguidores en Instagram</div>
                <p className={styles.statDetail}>
                  Comunidad activa en desarrollo profesional, empleabilidad y tendencia de carrera en <code>@flormartinez.ok</code>.
                </p>
              </a>

              {/* Stat 2: LinkedIn */}
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.statCard} ${styles.statLinkedin}`}
              >
                <div className={styles.statHeader}>
                  <div className={styles.iconBoxLinkin}>
                    <LinkedinIcon size={22} />
                  </div>
                  <ArrowUpRight size={18} className={styles.statArrow} />
                </div>
                <div className={styles.statNumber}>+22.000</div>
                <div className={styles.statLabel}>Contactos en LinkedIn</div>
                <p className={styles.statDetail}>
                  Red profesional B2B con directivos, reclutadores, ejecutivos y líderes de industria.
                </p>
              </a>

              {/* Stat 3: Enfoque */}
              <div className={`${styles.statCard} ${styles.statApproach}`}>
                <div className={styles.statHeader}>
                  <div className={styles.iconBoxApproach}>
                    <CheckCircle2 size={22} />
                  </div>
                </div>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>Práctico & Aplicado</div>
                <p className={styles.statDetail}>
                  Metodología orientada a resultados tangibles desde el primer día sin rodeos teóricos.
                </p>
              </div>

              {/* Stat 4: Ecosistema */}
              <div className={`${styles.statCard} ${styles.statEcosystem}`}>
                <div className={styles.statHeader}>
                  <div className={styles.iconBoxEco}>
                    <Award size={22} />
                  </div>
                </div>
                <div className={styles.statNumber}>3</div>
                <div className={styles.statLabel}>Unidades de Impacto</div>
                <p className={styles.statDetail}>
                  Arquitectura integral: Consultoría B2B, Formación Práctica y Merchandising Corporativo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
