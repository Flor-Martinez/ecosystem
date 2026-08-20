import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Download,
  FileText,
  CheckCircle2,
  ShieldCheck,
  FolderDown,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ResourceCard } from '@/components/resources/ResourceCard';
import { resourcesData } from '@/data/resources';
import { coursesData } from '@/data/courses';
import styles from './recurso-detail.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return resourcesData.map((res) => ({
    slug: res.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = resourcesData.find((r) => r.slug === slug);

  if (!resource) {
    return {
      title: 'Recurso no encontrado — Academia Flor Martinez',
    };
  }

  return {
    title: `${resource.title} — Recursos Academia Flor Martinez`,
    description: resource.tagline,
  };
}

export default async function RecursoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const resource = resourcesData.find((r) => r.slug === slug);

  if (!resource) {
    notFound();
  }

  const relatedCourse = coursesData.find((c) => c.categorySlug === resource.categorySlug) || coursesData[0];
  const otherResources = resourcesData.filter((r) => r.slug !== resource.slug).slice(0, 2);

  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <Container size="wide">
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Ruta de navegación">
            <Link href="/" className={styles.breadcrumbLink}>
              Inicio
            </Link>
            <ChevronRight size={14} className={styles.bcArrow} />
            <Link href="/recursos" className={styles.breadcrumbLink}>
              Recursos
            </Link>
            <ChevronRight size={14} className={styles.bcArrow} />
            <span className={styles.breadcrumbCurrent}>{resource.title}</span>
          </nav>

          <div className={styles.heroGrid}>
            {/* Left Content */}
            <div className={styles.mainCol}>
              <div className={styles.badgesRow}>
                <span className={styles.typeBadge}>
                  <FileText size={14} />
                  <span>{resource.type}</span>
                </span>
                <span className={styles.freeBadge}>100% Gratuito</span>
                {resource.badge && (
                  <Badge variant="primary" size="md">
                    {resource.badge}
                  </Badge>
                )}
              </div>

              <h1 className={styles.title}>{resource.title}</h1>
              <p className={styles.tagline}>{resource.tagline}</p>

              <div className={styles.metaRow}>
                <span className={styles.metaItem}>Formato: <strong>{resource.format}</strong></span>
                {resource.pagesOrItems && (
                  <span className={styles.metaItem}>Contenido: <strong>{resource.pagesOrItems}</strong></span>
                )}
                {resource.readingTime && (
                  <span className={styles.metaItem}>Tiempo estimado: <strong>{resource.readingTime}</strong></span>
                )}
              </div>

              <div className={styles.descBlock}>
                <h2 className={styles.sectionHeading}>Descripción del material</h2>
                <p className={styles.descText}>{resource.description}</p>
              </div>

              {resource.highlights && resource.highlights.length > 0 && (
                <div className={styles.highlightsBlock}>
                  <h2 className={styles.sectionHeading}>¿Qué vas a encontrar en este recurso?</h2>
                  <div className={styles.highlightsList}>
                    {resource.highlights.map((item, idx) => (
                      <div key={idx} className={styles.highlightCard}>
                        <CheckCircle2 size={18} className={styles.checkIcon} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resource.instagramReference && (
                <div className={styles.igBox}>
                  <div className={styles.igIconWrap}>
                    <InstagramIcon size={22} />
                  </div>
                  <div className={styles.igContent}>
                    <span className={styles.igTitle}>Contenido conectado en Instagram</span>
                    <p className={styles.igPost}>
                      Este recurso acompaña la publicación: <em>&ldquo;{resource.instagramReference.postTitle}&rdquo;</em> en la cuenta oficial <strong>{resource.instagramReference.account}</strong>.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar: Download Box & Recommended Course */}
            <div className={styles.sidebarCol}>
              <div className={styles.downloadCard}>
                <div className={styles.downloadIconWrap}>
                  <FolderDown size={32} />
                </div>
                <h3 className={styles.downloadTitle}>Acceso Inmediato</h3>
                <p className={styles.downloadDesc}>
                  Descargá el archivo en formato {resource.format} directamente para empezar a usarlo.
                </p>

                <Button
                  href={resource.downloadUrl || '#'}
                  variant="primary"
                  size="lg"
                  className={styles.downloadBtn}
                >
                  <Download size={18} />
                  <span>Descargar recurso gratis</span>
                </Button>

                <div className={styles.securityTag}>
                  <ShieldCheck size={14} />
                  <span>Sin registro obligatorio · Descarga directa</span>
                </div>
              </div>

              {/* Related Course Up-sell Card */}
              {relatedCourse && (
                <div className={styles.coursePromoCard}>
                  <span className={styles.promoTag}>Programa Recomendado</span>
                  <h4 className={styles.promoTitle}>{relatedCourse.title}</h4>
                  <p className={styles.promoDesc}>{relatedCourse.tagline}</p>
                  <Button
                    href={`/cursos/${relatedCourse.slug}`}
                    variant="outline"
                    size="sm"
                    className={styles.promoBtn}
                  >
                    <span>Ver programa completo</span>
                    <ArrowRight size={14} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Other Resources */}
      {otherResources.length > 0 && (
        <section className={styles.otherResourcesSection}>
          <Container size="wide">
            <div className={styles.otherHeader}>
              <h2 className={styles.otherTitle}>Otros recursos gratuitos recomendados</h2>
              <Link href="/recursos" className={styles.seeAllLink}>
                <span>Ver biblioteca completa</span>
                <ChevronRight size={16} />
              </Link>
            </div>
            <div className={styles.otherGrid}>
              {otherResources.map((other) => (
                <ResourceCard key={other.id} resource={other} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}
