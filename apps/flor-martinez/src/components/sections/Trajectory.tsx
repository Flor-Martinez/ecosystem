import React from 'react';
import Image from 'next/image';
import { Calendar, Award, BookOpen, Briefcase } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';
import { trajectoryData } from '@/data/trajectory';
import styles from './Trajectory.module.css';

export function Trajectory() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Formación':
        return <BookOpen size={16} />;
      case 'Hito Profesional':
        return <Award size={16} />;
      default:
        return <Briefcase size={16} />;
    }
  };

  return (
    <section className={styles.trajectory} id="trayectoria">
      <Container size="wide">
        <SectionHeader
          badge="Experiencia & Metodología"
          title="Trayectoria, formación y práctica profesional"
          subtitle="Un recorrido enfocado en resolver desafíos reales de comercio internacional, estructuración de marca y empleabilidad."
        />

        {/* Working Context Banner */}
        <div className={styles.workingBanner}>
          <div className={styles.workingImgWrap}>
            <Image
              src="/images/flor-working.jpg"
              alt="Flor Martinez en sesión de consultoría y planificación estratégica"
              width={700}
              height={450}
              className={styles.workingImg}
            />
          </div>
          <div className={styles.workingContent}>
            <span className={styles.workingTag}>METODOLOGÍA DE TRABAJO</span>
            <h3 className={styles.workingTitle}>Estrategia basada en la práctica</h3>
            <p className={styles.workingDesc}>
              Cada proyecto o mentoría se diseña desde la experiencia directa en operaciones de comercio
              exterior y el conocimiento profundo del mercado laboral. Sin fórmulas genéricas, con foco
              en la ejecución clara.
            </p>
          </div>
        </div>

        {/* Timeline Container */}
        <div className={styles.timeline}>
          {trajectoryData.map((item, index) => (
            <div key={item.id} className={styles.timelineItem}>
              {/* Left Column: Period & Category */}
              <div className={styles.timelinePeriod}>
                <div className={styles.yearBadge}>
                  <Calendar size={14} />
                  <span>{item.year}</span>
                </div>
                {item.badge && (
                  <Badge variant="primary" size="sm">
                    {item.badge}
                  </Badge>
                )}
              </div>

              {/* Center Line Marker */}
              <div className={styles.timelineMarker}>
                <div className={styles.markerDot} />
                {index !== trajectoryData.length - 1 && <div className={styles.markerLine} />}
              </div>

              {/* Right Column: Card Content */}
              <div className={styles.timelineContent}>
                <div className={styles.contentCard}>
                  <div className={styles.cardHeader}>
                    <span className={styles.categoryPill}>
                      {getCategoryIcon(item.category)}
                      <span>{item.category}</span>
                    </span>
                    <span className={styles.institution}>{item.institution}</span>
                  </div>

                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemDesc}>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
