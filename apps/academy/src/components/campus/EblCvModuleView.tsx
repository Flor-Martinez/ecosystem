'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  PlayCircle,
  Sparkles,
  Wand2,
  Download,
  FileText,
  CheckCircle2,
  AlertCircle,
  Bot,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import { campusPrograms, CampusLesson } from '@/data/campus';
import { CampusPlayer } from './CampusPlayer';
import { CampusTabs } from './CampusTabs';
import styles from './EblCvModuleView.module.css';

interface EblCvModuleViewProps {
  onBackToDashboard: () => void;
  completedLessons: Set<string>;
  onToggleComplete: (lessonId: string) => void;
}

export function EblCvModuleView({
  onBackToDashboard,
  completedLessons,
  onToggleComplete,
}: EblCvModuleViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'videos' | 'ia-feedback' | 'servicio-vip' | 'plantillas'>('videos');

  // Module 1 lessons from EBL
  const eblProgram = campusPrograms[0]!;
  const cvModule = eblProgram.modules[0]!;
  const [selectedLesson, setSelectedLesson] = useState<CampusLesson>(cvModule.lessons[0]!);

  // AI Feedback tool state
  const [cvText, setCvText] = useState('');
  const [targetRole, setTargetRole] = useState('Product Designer / UX Lead');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    score: number;
    strengths: string[];
    improvements: string[];
    missingKeywords: string[];
  } | null>(null);

  // VIP service order state
  const [vipOrdered, setVipOrdered] = useState(false);

  const handleRunAiAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvText.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        score: 82,
        strengths: [
          'Estructura cronológica inversa clara y encabezado profesional sin datos redundantes.',
          'Uso de verbos de acción fuertes en las últimas dos experiencias laborales.',
        ],
        improvements: [
          'Faltan métricas cuantificables de impacto (ej. % de aumento, reducción de tiempos).',
          'La sección de habilidades técnicas no incluye algunas herramientas clave de la industria.',
        ],
        missingKeywords: ['Figma Tokens', 'Design Systems', 'User Research', 'A/B Testing', 'Stakeholder Management'],
      });
    }, 1500);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={onBackToDashboard}
        >
          <ArrowLeft size={16} />
          <span>Volver al Tablero</span>
        </button>

        <div className={styles.headerTitles}>
          <span className={styles.moduleBadge}>MÓDULO 01 · FORMACIÓN & AUDITORÍA</span>
          <h1 className={styles.title}>Creación & Mejora de CV ATS de Alto Impacto</h1>
        </div>
      </div>

      {/* Sub Tabs Bar */}
      <div className={styles.subTabsBar}>
        <button
          type="button"
          className={`${styles.subTab} ${activeSubTab === 'videos' ? styles.subTabActive : ''}`}
          onClick={() => setActiveSubTab('videos')}
        >
          <PlayCircle size={16} />
          <span>Clases en Video ({cvModule.lessons.length})</span>
        </button>

        <button
          type="button"
          className={`${styles.subTab} ${activeSubTab === 'ia-feedback' ? styles.subTabActive : ''}`}
          onClick={() => setActiveSubTab('ia-feedback')}
        >
          <Bot size={16} />
          <span>Feedback con IA de tu CV</span>
          <span className={styles.newBadge}>IA en vivo</span>
        </button>

        <button
          type="button"
          className={`${styles.subTab} ${activeSubTab === 'servicio-vip' ? styles.subTabActive : ''}`}
          onClick={() => setActiveSubTab('servicio-vip')}
        >
          <Wand2 size={16} />
          <span>Hacemos tu CV por vos</span>
          <span className={styles.vipBadge}>Servicio VIP</span>
        </button>

        <button
          type="button"
          className={`${styles.subTab} ${activeSubTab === 'plantillas' ? styles.subTabActive : ''}`}
          onClick={() => setActiveSubTab('plantillas')}
        >
          <Download size={16} />
          <span>Plantillas Word & Notion</span>
        </button>
      </div>

      {/* SUB-VIEW 1: VIDEOS & LESSONS */}
      {activeSubTab === 'videos' && (
        <div className={styles.videosLayout}>
          {/* Lesson Selector Pills */}
          <div className={styles.lessonSelectorBar}>
            <span className={styles.selectorLabel}>Seleccionar lección:</span>
            {cvModule.lessons.map((les) => {
              const isSelected = selectedLesson.id === les.id;
              const isDone = completedLessons.has(les.id);
              return (
                <button
                  key={les.id}
                  type="button"
                  className={`${styles.lessonPill} ${isSelected ? styles.lessonPillActive : ''}`}
                  onClick={() => setSelectedLesson(les)}
                >
                  {isDone ? (
                    <CheckCircle2 size={14} className={styles.doneIcon} />
                  ) : (
                    <PlayCircle size={14} />
                  )}
                  <span>Clase 0{les.lessonNumber}: {les.title}</span>
                </button>
              );
            })}
          </div>

          <CampusPlayer
            currentProgram={eblProgram}
            lesson={selectedLesson}
            isCompleted={completedLessons.has(selectedLesson.id)}
            onCompleteAndNext={(lessonId) => {
              onToggleComplete(lessonId);
              const idx = cvModule.lessons.findIndex((l) => l.id === lessonId);
              if (idx < cvModule.lessons.length - 1) setSelectedLesson(cvModule.lessons[idx + 1]!);
            }}
            onPrevLesson={() => {
              const idx = cvModule.lessons.findIndex((l) => l.id === selectedLesson.id);
              if (idx > 0) setSelectedLesson(cvModule.lessons[idx - 1]!);
            }}
            hasPrev={cvModule.lessons.findIndex((l) => l.id === selectedLesson.id) > 0}
            hasNext={cvModule.lessons.findIndex((l) => l.id === selectedLesson.id) < cvModule.lessons.length - 1}
          />

          <CampusTabs lesson={selectedLesson} />
        </div>
      )}

      {/* SUB-VIEW 2: IA FEEDBACK TESTER */}
      {activeSubTab === 'ia-feedback' && (
        <div className={styles.aiFeedbackSection}>
          <div className={styles.aiIntroBox}>
            <div className={styles.aiIconBox}>
              <Bot size={24} />
            </div>
            <div>
              <h2 className={styles.aiTitle}>Auditoría Inteligente de CV con Algoritmo ATS</h2>
              <p className={styles.aiDesc}>
                Pegá el texto de tu currículum actual o tu resumen profesional. Nuestro motor de IA analizará la compatibilidad con sistemas ATS, palabras clave faltantes y fuerza de los verbos de acción.
              </p>
            </div>
          </div>

          <div className={styles.aiGrid}>
            <form onSubmit={handleRunAiAudit} className={styles.aiForm}>
              <div className={styles.fieldGroup}>
                <label>Puesto o área a la que te postulás:</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="Ej. Product Designer, HR Specialist, Contador..."
                  className={styles.textInput}
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label>Texto completo de tu CV (Perfil, Experiencias, Habilidades):</label>
                <textarea
                  rows={10}
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                  placeholder="Pegá aquí el contenido de tu CV para ser analizado..."
                  className={styles.cvTextarea}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isAnalyzing || !cvText.trim()}
                className={styles.analyzeBtn}
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles size={16} className={styles.spinningIcon} />
                    <span>Analizando compatibilidad ATS...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Auditar CV con IA</span>
                  </>
                )}
              </button>
            </form>

            {/* Results Panel */}
            <div className={styles.aiResultsPanel}>
              {analysisResult ? (
                <div className={styles.resultsContent}>
                  <div className={styles.scoreBox}>
                    <span className={styles.scoreLabel}>Score de Compatibilidad ATS</span>
                    <strong className={styles.scoreNumber}>{analysisResult.score}/100</strong>
                    <span className={styles.scoreBadge}>Nivel: Muy Bueno</span>
                  </div>

                  <div className={styles.feedbackBlock}>
                    <h4 className={styles.feedbackHeading}>
                      <CheckCircle2 size={16} className={styles.strengthIcon} />
                      <span>Fortalezas Detectadas:</span>
                    </h4>
                    <ul className={styles.feedbackList}>
                      {analysisResult.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.feedbackBlock}>
                    <h4 className={styles.feedbackHeading}>
                      <AlertCircle size={16} className={styles.improveIcon} />
                      <span>Oportunidades de Mejora:</span>
                    </h4>
                    <ul className={styles.feedbackList}>
                      {analysisResult.improvements.map((imp, i) => (
                        <li key={i}>{imp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.keywordsBlock}>
                    <span className={styles.keywordsTitle}>Palabras clave recomendadas para {targetRole}:</span>
                    <div className={styles.keywordsPills}>
                      {analysisResult.missingKeywords.map((kw, i) => (
                        <span key={i} className={styles.kwPill}>+ {kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.placeholderResult}>
                  <Bot size={36} className={styles.phBotIcon} />
                  <h3>El informe de tu CV aparecerá aquí</h3>
                  <p>Pegá tu texto a la izquierda y hacé clic en &ldquo;Auditar CV con IA&rdquo; para recibir el desglose de compatibilidad y sugerencias.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: SERVICIO VIP "HACEMOS TU CV POR VOS" */}
      {activeSubTab === 'servicio-vip' && (
        <div className={styles.vipSection}>
          <div className={styles.vipCard}>
            <div className={styles.vipHeader}>
              <div className={styles.vipIconWrap}>
                <Wand2 size={24} />
              </div>
              <div>
                <span className={styles.vipPill}>SERVICIO EXCLUSIVO PARA ALUMNOS</span>
                <h2 className={styles.vipTitle}>Hacemos tu CV Profesional por Vos</h2>
                <p className={styles.vipSubtitle}>
                  Si no tenés tiempo o querés que un redactor experto del equipo de Flor Martinez diseñe y redacte tu CV a medida con garantía de compatibilidad ATS.
                </p>
              </div>
            </div>

            <div className={styles.vipGrid}>
              <div className={styles.vipIncludes}>
                <h3 className={styles.vipIncludeTitle}>¿Qué incluye el servicio?</h3>
                <ul className={styles.vipList}>
                  <li>
                    <CheckCircle2 size={16} className={styles.vipCheck} />
                    <span><strong>Entrevista individual de 30 min</strong> para relevar tus logros y objetivos.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className={styles.vipCheck} />
                    <span><strong>Redacción completa de viñetas de impacto</strong> con verbos de acción y métricas.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className={styles.vipCheck} />
                    <span><strong>Diseño editorial en Word (.docx) y Notion</strong> formateado para filtros ATS.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className={styles.vipCheck} />
                    <span><strong>Ronda de ajustes ilimitada</strong> durante 14 días hasta que estés 100% conforme.</span>
                  </li>
                </ul>
              </div>

              <div className={styles.vipActionBox}>
                <span className={styles.vipPriceLabel}>Precio Especial Alumno</span>
                <div className={styles.vipPriceWrap}>
                  <strong className={styles.vipPrice}>$35.000 ARS</strong>
                  <span className={styles.vipOriginal}>$50.000 ARS</span>
                </div>
                <span className={styles.vipDiscount}>30% OFF por ser alumno de la Academia</span>

                {vipOrdered ? (
                  <div className={styles.vipSuccess}>
                    <CheckCircle2 size={20} />
                    <span>¡Solicitud enviada! Nuestro equipo se contactará por WhatsApp.</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    className={styles.orderVipBtn}
                    onClick={() => setVipOrdered(true)}
                  >
                    <ShoppingBag size={16} />
                    <span>Solicitar Armado de mi CV</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: PLANTILLAS DESCARGABLES */}
      {activeSubTab === 'plantillas' && (
        <div className={styles.templatesSection}>
          <div className={styles.templatesHeader}>
            <h3>Plantillas Oficiales del Módulo 01</h3>
            <p>Descargá los modelos editables testeados con algoritmos de selección.</p>
          </div>

          <div className={styles.templatesGrid}>
            <div className={styles.templateCard}>
              <FileText size={32} className={styles.docIcon} />
              <h4>Plantilla CV ATS Editorial (Word .docx)</h4>
              <p>Formato a 1 columna sin tablas complejas, con jerarquía tipográfica estándar para lectores ópticos.</p>
              <button
                type="button"
                className={styles.downloadTplBtn}
                onClick={() => alert('Descargando Plantilla Word ATS...')}
              >
                <Download size={15} />
                <span>Descargar Word (.docx)</span>
              </button>
            </div>

            <div className={styles.templateCard}>
              <FileText size={32} className={styles.notionIcon} />
              <h4>Plantilla CV Modular en Notion</h4>
              <p>Base de datos duplicable para gestionar múltiples variantes de tu experiencia y exportar a PDF limpio.</p>
              <button
                type="button"
                className={styles.downloadTplBtn}
                onClick={() => alert('Abriendo plantilla de Notion para duplicar...')}
              >
                <ExternalLink size={15} />
                <span>Duplicar en Notion</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
