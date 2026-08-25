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

              <button
                type="button"
                className={`${styles.navTabBtn} ${currentView === 'recursos' ? styles.navTabActive : ''}`}
                onClick={() => setCurrentView('recursos')}
                title="Biblioteca de Recursos & Plantillas"
              >
                <FolderDown size={16} />
                <span>Recursos</span>
              </button>

              {currentProgram.hasTracker && (
                <button
                  type="button"
                  className={`${styles.navTabBtn} ${membershipTier === 'free' ? styles.navTabLocked : ''} ${currentView === 'tracker' ? styles.navTabActive : ''}`}
                  onClick={() => {
                    if (membershipTier === 'free') {
                      if (onLockedClick) onLockedClick('tracker');
                    } else {
                      setCurrentView('tracker');
                    }
                  }}
                  title={membershipTier === 'free' ? '🔒 Requiere Membresía VIP para activar este panel' : 'Tracker de Postulaciones'}
                >
                  <Table size={16} />
                  <span>Tracker</span>
                  {membershipTier === 'free' && <Lock size={11} className={styles.tabLockIcon} />}
                </button>
              )}

              {currentProgram.hasZoom && (
                <button
                  type="button"
                  className={`${styles.navTabBtn} ${membershipTier === 'free' ? styles.navTabLocked : ''} ${currentView === 'zoom' || currentView === 'agenda' ? styles.navTabActive : ''}`}
                  onClick={() => {
                    if (membershipTier === 'free') {
                      if (onLockedClick) onLockedClick('agenda');
                    } else {
                      setCurrentView('agenda');
                    }
                  }}
                  title={membershipTier === 'free' ? '🔒 Requiere Membresía VIP para activar este panel' : 'Agenda & Mentorías'}
                >
                  <Calendar size={16} />
                  <span>Agenda</span>
                  {membershipTier === 'free' && <Lock size={11} className={styles.tabLockIcon} />}
                </button>
              )}

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
