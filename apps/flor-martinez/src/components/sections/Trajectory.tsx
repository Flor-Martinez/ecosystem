import React from 'react';
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
          badge="Carrera & Formación"
          title="Trayectoria Profesional & Grado Académico"
          subtitle="Recorrido ejecutivo en gestión comercial, operaciones de comercio exterior y titulación académica."
        />

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
