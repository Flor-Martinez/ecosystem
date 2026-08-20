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
} from 'lucide-react';
import { LinkedinIcon } from '@/components/ui/Icons';
import { useAuth } from '@/context/AuthContext';
import { getCampusInitialDataAction, saveStudentProfileAction } from '@/actions/campus';
import styles from './EblStudentProfileView.module.css';

interface EblStudentProfileViewProps {
  onBackToDashboard: () => void;
}

export function EblStudentProfileView({ onBackToDashboard }: EblStudentProfileViewProps) {
  const { user } = useAuth();
  const activeEmail = user?.email || 'santiago.morales@ejemplo.com';

  const [fullName, setFullName] = useState(user?.name || 'Santiago Morales');
  const [email, setEmail] = useState(user?.email || 'santiago.morales@ejemplo.com');
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/in/santiago-martinez-demo');
  const [targetRole, setTargetRole] = useState('Product Designer / UX Lead');
  const [seniority, setSeniority] = useState('Senior');
  const [modality, setModality] = useState('100% Remoto (Latam / Global)');
  const [expectedSalary, setExpectedSalary] = useState('$2.200 USD / mes');
  const [cvFileName, setCvFileName] = useState('CV_Santiago_Martinez_ATS_2025.pdf');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
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
            Mantené actualizado tu perfil para que nuestro equipo pueda auditar tus documentos en los Zooms semanales y recomendarte búsquedas acordes a tu seniority.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className={styles.profileGrid}>
        {/* Left Column: Personal Data & Job Preferences */}
        <div className={styles.leftCol}>
          <div className={styles.sectionCard}>
            <h2 className={styles.cardTitle}>
              <UserCheck size={18} className={styles.cardIcon} />
              <span>Información Profesional</span>
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

            <div className={styles.divider} />

            <h2 className={styles.cardTitle}>
              <Target size={18} className={styles.cardIcon} />
              <span>Objetivo de Búsqueda Laboral</span>
            </h2>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Rol al que aspirás *</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Seniority</label>
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
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Modalidad de Trabajo</label>
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

              <div className={styles.formGroup}>
                <label>Aspiración Salarial Neta</label>
                <input
                  type="text"
                  value={expectedSalary}
                  onChange={(e) => setExpectedSalary(e.target.value)}
                  className={styles.input}
                  placeholder="Ej. $1.800 USD o $2.500.000 ARS"
                />
              </div>
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

        {/* Right Column: CV File & Certificates */}
        <div className={styles.rightCol}>
          {/* CV File Card */}
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

          {/* Certificates Earned */}
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
    </div>
  );
}
