'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  PlayCircle,
  Zap,
  Star,
  Clock,
  Plus,
  Compass,
} from 'lucide-react';
import {
  availableOfferingsCatalog,
  CampusCatalogItem,
  CampusProgram,
  campusPrograms,
} from '@/data/campus';
import styles from './CampusCatalogModal.module.css';

interface CampusCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProgramId: string;
  onSelectProgram: (prog: CampusProgram) => void;
  membershipTier?: 'paid' | 'free';
}

export function CampusCatalogModal({
  isOpen,
  onClose,
  currentProgramId,
  onSelectProgram,
  membershipTier = 'paid',
}: CampusCatalogModalProps) {
  const [filterTab, setFilterTab] = useState<'todos' | 'experiencia' | 'curso'>('todos');

  if (!isOpen) return null;

  const filteredItems = availableOfferingsCatalog.filter((item) => {
    if (filterTab === 'todos') return true;
    return item.type === filterTab;
  });

  const handleEnrollAndSwitch = (item: CampusCatalogItem) => {
    // Find program in campusPrograms or create matching program structure
    let prog = campusPrograms.find((p) => p.id === item.id || p.slug === item.slug);
    if (!prog) {
      // Default to first available program
      prog = campusPrograms[0]!;
    }
    onSelectProgram(prog);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Top Gradient Banner */}
        <div className={styles.modalHeader}>
          <div>
            <div className={styles.headerBadge}>
              <Compass size={14} />
              <span>CATÁLOGO DE FORMACIÓN ACADÉMICA</span>
            </div>
            <h2 className={styles.modalTitle}>Explorar y Agregar Cursos o Experiencias</h2>
            <p className={styles.modalSubtitle}>
              Conocé todos los programas disponibles para potenciar tu perfil profesional. Podés cursar programas integrales o talleres individuales 100% enfocados en el aula.
            </p>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Cerrar catálogo"
          >
            ✕
          </button>
        </div>

        {/* Filter Pills */}
        <div className={styles.filterBar}>
          <div className={styles.filterPills}>
            <button
              type="button"
              className={`${styles.filterBtn} ${filterTab === 'todos' ? styles.filterBtnActive : ''}`}
              onClick={() => setFilterTab('todos')}
            >
              Todos los Programas ({availableOfferingsCatalog.length})
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${filterTab === 'experiencia' ? styles.filterBtnActive : ''}`}
              onClick={() => setFilterTab('experiencia')}
            >
              ✨ Experiencias Integrales
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${filterTab === 'curso' ? styles.filterBtnActive : ''}`}
              onClick={() => setFilterTab('curso')}
            >
              🎓 Cursos Individuales (Solo Aula)
            </button>
          </div>
        </div>

        {/* Catalog Cards Grid */}
        <div className={styles.catalogGrid}>
          {filteredItems.map((item) => {
            const isCurrentActive = item.id === currentProgramId;
            const isEnrolled = campusPrograms.some((p) => p.id === item.id);
            const isEbl = item.id === 'ebl' || item.slug === 'experiencia-busqueda-laboral';

            return (
              <div
                key={item.id}
                className={`${styles.catalogCard} ${item.type === 'experiencia' ? styles.cardExperience : styles.cardCourse} ${isCurrentActive ? styles.cardActiveNow : ''}`}
              >
                {/* Top Badge */}
                <div className={styles.cardHeaderRow}>
                  <span
                    className={`${styles.typeBadge} ${item.type === 'experiencia' ? styles.badgeExp : styles.badgeCourse}`}
                  >
                    {item.badge}
                  </span>
                  <div className={styles.ratingBadge}>
                    <Star size={12} fill="#F59E0B" color="#F59E0B" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardTagline}>{item.tagline}</p>

                <div className={styles.cardPerk}>
                  <Zap size={13} className={styles.perkIcon} />
                  <span>{item.highlightPerk}</span>
                </div>

                <div className={styles.cardMetaRow}>
                  <div className={styles.metaItem}>
                    <Clock size={13} />
                    <span>{item.duration}</span>
                  </div>
                  <strong className={styles.priceTag}>{item.price}</strong>
                </div>

                {/* Actions */}
                <div className={styles.cardActions}>
                  {isCurrentActive ? (
                    <button
                      type="button"
                      disabled
                      className={styles.activeNowBtn}
                    >
                      <CheckCircle2 size={15} />
                      <span>{isEbl && membershipTier === 'free' ? 'Cursando en Modo Free' : 'Cursando actualmente'}</span>
                    </button>
                  ) : isEnrolled ? (
                    <button
                      type="button"
                      className={styles.switchCourseBtn}
                      onClick={() => handleEnrollAndSwitch(item)}
                    >
                      <PlayCircle size={15} />
                      <span>Ingresar al Aula</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.enrollSimBtn}
                      onClick={() => handleEnrollAndSwitch(item)}
                    >
                      <Plus size={15} />
                      <span>Inscribirme y Entrar</span>
                    </button>
                  )}

                  <Link
                    href={item.publicUrl}
                    target="_blank"
                    className={styles.publicInfoLink}
                    title="Ver página de presentación e información en la web"
                  >
                    <ExternalLink size={13} />
                    <span>Ver en la web</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info banner */}
        <div className={styles.modalFooter}>
          <div className={styles.footerNote}>
            <GraduationCap size={18} className={styles.footerIcon} />
            <span>
              <strong>Diferencia de entornos:</strong> Las Experiencias incluyen Tablero, Tracker y Zooms semanales. Los Cursos individuales van directo al Aula Virtual sin elementos secundarios.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
