import React from 'react';
import Link from 'next/link';
import {
  FileText,
  Share2,
  MessageSquare,
  Compass,
  Sparkles,
  GraduationCap,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { learningCategories } from '@/data/categories';
import styles from './CategoriesSection.module.css';

const iconMap: Record<string, React.ElementType> = {
  FileText,
  Share2,
  MessageSquare,
  Compass,
  Sparkles,
  GraduationCap,
};

export function CategoriesSection() {
  return (
    <section className={styles.section} id="categorias">
      <Container size="wide">
        <SectionHeader
          badge="Áreas de Aprendizaje"
          badgeVariant="primary"
          title="Todo lo que necesitás para conseguir laburo"
          subtitle="Elegí el área en la que querés profundizar y accedé a cursos, talleres y plantillas especializadas."
        />

        <div className={styles.categoriesGrid}>
          {learningCategories.map((cat) => {
            const IconComp = iconMap[cat.icon] || BookOpen;
            return (
              <Link
                key={cat.id}
                href={`/cursos?categoria=${cat.slug}`}
                className={styles.catCard}
                style={{
                  '--cat-bg': cat.colorBg,
                  '--cat-border': cat.colorBorder,
                  '--cat-text': cat.colorText,
                } as React.CSSProperties}
              >
                <div className={styles.catTop}>
                  <div className={styles.iconCircle}>
                    <IconComp size={24} />
                  </div>
                  <span className={styles.courseCountBadge}>
                    {cat.coursesCount} {cat.coursesCount === 1 ? 'Curso' : 'Cursos'}
                  </span>
                </div>

                <h3 className={styles.catTitle}>{cat.title}</h3>
                <p className={styles.catDesc}>{cat.shortDesc}</p>

                <div className={styles.skillPillWrap}>
                  <span className={styles.skillLabel}>Habilidad clave:</span>
                  <span className={styles.skillBadge}>{cat.highlightSkill}</span>
                </div>

                <div className={styles.catFooter}>
                  <span>Explorar programas</span>
                  <ArrowRight size={15} className={styles.arrowIcon} />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
