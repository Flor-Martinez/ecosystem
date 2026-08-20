import React from 'react';
import { Sparkles, Clock, Compass, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { coursesData } from '@/data/courses';
import styles from './UpcomingCoursesSection.module.css';

export function UpcomingCoursesSection() {
  return (
    <section className={styles.section} id="cursos-especificos">
      <Container size="wide">
        <SectionHeader
          badge="Evolución del Catálogo"
          badgeVariant="primary"
          title="Talleres & Cursos Específicos en Desarrollo"
          subtitle="Actualmente centralizamos toda nuestra formación y seguimiento en la Experiencia Búsqueda Laboral. Próximamente sumaremos talleres temáticos de profundización para temas puntuales."
        />

        <div className={styles.coursesGrid}>
          {coursesData.slice(0, 3).map((course) => (
            <div key={course.id} className={styles.courseCard}>
              <div className={styles.topStatusRow}>
                <span className={styles.categoryBadge}>{course.category}</span>
                <span className={styles.devBadge}>
                  <Clock size={12} />
                  <span>En Desarrollo · Próximamente</span>
                </span>
              </div>

              <h3 className={styles.courseTitle}>{course.title}</h3>
              <p className={styles.courseTagline}>{course.tagline}</p>
              <p className={styles.courseSummary}>{course.summary}</p>

              <div className={styles.includedInExpNotice}>
                <Sparkles size={14} className={styles.sparkleIcon} />
                <span>
                  <strong>Nota:</strong> Los contenidos de este taller están incluidos de forma completa dentro de la <strong>Experiencia Búsqueda Laboral</strong>.
                </span>
              </div>

              <div className={styles.cardFooter}>
                <Button href={`/cursos/${course.slug}`} variant="outline" size="sm" className={styles.seeDetailBtn}>
                  <span>Ver programa temático</span>
                  <ArrowRight size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Banner to anchor in the Experience */}
        <div className={styles.anchorBanner}>
          <div className={styles.anchorLeft}>
            <div className={styles.anchorIconBox}>
              <Compass size={24} />
            </div>
            <div>
              <h4 className={styles.anchorTitle}>¿Buscás resolver tu búsqueda laboral ahora mismo?</h4>
              <p className={styles.anchorDesc}>
                No necesitás esperar a los talleres individuales: la Experiencia Búsqueda Laboral contiene todo el material, las plantillas, el tracker y las llamadas en vivo.
              </p>
            </div>
          </div>
          <Button href="/experiencia" variant="primary" size="md" className={styles.anchorBtn}>
            <span>Sumarme a la Experiencia Búsqueda Laboral</span>
            <ArrowRight size={16} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
