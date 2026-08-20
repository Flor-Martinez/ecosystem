import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import styles from './AboutAcademy.module.css';

const commitments = [
  {
    title: 'Plantillas y código abierto de búsqueda',
    desc: 'Te entregamos los mismos documentos y frameworks que usan candidatos que entraron a las mejores empresas.',
  },
  {
    title: 'Actualización constante con los algoritmos ATS',
    desc: 'Los software de selección cambian año a año. Nuestros contenidos se actualizan para que nunca uses formatos obsoletos.',
  },
  {
    title: 'Honestidad radical y cero falsas promesas',
    desc: 'No te prometemos que te van a contratar mágicamente en 2 días. Te damos el método y las herramientas para que tu talento sea visible y competitivo.',
  },
  {
    title: 'Comunidad activa para dudas y feedback',
    desc: 'Un espacio seguro donde compartir tus dudas sobre entrevistas, CVs o negociaciones sin miedo ni prejuicios.',
  },
];

export function AboutAcademy() {
  return (
    <section className={styles.section} id="sobre-academia">
      <Container size="wide">
        <div className={styles.grid}>
          {/* Left: Manifesto & Philosophy */}
          <div className={styles.leftCol}>
            <div className={styles.badgeWrap}>
              <Badge variant="primary" size="md">
                Manifiesto Pedagógico
              </Badge>
            </div>

            <h2 className={styles.title}>
              Lo que la facultad no te enseña sobre <span className={styles.titleHighlight}>conseguir trabajo</span>
            </h2>

            <p className={styles.paragraph}>
              Podés tener las mejores notas o años de estudio, pero si en tu currículum no sabés comunicar tus logros con impacto o te congelás en una entrevista, el mercado laboral se vuelve una experiencia frustrante.
            </p>

            <p className={styles.paragraph}>
              <strong>Academia Flor Martinez</strong> nació para ser ese puente práctico: la escuela que te enseña a comunicar tu valor, pasar los filtros automáticos y negociar tu crecimiento profesional con seguridad y criterio.
            </p>

            <div className={styles.quoteBox}>
              <p className={styles.quoteText}>
                &ldquo;El talento ya lo tenés. Nosotros te damos las herramientas para que el mercado lo vea.&rdquo;
              </p>
            </div>
          </div>

          {/* Right: 4 Commitments Cards */}
          <div className={styles.rightCol}>
            <div className={styles.commitmentsGrid}>
              {commitments.map((c, idx) => (
                <div key={idx} className={styles.commitmentCard}>
                  <div className={styles.checkWrap}>
                    <CheckCircle2 size={18} />
                  </div>
                  <div className={styles.commitmentContent}>
                    <h3 className={styles.commitmentTitle}>{c.title}</h3>
                    <p className={styles.commitmentDesc}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
