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
  FolderDown,
} from 'lucide-react';
import { allCampusResources, CampusResource, campusPrograms } from '@/data/campus';
import { getInAppDocumentByIdOrSlug, InAppDocument } from '@/data/inAppDocuments';
import { InAppDocumentModal } from '@/components/campus/InAppDocumentModal';
import styles from './CampusResourceVault.module.css';

interface CampusResourceVaultProps {
  currentProgramId?: string;
  membershipTier?: 'paid' | 'trial' | 'free';
  onLockedClick?: (featureId: string) => void;
  onBackToDashboard?: () => void;
}

export function CampusResourceVault({
  currentProgramId,
  membershipTier = 'paid',
  onLockedClick,
  onBackToDashboard,
}: CampusResourceVaultProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDoc, setSelectedDoc] = useState<InAppDocument | null>(null);

  const maxUnlockedModule = membershipTier === 'paid' ? 99 : membershipTier === 'trial' ? 4 : 1;

  const isResourceLocked = (res: CampusResource): boolean => {
    if (membershipTier === 'paid') return false;
    return (res.moduleNumber ?? 99) > maxUnlockedModule;
  };

  const filteredResources = useMemo(() => {
    return allCampusResources.filter((res) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [searchQuery]);

  const handleOpenDoc = (res: CampusResource) => {
    const doc = getInAppDocumentByIdOrSlug(res.id || res.title);
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
          <div className={styles.headerBadge}>
            <FolderDown size={13} />
            <span>BÓVEDA DE PLANTILLAS</span>
          </div>
          <h2 className={styles.vaultTitle}>Biblioteca Central de Recursos & Plantillas In-App</h2>
          <p className={styles.vaultSubtitle}>
            Accedé y visualizá en pantalla todas las plantillas, checklists auditables, guías estratégicas y matrices de tus programas.
          </p>
        </div>

        <div className={styles.countPill}>
          <Layers size={14} />
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
