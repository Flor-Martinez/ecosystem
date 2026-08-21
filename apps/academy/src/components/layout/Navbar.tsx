'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ArrowRight,
  GraduationCap,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { AuthWidget } from '@/components/auth/AuthWidget';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Campus Virtual', href: '/campus', isCampus: true },
  { label: 'Experiencia', href: '/experiencia' },
  { label: 'Cursos', href: '/cursos' },
  { label: 'Recursos', href: '/recursos' },
  { label: 'Sobre Nosotros', href: '/sobre-nosotros' },
  { label: 'Contacto', href: '/contacto' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (pathname?.startsWith('/campus')) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
      {/* ==========================================================================
          TOP BAR: LEFT (VISITAR ECOSISTEMA) + CENTER (ACADEMIA FLOR MARTINEZ)
          ========================================================================== */}
      <div className={styles.topBar}>
        <Container size="wide" className={styles.topBarContainer}>
          {/* LEFT: Visit General Ecosystem Link */}
          <div className={styles.topBarLeft}>
            <a
              href="http://localhost:3000"
              className={styles.ecosystemVisitLink}
              title="Conocer el Ecosistema Digital Flor Martinez"
            >
              <Sparkles size={13} className={styles.sparkleIcon} />
              <span>Visitar Ecosistema Flor Martinez</span>
              <ArrowUpRight size={13} className={styles.visitArrow} />
            </a>
          </div>

          {/* CENTER: Clear Academia Branch Identity */}
          <div className={styles.topBarCenter}>
            <div className={styles.branchPill}>
              <div className={styles.branchIconBox}>
                <GraduationCap size={15} />
              </div>
              <span className={styles.branchBrandName}>ACADEMIA FLOR MARTINEZ</span>
              <span className={styles.branchDivider}>•</span>
              <span className={styles.branchTagline}>
                <span className={styles.pulsingLiveDot} />
                Formación Práctica & Empleabilidad
              </span>
            </div>
          </div>

          {/* RIGHT: Global Ecosystem Auth Widget */}
          <div className={styles.topBarRight}>
            <AuthWidget />
          </div>
        </Container>
      </div>

      {/* ==========================================================================
          MAIN NAVIGATION BAR (SEGUNDA NAVBAR - FIJA EN SCROLL)
          ========================================================================== */}
      <div className={styles.mainNav}>
        <Container size="wide" className={styles.mainNavContainer}>
          {/* Logo with official BrandLogo */}
          <Link href="/" className={styles.logoLink} aria-label="Academia Flor Martinez Home">
            <BrandLogo variant="light" branch="academia" size="md" showSubtitle />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className={styles.navLinks} aria-label="Navegación principal">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.navLink} ${active ? styles.navLinkActive : ''} ${link.isCampus ? styles.navLinkCampusHighlight : ''}`}
                >
                  {link.isCampus && <GraduationCap size={15} className={styles.navCampusIcon} />}
                  <span>{link.label}</span>
                  {link.isCampus && <span className={styles.campusNavPill}>Alumnos</span>}
                  {active && <span className={styles.activeIndicator} />}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className={styles.actions}>
            <ThemeToggle variant="navbar" />

            <Button
              href="/experiencia"
              variant="primary"
              size="sm"
              className={styles.primaryCtaBtn}
            >
              <span>Sumarme a la Experiencia</span>
              <ArrowRight size={15} />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className={styles.mobileToggle}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </Container>
      </div>

      {/* ==========================================================================
          MOBILE DRAWER
          ========================================================================== */}
      {isOpen && (
        <div className={styles.mobileDrawer} role="dialog" aria-modal="true">
          <div className={styles.mobileDrawerContent}>
            {/* Top Branch Identification */}
            <div className={styles.mobileBranchHeader}>
              <div className={styles.branchIconBox}>
                <GraduationCap size={16} />
              </div>
              <div className={styles.mobileBranchText}>
                <strong>Academia Flor Martinez</strong>
                <span>Experiencia Búsqueda Laboral</span>
              </div>
            </div>

            {/* Mobile Direct Access to Campus */}
            <Link href="/campus" className={styles.mobileCampusCardLink}>
              <div className={styles.mobileCampusCardIcon}>
                <GraduationCap size={20} />
              </div>
              <div className={styles.mobileCampusCardInfo}>
                <div className={styles.mobileCampusCardTitle}>
                  <strong>Ingresar al Campus Virtual</strong>
                  <span className={styles.campusLivePulse} />
                </div>
                <small>Clases, 7 módulos, Tablero y Tracker</small>
              </div>
              <ArrowRight size={16} className={styles.mobileCampusCardArrow} />
            </Link>

            <div className={styles.mobileDivider} />

            {/* Mobile Nav Links */}
            <div className={styles.mobileNavLinks}>
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${styles.mobileNavLink} ${active ? styles.mobileNavLinkActive : ''}`}
                  >
                    <span className={styles.mobileNavLinkLabel}>
                      {link.isCampus && <GraduationCap size={16} className={styles.mobileNavCampusIcon} />}
                      {link.label}
                    </span>
                    {link.isCampus && <span className={styles.campusNavPill}>Alumnos</span>}
                    {active && !link.isCampus && <span className={styles.activeBadge}>Activo</span>}
                  </Link>
                );
              })}
            </div>

            <div className={styles.mobileDivider} />

            {/* Ecosystem Return & CTA Actions */}
            <div className={styles.mobileActions}>
              <Button href="/experiencia" variant="primary" size="md" className={styles.mobileFullBtn}>
                <span>Sumarme a la Experiencia Búsqueda Laboral</span>
                <ArrowRight size={16} />
              </Button>

              <a
                href="http://localhost:3000"
                className={styles.mobileEcosystemLink}
                title="Visitar Ecosistema Flor Martinez"
              >
                <Sparkles size={14} />
                <span>Visitar Ecosistema Flor Martinez</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
