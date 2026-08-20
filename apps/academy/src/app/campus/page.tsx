'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
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
import { CampusResourceVault } from '@/components/campus/CampusResourceVault';
import { CampusCatalogModal } from '@/components/campus/CampusCatalogModal';
import { CampusLockedModal } from '@/components/campus/CampusLockedModal';
import { CampusLockedPaywallView } from '@/components/campus/CampusLockedPaywallView';
import { EblDashboardGrid } from '@/components/campus/EblDashboardGrid';
import { EblStudentProfileView } from '@/components/campus/EblStudentProfileView';
import { EblEvaluationsView } from '@/components/campus/EblEvaluationsView';
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

  // Catalog Explorer Modal state
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);

  // Locked feature popup modal state
  const [lockedModalFeature, setLockedModalFeature] = useState<string | null>(null);

  // Completed lessons set (strictly empty for unauthenticated visitors)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

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

  // Strictly synchronized completed lessons count for CURRENT program
  const completedProgramLessonsCount = useMemo(() => {
    return allLessons.filter((l) => completedLessons.has(l.id)).length;
  }, [allLessons, completedLessons]);

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
    if (targetView === 'modulo-fundamentos' || targetView === 'modulo-1') {
      setSelectedLesson(getActiveLessonForModuleNumber(1));
      handleNavChangeView('lesson');
    } else if (targetView === 'modulo-cv' || targetView === 'modulo-2') {
      setSelectedLesson(getActiveLessonForModuleNumber(2));
      handleNavChangeView('lesson');
    } else if (targetView === 'modulo-linkedin' || targetView === 'modulo-3') {
      if (membershipTier === 'free') {
        handleNavChangeView('paywall-modulo-3');
      } else {
        setSelectedLesson(getActiveLessonForModuleNumber(3));
        handleNavChangeView('lesson');
      }
    } else if (targetView === 'modulo-donde-buscar' || targetView === 'modulo-4') {
      setSelectedLesson(getActiveLessonForModuleNumber(4));
      handleNavChangeView('lesson');
    } else if (targetView === 'modulo-postulacion' || targetView === 'modulo-5') {
      if (membershipTier === 'free') {
        handleNavChangeView('paywall-modulo-5');
      } else {
        setSelectedLesson(getActiveLessonForModuleNumber(5));
        handleNavChangeView('lesson');
      }
    } else if (targetView === 'modulo-entrevistas' || targetView === 'modulo-6') {
      setSelectedLesson(getActiveLessonForModuleNumber(6));
      handleNavChangeView('lesson');
    } else if (targetView === 'modulo-casos-especiales' || targetView === 'modulo-7') {
      setSelectedLesson(getActiveLessonForModuleNumber(7));
      handleNavChangeView('lesson');
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

  // Lesson navigation
  const currentIndex = allLessons.findIndex((l) => l.id === selectedLesson.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allLessons.length - 1;

  const handlePrevLesson = () => {
    setActiveCelebrationModule(null);
    if (hasPrev && allLessons[currentIndex - 1]) {
      setSelectedLesson(allLessons[currentIndex - 1]!);
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

    if (isLastLessonInMod) {
      // STOP and render the celebration screen!
      setActiveCelebrationModule(currentMod);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (hasNext && allLessons[currentIndex + 1]) {
      setSelectedLesson(allLessons[currentIndex + 1]!);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
        totalLessonsCount={allLessons.length}
        membershipTier={membershipTier}
        onToggleMembership={handleToggleMembership}
        onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
        onLockedClick={(featureId) => setLockedModalFeature(featureId)}
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
              if (membershipTier === 'free' && (lesson.moduleNumber === 3 || lesson.moduleNumber === 5)) {
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
              <EblStudentProfileView onBackToDashboard={() => handleNavChangeView('dashboard')} />
            )
          )}

          {currentView === 'paywall-perfil' && (
            <CampusLockedPaywallView
              viewType="perfil"
              onBackToDashboard={() => handleNavChangeView('dashboard')}
              onUpgrade={handleToggleMembership}
            />
          )}

          {/* LOCKED PAYWALL FOR MODULES 3 & 5 IN FREE TIER */}
          {currentView === 'paywall-modulo-3' && (
            <CampusLockedPaywallView
              viewType="modulo-3"
              onBackToDashboard={() => handleNavChangeView('dashboard')}
              onUpgrade={handleToggleMembership}
            />
          )}

          {currentView === 'paywall-modulo-5' && (
            <CampusLockedPaywallView
              viewType="modulo-5"
              onBackToDashboard={() => handleNavChangeView('dashboard')}
              onUpgrade={handleToggleMembership}
            />
          )}

          {/* INDIVIDUAL EVALUATION SCREEN */}
          {currentView === 'evaluaciones' && (
            <EblEvaluationsView onBackToDashboard={() => handleNavChangeView('dashboard')} />
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
                    if (membershipTier === 'free' && (m.number === 3 || m.number === 5)) {
                      return true; // considered finished or not required in free
                    }
                    return m.lessons.every((l) => completedLessons.has(l.id));
                  })}
                  nextTargetModule={(() => {
                    const pending = currentProgram.modules.filter((m) => {
                      if (membershipTier === 'free' && (m.number === 3 || m.number === 5)) {
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
              <CampusTracker onNavigateToAgenda={() => handleNavChangeView('agenda')} />
            )
          )}

          {/* ZOOM AGENDA & CALENDAR - LOCKED IN FREE */}
          {(currentView === 'zoom' || currentView === 'agenda') &&
            currentProgram.type === 'experiencia' && (
              membershipTier === 'free' ? (
                <CampusLockedPaywallView
                  viewType="agenda"
                  onBackToDashboard={() => handleNavChangeView('dashboard')}
                  onUpgrade={handleToggleMembership}
                />
              ) : (
                <CampusZoomAgenda />
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
