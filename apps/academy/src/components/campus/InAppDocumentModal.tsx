import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Save,
  CheckCheck,
} from 'lucide-react';
import { InAppDocument } from '@/data/inAppDocuments';
import { useAuth } from '@/context/AuthContext';
import { saveStudentProfileAction } from '@/actions/campus';
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
  const { user } = useAuth();
  const activeEmail = user?.email || 'demo@academiaflormartinez.com';

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [copiedSectionId, setCopiedSectionId] = useState<string | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>(
    document.sections[0]?.id || ''
  );
  const viewerRef = useRef<HTMLElement | null>(null);

  // Target Matrix Interactive Fields (Synced with Mi Perfil)
  const isTargetMatrixDoc = document.id === 'matriz-target-no-negociables';
  const [targetRole, setTargetRole] = useState('Product Designer / UX Lead');
  const [industry, setIndustry] = useState('Fintech & E-commerce');
  const [seniority, setSeniority] = useState('Senior');
  const [modality, setModality] = useState('100% Remoto (Latam / Global)');
  const [expectedSalary, setExpectedSalary] = useState('$2.200 USD / mes');
  const [availability, setAvailability] = useState('Disponibilidad inmediata');
  const [nonNegotiables, setNonNegotiables] = useState(
    'No aceptar esquemas 100% presenciales a más de 1h de viaje.\nNo aceptar ofertas por debajo de mi piso salarial neto.'
  );
  const [targetCompanies, setTargetCompanies] = useState(
    '1. Mercado Libre\n2. Ualá\n3. Despegar\n4. Auth0\n5. Tiendanube'
  );
  const [isSavedSync, setIsSavedSync] = useState(true);

  // Load from local storage or user profile
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ebl_student_profile');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.targetRole) setTargetRole(parsed.targetRole);
          if (parsed.industry) setIndustry(parsed.industry);
          if (parsed.seniority) setSeniority(parsed.seniority);
          if (parsed.modality) setModality(parsed.modality);
          if (parsed.expectedSalary) setExpectedSalary(parsed.expectedSalary);
          if (parsed.availability) setAvailability(parsed.availability);
          if (parsed.nonNegotiables) setNonNegotiables(parsed.nonNegotiables);
          if (parsed.targetCompanies) setTargetCompanies(parsed.targetCompanies);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  // Save changes to localStorage and optionally DB
  const saveMatrixToProfile = useCallback(async () => {
    if (typeof window !== 'undefined') {
      const dataToSave = {
        targetRole,
        industry,
        seniority,
        modality,
        expectedSalary,
        availability,
        nonNegotiables,
        targetCompanies,
      };
      localStorage.setItem('ebl_student_profile', JSON.stringify(dataToSave));
    }
    try {
      await saveStudentProfileAction(activeEmail, {
        targetRole,
        seniority,
        modality,
        expectedSalary,
      });
      setIsSavedSync(true);
    } catch (err) {
      console.error('Error auto-syncing profile:', err);
    }
  }, [activeEmail, targetRole, industry, seniority, modality, expectedSalary, availability, nonNegotiables, targetCompanies]);

  const handleFieldChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    setIsSavedSync(false);
  };

  // Auto-sync after 1 second of typing
  useEffect(() => {
    if (!isSavedSync) {
      const timer = setTimeout(() => {
        saveMatrixToProfile();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSavedSync, saveMatrixToProfile]);

  // ScrollSpy Listener: Detect which section is currently at the top of the viewer container
  const handleViewerScroll = () => {
    if (!viewerRef.current) return;
    const container = viewerRef.current;
    const containerTop = container.getBoundingClientRect().top;

    let currentSecId = document.sections[0]?.id || '';
    for (const sec of document.sections) {
      const el = window.document.getElementById(`doc-sec-${sec.id}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        // Section top offset relative to viewer container
        if (rect.top - containerTop <= 160) {
          currentSecId = sec.id;
        }
      }
    }
    if (currentSecId && currentSecId !== activeSectionId) {
      setActiveSectionId(currentSecId);
    }
  };

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
            ref={viewerRef}
            onScroll={handleViewerScroll}
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

            {/* Live Profile Sync Notice (For Interactive Documents like Target Matrix) */}
            {isTargetMatrixDoc && (
              <div className={styles.syncNoticeCard}>
                <div className={styles.syncNoticeLeft}>
                  <Sparkles size={18} className={styles.syncNoticeIcon} />
                  <p className={styles.syncNoticeText}>
                    <strong>Plantilla Interactiva de Trabajo:</strong> Podés completar tus datos directamente en cada campo.
                    Esta información queda guardada automáticamente en tu <strong>Perfil</strong> de la plataforma para consultarla o actualizarla más tarde.
                  </p>
                </div>
                <div className={styles.syncBadge}>
                  <CheckCheck size={13} />
                  <span>{isSavedSync ? 'Sincronizado con Mi Perfil' : 'Guardando...'}</span>
                </div>
              </div>
            )}

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

                  {/* Callouts (Tip / Warning / Formula / Quote) */}
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

                  {/* INTERACTIVE FORM FIELDS FOR TARGET MATRIX */}
                  {isTargetMatrixDoc && sec.id === 'los-6-filtros-target' && (
                    <div className={styles.interactiveFormContainer}>
                      {/* Filtro 1 */}
                      <div className={styles.formFieldCard}>
                        <div className={styles.fieldInfoRow}>
                          <div className={styles.fieldLabelRow}>
                            <label htmlFor="input-targetRole" className={styles.fieldLabel}>
                              1. Puesto o Rol Objetivo Exacto
                            </label>
                            <span className={styles.fieldTag}>Filtro 01</span>
                          </div>
                          <p className={styles.fieldExplain}>
                            <strong>¿Qué es?</strong> El título formal del puesto con el que te buscarán los reclutadores en LinkedIn y ATS.
                          </p>
                          <span className={styles.fieldExample}>Ejemplo: Product Designer B2B · Analista Sr. de Comercio Exterior</span>
                        </div>
                        <input
                          id="input-targetRole"
                          type="text"
                          className={styles.formInput}
                          value={targetRole}
                          onChange={(e) => handleFieldChange(setTargetRole, e.target.value)}
                          placeholder="Ingresá tu puesto objetivo..."
                        />
                      </div>

                      {/* Filtro 2 */}
                      <div className={styles.formFieldCard}>
                        <div className={styles.fieldInfoRow}>
                          <div className={styles.fieldLabelRow}>
                            <label htmlFor="input-industry" className={styles.fieldLabel}>
                              2. Industria o Rubro Objetivo
                            </label>
                            <span className={styles.fieldTag}>Filtro 02</span>
                          </div>
                          <p className={styles.fieldExplain}>
                            <strong>¿Para qué sirve?</strong> Ayuda a enfocar tus palabras clave y antecedentes en sectores compatibles.
                          </p>
                          <span className={styles.fieldExample}>Ejemplo: Fintech, Logística Internacional, SaaS B2B, Retail</span>
                        </div>
                        <input
                          id="input-industry"
                          type="text"
                          className={styles.formInput}
                          value={industry}
                          onChange={(e) => handleFieldChange(setIndustry, e.target.value)}
                          placeholder="Ej: Fintech, E-commerce, Logística..."
                        />
                      </div>

                      {/* Filtro 3 */}
                      <div className={styles.formFieldCard}>
                        <div className={styles.fieldInfoRow}>
                          <div className={styles.fieldLabelRow}>
                            <label htmlFor="input-seniority" className={styles.fieldLabel}>
                              3. Seniority y Nivel de Responsabilidad
                            </label>
                            <span className={styles.fieldTag}>Filtro 03</span>
                          </div>
                          <p className={styles.fieldExplain}>
                            <strong>¿Cómo completarlo?</strong> Alinea tus años de experiencia y nivel de autonomía (Junior, Semi-Senior, Senior, Lead).
                          </p>
                          <span className={styles.fieldExample}>Ejemplo: Semi-Senior (3 a 5 años) · Senior (5+ años)</span>
                        </div>
                        <input
                          id="input-seniority"
                          type="text"
                          className={styles.formInput}
                          value={seniority}
                          onChange={(e) => handleFieldChange(setSeniority, e.target.value)}
                          placeholder="Ej: Senior, Semi-Senior..."
                        />
                      </div>

                      {/* Filtro 4 */}
                      <div className={styles.formFieldCard}>
                        <div className={styles.fieldInfoRow}>
                          <div className={styles.fieldLabelRow}>
                            <label htmlFor="input-modality" className={styles.fieldLabel}>
                              4. Modalidad de Trabajo
                            </label>
                            <span className={styles.fieldTag}>Filtro 04</span>
                          </div>
                          <p className={styles.fieldExplain}>
                            <strong>¿Para qué sirve?</strong> Delimita tu zona de búsqueda geográfica y tus tiempos de traslado.
                          </p>
                          <span className={styles.fieldExample}>Ejemplo: 100% Remoto (Latam/Global) · Híbrido CABA (2x3)</span>
                        </div>
                        <input
                          id="input-modality"
                          type="text"
                          className={styles.formInput}
                          value={modality}
                          onChange={(e) => handleFieldChange(setModality, e.target.value)}
                          placeholder="Ej: 100% Remoto, Híbrido..."
                        />
                      </div>

                      {/* Filtro 5 */}
                      <div className={styles.formFieldCard}>
                        <div className={styles.fieldInfoRow}>
                          <div className={styles.fieldLabelRow}>
                            <label htmlFor="input-salary" className={styles.fieldLabel}>
                              5. Piso Salarial No Negociable
                            </label>
                            <span className={styles.fieldTag}>Filtro 05</span>
                          </div>
                          <p className={styles.fieldExplain}>
                            <strong>¿Qué es?</strong> El monto neto mínimo indispensable para cubrir tus gastos fijos y valorar tu perfil.
                          </p>
                          <span className={styles.fieldExample}>Ejemplo: $2.200 USD netos / mes · $1.800.000 ARS netos</span>
                        </div>
                        <input
                          id="input-salary"
                          type="text"
                          className={styles.formInput}
                          value={expectedSalary}
                          onChange={(e) => handleFieldChange(setExpectedSalary, e.target.value)}
                          placeholder="Ej: $2.200 USD / mes..."
                        />
                      </div>

                      {/* Filtro 6 */}
                      <div className={styles.formFieldCard}>
                        <div className={styles.fieldInfoRow}>
                          <div className={styles.fieldLabelRow}>
                            <label htmlFor="input-availability" className={styles.fieldLabel}>
                              6. Disponibilidad de Incorporación
                            </label>
                            <span className={styles.fieldTag}>Filtro 06</span>
                          </div>
                          <p className={styles.fieldExplain}>
                            <strong>¿Para qué sirve?</strong> Claridad para dar una respuesta inmediata y profesional en el primer screening telefónico.
                          </p>
                          <span className={styles.fieldExample}>Ejemplo: Inmediata · 15 días de preaviso · 1 mes</span>
                        </div>
                        <input
                          id="input-availability"
                          type="text"
                          className={styles.formInput}
                          value={availability}
                          onChange={(e) => handleFieldChange(setAvailability, e.target.value)}
                          placeholder="Ej: Inmediata / 15 días..."
                        />
                      </div>
                    </div>
                  )}

                  {/* INTERACTIVE TEXTAREA FOR NO NEGOCIABLES */}
                  {isTargetMatrixDoc && sec.id === 'limites-no-negociables' && (
                    <div className={styles.interactiveFormContainer}>
                      <div className={styles.formFieldCard}>
                        <div className={styles.fieldInfoRow}>
                          <div className={styles.fieldLabelRow}>
                            <label htmlFor="input-nonNegotiables" className={styles.fieldLabel}>
                              Tus Límites y Condiciones No Negociables
                            </label>
                            <span className={styles.fieldTag}>Líneas Rojas</span>
                          </div>
                          <p className={styles.fieldExplain}>
                            <strong>¿Cómo completarlo?</strong> Anotá 2 o 3 condiciones de trabajo que NO vas a aceptar bajo ninguna circunstancia.
                          </p>
                          <span className={styles.fieldExample}>Ej: No aceptar esquemas 100% presenciales a más de 1h de viaje · No aceptar salarios por debajo del piso.</span>
                        </div>
                        <textarea
                          id="input-nonNegotiables"
                          className={styles.formTextarea}
                          rows={4}
                          value={nonNegotiables}
                          onChange={(e) => handleFieldChange(setNonNegotiables, e.target.value)}
                          placeholder="Escribí acá tus límites no negociables..."
                        />
                      </div>
                    </div>
                  )}

                  {/* INTERACTIVE TEXTAREA FOR TARGET COMPANIES */}
                  {isTargetMatrixDoc && sec.id === 'lista-empresas-diana' && (
                    <div className={styles.interactiveFormContainer}>
                      <div className={styles.formFieldCard}>
                        <div className={styles.fieldInfoRow}>
                          <div className={styles.fieldLabelRow}>
                            <label htmlFor="input-targetCompanies" className={styles.fieldLabel}>
                              Tus 15 Empresas Diana (Prospección Activa)
                            </label>
                            <span className={styles.fieldTag}>Empresas Objetivo</span>
                          </div>
                          <p className={styles.fieldExplain}>
                            <strong>¿Cómo completarlo?</strong> Listá empresas de tu industria donde te gustaría trabajar para contactar a sus líderes.
                          </p>
                          <span className={styles.fieldExample}>Ej: 1. Mercado Libre 2. Ualá 3. Despegar 4. Auth0 5. Tiendanube...</span>
                        </div>
                        <textarea
                          id="input-targetCompanies"
                          className={styles.formTextarea}
                          rows={5}
                          value={targetCompanies}
                          onChange={(e) => handleFieldChange(setTargetCompanies, e.target.value)}
                          placeholder="1. Empresa A&#10;2. Empresa B&#10;3. Empresa C..."
                        />
                        <div className={styles.saveActionsBar}>
                          <span className={styles.syncBadge}>
                            <CheckCheck size={13} />
                            <span>{isSavedSync ? 'Sincronizado con Mi Perfil' : 'Guardando cambios...'}</span>
                          </span>
                          <button
                            type="button"
                            className={styles.saveProfileBtn}
                            onClick={saveMatrixToProfile}
                          >
                            <Save size={14} />
                            <span>Guardar en Mi Perfil</span>
                          </button>
                        </div>
                      </div>
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

                  {/* Interactive Checklist Items (for non-target matrix docs) */}
                  {!isTargetMatrixDoc && sec.checklistItems && sec.checklistItems.length > 0 && (
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
