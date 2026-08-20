import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Clock,
  BarChart2,
  Video,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Users,
  ChevronRight,
  FileText,
  GraduationCap,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CourseCard } from '@/components/courses/CourseCard';
import { coursesData } from '@/data/courses';
import styles from './curso-detail.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return coursesData.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = coursesData.find((c) => c.slug === slug);

  if (!course) {
    return {
      title: 'Curso no encontrado — Academia Flor Martinez',
    };
  }

  return {
    title: `${course.title} — Academia Flor Martinez`,
    description: course.tagline,
  };
}

export default async function CursoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = coursesData.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  const isAvailable = course.status === 'Disponible';
  const relatedCourses = coursesData.filter((c) => c.slug !== course.slug).slice(0, 2);

  return (
    <main className={styles.main}>
      {/* 1. HERO HEADER */}
      <section className={styles.heroSection}>
        <Container size="wide">
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Ruta de navegación">
            <Link href="/" className={styles.breadcrumbLink}>
              Inicio
            </Link>
            <ChevronRight size={14} className={styles.bcArrow} />
            <Link href="/cursos" className={styles.breadcrumbLink}>
              Cursos
            </Link>
            <ChevronRight size={14} className={styles.bcArrow} />
            <span className={styles.breadcrumbCurrent}>{course.title}</span>
          </nav>

          <div className={styles.heroGrid}>
            {/* Left Header Content */}
            <div className={styles.heroMain}>
              <div className={styles.topBadgesRow}>
                <Badge variant="primary" size="md">
                  {course.category}
                </Badge>
                {course.badge && (
                  <Badge variant="warning" size="md">
                    <Sparkles size={12} className={styles.sparkleIcon} />
                    <span>{course.badge}</span>
                  </Badge>
                )}
                <span className={`${styles.statusTag} ${isAvailable ? styles.statusAvailable : styles.statusUpcoming}`}>
                  {course.status}
                </span>
              </div>

              <h1 className={styles.title}>{course.title}</h1>
              <p className={styles.tagline}>{course.tagline}</p>

              {/* Meta Stats Row */}
              <div className={styles.metaStatsRow}>
                <div className={styles.metaItem}>
                  <Clock size={16} className={styles.metaIcon} />
                  <div>
                    <span className={styles.metaLabel}>Duración</span>
                    <span className={styles.metaVal}>{course.duration}</span>
                  </div>
                </div>
                <div className={styles.metaItem}>
                  <BarChart2 size={16} className={styles.metaIcon} />
                  <div>
                    <span className={styles.metaLabel}>Nivel</span>
                    <span className={styles.metaVal}>{course.level}</span>
                  </div>
                </div>
                <div className={styles.metaItem}>
                  <Video size={16} className={styles.metaIcon} />
                  <div>
                    <span className={styles.metaLabel}>Modalidad</span>
                    <span className={styles.metaVal}>{course.modality}</span>
                  </div>
                </div>
                {course.workload && (
                  <div className={styles.metaItem}>
                    <FileText size={16} className={styles.metaIcon} />
                    <div>
                      <span className={styles.metaLabel}>Dedicación</span>
                      <span className={styles.metaVal}>{course.workload}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Card / Enrollment Box */}
            <div className={styles.heroSidebar}>
              <div className={styles.pricingCard}>
                <div className={styles.pricingHeader}>
                  <span className={styles.enrollmentLabel}>Inscripción al Programa</span>
                  {course.price ? (
                    <div className={styles.priceWrap}>
                      <span className={styles.priceCurrent}>{course.price.current}</span>
                      {course.price.original && (
                        <span className={styles.priceOriginal}>{course.price.original}</span>
                      )}
                      {course.price.installments && (
                        <span className={styles.installmentsTag}>
                          {course.price.installments}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className={styles.priceTba}>Próximamente disponible</span>
                  )}
                </div>

                <div className={styles.pricingActions}>
                  {isAvailable ? (
                    <>
                      <Button href={`/campus?programa=${course.slug}`} variant="primary" size="lg" className={styles.enrollBtn}>
                        <GraduationCap size={18} />
                        <span>Ingresar al Aula & Cursar</span>
                      </Button>
                      <Button href="/contacto" variant="outline" size="md" className={styles.enrollBtn}>
                        <span>Consultar por este programa</span>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button href={`/campus?programa=${course.slug}`} variant="primary" size="lg" className={styles.enrollBtn}>
                        <GraduationCap size={18} />
                        <span>Ver Demo en Campus Virtual</span>
                      </Button>
                      <Button href="/contacto" variant="outline" size="md" className={styles.enrollBtn}>
                        <span>Avisarme del lanzamiento</span>
                      </Button>
                    </>
                  )}
                  <span className={styles.safeNote}>
                    <ShieldCheck size={14} />
                    <span>Acceso inmediato · Modalidad 100% online</span>
                  </span>
                </div>

                {course.included && course.included.length > 0 && (
                  <div className={styles.includedSection}>
                    <span className={styles.incTitle}>Este programa incluye:</span>
                    <ul className={styles.incList}>
                      {course.included.map((inc, i) => (
                        <li key={i} className={styles.incItem}>
                          <CheckCircle2 size={15} className={styles.incCheck} />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. MAIN COURSE CONTENT BODY */}
      <section className={styles.contentSection}>
        <Container size="wide">
          <div className={styles.contentGrid}>
            <div className={styles.mainContentCol}>
              {/* Description Paragraphs */}
              <div className={styles.descBlock}>
                <h2 className={styles.blockTitle}>Sobre este programa</h2>
                <div className={styles.descText}>
                  {course.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Outcomes: Lo que vas a lograr */}
              <div className={styles.outcomesBlock}>
                <h2 className={styles.blockTitle}>Lo que vas a lograr</h2>
                <div className={styles.outcomesGrid}>
                  {course.outcomes.map((outcome, idx) => (
                    <div key={idx} className={styles.outcomeCard}>
                      <div className={styles.outcomeCheckWrap}>
                        <CheckCircle2 size={18} />
                      </div>
                      <p className={styles.outcomeText}>{outcome}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Syllabus / Module Breakdown */}
              <div className={styles.syllabusBlock}>
                <div className={styles.syllabusHeader}>
                  <h2 className={styles.blockTitle}>Programa modular de estudio</h2>
                  <span className={styles.modulesCount}>
                    {course.modules.length} {course.modules.length === 1 ? 'Módulo' : 'Módulos'}
                  </span>
                </div>

                <div className={styles.modulesList}>
                  {course.modules.map((mod) => (
                    <div key={mod.id} className={styles.moduleCard}>
                      <div className={styles.moduleTop}>
                        <div className={styles.moduleNumberBadge}>Módulo 0{mod.number}</div>
                        <div className={styles.moduleDuration}>{mod.duration}</div>
                      </div>
                      <h3 className={styles.moduleTitle}>{mod.title}</h3>
                      <p className={styles.moduleDesc}>{mod.description}</p>
                      
                      <div className={styles.lessonsWrap}>
                        <span className={styles.lessonsTitle}>Temas & Casos Prácticos:</span>
                        <ul className={styles.lessonsList}>
                          {mod.lessons.map((lesson, lIdx) => (
                            <li key={lIdx} className={styles.lessonItem}>
                              <span className={styles.lessonBullet}>•</span>
                              <span>{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Audience & Prerequisites */}
              <div className={styles.audienceBlock}>
                <div className={styles.audienceCol}>
                  <h3 className={styles.subBlockTitle}>¿A quién está dirigido?</h3>
                  <ul className={styles.styledList}>
                    {course.targetAudience.map((target, idx) => (
                      <li key={idx}>
                        <Users size={16} className={styles.listIcon} />
                        <span>{target}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.prereqCol}>
                  <h3 className={styles.subBlockTitle}>Requisitos previos</h3>
                  <ul className={styles.styledList}>
                    {course.prerequisites.map((req, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={16} className={styles.listIcon} />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Methodology & Support Box */}
              <div className={styles.supportBlock}>
                <h2 className={styles.blockTitle}>Metodología & Soporte</h2>
                <Card variant="surface" padding="lg" className={styles.supportCard}>
                  <div className={styles.supportIconWrap}>
                    <GraduationCap size={28} />
                  </div>
                  <div className={styles.supportInfo}>
                    <h3 className={styles.supportHeading}>Metodología Práctica Academia FM</h3>
                    <p className={styles.supportDesc}>
                      Este programa está pensado para personas con poco tiempo libre. Cada módulo incluye ejercicios guiados y plantillas editables en formato digital para que termines tu material mientras mirás las clases.
                    </p>
                    <div className={styles.supportPills}>
                      <span className={styles.supPill}>✔ Soporte para consultas</span>
                      <span className={styles.supPill}>✔ Actualizaciones continuas</span>
                      <span className={styles.supPill}>✔ Certificado digital</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. RELATED COURSES */}
      {relatedCourses.length > 0 && (
        <section className={styles.relatedSection}>
          <Container size="wide">
            <div className={styles.relatedHeader}>
              <h2 className={styles.relatedTitle}>Otros programas que pueden interesarte</h2>
              <Link href="/cursos" className={styles.seeAllLink}>
                <span>Ver catálogo completo</span>
                <ChevronRight size={16} />
              </Link>
            </div>
            <div className={styles.relatedGrid}>
              {relatedCourses.map((relCourse) => (
                <CourseCard key={relCourse.id} course={relCourse} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}
