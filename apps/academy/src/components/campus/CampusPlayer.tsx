'use client';

import React, { useState } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  CheckCircle2,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Eye,
  Award,
  MessageSquare,
  Send,
  RotateCcw,
  Check,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { submitQuizEvaluationAction } from '@/actions/campus';
import { CampusLesson, CampusProgram } from '@/data/campus';
import { getInAppDocumentByIdOrSlug, InAppDocument } from '@/data/inAppDocuments';
import { InAppDocumentModal } from '@/components/campus/InAppDocumentModal';
import styles from './CampusPlayer.module.css';

interface CampusPlayerProps {
  currentProgram: CampusProgram;
  lesson: CampusLesson;
  isCompleted: boolean;
  onCompleteAndNext: (lessonId: string) => void;
  onPrevLesson: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  completedLessons?: Set<string>;
  membershipTier?: 'paid' | 'free';
  isDevMode?: boolean;
}

export function CampusPlayer({
  currentProgram,
  lesson,
  isCompleted,
  onCompleteAndNext,
  onPrevLesson,
  hasPrev,
  hasNext,
  completedLessons,
  membershipTier = 'paid',
  isDevMode = true,
}: CampusPlayerProps) {
  const { user } = useAuth();
  const activeEmail = user?.email || 'santiago.morales@ejemplo.com';

  // Video state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<'1x' | '1.25x' | '1.5x'>('1x');
  const [progress, setProgress] = useState(35); // simulated 35% watched

  // Zoom accordion dropdown state
  const [isZoomAccordionOpen, setIsZoomAccordionOpen] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [questionSent, setQuestionSent] = useState(false);

  // In-App Document Viewer state
  const [selectedDoc, setSelectedDoc] = useState<InAppDocument | null>(null);

  const handleOpenDoc = (resourceTitle: string) => {
    let slug = 'checklist-optimizacion-cv-ats';
    const lower = resourceTitle.toLowerCase();
    if (lower.includes('plantilla') || lower.includes('cv')) {
      slug = 'plantilla-estructura-cv-editorial';
    } else if (lower.includes('linkedin')) {
      slug = 'guia-optimizacion-linkedin-2025';
    } else if (lower.includes('portal') || lower.includes('remoto')) {
      slug = 'directorio-portales-empleo-remoto';
    } else if (lower.includes('sueldo') || lower.includes('negociacion')) {
      slug = 'matriz-sueldos-negociacion';
    } else if (lower.includes('star') || lower.includes('entrevista')) {
      slug = 'framework-star-entrevistas';
    }
    const doc = getInAppDocumentByIdOrSlug(slug);
    setSelectedDoc(doc);
  };

  // Quiz state (for evaluation lessons)
  const isEvaluationLesson = lesson.type === 'evaluacion';
  const currentModule = currentProgram.modules.find(
    (m) => m.number === lesson.moduleNumber
  ) || currentProgram.modules[0]!;

  const isModuleStarted = completedLessons
    ? currentModule.lessons.some((l) => completedLessons.has(l.id))
    : false;

  const quiz = lesson.quiz || currentModule.quiz;
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const cycleSpeed = () => {
    const speeds: Array<'1x' | '1.25x' | '1.5x'> = ['1x', '1.25x', '1.5x'];
    const idx = speeds.indexOf(playbackSpeed);
    const nextIdx = (idx + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx] || '1x');
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    setQuestionSent(true);
    setTimeout(() => {
      setQuestionSent(false);
      setQuestionText('');
      setIsZoomAccordionOpen(false);
    }, 3500);
  };

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateQuizScore = () => {
    if (!quiz) return 100;
    let correctCount = 0;
    quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) correctCount++;
    });
    return Math.round((correctCount / quiz.questions.length) * 100);
  };

  const handleSubmitQuiz = async () => {
    setQuizSubmitted(true);
    const score = calculateQuizScore();
    const isPassed = score >= (quiz?.minPassingScore || 75);

    try {
      await submitQuizEvaluationAction(
        activeEmail,
        lesson.moduleNumber,
        lesson.id,
        score,
        isPassed,
        selectedAnswers
      );
    } catch (e) {
      console.warn('Error registrando quiz en DB:', e);
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const isQuizPassed = !isEvaluationLesson || (quizSubmitted && calculateQuizScore() >= (quiz?.minPassingScore || 75));
  const isModuleAlreadyFinished = currentModule.lessons.every((l) => completedLessons?.has(l.id));
  const isLastLessonInModule = currentModule.lessons[currentModule.lessons.length - 1]?.id === lesson.id;

  const renderDevScript = (script: string) => {
    const sections = script.split(/\n(?=\[\d+:\d+)/g);
    return sections.map((sec, secIdx) => {
      const lines = sec.trim().split('\n');
      const headerLine = lines[0]?.startsWith('[') ? lines[0] : null;
      const bodyLines = headerLine ? lines.slice(1) : lines;

      return (
        <div key={secIdx} className={styles.devScriptSectionBlock}>
          {headerLine && (
            <div className={styles.devScriptSectionHeader}>
              <span className={styles.devScriptSectionTimeTag}>{headerLine}</span>
            </div>
          )}
          <div className={styles.devScriptLines}>
            {bodyLines.map((line, lIdx) => {
              const trimmed = line.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith('🗣️')) {
                return (
                  <div key={lIdx} className={styles.scriptVoiceRow}>
                    <span className={styles.emojiCol}>🗣️</span>
                    <p className={styles.scriptVoiceText}>{trimmed.replace(/^🗣️\s*/, '')}</p>
                  </div>
                );
              }
              if (trimmed.startsWith('🏷️')) {
                return (
                  <div key={lIdx} className={styles.scriptTextOverlayRow}>
                    <span className={styles.emojiCol}>🏷️</span>
                    <span className={styles.scriptTextOverlayContent}>{trimmed.replace(/^🏷️\s*/, '')}</span>
                  </div>
                );
              }
              if (trimmed.startsWith('🖼️')) {
                return (
                  <div key={lIdx} className={styles.scriptImageRow}>
                    <span className={styles.emojiCol}>🖼️</span>
                    <span className={styles.scriptImageText}>{trimmed.replace(/^🖼️\s*/, '')}</span>
                  </div>
                );
              }
              if (trimmed.startsWith('📺')) {
                return (
                  <div key={lIdx} className={styles.scriptVideoRow}>
                    <span className={styles.emojiCol}>📺</span>
                    <span className={styles.scriptVideoText}>{trimmed.replace(/^📺\s*/, '')}</span>
                  </div>
                );
              }
              if (trimmed.startsWith('🔊')) {
                return (
                  <div key={lIdx} className={styles.scriptAudioRow}>
                    <span className={styles.emojiCol}>🔊</span>
                    <span className={styles.scriptAudioText}>{trimmed.replace(/^🔊\s*/, '')}</span>
                  </div>
                );
              }
              return (
                <p key={lIdx} className={styles.scriptGeneralText}>
                  {trimmed}
                </p>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.aulaContainer}>
      {/* ========================================================================= */}
      {/* 1. TOP HEADER ABOVE THE VIDEO / LESSON */}
      {/* ========================================================================= */}
      <header className={styles.aulaTopHeader}>
        <div className={styles.headerBreadcrumbRow}>
          <div
            className={`${styles.moduleTag} ${
              isModuleStarted ? styles.moduleTagActive : styles.moduleTagPending
            }`}
          >
            <span className={styles.moduleTagNum}>MÓDULO 0{lesson.moduleNumber}</span>
            <span className={styles.moduleTagTitle}>{lesson.moduleTitle}</span>
          </div>

          <div className={styles.headerRightBadges}>
            <span className={styles.durationPill}>
              {isEvaluationLesson ? '📝 Multiple Choice' : `⏱️ ${lesson.duration}`}
            </span>
            <span className={styles.typePill}>
              {isEvaluationLesson
                ? '🏆 Evaluación Final'
                : lesson.type === 'guia'
                ? '📄 Guía Práctica'
                : '🎬 Video Lección'}
            </span>
          </div>
        </div>

        <div className={styles.headerMainTitleRow}>
          <div className={styles.titleInfo}>
            <span className={styles.lessonSequenceLabel}>
              {isEvaluationLesson
                ? `Paso ${lesson.lessonNumber} de ${currentModule.lessons.length} · Certificación`
                : `Clase ${lesson.lessonNumber} de ${currentModule.lessons.length}`}
            </span>
            <h1 className={styles.lessonMainTitle}>{lesson.title}</h1>
          </div>

          {/* Clean Status Indicator (NOT a clickable toggle) */}
          <div className={styles.statusIndicatorBox}>
            {isCompleted ? (
              <span className={styles.statusBadgeDone}>
                <CheckCircle2 size={15} />
                <span>Clase Completada</span>
              </span>
            ) : (
              <span className={styles.statusBadgeProgress}>
                <PlayCircle size={15} />
                <span>En Curso</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* DEV MODE: GUION DE GRABACIÓN & PRODUCCIÓN (ENCIMA DEL VIDEO) */}
      {/* ========================================================================= */}
      {isDevMode && lesson.videoScript && (
        <div className={styles.devScriptCardAboveVideo}>
          <div className={styles.devScriptHeader}>
            <div className={styles.devScriptHeaderLeft}>
              <div className={styles.devScriptIconBadge}>
                <PlayCircle size={18} />
              </div>
              <div>
                <div className={styles.devTagRow}>
                  <span className={styles.devModeBadge}>🛠️ MODO DEV ACTIVO</span>
                  <span className={styles.devLessonMeta}>Clase 0{lesson.lessonNumber} · {lesson.duration}</span>
                </div>
                <h2 className={styles.devScriptTitle}>Guion de Grabación & Pautas de Edición</h2>
              </div>
            </div>
            <span className={styles.devScriptHint}>Visible solo para producción</span>
          </div>

          <div className={styles.devScriptBody}>
            {renderDevScript(lesson.videoScript)}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MAIN MEDIA / EVALUATION VIEWPORT */}
      {/* ========================================================================= */}
      {isEvaluationLesson && membershipTier === 'free' ? (
        /* EVALUATION LOCKED VIEWPORT IN FREE TIER */
        <div className={styles.quizLockedCard}>
          <div className={styles.quizLockedIcon}>
            <Award size={36} />
          </div>
          <span className={styles.quizLockedTag}>EXCLUSIVO DE LA MEMBRESÍA VIP</span>
          <h2 className={styles.quizLockedTitle}>Los Tests Finales & la Certificación requieren Membresía VIP</h2>
          <p className={styles.quizLockedDesc}>
            Para realizar las evaluaciones prácticas de acreditación, recibir feedback pedagógico y descargar el Certificado Oficial de Aprobación de la Experiencia Búsqueda Laboral, necesitás contar con la Membresía VIP activa.
          </p>
          <a href="/experiencia" className={styles.quizLockedBuyBtn}>
            <span>Desbloquear Membresía VIP</span>
          </a>
        </div>
      ) : isEvaluationLesson && quiz ? (
        /* EVALUATION INTERACTIVE VIEWPORT */
        <div className={styles.quizMainCard}>
          <div className={styles.quizHeaderBanner}>
            <div className={styles.quizHeaderIcon}>
              <Award size={28} />
            </div>
            <div>
              <span className={styles.quizHeaderTag}>
                MÓDULO 0{quiz.moduleNumber} · EVALUACIÓN FINAL
              </span>
              <h2 className={styles.quizHeaderTitle}>{quiz.title}</h2>
              <p className={styles.quizHeaderDesc}>{quiz.description}</p>
            </div>
          </div>

          <div className={styles.questionsContainer}>
            {quiz.questions.map((q, qIndex) => {
              const selected = selectedAnswers[q.id];
              const isAnswered = selected !== undefined;
              const isCorrect = isAnswered && selected === q.correctIndex;

              return (
                <div key={q.id} className={styles.questionCard}>
                  <div className={styles.questionHead}>
                    <span className={styles.questionNumberBadge}>
                      Pregunta {qIndex + 1} de {quiz.questions.length}
                    </span>
                    <h3 className={styles.questionText}>{q.question}</h3>
                  </div>

                  <div className={styles.optionsList}>
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selected === optIdx;
                      const isOptionCorrect = q.correctIndex === optIdx;

                      let optionClass = styles.optionItem;
                      if (isOptionSelected) optionClass += ` ${styles.optionSelected}`;

                      if (quizSubmitted) {
                        if (isOptionCorrect) {
                          optionClass = `${styles.optionItem} ${styles.optionCorrect}`;
                        } else if (isOptionSelected) {
                          optionClass = `${styles.optionItem} ${styles.optionWrong}`;
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={quizSubmitted}
                          className={optionClass}
                          onClick={() => handleSelectQuizOption(q.id, optIdx)}
                        >
                          <div className={styles.optionLetterBadge}>
                            {String.fromCharCode(65 + optIdx)}
                          </div>
                          <span className={styles.optionText}>{opt}</span>
                          {quizSubmitted && isOptionCorrect && (
                            <Check size={16} className={styles.correctIcon} />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation shown after submit */}
                  {quizSubmitted && (
                    <div
                      className={`${styles.explanationBox} ${
                        isCorrect ? styles.expSuccess : styles.expWarning
                      }`}
                    >
                      <strong>
                        {isCorrect ? '✓ ¡Respuesta Correcta!' : '✕ Respuesta Incorrecta:'}
                      </strong>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quiz Action Row */}
          <div className={styles.quizFooterRow}>
            {!quizSubmitted ? (
              <button
                type="button"
                disabled={Object.keys(selectedAnswers).length < quiz.questions.length}
                className={styles.submitQuizBtn}
                onClick={handleSubmitQuiz}
              >
                <CheckCircle2 size={16} />
                <span>Finalizar y Calificar Evaluación</span>
              </button>
            ) : (
              <div className={styles.quizResultSummary}>
                <div className={styles.scorePill}>
                  <span>Tu Calificación: </span>
                  <strong>{calculateQuizScore()}%</strong>
                </div>
                {calculateQuizScore() >= quiz.minPassingScore ? (
                  <span className={styles.passBadge}>
                    🎉 ¡Evaluación Aprobada con éxito ({calculateQuizScore()}%)!
                  </span>
                ) : (
                  <span className={styles.failBadge}>
                    Necesitás 75% para certificar el módulo.
                  </span>
                )}
                <button
                  type="button"
                  className={styles.retryQuizBtn}
                  onClick={handleResetQuiz}
                >
                  <RotateCcw size={14} />
                  <span>Reintentar Evaluación</span>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* STANDARD VIDEO PLAYER SCREEN */
        <div className={styles.videoViewport}>
          <div className={styles.screenContent}>
            <div className={styles.watermark}>ACADEMIA FLOR MARTINEZ · AULA VIRTUAL</div>

            <div className={styles.lessonCoverCenter}>
              <div
                className={`${styles.screenBadge} ${
                  isModuleStarted ? styles.screenBadgeActive : styles.screenBadgePending
                }`}
              >
                MÓDULO 0{lesson.moduleNumber} · CLASE 0{lesson.lessonNumber}
              </div>
              <h2 className={styles.screenLessonTitle}>{lesson.title}</h2>
              <p className={styles.screenLessonDesc}>{lesson.description}</p>

              <button
                type="button"
                className={styles.bigPlayBtn}
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pausar clase' : 'Reproducir clase'}
              >
                {isPlaying ? (
                  <Pause size={30} />
                ) : (
                  <Play size={30} className={styles.playIconOffset} />
                )}
              </button>
            </div>

            {/* Video bottom control bar */}
            <div className={styles.controlsBar}>
              <div
                className={styles.scrubberBg}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newPct = Math.round((clickX / rect.width) * 100);
                  setProgress(Math.max(0, Math.min(100, newPct)));
                }}
              >
                <div className={styles.scrubberFill} style={{ width: `${progress}%` }} />
              </div>

              <div className={styles.controlsRow}>
                <div className={styles.controlsLeft}>
                  <button
                    type="button"
                    className={styles.ctrlBtn}
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label="Play / Pausa"
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>

                  <button
                    type="button"
                    className={styles.ctrlBtn}
                    onClick={() => setIsMuted(!isMuted)}
                    aria-label="Mute"
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>

                  <span className={styles.timeLabel}>
                    {Math.round((progress / 100) * 18)}:20 / {lesson.duration}
                  </span>
                </div>

                <div className={styles.controlsRight}>
                  <button
                    type="button"
                    className={styles.speedBtn}
                    onClick={cycleSpeed}
                  >
                    {playbackSpeed}
                  </button>

                  <button
                    type="button"
                    className={styles.ctrlBtn}
                    title="Pantalla completa"
                    aria-label="Pantalla completa"
                  >
                    <Maximize size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. STACKED CONTENT UNDER THE VIDEO (NO TABS!) */}
      {/* ========================================================================= */}
      {!isEvaluationLesson && (
        <div className={styles.lessonStackedContent}>
          {/* SECTION A: RESUMEN DE LA LECCIÓN (ESTILO EDITORIAL DIDÁCTICO) */}
          <div className={`${styles.summaryCard} ${styles.protectedSummary}`}>
            <div className={styles.summaryHeaderRow}>
              <div className={styles.summaryIconBox}>
                <BookOpen size={20} />
              </div>
              <div>
                <span className={styles.summaryTag}>SÍNTESIS METODOLÓGICA</span>
                <h2 className={styles.sectionHeading}>Resumen & Puntos Clave de la Clase</h2>
              </div>
            </div>

            <div className={styles.summaryMainConceptBox}>
              <p className={styles.lessonFullDesc}>{lesson.description}</p>
            </div>

            <h3 className={styles.takeawaysHeading}>Claves aplicadas de esta lección:</h3>
            <div className={styles.takeawaysGrid}>
              {lesson.takeaways.map((point, idx) => {
                const parts = point.split(':');
                const hasTitle = parts.length > 1;
                const title = hasTitle ? parts[0] : `Punto 0${idx + 1}`;
                const desc = hasTitle ? parts.slice(1).join(':').trim() : point;

                return (
                  <div key={idx} className={styles.takeawayCard}>
                    <div className={styles.takeawayCardHead}>
                      <span className={styles.takeawayPillNumber}>0{idx + 1}</span>
                      <strong className={styles.takeawayCardTitle}>{title}</strong>
                    </div>
                    <p className={styles.takeawayCardDesc}>{desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION B: PLANTILLAS & MATERIALES DE LA CLASE (IN-APP) */}
          {lesson.resources.length > 0 && (
            <div className={styles.resourcesCard}>
              <h2 className={styles.sectionHeading}>Plantillas & Documentos de la Clase</h2>
              <div className={styles.resourcesList}>
                {lesson.resources.map((res) => (
                  <div key={res.id} className={styles.resourceCard}>
                    <div className={styles.resIconBox}>
                      <FileText size={20} />
                    </div>
                    <div className={styles.resInfo}>
                      <strong className={styles.resTitle}>{res.title}</strong>
                      <span className={styles.resMeta}>
                        {res.category} · Visualización In-App Protegida
                      </span>
                    </div>
                    <button
                      type="button"
                      className={styles.resDownloadBtn}
                      onClick={() => handleOpenDoc(res.title)}
                      title="Abrir y visualizar material en la plataforma"
                    >
                      <Eye size={14} />
                      <span>Ver en Pantalla</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION C: DESPLEGABLE DE DUDAS PARA EL ZOOM SEMANAL (SOLO PARA EXPERIENCIAS CON ZOOM) */}
          {currentProgram.hasZoom && (
            <div className={styles.zoomAccordionWrapper}>
              <button
                type="button"
                className={styles.zoomAccordionToggle}
                onClick={() => setIsZoomAccordionOpen(!isZoomAccordionOpen)}
                aria-expanded={isZoomAccordionOpen}
              >
                <div className={styles.zoomToggleLeft}>
                  <div className={styles.zoomIconCircle}>
                    <MessageSquare size={16} />
                  </div>
                  <span className={styles.zoomToggleText}>
                    ¿Tenés alguna duda para ver en el Zoom semanal de alumnos?
                  </span>
                </div>
                <div className={styles.zoomToggleChevron}>
                  {isZoomAccordionOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

              {isZoomAccordionOpen && (
                <div className={styles.zoomAccordionBody}>
                  <div className={styles.zoomNoticeCard}>
                    <strong>🎙️ Sesión de Zoom semanal en vivo todos los miércoles 19:00 hs (Arg)</strong>
                    <p>
                      Dejanos tu consulta puntual sobre esta lección o sobre tu postulación actual. Flor y el equipo la revisarán en vivo con feedback directo.
                    </p>
                  </div>

                  {questionSent ? (
                    <div className={styles.sentSuccessCard}>
                      <CheckCircle2 size={20} className={styles.sentCheckIcon} />
                      <div>
                        <strong>¡Tu consulta fue recibida con éxito!</strong>
                        <span>La sumamos a la orden del día del próximo Zoom semanal.</span>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitQuestion} className={styles.zoomForm}>
                      <label className={styles.zoomLabel}>Escribí tu pregunta para el Zoom semanal:</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Ej. En mi caso tengo una duda sobre cómo presentar los resultados de este proyecto..."
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        className={styles.zoomTextarea}
                      />

                      <div className={styles.zoomFormFooter}>
                        <span className={styles.zoomTip}>
                          💡 Las consultas se responden con ejemplos prácticos en pantalla.
                        </span>
                        <button
                          type="submit"
                          disabled={!questionText.trim()}
                          className={styles.zoomSendBtn}
                        >
                          <Send size={14} />
                          <span>Enviar Consulta</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. BOTTOM LESSON NAVIGATION (COMPLETAR Y AVANZAR) */}
      {/* ========================================================================= */}
      <nav className={styles.bottomLessonNav}>
        <button
          type="button"
          className={styles.navLessonBtn}
          onClick={onPrevLesson}
          disabled={!hasPrev}
        >
          <ChevronLeft size={16} />
          <span>Clase Anterior</span>
        </button>

        <span className={styles.navProgressText}>
          {lesson.lessonNumber} de {currentModule.lessons.length}
        </span>

        <button
          type="button"
          className={`${styles.navLessonBtn} ${styles.navNextBtn}`}
          onClick={() => onCompleteAndNext(lesson.id)}
          disabled={isEvaluationLesson ? !isQuizPassed : (!hasNext && isCompleted && !isLastLessonInModule && !isModuleAlreadyFinished)}
        >
          <span>
            {isEvaluationLesson
              ? !isQuizPassed
                ? '🔒 Aprobá con 75% para finalizar'
                : isModuleAlreadyFinished
                ? 'Siguiente Clase'
                : 'Finalizar Módulo'
              : isLastLessonInModule
              ? isModuleAlreadyFinished
                ? hasNext
                  ? 'Siguiente Clase'
                  : 'Programa Completado'
                : 'Finalizar Módulo'
              : hasNext
              ? 'Siguiente Clase'
              : isModuleAlreadyFinished
              ? 'Siguiente Clase'
              : 'Finalizar Módulo'}
          </span>
          <ChevronRight size={16} />
        </button>
      </nav>

      {/* In-App Protected Document Modal */}
      {selectedDoc && (
        <InAppDocumentModal
          document={selectedDoc}
          isOpen={!!selectedDoc}
          onClose={() => setSelectedDoc(null)}
          studentName={user?.name || 'Alumno Academia'}
        />
      )}
    </div>
  );
}
