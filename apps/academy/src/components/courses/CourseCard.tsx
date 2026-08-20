import React from 'react';
import Link from 'next/link';
import { Clock, BarChart2, Video, ArrowRight, Sparkles, CheckCircle2, BookOpen } from 'lucide-react';
import { Course } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import styles from './CourseCard.module.css';

interface CourseCardProps {
  course: Course;
  featured?: boolean;
}

export function CourseCard({ course, featured = false }: CourseCardProps) {
  const isAvailable = course.status === 'Disponible';

  return (
    <article className={`${styles.card} ${featured ? styles.cardFeatured : ''}`}>
      {/* Top Didactic Visual Header */}
      <div className={styles.cardHeaderArea}>
        <div className={styles.headerGlow} />
        
        <div className={styles.topBadgesRow}>
          <span className={styles.categoryBadge}>{course.category}</span>
          {course.badge && (
            <Badge variant="primary" size="sm">
              <Sparkles size={11} className={styles.sparkleIcon} />
              <span>{course.badge}</span>
            </Badge>
          )}
        </div>

        <div className={styles.iconCircle}>
          <BookOpen size={24} />
        </div>

        {/* Status indicator */}
        <div className={styles.statusPill}>
          <span className={`${styles.statusDot} ${isAvailable ? styles.dotAvailable : styles.dotUpcoming}`} />
          <span>{course.status}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className={styles.cardBody}>
        <div className={styles.metaPillsRow}>
          <span className={styles.metaPill}>
            <Clock size={13} />
            <span>{course.duration}</span>
          </span>
          <span className={styles.metaPill}>
            <BarChart2 size={13} />
            <span>{course.level}</span>
          </span>
          <span className={styles.metaPill}>
            <Video size={13} />
            <span>{course.modality}</span>
          </span>
        </div>

        <h3 className={styles.title}>
          <Link href={`/cursos/${course.slug}`} className={styles.titleLink}>
            {course.title}
          </Link>
        </h3>

        <p className={styles.tagline}>{course.tagline}</p>

        {/* Key outcomes snippet */}
        {course.outcomes && course.outcomes.length > 0 && (
          <ul className={styles.outcomesList}>
            {course.outcomes.slice(0, 2).map((outcome, idx) => (
              <li key={idx} className={styles.outcomeItem}>
                <CheckCircle2 size={14} className={styles.checkIcon} />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer Area with Price & CTA */}
      <div className={styles.cardFooter}>
        <div className={styles.priceCol}>
          {course.price ? (
            <>
              <span className={styles.priceLabel}>Inversión</span>
              <div className={styles.priceRow}>
                <span className={styles.currentPrice}>{course.price.current}</span>
                {course.price.original && (
                  <span className={styles.originalPrice}>{course.price.original}</span>
                )}
              </div>
              {course.price.installments && (
                <span className={styles.installments}>{course.price.installments}</span>
              )}
            </>
          ) : (
            <span className={styles.pricePlaceholder}>Próximamente disponible</span>
          )}
        </div>

        <div className={styles.actionCol}>
          <Button
            href={`/cursos/${course.slug}`}
            variant={isAvailable ? 'primary' : 'outline'}
            size="sm"
            className={styles.cardBtn}
          >
            <span>{isAvailable ? 'Ver Programa' : 'Consultar'}</span>
            <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </article>
  );
}
