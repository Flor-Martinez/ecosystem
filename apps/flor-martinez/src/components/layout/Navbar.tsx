'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ArrowUpRight,
  GraduationCap,
  Briefcase,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { AuthWidget } from '@/components/auth/AuthWidget';
import styles from './Navbar.module.css';

interface EcosystemBranchInfo {
  id: 'agencia' | 'academia' | 'tienda';
  name: string;
  fullName: string;
  tagline: string;
  status: 'active' | 'coming_soon';
  badge: string;
  href: string;
  external?: boolean;
  color: string;
  accentBg: string;
  borderColor: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  description: string;
  features: string[];
  audience: string;
  ctaText: string;
}

const ecosystemBranches: EcosystemBranchInfo[] = [
  {
    id: 'agencia',
    name: 'Agencia',
    fullName: 'Agencia Flor Martinez',
    tagline: 'Marketing Estratégico, Comunicación B2B & Tecnología',
    status: 'coming_soon',
    badge: 'Próximamente',
    href: '/proyecto/agencia-flor-martinez',
    external: false,
    color: '#1E3A5F',
    accentBg: '#EDF3F8',
    borderColor: '#C8D9E8',
    icon: Briefcase,
    description:
      'Consultoría y agencia boutique orientada a articular posicionamiento de marca, comunicación asertiva y desarrollo web para empresas.',
    features: [
      'Estrategia de marca, identidad y comunicación institucional',
      'Marketing digital y atracción de clientes B2B',
      'Desarrollo de sitios web y aplicaciones a medida',
    ],
    audience: 'Empresas, PyMEs y emprendedores que buscan escalar su impacto comercial.',
    ctaText: 'Ver propuesta & contacto',
  },
  {
    id: 'academia',
    name: 'Academia',
    fullName: 'Academia Flor Martinez',
    tagline: 'Plataforma de Formación, Empleabilidad & Crecimiento',
    status: 'active',
    badge: 'Rama Activa',
    href: 'http://localhost:3001',
    external: true,
    color: '#58387D',
    accentBg: '#F4EFFF',
    borderColor: '#D8B4FE',
    icon: GraduationCap,
    description:
      'Plataforma educativa práctica para optimizar tu perfil laboral, dominar LinkedIn y acelerar tu inserción o crecimiento laboral sin rodeos teóricos.',
    features: [
      'Optimización de CV y perfil de LinkedIn de alto impacto',
      'Simulaciones y estrategias para entrevistas efectivas',
      'Mentoría aplicada de proyección y transición de carrera',
    ],
    audience: 'Estudiantes, graduados y profesionales en búsqueda de nuevas oportunidades.',
    ctaText: 'Ingresar a la Academia',
  },
  {
    id: 'tienda',
    name: 'Tienda',
    fullName: 'Tienda Flor Martinez',
    tagline: 'Merchandising Corporativo & Papelería Ejecutiva',
    status: 'coming_soon',
    badge: 'Próximamente',
    href: '/proyecto/tienda-flor-martinez',
    external: false,
    color: '#9C5724',
    accentBg: '#FAF2EA',
    borderColor: '#D9C8B6',
    icon: ShoppingBag,
    description:
      'Línea de productos físicos premium: kits de bienvenida empresarial, agendas ejecutivas y papelería corporativa de alta calidad por volumen.',
    features: [
      'Kits de bienvenida y onboarding para colaboradores y clientes',
      'Cuadernos, agendas y papelería de autor con acabados de lujo',
      'Merchandising institucional por volumen y personalización',
    ],
    audience: 'Empresas, directores de Recursos Humanos y organizadores de eventos.',
    ctaText: 'Ver catálogo futuro',
  },
];

const navLinks = [
  { label: 'Inicio', targetId: 'inicio' },
  { label: 'Proyectos', targetId: 'proyectos' },
  { label: 'Sobre mí', targetId: 'sobre-mi' },
  { label: 'Contacto', targetId: 'contacto' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const [expandedMobileBranch, setExpandedMobileBranch] = useState<string | null>('academia');
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isManualScrollingRef = useRef<boolean>(false);
  const manualScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Skip scroll spy update during programmatic smooth scroll to prevent jitter
      if (isManualScrollingRef.current) return;

      // Scroll Spy for Single Page Sections with Double Fixed Navbar (order from bottom to top)
      if (pathname === '/') {
        const sectionIds = ['contacto', 'sobre-mi', 'proyectos', 'inicio'];
        const scrollPosition = window.scrollY + 160;

        for (const id of sectionIds) {
          const section = document.getElementById(id);
          if (section) {
            const top = section.offsetTop;
            if (scrollPosition >= top) {
              setActiveSection(id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (manualScrollTimeoutRef.current) clearTimeout(manualScrollTimeoutRef.current);
    };
  }, [pathname]);

  const scrollToSection = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        // Lock scroll spy immediately to avoid flickering during smooth scroll animation
        isManualScrollingRef.current = true;
        setActiveSection(targetId);

        if (manualScrollTimeoutRef.current) {
          clearTimeout(manualScrollTimeoutRef.current);
        }
        manualScrollTimeoutRef.current = setTimeout(() => {
          isManualScrollingRef.current = false;
        }, 900);

        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${targetId}`);
      }
    } else {
      window.location.href = `/#${targetId}`;
    }
  };

  useEffect(() => {
    setIsOpen(false);
    setActiveHoverId(null);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleMouseEnter = (branchId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setActiveHoverId(branchId);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveHoverId(null);
    }, 220);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
      {/* ==========================================================================
          TOP BAR: CENTRAL ECOSYSTEM SWITCHER WITH MAXIMUM PROMINENCE
          ========================================================================== */}
      <div className={styles.topBar}>
        <Container size="wide" className={styles.topBarContainer}>
          {/* Left indicator */}
          <div className={styles.topBarIntro}>
            <span className={styles.sparkleIcon}>✦</span>
            <span className={styles.topBarIntroText}>ECOSISTEMA FLOR MARTINEZ</span>
          </div>

          {/* CENTERED PROMINENT 3 BUTTONS */}
          <div className={styles.centralSwitcherWrapper}>
            <nav className={styles.centralSwitcher} aria-label="Ecosistema de proyectos">
              {ecosystemBranches.map((branch) => {
                const Icon = branch.icon;
                const isActive = branch.status === 'active';
                const isHovered = activeHoverId === branch.id;

                const isAgencia = branch.id === 'agencia';
                const isAcademia = branch.id === 'academia';
                const branchColorClass = isAcademia
                  ? styles.btnActiveEcosystem
                  : isAgencia
                  ? styles.btnAgenciaColor
                  : styles.btnComingEcosystem;

                return (
                  <div
                    key={branch.id}
                    className={styles.switcherItemContainer}
                    onMouseEnter={() => handleMouseEnter(branch.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {branch.external ? (
                      <a
                        href={branch.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.switcherButton} ${branchColorClass} ${
                          isHovered ? styles.btnHovered : ''
                        }`}
                        aria-expanded={isHovered}
                      >
                        <span
                          className={styles.switcherIconWrap}
                          style={{ backgroundColor: branch.accentBg, color: branch.color }}
                        >
                          <Icon size={14} />
                        </span>
                        <span className={styles.switcherName}>{branch.name}</span>
                        <span
                          className={`${styles.switcherBadge} ${
                            isActive ? styles.badgeActive : styles.badgeComing
                          }`}
                        >
                          {isActive && <span className={styles.pulsingLiveDot} />}
                          {branch.badge}
                        </span>
                        <ChevronDown
                          size={12}
                          className={`${styles.chevronIcon} ${isHovered ? styles.chevronOpen : ''}`}
                        />
                      </a>
                    ) : (
                      <Link
                        href={branch.href}
                        className={`${styles.switcherButton} ${branchColorClass} ${
                          isHovered ? styles.btnHovered : ''
                        }`}
                        aria-expanded={isHovered}
                      >
                        <span
                          className={styles.switcherIconWrap}
                          style={{ backgroundColor: branch.accentBg, color: branch.color }}
                        >
                          <Icon size={14} />
                        </span>
                        <span className={styles.switcherName}>{branch.name}</span>
                        <span
                          className={`${styles.switcherBadge} ${
                            isActive ? styles.badgeActive : styles.badgeComing
                          }`}
                        >
                          {branch.badge}
                        </span>
                        <ChevronDown
                          size={12}
                          className={`${styles.chevronIcon} ${isHovered ? styles.chevronOpen : ''}`}
                        />
                      </Link>
                    )}

                    {/* ==========================================================
                        RICH HOVER DROPDOWN / POPOVER CARD
                        ========================================================== */}
                    {isHovered && (
                      <div
                        className={`${styles.hoverPopover} ${styles[`popover_${branch.id}`]}`}
                        onMouseEnter={() => handleMouseEnter(branch.id)}
                        onMouseLeave={handleMouseLeave}
                        role="region"
                        aria-label={`Información detallada de ${branch.fullName}`}
                      >
                        <div className={styles.popoverArrow} />
                        <div className={styles.popoverInner}>
                          {/* Popover Header */}
                          <div className={styles.popoverHeader}>
                            <div className={styles.popoverHeaderLeft}>
                              <div className={styles.popoverIconBox}>
                                <Icon size={22} style={{ color: '#ffffff' }} />
                              </div>
                              <div>
                                <h3 className={styles.popoverTitle}>{branch.fullName}</h3>
                                <p className={styles.popoverTagline}>{branch.tagline}</p>
                              </div>
                            </div>
                            <span
                              className={`${styles.popoverStatus} ${
                                isActive ? styles.popoverStatusActive : styles.popoverStatusComing
                              }`}
                            >
                              {branch.badge}
                            </span>
                          </div>

                          {/* Popover Description */}
                          <p className={styles.popoverDescription}>{branch.description}</p>

                          {/* Popover Features List */}
                          <div className={styles.popoverFeatures}>
                            <div className={styles.featuresHeading}>Servicios y alcances clave:</div>
                            <ul className={styles.featuresList}>
                              {branch.features.map((feature, idx) => (
                                <li key={idx} className={styles.featureItem}>
                                  <CheckCircle2
                                    size={16}
                                    className={styles.featureCheck}
                                  />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Audience note */}
                          <div className={styles.popoverAudience}>
                            <span className={styles.audienceLabel}>Dirigido a:</span>{' '}
                            <span className={styles.audienceText}>{branch.audience}</span>
                          </div>

                          {/* Popover Action Area */}
                          <div className={styles.popoverFooter}>
                            {branch.external ? (
                              <a
                                href={branch.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${styles.popoverCtaBtn} ${
                                  isActive ? styles.popoverCtaActive : styles.popoverCtaDefault
                                }`}
                              >
                                <span>{branch.ctaText}</span>
                                <ArrowUpRight size={16} />
                              </a>
                            ) : (
                              <Link
                                href={branch.href}
                                className={`${styles.popoverCtaBtn} ${styles.popoverCtaDefault}`}
                              >
                                <span>{branch.ctaText}</span>
                                <ArrowRight size={16} />
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Right: Global Ecosystem Auth Widget */}
          <div className={styles.topBarRight}>
            <AuthWidget />
          </div>
        </Container>
      </div>

      {/* ==========================================================================
          MAIN NAVIGATION BAR
          ========================================================================== */}
      <div className={styles.mainNav}>
        <Container size="wide" className={styles.mainNavContainer}>
          {/* Logo with official BrandLogo */}
          <Link href="/" className={styles.logoLink} aria-label="Flor Martinez Home">
            <BrandLogo variant="light" size="md" showSubtitle />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className={styles.navLinks} aria-label="Navegación principal">
            {navLinks.map((link) => {
              const isActive = activeSection === link.targetId;
              return (
                <a
                  key={link.targetId}
                  href={`#${link.targetId}`}
                  onClick={(e) => scrollToSection(e, link.targetId)}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                >
                  {link.label}
                  {isActive && <span className={styles.activeIndicator} />}
                </a>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className={styles.actions}>
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.academyHighlightBtn}
              title="Acceder a la plataforma Academia Flor Martinez"
            >
              <GraduationCap size={16} />
              <span>Academia</span>
              <span className={styles.livePill}>Activa</span>
            </a>

            <Button
              href="/#contacto"
              onClick={(e: React.MouseEvent) => scrollToSection(e, 'contacto')}
              variant="primary"
              size="sm"
            >
              Hablemos
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
          MOBILE DRAWER WITH ACCORDION EXPLANATIONS
          ========================================================================== */}
      {isOpen && (
        <div className={styles.mobileDrawer} role="dialog" aria-modal="true">
          <div className={styles.mobileDrawerContent}>
            {/* Ecosystem Projects Accordion */}
            <div className={styles.mobileSectionTitle}>Ecosistema de Proyectos</div>
            <div className={styles.mobileAccordionList}>
              {ecosystemBranches.map((branch) => {
                const Icon = branch.icon;
                const isActive = branch.status === 'active';
                const isExpanded = expandedMobileBranch === branch.id;

                return (
                  <div
                    key={branch.id}
                    className={`${styles.mobileAccordionCard} ${
                      isExpanded ? styles.mobileCardExpanded : ''
                    }`}
                  >
                    <button
                      type="button"
                      className={styles.mobileAccordionTrigger}
                      onClick={() =>
                        setExpandedMobileBranch(isExpanded ? null : branch.id)
                      }
                      aria-expanded={isExpanded}
                    >
                      <div className={styles.mobileBranchHeader}>
                        <div
                          className={styles.mobileBranchIconBox}
                          style={{ backgroundColor: branch.accentBg, color: branch.color }}
                        >
                          <Icon size={18} />
                        </div>
                        <div className={styles.mobileBranchTitles}>
                          <span className={styles.mobileBranchTitle}>{branch.name}</span>
                          <span className={styles.mobileBranchStatus}>{branch.badge}</span>
                        </div>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`${styles.accordionChevron} ${
                          isExpanded ? styles.accordionChevronOpen : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className={styles.mobileAccordionBody}>
                        <p className={styles.mobileAccordionDesc}>{branch.description}</p>

                        <div className={styles.mobileAccordionFeatures}>
                          {branch.features.map((f, i) => (
                            <div key={i} className={styles.mobileFeatureItem}>
                              <CheckCircle2 size={13} style={{ color: branch.color }} />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>

                        <div className={styles.mobileAccordionAction}>
                          {branch.external ? (
                            <a
                              href={branch.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`${styles.mobileBranchBtn} ${
                                isActive ? styles.mobileBtnActive : styles.mobileBtnDefault
                              }`}
                            >
                              <span>{branch.ctaText}</span>
                              <ArrowUpRight size={15} />
                            </a>
                          ) : (
                            <Link
                              href={branch.href}
                              className={`${styles.mobileBranchBtn} ${styles.mobileBtnDefault}`}
                            >
                              <span>{branch.ctaText}</span>
                              <ArrowRight size={15} />
                            </Link>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className={styles.mobileDivider} />

            {/* Standard Nav Links */}
            <div className={styles.mobileSectionTitle}>Navegación</div>
            <nav className={styles.mobileNavLinks}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.targetId;
                return (
                  <a
                    key={link.targetId}
                    href={`#${link.targetId}`}
                    onClick={(e) => scrollToSection(e, link.targetId)}
                    className={`${styles.mobileNavLink} ${
                      isActive ? styles.mobileNavLinkActive : ''
                    }`}
                  >
                    {link.label}
                    {isActive && <span className={styles.activeBadge}>Actual</span>}
                  </a>
                );
              })}
            </nav>

            <div className={styles.mobileActions}>
              <Button
                href="/#contacto"
                onClick={(e: React.MouseEvent) => scrollToSection(e, 'contacto')}
                variant="primary"
                size="lg"
                className={styles.mobileFullBtn}
              >
                Contactar a Flor
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
