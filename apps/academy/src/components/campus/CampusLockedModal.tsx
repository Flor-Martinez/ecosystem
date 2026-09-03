'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  Table,
  FolderDown,
  Calendar,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  X,
  UserCheck,
} from 'lucide-react';
import styles from './CampusLockedModal.module.css';

interface CampusLockedModalProps {
  isOpen: boolean;
  onClose: () => void;
  viewType: 'tracker' | 'recursos' | 'agenda' | 'zoom' | 'modulo-3' | 'modulo-5' | 'perfil' | string;
  onUpgrade?: () => void;
}

export function CampusLockedModal({
  isOpen,
  onClose,
  viewType,
  onUpgrade,
}: CampusLockedModalProps) {
  if (!isOpen) return null;

  const getDetails = () => {
    switch (viewType) {
      case 'perfil':
      case 'tool-perfil':
      case 'mod-perfil':
      case 'expediente':
        return {
          icon: <UserCheck size={32} className={styles.icon} />,
          badge: 'EXPEDIENTE & DATOS DEL ALUMNO VIP',
          title: 'El Expediente del Alumno es exclusivo de la Experiencia Búsqueda Laboral',
          description:
            'Centralizá tus datos profesionales, tu CV guardado, LinkedIn vinculado, pretensiones salariales en USD y certificaciones oficiales emitidas.',
          benefits: [
            'Ficha técnica del estudiante con historial y métricas de empleabilidad.',
            'Carga y almacenamiento seguro de tu CV optimizado para filtros ATS.',
            'Acreditación de habilidades y descarga directa de tus certificados oficiales.',
          ],
        };
      case 'tracker':
      case 'tool-tracker':
        return {
          icon: <Table size={32} className={styles.icon} />,
          badge: 'HERRAMIENTA EXCLUSIVA VIP',
          title: 'El Tracker de Postulaciones es exclusivo de la Experiencia Búsqueda Laboral',
          description:
            'Llevá un control exhaustivo y profesional de tus postulaciones, etapas de entrevista, remuneraciones en USD y links de propuestas.',
          benefits: [
            'Tablero interactivo con filtros por estado (Postulado, Entrevista, Oferta).',
            'Historial de reclutadores, empresas y salarios pretendidos.',
            'Vinculación directa con el calendario de entrevistas semanales.',
          ],
        };
      case 'recursos':
      case 'tool-vault':
        return {
          icon: <FolderDown size={32} className={styles.icon} />,
          badge: 'BÓVEDA DE RECURSOS VIP',
          title: 'La Bóveda de Plantillas & Guías es exclusiva de la Experiencia Búsqueda Laboral',
          description:
            'Accedé a más de 12 plantillas editables en Word, bases de datos de Notion y matrices de cálculo en Excel aprobadas por reclutadores internacionales.',
          benefits: [
            'Plantillas de CV ATS en formato .docx listas para editar.',
            'Bases de datos de Notion para organizar búsquedas y empresas target.',
            'Guías en PDF de negociación salarial y preguntas trampa de entrevistas.',
          ],
        };
      case 'agenda':
      case 'zoom':
      case 'tool-zoom':
        return {
          icon: <Calendar size={32} className={styles.icon} />,
          badge: 'MENTORÍAS & AGENDA VIP',
          title: 'Los Zooms Semanales & la Agenda son exclusivos de la Experiencia Búsqueda Laboral',
          description:
            'Participá todos los miércoles de los Zooms en vivo donde Flor Martínez y su equipo auditan en directo CVs, LinkedIn y preparan tus entrevistas.',
          benefits: [
            'Zooms grupales en vivo todos los miércoles a las 19:00 hs (Arg).',
            'Buzón prioritario de dudas y auditorías en directo de tus perfiles.',
            'Calendario interactivo para agendar y sincronizar tus entrevistas reales.',
          ],
        };
      case 'mod-entrevistas':
      case 'modulo-7':
        return {
          icon: <GraduationCap size={32} className={styles.icon} />,
          badge: 'MÓDULO 07 EXCLUSIVO VIP',
          title: 'Módulo 07: Entrevistas Laborales & Método STAR',
          description:
            'Entrená respuestas a preguntas difíciles, preguntas trampa y estructura tus logros profesionales para destacar en entrevistas individuales y técnicas.',
          benefits: [
            'Simulador práctico con casos reales de selección internacional.',
            'Estructura STAR: Situación, Tarea, Acción y Resultado Cuantificable.',
            'Guía de preguntas para hacerle vos al reclutador al final de la entrevista.',
          ],
        };
      default:
        return {
          icon: <GraduationCap size={32} className={styles.icon} />,
          badge: 'CONTENIDO EXCLUSIVO VIP',
          title: 'Esta función es exclusiva de la Experiencia Búsqueda Laboral',
          description:
            'Desbloqueá el acceso a las clases en video, plantillas paso a paso, simuladores y herramientas de este módulo avanzado.',
          benefits: [
            'Acceso ilimitado a todas las lecciones en video HD y materiales.',
            'Evaluación final de acreditación con feedback pedagógico.',
            'Certificado Oficial de Aprobación al completar el programa.',
          ],
        };
    }
  };

  const details = getDetails();

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          <X size={18} />
        </button>

        {/* Modal Top Header */}
        <div className={styles.modalHeader}>
          <div className={styles.iconBox}>{details.icon}</div>
          <span className={styles.topBadge}>{details.badge}</span>
          <h2 className={styles.modalTitle}>{details.title}</h2>
          <p className={styles.modalDesc}>{details.description}</p>
        </div>

        {/* Benefits list */}
        <div className={styles.benefitsCard}>
          <h3 className={styles.benefitsHeading}>
            <Sparkles size={15} className={styles.sparkleIcon} />
            <span>¿Qué incluye la Experiencia Búsqueda Laboral Completa?</span>
          </h3>
          <ul className={styles.benefitsList}>
            {details.benefits.map((b, i) => (
              <li key={i} className={styles.benefitItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Guarantee Banner */}
        <div className={styles.guaranteeRow}>
          <ShieldCheck size={16} className={styles.shieldIcon} />
          <span>Acceso de por vida · Actualizaciones 2026 · Soporte en Zooms semanales</span>
        </div>

        {/* Actions */}
        <div className={styles.modalActions}>
          <Link
            href="/experiencia"
            className={styles.primaryBuyBtn}
            onClick={() => {
              if (onUpgrade) onUpgrade();
              onClose();
            }}
          >
            <span>Desbloquear Experiencia Búsqueda Laboral (VIP)</span>
            <ArrowRight size={16} />
          </Link>

          <button type="button" className={styles.secondaryBtn} onClick={onClose}>
            Continuar en Modo Gratuito
          </button>
        </div>
      </div>
    </div>
  );
}
