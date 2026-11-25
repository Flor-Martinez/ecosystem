'use client';

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Star,
  Layers,
  BookOpen,
  Wrench,
  Search,
  X,
  GraduationCap,
  LayoutGrid,
  List,
  Trash2,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { CampusProgram } from '@/data/campus';
import { eblCards, EblDashboardCard } from '@/data/eblDashboard';
import { EblCard } from './EblCard';
import styles from './EblDashboardGrid.module.css';

interface EblDashboardGridProps {
  onSelectView: (view: string) => void;
  onLockedFeatureClick?: (featureId: string) => void;
  program?: CampusProgram;
  completedLessons?: Set<string>;
  membershipTier?: 'free' | 'trial' | 'paid';
  favoriteIds?: Set<string>;
  onToggleFavorite?: (id: string) => void;
  onClearAllFavorites?: () => void;
  isDevMode?: boolean;
}

export function EblDashboardGrid({
  onSelectView,
  onLockedFeatureClick,
  program,
  completedLessons = new Set(),
  membershipTier = 'paid',
  favoriteIds: externalFavoriteIds,
  onToggleFavorite: externalToggleFavorite,
  onClearAllFavorites: externalClearAllFavorites,
  isDevMode = false,
}: EblDashboardGridProps) {
  const { user: authUser, isSuperAdmin, openAuthModal } = useAuth();
  // VIP & Trial access: VIP unlocks all, Trial (Acceso Prueba) unlocks Modules 1-4, Free unlocks Module 1
  const isVipUser = Boolean(authUser && membershipTier === 'paid');
  const isTrialUser = Boolean(authUser && membershipTier === 'trial');
  const maxUnlockedModule = isVipUser ? 99 : isTrialUser ? 4 : 1;
  const canAccessWipExtras = Boolean(isSuperAdmin && isDevMode);

  const isCardWipDisabled = (card: EblDashboardCard): boolean => {
    return Boolean(card.isWip && !canAccessWipExtras);
  };

  const userStorageKey = useMemo(() => {
    if (authUser?.id) return `campus_ebl_layout_mode_${authUser.id}`;
    if (authUser?.email) return `campus_ebl_layout_mode_${authUser.email}`;
    return 'campus_ebl_layout_mode_guest';
  }, [authUser]);

  const [globalSearch, setGlobalSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'todos' | 'troncales' | 'extras' | 'herramientas' | 'favoritos'>('todos');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [internalFavoriteIds, setInternalFavoriteIds] = useState<Set<string>>(() => new Set());

  // Restore user's layout preference on mount or when user changes
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(userStorageKey) || localStorage.getItem('campus_ebl_layout_mode');
      if (saved === 'list' || saved === 'grid') {
        setLayoutMode(saved);
      }
    } catch {
      // ignore
    }
  }, [userStorageKey]);

  const handleLayoutModeChange = (mode: 'grid' | 'list') => {
    setLayoutMode(mode);
    try {
      localStorage.setItem(userStorageKey, mode);
      localStorage.setItem('campus_ebl_layout_mode', mode);
    } catch {
      // ignore
    }
  };

  const favoriteIds = externalFavoriteIds ?? internalFavoriteIds;

  React.useEffect(() => {
    if (membershipTier !== 'paid') {
      if (!externalFavoriteIds) {
        setInternalFavoriteIds(new Set());
      }
      if (activeFilter === 'favoritos') {
        setActiveFilter('todos');
      }
    }
  }, [membershipTier, activeFilter, externalFavoriteIds]);

  const toggleFavorite = (id: string) => {
    if (membershipTier !== 'paid') return;
    if (externalToggleFavorite) {
      externalToggleFavorite(id);
      return;
    }
    const next = new Set(internalFavoriteIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setInternalFavoriteIds(next);
  };

  const handleClearAllFavorites = () => {
    if (membershipTier !== 'paid') return;
    if (externalClearAllFavorites) {
      externalClearAllFavorites();
      return;
    }
    setInternalFavoriteIds(new Set());
    try {
      localStorage.setItem('campus_ebl_favorites', JSON.stringify([]));
    } catch {
      // ignore
    }
  };

  // Helper to resolve module number for module cards
  const getCardModuleNumber = (card: { id: string; targetView: string }): number | null => {
    if (card.id === 'mod-trabajo-ideal' || card.targetView === 'modulo-trabajo-ideal' || card.targetView === 'modulo-1') return 1;
    if (card.id === 'mod-fundamentos' || card.targetView === 'modulo-fundamentos' || card.targetView === 'modulo-2') return 2;
    if (card.id === 'mod-cv' || card.targetView === 'modulo-cv' || card.targetView === 'modulo-3') return 3;
    if (card.id === 'mod-linkedin' || card.targetView === 'modulo-linkedin' || card.targetView === 'modulo-4') return 4;
    if (card.id === 'mod-donde-buscar' || card.targetView === 'modulo-donde-buscar' || card.targetView === 'modulo-5') return 5;
    if (card.id === 'mod-postulacion' || card.targetView === 'modulo-postulacion' || card.targetView === 'modulo-6') return 6;
    if (card.id === 'mod-entrevistas' || card.targetView === 'modulo-entrevistas' || card.targetView === 'modulo-7') return 7;
    if (card.id === 'mod-casos-especiales' || card.targetView === 'modulo-casos-especiales' || card.targetView === 'modulo-8' || card.targetView === 'modulo-extra-mineria') return 8;
    return null;
  };

  // Helper to check if a card is locked
  const isCardLocked = (card: { id: string; type: string; targetView: string }): boolean => {
    const modNum = getCardModuleNumber(card);
    if (modNum !== null && modNum <= maxUnlockedModule) {
      return false;
    }
    // Tools available to everyone
    if (
      card.id === 'tool-recursos' ||
      card.targetView === 'recursos' ||
      card.id === 'tool-vocacional' ||
      card.targetView === 'test-vocacional'
    ) {
      return false;
    }
    // VIP users have full access to everything
    if (isVipUser) return false;

    // All other modules and paid tools (perfil, tracker, agenda) are locked
    return true;
  };

  const handleCardClick = (cardId: string, targetView: string, cardType: string) => {
    const targetCard = dynamicCards.find((c) => c.id === cardId);
    if (targetCard && isCardWipDisabled(targetCard)) {
      return;
    }
    // Unlocked modules (M1 for free/guest, M1-M4 for Acceso Prueba) & public tools open directly
    const modNum = getCardModuleNumber({ id: cardId, targetView });
    if (
      (modNum !== null && modNum <= maxUnlockedModule) ||
      cardId === 'tool-vocacional' ||
      targetView === 'test-vocacional' ||
      cardId === 'tool-recursos' ||
      targetView === 'recursos'
    ) {
      onSelectView(targetView);
      return;
    }
    // If locked, trigger the locked feature callback (shows paywall modal)
    if (isCardLocked({ id: cardId, type: cardType, targetView })) {
      if (onLockedFeatureClick) {
        onLockedFeatureClick(cardId);
      } else {
        onSelectView('locked-' + cardId);
      }
      return;
    }
    onSelectView(targetView);
  };

  // Map dynamic progress from program modules
  const dynamicCards = useMemo(() => {
    return eblCards.map((card) => {
      if (card.type !== 'modulo' || !program) return card;

      let modNumber = card.number || 1;
      if (card.id === 'mod-trabajo-ideal') modNumber = 1;
      else if (card.id === 'mod-fundamentos') modNumber = 2;
      else if (card.id === 'mod-cv') modNumber = 3;
      else if (card.id === 'mod-linkedin') modNumber = 4;
      else if (card.id === 'mod-donde-buscar') modNumber = 5;
      else if (card.id === 'mod-postulacion') modNumber = 6;
      else if (card.id === 'mod-entrevistas') modNumber = 7;
      else if (card.id === 'mod-casos-especiales') modNumber = 8;

      const mod = program.modules.find((m) => m.number === modNumber);
      if (!mod) return card;

      const completedInMod = mod.lessons.filter((l) => completedLessons.has(l.id)).length;
      const totalInMod = mod.lessons.length;
      const pct = Math.round((completedInMod / Math.max(1, totalInMod)) * 100);

      let dynamicBadge = 'Pendiente';
      if (completedInMod === totalInMod && totalInMod > 0) {
        dynamicBadge = 'Completado';
      } else if (completedInMod > 0) {
        dynamicBadge = 'En curso';
      }

      return {
        ...card,
        completedSteps: completedInMod,
        totalSteps: totalInMod,
        progressPercent: pct,
        badge: dynamicBadge,
      };
    });
  }, [program, completedLessons]);

  // Calculate overall program progress from dynamic module cards (strictly the 7 troncal modules)
  const allProgramLessons = program ? program.modules.flatMap((m) => m.lessons) : [];
  const requiredProgramLessons = allProgramLessons.filter((l) => !l.isExtra && l.moduleNumber <= 7);
  const totalModuleSteps = requiredProgramLessons.length || 30;
  const completedModuleSteps = requiredProgramLessons.length > 0
    ? requiredProgramLessons.filter((l) => completedLessons.has(l.id)).length
    : 0;

  const overallPercent = totalModuleSteps > 0
    ? Math.round((completedModuleSteps / totalModuleSteps) * 100)
    : 0;

  const troncalCards = dynamicCards.filter((c) => c.type === 'modulo' && !c.isExtra);
  const extraCards = dynamicCards.filter((c) => c.type === 'modulo' && c.isExtra);
  const toolCards = dynamicCards.filter((c) => c.type !== 'modulo');

  // Filter and sort cards
  const filteredCards = useMemo(() => {
    const query = globalSearch.trim().toLowerCase();

    const list = dynamicCards.filter((c) => {
      // 1. Text Search Filter
      if (query !== '') {
        const matchesTitle = c.title.toLowerCase().includes(query);
        const matchesSubtitle = c.subtitle.toLowerCase().includes(query);
        const matchesDesc = c.description.toLowerCase().includes(query);
        const matchesFeature = c.features.some((f) => f.label.toLowerCase().includes(query));
        if (!matchesTitle && !matchesSubtitle && !matchesDesc && !matchesFeature) {
          return false;
        }
      }

      // 2. Tab Filter
      if (activeFilter === 'troncales') return c.type === 'modulo' && !c.isExtra;
      if (activeFilter === 'extras') return c.type === 'modulo' && c.isExtra;
      if (activeFilter === 'herramientas') return c.type !== 'modulo';
      if (activeFilter === 'favoritos') return favoriteIds.has(c.id);
      return true;
    });

    // Sort: Favorites first, regular in middle
    return list.sort((a, b) => {
      const aFav = favoriteIds.has(a.id);
      const bFav = favoriteIds.has(b.id);

      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });
  }, [dynamicCards, globalSearch, activeFilter, favoriteIds]);

  const showSections = activeFilter === 'todos' && globalSearch.trim() === '';

  const filteredFavorites = useMemo(() => {
    if (membershipTier !== 'paid') return [];
    return dynamicCards.filter((c) => favoriteIds.has(c.id));
  }, [dynamicCards, favoriteIds, membershipTier]);

  const filteredTroncalModules = useMemo(() => {
    return filteredCards.filter((c) => c.type === 'modulo' && !c.isExtra);
  }, [filteredCards]);

  const filteredExtraModules = useMemo(() => {
    return filteredCards.filter((c) => c.type === 'modulo' && c.isExtra);
  }, [filteredCards]);

  const filteredTools = useMemo(() => {
    return filteredCards.filter((c) => c.type !== 'modulo');
  }, [filteredCards]);

  return (
    <div className={styles.dashboardWrapper}>
      {/* 1. HERO BANNER */}
      <section className={styles.heroBanner}>
        <div className={styles.heroLeft}>
          <div className={styles.badgeRow}>
            <div className={styles.programBadge}>
              <Sparkles size={13} className={styles.sparkleIcon} />
              <span>EXPERIENCIA BÚSQUEDA LABORAL</span>
            </div>
            <span
              className={
                isVipUser
                  ? styles.memberStatusBadgePaid
                  : styles.memberStatusBadgeFree
              }
              style={
                isTrialUser
                  ? { background: 'rgba(59, 130, 246, 0.2)', color: '#BFDBFE', borderColor: 'rgba(96, 165, 250, 0.45)' }
                  : undefined
              }
            >
              {isVipUser ? 'Membresía Activa (VIP)' : isTrialUser ? 'Acceso Prueba' : 'Membresía Gratuita (Free)'}
            </span>
          </div>

          <h1 className={styles.heroTitle}>Tu Tablero de Búsqueda Laboral</h1>
          <p className={styles.heroDesc}>
            {isTrialUser
              ? 'Tenés habilitado el Acceso Prueba con los Módulos 1 al 4 desbloqueados. Pasate a Membresía VIP para acceder a todo el programa y herramientas.'
              : membershipTier === 'free'
              ? 'Estás en la versión de prueba gratuita. Accedé a los módulos habilitados o pasate a la Membresía VIP para desbloquear todo el ecosistema.'
              : 'Seguí la ruta de los 7 módulos paso a paso y utilizá las herramientas complementarias para gestionar tus entrevistas y mentorías.'}
          </p>

          {/* Global Search Bar */}
          <div className={styles.globalSearchBox}>
            <Search size={16} className={styles.globalSearchIcon} />
            <input
              type="text"
              placeholder="Buscar clases, plantillas ATS, simulador IA, herramientas..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className={styles.globalSearchInput}
            />
            {globalSearch && (
              <button
                type="button"
                className={styles.clearSearchBtn}
                onClick={() => setGlobalSearch('')}
                aria-label="Limpiar búsqueda"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Right: Overall Progress Card */}
        <div className={styles.heroRight}>
          {isTrialUser ? (
            <div className={styles.overallProgressCard}>
              <div className={styles.ovTopRow}>
                <span className={styles.ovLabel}>Acceso Prueba</span>
                <strong className={styles.ovPct} style={{ color: '#93C5FD', fontSize: '1rem' }}>
                  Módulos 1 al 4
                </strong>
              </div>
              <div className={styles.ovMeta} style={{ marginTop: '0.4rem' }}>
                <span>🔓 Módulos 1 al 4 habilitados · Módulos 5 al 7 y Extras requieren VIP</span>
              </div>
            </div>
          ) : membershipTier === 'free' ? (
            <div className={styles.overallProgressCard}>
              <div className={styles.ovTopRow}>
                <span className={styles.ovLabel}>Membresía Free</span>
                <strong className={styles.ovPct} style={{ color: '#FDE68A', fontSize: '1rem' }}>
                  Acceso Parcial
                </strong>
              </div>
              <div className={styles.ovMeta} style={{ marginTop: '0.4rem' }}>
                <span>🔒 Módulos 2 al 7 y herramientas avanzadas requieren Membresía VIP</span>
              </div>
            </div>
          ) : (
            <div className={styles.overallProgressCard}>
              <div className={styles.ovTopRow}>
                <span className={styles.ovLabel}>Progreso del Curso</span>
                <strong className={styles.ovPct}>{overallPercent}%</strong>
              </div>

              <div className={styles.ovBarBg}>
                <div className={styles.ovBarFill} style={{ width: `${overallPercent}%` }} />
              </div>

              <div className={styles.ovMeta}>
                <span>{completedModuleSteps} de {totalModuleSteps} clases completadas</span>
                <span>· 8 Módulos Troncales</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. FILTER TABS & VIEW TOGGLE */}
      <div className={styles.filterSection}>
        <div className={styles.filterBar}>
          <div className={styles.tabsList}>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeFilter === 'todos' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveFilter('todos')}
            >
              <Layers size={14} />
              <span>Todos ({dynamicCards.length})</span>
            </button>

            <button
              type="button"
              className={`${styles.tabBtn} ${activeFilter === 'troncales' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveFilter('troncales')}
            >
              <BookOpen size={14} />
              <span>Módulos Troncales ({troncalCards.length})</span>
            </button>

            <button
              type="button"
              className={`${styles.tabBtn} ${activeFilter === 'extras' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveFilter('extras')}
            >
              <GraduationCap size={14} />
              <span>Módulos Extra ({extraCards.length})</span>
            </button>

            <button
              type="button"
              className={`${styles.tabBtn} ${activeFilter === 'herramientas' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveFilter('herramientas')}
            >
              <Wrench size={14} />
              <span>Herramientas & Apoyo ({toolCards.length})</span>
            </button>

            {membershipTier === 'paid' && (
              <button
                type="button"
                className={`${styles.tabBtn} ${activeFilter === 'favoritos' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveFilter('favoritos')}
              >
                <Star size={14} className={styles.starTabIcon} />
                <span>Favoritos ({favoriteIds.size})</span>
              </button>
            )}
          </div>

          {/* Layout Mode Switcher (Tarjetas vs Lista) - Always anchored to the far right */}
          <div className={styles.viewModeToggle}>
            <button
              type="button"
              className={`${styles.viewToggleBtn} ${layoutMode === 'grid' ? styles.viewToggleBtnActive : ''}`}
              onClick={() => handleLayoutModeChange('grid')}
              title="Vista en Tarjetas"
              aria-label="Vista en tarjetas"
            >
              <LayoutGrid size={14} />
              <span>Tarjetas</span>
            </button>
            <button
              type="button"
              className={`${styles.viewToggleBtn} ${layoutMode === 'list' ? styles.viewToggleBtnActive : ''}`}
              onClick={() => handleLayoutModeChange('list')}
              title="Vista en Lista"
              aria-label="Vista en lista"
            >
              <List size={14} />
              <span>Lista</span>
            </button>
          </div>
        </div>

        {membershipTier === 'paid' && (
          <div className={styles.filterHintRow}>
            <span className={styles.hintText}>
              ⭐ Marcá bloques como favoritos para tenerlos fijados arriba en su sección destacada.
            </span>
          </div>
        )}
      </div>

      {/* 3. DYNAMIC CONTENT: SECTIONED OR UNIFIED */}
      {showSections ? (
        <div className={styles.sectionsContainer}>
          {/* SECTION 0: FAVORITES SECTION (WHEN USER HAS FAVORITES) */}
          {filteredFavorites.length > 0 && membershipTier === 'paid' && (
            <section className={styles.boardSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleWrap}>
                  <div className={styles.sectionIconBadgeFavorites}>
                    <Star size={16} />
                  </div>
                  <div>
                    <h2 className={styles.sectionHeading}>Tus Bloques Favoritos</h2>
                    <p className={styles.sectionSub}>Accesos directos fijados para tener siempre a mano.</p>
                  </div>
                </div>
                <div className={styles.favHeaderActions}>
                  <span className={styles.sectionCountPill}>
                    {filteredFavorites.length} {filteredFavorites.length === 1 ? 'Favorito' : 'Favoritos'}
                  </span>
                  <button
                    type="button"
                    className={styles.clearAllFavsBtn}
                    onClick={handleClearAllFavorites}
                    title="Borrar todos los favoritos"
                    aria-label="Borrar todos los favoritos"
                  >
                    <Trash2 size={13} />
                    <span>Borrar todos</span>
                  </button>
                </div>
              </div>

              <div className={layoutMode === 'grid' ? styles.grid : styles.listView}>
                {filteredFavorites.map((card) => (
                  <EblCard
                    key={`fav-${card.id}`}
                    card={card}
                    isFavorite={true}
                    onToggleFavorite={toggleFavorite}
                    onCardClick={(view) => handleCardClick(card.id, view, card.type)}
                    isLocked={isCardLocked(card)}
                    hideProgress={false}
                    canFavorite={true}
                    layoutMode={layoutMode}
                    isWipDisabled={isCardWipDisabled(card)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* SECTION 1: MÓDULOS TRONCALES */}
          {filteredTroncalModules.length > 0 && (
            <section className={styles.boardSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleWrap}>
                  <div className={styles.sectionIconBadge}>
                    <GraduationCap size={16} />
                  </div>
                  <div>
                    <h2 className={styles.sectionHeading}>Módulos troncales</h2>
                    <p className={styles.sectionSub}>La secuencia principal para preparar tu búsqueda paso a paso.</p>
                  </div>
                </div>
                <span className={styles.sectionCountPill}>{filteredTroncalModules.length} Módulos</span>
              </div>

              <div className={layoutMode === 'grid' ? styles.grid : styles.listView}>
                {filteredTroncalModules.map((card) => (
                  <EblCard
                    key={card.id}
                    card={card}
                    isFavorite={favoriteIds.has(card.id)}
                    onToggleFavorite={toggleFavorite}
                    onCardClick={(view) => handleCardClick(card.id, view, card.type)}
                    isLocked={isCardLocked(card)}
                    hideProgress={isCardLocked(card)}
                    canFavorite={membershipTier === 'paid'}
                    layoutMode={layoutMode}
                    isWipDisabled={isCardWipDisabled(card)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* SECTION 2: MÓDULOS EXTRA */}
          {filteredExtraModules.length > 0 && (
            <section className={styles.boardSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleWrap}>
                  <div className={styles.sectionIconBadgeExtra}>
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h2 className={styles.sectionHeading}>Módulos extra</h2>
                    <p className={styles.sectionSub}>Contenido complementario que podés cursar según tu perfil y objetivo.</p>
                  </div>
                </div>
                <span className={styles.sectionCountPillExtra}>{filteredExtraModules.length} Extras · Opcionales</span>
              </div>

              <div className={layoutMode === 'grid' ? styles.grid : styles.listView}>
                {filteredExtraModules.map((card) => (
                  <EblCard
                    key={card.id}
                    card={card}
                    isFavorite={favoriteIds.has(card.id)}
                    onToggleFavorite={toggleFavorite}
                    onCardClick={(view) => handleCardClick(card.id, view, card.type)}
                    isLocked={isCardLocked(card)}
                    hideProgress={isCardLocked(card)}
                    canFavorite={membershipTier === 'paid'}
                    layoutMode={layoutMode}
                    isWipDisabled={isCardWipDisabled(card)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* SECTION 2: TOOLS & ACCELERATORS */}
          <section className={styles.boardSection}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleWrap}>
                <div className={styles.sectionIconBadgeTools}>
                  <Wrench size={16} />
                </div>
                <div>
                  <h2 className={styles.sectionHeading}>Herramientas de Apoyo & Aceleradores</h2>
                  <p className={styles.sectionSub}>Recursos prácticos, plantillas y espacios de acompañamiento en vivo.</p>
                </div>
              </div>
              <span className={styles.sectionCountPill}>{filteredTools.length} Herramientas</span>
            </div>

            <div className={layoutMode === 'grid' ? styles.grid : styles.listView}>
              {filteredTools.map((card) => (
                <EblCard
                  key={card.id}
                  card={card}
                  isFavorite={favoriteIds.has(card.id)}
                  onToggleFavorite={toggleFavorite}
                  onCardClick={(view) => handleCardClick(card.id, view, card.type)}
                  isLocked={isCardLocked(card)}
                  hideProgress={isCardLocked(card)}
                  canFavorite={membershipTier === 'paid'}
                  layoutMode={layoutMode}
                  isWipDisabled={isCardWipDisabled(card)}
                />
              ))}
            </div>
          </section>
        </div>
      ) : filteredCards.length > 0 ? (
        <div className={layoutMode === 'grid' ? styles.grid : styles.listView}>
          {filteredCards.map((card) => (
            <EblCard
              key={card.id}
              card={card}
              isFavorite={favoriteIds.has(card.id)}
              onToggleFavorite={toggleFavorite}
              onCardClick={(view) => handleCardClick(card.id, view, card.type)}
              isLocked={isCardLocked(card)}
              hideProgress={isCardLocked(card)}
              canFavorite={membershipTier === 'paid'}
              layoutMode={layoutMode}
              isWipDisabled={isCardWipDisabled(card)}
            />
          ))}
        </div>
      ) : (
        <div className={styles.noResultsBox}>
          <Search size={32} className={styles.noResultsIcon} />
          <h3>No se encontraron resultados para &ldquo;{globalSearch}&rdquo;</h3>
          <p>Probá con <em>CV, LinkedIn, STAR, Tracker o Zoom</em>.</p>
          <button
            type="button"
            className={styles.resetSearchBtn}
            onClick={() => {
              setGlobalSearch('');
              setActiveFilter('todos');
            }}
          >
            Ver todos los bloques
          </button>
        </div>
      )}
    </div>
  );
}
