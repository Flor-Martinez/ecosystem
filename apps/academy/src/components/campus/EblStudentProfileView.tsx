'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  UserCheck,
  FileText,
  Target,
  Award,
  Upload,
  Download,
  Save,
  Compass,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  X,
  Layers,
  Building2,
  Lock,
} from 'lucide-react';
import { LinkedinIcon } from '@/components/ui/Icons';
import { useAuth } from '@/context/AuthContext';
import { getCampusInitialDataAction, saveStudentProfileAction } from '@/actions/campus';
import styles from './EblStudentProfileView.module.css';

interface EblStudentProfileViewProps {
  onBackToDashboard: () => void;
  isDevMode?: boolean;
  onNavigateToVocationalTest?: () => void;
}

export function EblStudentProfileView({
  onBackToDashboard,
  isDevMode = false,
  onNavigateToVocationalTest,
}: EblStudentProfileViewProps) {
  const { user } = useAuth();
  const activeEmail = user?.email || 'santiago.morales@ejemplo.com';

  // Personal Info
  const [fullName, setFullName] = useState(user?.name || 'Santiago Morales');
  const [email, setEmail] = useState(user?.email || 'santiago.morales@ejemplo.com');
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/in/santiago-martinez-demo');

  // Target Matrix (6 Filters)
  const [targetRole, setTargetRole] = useState('Product Designer / UX Lead');
  const [industry, setIndustry] = useState('Fintech & E-commerce');
  const [seniority, setSeniority] = useState('Senior');
  const [modality, setModality] = useState('100% Remoto (Latam / Global)');
  const [expectedSalary, setExpectedSalary] = useState('$2.200 USD / mes');
  const [availability, setAvailability] = useState('Disponibilidad inmediata');

  // No Negociables & Target Companies
  const [nonNegotiables, setNonNegotiables] = useState(
    'No aceptar esquemas 100% presenciales a más de 1h de viaje.\nNo aceptar ofertas por debajo de mi piso salarial neto.'
  );
  const [targetCompanies, setTargetCompanies] = useState(
    '1. Mercado Libre\n2. Ualá\n3. Despegar\n4. Auth0\n5. Tiendanube'
  );

  const [cvFileName, setCvFileName] = useState('CV_Santiago_Martinez_ATS_2025.pdf');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showVocationalModal, setShowVocationalModal] = useState(false);

  // Load from database and local storage on mount
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

    async function loadProfile() {
      try {
        const res = await getCampusInitialDataAction(activeEmail);
        if (res.success && res.data) {
          if (res.data.user.name) setFullName(res.data.user.name);
          if (res.data.user.email) setEmail(res.data.user.email);
          if (res.data.studentProfile) {
            const p = res.data.studentProfile;
            if (p.linkedinUrl) setLinkedinUrl(p.linkedinUrl);
            if (p.targetRole) setTargetRole(p.targetRole);
            if (p.seniority) setSeniority(p.seniority);
            if (p.modality) setModality(p.modality);
            if (p.expectedSalary) setExpectedSalary(p.expectedSalary);
            if (p.cvFileName) setCvFileName(p.cvFileName);
          }
        }
      } catch (e) {
        console.error('Error al cargar perfil desde DB:', e);
      }
    }
    loadProfile();
  }, [activeEmail]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

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
        fullName,
        linkedinUrl,
        targetRole,
        seniority,
        modality,
        expectedSalary,
        cvFileName,
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (e) {
      console.error('Error guardando perfil en DB:', e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadCert = (certName: string) => {
    const certText = `CERTIFICADO OFICIAL DE APROBACIÓN\n\nCertificación: ${certName}\nEstudiante: ${fullName}\nFecha de Emisión: ${new Date().toLocaleDateString('es-AR')}\nEmitido por: Academia Flor Martinez\nEstado: Verificado y Aprobado 100%\nCódigo de Credencial: FM-CERT-${Math.floor(100000 + Math.random() * 900000)}`;
    const blob = new Blob([certText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Certificado_${certName.replace(/[^a-zA-Z0-9]/g, '_')}_FlorMartinez.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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

        <div>
          <div className={styles.badgeRow}>
            <span className={styles.topBadge}>PERFIL DEL ALUMNO</span>
            <span className={styles.statusPill}>Membresía Activa</span>
          </div>
          <h1 className={styles.title}>Mi Perfil & Preferencias de Carrera</h1>
          <p className={styles.desc}>
            Mantené actualizado tu perfil para que nuestro equipo pueda auditar tus documentos en los Zooms semanales y recomendarte búsquedas acordes a tu target.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className={styles.profileGrid}>
        {/* Left Column: Personal Info & Target Matrix Sub-sections */}
        <div className={styles.leftCol}>
          {/* SECTION 1: Información Personal */}
          <div className={styles.sectionCard}>
            <h2 className={styles.cardTitle}>
              <UserCheck size={18} className={styles.cardIcon} />
              <span>1. Información Personal</span>
            </h2>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Nombre y Apellido *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email de Contacto *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Perfil de LinkedIn vinculado *</label>
              <div className={styles.iconInputWrap}>
                <LinkedinIcon size={16} className={styles.inputIcon} />
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className={styles.inputWithIcon}
                  required
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Objetivo de Búsqueda Laboral (Dividido en 3 Mini-secciones) */}
          <div className={styles.sectionCard}>
            <h2 className={styles.cardTitle}>
              <Target size={18} className={styles.cardIcon} />
              <span>2. Objetivo de Búsqueda Laboral</span>
            </h2>

            {/* Mini-sección A: Matriz de Target (6 Filtros) */}
            <div className={styles.subSection}>
              <div className={styles.subSectionHeader}>
                <div className={styles.subSectionTitleRow}>
                  <Layers size={16} color="#7C3AED" />
                  <strong className={styles.subSectionTitle}>A. Matriz de Target (Los 6 Filtros)</strong>
                </div>
                <span className={styles.subSectionBadge}>6 Filtros Calibrados</span>
              </div>
              <p className={styles.subSectionHint}>
                Parámetros con los que los reclutadores y los algoritmos ATS indexan tu perfil.
              </p>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>1. Puesto o Rol Objetivo Exacto *</label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className={styles.input}
                    placeholder="Ej. Product Designer B2B"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>2. Industria o Rubro Objetivo</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className={styles.input}
                    placeholder="Ej. Fintech, E-commerce, SaaS"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>3. Seniority</label>
                  <select
                    value={seniority}
                    onChange={(e) => setSeniority(e.target.value)}
                    className={styles.select}
                  >
                    <option value="Trainee / Junior">Trainee / Junior (0-2 años)</option>
                    <option value="Semi Senior">Semi Senior (2-5 años)</option>
                    <option value="Senior">Senior (5+ años)</option>
                    <option value="Lead / Manager">Lead / Manager</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>4. Modalidad de Trabajo</label>
                  <select
                    value={modality}
                    onChange={(e) => setModality(e.target.value)}
                    className={styles.select}
                  >
                    <option value="100% Remoto (Latam / Global)">100% Remoto (Latam / Global)</option>
                    <option value="Híbrido">Híbrido (Oficina + Home Office)</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Indiferente">Indiferente</option>
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>5. Piso Salarial No Negociable</label>
                  <input
                    type="text"
                    value={expectedSalary}
                    onChange={(e) => setExpectedSalary(e.target.value)}
                    className={styles.input}
                    placeholder="Ej. $2.200 USD o $2.500.000 ARS"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>6. Disponibilidad de Incorporación</label>
                  <input
                    type="text"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className={styles.input}
                    placeholder="Ej. Inmediata / 15 días"
                  />
                </div>
              </div>
            </div>

            {/* Mini-sección B: Límites No Negociables */}
            <div className={styles.subSection}>
              <div className={styles.subSectionHeader}>
                <div className={styles.subSectionTitleRow}>
                  <ShieldCheck size={16} color="#DC2626" />
                  <strong className={styles.subSectionTitle}>B. Límites No Negociables</strong>
                </div>
                <span className={styles.subSectionBadge} style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}>
                  Líneas Rojas
                </span>
              </div>
              <p className={styles.subSectionHint}>
                Condiciones que NO vas a aceptar bajo ninguna circunstancia para mantener tu postura y poder de negociación.
              </p>
              <textarea
                rows={3}
                value={nonNegotiables}
                onChange={(e) => setNonNegotiables(e.target.value)}
                className={styles.textarea}
                placeholder="Anotá acá tus límites no negociables..."
              />
            </div>

            {/* Mini-sección C: Empresas Objetivo */}
            <div className={styles.subSection}>
              <div className={styles.subSectionHeader}>
                <div className={styles.subSectionTitleRow}>
                  <Building2 size={16} color="#2563EB" />
                  <strong className={styles.subSectionTitle}>C. Empresas Objetivo (Prospección Activa)</strong>
                </div>
                <span className={styles.subSectionBadge} style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8' }}>
                  15 Empresas Diana
                </span>
              </div>
              <p className={styles.subSectionHint}>
                Organizaciones donde tu perfil resuelve una necesidad concreta para contactar a sus líderes de forma directa.
              </p>
              <textarea
                rows={4}
                value={targetCompanies}
                onChange={(e) => setTargetCompanies(e.target.value)}
                className={styles.textarea}
                placeholder="1. Empresa A&#10;2. Empresa B&#10;3. Empresa C..."
              />
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.saveBtn} disabled={isSaving}>
                <Save size={16} />
                <span>
                  {isSaving
                    ? 'Guardando en Base de Datos...'
                    : savedSuccess
                    ? '¡Guardado con éxito en DB!'
                    : 'Guardar Cambios del Perfil'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: CV File, Vocational Test Result & Certificates */}
        <div className={styles.rightCol}>
          {/* 1. CV File Card */}
          <div className={styles.sectionCard}>
            <h2 className={styles.cardTitle}>
              <FileText size={18} className={styles.cardIcon} />
              <span>Mi Currículum Actual (ATS)</span>
            </h2>

            <div className={styles.cvDisplayCard}>
              <FileText size={36} className={styles.cvBigIcon} />
              <div className={styles.cvInfo}>
                <strong className={styles.cvFileName}>{cvFileName}</strong>
                <span className={styles.cvFileMeta}>Última actualización: 12 de Agosto, 2025 · 184 KB</span>
              </div>
            </div>

            <div className={styles.cvActions}>
              <button
                type="button"
                className={styles.cvActionBtn}
                onClick={() => handleDownloadCert(`CV_${cvFileName}`)}
              >
                <Download size={15} />
                <span>Descargar CV</span>
              </button>

              <button
                type="button"
                className={styles.cvUploadBtn}
                onClick={() => {
                  const newName = prompt('Nombre de nuevo archivo:', 'Mi_Nuevo_CV_2025.pdf');
                  if (newName) setCvFileName(newName);
                }}
              >
                <Upload size={15} />
                <span>Reemplazar Archivo</span>
              </button>
            </div>
          </div>

          {/* 2. RESULTADO DEL TEST VOCACIONAL (EN EL MEDIO) */}
          <div className={styles.sectionCard}>
            <h2 className={styles.cardTitle}>
              <Compass size={18} className={styles.cardIcon} />
              <span>Resultado del Test Vocacional</span>
            </h2>

            {isDevMode ? (
              // Modo Dev: Simulamos que NO ha hecho el test
              <div className={styles.vocationalEmptyBox}>
                <Compass size={32} className={styles.vocationalEmptyIcon} />
                <h4 className={styles.vocationalEmptyTitle}>Test Vocacional Pendiente</h4>
                <p className={styles.vocationalEmptyDesc}>
                  Completá las 12 preguntas para descubrir tu arquetipo dominante y los roles con mayor proyección para tu perfil.
                </p>
                <button
                  type="button"
                  className={styles.startVocationalBtn}
                  onClick={onNavigateToVocationalTest}
                >
                  <Compass size={14} />
                  <span>Realizar Test Vocacional (5 min)</span>
                </button>
              </div>
            ) : (
              // Modo Alumno: Simulamos que SÍ tiene hecho el test con diagnóstico completo
              <div className={styles.vocationalResultBox}>
                <div className={styles.vocationalTopRow}>
                  <span className={styles.vocationalArchetypeBadge}>
                    <Sparkles size={12} />
                    <span>Arquetipo: Estratégico & Creativo</span>
                  </span>
                  <span className={styles.vocationalScoreTag}>92% Precisión</span>
                </div>

                <h4 className={styles.vocationalTitle}>
                  Estrategia & Innovación de Soluciones
                </h4>
                <p className={styles.vocationalDesc}>
                  Perfil orientado a liderar proyectos de transformación, prototipar soluciones de negocio y conectar necesidades de usuarios con objetivos comerciales.
                </p>

                <div className={styles.vocationalActionsRow}>
                  <button
                    type="button"
                    className={styles.viewFullReportBtn}
                    onClick={() => setShowVocationalModal(true)}
                  >
                    <span>Ver Diagnóstico Completo</span>
                    <ExternalLink size={13} />
                  </button>

                  <button
                    type="button"
                    className={styles.retakeTestBtn}
                    onClick={onNavigateToVocationalTest}
                    title="Volver a realizar la evaluación vocacional"
                  >
                    <span>Rehacer Test</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. Certificates Earned */}
          <div className={styles.sectionCard}>
            <h2 className={styles.cardTitle}>
              <Award size={18} className={styles.cardIcon} />
              <span>Certificados Emitidos & Logros</span>
            </h2>

            <div className={styles.certificatesList}>
              <div className={styles.certItem}>
                <div className={styles.certBadge}>
                  <Award size={16} />
                </div>
                <div className={styles.certText}>
                  <strong>Armado de CV ATS Profesional</strong>
                  <span>Aprobado el 10 de Agosto, 2025</span>
                </div>
                <button
                  type="button"
                  className={styles.certDownloadBtn}
                  onClick={() => handleDownloadCert('Armado de CV ATS Profesional')}
                >
                  <Download size={14} />
                  <span>PDF</span>
                </button>
              </div>

              <div className={styles.certItem}>
                <div className={styles.certBadge} style={{ backgroundColor: '#E0F2FE', color: '#0369A1' }}>
                  <Award size={16} />
                </div>
                <div className={styles.certText}>
                  <strong>LinkedIn SEO & Marca Personal</strong>
                  <span>Aprobado el 14 de Agosto, 2025</span>
                </div>
                <button
                  type="button"
                  className={styles.certDownloadBtn}
                  onClick={() => handleDownloadCert('LinkedIn SEO & Marca Personal')}
                >
                  <Download size={14} />
                  <span>PDF</span>
                </button>
              </div>

              <div className={styles.certItem}>
                <div className={styles.certBadge} style={{ backgroundColor: '#FEF3C7', color: '#B45309' }}>
                  <Award size={16} />
                </div>
                <div className={styles.certText}>
                  <strong>Experiencia Búsqueda Laboral Completa</strong>
                  <span>Programa Integral Acreditado</span>
                </div>
                <button
                  type="button"
                  className={styles.certDownloadBtn}
                  onClick={() => handleDownloadCert('Experiencia Búsqueda Laboral Integral')}
                >
                  <Download size={14} />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* FULL VOCATIONAL REPORT MODAL */}
      {showVocationalModal && (
        <div className={styles.reportModalOverlay} onClick={() => setShowVocationalModal(false)}>
          <div className={styles.reportModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.reportModalHeader}>
              <div>
                <span className={styles.vocationalArchetypeBadge}>
                  <Sparkles size={12} />
                  <span>Diagnóstico Vocacional de Alta Precisión</span>
                </span>
                <h3 className={styles.reportModalTitle}>Informe de Orientación Vocacional</h3>
              </div>
              <button
                type="button"
                className={styles.reportModalClose}
                onClick={() => setShowVocationalModal(false)}
                aria-label="Cerrar modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.dimensionSection}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.75rem' }}>
                Desglose de tus 4 Dimensiones Vocacionales:
              </h4>

              <div className={styles.dimensionItem}>
                <div className={styles.dimLabelRow}>
                  <span>Estratégico & Negocios (Dominante)</span>
                  <strong>42%</strong>
                </div>
                <div className={styles.dimBarTrack}>
                  <div className={styles.dimBarFill} style={{ width: '42%' }} />
                </div>
              </div>

              <div className={styles.dimensionItem}>
                <div className={styles.dimLabelRow}>
                  <span>Creativo & Innovador</span>
                  <strong>33%</strong>
                </div>
                <div className={styles.dimBarTrack}>
                  <div className={styles.dimBarFill} style={{ width: '33%', background: '#F43F5E' }} />
                </div>
              </div>

              <div className={styles.dimensionItem}>
                <div className={styles.dimLabelRow}>
                  <span>Analítico & Datos</span>
                  <strong>15%</strong>
                </div>
                <div className={styles.dimBarTrack}>
                  <div className={styles.dimBarFill} style={{ width: '15%', background: '#3B82F6' }} />
                </div>
              </div>

              <div className={styles.dimensionItem}>
                <div className={styles.dimLabelRow}>
                  <span>Personas & Relaciones</span>
                  <strong>10%</strong>
                </div>
                <div className={styles.dimBarTrack}>
                  <div className={styles.dimBarFill} style={{ width: '10%', background: '#10B981' }} />
                </div>
              </div>
            </div>

            <div className={styles.recommendedSection}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.5rem' }}>
                Roles con Mayor Afinidad para tu Búsqueda:
              </h4>
              <div className={styles.rolesGrid}>
                <span className={styles.roleTag}>Product Designer / UX Lead</span>
                <span className={styles.roleTag}>Product Operations Specialist</span>
                <span className={styles.roleTag}>Especialista en Growth & Estrategia</span>
                <span className={styles.roleTag}>Consultor de Transformación Digital</span>
              </div>
            </div>

            <div className={styles.reportFooter}>
              <button
                type="button"
                className={styles.viewFullReportBtn}
                onClick={() => setShowVocationalModal(false)}
              >
                <span>Cerrar Reporte</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
