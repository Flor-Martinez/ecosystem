'use client';

import React, { useState } from 'react';
import {
  X,
  BookOpen,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Sparkles,
  AlertTriangle,
  FileText,
  Lock,
} from 'lucide-react';
import { InAppDocument } from '@/data/inAppDocuments';
import styles from './InAppDocumentModal.module.css';

interface InAppDocumentModalProps {
  document: InAppDocument;
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
}

export function InAppDocumentModal({
  document,
  isOpen,
  onClose,
  studentName = 'Alumno Academia',
}: InAppDocumentModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [copiedSectionId, setCopiedSectionId] = useState<string | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>(
    document.sections[0]?.id || ''
  );

  if (!isOpen) return null;

  const toggleCheckItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopyText = (sectionId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSectionId(sectionId);
    setTimeout(() => setCopiedSectionId(null), 2500);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    if (typeof window !== 'undefined') {
      const element = window.document.getElementById(`doc-sec-${sectionId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true">
      <div
        className={`${styles.modalContainer} ${isFullscreen ? styles.modalFullscreen : ''}`}
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Top Floating Security & Title Bar */}
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.docIconWrap}>
              <FileText size={18} />
            </div>
            <div>
              <div className={styles.badgeRow}>
                <span className={styles.categoryBadge}>{document.category}</span>
                <span className={styles.securityPill}>
                  <Lock size={11} />
                  <span>Documento In-App Protegido</span>
                </span>
                <span className={styles.versionPill}>{document.version}</span>
              </div>
              <h2 className={styles.docTitle}>{document.title}</h2>
            </div>
          </div>

          <div className={styles.headerActions}>
            {/* Zoom Controls */}
            <div className={styles.zoomControls}>
              <button
                type="button"
                className={styles.controlBtn}
                onClick={() => setZoomLevel((prev) => Math.max(90, prev - 10))}
                title="Reducir tamaño de letra"
              >
                <ZoomOut size={15} />
              </button>
              <span className={styles.zoomLabel}>{zoomLevel}%</span>
              <button
                type="button"
                className={styles.controlBtn}
                onClick={() => setZoomLevel((prev) => Math.min(130, prev + 10))}
                title="Aumentar tamaño de letra"
              >
                <ZoomIn size={15} />
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              className={styles.controlBtn}
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Salir de pantalla completa' : 'Ver a pantalla completa'}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              title="Cerrar visor"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Main Body (Index on Left + Document Reader on Right) */}
        <div className={styles.modalBody}>
          {/* Left Table of Contents */}
          <aside className={styles.tableOfContents}>
            <div className={styles.tocHeading}>
              <BookOpen size={14} />
              <span>Índice del Material</span>
            </div>
            <nav className={styles.tocNav}>
              {document.sections.map((sec, idx) => (
                <button
                  key={sec.id}
                  type="button"
                  className={`${styles.tocItem} ${activeSectionId === sec.id ? styles.tocItemActive : ''}`}
                  onClick={() => scrollToSection(sec.id)}
                >
                  <span className={styles.tocNumber}>0{idx + 1}</span>
                  <span className={styles.tocText}>{sec.title}</span>
                </button>
              ))}
            </nav>

            <div className={styles.tocMetaBox}>
              <span className={styles.tocMetaLabel}>Autoría & Verificación:</span>
              <strong className={styles.tocMetaVal}>{document.author}</strong>
              <span className={styles.tocMetaTime}>⏱️ {document.estimatedReadTime}</span>
            </div>
          </aside>

          {/* Right Document Content Area */}
          <main
            className={styles.documentViewer}
            style={{ fontSize: `${zoomLevel / 100}rem` }}
          >
            {/* Subtle Watermark Tag */}
            <div className={styles.watermarkBar}>
              <ShieldCheck size={13} />
              <span>
                Visualización exclusiva para <strong>{studentName}</strong> · Academia Flor Martínez
              </span>
            </div>

            {/* Document Abstract Card */}
            <div className={styles.abstractCard}>
              <div className={styles.abstractHead}>
                <Sparkles size={16} className={styles.sparkleIcon} />
                <strong>Objetivo de Aprendizaje</strong>
              </div>
              <p>{document.summary}</p>
            </div>

            {/* Document Sections */}
            <div className={styles.sectionsList}>
              {document.sections.map((sec) => (
                <article
                  key={sec.id}
                  id={`doc-sec-${sec.id}`}
                  className={styles.sectionBlock}
                >
                  <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>{sec.title}</h3>
                    {sec.subtitle && (
                      <p className={styles.sectionSubtitle}>{sec.subtitle}</p>
                    )}
                  </div>

                  <p className={styles.sectionContent}>{sec.content}</p>

                  {/* Callouts (Tip / Warning / Formula) */}
                  {sec.callout && (
                    <div
                      className={`${styles.calloutBox} ${
                        sec.callout.type === 'warning'
                          ? styles.calloutWarning
                          : sec.callout.type === 'formula'
                            ? styles.calloutFormula
                            : styles.calloutTip
                      }`}
                    >
                      <div className={styles.calloutIcon}>
                        {sec.callout.type === 'warning' ? (
                          <AlertTriangle size={18} />
                        ) : (
                          <Sparkles size={18} />
                        )}
                      </div>
                      <div className={styles.calloutText}>{sec.callout.text}</div>
                    </div>
                  )}

                  {/* Data Tables */}
                  {sec.tableData && (
                    <div className={styles.tableWrapper}>
                      <table className={styles.docTable}>
                        <thead>
                          <tr>
                            {sec.tableData.headers.map((h, i) => (
                              <th key={i}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sec.tableData.rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Interactive Checklist Items */}
                  {sec.checklistItems && sec.checklistItems.length > 0 && (
                    <div className={styles.checklistBlock}>
                      <span className={styles.checklistBlockTitle}>
                        Puntos de Control & Verificación Interactiva:
                      </span>
                      <div className={styles.checklistItems}>
                        {sec.checklistItems.map((item) => {
                          const isChecked = !!checkedItems[item.id];
                          return (
                            <div
                              key={item.id}
                              className={`${styles.checklistItem} ${isChecked ? styles.itemDone : ''}`}
                              onClick={() => toggleCheckItem(item.id)}
                            >
                              <div className={styles.checkCircle}>
                                {isChecked && <Check size={14} />}
                              </div>
                              <div className={styles.checkItemText}>
                                <strong>{item.text}</strong>
                                {item.description && <small>{item.description}</small>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Copyable Template Box */}
                  {sec.copyableTemplate && (
                    <div className={styles.copyableBox}>
                      <div className={styles.copyableTop}>
                        <span className={styles.copyableLabel}>
                          {sec.copyableTemplate.label}
                        </span>
                        <button
                          type="button"
                          className={styles.copyBtn}
                          onClick={() =>
                            handleCopyText(sec.id, sec.copyableTemplate!.text)
                          }
                        >
                          {copiedSectionId === sec.id ? (
                            <>
                              <Check size={13} className={styles.copiedCheck} />
                              <span>¡Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>Copiar Texto</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className={styles.codeSnippet}>
                        {sec.copyableTemplate.text}
                      </pre>
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* Bottom In-App Verification Tag */}
            <div className={styles.docFooterNotice}>
              <CheckCircle2 size={18} className={styles.footerCheck} />
              <div>
                <strong>Fin del Documento de Consulta</strong>
                <p>
                  Podés mantener esta ventana abierta mientras realizás tus ejercicios o volver al aula virtual en cualquier momento.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
