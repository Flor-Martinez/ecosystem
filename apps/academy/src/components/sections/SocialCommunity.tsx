import { ArrowUpRight } from 'lucide-react';
import { InstagramIcon, LinkedinIcon } from '@/components/ui/Icons';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import styles from './SocialCommunity.module.css';

export function SocialCommunity() {
  return (
    <section className={styles.section} id="comunidad">
      <Container size="wide">
        <div className={styles.headerArea}>
          <div className={styles.badgeWrap}>
            <Badge variant="primary" size="md">
              Comunidad & Contenido Continuo
            </Badge>
          </div>
          <h2 className={styles.sectionTitle}>Sumate a nuestra comunidad digital</h2>
          <p className={styles.sectionSubtitle}>
            Compartimos contenido diario, análisis de casos de CV, tendencias de contratación y herramientas prácticas en nuestras redes oficiales.
          </p>
        </div>

        <div className={styles.socialCardsGrid}>
          {/* Instagram Card */}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialCardLink}
          >
            <Card variant="surface" padding="lg" className={`${styles.socialCard} ${styles.igCard}`}>
              <div className={styles.cardTop}>
                <div className={styles.igIconWrap}>
                  <InstagramIcon size={28} />
                </div>
                <div className={styles.networkBadge}>Instagram</div>
              </div>

              <div className={styles.handle}>@flormartinez.ok</div>
              <p className={styles.desc}>
                Videos dinámicos con tips diarios de CV, errores comunes en entrevistas, novedades de cursos y detrás de escena formativo.
              </p>

              <div className={styles.actionRow}>
                <span>Seguir en Instagram</span>
                <ArrowUpRight size={16} />
              </div>
            </Card>
          </a>

          {/* LinkedIn Card */}
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialCardLink}
          >
            <Card variant="surface" padding="lg" className={`${styles.socialCard} ${styles.liCard}`}>
              <div className={styles.cardTop}>
                <div className={styles.liIconWrap}>
                  <LinkedinIcon size={28} />
                </div>
                <div className={styles.networkBadge}>LinkedIn</div>
              </div>

              <div className={styles.handle}>Academia Flor Martinez</div>
              <p className={styles.desc}>
                Publicaciones de análisis sobre el mercado laboral, networking profesional, metodologías de selección y reflexiones de carrera.
              </p>

              <div className={styles.actionRow}>
                <span>Conectar en LinkedIn</span>
                <ArrowUpRight size={16} />
              </div>
            </Card>
          </a>
        </div>
      </Container>
    </section>
  );
}
