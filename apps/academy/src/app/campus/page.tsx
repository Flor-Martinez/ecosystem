'use client';

import React, { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Lock } from 'lucide-react';
import { useAuth, SUPERADMIN_EMAILS } from '@/context/AuthContext';
import {
  getCampusInitialDataAction,
  saveLessonProgressAction,
  updateUserMembershipTierAction,
  verifyAndActivateMercadoPagoPaymentAction,
} from '@/actions/campus';
import { campusPrograms, CampusLesson, CampusProgram, CampusModule } from '@/data/campus';
import { CampusHeader } from '@/components/campus/CampusHeader';
import { CampusSidebar } from '@/components/campus/CampusSidebar';
import { CampusPlayer } from '@/components/campus/CampusPlayer';
import { CampusModuleCelebration } from '@/components/campus/CampusModuleCelebration';
import { CampusTracker } from '@/components/campus/CampusTracker';
import { CampusZoomAgenda, CalendarPrefillData } from '@/components/campus/CampusZoomAgenda';
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
  const { user: authUser, isSuperAdmin } = useAuth();
  const activeEmail = authUser?.email || '';

  const searchParams = useSearchParams();
  const requestedSlug = searchParams.get('programa');
  const paymentStatus = searchParams.get('pago');
  const mpStatus = searchParams.get('status') || searchParams.get('collection_status');
  const mpPaymentId = searchParams.get('payment_id') || searchParams.get('collection_id');
  const [paymentActivatedBanner, setPaymentActivatedBanner] = useState(false);

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

  // Membership Tier: 'paid' (VIP Total) | 'trial' (Acceso Prueba Mód. 1-4) | 'free' (Solo Mód. 1)
  const [membershipTier, setMembershipTier] = useState<'paid' | 'trial' | 'free'>(() => {
    if (!authUser) return 'free';
    const isSuper = SUPERADMIN_EMAILS.includes(authUser.email.toLowerCase());
    if (isSuper) {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(DEV_MEMBERSHIP_KEY) || localStorage.getItem('campus_membership_tier');
        if (saved === 'free' || saved === 'trial' || saved === 'paid') return saved;
      }
      return 'paid';
    }
    return 'free';
  });

  const maxUnlockedModule = membershipTier === 'paid' ? 99 : membershipTier === 'trial' ? 4 : 1;

  // Dedicated Dev Mode Switch: allows viewing recording scripts & unlocking all lessons
  const [isDevMode, setIsDevMode] = useState<boolean>(true);

  // Catalog Explorer Modal state
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);

  // Locked feature popup modal state
  const [lockedModalFeature, setLockedModalFeature] = useState<string | null>(null);

  // Completed lessons set (strictly empty for unauthenticated visitors)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  // Synchronized Favorites across Tablero and Navbar Herramientas dropdown (starts completely clean)
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(
    () => new Set()
  );

  // Hydrate user preferences from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedDevMode = localStorage.getItem('campus_is_dev_mode');
      if (savedDevMode !== null) {
        setIsDevMode(savedDevMode !== 'false');
      } else {
        setIsDevMode(true);
      }
      const savedFavs = localStorage.getItem('campus_ebl_favorites_v2');
      if (savedFavs) {
        setFavoriteIds(new Set(JSON.parse(savedFavs)));
      } else {
        // Clear all legacy pre-selected favorites across all accounts
        localStorage.removeItem('campus_ebl_favorites');
        localStorage.setItem('campus_ebl_favorites_v2', JSON.stringify([]));
        setFavoriteIds(new Set());
      }
    } catch {
      // ignore
    }
  }, []);

  // SuperAdmin dev controls & WIP protection
  const effectiveDevMode = Boolean(isSuperAdmin && isDevMode);
  const canAccessWipExtras = effectiveDevMode;

  const handleToggleDevMode = () => {
    if (!isSuperAdmin) return;
    setIsDevMode((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('campus_is_dev_mode', String(next));
      }
      return next;
    });
  };

  const handleToggleFavorite = (id: string) => {
    if (membershipTier !== 'paid') return;
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem('campus_ebl_favorites_v2', JSON.stringify(Array.from(next)));
        localStorage.setItem('campus_ebl_favorites', JSON.stringify(Array.from(next)));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleClearAllFavorites = () => {
    if (membershipTier !== 'paid') return;
    setFavoriteIds(new Set());
    try {
      localStorage.setItem('campus_ebl_favorites_v2', JSON.stringify([]));
      localStorage.setItem('campus_ebl_favorites', JSON.stringify([]));
    } catch {
      // ignore
    }
  };

  // Load from Cache & DB on mount / when authUser changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!authUser) {
      // Guest / Non-logged in visitor: Free mode, preserve watched Module 1 lessons in cache
      setCurrentProgram(campusPrograms[0]!);
      setMembershipTier('free');
      try {
        const guestCache = localStorage.getItem('campus_completed_guest');
        if (guestCache) {
          const parsed = JSON.parse(guestCache);
          if (Array.isArray(parsed)) {
            setCompletedLessons(new Set(parsed));
          }
        } else {
          setCompletedLessons(new Set());
        }
      } catch {
        setCompletedLessons(new Set());
      }
      return;
    }

    // Authenticated user: immediately hydrate from user cache, then sync with server + MP
    const userCleanEmail = authUser.email.toLowerCase().trim();
    const userCacheKey = `campus_completed_${userCleanEmail}`;
    const vipCacheKey = `campus_vip_paid_${userCleanEmail}`;
    const isReturningFromApprovedPayment =
      paymentStatus === 'aprobado' || mpStatus === 'approved';

    try {
      const userCached = localStorage.getItem(userCacheKey);
      let initialList: string[] = [];
      if (userCached) {
        initialList = JSON.parse(userCached) || [];
      }
      // Also merge any guest progress from before logging in (e.g. watched Module 1)
      const guestProgress = localStorage.getItem('campus_completed_guest');
      if (guestProgress) {
        const guestParsed = JSON.parse(guestProgress) || [];
        initialList = Array.from(new Set([...initialList, ...guestParsed]));
        localStorage.removeItem('campus_completed_guest');
        localStorage.setItem(userCacheKey, JSON.stringify(initialList));
      }
      setCompletedLessons(new Set(initialList));

      if (isReturningFromApprovedPayment || localStorage.getItem(vipCacheKey) === 'true') {
        setMembershipTier('paid');
      }
    } catch {
      // ignore
    }

    async function loadDbData() {
      const isSuper = SUPERADMIN_EMAILS.includes(userCleanEmail);
      let verifiedVip = false;

      // 1. If returning from Mercado Pago approval, verify & activate FIRST (no race condition!)
      if (isReturningFromApprovedPayment) {
        setMembershipTier('paid');
        setPaymentActivatedBanner(true);
        try {
          localStorage.setItem(vipCacheKey, 'true');
        } catch {}
        try {
          const mpRes = await verifyAndActivateMercadoPagoPaymentAction(userCleanEmail, mpPaymentId);
          if (mpRes.isVip) {
            verifiedVip = true;
          } else {
            // Even if MP search lags 2s, honor approved return callback & persist
            await updateUserMembershipTierAction(userCleanEmail, 'paid');
            verifiedVip = true;
          }
        } catch {
          verifiedVip = true;
        }
      }

      // 2. Load campus state & progress (also checks live Mercado Pago payments server-side)
      try {
        const res = await getCampusInitialDataAction(authUser!.email);
        if (res.success && res.data) {
          setCompletedLessons((prev) => {
            const merged = new Set([...Array.from(prev), ...(res.data.completedLessonIds || [])]);
            try {
              localStorage.setItem(userCacheKey, JSON.stringify(Array.from(merged)));
            } catch {}
            return merged;
          });

          const tierFromServer = String(res.data.user.membershipTier || '').toLowerCase();
          const hasLocalVipCache = typeof window !== 'undefined' && localStorage.getItem(vipCacheKey) === 'true';

          if (isSuper) {
            const savedDevTier = localStorage.getItem(DEV_MEMBERSHIP_KEY);
            if (savedDevTier === 'free' || savedDevTier === 'trial' || savedDevTier === 'paid') {
              setMembershipTier(savedDevTier);
            } else {
              setMembershipTier(
                tierFromServer === 'free' ? 'free' : tierFromServer === 'trial' ? 'trial' : 'paid'
              );
            }
          } else if (verifiedVip || tierFromServer === 'paid' || tierFromServer === 'vip' || hasLocalVipCache) {
            setMembershipTier('paid');
            try {
              localStorage.setItem(vipCacheKey, 'true');
            } catch {}
          } else if (tierFromServer === 'trial') {
            setMembershipTier('trial');
          } else {
            setMembershipTier('free');
          }
        } else {
          const hasLocalVipCache = typeof window !== 'undefined' && localStorage.getItem(vipCacheKey) === 'true';
          setMembershipTier(isSuper || verifiedVip || hasLocalVipCache ? 'paid' : 'free');
        }
      } catch (e) {
        console.error('Error cargando datos del campus desde DB:', e);
        const hasLocalVipCache = typeof window !== 'undefined' && localStorage.getItem(vipCacheKey) === 'true';
        setMembershipTier(isSuper || verifiedVip || hasLocalVipCache ? 'paid' : 'free');
      }
    }
    loadDbData();
  }, [authUser, paymentStatus, mpStatus, mpPaymentId]);

  const handleToggleMembership = async () => {
    if (!isSuperAdmin) return;
    const nextTier: 'paid' | 'trial' | 'free' =
      membershipTier === 'paid' ? 'trial' : membershipTier === 'trial' ? 'free' : 'paid';
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

  // Required flat lessons of current program (strictly core modules 1-7, excluding optional extra modules)
  const requiredLessons = useMemo(() => {
    return currentProgram.modules
      .filter((m) => !m.isExtra && m.number <= 7)
      .flatMap((m) => m.lessons);
  }, [currentProgram]);

  // Strictly synchronized completed required lessons count for CURRENT program
  const completedProgramLessonsCount = useMemo(() => {
    return requiredLessons.filter((l) => completedLessons.has(l.id)).length;
  }, [requiredLessons, completedLessons]);

  const [selectedLesson, setSelectedLesson] = useState<CampusLesson>(() => {
    return initialProgram.modules[0]!.lessons[0]!;
  });

  // Ensure unprivileged users or devMode-off admins never stay stuck on WIP modules (Extra 02 and 03)
  useEffect(() => {
    if (!canAccessWipExtras && (selectedLesson.moduleNumber === 9 || selectedLesson.moduleNumber === 10)) {
      setSelectedLesson(initialProgram.modules[0]!.lessons[0]!);
    }
  }, [canAccessWipExtras, selectedLesson.moduleNumber, initialProgram]);

  // Active view: 'dashboard' (default for experience) | 'lesson' (only view for courses) | 'tracker' | 'zoom' | 'agenda' | 'recursos' | 'perfil' | 'evaluaciones'
  const [currentView, setCurrentView] = useState<string>(
    initialProgram.type === 'experiencia' ? 'dashboard' : 'lesson'
  );

  // Synchronize with browser Back/Forward navigation keeping clean URL
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize history state on first render (preserve query params like ?pago=aprobado!)
    if (!window.history.state || !window.history.state.campusView) {
      window.history.replaceState(
        { campusView: currentView },
        '',
        window.location.pathname + window.location.search
      );
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

  // Prefill state for Agenda when coming from Tracker
  const [agendaPrefill, setAgendaPrefill] = useState<CalendarPrefillData | null>(null);

  // Helper to switch view from navbar, cards, or buttons (pushing to browser history)
  const handleNavChangeView = (nextView: string, shouldPushState = true) => {
    if (nextView === currentView) return;
    setActiveCelebrationModule(null);
    if (nextView === 'lesson') {
      const accessibleLessons = allLessons.filter((l) => l.moduleNumber <= maxUnlockedModule);
      // Ensure non-VIP users never land on a locked module lesson when clicking "Aula"
      if (selectedLesson.moduleNumber > maxUnlockedModule) {
        const firstAllowed = accessibleLessons.find((l) => !completedLessons.has(l.id)) || accessibleLessons[0];
        if (firstAllowed) setSelectedLesson(firstAllowed);
      } else if (completedLessons.has(selectedLesson.id)) {
        // If current selected lesson is already completed, switch directly to the active uncompleted class!
        const firstUncompleted = accessibleLessons.find((l) => !completedLessons.has(l.id));
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
      if (maxUnlockedModule < 2) {
        handleNavChangeView('paywall-modulo-2');
      } else {
        setSelectedLesson(getActiveLessonForModuleNumber(2));
        handleNavChangeView('lesson');
      }
    } else if (targetView === 'modulo-cv' || targetView === 'modulo-3') {
      if (maxUnlockedModule < 3) {
        handleNavChangeView('paywall-modulo-3');
      } else {
        setSelectedLesson(getActiveLessonForModuleNumber(3));
        handleNavChangeView('lesson');
      }
    } else if (targetView === 'modulo-linkedin' || targetView === 'modulo-4') {
      if (maxUnlockedModule < 4) {
        handleNavChangeView('paywall-modulo-4');
      } else {
        setSelectedLesson(getActiveLessonForModuleNumber(4));
        handleNavChangeView('lesson');
      }
    } else if (targetView === 'modulo-donde-buscar' || targetView === 'modulo-5') {
      if (maxUnlockedModule < 5) {
        handleNavChangeView('paywall-modulo-5');
      } else {
        setSelectedLesson(getActiveLessonForModuleNumber(5));
        handleNavChangeView('lesson');
      }
    } else if (targetView === 'modulo-postulacion' || targetView === 'modulo-6') {
      if (maxUnlockedModule < 6) {
        handleNavChangeView('paywall-modulo-6');
      } else {
        setSelectedLesson(getActiveLessonForModuleNumber(6));
        handleNavChangeView('lesson');
      }
    } else if (targetView === 'modulo-entrevistas' || targetView === 'modulo-7') {
      if (maxUnlockedModule < 7) {
        handleNavChangeView('paywall-modulo-7');
      } else {
        setSelectedLesson(getActiveLessonForModuleNumber(7));
        handleNavChangeView('lesson');
      }
    } else if (targetView === 'modulo-casos-especiales' || targetView === 'modulo-8' || targetView === 'modulo-extra-mineria') {
      if (membershipTier !== 'paid') {
        handleNavChangeView('paywall-modulo-8');
      } else {
        setSelectedLesson(getActiveLessonForModuleNumber(8));
        handleNavChangeView('lesson');
      }
    } else if (targetView === 'modulo-extra-remoto' || targetView === 'modulo-9') {
      if (!canAccessWipExtras) {
        return;
      }
      if (membershipTier !== 'paid') {
        handleNavChangeView('paywall-modulo-8');
      } else {
        setSelectedLesson(getActiveLessonForModuleNumber(9));
        handleNavChangeView('lesson');
      }
    } else if (targetView === 'modulo-extra-primer-empleo' || targetView === 'modulo-10') {
      if (!canAccessWipExtras) {
        return;
      }
      if (membershipTier !== 'paid') {
        handleNavChangeView('paywall-modulo-8');
      } else {
        setSelectedLesson(getActiveLessonForModuleNumber(10));
        handleNavChangeView('lesson');
      }
    } else if (targetView === 'perfil') {
      if (membershipTier !== 'paid') {
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
      // Superadmin in effective dev mode has full access
      if (effectiveDevMode) return true;

      const mod = currentProgram.modules.find((m) =>
        m.lessons.some((l) => l.id === lessonId)
      );
      if (!mod) return true;

      // Module 1 is free for everyone; Trial (Acceso Prueba) unlocks Modules 1-4
      if (mod.number <= maxUnlockedModule) {
        return true;
      }

      // Modules beyond maxUnlockedModule require VIP membership (paid tier)
      if (membershipTier !== 'paid' || !authUser) {
        return false;
      }

      return true;
    },
    [authUser, effectiveDevMode, currentProgram, membershipTier, maxUnlockedModule]
  );

  // Helper to find the previous available & unlocked lesson (skipping approved tests and locked VIP modules)
  const getPreviousAvailableLesson = useCallback(
    (fromLesson: CampusLesson): CampusLesson | null => {
      const curIdx = allLessons.findIndex((l) => l.id === fromLesson.id);
      if (curIdx <= 0) return null;

      for (let i = curIdx - 1; i >= 0; i--) {
        const candidate = allLessons[i]!;

        // 1. Skip locked modules beyond allowed range
        if (candidate.moduleNumber > maxUnlockedModule) {
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
    [allLessons, completedLessons, isLessonUnlocked, maxUnlockedModule]
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

        // 1. Skip locked modules beyond allowed range
        if (candidate.moduleNumber > maxUnlockedModule) {
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
    [allLessons, completedLessons, maxUnlockedModule]
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

    // Save to user localStorage cache immediately
    if (typeof window !== 'undefined') {
      const cacheKey = authUser?.email
        ? `campus_completed_${authUser.email.toLowerCase().trim()}`
        : 'campus_completed_guest';
      try {
        localStorage.setItem(cacheKey, JSON.stringify(Array.from(nextSet)));
      } catch {}
    }

    // Persist in DB / Store asynchronously per user
    try {
      await saveLessonProgressAction(activeEmail || 'guest', lessonId, true);
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
      {/* Payment Approved Confirmation Banner */}
      {paymentActivatedBanner && (
        <div
          style={{
            background: 'linear-gradient(90deg, #059669 0%, #10B981 100%)',
            color: '#FFFFFF',
            padding: '0.75rem 1.25rem',
            textAlign: 'center',
            fontWeight: 700,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
          }}
        >
          <span>🎉 ¡Pago aprobado con éxito! Tu Membresía VIP (Pase Anual) ya está 100% desbloqueada.</span>
          <button
            type="button"
            onClick={() => setPaymentActivatedBanner(false)}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: '#FFFFFF',
              borderRadius: '6px',
              padding: '0.2rem 0.5rem',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Dev membership simulation banner if in Free/Trial tier and Dev mode */}
      {membershipTier !== 'paid' && effectiveDevMode && (
        <div className={styles.devFreeBanner}>
          <div className={styles.devFreeBannerInner}>
            <Lock size={14} className={styles.devFreeBannerIcon} />
            <span>
              <strong>[DEV MODE ACTIVO]</strong> Estás previsualizando la experiencia como{' '}
              <strong>{membershipTier === 'trial' ? 'Acceso Prueba (Módulos 1 al 4)' : 'Membresía Gratuita (Free)'}</strong>. Usá el switch arriba a la derecha para cambiar de vista.
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
        onToggleMembership={isSuperAdmin ? handleToggleMembership : undefined}
        onOpenCatalogModal={() => setIsCatalogModalOpen(true)}
        onLockedClick={(featureId) => setLockedModalFeature(featureId)}
        isDevMode={effectiveDevMode}
        onToggleDevMode={isSuperAdmin ? handleToggleDevMode : undefined}
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
              if (!effectiveDevMode && lesson.moduleNumber > maxUnlockedModule) {
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
            isDevMode={effectiveDevMode}
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
              onClearAllFavorites={handleClearAllFavorites}
              isDevMode={effectiveDevMode}
            />
          )}

          {/* STUDENT PROFILE & CAREER TARGETS (VIP ONLY) */}
          {currentView === 'perfil' && currentProgram.type === 'experiencia' && (
            membershipTier !== 'paid' ? (
              <CampusLockedPaywallView
                viewType="perfil"
                onBackToDashboard={() => handleNavChangeView('dashboard')}
                onUpgrade={isSuperAdmin ? handleToggleMembership : undefined}
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
              onUpgrade={isSuperAdmin ? handleToggleMembership : undefined}
            />
          )}

          {/* LOCKED PAYWALL FOR ANY VIP MODULE IN FREE TIER */}
          {currentView.startsWith('paywall-modulo-') && (
            <CampusLockedPaywallView
              viewType={currentView.replace('paywall-', '')}
              onBackToDashboard={() => handleNavChangeView('dashboard')}
              onUpgrade={isSuperAdmin ? handleToggleMembership : undefined}
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
                  isAllProgramCompleted={
                    membershipTier !== 'paid'
                      ? false
                      : currentProgram.modules.every((m) => {
                          if (m.isExtra || m.number > 7) return true; // optional extra modules
                          return m.lessons.every((l) => completedLessons.has(l.id));
                        })
                  }
                  nextTargetModule={(() => {
                    if (membershipTier === 'free') {
                      return null;
                    }
                    const pending = currentProgram.modules.filter((m) => {
                      if (m.isExtra || m.number > 7) return false; // optional extra modules
                      if (m.number > maxUnlockedModule) return false;
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
                    if (membershipTier !== 'paid') {
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

          {/* TRACKER - LOCKED IN FREE/TRIAL */}
          {currentView === 'tracker' && currentProgram.type === 'experiencia' && (
            membershipTier !== 'paid' ? (
              <CampusLockedPaywallView
                viewType="tracker"
                onBackToDashboard={() => handleNavChangeView('dashboard')}
                onUpgrade={isSuperAdmin ? handleToggleMembership : undefined}
              />
            ) : (
              <CampusTracker
                onNavigateToAgenda={(prefill) => {
                  if (prefill) setAgendaPrefill(prefill);
                  handleNavChangeView('agenda');
                }}
                onBackToDashboard={() => handleNavChangeView('dashboard')}
              />
            )
          )}

          {/* AGENDA & CALENDARIO - LOCKED IN FREE/TRIAL */}
          {currentView === 'agenda' && currentProgram.type === 'experiencia' && (
            membershipTier !== 'paid' ? (
              <CampusLockedPaywallView
                viewType="agenda"
                onBackToDashboard={() => handleNavChangeView('dashboard')}
                onUpgrade={isSuperAdmin ? handleToggleMembership : undefined}
              />
            ) : (
              <CampusZoomAgenda
                onBackToDashboard={() => handleNavChangeView('dashboard')}
                onNavigateToZoom={() => handleNavChangeView('zoom')}
                prefillData={agendaPrefill}
                onClearPrefill={() => setAgendaPrefill(null)}
              />
            )
          )}

          {/* CHARLAS SEMANALES ZOOM - LOCKED IN FREE/TRIAL */}
          {currentView === 'zoom' && currentProgram.type === 'experiencia' && (
            membershipTier !== 'paid' ? (
              <CampusLockedPaywallView
                viewType="zoom"
                onBackToDashboard={() => handleNavChangeView('dashboard')}
                onUpgrade={isSuperAdmin ? handleToggleMembership : undefined}
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
        onUpgrade={isSuperAdmin ? handleToggleMembership : undefined}
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
