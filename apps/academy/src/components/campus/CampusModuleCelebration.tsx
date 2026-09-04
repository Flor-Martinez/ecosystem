'use client';

import React from 'react';
import {
  Award,
  ArrowRight,
  LayoutGrid,
  Download,
  UserCheck,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { CampusProgram, CampusModule } from '@/data/campus';
import styles from './CampusModuleCelebration.module.css';

interface CampusModuleCelebrationProps {
  program: CampusProgram;
  completedModule: CampusModule;
  isAllProgramCompleted: boolean;
  nextTargetModule: CampusModule | null;
  onContinueToModule: (mod: CampusModule) => void;
  onBackToDashboard: () => void;
  onGoToProfile: () => void;
  onReviewModule: () => void;
  membershipTier?: 'paid' | 'free';
}

export function CampusModuleCelebration({
  program,
  completedModule,
  isAllProgramCompleted,
  nextTargetModule,
  onContinueToModule,
  onBackToDashboard,
  onGoToProfile,
  onReviewModule,
  membershipTier = 'paid',
}: CampusModuleCelebrationProps) {
  const isExperience = program.type === 'experiencia';

  const handleDownloadCertificate = () => {
    // Generate an instant simulation download of the certificate
    const certText = `CERTIFICADO OFICIAL DE APROBACIÓN\n\nPrograma: ${program.title}\nEstudiante: Alumno Oficial\nFecha de Emisión: ${new Date().toLocaleDateString('es-AR')}\nEmitido por: Academia Flor Martinez\nEstado: Verificado y Aprobado 100%\nCódigo de Credencial: FM-CERT-${Math.floor(100000 + Math.random() * 900000)}`;
    const blob = new Blob([certText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Certificado_${program.slug}_FlorMartinez.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.celebrationRoot}>
      {isAllProgramCompleted ? (
        /* ========================================================================= */
        /* SCREEN A: PROGRAMA 100% COMPLETADO (DESBLOQUEO DE CERTIFICADO) */
        /* ========================================================================= */
        <div className={styles.celebrationCard}>
          <div className={styles.topBadgeTrophy}>
            <div className={styles.trophyIconWrap}>
              <Award size={36} className={styles.trophyIcon} />
            </div>
            <span className={styles.certBadgeText}>🎉 ¡PROGRAMA 100% COMPLETADO!</span>
          </div>

          <h1 className={styles.title}>
            ¡Felicitaciones! Has completado {program.title}
          </h1>

          <p className={styles.subtitle}>
            Has superado con éxito todos los módulos, lecciones prácticas y evaluaciones del programa. Tu dedicación y constancia demuestran un nivel profesional de excelencia.
          </p>

          {/* Certificate Preview Card */}
          <div className={styles.certificatePreviewCard}>
            <div className={styles.certHeaderRow}>
              <div className={styles.certSeal}>
                <Sparkles size={16} />
                <span>CERTIFICACIÓN OFICIAL ACADÉMICA</span>
              </div>
              <span className={styles.certDate}>
                {new Date().toLocaleDateString('es-AR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>

            <div className={styles.certBody}>
              <strong className={styles.certProgramName}>{program.title}</strong>
              <p className={styles.certTagline}>
                Acreditación de competencias técnicas, estratégicas y prácticas superadas con calificación sobresaliente.
              </p>
              <div className={styles.certFooterRow}>
                <span className={styles.certIssuer}>
                  Directora Académica: <strong>Lic. Florencia Martínez</strong>
                </span>
                <span className={styles.certId}>ID: FM-CERT-2026-9482</span>
              </div>
            </div>
          </div>

          {/* Action Buttons for 100% Program Completion */}
          <div className={styles.actionsRow}>
            <button
              type="button"
              className={styles.primaryDownloadBtn}
              onClick={handleDownloadCertificate}
            >
              <Download size={18} />
              <span>Descargar Certificado Oficial</span>
            </button>

            <button
              type="button"
              className={styles.secondaryProfileBtn}
              onClick={onGoToProfile}
            >
              <UserCheck size={18} />
              <span>Ver en Mi Perfil</span>
            </button>

            {isExperience && (
              <button
                type="button"
                className={styles.tertiaryDashBtn}
                onClick={onBackToDashboard}
              >
                <LayoutGrid size={18} />
                <span>Volver al Tablero</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* SCREEN B: MÓDULO INDIVIDUAL COMPLETADO (CONTINUAR AL SIGUIENTE PENDIENTE) */
        /* ========================================================================= */
        <div className={styles.celebrationCard}>
          <div className={styles.topBadgeModule}>
            <CheckCircle2 size={18} className={styles.checkIcon} />
            <span>¡MÓDULO 0{completedModule.number} COMPLETADO CON ÉXITO!</span>
          </div>

          <h1 className={styles.title}>
            Terminaste el Módulo 0{completedModule.number}: {completedModule.title}
          </h1>

          <p className={styles.subtitle}>
            {completedModule.tagline ||
              'Completaste todas las clases teóricas, plantillas de trabajo y la evaluación práctica de este módulo.'}
          </p>

          <div className={styles.moduleStatsBanner}>
            <div className={styles.statItem}>
              <span className={styles.statVal}>{completedModule.lessons.length}</span>
              <span className={styles.statLabel}>Clases aprobadas</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statVal}>{completedModule.totalDuration}</span>
              <span className={styles.statLabel}>Horas completadas</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statVal}>100%</span>
              <span className={styles.statLabel}>Progreso del Módulo 0{completedModule.number}</span>
            </div>
          </div>

          {/* DEDICATED VIP UPSELL BLOCK FOR FREE USERS */}
          {membershipTier === 'free' && (
            <div className={styles.freeUpsellCard}>
              <div className={styles.freeUpsellHeader}>
                <div className={styles.crownIconWrap}>
                  <Sparkles size={22} className={styles.crownIcon} />
                </div>
                <div className={styles.freeUpsellHeaderText}>
                  <span className={styles.freeUpsellBadge}>PASO SIGUIENTE RECOMENDADO</span>
                  <h3 className={styles.freeUpsellTitle}>
                    ¿Te interesó y sirvió lo que viste en este Módulo 01?
                  </h3>
                  <p className={styles.freeUpsellSubtitle}>
                    Tu estrategia de búsqueda laboral recién comienza. Desbloqueá la <strong>Experiencia Búsqueda Laboral Completa (VIP)</strong> para dominar todo el proceso y multiplicar tus entrevistas.
                  </p>
                </div>
              </div>

              <div className={styles.freeUpsellGrid}>
                <div className={styles.freeUpsellItem}>
                  <CheckCircle2 size={16} className={styles.upsellCheckIcon} />
                  <div>
                    <strong>Módulos 02 al 08 Troncales</strong>
                    <span>Armado de CV ATS, LinkedIn optimizado, Simulador STAR de entrevistas y Negociación Salarial.</span>
                  </div>
                </div>

                <div className={styles.freeUpsellItem}>
                  <CheckCircle2 size={16} className={styles.upsellCheckIcon} />
                  <div>
                    <strong>Bóveda de Recursos & Plantillas VIP</strong>
                    <span>Más de 12 plantillas editables en Word (.docx), bases de Notion y matrices de cálculo.</span>
                  </div>
                </div>

                <div className={styles.freeUpsellItem}>
                  <CheckCircle2 size={16} className={styles.upsellCheckIcon} />
                  <div>
                    <strong>Tracker de Postulaciones & Agenda</strong>
                    <span>Herramientas interactivas para gestionar procesos y agendar tus entrevistas reales.</span>
                  </div>
                </div>

                <div className={styles.freeUpsellItem}>
                  <CheckCircle2 size={16} className={styles.upsellCheckIcon} />
                  <div>
                    <strong>Sesiones Semanales en Vivo</strong>
                    <span>Mentorías en directo con Flor Martínez todos los miércoles para auditar tu CV y tus avances.</span>
                  </div>
                </div>
              </div>

              <div className={styles.freeUpsellCtaWrap}>
                <a
                  href="/experiencia"
                  className={styles.vipUnlockBtn}
                >
                  <Sparkles size={18} />
                  <span>Comprar Experiencia Completa (Membresía VIP)</span>
                  <ArrowRight size={18} />
                </a>
                <span className={styles.guaranteeText}>
                  🛡️ Acceso de por vida · Actualizaciones 2026 · Certificado Oficial al finalizar
                </span>
              </div>
            </div>
          )}

          {/* Bottom Secondary Action Buttons */}
          <div className={styles.actionsRow}>
            {nextTargetModule ? (
              <button
                type="button"
                className={styles.primaryNextBtn}
                onClick={() => onContinueToModule(nextTargetModule)}
              >
                <span>
                  {nextTargetModule.number === completedModule.number + 1
                    ? `Avanzar al Módulo 0${nextTargetModule.number}: ${nextTargetModule.title}`
                    : `Continuar con Módulo 0${nextTargetModule.number}: ${nextTargetModule.title}`}
                </span>
                <ArrowRight size={18} />
              </button>
            ) : null}

            {isExperience ? (
              <button
                type="button"
                className={styles.secondaryDashBtn}
                onClick={onBackToDashboard}
              >
                <LayoutGrid size={18} />
                <span>Volver al Tablero</span>
              </button>
            ) : null}

            <button
              type="button"
              className={styles.secondaryDashBtn}
              onClick={onReviewModule}
            >
              <RotateCcw size={16} />
              <span>Repasar Módulo 0{completedModule.number}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
