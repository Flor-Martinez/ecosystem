'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  LayoutGrid,
  PlayCircle,
  Table,
  Calendar,
  User,
  LogOut,
  ChevronDown,
  FolderDown,
  UserCheck,
  Zap,
  Lock,
  Compass,
  BookOpen,
  Code2,
  Sparkles,
  Video,
  Star,
  ShieldCheck,
  Menu,
  X,
  ArrowUpRight,
} from 'lucide-react';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useAuth } from '@/context/AuthContext';
import { campusPrograms, CampusProgram } from '@/data/campus';
import styles from './CampusHeader.module.css';

interface CampusHeaderProps {
  currentProgram: CampusProgram;
  onSelectProgram: (program: CampusProgram) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  completedCount: number;
  totalLessonsCount: number;
  membershipTier?: 'paid' | 'trial' | 'free';
  onToggleMembership?: () => void;
  onOpenCatalogModal?: () => void;
  onLockedClick?: (featureId: string) => void;
  isDevMode?: boolean;
  onToggleDevMode?: () => void;
  favoriteIds?: Set<string>;
  onToggleFavorite?: (id: string) => void;
}

export function CampusHeader({
  currentProgram,
  onSelectProgram,
  currentView,
  setCurrentView,
  completedCount,
  totalLessonsCount,
  membershipTier = 'paid',
  onToggleMembership,
  onOpenCatalogModal,
  onLockedClick,
  isDevMode = true,
  onToggleDevMode,
  favoriteIds,
  onToggleFavorite,
}: CampusHeaderProps) {
  const { user, isSuperAdmin, openAuthModal, logout } = useAuth();
  const [showProgramDropdown, setShowProgramDropdown] = useState(false);
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);

  // Lock body scroll & handle Escape when mobile drawer is open
  useEffect(() => {
    if (!showMobileDrawer) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowMobileDrawer(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [showMobileDrawer]);

  const progressPercent = totalLessonsCount > 0
    ? Math.round((completedCount / totalLessonsCount) * 100)
    : 0;

  const isExperience = currentProgram.type === 'experiencia';
  const isCourse = currentProgram.type === 'curso';

  const experiencePrograms = campusPrograms.filter((p) => p.type === 'experiencia');
  const coursePrograms = campusPrograms.filter((p) => p.type === 'curso');

  // Herramientas list with dynamic favorite sorting
  const toolItems = [
    {
      id: 'tool-recursos',
      targetView: 'recursos',
      title: 'Bóveda de Recursos',
      subtitle: '28 Plantillas protegidas',
      icon: FolderDown,
      iconBg: '#FEF3C7',
      iconColor: '#D97706',
      isLocked: false,
    },
    {
      id: 'tool-tracker',
      targetView: 'tracker',
      title: 'Tracker de Postulaciones',
      subtitle: 'Gestión de procesos activos',
      icon: Table,
      iconBg: '#ECFEFF',
      iconColor: '#0891B2',
      isLocked: membershipTier !== 'paid',
    },
    {
      id: 'tool-agenda',
      targetView: 'agenda',
      title: 'Agenda & Calendario',
      subtitle: 'Entrevistas y fechas clave',
      icon: Calendar,
      iconBg: '#FFF7ED',
      iconColor: '#EA580C',
      isLocked: membershipTier !== 'paid',
    },
    {
      id: 'tool-vocacional',
      targetView: 'test-vocacional',
      title: 'Test Vocacional & Orientación',
      subtitle: 'Diagnóstico de fortalezas',
      icon: Compass,
      iconBg: '#FDF2F8',
      iconColor: '#EC4899',
      isLocked: false,
    },
  ];

  // Favorited tools appear at the top (only for VIP members)
  const sortedTools = [...toolItems].sort((a, b) => {
    if (membershipTier !== 'paid') return 0;
    const aFav = favoriteIds?.has(a.id) ? 1 : 0;
    const bFav = favoriteIds?.has(b.id) ? 1 : 0;
    return bFav - aFav;
  });

  return (
    <header className={styles.campusHeader}>
      <div className={styles.headerContainer}>
        {/* LEFT: Logo Chiquito & Program Switcher */}
        <div className={styles.leftArea}>
          {/* Logo Chiquito de la Academia */}
          <Link
            href="/"
            className={styles.campusLogoLink}
            title="Volver al inicio de Academia Flor Martinez"
          >
            <BrandLogo variant="dark" branch="academia" size="sm" showSubtitle={true} />
          </Link>

          <div className={styles.headerDivider} />

          {user ? (
            /* Program Switcher Dropdown (Only for Authenticated Users with Enrolled Courses) */
            <div className={styles.programDropdownWrap}>
              <button
                type="button"
                className={styles.programSwitchBtn}
                onClick={() => setShowProgramDropdown(!showProgramDropdown)}
              >
                <div className={`${styles.iconBox} ${isCourse ? styles.iconBoxCourse : ''}`}>
                  {isCourse ? <BookOpen size={16} /> : <GraduationCap size={16} />}
                </div>
                <div className={styles.brandText}>
                  <span
                    className={`${styles.programBadge} ${isCourse ? styles.courseBadgePill : ''}`}
                  >
                    {currentProgram.badge}
                  </span>
                  <strong className={styles.programTitle}>
                    {currentProgram.title}
                  </strong>
                </div>
                <ChevronDown size={14} className={styles.dropdownArrow} />
              </button>

              {/* Dropdown Menu */}
              {showProgramDropdown && (
                <>
                  <div
                    className={styles.dropdownBackdrop}
                    onClick={() => setShowProgramDropdown(false)}
                  />
                  <div className={styles.dropdownMenu}>
                    {/* Experiences Section */}
                    {experiencePrograms.length > 0 && (
                      <>
                        <span className={styles.dropdownHeader}>EXPERIENCIAS INTEGRALES:</span>
                        {experiencePrograms.map((prog) => {
                          const isSelected = prog.id === currentProgram.id;
                          return (
                            <button
                              key={prog.id}
                              type="button"
                              className={`${styles.dropdownItem} ${isSelected ? styles.dropdownItemActive : ''}`}
                              onClick={() => {
                                onSelectProgram(prog);
                                setShowProgramDropdown(false);
                              }}
                            >
                              <div className={styles.itemLeft}>
                                <span className={styles.itemBadge}>{prog.badge}</span>
                                <strong className={styles.itemTitle}>{prog.title}</strong>
                                <span className={styles.itemTagline}>{prog.tagline}</span>
                              </div>
                              {isSelected && <span className={styles.itemActiveCheck}>✔ Activo</span>}
                            </button>
                          );
                        })}
                      </>
                    )}

                    {/* Subtle Exit to Homepage */}
                    <div className={styles.dropdownFooterActions}>
                      <Link
                        href="/"
                        className={styles.subtleExitLink}
                        onClick={() => setShowProgramDropdown(false)}
                        title="Volver a la portada de la Academia"
                      >
                        <span>Volver al sitio web principal de la Academia ↗</span>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Unauthenticated / Guest: Always Experiencia Búsqueda Laboral with badge */
            <div className={styles.guestProgramPill}>
              <div className={styles.iconBox}>
                <GraduationCap size={16} />
              </div>
              <div className={styles.brandText}>
                <span className={styles.programBadge}>EXPERIENCIA INTEGRAL</span>
                <strong className={styles.programTitle}>Experiencia Búsqueda Laboral</strong>
              </div>
            </div>
          )}
        </div>

        {/* CENTER: Progress Indicator or Free/Trial Mode Badge */}
        <div className={styles.centerArea}>
          {!user || membershipTier === 'free' ? (
            <div className={styles.freeModeBadge}>
              <Lock size={13} className={styles.freeModeLock} />
              <span>Versión Gratuita · Modo Exploración</span>
            </div>
          ) : membershipTier === 'trial' ? (
            <div className={styles.freeModeBadge} style={{ borderColor: 'rgba(96, 165, 250, 0.35)', background: 'rgba(59, 130, 246, 0.14)', color: '#BFDBFE' }}>
              <Sparkles size={13} style={{ color: '#60A5FA' }} />
              <span>Acceso Prueba · Módulos 1 al 4</span>
            </div>
          ) : (
            <div className={styles.progressBox}>
              <div className={styles.progressTop}>
                <span className={styles.progressLabel}>Progreso del Curso</span>
                <strong className={styles.progressValue}>
                  {completedCount}/{totalLessonsCount} clases ({progressPercent}%)
                </strong>
              </div>
              <div className={styles.progressBarBg}>
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Navigation & Member Profile */}
        <div className={styles.rightArea}>
          {/* ONLY show navigation tabs if it's an Experience! Courses are pure Aula Virtual */}
          {isExperience && (
            <nav className={styles.navTabs} aria-label="Navegación del Campus">
              <button
                type="button"
                className={`${styles.navTabBtn} ${currentView === 'dashboard' ? styles.navTabActive : ''}`}
                onClick={() => setCurrentView('dashboard')}
              >
                <LayoutGrid size={16} />
                <span>Mi Tablero</span>
              </button>

              <button
                type="button"
                className={`${styles.navTabBtn} ${currentView === 'lesson' ? styles.navTabActive : ''}`}
                onClick={() => setCurrentView('lesson')}
              >
                <PlayCircle size={16} />
                <span>Aula</span>
              </button>

              {/* DEDICATED HERRAMIENTAS DROPDOWN MENU */}
              <div className={styles.toolsDropdownWrap}>
                <button
                  type="button"
                  className={`${styles.navTabBtn} ${styles.toolsMenuBtn} ${['recursos', 'tracker', 'agenda', 'test-vocacional', 'evaluaciones'].includes(currentView) ? styles.toolsMenuBtnActive : ''}`}
                  onClick={() => setShowToolsMenu(!showToolsMenu)}
                  title="Acceso directo a todas las herramientas del campus"
                >
                  <Sparkles size={16} className={styles.toolsSparkleIcon} />
                  <span>Herramientas</span>
                  <ChevronDown size={14} className={`${styles.toolsChevron} ${showToolsMenu ? styles.toolsChevronOpen : ''}`} />
                </button>

                {showToolsMenu && (
                  <>
                    <div
                      className={styles.toolsMenuBackdrop}
                      onClick={() => setShowToolsMenu(false)}
                    />
                    <div className={styles.toolsDropdownPanel}>
                      <div className={styles.toolsDropdownHeader}>
                        <Sparkles size={13} color="#7C3AED" />
                        <span>HERRAMIENTAS & RECURSOS DISPONIBLES</span>
                      </div>

                      <div className={styles.toolsGrid}>
                        {sortedTools.map((tool) => {
                          const IconComp = tool.icon;
                          const isFav = membershipTier === 'paid' && (favoriteIds?.has(tool.id) ?? false);
                          const isActive = currentView === tool.targetView;

                          return (
                            <div
                              key={tool.id}
                              className={`${styles.toolItem} ${isActive ? styles.toolItemActive : ''} ${isFav ? styles.toolItemFav : ''}`}
                              onClick={() => {
                                if (tool.isLocked) {
                                  if (onLockedClick) onLockedClick(tool.targetView);
                                } else {
                                  setCurrentView(tool.targetView);
                                }
                                setShowToolsMenu(false);
                              }}
                            >
                              <div
                                className={styles.toolIconWrap}
                                style={{ backgroundColor: tool.iconBg, color: tool.iconColor }}
                              >
                                <IconComp size={17} />
                              </div>

                              <div className={styles.toolInfo}>
                                <div className={styles.toolTitleRow}>
                                  <strong className={styles.toolTitle}>{tool.title}</strong>
                                  {isFav && <span className={styles.favBadgeMini}>Favorito</span>}
                                </div>
                                <span className={styles.toolSubtitle}>{tool.subtitle}</span>
                              </div>

                              {tool.isLocked ? (
                                <Lock size={12} className={styles.toolLock} />
                              ) : (membershipTier === 'paid' && onToggleFavorite) ? (
                                <button
                                  type="button"
                                  className={`${styles.favToggleBtn} ${isFav ? styles.favToggleActive : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleFavorite(tool.id);
                                  }}
                                  title={isFav ? 'Quitar de favoritos' : 'Fijar en favoritos arriba'}
                                >
                                  <Star
                                    size={15}
                                    fill={isFav ? '#F59E0B' : 'transparent'}
                                    color={isFav ? '#F59E0B' : '#94A3B8'}
                                  />
                                </button>
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* DIRECT MI PERFIL BUTTON */}
              <button
                type="button"
                className={`${styles.navTabBtn} ${membershipTier !== 'paid' ? styles.navTabLocked : ''} ${currentView === 'perfil' ? styles.navTabActive : ''}`}
                onClick={() => {
                  if (membershipTier !== 'paid') {
                    if (onLockedClick) onLockedClick('perfil');
                  } else {
                    setCurrentView('perfil');
                  }
                }}
                title={membershipTier !== 'paid' ? '🔒 Requiere Membresía VIP para activar este panel' : 'Expediente del Alumno & Perfil'}
              >
                <UserCheck size={16} />
                <span>Mi Perfil</span>
                {membershipTier !== 'paid' && <Lock size={11} className={styles.tabLockIcon} />}
              </button>
            </nav>
          )}

          {/* DEVELOPER MEMBERSHIP SWITCH (Only visible for SuperAdmin accounts) */}
          {isSuperAdmin && onToggleMembership && (
            <button
              type="button"
              className={`${styles.devTierSwitch} ${membershipTier === 'paid' ? styles.devTierPaid : styles.devTierFree}`}
              onClick={onToggleMembership}
              title="Herramienta de desarrollo: alternar entre VIP Pagado, Acceso Prueba (Mód. 1-4) y Free Demo"
              aria-label="Alternar membresía de prueba"
            >
              {membershipTier === 'paid' ? (
                <>
                  <Zap size={13} className={styles.devZapIcon} />
                  <span>VIP Pagado</span>
                </>
              ) : membershipTier === 'trial' ? (
                <>
                  <Sparkles size={13} style={{ color: '#60A5FA' }} />
                  <span>Acceso Prueba</span>
                </>
              ) : (
                <>
                  <Lock size={13} className={styles.devLockIcon} />
                  <span>Free Demo</span>
                </>
              )}
            </button>
          )}

          {/* MODO DEV TOGGLE SWITCH (Only visible for SuperAdmin accounts) */}
          {isSuperAdmin && onToggleDevMode && (
            <button
              type="button"
              className={`${styles.devTierSwitch} ${isDevMode ? styles.devModeActive : styles.devModeInactive}`}
              onClick={onToggleDevMode}
              title="Alternar Modo Dev (desbloquea y permite saltear cualquier clase sin restricciones) y Modo Alumno"
              aria-label="Alternar Modo Dev"
            >
              <Code2 size={13} />
              <span>{isDevMode ? 'Modo Dev (Saltear Clases)' : 'Modo Alumno'}</span>
            </button>
          )}

          {/* PANEL ADMIN GOLDEN BUTTON (Only visible for SuperAdmin accounts) */}
          {isSuperAdmin && (
            <Link
              href="/admin"
              className={styles.adminGoldenBtn}
              title="Ir al Panel de Administración de la Academia"
            >
              <ShieldCheck size={13} />
              <span>Panel Admin</span>
            </Link>
          )}

          {/* User Section (Desktop) */}
          <div className={styles.userSection}>
            {user ? (
              <div className={styles.userProfile}>
                <div className={styles.userAvatar}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className={styles.userInfo}>
                  <strong className={styles.userName}>{user.name}</strong>
                  {isSuperAdmin ? (
                    <span
                      className={`${styles.userBadge} ${
                        membershipTier === 'paid'
                          ? styles.badgeVip
                          : membershipTier === 'trial'
                          ? styles.badgeTrial
                          : styles.badgeFree
                      }`}
                    >
                      {membershipTier === 'paid'
                        ? 'Superadministrador'
                        : membershipTier === 'trial'
                        ? 'Acceso Prueba'
                        : 'Vista Gratuita'}
                    </span>
                  ) : membershipTier === 'paid' ? (
                    <span className={`${styles.userBadge} ${styles.badgeVip}`}>
                      Membresía VIP
                    </span>
                  ) : membershipTier === 'trial' ? (
                    <span className={`${styles.userBadge} ${styles.badgeTrial}`}>
                      Acceso Prueba
                    </span>
                  ) : (
                    <span className={`${styles.userBadge} ${styles.badgeFree}`}>
                      Cuenta Gratuita
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className={styles.logoutBtn}
                  title="Cerrar sesión"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className={styles.loginBtn}
              >
                <User size={15} />
                <span>Ingresar</span>
              </button>
            )}
          </div>
        </div>

        {/* MOBILE RIGHT CONTROLS: Compact Login/Avatar + Hamburger Drawer Button */}
        <div className={styles.mobileControls}>
          {!user && (
            <button
              type="button"
              onClick={() => openAuthModal('login')}
              className={styles.mobileQuickLoginBtn}
            >
              <User size={14} />
              <span>Ingresar</span>
            </button>
          )}
          <button
            type="button"
            className={styles.mobileMenuBtn}
            onClick={() => setShowMobileDrawer(true)}
            aria-label="Abrir menú del campus"
            aria-expanded={showMobileDrawer}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* MOBILE SLIDE-OVER LATERAL DRAWER */}
      {showMobileDrawer && (
        <div
          className={styles.mobileDrawerOverlay}
          onClick={() => setShowMobileDrawer(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Menú del Campus Virtual"
        >
          <aside
            className={styles.mobileDrawerPanel}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className={styles.mobileDrawerHeader}>
              <div className={styles.mobileDrawerBrand}>
                <div className={styles.iconBox}>
                  <GraduationCap size={16} />
                </div>
                <div className={styles.brandText}>
                  <span className={styles.programBadge}>CAMPUS VIRTUAL</span>
                  <strong className={styles.programTitle}>{currentProgram.title}</strong>
                </div>
              </div>
              <button
                type="button"
                className={styles.mobileDrawerCloseBtn}
                onClick={() => setShowMobileDrawer(false)}
                aria-label="Cerrar menú"
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer Scroll Body */}
            <div className={styles.mobileDrawerBody}>
              {/* 1. Account / Login Card */}
              <div className={styles.mobileAccountCard}>
                {user ? (
                  <>
                    <div className={styles.mobileAccountRow}>
                      <div className={styles.mobileUserAvatar}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className={styles.mobileUserMeta}>
                        <strong className={styles.mobileUserName}>{user.name}</strong>
                        <span className={styles.mobileUserEmail}>{user.email}</span>
                        {isSuperAdmin ? (
                          <span
                            className={`${styles.userBadge} ${
                              membershipTier === 'paid'
                                ? styles.badgeVip
                                : membershipTier === 'trial'
                                ? styles.badgeTrial
                                : styles.badgeFree
                            }`}
                          >
                            {membershipTier === 'paid'
                              ? 'Superadministrador'
                              : membershipTier === 'trial'
                              ? 'Acceso Prueba'
                              : 'Vista Gratuita'}
                          </span>
                        ) : membershipTier === 'paid' ? (
                          <span className={`${styles.userBadge} ${styles.badgeVip}`}>
                            Membresía VIP
                          </span>
                        ) : membershipTier === 'trial' ? (
                          <span className={`${styles.userBadge} ${styles.badgeTrial}`}>
                            Acceso Prueba
                          </span>
                        ) : (
                          <span className={`${styles.userBadge} ${styles.badgeFree}`}>
                            Cuenta Gratuita
                          </span>
                        )}
                      </div>
                    </div>

                    {membershipTier === 'paid' && (
                      <div className={styles.mobileProgressBox}>
                        <div className={styles.progressTop}>
                          <span className={styles.progressLabel}>Progreso del Curso</span>
                          <strong className={styles.progressValue}>
                            {completedCount}/{totalLessonsCount} ({progressPercent}%)
                          </strong>
                        </div>
                        <div className={styles.progressBarBg}>
                          <div
                            className={styles.progressBarFill}
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      className={styles.mobileLogoutBtn}
                      onClick={() => {
                        setShowMobileDrawer(false);
                        logout();
                      }}
                    >
                      <LogOut size={15} />
                      <span>Cerrar sesión</span>
                    </button>
                  </>
                ) : (
                  <div className={styles.mobileGuestCard}>
                    <div className={styles.mobileGuestBadge}>
                      <Lock size={12} className={styles.freeModeLock} />
                      <span>Versión Gratuita · Modo Exploración</span>
                    </div>
                    <p className={styles.mobileGuestDesc}>
                      Iniciá sesión con Google para guardar tu progreso y acceder a tu membresía.
                    </p>
                    <button
                      type="button"
                      className={styles.mobileDrawerLoginBtn}
                      onClick={() => {
                        setShowMobileDrawer(false);
                        openAuthModal('login');
                      }}
                    >
                      <User size={16} />
                      <span>Ingresar con Google</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 2. Main Navigation */}
              {isExperience && (
                <div className={styles.mobileDrawerSection}>
                  <span className={styles.mobileDrawerSectionTitle}>NAVEGACIÓN</span>
                  <div className={styles.mobileNavList}>
                    <button
                      type="button"
                      className={`${styles.mobileNavItem} ${currentView === 'dashboard' ? styles.mobileNavItemActive : ''}`}
                      onClick={() => {
                        setCurrentView('dashboard');
                        setShowMobileDrawer(false);
                      }}
                    >
                      <LayoutGrid size={17} />
                      <span>Mi Tablero</span>
                    </button>

                    <button
                      type="button"
                      className={`${styles.mobileNavItem} ${currentView === 'lesson' ? styles.mobileNavItemActive : ''}`}
                      onClick={() => {
                        setCurrentView('lesson');
                        setShowMobileDrawer(false);
                      }}
                    >
                      <PlayCircle size={17} />
                      <span>Aula Virtual</span>
                    </button>

                    <button
                      type="button"
                      className={`${styles.mobileNavItem} ${currentView === 'perfil' ? styles.mobileNavItemActive : ''} ${membershipTier !== 'paid' ? styles.mobileNavItemLocked : ''}`}
                      onClick={() => {
                        setShowMobileDrawer(false);
                        if (membershipTier !== 'paid') {
                          if (onLockedClick) onLockedClick('perfil');
                        } else {
                          setCurrentView('perfil');
                        }
                      }}
                    >
                      <UserCheck size={17} />
                      <span>Mi Perfil</span>
                      {membershipTier !== 'paid' && <Lock size={13} className={styles.mobileItemLock} />}
                    </button>
                  </div>
                </div>
              )}

              {/* 3. Tools */}
              {isExperience && (
                <div className={styles.mobileDrawerSection}>
                  <span className={styles.mobileDrawerSectionTitle}>HERRAMIENTAS</span>
                  <div className={styles.mobileNavList}>
                    {sortedTools.map((tool) => {
                      const IconComp = tool.icon;
                      const isActive = currentView === tool.targetView;
                      return (
                        <button
                          key={tool.id}
                          type="button"
                          className={`${styles.mobileNavItem} ${isActive ? styles.mobileNavItemActive : ''} ${tool.isLocked ? styles.mobileNavItemLocked : ''}`}
                          onClick={() => {
                            setShowMobileDrawer(false);
                            if (tool.isLocked) {
                              if (onLockedClick) onLockedClick(tool.targetView);
                            } else {
                              setCurrentView(tool.targetView);
                            }
                          }}
                        >
                          <IconComp size={17} style={{ color: tool.iconColor }} />
                          <span>{tool.title}</span>
                          {tool.isLocked && <Lock size={13} className={styles.mobileItemLock} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. SuperAdmin Controls (Only for SuperAdmin) */}
              {isSuperAdmin && (
                <div className={styles.mobileDrawerSection}>
                  <span className={styles.mobileDrawerSectionTitle}>ADMINISTRACIÓN</span>
                  <div className={styles.mobileNavList}>
                    <Link
                      href="/admin"
                      className={styles.mobileAdminLink}
                      onClick={() => setShowMobileDrawer(false)}
                    >
                      <ShieldCheck size={16} />
                      <span>Ir al Panel Admin</span>
                    </Link>

                    {onToggleMembership && (
                      <button
                        type="button"
                        className={styles.mobileNavItem}
                        onClick={() => {
                          onToggleMembership();
                          setShowMobileDrawer(false);
                        }}
                      >
                        {membershipTier === 'paid' ? <Zap size={16} color="#FDE047" /> : <Lock size={16} color="#F59E0B" />}
                        <span>Simulador: {membershipTier === 'paid' ? 'VIP Pagado' : membershipTier === 'trial' ? 'Acceso Prueba' : 'Free Demo'}</span>
                      </button>
                    )}

                    {onToggleDevMode && (
                      <button
                        type="button"
                        className={styles.mobileNavItem}
                        onClick={() => {
                          onToggleDevMode();
                          setShowMobileDrawer(false);
                        }}
                      >
                        <Code2 size={16} color="#A78BFA" />
                        <span>{isDevMode ? 'Modo Dev (Saltear Clases)' : 'Modo Alumno'}</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className={styles.mobileDrawerFooter}>
              <Link
                href="/"
                className={styles.mobileHomeLink}
                onClick={() => setShowMobileDrawer(false)}
              >
                <span>Volver al sitio principal de la Academia</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
