import React from 'react';
import {
  FileText,
  Share2,
  MessageSquare,
  Sparkles,
  Globe,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { experienceProgram } from '@/data/experience';
import styles from './ExperienceFeature.module.css';

const iconMap = {
  'file-text': FileText,
  'share-2': Share2,
  'message-square': MessageSquare,
  'sparkles': Sparkles,
  'globe': Globe,
};

export function ExperienceFeature() {
  return (
    <section className={styles.section} id="experiencia-busqueda-laboral">
      <Container size="wide">
        <SectionHeader
          badge="La Experiencia Central"
          badgeVariant="primary"
          title="Experiencia Búsqueda Laboral"
          subtitle="No es solo un curso aislado: es un recorrido estructurado en 5 etapas para transformar tu búsqueda de principio a fin con nuestro seguimiento."
        />

        {/* 5 Ejes Modulares Grid */}
        <div className={styles.modulesGrid}>
          {experienceProgram.modules.map((mod) => {
            const Icon = iconMap[mod.iconName] || FileText;

            return (
              <div
                key={mod.id}
                className={styles.moduleCard}
                style={{
                  borderTopColor: mod.colorText,
                }}
              >
                <div className={styles.cardHeader}>
                  <div
                    className={styles.iconBox}
                    style={{ backgroundColor: mod.colorBg, color: mod.colorText, borderColor: mod.colorBorder }}
                  >
                    <Icon size={20} />
                  </div>
                  <div className={styles.moduleMeta}>
                    <span className={styles.modNumber}>Módulo 0{mod.number}</span>
                    <span className={styles.modDuration}>{mod.duration}</span>
                  </div>
                </div>

                <h3 className={styles.modTitle}>{mod.title}</h3>
                <p className={styles.modTagline}>{mod.tagline}</p>
                <p className={styles.modDesc}>{mod.description}</p>

                <div className={styles.topicsBox}>
                  <span className={styles.topicsHeading}>Qué vas a dominar:</span>
                  <ul className={styles.topicsList}>
                    {mod.topics.slice(0, 3).map((topic, i) => (
                      <li key={i} className={styles.topicItem}>
                        <CheckCircle2 size={14} className={styles.topicCheck} style={{ color: mod.colorText }} />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.takeawayRow} style={{ backgroundColor: mod.colorBg, borderColor: mod.colorBorder }}>
                  <span className={styles.takeawayLabel} style={{ color: mod.colorText }}>
                    Resultado Concreto:
                  </span>
                  <span className={styles.takeawayText}>{mod.takeaway}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action strip */}
        <div className={styles.ctaRow}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaContent}>
              <span className={styles.ctaBadge}>Membresía Activa & Seguimiento</span>
              <h3 className={styles.ctaTitle}>Todo este recorrido está incluido en tu suscripción</h3>
              <p className={styles.ctaDesc}>
                Accedé a los 5 módulos formativos, a las charlas semanales en vivo vía Zoom, al Tracker de postulaciones y a la comunidad de soporte.
              </p>
            </div>
            <div className={styles.ctaButtons}>
              <Button href="/experiencia" variant="primary" size="lg">
                <span>Ver detalles de la Experiencia</span>
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
