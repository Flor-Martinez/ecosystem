'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  ArrowUpRight,
  Clock,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { AuthWidget } from '@/components/auth/AuthWidget';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.css';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
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

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
      {/* ==========================================================================
          TOP BAR: EXACTLY MATCHING ACADEMIA (LEFT: VISITAR ECOSISTEMA | CENTER: TIENDA | RIGHT: AUTH)
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

          {/* CENTER: Clear Tienda Branch Identity */}
          <div className={styles.topBarCenter}>
            <div className={styles.branchPill}>
              <div className={styles.branchIconBox}>
                <ShoppingBag size={14} />
              </div>
              <span className={styles.branchBrandName}>TIENDA FLOR MARTINEZ</span>
              <span className={styles.branchDivider}>•</span>
              <span className={styles.branchTagline}>
                <span className={styles.pulsingLiveDot} />
                Indumentaria & Regalos de Distinción
              </span>
            </div>
          </div>

          {/* RIGHT: Ecosystem Auth Widget */}
          <div className={styles.topBarRight}>
            <AuthWidget />
          </div>
        </Container>
      </div>

      {/* ==========================================================================
          MAIN NAVIGATION BAR (SIMPLE & CLEAN)
          ========================================================================== */}
      <div className={styles.mainNav}>
        <Container size="wide" className={styles.mainNavContainer}>
          {/* Official BrandLogo */}
          <Link href="/" className={styles.logoLink} aria-label="Tienda Flor Martinez Home">
            <BrandLogo variant="light" branch="tienda" size="md" showSubtitle />
          </Link>

          {/* Simple Navigation Links */}
          <nav className={styles.navLinks} aria-label="Navegación principal">
            <Link
              href="/"
              className={`${styles.navLink} ${pathname === '/' ? styles.navLinkActive : ''}`}
            >
              <span>Catálogo</span>
            </Link>

            <Link
              href="/sobre-nosotros"
              className={`${styles.navLink} ${pathname === '/sobre-nosotros' ? styles.navLinkActive : ''}`}
            >
              <span>Sobre Nosotros</span>
            </Link>

            <div className={styles.navLinkDisabled} title="Próximamente disponible">
              <span>Encargos Especiales</span>
              <span className={styles.soonBadge}>
                <Clock size={11} />
                <span>Próximamente</span>
              </span>
            </div>
          </nav>

          {/* Actions: Cart Trigger */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cartButton}
              onClick={() => setIsCartOpen(true)}
              aria-label={`Ver carrito (${totalItems} artículos)`}
            >
              <ShoppingBag size={20} />
              <span className={styles.cartLabel}>Carrito</span>
              {totalItems > 0 && (
                <span className={styles.cartBadge}>{totalItems}</span>
              )}
            </button>

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
          </div>
        </Container>
      </div>

      {/* ==========================================================================
          MOBILE DRAWER
          ========================================================================== */}
      {isOpen && (
        <div className={styles.mobileDrawer} role="dialog" aria-modal="true">
          <div className={styles.mobileDrawerContent}>
            {/* Top Branch Header */}
            <div className={styles.mobileBranchHeader}>
              <div className={styles.branchIconBox}>
                <ShoppingBag size={16} />
              </div>
              <div className={styles.mobileBranchText}>
                <strong>Tienda Flor Martinez</strong>
                <span>Indumentaria Formal & Regalos</span>
              </div>
            </div>

            {/* Cart summary on mobile */}
            <button
              type="button"
              className={styles.mobileCartSummary}
              onClick={() => {
                setIsOpen(false);
                setIsCartOpen(true);
              }}
            >
              <div className={styles.mobileCartLeft}>
                <ShoppingBag size={20} />
                <span>Ver Carrito de Compras</span>
              </div>
              <span className={styles.mobileCartCount}>{totalItems} u.</span>
            </button>

            <div className={styles.mobileDivider} />

            {/* Mobile Links */}
            <div className={styles.mobileNavLinks}>
              <Link
                href="/"
                className={`${styles.mobileNavLink} ${pathname === '/' ? styles.mobileNavLinkActive : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <span>Catálogo de Productos</span>
              </Link>

              <Link
                href="/sobre-nosotros"
                className={`${styles.mobileNavLink} ${pathname === '/sobre-nosotros' ? styles.mobileNavLinkActive : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <span>Sobre Nosotros & Contacto</span>
              </Link>

              <div className={styles.mobileNavLinkDisabled}>
                <span>Encargos Especiales</span>
                <span className={styles.soonBadge}>Próximamente</span>
              </div>
            </div>

            <div className={styles.mobileDivider} />

            {/* Ecosystem return */}
            <div className={styles.mobileActions}>
              <a
                href="http://localhost:3000"
                className={styles.mobileEcosystemLink}
                title="Visitar Ecosistema Flor Martinez"
              >
                <Sparkles size={14} />
                <span>Volver al Ecosistema General</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
