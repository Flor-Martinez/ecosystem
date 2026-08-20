'use client';

import React from 'react';
import {
  ArrowLeft,
  TrendingUp,
} from 'lucide-react';
import styles from './EblEvaluationsView.module.css';

interface EblEvaluationsViewProps {
  onBackToDashboard: () => void;
}

const skillsBreakdown = [
  { skill: 'Compatibilidad de CV ATS', score: 85, color: '#7C3AED', status: 'Excelente' },
  { skill: 'Optimización de Perfil LinkedIn', score: 70, color: '#0284C7', status: 'Bueno' },
  { skill: 'Técnica de Respuesta STAR', score: 60, color: '#059669', status: 'En Progreso' },
  { skill: 'Técnica de Negociación Salarial', score: 40, color: '#D97706', status: 'Pendiente' },
  { skill: 'Networking & Prospección en Frío', score: 55, color: '#EA580C', status: 'En Progreso' },
];

export function EblEvaluationsView({ onBackToDashboard }: EblEvaluationsViewProps) {
  const overallScore = Math.round(
    skillsBreakdown.reduce((acc, s) => acc + s.score, 0) / skillsBreakdown.length
  );

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
          <span className={styles.badge}>DIAGNÓSTICO LABORAL</span>
          <h1 className={styles.title}>Mis Evaluaciones & Competencias</h1>
          <p className={styles.desc}>
            Monitoreá tu nivel de preparación para el mercado laboral en cada una de las 5 competencias clave evaluadas por reclutadores.
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Left Column: Overall Score & Radar Bar */}
        <div className={styles.leftCol}>
          <div className={styles.scoreOverviewCard}>
            <div className={styles.scoreTop}>
              <div className={styles.scoreCircleWrap}>
                <span className={styles.scoreNumber}>{overallScore}</span>
                <span className={styles.scoreMax}>/100</span>
              </div>
              <div className={styles.scoreSummaryText}>
                <strong className={styles.summaryTitle}>Índice de Empleabilidad General</strong>
                <p className={styles.summaryDesc}>
                  Tu perfil tiene una base sólida en estructuración de CV y LinkedIn. Te recomendamos completar las prácticas del <strong>Módulo 03 (Entrevistas STAR)</strong> para subir tu score por encima de 85 puntos.
                </p>
              </div>
            </div>

            <div className={styles.divider} />

            <h3 className={styles.breakdownTitle}>Desglose por Competencia:</h3>
            <div className={styles.skillsList}>
              {skillsBreakdown.map((item, idx) => (
                <div key={idx} className={styles.skillItem}>
                  <div className={styles.skillHeader}>
                    <strong className={styles.skillName}>{item.skill}</strong>
                    <span className={styles.skillScore} style={{ color: item.color }}>
                      {item.score}% · {item.status}
                    </span>
                  </div>
                  <div className={styles.barBg}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${item.score}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recommendations */}
        <div className={styles.rightCol}>
          <div className={styles.recommendationsCard}>
            <h3 className={styles.recCardTitle}>
              <TrendingUp size={18} className={styles.recIcon} />
              <span>Plan de Acción Recomendado</span>
            </h3>

            <div className={styles.actionSteps}>
              <div className={styles.stepItem}>
                <div className={styles.stepNum}>1</div>
                <div>
                  <strong>Cargar historias STAR en la matriz Excel</strong>
                  <p>Completá al menos 3 situaciones reales de logros antes de tu próxima entrevista técnica.</p>
                </div>
              </div>

              <div className={styles.stepItem}>
                <div className={styles.stepNum}>2</div>
                <div>
                  <strong>Probar el Simulador de Entrevista con IA</strong>
                  <p>Hacé una práctica de 5 preguntas difíciles en el Módulo 3 para entrenar la fluidez verbal.</p>
                </div>
              </div>

              <div className={styles.stepItem}>
                <div className={styles.stepNum}>3</div>
                <div>
                  <strong>Enviar tu CV al Zoom del miércoles</strong>
                  <p>Recibí feedback en vivo de Flor Martinez y el equipo docente para pulir los últimos detalles.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
