import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import styles from './HowItWorks.module.css';

const steps = [
  {
    step: '01',
    title: 'Elegís el foco que necesitás resolver',
    tag: 'Diagnóstico Rápido',
    color: '#7C3AED',
    desc: '¿Tu CV no pasa los filtros? ¿No sabés qué poner en LinkedIn? ¿Te trabás en las entrevistas? Elegís el taller exacto para tu necesidad puntual.',
    bullets: ['Clases cortas de 30 a 60 min', 'Acceso inmediato y para siempre'],
  },
  {
    step: '02',
    title: 'Editás y aplicás sobre plantillas reales',
    tag: 'Manos a la Obra',
    color: '#2563EB',
    desc: 'Nada de mirar diapositivas pasivamente. Abrís tu plantilla en Word, Notion o Google Docs y vas rellenando tus datos con la fórmula C-A-R.',
    bullets: ['4 plantillas ATS listas para usar', 'Guía de 100 palabras clave por rubro'],
  },
  {
    step: '03',
    title: 'Multiplicás tus respuestas y ofertas',
    tag: 'Resultados Visibles',
    color: '#059669',
    desc: 'Te postulás con un perfil sólido, sabiendo defender tu experiencia y tu pretensión salarial en cada etapa del proceso de selección.',
    bullets: ['Entrevistas coordinadas en semanas', 'Sueldos negociados con confianza'],
  },
];

export function HowItWorks() {
  return (
    <section className={styles.section} id="como-funciona">
      <Container size="wide">
        <SectionHeader
          badge="Paso a Paso"
          badgeVariant="primary"
          title="¿Cómo funciona el método de la Academia?"
          subtitle="Un proceso directo y sin rodeos diseñado para que veas avances concretos en tus postulaciones desde el primer día."
        />

        <div className={styles.stepsGrid}>
          {steps.map((s, idx) => (
            <div key={idx} className={styles.stepCard} style={{ '--step-color': s.color } as React.CSSProperties}>
              <div className={styles.stepTop}>
                <span className={styles.stepNumber}>{s.step}</span>
                <span className={styles.stepTag}>{s.tag}</span>
              </div>

              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>

              <ul className={styles.bulletList}>
                {s.bullets.map((b, bIdx) => (
                  <li key={bIdx} className={styles.bulletItem}>
                    <CheckCircle2 size={15} className={styles.checkIcon} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bottomBanner}>
          <div className={styles.bannerText}>
            <h4>¿Querés empezar por un recurso 100% gratuito?</h4>
            <p>Descargá nuestro checklist de optimización de CV compatible con ATS sin ningún costo.</p>
          </div>
          <Button href="/recursos" variant="primary" size="md" className={styles.bannerBtn}>
            <span>Ir a la biblioteca gratuita</span>
            <ArrowRight size={16} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
