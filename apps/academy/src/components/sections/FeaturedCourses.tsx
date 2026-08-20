import React from 'react';
import { ArrowRight, Building2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { CourseCard } from '@/components/courses/CourseCard';
import { coursesData } from '@/data/courses';
import styles from './FeaturedCourses.module.css';

export function FeaturedCourses() {
  const featuredCourses = coursesData.filter((c) => c.featured);

  return (
    <section className={styles.section} id="cursos-destacados">
      <Container size="wide">
        <SectionHeader
          badge="Talleres & Cursos"
          badgeVariant="primary"
          title="Los programas más elegidos para dar el salto"
          subtitle="Formación 100% práctica con acceso de por vida, plantillas editables y acompañamiento paso a paso."
        />

        {/* Featured Courses Grid */}
        <div className={styles.grid}>
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} featured={course.popular} />
          ))}
        </div>

        {/* Bottom Callout: In-Company & Universities */}
        <div className={styles.corporateCallout}>
          <div className={styles.corpLeft}>
            <div className={styles.corpIconWrap}>
              <Building2 size={28} />
            </div>
            <div>
              <span className={styles.corpTag}>Empresas & Universidades</span>
              <h3 className={styles.corpTitle}>¿Buscás capacitar a tu equipo o camada de estudiantes?</h3>
              <p className={styles.corpDesc}>
                Diseñamos workshops a medida sobre empleabilidad joven, marca personal en LinkedIn y técnicas de entrevista para instituciones y organizaciones.
              </p>
            </div>
          </div>
          <div className={styles.corpRight}>
            <Button href="/contacto" variant="primary" size="md" className={styles.corpBtn}>
              <span>Consultar por programas grupales</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
