'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Circle,
  PlayCircle,
  ChevronDown,
  ChevronRight,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
  Award,
  Lock,
  X,
} from 'lucide-react';
import { CampusLesson, CampusProgram, CampusModule } from '@/data/campus';
import styles from './CampusSidebar.module.css';

interface CampusSidebarProps {
  currentProgram: CampusProgram;
  selectedLesson: CampusLesson;
  onSelectLesson: (lesson: CampusLesson) => void;
  completedLessons: Set<string>;
  currentView: string;
  isOpen: boolean;
  onClose: () => void;
  membershipTier?: 'free' | 'paid';
  onLockedModuleClick?: (featureId: string) => void;
}

export function CampusSidebar({
  currentProgram,
  selectedLesson,
  onSelectLesson,
  completedLessons,
  currentView,
  isOpen,
  onClose,
  membershipTier = 'paid',
  onLockedModuleClick,
}: CampusSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Single active module accordion: can be closed by clicking again
  const [activeModuleId, setActiveModuleId] = useState<string | null>(() => {
    // If selected lesson is in locked module in Free tier, default to module 1
    if (membershipTier === 'free' && (selectedLesson.moduleNumber === 3 || selectedLesson.moduleNumber === 5)) {
      return currentProgram.modules[0]!.id;
    }
    return selectedLesson.moduleId || currentProgram.modules[0]!.id;
  });

  // Synchronize active accordion automatically and smooth-scroll to active module in sidebar
  useEffect(() => {
    if (selectedLesson.moduleId) {
      if (!(membershipTier === 'free' && (selectedLesson.moduleNumber === 3 || selectedLesson.moduleNumber === 5))) {
        setActiveModuleId(selectedLesson.moduleId);
      }
    }

    const timer = setTimeout(() => {
      const activeElem = document.getElementById(`sidebar-mod-${selectedLesson.moduleNumber}`);
      if (activeElem) {
        activeElem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [selectedLesson.moduleId, selectedLesson.id, selectedLesson.moduleNumber, membershipTier]);

  // Flat list of all lessons across the entire curriculum
  const allProgramLessons = currentProgram.modules.flatMap((m) => m.lessons);

  // Required core lessons (excluding optional Module 7: Casos Especiales)
  const requiredProgramLessons = allProgramLessons.filter((l) => l.moduleNumber !== 7);
  const completedRequiredCount = requiredProgramLessons.filter((l) => completedLessons.has(l.id)).length;
  const totalRequiredCount = requiredProgramLessons.length;
  const overallPercent = totalRequiredCount > 0
    ? Math.round((completedRequiredCount / totalRequiredCount) * 100)
    : 0;

  // Per-Module linear unlocking helper:
  const isLessonUnlocked = (lessonId: string): boolean => {
    const mod = currentProgram.modules.find((m) =>
      m.lessons.some((l) => l.id === lessonId)
    );
    if (!mod) return true;
    const idxInModule = mod.lessons.findIndex((l) => l.id === lessonId);
    if (idxInModule <= 0) return true; // First lesson of ANY module is always unlocked!
    for (let k = 0; k < idxInModule; k++) {
      if (!completedLessons.has(mod.lessons[k]!.id)) {
        return false;
      }
    }
    return true;
  };

  // Helper to find the current active lesson for a module
  const getTargetLessonForModule = (mod: CampusModule): CampusLesson => {
    const uncompleted = mod.lessons.find((l) => !completedLessons.has(l.id));
    return uncompleted || mod.lessons[0]!;
  };

  // When clicking a module header: toggle open/closed, and if opening, auto-select its current class
  const handleModuleClick = (mod: CampusModule) => {
    if (membershipTier === 'free' && (mod.number === 3 || mod.number === 5)) {
      if (onLockedModuleClick) {
        onLockedModuleClick(`modulo-${mod.number}`);
      }
      return;
    }

    if (activeModuleId === mod.id) {
      // Toggle closed!
      setActiveModuleId(null);
    } else {
      setActiveModuleId(mod.id);
      const targetLesson = getTargetLessonForModule(mod);
      onSelectLesson(targetLesson);
    }
  };

  // Helper to switch module from rail when collapsed
  const handleSelectModuleFromRail = (mod: CampusModule) => {
    if (membershipTier === 'free' && (mod.number === 3 || mod.number === 5)) {
      if (onLockedModuleClick) {
        onLockedModuleClick(`modulo-${mod.number}`);
      }
      return;
    }
    setActiveModuleId(mod.id);
    const targetLesson = getTargetLessonForModule(mod);
    onSelectLesson(targetLesson);
    setIsCollapsed(false);
  };

  // Search filter across all lessons
  const isSearching = searchQuery.trim() !== '';
  const searchResults: CampusLesson[] = isSearching
    ? allProgramLessons.filter(
        (l) =>
          l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.moduleTitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className={styles.mobileOverlay} onClick={onClose} />}

      <aside
        className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ''} ${isOpen ? styles.sidebarOpen : ''}`}
      >
        {/* Top Control Bar: Search & Collapse Button */}
        <div className={styles.topControlBar}>
          {!isCollapsed && (
            <div className={styles.searchBox}>
              <Search size={14} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Buscar clase o tema..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button
                  type="button"
                  className={styles.clearSearchBtn}
                  onClick={() => setSearchQuery('')}
                  aria-label="Limpiar búsqueda"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          )}

          <button
            type="button"
            className={styles.collapseToggleBtn}
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expandir temario completo' : 'Recoger temario a barra lateral'}
            aria-label="Alternar menú lateral"
          >
            {isCollapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
          </button>
        </div>

        {/* 1. COLLAPSED COMPACT RAIL MODE */}
        {isCollapsed ? (
          <div className={styles.compactRail}>
            <span className={styles.railHeading}>MÓD</span>
            <div className={styles.railModulesList}>
              {currentProgram.modules.map((mod) => {
                const isCurrentMod = selectedLesson.moduleNumber === mod.number;
                const completedInMod = mod.lessons.filter((l) => completedLessons.has(l.id)).length;
                const isAllDone = completedInMod === mod.lessons.length;

                return (
                  <button
                    key={mod.id}
                    type="button"
                    className={`${styles.railModBtn} ${isCurrentMod ? styles.railModBtnActive : ''} ${isAllDone ? styles.railModBtnDone : ''}`}
                    onClick={() => handleSelectModuleFromRail(mod)}
                    title={`Módulo ${mod.number}: ${mod.title} (${completedInMod}/${mod.lessons.length} completadas)`}
                  >
                    <span className={styles.railModNum}>M{mod.number}</span>
                    {isAllDone && (
                      <CheckCircle2 size={11} className={styles.railDoneCheck} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : isSearching ? (
          /* 2. SEARCH MODE: FLAT LIST OF CLASS CARDS (CUADRADITOS) */
          <div className={styles.searchResultsContainer}>
            <div className={styles.searchHeaderRow}>
              <span className={styles.searchCountText}>
                {searchResults.length}{' '}
                {searchResults.length === 1 ? 'clase encontrada' : 'clases encontradas'}
              </span>
              <button
                type="button"
                className={styles.resetSearchLink}
                onClick={() => setSearchQuery('')}
              >
                Ver temario completo
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className={styles.searchCardsList}>
                {searchResults.map((lesson) => {
                  const isCompleted = completedLessons.has(lesson.id);
                  const isCurrent =
                    currentView === 'lesson' && selectedLesson.id === lesson.id;
                  const isUnlocked = isLessonUnlocked(lesson.id);
                  const isEvaluation = lesson.type === 'evaluacion';

                  return (
                    <button
                      key={lesson.id}
                      type="button"
                      disabled={!isUnlocked}
                      className={`${styles.searchResultCard} ${isCurrent ? styles.searchCardCurrent : ''} ${!isUnlocked ? styles.searchCardLocked : ''} ${isEvaluation ? styles.searchCardEval : ''}`}
                      onClick={() => {
                        if (!isUnlocked) {
                          alert(
                            'Tenés que completar las clases anteriores haciendo clic en "Siguiente Clase" para acceder a esta lección.'
                          );
                          return;
                        }
                        setActiveModuleId(lesson.moduleId);
                        onSelectLesson(lesson);
                        if (window.innerWidth < 1024) onClose();
                      }}
                    >
                      <div className={styles.searchCardTop}>
                        <span className={styles.searchModBadge}>
                          MÓDULO 0{lesson.moduleNumber}
                        </span>
                        {isEvaluation ? (
                          <span className={styles.evalPillBadge}>🏆 Test Final</span>
                        ) : isCompleted ? (
                          <span className={styles.donePillBadge}>
                            <CheckCircle2 size={10} />
                            <span>Completada</span>
                          </span>
                        ) : !isUnlocked ? (
                          <span className={styles.lockedPillBadge}>
                            <Lock size={10} />
                            <span>Bloqueada</span>
                          </span>
                        ) : (
                          <span className={styles.unlockedPillBadge}>
                            <span>Disponible</span>
                          </span>
                        )}
                      </div>

                      <strong className={styles.searchCardTitle}>{lesson.title}</strong>
                      <span className={styles.searchCardMeta}>
                        {isEvaluation ? '📝 Evaluación Final · 10 min' : `⏱️ ${lesson.duration}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className={styles.emptySearchBox}>
                <p>No se encontraron clases con &ldquo;{searchQuery}&rdquo;</p>
                <button
                  type="button"
                  className={styles.clearBtnAlt}
                  onClick={() => setSearchQuery('')}
                >
                  Borrar búsqueda
                </button>
              </div>
            )}
          </div>
        ) : (
          /* 3. EXPANDED FULL SYLLABUS ACCORDION (SINGLE OPEN MODULE) */
          <div className={styles.syllabusSection}>
            {/* Top Motivational Program Progress Card */}
            <div className={styles.overallProgressCard}>
              <div className={styles.overallProgressTop}>
                <span className={styles.overallProgressTitle}>Progreso del Curso</span>
                <strong className={styles.overallProgressPercent}>
                  {overallPercent}%
                </strong>
              </div>
              <div className={styles.overallProgressBarBg}>
                <div
                  className={styles.overallProgressBarFill}
                  style={{
                    width: `${overallPercent}%`,
                  }}
                />
              </div>
              <div className={styles.overallProgressMeta}>
                <span>
                  {completedRequiredCount} de {totalRequiredCount} clases obligatorias
                </span>
                {completedRequiredCount === totalRequiredCount && totalRequiredCount > 0 ? (
                  <span className={styles.overallStatusDone}>¡Curso Completado!</span>
                ) : (
                  <span className={styles.overallStatusActive}>En progreso</span>
                )}
              </div>
            </div>

            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>
                MÓDULOS DE FORMACIÓN ({currentProgram.modules.length})
              </span>
            </div>

            <div className={styles.modulesList}>
              {currentProgram.modules.map((mod) => {
                const isOpenAccordion = activeModuleId === mod.id;
                const isCurrentMod = selectedLesson.moduleNumber === mod.number;
                const completedInMod = mod.lessons.filter((l) => completedLessons.has(l.id)).length;
                const isAllCompleted = completedInMod === mod.lessons.length && mod.lessons.length > 0;
                const isInProgress = completedInMod > 0 && !isAllCompleted;
                const modPercent = Math.round(
                  (completedInMod / Math.max(1, mod.lessons.length)) * 100
                );

                const isModuleLockedInFree = membershipTier === 'free' && (mod.number === 3 || mod.number === 5);

                return (
                  <div
                    key={mod.id}
                    id={`sidebar-mod-${mod.number}`}
                    className={`${styles.moduleItem} ${isModuleLockedInFree ? styles.moduleItemLocked : isAllCompleted ? styles.moduleItemDone : isInProgress ? styles.moduleItemInProgress : styles.moduleItemPending} ${isOpenAccordion ? styles.moduleItemOpen : ''} ${isCurrentMod ? styles.moduleItemActive : ''}`}
                  >
                    {/* Module Header Button: Opens this module and closes all others */}
                    <button
                      type="button"
                      className={`${styles.moduleHeaderBtn} ${isAllCompleted ? styles.moduleHeaderBtnDone : isInProgress ? styles.moduleHeaderBtnInProgress : styles.moduleHeaderBtnPending} ${isOpenAccordion ? styles.moduleHeaderBtnActive : ''}`}
                      onClick={() => handleModuleClick(mod)}
                      aria-expanded={isOpenAccordion}
                    >
                      <div className={styles.modHeaderLeft}>
                        <div className={styles.modPillRow}>
                          <span
                            className={`${styles.modBadge} ${
                              isAllCompleted
                                ? styles.modBadgeDone
                                : isInProgress || isOpenAccordion
                                ? styles.modBadgeActive
                                : styles.modBadgePending
                            }`}
                          >
                            MÓDULO 0{mod.number}
                          </span>
                          {isModuleLockedInFree ? (
                            <span className={styles.statusPillVipLocked}>
                              <Lock size={10} />
                              <span>Exclusivo VIP</span>
                            </span>
                          ) : isAllCompleted ? (
                            <span className={styles.statusPillDone}>
                              <CheckCircle2 size={11} />
                              <span>Completado</span>
                            </span>
                          ) : isInProgress ? (
                            <span className={styles.statusPillProgress}>
                              <span>En curso</span>
                            </span>
                          ) : (
                            <span
                              className={`${styles.statusPillPending} ${
                                isOpenAccordion ? styles.statusPillPendingOpen : ''
                              }`}
                            >
                              <span>Pendiente</span>
                            </span>
                          )}
                        </div>

                        <h3 className={styles.modName}>{mod.title}</h3>
                        <div className={styles.modProgressRow}>
                          <div className={styles.modMiniBarBg}>
                            <div
                              className={`${styles.modMiniBarFill} ${isAllCompleted ? styles.barFillDone : isInProgress ? styles.barFillProgress : styles.barFillPending}`}
                              style={{ width: `${modPercent}%` }}
                            />
                          </div>
                          <strong
                            className={`${styles.modPercentText} ${isAllCompleted ? styles.textDone : isInProgress ? styles.textProgress : styles.textPending}`}
                          >
                            {modPercent}%
                          </strong>
                          <span className={styles.modMeta}>
                            ({completedInMod}/{mod.lessons.length} clases)
                          </span>
                        </div>
                      </div>

                      <div className={styles.chevronWrap}>
                        {isModuleLockedInFree ? (
                          <Lock size={12} style={{ color: '#D97706' }} />
                        ) : isOpenAccordion ? (
                          <ChevronDown size={13} strokeWidth={2.5} />
                        ) : (
                          <ChevronRight size={13} strokeWidth={2.5} />
                        )}
                      </div>
                    </button>

                    {/* Lessons List under Open Module */}
                    {!isModuleLockedInFree && isOpenAccordion && (
                      <div className={styles.lessonsList}>
                        {mod.lessons.map((lesson) => {
                          const isCompleted = completedLessons.has(lesson.id);
                          const isCurrent =
                            currentView === 'lesson' && selectedLesson.id === lesson.id;
                          const isEvaluation = lesson.type === 'evaluacion';
                          const isUnlocked = isLessonUnlocked(lesson.id);
                          const isEvaluationLocked = membershipTier === 'free' && isEvaluation;

                          return (
                            <div
                              key={lesson.id}
                              className={`${styles.lessonRow} ${isEvaluation ? styles.evaluationRowHighlight : ''} ${isCurrent ? styles.lessonRowCurrent : ''} ${isCompleted ? styles.lessonRowDone : ''} ${!isUnlocked || isEvaluationLocked ? styles.lessonRowLocked : ''}`}
                            >
                              {/* Status Icon */}
                              <div className={styles.statusIconWrap}>
                                {isEvaluationLocked ? (
                                  <Lock size={15} style={{ color: '#D97706' }} />
                                ) : !isUnlocked ? (
                                  <Lock size={15} className={styles.lockIcon} />
                                ) : isCompleted ? (
                                  <CheckCircle2 size={16} className={styles.checkDone} />
                                ) : isEvaluation ? (
                                  <Award size={16} className={styles.evalIcon} />
                                ) : (
                                  <Circle size={16} className={styles.checkEmpty} />
                                )}
                              </div>

                              {/* Lesson Info Clickable */}
                              <button
                                type="button"
                                disabled={!isUnlocked && !isEvaluationLocked}
                                className={styles.lessonSelectBtn}
                                onClick={() => {
                                  if (isEvaluationLocked) {
                                    if (onLockedModuleClick) {
                                      onLockedModuleClick(`evaluacion-mod-${mod.number}`);
                                    }
                                    return;
                                  }
                                  if (!isUnlocked) {
                                    alert(
                                      'Tenés que completar las clases anteriores haciendo clic en "Siguiente Clase" para acceder a esta lección.'
                                    );
                                    return;
                                  }
                                  onSelectLesson(lesson);
                                  if (window.innerWidth < 1024) onClose();
                                }}
                              >
                                <div className={styles.lessonMetaTop}>
                                  <span
                                    className={`${styles.lessonNumber} ${isEvaluation ? styles.evalNumberLabel : ''}`}
                                  >
                                    {isEvaluation
                                      ? '🏆 TEST FINAL DE MÓDULO'
                                      : `Clase ${lesson.lessonNumber}`}
                                  </span>
                                  {isCurrent && (
                                    <span className={styles.playingBadge}>
                                      <PlayCircle size={11} />
                                      <span>En reproducción</span>
                                    </span>
                                  )}
                                  {isEvaluationLocked && (
                                    <span className={styles.evalPillBadgeLocked}>
                                      <Lock size={10} />
                                      <span>Requiere VIP</span>
                                    </span>
                                  )}
                                  {!isEvaluationLocked && !isUnlocked && (
                                    <span className={styles.lockedBadge}>Bloqueada</span>
                                  )}
                                  {isCompleted && !isCurrent && (
                                    <span className={styles.doneBadge}>Completada</span>
                                  )}
                                </div>

                                <strong
                                  className={`${styles.lessonTitle} ${isEvaluation ? styles.evalLessonTitle : ''}`}
                                >
                                  {lesson.title}
                                </strong>
                                <span className={styles.lessonDuration}>
                                  {isEvaluation
                                    ? '📝 Multiple Choice · Mínimo 75% para certificar'
                                    : `⏱️ ${lesson.duration}`}
                                </span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
