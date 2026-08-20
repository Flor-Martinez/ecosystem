import React from 'react';
import Image from 'next/image';
import { Target, HeartHandshake, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Trajectory } from '@/components/sections/Trajectory';
import styles from './AboutSection.module.css';

export function AboutSection() {
  return (
    <section className={styles.section} id="sobre-mi">
      {/* Header presentation */}
      <div className={styles.headerArea}>
        <Container size="wide">
          <div className={styles.headerBadgeWrap}>
            <Badge variant="primary" size="md">
              Biografía & Trayectoria
            </Badge>
          </div>

          <div className={styles.leadGrid}>
            <div className={styles.leadTextCol}>
              <h2 className={styles.sectionTitle}>Sobre Flor Martinez</h2>
              <p className={styles.leadParagraph}>
                Profesional especializada en Comercio Exterior, consultoría estratégica y desarrollo de talento.
                Mi trabajo se fundamenta en un principio simple: transformar el conocimiento técnico en herramientas prácticas de crecimiento.
              </p>

              <div className={styles.tagPills}>
                <span className={styles.tagPill}>Comercio Internacional</span>
                <span className={styles.tagPill}>Marketing Estratégico</span>
                <span className={styles.tagPill}>Mentoría de Empleabilidad</span>
              </div>
            </div>

            <div className={styles.leadPhotoCol}>
              <div className={styles.standingFrame}>
                <Image
                  src="/images/flor-standing.jpg"
                  alt="Flor Martinez — Liderazgo y desarrollo profesional"
                  width={420}
                  height={560}
                  className={styles.standingImg}
                />
                <div className={styles.standingBadge}>
                  <ShieldCheck size={20} color="#1E3A5F" />
                  <span>Enfoque Práctico & Resultados</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Vision & Narrative */}
      <div className={styles.narrativeArea}>
        <Container size="wide">
          <div className={styles.bioCard}>
            <h3 className={styles.bioTitle}>Visión y Recorrido</h3>
            <div className={styles.bioGrid}>
              <div className={styles.bioTextCol}>
                <p>
                  A lo largo de mi carrera profesional he tenido la oportunidad de vincularme con diferentes
                  dimensiones del mundo de los negocios y las organizaciones. Desde los rigurosos procesos logísticos
                  y aduaneros del <strong>Comercio Internacional</strong>, hasta las dinámicas de comunicación,
                  posicionamiento y tecnología que definen el <strong>Marketing contemporáneo</strong>.
                </p>
                <p>
                  Esa mirada transversal me permitió advertir una constante en el mercado: existe una brecha notable
                  entre el potencial de las personas o proyectos y la forma en que estructuran y comunican su valor.
                </p>
              </div>
              <div className={styles.bioTextCol}>
                <p>
                  Con esa motivación nació el <strong>Ecosistema Flor Martinez</strong>: un espacio articulado donde
                  coexisten la consultoría de marca y estrategia (Agencia), el desarrollo de talento y empleabilidad (Academia)
                  y futuras soluciones corporativas de merchandising de calidad (Tienda).
                </p>
                <ul className={styles.keyPrinciplesList}>
                  <li className={styles.keyPrincipleItem}>
                    <CheckCircle2 size={16} color="#4F7FAF" />
                    <span>Sin rodeos teóricos: metodología aplicable desde el día uno.</span>
                  </li>
                  <li className={styles.keyPrincipleItem}>
                    <CheckCircle2 size={16} color="#4F7FAF" />
                    <span>Acompañamiento cercano tanto para empresas como para profesionales.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3 Core Value Pillars */}
          <div className={styles.valuesGrid}>
            <Card variant="surface" padding="lg" className={styles.valueCard}>
              <div className={styles.valueIconWrap}>
                <Target size={22} className={styles.valueIcon} />
              </div>
              <h4 className={styles.valueTitle}>Orientación a Resultados</h4>
              <p className={styles.valueDesc}>
                Sin rodeos teóricos innecesarios. Cada proceso formativo o consultivo está diseñado para producir un impacto tangible en el menor tiempo posible.
              </p>
            </Card>

            <Card variant="surface" padding="lg" className={styles.valueCard}>
              <div className={styles.valueIconWrap}>
                <HeartHandshake size={22} className={styles.valueIcon} />
              </div>
              <h4 className={styles.valueTitle}>Cercanía Humana</h4>
              <p className={styles.valueDesc}>
                La empatía y la escucha activa son el cimiento para entender las necesidades reales de cada profesional, estudiante y empresa.
              </p>
            </Card>

            <Card variant="surface" padding="lg" className={styles.valueCard}>
              <div className={styles.valueIconWrap}>
                <Award size={22} className={styles.valueIcon} />
              </div>
              <h4 className={styles.valueTitle}>Rigor Técnico</h4>
              <p className={styles.valueDesc}>
                Formación continua y actualización constante ante las normativas aduaneras, logísticas y las tendencias dinámicas del mercado laboral.
              </p>
            </Card>
          </div>
        </Container>
      </div>

      {/* Trajectory Timeline with working consultation photo */}
      <Trajectory />
    </section>
  );
}
