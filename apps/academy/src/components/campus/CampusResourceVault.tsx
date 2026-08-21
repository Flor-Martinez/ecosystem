'use client';

import React, { useState, useMemo } from 'react';
import {
  Eye,
  Search,
  Layers,
  Sparkles,
  BookOpen,
  Lock,
  ArrowLeft,
} from 'lucide-react';
import { allCampusResources, CampusResource, campusPrograms } from '@/data/campus';
import { getInAppDocumentByIdOrSlug, InAppDocument } from '@/data/inAppDocuments';
import { InAppDocumentModal } from '@/components/campus/InAppDocumentModal';
import styles from './CampusResourceVault.module.css';

interface CampusResourceVaultProps {
  currentProgramId?: string;
  membershipTier?: 'paid' | 'free';
  onLockedClick?: (featureId: string) => void;
  onBackToDashboard?: () => void;
}

export function CampusResourceVault({
  currentProgramId,
  membershipTier = 'paid',
  onLockedClick,
  onBackToDashboard,
}: CampusResourceVaultProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>('todos');
  const [selectedProgram, setSelectedProgram] = useState<string>(currentProgramId || 'todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedDoc, setSelectedDoc] = useState<InAppDocument | null>(null);

  const formats = [
    { id: 'todos', label: 'Todos los formatos' },
    { id: 'word', label: 'Plantillas Word (.docx)' },
    { id: 'notion', label: 'Workspaces Notion' },
    { id: 'excel', label: 'Matrices Excel (.xlsx)' },
    { id: 'pdf', label: 'Guías & Checklists (PDF)' },
  ];

  const isResourceLocked = (res: CampusResource): boolean => {
    if (membershipTier === 'paid') return false;
    // In Free Tier: Modules 3 & 5, Notion databases, or advanced negotiation sheets are VIP exclusive
    if (res.moduleNumber === 3 || res.moduleNumber === 5) return true;
    if (res.type === 'notion') return true;
    if (res.category === 'Matriz Excel' && res.title.toLowerCase().includes('sueldo')) return true;
    return false;
  };

  const filteredResources = useMemo(() => {
    return allCampusResources.filter((res) => {
      const matchesFormat =
        selectedFormat === 'todos' || res.type === selectedFormat;

      const matchesProgram =
        selectedProgram === 'todos' || res.programId === selectedProgram;

      const matchesSearch =
        searchQuery.trim() === '' ||
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFormat && matchesProgram && matchesSearch;
    });
  }, [selectedFormat, selectedProgram, searchQuery]);

  const handleOpenDoc = (res: CampusResource) => {
    let slug = 'checklist-optimizacion-cv-ats';
    const lower = res.title.toLowerCase();
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

  const getFormatBadgeStyle = (type: CampusResource['type']) => {
    switch (type) {
      case 'word':
        return { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE', label: 'WORD .DOCX' };
      case 'notion':
        return { bg: '#F5F3FF', color: '#6D28D9', border: '#DDD6FE', label: 'NOTION' };
      case 'excel':
        return { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0', label: 'EXCEL .XLSX' };
      case 'pdf':
        return { bg: '#FEF2F2', color: '#B91C1C', border: '#FECACA', label: 'PDF GUÍA' };
      default:
        return { bg: '#F1F5F9', color: '#334155', border: '#CBD5E1', label: 'ENLACE' };
    }
  };

  return (
    <div className={styles.vaultWrapper}>
      {/* Top Back Navigation */}
      {onBackToDashboard && (
        <div className={styles.topBackRow}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={onBackToDashboard}
          >
            <ArrowLeft size={16} />
            <span>Volver al Tablero</span>
          </button>
        </div>
      )}

      {/* Header */}
      <div className={styles.vaultHeader}>
        <div>
          <h2 className={styles.vaultTitle}>Biblioteca Central de Recursos & Plantillas In-App</h2>
          <p className={styles.vaultSubtitle}>
            Accedé y visualizá en pantalla todas las plantillas, checklists auditables, guías estratégicas y matrices de tus programas.
          </p>
        </div>

        <div className={styles.countPill}>
          <Layers size={15} />
          <span>{filteredResources.length} materiales protegidos</span>
        </div>
      </div>

      {/* Switcher & Filters Bar */}
      <div className={styles.filterBox}>
        {/* Search */}
        <div className={styles.searchBar}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar por palabra clave (ej. CV ATS, STAR, Sueldos, Checklist)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className={styles.clearBtn}
            >
              ✕
            </button>
          )}
        </div>

        {/* Program Filter Switcher */}
        <div className={styles.controlsRow}>
          <div className={styles.selectGroup}>
            <span className={styles.selectLabel}>Filtrar por Programa:</span>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className={styles.selectInput}
            >
              <option value="todos">Todos los programas ({allCampusResources.length})</option>
              {campusPrograms.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* Format Pills */}
          <div className={styles.formatPills}>
            {formats.map((fmt) => (
              <button
                key={fmt.id}
                type="button"
                className={`${styles.formatPill} ${selectedFormat === fmt.id ? styles.formatPillActive : ''}`}
                onClick={() => setSelectedFormat(fmt.id)}
              >
                {fmt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className={styles.resourcesGrid}>
        {filteredResources.length > 0 ? (
          filteredResources.map((res) => {
            const badge = getFormatBadgeStyle(res.type);
            const locked = isResourceLocked(res);

            return (
              <div
                key={res.id}
                className={`${styles.resourceCard} ${locked ? styles.resourceCardLocked : ''}`}
              >
                <div className={styles.cardTop}>
                  <div className={styles.badgesGroup}>
                    <span
                      className={styles.formatBadge}
                      style={{
                        backgroundColor: badge.bg,
                        color: badge.color,
                        borderColor: badge.border,
                      }}
                    >
                      {badge.label}
                    </span>
                    {locked ? (
                      <span className={styles.vipLockedBadge}>
                        <Lock size={10} />
                        <span>EXCLUSIVO VIP</span>
                      </span>
                    ) : (
                      <span className={styles.freeBadge}>IN-APP</span>
                    )}
                  </div>
                  {res.fileSize && <span className={styles.sizeText}>{res.fileSize}</span>}
                </div>

                <h3 className={styles.resTitle}>{res.title}</h3>
                <p className={styles.resDesc}>{res.description}</p>

                <div className={styles.resProgramTag}>
                  <BookOpen size={13} />
                  <span>
                    {res.programTitle} · Módulo 0{res.moduleNumber}
                  </span>
                </div>

                <div className={styles.cardFooter}>
                  {locked ? (
                    <button
                      type="button"
                      className={styles.lockedDownloadBtn}
                      onClick={() => {
                        if (onLockedClick) {
                          onLockedClick('recursos');
                        } else {
                          alert('Este recurso requiere Membresía VIP activa');
                        }
                      }}
                    >
                      <Lock size={14} />
                      <span>Desbloquear con VIP</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.downloadBtn}
                      onClick={() => handleOpenDoc(res)}
                      title="Abrir y visualizar material en la plataforma"
                    >
                      <Eye size={15} />
                      <span>Visualizar en Pantalla</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.emptyState}>
            <Sparkles size={24} className={styles.emptyIcon} />
            <h4>No se encontraron recursos con esos filtros</h4>
            <p>Probá seleccionando otro formato o restableciendo la búsqueda.</p>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={() => {
                setSelectedFormat('todos');
                setSelectedProgram('todos');
                setSearchQuery('');
              }}
            >
              Ver todos los recursos
            </button>
          </div>
        )}
      </div>

      {/* In-App Document Modal */}
      {selectedDoc && (
        <InAppDocumentModal
          document={selectedDoc}
          isOpen={!!selectedDoc}
          onClose={() => setSelectedDoc(null)}
        />
      )}
    </div>
  );
}
