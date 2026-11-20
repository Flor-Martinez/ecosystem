import React from 'react';
import {
  FileText,
  Share2,
  MessageSquare,
  Sparkles,
  Globe,
  ArrowRight,
  GraduationCap,
  TrendingUp,
  Compass,
  DollarSign,
  Pickaxe,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import styles from './ExperienceFeature.module.css';

const troncalModules = [
  {
    id: 'm1',
    badge: 'MÓDULO TRONCAL 01',
    title: 'Mindset y Estrategia de Búsqueda',
    clases: '4 clases',
    isUpcoming: false,
    brief: 'Fundamentos y enfoque estratégico para pensar como reclutador y destacar en el mercado.',
    icon: Compass,
  },
  {
    id: 'm2',
    badge: 'MÓDULO TRONCAL 02',
    title: 'Construcción de un CV de Alto Impacto',
    clases: '5 clases',
    isUpcoming: false,
    brief: 'Estructura moderna, métricas cuantificadas y palabras clave para superar los filtros ATS.',
    icon: FileText,
  },
  {
    id: 'm3',
    badge: 'MÓDULO TRONCAL 03',
    title: 'LinkedIn Estratégico y Marca Personal',
    clases: '5 clases',
    isUpcoming: false,
    brief: 'Optimización de titular, storytelling y visibilidad para que los selectores te busquen a vos.',
    icon: Share2,
  },
  {
    id: 'm4',
    badge: 'MÓDULO TRONCAL 04',
    title: 'Optimización de Perfiles y Networking',
    clases: '5 clases',
    isUpcoming: false,
    brief: 'Estrategias de contacto directo con hiring managers y generación de alianzas profesionales.',
    icon: Sparkles,
  },
  {
    id: 'm5',
    badge: 'MÓDULO TRONCAL 05',
    title: 'Estrategias de Postulación y Portales',
    clases: '3 clases',
    isUpcoming: false,
    brief: 'Cómo postularte de forma inteligente y acceder al mercado laboral que no se publica abiertamente.',
    icon: Globe,
  },
  {
    id: 'm6',
    badge: 'MÓDULO TRONCAL 06',
    title: 'Preparación para Entrevistas Laborales',
    clases: '5 clases',
    isUpcoming: false,
    brief: 'Estructura de respuesta STAR, manejo de preguntas trampa y seguridad total ante el entrevistador.',
    icon: MessageSquare,
  },
  {
    id: 'm7',
    badge: 'MÓDULO TRONCAL 07',
    title: 'Negociación Salarial y Cierre de Ofertas',
    clases: '5 clases',
    isUpcoming: false,
    brief: 'Definición de tu pretensión, técnicas de negociación y criterios para elegir la mejor propuesta.',
    icon: DollarSign,
  },
];

const extraModules = [
  {
    id: 'e1',
    badge: 'MÓDULO EXTRA 01',
    title: 'Minería y Petróleo',
    clases: '8 clases',
    isUpcoming: false,
    brief: 'Especialización completa para ingresar, postular y desarrollarte en la industria minera y energética.',
    icon: Pickaxe,
  },
  {
    id: 'e2',
    badge: 'MÓDULO EXTRA 02',
    title: 'Trabajo Remoto & Freelance Internacional',
    clases: 'Próximamente',
    isUpcoming: true,
    brief: 'Cómo postularte a empresas del exterior, superar entrevistas en inglés y cobrar en dólares.',
    icon: Globe,
  },
  {
    id: 'e3',
    badge: 'MÓDULO EXTRA 03',
    title: 'Primer Empleo & Inserción Joven',
    clases: 'Próximamente',
    isUpcoming: true,
    brief: 'Estrategia práctica para construir tu perfil y conseguir tu primera oportunidad sin experiencia.',
    icon: TrendingUp,
  },
];

export function ExperienceFeature() {
  return (
    <section className={styles.section} id="experiencia-busqueda-laboral">
      <Container size="wide">
        <SectionHeader
          badge="Plan de Estudios Completo"
          badgeVariant="primary"
          title="Experiencia Búsqueda Laboral"
          subtitle="7 Módulos Troncales y 3 Módulos Extra diseñados paso a paso para transformar tu inserción laboral de principio a fin."
        />

        {/* 7 Troncales Grid */}
        <div className={styles.modulesGrid}>
          {troncalModules.map((mod) => {
            const Icon = mod.icon;

            return (
              <div
                key={mod.id}
                className={styles.moduleCard}
                style={{
                  borderTopColor: '#7C3AED',
                }}
              >
                <div className={styles.cardHeader}>
                  <div
                    className={styles.iconBox}
                    style={{ backgroundColor: '#FAF5FF', color: '#7C3AED', borderColor: '#DDD6FE' }}
                  >
                    <Icon size={20} />
                  </div>
                  <div className={styles.moduleMeta}>
                    <span className={styles.modNumber}>
                      {mod.badge}
                    </span>
                    <span
                      className={styles.modDuration}
                      style={{
                        color: '#6B7280',
                        fontWeight: 600,
                      }}
                    >
                      {mod.clases}
                    </span>
                  </div>
                </div>

                <h3 className={styles.modTitle}>{mod.title}</h3>
                <p className={styles.modDesc}>{mod.brief}</p>
              </div>
            );
          })}
        </div>

        {/* Separator line between Troncales and Extras */}
        <div className={styles.modulesDivider} />

        {/* 3 Extras Grid */}
        <div className={styles.modulesGrid}>
          {extraModules.map((mod) => {
            const Icon = mod.icon;

            return (
              <div
                key={mod.id}
                className={styles.moduleCard}
                style={{
                  borderTopColor: '#7C3AED',
                }}
              >
                <div className={styles.cardHeader}>
                  <div
                    className={styles.iconBox}
                    style={{ backgroundColor: '#FAF5FF', color: '#7C3AED', borderColor: '#DDD6FE' }}
                  >
                    <Icon size={20} />
                  </div>
                  <div className={styles.moduleMeta}>
                    <span className={styles.modNumber}>
                      {mod.badge}
                    </span>
                    <span
                      className={styles.modDuration}
                      style={{
                        color: mod.isUpcoming ? '#9333EA' : '#6B7280',
                        fontWeight: mod.isUpcoming ? 700 : 600,
                      }}
                    >
                      {mod.clases}
                    </span>
                  </div>
                </div>

                <h3 className={styles.modTitle}>{mod.title}</h3>
                <p className={styles.modDesc}>{mod.brief}</p>
              </div>
            );
          })}
        </div>

        {/* Call to action strip */}
        <div className={styles.ctaRow}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaContent}>
              <span className={styles.ctaBadge}>Acceso por 1 Año Completo</span>
              <h3 className={styles.ctaTitle}>Todo este recorrido está incluido en tu acceso a la Academia</h3>
              <p className={styles.ctaDesc}>
                Accedé a los 7 módulos troncales, a los módulos extra de especialización, al Tracker de postulaciones, a las plantillas descargables y al espacio de consultas directas con Flor.
              </p>
            </div>
            <div className={styles.ctaButtons}>
              <Button href="/campus" variant="primary" size="lg">
                <GraduationCap size={18} />
                <span>Ingresar al Campus Virtual</span>
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
