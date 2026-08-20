import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, GraduationCap, Briefcase, ShoppingBag, Mail } from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from '@/components/ui/Icons';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { Container } from '@/components/ui/Container';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container size="wide">
        <div className={styles.mainGrid}>
          {/* Brand & Mission Column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brandLink}>
              <BrandLogo variant="dark" size="md" showSubtitle />
            </Link>

            <p className={styles.brandDesc}>
              Especialista en Comercio Exterior, Marketing y Desarrollo Profesional.
              Construyendo iniciativas que articulan estrategia operativa, formación aplicada y negocios.
            </p>

            <div className={styles.socialRow}>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="mailto:contacto@flormartinez.com"
                className={styles.socialIcon}
                aria-label="Email de contacto"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Navegación</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/" className={styles.link}>Inicio</Link>
              </li>
              <li>
                <Link href="/sobre-mi" className={styles.link}>Sobre mí</Link>
              </li>
              <li>
                <Link href="/proyectos" className={styles.link}>Proyectos & Casos</Link>
              </li>
              <li>
                <Link href="/contacto" className={styles.link}>Contacto Directo</Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem Column */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Ecosistema Flor Martinez</h3>
            <ul className={styles.linkList}>
              <li>
                <a
                  href="http://localhost:3001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.link} ${styles.linkWithBadge}`}
                >
                  <span className={styles.linkWithIcon}>
                    <GraduationCap size={15} style={{ color: '#D8B4FE' }} />
                    <span>Academia</span>
                  </span>
                  <span className={styles.activeTag}>Activa</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <Link href="/#ecosistema" className={styles.link}>
                  <span className={styles.linkWithIcon}>
                    <Briefcase size={15} style={{ color: '#4F7FAF' }} />
                    <span>Agencia</span>
                  </span>
                  <span className={styles.comingTag}>Próximamente</span>
                </Link>
              </li>
              <li>
                <Link href="/#ecosistema" className={styles.link}>
                  <span className={styles.linkWithIcon}>
                    <ShoppingBag size={15} style={{ color: '#D9C8B6' }} />
                    <span>Tienda Corporativa</span>
                  </span>
                  <span className={styles.comingTag}>Próximamente</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact Column */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Contacto & Alianzas</h3>
            <p className={styles.contactText}>
              ¿Querés coordinar una consultoría, propuesta formativa o proyecto de marca?
            </p>
            <Link href="/contacto" className={styles.contactEmail}>
              contacto@flormartinez.com
            </Link>
            <div className={styles.locationTag}>
              Buenos Aires, Argentina · Alcance Global
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copy}>
            © {currentYear} Flor Martinez. Todos los derechos reservados.
          </p>
          <div className={styles.legalLinks}>
            <span>Manual de Marca & Identidad Oficial</span>
            <span className={styles.separator}>·</span>
            <span>Comercio Exterior · Marketing · Educación</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
