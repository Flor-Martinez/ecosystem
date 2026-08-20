import React from 'react';
import { Search, FileCheck, Users, Zap } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './ValuePillars.module.css';

const pillars = [
  {
    icon: Zap,
    stepNumber: '01',
    color: '#7C3AED',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    title: 'Cero chamuyo teórico',
    description:
      'Clases concisas y directas al grano. Cada video resuelve un problema concreto: redactar un logro, mejorar tu titular o responder una pregunta difícil.',
  },
  {
    icon: Search,
    stepNumber: '02',
    color: '#2563EB',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    title: 'Mirada de reclutador real',
    description:
      'Te enseñamos cómo piensan los selectores, qué evalúan en los primeros 6 segundos y cómo filtrar por palabras clave para destacar.',
  },
  {
    icon: FileCheck,
    stepNumber: '03',
    color: '#059669',
    bg: '#ECFDF5',
    border: '#A7F3D0',
    title: 'Plantillas listas para usar',
    description:
      'Descargás archivos en Word, Google Docs y Notion diagramados profesionalmente para que solo tengas que completar tus datos.',
  },
  {
    icon: Users,
    stepNumber: '04',
    color: '#D97706',
    bg: '#FEF3C7',
    border: '#FDE68A',
    title: 'Comunidad & Acompañamiento',
    description:
      'Canales de consulta continua para no sentirte solo en la búsqueda laboral. Tips diarios, análisis de casos y soporte.',
  },
];

export function ValuePillars() {
  return (
    <section className={styles.section} id="metodologia">
      <Container size="wide">
        <SectionHeader
          badge="Nuestra Metodología"
          badgeVariant="primary"
          title="¿Por qué formarte en la Academia?"
          subtitle="Diseñamos cada curso para que salgas con herramientas terminadas, no con cuadernos llenos de teoría."
        />

        <div className={styles.grid}>
          {pillars.map((p, idx) => {
            const IconComp = p.icon;
            return (
              <div
                key={idx}
                className={styles.pillarCard}
                style={{ '--pillar-color': p.color, '--pillar-bg': p.bg, '--pillar-border': p.border } as React.CSSProperties}
              >
                <div className={styles.topCardRow}>
                  <div className={styles.iconCircle}>
                    <IconComp size={22} />
                  </div>
                  <span className={styles.stepBadge}>Paso {p.stepNumber}</span>
                </div>

                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarDesc}>{p.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
