import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  User,
  Tag,
  Layers,
  Sparkles,
  Lock,
  GraduationCap,
  Briefcase,
  ShoppingBag,
  Globe2,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { projectsData } from '@/data/projects';
import styles from './proyecto-detail.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Proyecto no encontrado — Flor Martinez',
    };
  }

  return {
    title: `${project.title} — Ecosistema Flor Martinez`,
    description: project.summary,
  };
}

export default async function ProyectoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Determine branch theme
  let branchTheme = 'theme_default';
  let branchBadge = 'Proyecto';
  let BranchIcon = Sparkles;
  let statusText = 'En Desarrollo';
  let isLive = false;

  if (slug === 'agencia-flor-martinez') {
    branchTheme = 'theme_agencia';
    branchBadge = 'Agencia B2B & Tech';
    BranchIcon = Briefcase;
    statusText = 'Próximamente · En Desarrollo';
  } else if (slug === 'tienda-flor-martinez') {
    branchTheme = 'theme_tienda';
    branchBadge = 'Merchandising Corporativo';
    BranchIcon = ShoppingBag;
    statusText = 'Próximamente · En Desarrollo';
  } else if (slug === 'academia-flor-martinez') {
    branchTheme = 'theme_academia';
    branchBadge = 'Plataforma Educativa';
    BranchIcon = GraduationCap;
    statusText = 'Plataforma En Vivo · Acceso Activo';
    isLive = true;
  } else if (slug === 'comercio-exterior-consultoria') {
    branchTheme = 'theme_comercio';
    branchBadge = 'Consultoría de Negocios';
    BranchIcon = Globe2;
    statusText = 'Servicio Activo';
    isLive = true;
  }

  return (
    <main className={`${styles.main} ${styles[branchTheme]}`}>
      {/* ==========================================================================
          HEADER HERO WITH BRANCH COLOR IDENTITY OVER NAVY BLUE BASE
          ========================================================================== */}
      <section className={styles.headerSection}>
        <div className={styles.headerGlowOverlay} aria-hidden="true" />
        
        <Container size="narrow" className={styles.headerContainer}>
          <Link href="/#proyectos" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Volver a la central de proyectos</span>
          </Link>

          <div className={styles.categoryRow}>
            <div className={styles.branchPill}>
              <BranchIcon size={14} className={styles.branchPillIcon} />
              <span>{branchBadge}</span>
            </div>

            <div className={`${styles.statusPill} ${isLive ? styles.statusLive : styles.statusComing}`}>
              {isLive ? (
                <>
                  <span className={styles.pulsingLiveDot} />
                  <span>{statusText}</span>
                </>
              ) : (
                <>
                  <Lock size={12} />
                  <span>{statusText}</span>
                </>
              )}
            </div>
          </div>

          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.tagline}>{project.tagline}</p>
        </Container>
      </section>

      {/* ==========================================================================
          CONTENT BODY
          ========================================================================== */}
      <section className={styles.bodySection}>
        <Container size="narrow">
          {/* Metadata Grid */}
          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>
                <User size={14} /> Rol Profesional
              </span>
              <span className={styles.metaValue}>{project.role}</span>
            </div>

            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>
                <Calendar size={14} /> Período
              </span>
              <span className={styles.metaValue}>{project.year}</span>
            </div>

            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>
                <Layers size={14} /> Categoría
              </span>
              <span className={styles.metaValue}>{project.category}</span>
            </div>
          </div>

          {/* Detailed Summary Card */}
          <div className={styles.overviewCard}>
            <div className={styles.overviewHeader}>
              <span className={styles.cardSectionBadge}>VISIÓN GENERAL</span>
              <h2 className={styles.sectionHeading}>Propuesta de Valor & Alcance</h2>
            </div>
            <p className={styles.summaryText}>{project.summary}</p>
          </div>

          {/* Challenge & Solution */}
          <div className={styles.twoColGrid}>
            <div className={styles.challengeCard}>
              <span className={styles.miniTagChallenge}>DIAGNÓSTICO</span>
              <h3 className={styles.subHeading}>El Desafío</h3>
              <p className={styles.bodyText}>{project.challenge}</p>
            </div>

            <div className={styles.solutionCard}>
              <span className={styles.miniTagSolution}>METODOLOGÍA</span>
              <h3 className={styles.subHeading}>La Solución Estratégica</h3>
              <p className={styles.bodyText}>{project.solution}</p>
            </div>
          </div>

          {/* Key Highlights */}
          {project.highlights && (
            <div className={styles.highlightsSection}>
              <div className={styles.highlightsHeader}>
                <Sparkles size={20} className={styles.highlightsSparkle} />
                <h2 className={styles.sectionHeading}>Aspectos y Pilares Clave</h2>
              </div>
              <ul className={styles.highlightsList}>
                {project.highlights.map((item, idx) => (
                  <li key={idx} className={styles.highlightItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className={styles.tagsSection}>
            <span className={styles.tagsLabel}>
              <Tag size={14} /> Especialidades & Competencias:
            </span>
            <div className={styles.tagsList}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Action Area */}
          <div className={styles.actionCard}>
            <div className={styles.actionCardLeft}>
              <h3 className={styles.actionCardTitle}>¿Querés saber más sobre esta unidad?</h3>
              <p className={styles.actionCardDesc}>
                {isLive
                  ? 'Accedé directamente a la plataforma o coordiná una consulta estratégica con Flor Martinez.'
                  : 'Este proyecto se encuentra en fase de estructuración. Podés contactar a Flor para consultas anticipadas o alianzas corporativas.'}
              </p>
            </div>

            <div className={styles.actionRow}>
              {isLive && project.linkUrl && (
                <a
                  href={project.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryBranchBtn}
                >
                  <span>{project.linkText || 'Visitar plataforma'}</span>
                  <ArrowUpRight size={18} />
                </a>
              )}

              <Button
                href="/#contacto"
                variant={isLive ? 'secondary' : 'primary'}
                size="lg"
                className={styles.contactBranchBtn}
              >
                Contactar a Flor por este servicio
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
