import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { testimonialsData } from '@/data/testimonials';
import styles from './TestimonialsSection.module.css';

export function TestimonialsSection() {
  return (
    <section className={styles.section} id="testimonios">
      <Container size="wide">
        <SectionHeader
          badge="Historias Reales"
          badgeVariant="primary"
          title="De no tener respuestas a cerrar ofertas"
          subtitle="Conocé las experiencias de estudiantes y profesionales que transformaron su búsqueda con nuestros programas."
        />

        <div className={styles.grid}>
          {testimonialsData.map((t) => (
            <div key={t.id} className={styles.testCard}>
              <div className={styles.cardTop}>
                <div className={styles.starsRow}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className={styles.starIcon} fill="currentColor" />
                  ))}
                </div>
                {t.highlightMetric && (
                  <span className={styles.metricPill}>
                    <Sparkles size={11} />
                    <span>{t.highlightMetric}</span>
                  </span>
                )}
              </div>

              <div className={styles.quoteWrap}>
                <Quote size={20} className={styles.quoteIcon} />
                <p className={styles.quoteText}>&ldquo;{t.content}&rdquo;</p>
              </div>

              <div className={styles.studentFooter}>
                <div
                  className={styles.avatarCircle}
                  style={{ backgroundColor: t.avatarBg || '#7C3AED' }}
                >
                  {t.avatarText}
                </div>
                <div className={styles.studentInfo}>
                  <strong className={styles.studentName}>{t.name}</strong>
                  <span className={styles.studentRole}>{t.role}</span>
                  <span className={styles.courseTag}>{t.courseTaken}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
