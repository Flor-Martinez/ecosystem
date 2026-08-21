'use client';

import React, { useState } from 'react';
import {
  Eye,
  Copy,
  Check,
  Sparkles,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import { getInAppDocumentByIdOrSlug } from '@/data/inAppDocuments';
import { InAppDocumentModal } from '@/components/campus/InAppDocumentModal';
import styles from './RecursoReaderView.module.css';

interface RecursoReaderViewProps {
  slug: string;
}

export function RecursoReaderView({ slug }: RecursoReaderViewProps) {
  const document = getInAppDocumentByIdOrSlug(slug);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [copiedSectionId, setCopiedSectionId] = useState<string | null>(null);

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

  return (
    <div className={styles.readerContainer}>
      {/* Top CTA Banner to open Fullscreen Modal */}
      <div className={styles.topActionCard}>
        <div className={styles.topActionLeft}>
          <div className={styles.secBadge}>
            <Lock size={12} />
            <span>VISUALIZADOR IN-APP PROTEGIDO</span>
          </div>
          <h3 className={styles.actionTitle}>Lectura Directa en Plataforma</h3>
          <p className={styles.actionDesc}>
            Este material está disponible para lectura interactiva y consulta continua sin necesidad de descargas externas.
          </p>
        </div>
        <button
          type="button"
          className={styles.openModalBtn}
          onClick={() => setIsModalOpen(true)}
        >
          <Eye size={16} />
          <span>Abrir Visor Pantalla Completa</span>
        </button>
      </div>

      {/* Embedded Document Sections */}
      <div className={styles.embeddedDocument} onContextMenu={(e) => e.preventDefault()}>
        <div className={styles.docHeaderRow}>
          <span className={styles.versionTag}>{document.version}</span>
          <span className={styles.timeTag}>⏱️ {document.estimatedReadTime}</span>
        </div>

        {document.sections.map((sec, idx) => (
          <article key={sec.id} className={styles.sectionBlock}>
            <div className={styles.sectionHeadingBox}>
              <span className={styles.sectionIndex}>SECCIÓN 0{idx + 1}</span>
              <h3 className={styles.sectionTitle}>{sec.title}</h3>
              {sec.subtitle && <p className={styles.sectionSubtitle}>{sec.subtitle}</p>}
            </div>

            <p className={styles.sectionText}>{sec.content}</p>

            {/* Callouts */}
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

            {/* Tables */}
            {sec.tableData && (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
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

            {/* Checklists */}
            {sec.checklistItems && sec.checklistItems.length > 0 && (
              <div className={styles.checklistCard}>
                <strong className={styles.checklistHead}>Puntos de Control Auditables:</strong>
                <div className={styles.checklistList}>
                  {sec.checklistItems.map((item) => {
                    const isChecked = !!checkedItems[item.id];
                    return (
                      <div
                        key={item.id}
                        className={`${styles.checklistItem} ${isChecked ? styles.itemDone : ''}`}
                        onClick={() => toggleCheckItem(item.id)}
                      >
                        <div className={styles.checkCircle}>
                          {isChecked && <Check size={13} />}
                        </div>
                        <div className={styles.checkText}>
                          <strong>{item.text}</strong>
                          {item.description && <small>{item.description}</small>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Copyable Templates */}
            {sec.copyableTemplate && (
              <div className={styles.copyBox}>
                <div className={styles.copyHead}>
                  <span>{sec.copyableTemplate.label}</span>
                  <button
                    type="button"
                    className={styles.copyBtn}
                    onClick={() => handleCopyText(sec.id, sec.copyableTemplate!.text)}
                  >
                    {copiedSectionId === sec.id ? (
                      <>
                        <Check size={12} className={styles.copiedSuccess} />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>Copiar Texto</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className={styles.codeContent}>{sec.copyableTemplate.text}</pre>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Fullscreen Document Modal */}
      {isModalOpen && (
        <InAppDocumentModal
          document={document}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
