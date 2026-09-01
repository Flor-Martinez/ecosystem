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
} from 'lucide-react';
import { CampusProgram } from '@/data/campus';
import { eblCards } from '@/data/eblDashboard';
import { EblCard } from './EblCard';
import styles from './EblDashboardGrid.module.css';

interface EblDashboardGridProps {
  onSelectView: (view: string) => void;
  onLockedFeatureClick?: (featureId: string) => void;
  program?: CampusProgram;
  completedLessons?: Set<string>;
  membershipTier?: 'free' | 'paid';
  favoriteIds?: Set<string>;
  onToggleFavorite?: (id: string) => void;
}

export function EblDashboardGrid({
  onSelectView,
  onLockedFeatureClick,
  program,
  completedLessons = new Set(),
  membershipTier = 'paid',
  favoriteIds: externalFavoriteIds,
  onToggleFavorite: externalToggleFavorite,
}: EblDashboardGridProps) {
  const [globalSearch, setGlobalSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'todos' | 'modulos' | 'herramientas' | 'favoritos'>('todos');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [internalFavoriteIds, setInternalFavoriteIds] = useState<Set<string>>(() => new Set());

  const favoriteIds = externalFavoriteIds ?? internalFavoriteIds;

  React.useEffect(() => {
    if (membershipTier === 'free') {
      if (!externalFavoriteIds) {
        setInternalFavoriteIds(new Set());
      }
      if (activeFilter === 'favoritos') {
        setActiveFilter('todos');
      }
    }
  }, [membershipTier, activeFilter, externalFavoriteIds]);

  const toggleFavorite = (id: string) => {
    if (membershipTier === 'free') return;
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

  // Helper to check if a card is locked in Free Tier
  const isCardLocked = (card: { id: string; type: string; targetView: string }): boolean => {
    if (membershipTier === 'paid') return false;
    // In Free Tier:
    // Modules: Module 3 ('mod-entrevistas') and Module 5 ('mod-aptitudes') are locked!
    if (card.type === 'modulo') {
      return card.id === 'mod-entrevistas' || card.id === 'mod-aptitudes';
    }
    // Tools available in Free Tier:
    // - Biblioteca de Recursos ('tool-recursos' / 'recursos')
    // - Test Vocacional ('tool-vocacional' / 'test-vocacional')
    if (
      card.id === 'tool-recursos' ||
      card.targetView === 'recursos' ||
      card.id === 'tool-vocacional' ||
      card.targetView === 'test-vocacional'
    ) {
      return false;
    }
    // All other tools (perfil, tracker, zoom, agenda, evaluaciones) are locked in Free Tier!
    return true;
  };

  const handleCardClick = (cardId: string, targetView: string, cardType: string) => {
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

  // Calculate overall program progress from dynamic module cards (excluding optional Module 8)
  const allProgramLessons = program ? program.modules.flatMap((m) => m.lessons) : [];
  const requiredProgramLessons = allProgramLessons.filter((l) => l.moduleNumber !== 8);
  const totalModuleSteps = requiredProgramLessons.length || 30;
  const completedModuleSteps = requiredProgramLessons.length > 0
    ? requiredProgramLessons.filter((l) => completedLessons.has(l.id)).length
    : 0;

  const overallPercent = totalModuleSteps > 0
    ? Math.round((completedModuleSteps / totalModuleSteps) * 100)
    : 0;

  const moduleCards = dynamicCards.filter((c) => c.type === 'modulo');
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
      if (activeFilter === 'modulos') return c.type === 'modulo';
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

  const filteredModules = useMemo(() => {
    return filteredCards.filter((c) => c.type === 'modulo');
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
                membershipTier === 'free'
                  ? styles.memberStatusBadgeFree
                  : styles.memberStatusBadgePaid
              }
            >
              {membershipTier === 'free' ? 'Membresía Gratuita (Free)' : 'Membresía Activa (VIP)'}
            </span>
          </div>

          <h1 className={styles.heroTitle}>Tu Tablero de Búsqueda Laboral</h1>
          <p className={styles.heroDesc}>
            {membershipTier === 'free'
              ? 'Estás en la versión de prueba gratuita. Accedé a los módulos habilitados o pasate a la Membresía VIP para desbloquear todo el ecosistema.'
              : 'Seguí la ruta de los 8 módulos paso a paso y utilizá las herramientas complementarias para gestionar tus entrevistas y mentorías.'}
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
          {membershipTier === 'free' ? (
            <div className={styles.overallProgressCard}>
              <div className={styles.ovTopRow}>
                <span className={styles.ovLabel}>Membresía Free</span>
                <strong className={styles.ovPct} style={{ color: '#FDE68A', fontSize: '1rem' }}>
                  Acceso Parcial
                </strong>
              </div>
              <div className={styles.ovMeta} style={{ marginTop: '0.4rem' }}>
                <span>🔒 Módulos 3, 5 y herramientas requieren Membresía VIP</span>
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
                <span>· 5 Módulos Troncales</span>
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
              <span>Todos ({eblCards.length})</span>
            </button>

            <button
              type="button"
              className={`${styles.tabBtn} ${activeFilter === 'modulos' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveFilter('modulos')}
            >
              <BookOpen size={14} />
              <span>Módulos Troncales ({moduleCards.length})</span>
            </button>

            <button
              type="button"
              className={`${styles.tabBtn} ${activeFilter === 'herramientas' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveFilter('herramientas')}
            >
              <Wrench size={14} />
              <span>Herramientas & Apoyo ({toolCards.length})</span>
            </button>

            {membershipTier !== 'free' && (
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
              onClick={() => setLayoutMode('grid')}
              title="Vista en Tarjetas"
              aria-label="Vista en tarjetas"
            >
              <LayoutGrid size={14} />
              <span>Tarjetas</span>
            </button>
            <button
              type="button"
              className={`${styles.viewToggleBtn} ${layoutMode === 'list' ? styles.viewToggleBtnActive : ''}`}
              onClick={() => setLayoutMode('list')}
              title="Vista en Lista"
              aria-label="Vista en lista"
            >
              <List size={14} />
              <span>Lista</span>
            </button>
          </div>
        </div>

        {membershipTier !== 'free' && (
          <div className={styles.filterHintRow}>
            <span className={styles.hintText}>
              ⭐ Marcá bloques como favoritos para fijarlos arriba.
            </span>
          </div>
        )}
      </div>

      {/* 3. DYNAMIC CONTENT: SECTIONED OR UNIFIED */}
      {showSections ? (
        <div className={styles.sectionsContainer}>
          {/* SECTION 1: COURSE MODULES ROADMAP */}
          <section className={styles.boardSection}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleWrap}>
                <div className={styles.sectionIconBadge}>
                  <GraduationCap size={16} />
                </div>
                <div>
                  <h2 className={styles.sectionHeading}>Ruta de Formación (Módulos 01 al 05)</h2>
                  <p className={styles.sectionSub}>La secuencia troncal del curso para preparar tu búsqueda paso a paso.</p>
                </div>
              </div>
              <span className={styles.sectionCountPill}>{filteredModules.length} Módulos</span>
            </div>

            <div className={layoutMode === 'grid' ? styles.grid : styles.listView}>
              {filteredModules.map((card) => (
                <EblCard
                  key={card.id}
                  card={card}
                  isFavorite={favoriteIds.has(card.id)}
                  onToggleFavorite={toggleFavorite}
                  onCardClick={(view) => handleCardClick(card.id, view, card.type)}
                  isLocked={isCardLocked(card)}
                  hideProgress={membershipTier === 'free'}
                  canFavorite={membershipTier === 'paid'}
                  layoutMode={layoutMode}
                />
              ))}
            </div>
          </section>

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
                  hideProgress={membershipTier === 'free'}
                  canFavorite={membershipTier === 'paid'}
                  layoutMode={layoutMode}
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
              hideProgress={membershipTier === 'free'}
              canFavorite={membershipTier === 'paid'}
              layoutMode={layoutMode}
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
