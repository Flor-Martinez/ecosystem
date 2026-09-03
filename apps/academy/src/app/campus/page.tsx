'use client';

import React, { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  getCampusInitialDataAction,
  saveLessonProgressAction,
  updateUserMembershipTierAction,
} from '@/actions/campus';
import { campusPrograms, CampusLesson, CampusProgram, CampusModule } from '@/data/campus';
import { CampusHeader } from '@/components/campus/CampusHeader';
import { CampusSidebar } from '@/components/campus/CampusSidebar';
import { CampusPlayer } from '@/components/campus/CampusPlayer';
import { CampusModuleCelebration } from '@/components/campus/CampusModuleCelebration';
import { CampusTracker } from '@/components/campus/CampusTracker';
import { CampusZoomAgenda } from '@/components/campus/CampusZoomAgenda';
import { CampusZoomLiveView } from '@/components/campus/CampusZoomLiveView';
import { CampusResourceVault } from '@/components/campus/CampusResourceVault';
import { CampusCatalogModal } from '@/components/campus/CampusCatalogModal';
import { CampusLockedModal } from '@/components/campus/CampusLockedModal';
import { CampusLockedPaywallView } from '@/components/campus/CampusLockedPaywallView';
import { EblDashboardGrid } from '@/components/campus/EblDashboardGrid';
import { EblStudentProfileView } from '@/components/campus/EblStudentProfileView';
import { EblVocationalTestView } from '@/components/campus/EblVocationalTestView';
import styles from './campus.module.css';

const DEV_MEMBERSHIP_KEY = 'campus_dev_membership_tier';

function CampusContent() {
  const { user: authUser } = useAuth();
  const activeEmail = authUser?.email || 'santiago.morales@ejemplo.com';

  const searchParams = useSearchParams();
  const requestedSlug = searchParams.get('programa');

  // Find initial program or default to Experiencia Búsqueda Laboral
  const initialProgram = useMemo(() => {
    if (!authUser) {
      return campusPrograms[0]!;
    }
    if (requestedSlug) {
      const found = campusPrograms.find(
        (p) => p.slug === requestedSlug || p.id === requestedSlug
      );
      if (found) return found;
    }
    return campusPrograms[0]!;
  }, [requestedSlug, authUser]);

  const [currentProgram, setCurrentProgram] = useState<CampusProgram>(initialProgram);

  // Dev Membership Switch Tier: 'paid' | 'free' (strictly 'free' if not logged in, 'paid' by default when logged in)
  const [membershipTier, setMembershipTier] = useState<'paid' | 'free'>(() => {
    if (!authUser) return 'free';
    return 'paid';
  });

  // Dedicated Dev Mode Switch: allows viewing recording scripts & unlocking all lessons
  const [isDevMode, setIsDevMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('campus_is_dev_mode');
      return saved === 'false' ? false : true; // Default true for editing/filming workflow!
    }
    return true;
  });

  const handleToggleDevMode = () => {
    setIsDevMode((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('campus_is_dev_mode', String(next));
      }
      return next;
    });
  };

  // Catalog Explorer Modal state
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);

  // Locked feature popup modal state
  const [lockedModalFeature, setLockedModalFeature] = useState<string | null>(null);

  // Completed lessons set (strictly empty for unauthenticated visitors)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  // Synchronized Favorites across Tablero and Navbar Herramientas dropdown
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('campus_ebl_favorites');
        if (saved) {
          return new Set(JSON.parse(saved));
        }
      } catch {
        // ignore
      }
    }
    return new Set(['tool-recursos', 'tool-tracker']);
  });

  const handleToggleFavorite = (id: string) => {
    if (membershipTier === 'free') return;
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem('campus_ebl_favorites', JSON.stringify(Array.from(next)));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Load from DB on mount / when authUser changes
  useEffect(() => {
    if (!authUser) {
      // Guest / Non-logged in visitor: Strictly Free mode, zero progress, and only EBL
      setCurrentProgram(campusPrograms[0]!);
      setMembershipTier('free');
      setCompletedLessons(new Set());
      return;
    }

    // Authenticated user: load from DB (default to paid / VIP)
    async function loadDbData() {
      try {
        const res = await getCampusInitialDataAction(authUser!.email);
        if (res.success && res.data) {
          setCompletedLessons(new Set(res.data.completedLessonIds));
          if (res.data.user.membershipTier === 'free') {
            setMembershipTier('free');
          } else {
            setMembershipTier('paid');
          }
        } else {
          setMembershipTier('paid');
        }
      } catch (e) {
        console.error('Error cargando datos del campus desde DB:', e);
        setMembershipTier('paid');
      }
    }
    loadDbData();
  }, [authUser]);

  const handleToggleMembership = async () => {
    const nextTier = membershipTier === 'paid' ? 'free' : 'paid';
    setMembershipTier(nextTier);
    try {
      localStorage.setItem(DEV_MEMBERSHIP_KEY, nextTier);
      if (authUser) {
        await updateUserMembershipTierAction(activeEmail, nextTier);
      }
    } catch {
      // ignore
    }
  };

  // All flat lessons of current program
  const allLessons = useMemo(() => {
    return currentProgram.modules.flatMap((m) => m.lessons);
  }, [currentProgram]);

  // Required flat lessons of current program (excluding optional Module 7: Casos Especiales)
  const requiredLessons = useMemo(() => {
    return currentProgram.modules
      .filter((m) => m.number !== 7)
      .flatMap((m) => m.lessons);
  }, [currentProgram]);

  // Strictly synchronized completed required lessons count for CURRENT program
  const completedProgramLessonsCount = useMemo(() => {
    return requiredLessons.filter((l) => completedLessons.has(l.id)).length;
  }, [requiredLessons, completedLessons]);

  const [selectedLesson, setSelectedLesson] = useState<CampusLesson>(() => {
    const initialCompleted = ['exp-cv-01', 'exp-cv-02', 'ccv-01'];
    const uncompleted = initialProgram.modules
      .flatMap((m) => m.lessons)
      .find((l) => !initialCompleted.includes(l.id));
    return uncompleted || initialProgram.modules[0]!.lessons[0]!;
  });

  // Active view: 'dashboard' (default for experience) | 'lesson' (only view for courses) | 'tracker' | 'zoom' | 'agenda' | 'recursos' | 'perfil' | 'evaluaciones'
  const [currentView, setCurrentView] = useState<string>(
    initialProgram.type === 'experiencia' ? 'dashboard' : 'lesson'
  );

  // Synchronize with browser Back/Forward navigation keeping clean URL
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize history state on first render
    if (!window.history.state || !window.history.state.campusView) {
      window.history.replaceState({ campusView: currentView }, '', window.location.pathname);
    }

    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.campusView) {
        setActiveCelebrationModule(null);
        setCurrentView(event.state.campusView);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const defaultView = currentProgram.type === 'experiencia' ? 'dashboard' : 'lesson';
        setActiveCelebrationModule(null);
        setCurrentView(defaultView);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentProgram.type, currentView]);

  // Mobile sidebar open
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Module completion celebration screen state
  const [activeCelebrationModule, setActiveCelebrationModule] = useState<CampusModule | null>(null);

  // Helper to switch view from navbar, cards, or buttons (pushing to browser history)
  const handleNavChangeView = (nextView: string, shouldPushState = true) => {
    if (nextView === currentView) return;
    setActiveCelebrationModule(null);
    if (nextView === 'lesson') {
      // If current selected lesson is already completed, switch directly to the active uncompleted class!
      if (completedLessons.has(selectedLesson.id)) {
        const firstUncompleted = allLessons.find((l) => !completedLessons.has(l.id));
        if (firstUncompleted) setSelectedLesson(firstUncompleted);
      }
    }

    if (shouldPushState && typeof window !== 'undefined') {
      window.history.pushState({ campusView: nextView }, '', window.location.pathname);
    }

    setCurrentView(nextView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When program changes:
  // - Courses switch strictly to 'lesson' (pure Aula Virtual mode)
  // - Experiences allow switching between views
  const handleSelectProgram = (prog: CampusProgram) => {
    setCurrentProgram(prog);
    setActiveCelebrationModule(null);
    const firstUncompleted = prog.modules
      .flatMap((m) => m.lessons)
      .find((l) => !completedLessons.has(l.id));
    const targetLesson = firstUncompleted || prog.modules[0]?.lessons[0];
    if (targetLesson) {
      setSelectedLesson(targetLesson);
    }

    const nextView = prog.type === 'curso' ? 'lesson' : 'dashboard';
    handleNavChangeView(nextView);
  };

  // Helper to find current active lesson for a module
  const getActiveLessonForModuleNumber = (modNum: number) => {
    const mod = currentProgram.modules.find((m) => m.number === modNum);
    if (!mod) return allLessons[0]!;
    // Find the first uncompleted lesson in this module
    const uncompleted = mod.lessons.find((l) => !completedLessons.has(l.id));
    return uncompleted || mod.lessons[0]!;
  };

  // Card click routing from Tablero -> Takes student to the current active class in that module!
  const handleSelectViewFromCard = (targetView: string) => {
    setActiveCelebrationModule(null);
    if (targetView === 'modulo-trabajo-ideal' || targetView === 'modulo-1') {
      setSelectedLesson(getActiveLessonForModuleNumber(1));
      handleNavChangeView('lesson');
    } else if (targetView === 'modulo-fundamentos' || targetView === 'modulo-2') {
      if (membershipTier === 'free') {
        handleNavChangeView('paywall-modulo-2');
      } else {
        setSelectedLesson(getActiveLessonForModuleNumber(2));
        handleNavChangeView('lesson');
      }
    } else if (targetView === 'modulo-cv' || targetView === 'modulo-3') {
      if (membershipTier === 'free') {
        handleNavChangeView('paywall-modulo-3');
      } else {
        setSelectedLesson(getActiveLessonForModuleNumber(3));
        handleNavChangeView('lesson');
      }
    } else if (targetView === 'modulo-linkedin' || targetView === 'modulo-4') {
      if (membershipTier === 'free') {
        handleNavChangeView('paywall-modulo-4');
      } else {
        setSelectedLesson(getActiveLessonForModuleNumber(4));
        handleNavChangeView('lesson');
      }
    } else if (targetView === 'modulo-donde-buscar' || targetView === 'modulo-5') {
      if (membershipTier === 'free') {
        handleNavChangeView('paywall-modulo-5');
      } else {
        setSelectedLesson(getActiveLessonForModuleNumber(5));
        handleNavChangeView('lesson');
      }
    } else if (targetView === 'modulo-postulacion' || targetView === 'modulo-6') {
      if (membershipTier === 'free') {
        handleNavChangeView('paywall-modulo-6');
      } else {
        setSelectedLesson(getActiveLessonForModuleNumber(6));
        handleNavChangeView('lesson');
      }
    } else if (targetView === 'modulo-entrevistas' || targetView === 'modulo-7') {
      if (membershipTier === 'free') {
        handleNavChangeView('paywall-modulo-7');
      } else {
        setSelectedLesson(getActiveLessonForModuleNumber(7));
        handleNavChangeView('lesson');
      }
    } else if (targetView === 'modulo-casos-especiales' || targetView === 'modulo-8') {
      if (membershipTier === 'free') {
        handleNavChangeView('paywall-modulo-8');
      } else {
        setSelectedLesson(getActiveLessonForModuleNumber(8));
        handleNavChangeView('lesson');
      }
    } else if (targetView === 'perfil') {
      if (membershipTier === 'free') {
        handleNavChangeView('paywall-perfil');
      } else {
        handleNavChangeView('perfil');
      }
    } else {
      handleNavChangeView(targetView);
    }
  };

  // Linear lesson unlocking helper for current program
  const isLessonUnlocked = useCallback(
    (lessonId: string, currentCompleted: Set<string>): boolean => {
      const mod = currentProgram.modules.find((m) =>
        m.lessons.some((l) => l.id === lessonId)
      );
      if (!mod) return true;

      if (membershipTier === 'free' && mod.number !== 1) {
        return false;
      }

      const idxInModule = mod.lessons.findIndex((l) => l.id === lessonId);
      if (idxInModule <= 0) return true;

      for (let k = 0; k < idxInModule; k++) {
        if (!currentCompleted.has(mod.lessons[k]!.id)) {
          return false;
        }
      }
      return true;
    },
    [currentProgram, membershipTier]
  );

  // Helper to find the previous available & unlocked lesson (skipping approved tests and locked VIP modules)
  const getPreviousAvailableLesson = useCallback(
    (fromLesson: CampusLesson): CampusLesson | null => {
      const curIdx = allLessons.findIndex((l) => l.id === fromLesson.id);
      if (curIdx <= 0) return null;

      for (let i = curIdx - 1; i >= 0; i--) {
        const candidate = allLessons[i]!;

        // 1. Skip locked modules in Free tier (only Module 1 is free)
        if (membershipTier === 'free' && candidate.moduleNumber !== 1) {
          continue;
        }

        // 2. Skip evaluations that are ALREADY APPROVED
        if (candidate.type === 'evaluacion' && completedLessons.has(candidate.id)) {
          continue;
        }

        // 3. Must be unlocked
        if (isLessonUnlocked(candidate.id, completedLessons)) {
          return candidate;
        }
      }

      return null;
    },
    [allLessons, completedLessons, isLessonUnlocked, membershipTier]
  );

  // Helper to find the next available lesson (skipping approved tests and locked VIP modules)
  const getNextAvailableLesson = useCallback(
    (
      fromLesson: CampusLesson,
      currentCompleted?: Set<string>
    ): CampusLesson | null => {
      const compSet = currentCompleted || completedLessons;
      const curIdx = allLessons.findIndex((l) => l.id === fromLesson.id);
      if (curIdx < 0 || curIdx >= allLessons.length - 1) return null;

      for (let i = curIdx + 1; i < allLessons.length; i++) {
        const candidate = allLessons[i]!;

        // 1. Skip locked modules in Free tier (only Module 1 is free)
        if (membershipTier === 'free' && candidate.moduleNumber !== 1) {
          continue;
        }

        // 2. Skip evaluations that are ALREADY APPROVED
        if (candidate.type === 'evaluacion' && compSet.has(candidate.id)) {
          continue;
        }

        return candidate;
      }

      return null;
    },
    [allLessons, completedLessons, membershipTier]
  );

  // Lesson navigation availability
  const hasPrev = useMemo(() => {
    return getPreviousAvailableLesson(selectedLesson) !== null;
  }, [selectedLesson, getPreviousAvailableLesson]);

  const hasNext = useMemo(() => {
    return getNextAvailableLesson(selectedLesson) !== null;
  }, [selectedLesson, getNextAvailableLesson]);

  const handlePrevLesson = () => {
    setActiveCelebrationModule(null);
    const targetPrev = getPreviousAvailableLesson(selectedLesson);
    if (targetPrev) {
      setSelectedLesson(targetPrev);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Complete current lesson and check if the module is finished!
  const handleCompleteAndNext = async (lessonId: string) => {
    const nextSet = new Set(completedLessons);
    nextSet.add(lessonId);
    setCompletedLessons(nextSet);

    // Persist in DB asynchronously
    try {
      await saveLessonProgressAction(activeEmail, lessonId, true);
    } catch (e) {
      console.warn('Error registrando avance en DB:', e);
    }

    // Find which module this lesson belongs to
    const currentMod = currentProgram.modules.find((m) =>
      m.lessons.some((l) => l.id === lessonId)
    );

    const isLastLessonInMod =
      currentMod &&
      currentMod.lessons[currentMod.lessons.length - 1]?.id === lessonId;

    // Check if ALL lessons of this module were already completed BEFORE this click
    const wasModuleAlreadyCompleted = currentMod
      ? currentMod.lessons.every((l) => completedLessons.has(l.id))
      : false;

    if (isLastLessonInMod && !wasModuleAlreadyCompleted) {
      // STOP and render the celebration screen ONLY on the first time completing the module!
      setActiveCelebrationModule(currentMod);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Find next available lesson (skipping approved tests and locked VIP modules)
      const targetNext = getNextAvailableLesson(selectedLesson, nextSet);
      if (targetNext) {
        setSelectedLesson(targetNext);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // All accessible lessons finished
        setActiveCelebrationModule(currentMod || null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={styles.campusRoot}>
      {/* Dev membership simulation banner if in Free tier */}
      {membershipTier === 'free' && (
        <div className={styles.devFreeBanner}>
          <div className={styles.devFreeBannerInner}>
            <Lock size={14} className={styles.devFreeBannerIcon} />
            <span>
              <strong>[DEV MODE ACTIVO]</strong> Estás previsualizando la experiencia como <strong>Membresía Gratuita (Free)</strong>. Usá el switch arriba a la derecha para volver a la <strong>Membresía Pagada (VIP)</strong>.
            </span>
          </div>
        </div>
      )}

      {/* Global Top Campus Navigation */}
      <CampusHeader
        currentProgram={currentProgram}
        onSelectProgram={handleSelectProgram}
        currentView={currentView}
        setCurrentView={handleNavChangeView}
        completedCount={completedProgramLessonsCount}
        totalLessonsCount={requiredLessons.length}
        membershipTier={membershipTier}
        onToggleMembership={handleToggleMembership}
        onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
        onLockedClick={(featureId) => setLockedModalFeature(featureId)}
        isDevMode={isDevMode}
        onToggleDevMode={handleToggleDevMode}
        favoriteIds={favoriteIds}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Campus Main Workspace */}
      <div className={styles.campusBody}>
        {/* Left Sidebar: in virtual classroom (lesson view) */}
        {currentView === 'lesson' && (
          <CampusSidebar
            currentProgram={currentProgram}
            selectedLesson={selectedLesson}
            onSelectLesson={(lesson) => {
              setActiveCelebrationModule(null);
              if (!isDevMode && membershipTier === 'free' && lesson.moduleNumber !== 1) {
                setLockedModalFeature(`modulo-${lesson.moduleNumber}`);
              } else {
                setSelectedLesson(lesson);
                handleNavChangeView('lesson');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            completedLessons={completedLessons}
            currentView={currentView}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            membershipTier={membershipTier}
            onLockedModuleClick={(featureId) => setLockedModalFeature(featureId)}
            isDevMode={isDevMode}
          />
        )}

        {/* Center Main Content Area */}
        <main className={styles.mainWorkspace}>
          {/* TABLERO (4-COLUMN GRID OF VIVID CARDS) - ONLY FOR EXPERIENCES */}
          {currentView === 'dashboard' && currentProgram.type === 'experiencia' && (
            <EblDashboardGrid
              onSelectView={handleSelectViewFromCard}
              onLockedFeatureClick={(featureId) => setLockedModalFeature(featureId)}
              program={currentProgram}
              completedLessons={completedLessons}
              membershipTier={membershipTier}
              favoriteIds={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {/* STUDENT PROFILE & CAREER TARGETS (VIP ONLY) */}
          {currentView === 'perfil' && currentProgram.type === 'experiencia' && (
            membershipTier === 'free' ? (
              <CampusLockedPaywallView
                viewType="perfil"
                onBackToDashboard={() => handleNavChangeView('dashboard')}
                onUpgrade={handleToggleMembership}
              />
            ) : (
              <EblStudentProfileView
                isDevMode={isDevMode}
                onBackToDashboard={() => handleNavChangeView('dashboard')}
                onNavigateToVocationalTest={() => handleNavChangeView('test-vocacional')}
              />
            )
          )}

          {currentView === 'paywall-perfil' && (
            <CampusLockedPaywallView
              viewType="perfil"
              onBackToDashboard={() => handleNavChangeView('dashboard')}
              onUpgrade={handleToggleMembership}
            />
          )}

          {/* LOCKED PAYWALL FOR ANY VIP MODULE IN FREE TIER */}
          {currentView.startsWith('paywall-modulo-') && (
            <CampusLockedPaywallView
              viewType={currentView.replace('paywall-', '')}
              onBackToDashboard={() => handleNavChangeView('dashboard')}
              onUpgrade={handleToggleMembership}
            />
          )}

          {/* VIRTUAL CLASSROOM & PLAYER VIEW */}
          {currentView === 'lesson' && (
            <div className={styles.lessonViewContainer}>
              {/* BACK TO DASHBOARD BANNER */}
              <div className={styles.playerTopBar}>
                <button
                  type="button"
                  className={styles.backToBoardBtn}
                  onClick={() => handleNavChangeView('dashboard')}
                  title="Volver a la vista del Tablero"
                >
                  <ArrowLeft size={16} />
                  <span>Volver al Tablero Principal</span>
                </button>
              </div>

              {activeCelebrationModule ? (
                <CampusModuleCelebration
                  program={currentProgram}
                  completedModule={activeCelebrationModule}
                  isAllProgramCompleted={currentProgram.modules.every((m) => {
                    if (m.number === 8) return true; // optional module
                    if (membershipTier === 'free' && m.number !== 1) {
                      return true; // only module 1 required in free
                    }
                    return m.lessons.every((l) => completedLessons.has(l.id));
                  })}
                  nextTargetModule={(() => {
                    const pending = currentProgram.modules.filter((m) => {
                      if (m.number === 8) return false; // optional module
                      if (membershipTier === 'free' && m.number !== 1) {
                        return false;
                      }
                      return !m.lessons.every((l) => completedLessons.has(l.id));
                    });
                    return pending.sort((a, b) => a.number - b.number)[0] || null;
                  })()}
                  onContinueToModule={(targetMod) => {
                    const targetLesson =
                      targetMod.lessons.find((l) => !completedLessons.has(l.id)) ||
                      targetMod.lessons[0]!;
                    setActiveCelebrationModule(null);
                    setSelectedLesson(targetLesson);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onBackToDashboard={() => {
                    setActiveCelebrationModule(null);
                    handleNavChangeView('dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onGoToProfile={() => {
                    setActiveCelebrationModule(null);
                    if (membershipTier === 'free') {
                      setLockedModalFeature('perfil');
                    } else {
                      handleNavChangeView('perfil');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  onReviewModule={() => {
                    setActiveCelebrationModule(null);
                    setSelectedLesson(activeCelebrationModule.lessons[0]!);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  membershipTier={membershipTier}
                />
              ) : (
                <CampusPlayer
                  currentProgram={currentProgram}
                  lesson={selectedLesson}
                  isCompleted={completedLessons.has(selectedLesson.id)}
                  onCompleteAndNext={handleCompleteAndNext}
                  onPrevLesson={handlePrevLesson}
                  hasPrev={hasPrev}
                  hasNext={hasNext}
                  completedLessons={completedLessons}
                  membershipTier={membershipTier}
                  isDevMode={isDevMode}
                  onNavigateView={(view) => handleSelectViewFromCard(view)}
                />
              )}
            </div>
          )}

          {/* UNIFIED RESOURCE VAULT - ACCESSIBLE FOR ALL TIERS WITH PER-RESOURCE VIP LOCK */}
          {currentView === 'recursos' && currentProgram.type === 'experiencia' && (
            <CampusResourceVault
              currentProgramId={currentProgram.id}
              membershipTier={membershipTier}
              onLockedClick={(featureId) => setLockedModalFeature(featureId)}
              onBackToDashboard={() => handleNavChangeView('dashboard')}
            />
          )}

          {/* VOCATIONAL TEST VIEW - 100% FREE DIAGNOSTIC TOOL */}
          {currentView === 'test-vocacional' && (
            <EblVocationalTestView
              onBackToDashboard={() => handleNavChangeView('dashboard')}
              onGoToModule={(targetView) => handleSelectViewFromCard(targetView)}
            />
          )}

          {/* TRACKER - LOCKED IN FREE */}
          {currentView === 'tracker' && currentProgram.type === 'experiencia' && (
            membershipTier === 'free' ? (
              <CampusLockedPaywallView
                viewType="tracker"
                onBackToDashboard={() => handleNavChangeView('dashboard')}
                onUpgrade={handleToggleMembership}
              />
            ) : (
              <CampusTracker
                onNavigateToAgenda={() => handleNavChangeView('agenda')}
                onBackToDashboard={() => handleNavChangeView('dashboard')}
              />
            )
          )}

          {/* AGENDA & CALENDARIO - LOCKED IN FREE */}
          {currentView === 'agenda' && currentProgram.type === 'experiencia' && (
            membershipTier === 'free' ? (
              <CampusLockedPaywallView
                viewType="agenda"
                onBackToDashboard={() => handleNavChangeView('dashboard')}
                onUpgrade={handleToggleMembership}
              />
            ) : (
              <CampusZoomAgenda
                onBackToDashboard={() => handleNavChangeView('dashboard')}
                onNavigateToZoom={() => handleNavChangeView('zoom')}
              />
            )
          )}

          {/* CHARLAS SEMANALES ZOOM - LOCKED IN FREE */}
          {currentView === 'zoom' && currentProgram.type === 'experiencia' && (
            membershipTier === 'free' ? (
              <CampusLockedPaywallView
                viewType="zoom"
                onBackToDashboard={() => handleNavChangeView('dashboard')}
                onUpgrade={handleToggleMembership}
              />
            ) : (
              <CampusZoomLiveView
                onBackToDashboard={() => handleNavChangeView('dashboard')}
                onNavigateToAgenda={() => handleNavChangeView('agenda')}
              />
            )
          )}
        </main>
      </div>

      {/* CATALOG EXPLORER MODAL */}
      <CampusCatalogModal
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
        currentProgramId={currentProgram.id}
        onSelectProgram={handleSelectProgram}
        membershipTier={membershipTier}
      />

      {/* LOCKED FEATURE POPUP MODAL */}
      <CampusLockedModal
        isOpen={!!lockedModalFeature}
        onClose={() => setLockedModalFeature(null)}
        viewType={lockedModalFeature || 'generic'}
        onUpgrade={() => {
          if (authUser) {
            handleToggleMembership();
          }
        }}
      />
    </div>
  );
}

export default function CampusPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>Cargando Campus Virtual...</div>}>
      <CampusContent />
    </Suspense>
  );
}
