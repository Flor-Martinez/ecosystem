import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BrandLogo } from '@/components/ui/BrandLogo';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container size="wide" className={styles.container}>
        {/* Main Grid */}
        <div className={styles.grid}>
          {/* Brand Info Column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.footerLogo}>
              <BrandLogo variant="light" branch="tienda" size="md" showSubtitle />
            </Link>
            <p className={styles.tagline}>
              Prendas formales, indumentaria y objetos de distinción seleccionados con los más altos
              estándares de calidad y prestancia de la marca Flor Martinez.
            </p>
            <div className={styles.trustBadge}>
              <ShieldCheck size={16} className={styles.trustIcon} />
              <span>Garantía de calidad oficial Flor Martinez</span>
            </div>
          </div>

          {/* Column 1: Categorías */}
          <div className={styles.navCol}>
            <h4 className={styles.colTitle}>Categorías</h4>
            <ul className={styles.linkList}>
              <li><Link href="/">Todo el Catálogo</Link></li>
              <li><Link href="/">Prendas</Link></li>
              <li><Link href="/">Regalos & Sets</Link></li>
              <li><Link href="/">Kits</Link></li>
              <li><Link href="/">Marroquinería & Accesorios</Link></li>
            </ul>
          </div>

          {/* Column 2: Tienda */}
          <div className={styles.navCol}>
            <h4 className={styles.colTitle}>Tienda</h4>
            <ul className={styles.linkList}>
              <li><Link href="/sobre-nosotros">Sobre Nosotros</Link></li>
              <li><Link href="/sobre-nosotros">Contacto</Link></li>
              <li><span className={styles.disabledLink}>Encargos Especiales (Próximamente)</span></li>
            </ul>
          </div>

          {/* Column 3: Ecosistema & Contacto */}
          <div className={styles.navCol}>
            <h4 className={styles.colTitle}>Ecosistema & Contacto</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <Mail size={15} />
                <span>tienda@flormartinez.com</span>
              </li>
              <li className={styles.contactItem}>
                <Phone size={15} />
                <span>+54 11 4000-0000</span>
              </li>
              <li className={styles.contactItem}>
                <MapPin size={15} />
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
            <div className={styles.ecosystemLinks}>
              <a
                href="http://localhost:3000"
                className={styles.ecosystemItem}
              >
                <span>Portal Central Flor Martinez</span>
                <ArrowUpRight size={13} />
              </a>
              <a
                href="http://localhost:3001"
                className={styles.ecosystemItem}
              >
                <span>Academia Flor Martinez</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Flor Martinez — Tienda. Todos los derechos reservados.
          </p>
          <div className={styles.legalLinks}>
            <span>Términos y Condiciones</span>
            <span>•</span>
            <span>Política de Privacidad</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
