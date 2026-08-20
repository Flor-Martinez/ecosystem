import React from 'react';
import type { Metadata } from 'next';
import {
  ArrowUpRight,
  BookOpen,
  Target,
  Users,
  Compass,
  Zap,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import styles from './sobre-nosotros.module.css';

export const metadata: Metadata = {
  title: 'Sobre la Academia — Misión & Metodología | Academia Flor Martinez',
  description:
    'Conocé la filosofía pedagógica y el modelo de formación práctica detrás de Academia Flor Martinez. Herramientas reales para la inserción laboral y el crecimiento profesional.',
};

export default function SobreNosotrosPage() {
  return (
    <main className={styles.main}>
      {/* 1. HERO */}
      <section className={styles.heroSection}>
        <Container size="wide">
          <div className={styles.heroBadgeWrap}>
            <Badge variant="primary" size="md">
              Misión & Metodología
            </Badge>
          </div>

          <h1 className={styles.heroTitle}>
            Educación práctica y sin rodeos para entrar y crecer en el mercado laboral
          </h1>

          <p className={styles.heroSubtitle}>
            Transformamos los desafíos más frustrantes de la búsqueda de empleo en un método paso a paso con plantillas editables, criterio de selección real y resultados tangibles.
          </p>
        </Container>
      </section>

      {/* 2. ORIGIN & WHY WE EXIST */}
      <section className={styles.storySection}>
        <Container size="wide">
          <div className={styles.storyGrid}>
            <div className={styles.storyTextCol}>
              <span className={styles.sectionOverline}>NUESTRO PROPÓSITO</span>
              <h2 className={styles.sectionHeading}>¿Por qué creamos la Academia?</h2>
              
              <div className={styles.narrative}>
                <p>
                  El sistema educativo formal suele enfocarse casi con exclusividad en la teoría, dejando de lado la habilidad más determinante para el éxito profesional: <strong>saber comunicar tu propio valor</strong> ante los selectores y las empresas.
                </p>
                <p>
                  Vimos a cientos de estudiantes y profesionales con un potencial enorme quedar fuera de procesos de selección simplemente porque su currículum no superaba un filtro automático de ATS o porque en una entrevista no lograban estructurar sus logros con confianza.
                </p>
                <p>
                  <strong>Academia Flor Martinez</strong> nació para resolver esa brecha: una plataforma de cursos cortos, directos y aplicados donde cada clase termina con un documento listo, un perfil optimizado o una técnica probada para conseguir entrevistas.
                </p>
              </div>
            </div>

            {/* Didactic Visual Box instead of personal photos */}
            <div className={styles.storyVisualCol}>
              <div className={styles.methodologyBoard}>
                <div className={styles.boardTop}>
                  <Zap size={20} className={styles.boardZap} />
                  <span>El Ciclo de Aprendizaje Academia FM</span>
                </div>
                <div className={styles.boardSteps}>
                  <div className={styles.bStep}>
                    <div className={styles.bStepNum}>1</div>
                    <div>
                      <strong>Diagnóstico de Perfil</strong>
                      <p>Identificamos qué traba tus postulaciones y qué buscan los reclutadores.</p>
                    </div>
                  </div>
                  <div className={styles.bStep}>
                    <div className={styles.bStepNum}>2</div>
                    <div>
                      <strong>Aplicación en Plantillas</strong>
                      <p>Editás en vivo tus documentos con fórmulas de redacción de impacto.</p>
                    </div>
                  </div>
                  <div className={styles.bStep}>
                    <div className={styles.bStepNum}>3</div>
                    <div>
                      <strong>Postulaciones & Negociación</strong>
                      <p>Salís al mercado sabiendo defender tu experiencia y tu remuneración.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. CORE PILLARS */}
      <section className={styles.pillarsSection}>
        <Container size="wide">
          <div className={styles.pillarsHeader}>
            <span className={styles.sectionOverline}>NUESTROS PRINCIPIOS</span>
            <h2 className={styles.sectionHeading}>Los 4 pilares de nuestra enseñanza</h2>
          </div>

          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrap} style={{ color: '#7C3AED', backgroundColor: '#F5F3FF' }}>
                <Target size={24} />
              </div>
              <h3 className={styles.pillarTitle}>1. Orientación 100% a Resultados</h3>
              <p className={styles.pillarDesc}>
                No enseñamos teoría abstracta. Cada lección tiene un objetivo medible: terminar un CV, publicar en LinkedIn o responder con seguridad una pregunta de entrevista.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrap} style={{ color: '#2563EB', backgroundColor: '#EFF6FF' }}>
                <Users size={24} />
              </div>
              <h3 className={styles.pillarTitle}>2. Cercanía & Lenguaje Claro</h3>
              <p className={styles.pillarDesc}>
                La búsqueda de laburo y el cambio de carrera son procesos estresantes. Hablamos en lenguaje simple, sin tecnicismos innecesarios y con empatía real.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrap} style={{ color: '#059669', backgroundColor: '#ECFDF5' }}>
                <Compass size={24} />
              </div>
              <h3 className={styles.pillarTitle}>3. Rigor con Filtros ATS</h3>
              <p className={styles.pillarDesc}>
                Monitoreamos continuamente las tendencias de contratación y los algoritmos de plataformas para que siempre uses formatos vigentes y compatibles.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrap} style={{ color: '#D97706', backgroundColor: '#FEF3C7' }}>
                <BookOpen size={24} />
              </div>
              <h3 className={styles.pillarTitle}>4. Honestidad Radical</h3>
              <p className={styles.pillarDesc}>
                Cero promesas mágicas de contratación garantizada. Te entregamos el método, las plantillas y la preparación para que tu talento hable por sí mismo.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. ECOSYSTEM CONNECTION */}
      <section className={styles.ecosystemSection}>
        <Container size="wide">
          <div className={styles.ecoBox}>
            <div className={styles.ecoTextCol}>
              <Badge variant="primary" size="md">
                Ecosistema Digital
              </Badge>
              <h2 className={styles.ecoTitle}>Parte del Ecosistema Flor Martinez</h2>
              <p className={styles.ecoDesc}>
                La Academia es la unidad educativa y de empleabilidad de un ecosistema que integra la marca personal de Flor Martinez, la Agencia de estrategia B2B y la línea corporativa de la Tienda.
              </p>
              <div className={styles.ecoActions}>
                <a
                  href="http://localhost:3000"
                  className={styles.ecoLinkBtn}
                  title="Conocer el Portfolio Flor Martinez"
                >
                  <span>Explorar Portfolio Flor Martinez</span>
                  <ArrowUpRight size={16} />
                </a>
                <Button href="/cursos" variant="primary" size="md">
                  <span>Ver catálogo de cursos</span>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
