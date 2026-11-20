import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  FolderDown,
  CheckCircle2,
  Calendar,
  Zap,
  Video,
  Table,
  BadgePercent,
  Check,
  GraduationCap,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.heroSection}>
      {/* Background ambient mesh glows */}
      <div className={styles.ambientGlowPrimary} />
      <div className={styles.ambientGlowSecondary} />

      <Container size="wide">
        <div className={styles.heroGrid}>
          {/* LEFT: Copy, Value Proposition & Action CTAs */}
          <div className={styles.copyCol}>
            <div className={styles.badgeRow}>
              <div className={styles.badgeWrap}>
                <Badge variant="primary" size="md">
                  <GraduationCap size={15} style={{ display: 'inline-block', verticalAlign: 'middle', marginTop: '-1px', marginRight: '8px' }} />
                  <span style={{ verticalAlign: 'middle', letterSpacing: '0.03em' }}>Experiencia Búsqueda Laboral</span>
                </Badge>
              </div>

              <Link href="/campus" className={styles.heroCampusQuickPill} title="Ir directamente al Campus Virtual">
                <GraduationCap size={15} className={styles.heroCampusCapIcon} />
                <span>¿Querés probar las clases?</span>
                <strong>Entrar al Campus</strong>
                <ArrowRight size={13} />
              </Link>
            </div>

            <h1 className={styles.title}>
              Conseguí el trabajo que buscás con un método probado y{' '}
              <span className={styles.titleHighlight}>acompañamiento real</span>
            </h1>

            <p className={styles.subtitle}>
              Dejá de enviar postulaciones a ciegas. Sumate a la experiencia integral con más de 35 lecciones prácticas, armado de CV ATS, estrategia en LinkedIn, simulación de entrevistas, tracker de postulaciones y acompañamiento continuo.
            </p>

            <div className={styles.ctaGroup}>
              <Button href="#planes-suscripcion" variant="primary" size="lg" className={styles.primaryBtn}>
                <Sparkles size={18} />
                <span>Ver Promo de Lanzamiento</span>
                <ArrowRight size={18} />
              </Button>

              <Button href="#experiencia-busqueda-laboral" variant="outline" size="lg" className={styles.secondaryBtn}>
                <span>Conocer los Módulos</span>
              </Button>
            </div>

            {/* Micro proof badges */}
            <div className={styles.proofRow}>
              <div className={styles.proofItem}>
                <CheckCircle2 size={16} className={styles.proofCheck} />
                <span>Más de 35 lecciones en video HD</span>
              </div>
              <div className={styles.proofItem}>
                <CheckCircle2 size={16} className={styles.proofCheck} />
                <span>Tracker de búsquedas & Agenda</span>
              </div>
              <div className={styles.proofItem}>
                <CheckCircle2 size={16} className={styles.proofCheck} />
                <span>Plantillas ATS en Word & Notion</span>
              </div>
              <div className={styles.proofItem}>
                <CheckCircle2 size={16} className={styles.proofCheck} />
                <span>Consultas y feedback con Flor en cada clase</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Didactic Interactive Career & CV Simulator Mockup */}
          <div className={styles.visualCol}>
            <div className={styles.simulatorDeck}>
              {/* Main Interactive Card */}
              <div className={styles.mainSimulatorCard}>
                <div className={styles.simCardTop}>
                  <div className={styles.simCardDots}>
                    <span className={styles.dotRed} />
                    <span className={styles.dotYellow} />
                    <span className={styles.dotGreen} />
                  </div>
                  <div className={styles.simCardTitle}>Aula Virtual · Método EBL</div>
                  <div className={styles.simAtsScore}>
                    <Sparkles size={12} />
                    <span>HD 1080p</span>
                  </div>
                </div>

                <div className={styles.simContent}>
                  {/* Real Class Video Frame with Flor */}
                  <div className={styles.classroomPreviewWrap}>
                    <img
                      src="/images/flor-hero-frame.jpg"
                      alt="Flor Martínez dictando clase en la Academia"
                      className={styles.classroomPosterImg}
                    />
                    <div className={styles.classroomPlayOverlay}>
                      <div className={styles.classroomBigPlayBtn}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>
                    <div className={styles.classroomBarOverlay}>
                      <div className={styles.classroomScrubber}>
                        <div className={styles.classroomScrubberFill} />
                      </div>
                      <span>03:45</span>
                      <span>08:15</span>
                    </div>
                  </div>

                  {/* Lesson Meta */}
                  <div className={styles.classroomInfoRow}>
                    <span className={styles.classroomBadge}>MÓDULO 01 · CLASE 01</span>
                    <h3 className={styles.classroomTitle}>
                      Cómo piensa Recursos Humanos al recibir tu CV
                    </h3>
                  </div>

                  {/* Skill Chips */}
                  <div className={styles.skillsRow}>
                    <span className={styles.skillPill}>Método STAR</span>
                    <span className={styles.skillPill}>Palabras clave ATS</span>
                    <span className={styles.skillPill}>LinkedIn SEO</span>
                    <span className={styles.skillPill}>Feedback de Flor</span>
                  </div>

                  {/* Program Features Strip */}
                  <div className={styles.featuresStrip}>
                    <div className={styles.featurePillItem}>
                      <GraduationCap size={13} className={styles.stripIconViolet} />
                      <span>+35 clases prácticas</span>
                    </div>
                    <div className={styles.featurePillItem}>
                      <Table size={13} className={styles.stripIconBlue} />
                      <span>Tracker de búsquedas</span>
                    </div>
                    <div className={styles.featurePillItem}>
                      <Sparkles size={13} className={styles.stripIconAmber} />
                      <span>Respuestas de Flor</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Pill 1: Interviews Notification */}
              <div className={`${styles.floatingPill} ${styles.pillInterviews}`}>
                <div className={styles.pillIconGreen}>
                  <Calendar size={18} />
                </div>
                <div className={styles.pillText}>
                  <strong>¡3 entrevistas coordinadas!</strong>
                  <span>Respuestas en menos de 7 días</span>
                </div>
              </div>

              {/* Floating Pill 2: Feedback Notification */}
              <div className={`${styles.floatingPill} ${styles.pillSalary}`}>
                <div className={styles.pillIconPurple}>
                  <Sparkles size={18} />
                </div>
                <div className={styles.pillText}>
                  <strong>¡Flor respondió tu consulta!</strong>
                  <span>Feedback directo en cada lección</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
