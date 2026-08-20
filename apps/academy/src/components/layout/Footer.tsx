'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Briefcase, ShoppingBag, Mail, Sparkles } from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from '@/components/ui/Icons';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { Container } from '@/components/ui/Container';
import styles from './Footer.module.css';

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith('/campus')) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <Container size="wide">
        <div className={styles.mainGrid}>
          {/* Brand & Mission Column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brandLink}>
              <BrandLogo variant="dark" branch="academia" size="md" showSubtitle />
            </Link>

            <p className={styles.brandDesc}>
              Plataforma de formación práctica, empleabilidad y crecimiento profesional creada por Flor Martinez. Herramientas aplicadas para potenciar tu perfil y destacar en el mercado laboral.
            </p>

            <div className={styles.socialRow}>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="LinkedIn de Flor Martinez"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="Instagram de Flor Martinez"
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
            <h3 className={styles.colTitle}>Academia</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/" className={styles.link}>Inicio</Link>
              </li>
              <li>
                <Link href="/experiencia" className={styles.link}>Experiencia Búsqueda Laboral</Link>
              </li>
              <li>
                <Link href="/cursos" className={styles.link}>Cursos & Talleres</Link>
              </li>
              <li>
                <Link href="/campus" className={styles.link}>Aula Virtual / Campus</Link>
              </li>
              <li>
                <Link href="/recursos" className={styles.link}>Recursos Gratis</Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className={styles.link}>Sobre la Academia</Link>
              </li>
              <li>
                <Link href="/contacto" className={styles.link}>Contacto & Ayuda</Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Recursos & Plantillas</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/recursos/checklist-optimizacion-cv-ats" className={styles.link}>
                  Checklist CV ATS 2025
                </Link>
              </li>
              <li>
                <Link href="/recursos/plantilla-estructura-cv-editorial" className={styles.link}>
                  Plantilla CV Word & Notion
                </Link>
              </li>
              <li>
                <Link href="/recursos/guia-optimizacion-linkedin-2025" className={styles.link}>
                  Guía LinkedIn SEO
                </Link>
              </li>
              <li>
                <Link href="/recursos/preguntas-frecuentes-entrevistas-star" className={styles.link}>
                  Método STAR para Entrevistas
                </Link>
              </li>
            </ul>
          </div>

          {/* Digital Ecosystem Column */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Ecosistema Flor Martinez</h3>
            <p className={styles.ecosystemNote}>
              Conectá con las otras unidades estratégicas del ecosistema:
            </p>
            <ul className={styles.ecosystemList}>
              <li>
                <a
                  href="http://localhost:3000"
                  className={styles.ecoLink}
                  title="Portfolio Principal & Marca Personal"
                >
                  <Sparkles size={14} className={styles.ecoIcon} />
                  <div>
                    <span className={styles.ecoName}>Flor Martinez Portfolio</span>
                    <span className={styles.ecoSub}>Marca personal & trayectoria</span>
                  </div>
                  <ArrowUpRight size={13} className={styles.ecoArrow} />
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:3000/proyecto/agencia-flor-martinez"
                  className={styles.ecoLink}
                  title="Agencia Flor Martinez"
                >
                  <Briefcase size={14} className={styles.ecoIcon} />
                  <div>
                    <span className={styles.ecoName}>Agencia Flor Martinez</span>
                    <span className={styles.ecoSub}>Marketing B2B & Estrategia</span>
                  </div>
                  <ArrowUpRight size={13} className={styles.ecoArrow} />
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:3000/proyecto/tienda-flor-martinez"
                  className={styles.ecoLink}
                  title="Tienda Flor Martinez"
                >
                  <ShoppingBag size={14} className={styles.ecoIcon} />
                  <div>
                    <span className={styles.ecoName}>Tienda Flor Martinez</span>
                    <span className={styles.ecoSub}>Merchandising & Papelería</span>
                  </div>
                  <ArrowUpRight size={13} className={styles.ecoArrow} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {currentYear} Academia Flor Martinez. Todos los derechos reservados.
          </p>
          <div className={styles.legalLinks}>
            <Link href="/contacto" className={styles.legalLink}>Términos y Condiciones</Link>
            <span className={styles.legalDot}>•</span>
            <Link href="/contacto" className={styles.legalLink}>Políticas de Privacidad</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
