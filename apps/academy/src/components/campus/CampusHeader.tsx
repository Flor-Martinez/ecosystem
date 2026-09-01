'use client';

import React, { useState } from 'react';
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
  TrendingUp,
  Video,
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
  membershipTier?: 'paid' | 'free';
  onToggleMembership?: () => void;
  onOpenCatalogModal?: () => void;
  onLockedClick?: (featureId: string) => void;
  isDevMode?: boolean;
  onToggleDevMode?: () => void;
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
}: CampusHeaderProps) {
  const { user, openAuthModal, logout } = useAuth();
  const [showProgramDropdown, setShowProgramDropdown] = useState(false);
  const [showToolsMenu, setShowToolsMenu] = useState(false);

  const progressPercent = totalLessonsCount > 0
    ? Math.round((completedCount / totalLessonsCount) * 100)
    : 0;

  const isExperience = currentProgram.type === 'experiencia';
  const isCourse = currentProgram.type === 'curso';

  const experiencePrograms = campusPrograms.filter((p) => p.type === 'experiencia');
  const coursePrograms = campusPrograms.filter((p) => p.type === 'curso');

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

                    {/* Individual Courses Section */}
                    {coursePrograms.length > 0 && (
                      <>
                        <span className={styles.dropdownHeaderCourse}>CURSOS INDIVIDUALES (SOLO AULA):</span>
                        {coursePrograms.map((prog) => {
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
                                <span className={styles.itemBadgeCourse}>{prog.badge}</span>
                                <strong className={styles.itemTitle}>{prog.title}</strong>
                                <span className={styles.itemTagline}>{prog.tagline}</span>
                              </div>
                              {isSelected && <span className={styles.itemActiveCheck}>✔ Activo</span>}
                            </button>
                          );
                        })}
                      </>
                    )}

                    {/* Add / Explore Catalogue Button & Subtle Exit */}
                    <div className={styles.dropdownFooterActions}>
                      <button
                        type="button"
                        className={styles.exploreCatalogBtn}
                        onClick={() => {
                          setShowProgramDropdown(false);
                          if (onOpenCatalogModal) onOpenCatalogModal();
                        }}
                      >
                        <Compass size={15} />
                        <span>✨ Explorar / Agregar más Cursos y Experiencias</span>
                      </button>

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

        {/* CENTER: Progress Indicator or Free Mode Badge */}
        <div className={styles.centerArea}>
          {!user || membershipTier === 'free' ? (
            <div className={styles.freeModeBadge}>
              <Lock size={13} className={styles.freeModeLock} />
              <span>Versión Gratuita · Modo Exploración</span>
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
                  className={`${styles.navTabBtn} ${styles.toolsMenuBtn} ${['recursos', 'tracker', 'agenda', 'zoom', 'test-vocacional', 'evaluaciones'].includes(currentView) ? styles.toolsMenuBtnActive : ''}`}
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
                        {/* 1. Recursos */}
                        <button
                          type="button"
                          className={`${styles.toolItem} ${currentView === 'recursos' ? styles.toolItemActive : ''}`}
                          onClick={() => {
                            setCurrentView('recursos');
                            setShowToolsMenu(false);
                          }}
                        >
                          <div className={styles.toolIconWrap} style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>
                            <FolderDown size={17} />
                          </div>
                          <div className={styles.toolInfo}>
                            <strong className={styles.toolTitle}>Bóveda de Recursos</strong>
                            <span className={styles.toolSubtitle}>28 Plantillas protegidas</span>
                          </div>
                        </button>

                        {/* 2. Tracker */}
                        <button
                          type="button"
                          className={`${styles.toolItem} ${currentView === 'tracker' ? styles.toolItemActive : ''}`}
                          onClick={() => {
                            if (membershipTier === 'free') {
                              if (onLockedClick) onLockedClick('tracker');
                            } else {
                              setCurrentView('tracker');
                            }
                            setShowToolsMenu(false);
                          }}
                        >
                          <div className={styles.toolIconWrap} style={{ backgroundColor: '#ECFEFF', color: '#0891B2' }}>
                            <Table size={17} />
                          </div>
                          <div className={styles.toolInfo}>
                            <strong className={styles.toolTitle}>Tracker de Postulaciones</strong>
                            <span className={styles.toolSubtitle}>Gestión de procesos activos</span>
                          </div>
                          {membershipTier === 'free' && <Lock size={12} className={styles.toolLock} />}
                        </button>

                        {/* 3. Agenda & Calendario */}
                        <button
                          type="button"
                          className={`${styles.toolItem} ${currentView === 'agenda' ? styles.toolItemActive : ''}`}
                          onClick={() => {
                            if (membershipTier === 'free') {
                              if (onLockedClick) onLockedClick('agenda');
                            } else {
                              setCurrentView('agenda');
                            }
                            setShowToolsMenu(false);
                          }}
                        >
                          <div className={styles.toolIconWrap} style={{ backgroundColor: '#FFF7ED', color: '#EA580C' }}>
                            <Calendar size={17} />
                          </div>
                          <div className={styles.toolInfo}>
                            <strong className={styles.toolTitle}>Agenda & Calendario</strong>
                            <span className={styles.toolSubtitle}>Entrevistas y fechas clave</span>
                          </div>
                          {membershipTier === 'free' && <Lock size={12} className={styles.toolLock} />}
                        </button>

                        {/* 4. Zoom Semanales */}
                        <button
                          type="button"
                          className={`${styles.toolItem} ${currentView === 'zoom' ? styles.toolItemActive : ''}`}
                          onClick={() => {
                            if (membershipTier === 'free') {
                              if (onLockedClick) onLockedClick('zoom');
                            } else {
                              setCurrentView('zoom');
                            }
                            setShowToolsMenu(false);
                          }}
                        >
                          <div className={styles.toolIconWrap} style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
                            <Video size={17} />
                          </div>
                          <div className={styles.toolInfo}>
                            <strong className={styles.toolTitle}>Charlas Semanales Zoom</strong>
                            <span className={styles.toolSubtitle}>Mentorías en vivo y grabaciones</span>
                          </div>
                          {membershipTier === 'free' && <Lock size={12} className={styles.toolLock} />}
                        </button>

                        {/* 5. Test Vocacional */}
                        <button
                          type="button"
                          className={`${styles.toolItem} ${currentView === 'test-vocacional' ? styles.toolItemActive : ''}`}
                          onClick={() => {
                            setCurrentView('test-vocacional');
                            setShowToolsMenu(false);
                          }}
                        >
                          <div className={styles.toolIconWrap} style={{ backgroundColor: '#FDF2F8', color: '#EC4899' }}>
                            <Compass size={17} />
                          </div>
                          <div className={styles.toolInfo}>
                            <strong className={styles.toolTitle}>Test Vocacional & Orientación</strong>
                            <span className={styles.toolSubtitle}>Diagnóstico de fortalezas</span>
                          </div>
                        </button>

                        {/* 6. Evaluaciones & Score */}
                        <button
                          type="button"
                          className={`${styles.toolItem} ${currentView === 'evaluaciones' ? styles.toolItemActive : ''}`}
                          onClick={() => {
                            setCurrentView('evaluaciones');
                            setShowToolsMenu(false);
                          }}
                        >
                          <div className={styles.toolIconWrap} style={{ backgroundColor: '#F0FDFA', color: '#0D9488' }}>
                            <TrendingUp size={17} />
                          </div>
                          <div className={styles.toolInfo}>
                            <strong className={styles.toolTitle}>Evaluaciones de Módulos & Score</strong>
                            <span className={styles.toolSubtitle}>Índice de competencias y logros</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* DIRECT MI PERFIL BUTTON */}
              <button
                type="button"
                className={`${styles.navTabBtn} ${membershipTier === 'free' ? styles.navTabLocked : ''} ${currentView === 'perfil' ? styles.navTabActive : ''}`}
                onClick={() => {
                  if (membershipTier === 'free') {
                    if (onLockedClick) onLockedClick('perfil');
                  } else {
                    setCurrentView('perfil');
                  }
                }}
                title={membershipTier === 'free' ? '🔒 Requiere Membresía VIP para activar este panel' : 'Expediente del Alumno & Perfil'}
              >
                <UserCheck size={16} />
                <span>Mi Perfil</span>
                {membershipTier === 'free' && <Lock size={11} className={styles.tabLockIcon} />}
              </button>
            </nav>
          )}

          {/* DEVELOPER MEMBERSHIP SWITCH (Only available for authenticated user session) */}
          {user && onToggleMembership && (
            <button
              type="button"
              className={`${styles.devTierSwitch} ${membershipTier === 'paid' ? styles.devTierPaid : styles.devTierFree}`}
              onClick={onToggleMembership}
              title="Herramienta de desarrollo: alternar entre Membresía Pagada (VIP) y Gratuita (Free)"
              aria-label="Alternar membresía de prueba"
            >
              {membershipTier === 'paid' ? (
                <>
                  <Zap size={13} className={styles.devZapIcon} />
                  <span>VIP Pagado</span>
                </>
              ) : (
                <>
                  <Lock size={13} className={styles.devLockIcon} />
                  <span>Free Demo</span>
                </>
              )}
            </button>
          )}

          {/* MODO DEV TOGGLE SWITCH */}
          {onToggleDevMode && (
            <button
              type="button"
              className={`${styles.devTierSwitch} ${isDevMode ? styles.devModeActive : styles.devModeInactive}`}
              onClick={onToggleDevMode}
              title="Alternar entre Modo Dev (ver guion y todas las clases desbloqueadas) y Modo Alumno"
              aria-label="Alternar Modo Dev"
            >
              <Code2 size={13} />
              <span>{isDevMode ? 'Modo Dev: Activo' : 'Modo Alumno'}</span>
            </button>
          )}

          {/* User Section */}
          <div className={styles.userSection}>
            {user ? (
              <div className={styles.userProfile}>
                <div className={styles.userAvatar}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className={styles.userInfo}>
                  <strong className={styles.userName}>{user.name}</strong>
                  <span
                    className={`${styles.userBadge} ${membershipTier === 'paid' ? styles.badgeVip : styles.badgeFree}`}
                  >
                    {membershipTier === 'paid' ? 'VIP Activo' : 'Free Demo'}
                  </span>
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
      </div>
    </header>
  );
}
