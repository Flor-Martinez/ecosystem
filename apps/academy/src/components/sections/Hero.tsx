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
                  <Zap size={13} className={styles.zapIcon} />
                  <span>Experiencia Búsqueda Laboral</span>
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
              Dejá de enviar postulaciones a ciegas. Sumate a la experiencia integral con clases en vivo, armado de CV ATS, estrategia en LinkedIn, simulación de entrevistas, tracker de postulaciones y charlas semanales de feedback vía Zoom.
            </p>

            <div className={styles.ctaGroup}>
              <Button href="/campus" variant="primary" size="lg" className={styles.primaryBtn}>
                <GraduationCap size={20} />
                <span>Ingresar al Campus Virtual</span>
                <ArrowRight size={18} />
              </Button>

              <Button href="/experiencia" variant="outline" size="lg" className={styles.secondaryBtn}>
                <span>Conocer el Programa</span>
              </Button>

              <Button href="/recursos" variant="ghost" size="md" className={styles.tertiaryBtn}>
                <FolderDown size={17} />
                <span>Plantillas gratis</span>
              </Button>
            </div>

            {/* Micro proof badges */}
            <div className={styles.proofRow}>
              <div className={styles.proofItem}>
                <CheckCircle2 size={16} className={styles.proofCheck} />
                <span>Charlas semanales vía Zoom con feedback</span>
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
                <span>Cupones para Tienda Flor Martinez</span>
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
                  <div className={styles.simCardTitle}>Auditoría de Perfil Profesional</div>
                  <div className={styles.simAtsScore}>
                    <Sparkles size={12} />
                    <span>Match ATS: 98%</span>
                  </div>
                </div>

                <div className={styles.simContent}>
                  {/* Mini Candidate Header */}
                  <div className={styles.candHeader}>
                    <div className={styles.candAvatar}>CV</div>
                    <div className={styles.candMeta}>
                      <div className={styles.candName}>Tu Nombre & Apellido</div>
                      <div className={styles.candRole}>Especialista en Marketing / Operaciones / IT</div>
                    </div>
                  </div>

                  {/* Simulated optimized bullets */}
                  <div className={styles.simSection}>
                    <div className={styles.simSectionLabel}>EXPERIENCIA OPTIMIZADA CON EL MÉTODO</div>
                    <div className={styles.simBullet}>
                      <div className={styles.bulletCheck}>
                        <Check size={14} />
                      </div>
                      <p>
                        Lideró optimización de procesos logrando un <strong>+35% de eficiencia</strong> en tiempos de entrega.
                      </p>
                    </div>
                    <div className={styles.simBullet}>
                      <div className={styles.bulletCheck}>
                        <Check size={14} />
                      </div>
                      <p>
                        Diseñó e implementó campañas digitales con retorno de inversión de <strong>3.8x ROAS</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Skill Chips */}
                  <div className={styles.skillsRow}>
                    <span className={styles.skillPill}>Método STAR</span>
                    <span className={styles.skillPill}>Palabras clave ATS</span>
                    <span className={styles.skillPill}>LinkedIn SEO</span>
                    <span className={styles.skillPill}>Negociación Salarial</span>
                  </div>

                  {/* Program Features Strip */}
                  <div className={styles.featuresStrip}>
                    <div className={styles.featurePillItem}>
                      <Video size={13} className={styles.stripIconViolet} />
                      <span>Zoom semanal en vivo</span>
                    </div>
                    <div className={styles.featurePillItem}>
                      <Table size={13} className={styles.stripIconBlue} />
                      <span>Tracker de búsquedas</span>
                    </div>
                    <div className={styles.featurePillItem}>
                      <BadgePercent size={13} className={styles.stripIconAmber} />
                      <span>Cupones Tienda FM</span>
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

              {/* Floating Pill 2: Weekly Zoom Live Call */}
              <div className={`${styles.floatingPill} ${styles.pillSalary}`}>
                <div className={styles.pillIconPurple}>
                  <Video size={18} />
                </div>
                <div className={styles.pillText}>
                  <strong>Charla en vivo este miércoles</strong>
                  <span>Revisión de CVs & feedback grupal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
