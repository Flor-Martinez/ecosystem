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
    bg: 'linear-gradient(180deg, #FFFFFF 0%, #FAF5FF 100%)',
    border: '#DDD6FE',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
    shadow: 'rgba(124, 58, 237, 0.25)',
    title: '100% práctico, sin rodeos',
    description:
      'Clases concisas y directas al grano. Cada video resuelve un problema concreto: redactar un logro, mejorar tu titular o responder una pregunta difícil.',
  },
  {
    icon: Compass,
    stepNumber: '02',
    color: '#2563EB',
    bg: 'linear-gradient(180deg, #FFFFFF 0%, #EFF6FF 100%)',
    border: '#BFDBFE',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
    shadow: 'rgba(37, 99, 235, 0.25)',
    title: 'Tu parte: Pasos a seguir',
    description:
      'Una ruta clara y estructurada. Sabés exactamente qué hacer en cada etapa de tu búsqueda laboral sin perder tiempo ni desorientarte.',
  },
  {
    icon: Laptop,
    stepNumber: '03',
    color: '#059669',
    bg: 'linear-gradient(180deg, #FFFFFF 0%, #ECFDF5 100%)',
    border: '#A7F3D0',
    gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    shadow: 'rgba(5, 150, 105, 0.25)',
    title: 'Interactivas y acceso desde la web',
    description:
      'Accedé al campus desde cualquier navegador o celular, sin instalar nada, con lecciones dinámicas, materiales y seguimiento de tu avance.',
  },
  {
    icon: MessageSquare,
    stepNumber: '04',
    color: '#D97706',
    bg: 'linear-gradient(180deg, #FFFFFF 0%, #FEF3C7 100%)',
    border: '#FDE68A',
    gradient: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
    shadow: 'rgba(217, 119, 6, 0.25)',
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
                style={{
                  '--pillar-color': p.color,
                  '--pillar-bg': p.bg,
                  '--pillar-border': p.border,
                  '--pillar-gradient': p.gradient,
                  '--pillar-shadow': p.shadow,
                } as React.CSSProperties}
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
