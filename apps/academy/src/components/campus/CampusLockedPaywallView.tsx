'use client';

import React from 'react';
import {
  Lock,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Table,
  FolderDown,
  Calendar,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import styles from './CampusLockedPaywallView.module.css';

interface CampusLockedPaywallViewProps {
  viewType: 'tracker' | 'recursos' | 'agenda' | 'zoom' | 'modulo-3' | 'modulo-5' | 'perfil' | string;
  onBackToDashboard: () => void;
  onUpgrade?: () => void;
}

export function CampusLockedPaywallView({
  viewType,
  onBackToDashboard,
  onUpgrade,
}: CampusLockedPaywallViewProps) {
  const getPaywallDetails = () => {
    switch (viewType) {
      case 'perfil':
      case 'tool-perfil':
      case 'mod-perfil':
      case 'expediente':
        return {
          icon: <UserCheck size={38} className={styles.heroIcon} />,
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
        return {
          icon: <Table size={38} className={styles.heroIcon} />,
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
        return {
          icon: <FolderDown size={38} className={styles.heroIcon} />,
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
        return {
          icon: <Calendar size={38} className={styles.heroIcon} />,
          badge: 'MENTORÍAS & AGENDA VIP',
          title: 'Los Zooms Semanales & la Agenda son exclusivos de la Experiencia Búsqueda Laboral',
          description:
            'Participá todos los miércoles de los Zooms en vivo donde Flor Martínez y su equipo auditan en vivo CVs, LinkedIn y preparan tus entrevistas.',
          benefits: [
            'Zooms grupales en vivo todos los miércoles a las 19:00 hs (Arg).',
            'Buzón prioritario de dudas y auditorías en directo de tus perfiles.',
            'Calendario interactivo para agendar y sincronizar tus entrevistas reales.',
          ],
        };
      default:
        return {
          icon: <GraduationCap size={38} className={styles.heroIcon} />,
          badge: 'MÓDULO EXCLUSIVO VIP',
          title: 'Este Módulo Troncal es exclusivo de la Experiencia Búsqueda Laboral',
          description:
            'Desbloqueá el acceso a las clases en video, plantillas paso a paso, simuladores y evaluaciones prácticas de este módulo avanzado.',
          benefits: [
            'Acceso ilimitado a todas las lecciones en video HD y materiales.',
            'Evaluación final de acreditación con feedback pedagógico.',
            'Certificado Oficial de Aprobación al completar el programa.',
          ],
        };
    }
  };

  const details = getPaywallDetails();

  return (
    <div className={styles.paywallContainer}>
      <div className={styles.topBackBar}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={onBackToDashboard}
        >
          <ArrowLeft size={16} />
          <span>Volver al Tablero</span>
        </button>
      </div>

      <div className={styles.paywallCard}>
        {/* Glowing lock header */}
        <div className={styles.iconCircleWrap}>
          <div className={styles.iconCircle}>
            {details.icon}
            <div className={styles.lockBadge}>
              <Lock size={16} />
            </div>
          </div>
        </div>

        <div className={styles.badgeRow}>
          <span className={styles.vipBadge}>
            <Sparkles size={13} className={styles.sparkleIcon} />
            <span>{details.badge}</span>
          </span>
          <span className={styles.planNotice}>No disponible en versión gratuita (Free)</span>
        </div>

        <h1 className={styles.title}>{details.title}</h1>
        <p className={styles.desc}>{details.description}</p>

        {/* Benefits list */}
        <div className={styles.benefitsBox}>
          <h2 className={styles.benefitsHeading}>
            <ShieldCheck size={16} className={styles.shieldIcon} />
            <span>Qué desbloqueás al acceder a la Experiencia Completa:</span>
          </h2>
          <ul className={styles.benefitsList}>
            {details.benefits.map((b, idx) => (
              <li key={idx} className={styles.benefitItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action buttons */}
        <div className={styles.actionsRow}>
          <a
            href="/experiencia"
            className={styles.primaryCta}
            onClick={(e) => {
              if (onUpgrade) {
                e.preventDefault();
                onUpgrade();
              }
            }}
          >
            <span>Comprar la Experiencia Búsqueda Laboral</span>
            <ArrowRight size={16} />
          </a>

          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={onBackToDashboard}
          >
            <span>Volver a mis módulos gratuitos</span>
          </button>
        </div>
      </div>
    </div>
  );
}
