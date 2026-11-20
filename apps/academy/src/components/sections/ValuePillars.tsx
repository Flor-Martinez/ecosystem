import React from 'react';
import { Compass, Laptop, MessageSquare, Zap } from 'lucide-react';
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
    icon: Compass,
    stepNumber: '02',
    color: '#7C3AED',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    title: 'Tu parte: Pasos a seguir',
    description:
      'Una ruta clara y estructurada. Sabés exactamente qué hacer en cada etapa de tu búsqueda laboral sin perder tiempo ni desorientarte.',
  },
  {
    icon: Laptop,
    stepNumber: '03',
    color: '#7C3AED',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    title: 'Interactivas y acceso desde la web',
    description:
      'Accedé al campus desde cualquier navegador o celular, sin instalar nada, con lecciones dinámicas, materiales y seguimiento de tu avance.',
  },
  {
    icon: MessageSquare,
    stepNumber: '04',
    color: '#7C3AED',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    title: 'Comentá e intercambiá ideas',
    description:
      'Podés comentar, debatir y dejar tus consultas debajo de cada clase, y Flor responde directamente para acompañarte en tu proceso.',
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
