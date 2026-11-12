'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Building2,
  Calendar,
  Sparkles,
  ExternalLink,
  Link as LinkIcon,
  Star,
  DollarSign,
  Briefcase,
  FileText,
  Clock,
  CalendarPlus,
  Table,
  ArrowLeft,
  ChevronDown,
  Check,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  getCampusInitialDataAction,
  saveJobApplicationAction,
  deleteJobApplicationAction,
  toggleJobApplicationFavoriteAction,
} from '@/actions/campus';
import styles from './CampusTracker.module.css';

export type JobApplicationStatus =
  | 'Por postular'
  | 'Postulado'
  | 'Contactado'
  | 'Entrevista'
  | 'Oferta'
  | 'Cerrado'
  | 'Logrado';

export const STATUS_LIST: JobApplicationStatus[] = [
  'Por postular',
  'Postulado',
  'Contactado',
  'Entrevista',
  'Oferta',
  'Cerrado',
  'Logrado',
];

export const STATUS_CONFIG: Record<
  JobApplicationStatus,
  { label: JobApplicationStatus; className: string; dotColor: string }
> = {
  'Por postular': {
    label: 'Por postular',
    className: styles.statusPorPostular || '',
    dotColor: '#64748B', // gris
  },
  'Postulado': {
    label: 'Postulado',
    className: styles.statusPostulado || '',
    dotColor: '#EAB308', // amarillo
  },
  'Contactado': {
    label: 'Contactado',
    className: styles.statusContactado || '',
    dotColor: '#0284C7', // azul
  },
  'Entrevista': {
    label: 'Entrevista',
    className: styles.statusEntrevista || '',
    dotColor: '#7C3AED', // violeta
  },
  'Oferta': {
    label: 'Oferta',
    className: styles.statusOferta || '',
    dotColor: '#22C55E', // verde
  },
  'Cerrado': {
    label: 'Cerrado',
    className: styles.statusCerrado || '',
    dotColor: '#EF4444', // rojo
  },
  'Logrado': {
    label: 'Logrado',
    className: styles.statusLogrado || '',
    dotColor: '#CA8A04', // amarillo fuerte
  },
};

export function normalizeStatus(st: string | null | undefined): JobApplicationStatus {
  if (!st) return 'Por postular';
  const s = st.trim().toLowerCase();
  if (s.includes('identificada') || s.includes('por postular')) return 'Por postular';
  if (s.includes('postulado')) return 'Postulado';
  if (s.includes('contactado') || s.includes('contacto')) return 'Contactado';
  if (s.includes('entrevista') || s.includes('prueba')) return 'Entrevista';
  if (s.includes('oferta')) return 'Oferta';
  if (s.includes('descartado') || s.includes('cerrado') || s.includes('rechazado')) return 'Cerrado';
  if (s.includes('logrado') || s.includes('ganado') || s.includes('contratado')) return 'Logrado';
  return 'Por postular';
}

interface StatusDropdownProps {
  value: JobApplicationStatus;
  onChange: (newStatus: JobApplicationStatus) => void;
}

interface MenuCoords {
  top?: number;
  bottom?: number;
  left: number;
}

function StatusDropdown({ value, onChange }: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuCoords, setMenuCoords] = useState<MenuCoords | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const safeVal = normalizeStatus(value);
  const currentCfg = STATUS_CONFIG[safeVal] || STATUS_CONFIG['Por postular'];

  const computeCoords = useCallback((): MenuCoords | null => {
    if (!triggerRef.current) return null;
    const rect = triggerRef.current.getBoundingClientRect();
    const menuWidth = 220;
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < 280;
    const clampedLeft = Math.max(8, Math.min(rect.left, window.innerWidth - menuWidth - 8));

    if (openUp) {
      return {
        bottom: window.innerHeight - rect.top + 6,
        left: clampedLeft,
      };
    }
    return {
      top: rect.bottom + 6,
      left: clampedLeft,
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOpen) {
      setMenuCoords(computeCoords());
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      const inTrigger = dropdownRef.current?.contains(target);
      const inMenu = menuRef.current?.contains(target);
      if (!inTrigger && !inMenu) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const handlePositionUpdate = () => {
      setMenuCoords(computeCoords());
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handlePositionUpdate, true);
    window.addEventListener('resize', handlePositionUpdate);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handlePositionUpdate, true);
      window.removeEventListener('resize', handlePositionUpdate);
    };
  }, [isOpen, computeCoords]);

  return (
    <div className={styles.statusCellWrapper} ref={dropdownRef}>
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.statusTriggerBtn} ${currentCfg.className}`}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.statusTriggerContent}>
          <span
            className={styles.statusDot}
            style={{ backgroundColor: currentCfg.dotColor }}
          />
          <span className={styles.statusLabelText}>{currentCfg.label}</span>
        </span>
        <ChevronDown
          size={13}
          className={`${styles.statusChevron} ${isOpen ? styles.statusChevronOpen : ''}`}
        />
      </button>

      {isOpen &&
        menuCoords &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={menuRef}
            className={styles.statusMenu}
            style={{
              top: menuCoords.top !== undefined ? `${menuCoords.top}px` : 'auto',
              bottom: menuCoords.bottom !== undefined ? `${menuCoords.bottom}px` : 'auto',
              left: `${menuCoords.left}px`,
            }}
            role="listbox"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.statusMenuHeader}>Cambiar estado</div>
            {STATUS_LIST.map((st) => {
              const cfg = STATUS_CONFIG[st];
              const isSelected = st === safeVal;
              return (
                <button
                  key={st}
                  type="button"
                  className={`${styles.statusMenuItem} ${isSelected ? styles.statusMenuItemActive : ''}`}
                  onClick={() => {
                    onChange(st);
                    setIsOpen(false);
                  }}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className={styles.statusMenuItemLeft}>
                    <span
                      className={styles.statusMenuItemDot}
                      style={{ backgroundColor: cfg.dotColor }}
                    />
                    <span>{cfg.label}</span>
                  </span>
                  {isSelected && <Check size={14} className={styles.statusCheckIcon} />}
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </div>
  );
}

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  status: JobApplicationStatus;
  salary: string;
  date: string;
  notes: string;
  jobUrl?: string;
  isFavorite?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'zoom' | 'entrevista' | 'prueba' | 'seguimiento';
  date: string; // YYYY-MM-DD
  time: string;
  notes?: string;
  company?: string;
}

const initialApplications: JobApplication[] = [
  {
    id: '1',
    company: 'Mercado Libre',
    role: 'Especialista en Marketing B2B',
    status: 'Entrevista',
    salary: '$1.400.000 ARS',
    date: '12 Ago 2026',
    notes: 'Aplicado con CV ATS Editorial y mensaje personalizado al selector.',
    jobUrl: 'https://mercadolibre.com/careers/marketing-b2b',
    isFavorite: false,
  },
  {
    id: '2',
    company: 'Globant',
    role: 'Product Operations Analyst',
    status: 'Contactado',
    salary: '$1.650 USD / mes',
    date: '08 Ago 2026',
    notes: 'Uso de método STAR para responder las preguntas de screening.',
    jobUrl: 'https://globant.com/jobs/product-operations',
    isFavorite: false,
  },
  {
    id: '3',
    company: 'Auth0 / Okta',
    role: 'Talent Acquisition Partner',
    status: 'Por postular',
    salary: '$2.000 USD / mes',
    date: '14 Ago 2026',
    notes: 'Vacante detectada en LinkedIn. Adaptando CV con keywords en inglés antes de enviar.',
    jobUrl: 'https://auth0.com/careers/talent-partner',
    isFavorite: false,
  },
  {
    id: '4',
    company: 'Ualá',
    role: 'Content & Brand Strategist',
    status: 'Oferta',
    salary: '$1.800.000 ARS',
    date: '28 Jul 2026',
    notes: 'Técnica de anclaje alto aplicada en la llamada salarial.',
    jobUrl: 'https://uala.com.ar/careers/brand-strategist',
    isFavorite: false,
  },
];

const LOCAL_STORAGE_KEY = 'campus_job_applications_v5';
export interface CalendarPrefillData {
  title?: string;
  company?: string;
  notes?: string;
  type?: 'entrevista' | 'prueba' | 'seguimiento';
}

interface ApplicationFormPayload {
  editingId?: string;
  company: string;
  role: string;
  salary: string;
  status: JobApplicationStatus;
  date: string;
  notes: string;
  jobUrl: string;
  isFavorite: boolean;
  autoScheduleInCalendar: boolean;
}

interface ApplicationModalProps {
  initialApp: JobApplication | null;
  onClose: () => void;
  onSave: (data: ApplicationFormPayload) => void;
}

function ApplicationModal({ initialApp, onClose, onSave }: ApplicationModalProps) {
  const [company, setCompany] = useState(() => (initialApp && initialApp.company !== '-' ? initialApp.company : ''));
  const [role, setRole] = useState(() => (initialApp && initialApp.role !== '-' ? initialApp.role : ''));
  const [salary, setSalary] = useState(() => (initialApp && initialApp.salary !== '-' ? initialApp.salary : ''));
  const [status, setStatus] = useState<JobApplicationStatus>(() => (initialApp ? initialApp.status : 'Por postular'));
  const [date] = useState(() => (initialApp ? initialApp.date : 'Hoy'));
  const [notes, setNotes] = useState(() => (initialApp && initialApp.notes !== '-' ? initialApp.notes : ''));
  const [jobUrl, setJobUrl] = useState(() => (initialApp && initialApp.jobUrl !== '-' ? initialApp.jobUrl || '' : ''));
  const [isFavorite, setIsFavorite] = useState(() => (initialApp ? !!initialApp.isFavorite : false));
  const [autoScheduleInCalendar, setAutoScheduleInCalendar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;
    onSave({
      editingId: initialApp?.id,
      company: company.trim(),
      role: role.trim(),
      salary: salary.trim() || '-',
      status,
      date: date || 'Hoy',
      notes: notes.trim() || '-',
      jobUrl: jobUrl.trim() || '-',
      isFavorite,
      autoScheduleInCalendar,
    });
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderInfo}>
            <div className={styles.modalPillBadge}>
              <Sparkles size={13} />
              <span>GESTOR DE POSTULACIONES</span>
            </div>
            <h3 className={styles.modalTitle}>
              {initialApp ? 'Editar Postulación' : 'Registrar Nueva Postulación'}
            </h3>
            <p className={styles.modalSubtitle}>
              Cargá los detalles de la vacante para hacer seguimiento inteligente de tus búsquedas.
            </p>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>
                <Building2 size={14} className={styles.labelIconCompany} />
                <span>Empresa *</span>
              </label>
              <input
                type="text"
                required
                maxLength={100}
                placeholder="Ej. Mercado Libre, Globant, Startup..."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={styles.didacticInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>
                <Briefcase size={14} className={styles.labelIconRole} />
                <span>Puesto / Rol *</span>
              </label>
              <input
                type="text"
                required
                maxLength={100}
                placeholder="Ej. Product Designer, HR Specialist..."
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={styles.didacticInput}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>
                <Clock size={14} className={styles.labelIconStatus} />
                <span>Estado Actual</span>
              </label>
              <StatusDropdown
                value={status}
                onChange={(newStatus) => setStatus(newStatus)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>
                <DollarSign size={14} className={styles.labelIconSalary} />
                <span>Remuneración Pretendida / Ofertada</span>
              </label>
              <input
                type="text"
                maxLength={80}
                placeholder="Ej. $1.500.000 ARS o $1.800 USD (opcional)"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className={styles.didacticInput}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.fieldLabel}>
              <LinkIcon size={14} className={styles.labelIconLink} />
              <span>URL de la Vacante (Enlace donde viste el aviso)</span>
            </label>
            <div className={styles.urlInputWrap}>
              <input
                type="url"
                maxLength={500}
                placeholder="https://www.linkedin.com/jobs/view/... o portal de empleo (opcional)"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                className={styles.didacticInput}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.fieldLabel}>
              <FileText size={14} className={styles.labelIconNotes} />
              <span>Notas de Seguimiento & Estrategia</span>
            </label>
            <textarea
              rows={2}
              maxLength={1000}
              placeholder="Ej. Versión de CV enviada, feedback recibido, contacto de reclutador... (opcional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={styles.didacticTextarea}
            />
          </div>

          <div className={styles.modalOptionsRow}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={isFavorite}
                onChange={(e) => setIsFavorite(e.target.checked)}
                className={styles.checkboxInput}
              />
              <Star size={15} fill={isFavorite ? '#F59E0B' : 'none'} color="#D97706" />
              <span>Marcar como postulación prioritaria (Favorita ⭐)</span>
            </label>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={autoScheduleInCalendar}
                onChange={(e) => setAutoScheduleInCalendar(e.target.checked)}
                className={styles.checkboxInput}
              />
              <CalendarPlus size={15} color="#7C3AED" />
              <span>Agendar recordatorio en mi Calendario</span>
            </label>
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.submitModalBtn}>
              <Sparkles size={15} />
              <span>{initialApp ? 'Actualizar Postulación' : 'Guardar Postulación'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface CampusTrackerProps {
  onNavigateToAgenda?: (prefill?: CalendarPrefillData) => void;
  onBackToDashboard?: () => void;
}

export function CampusTracker({ onNavigateToAgenda, onBackToDashboard }: CampusTrackerProps) {
  const { user } = useAuth();
  const activeEmail = user?.email || 'santiago.morales@ejemplo.com';

  const [applications, setApplications] = useState<JobApplication[]>(initialApplications);
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    editingApp: JobApplication | null;
  }>({ isOpen: false, editingApp: null });

  // Load from database on mount (with localStorage fallback)
  useEffect(() => {
    async function loadData() {
      try {
        const res = await getCampusInitialDataAction(activeEmail);
        if (res.success && res.data && res.data.jobApplications.length > 0) {
          setApplications(res.data.jobApplications);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(res.data.jobApplications));
          return;
        }
      } catch (e) {
        console.error('Error cargando postulaciones desde DB:', e);
      }

      try {
        localStorage.removeItem('campus_job_applications_v4');
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setApplications(parsed.map((a: JobApplication) => ({ ...a, isFavorite: false })));
          }
        }
      } catch {
        // ignore localStorage errors
      }
    }
    loadData();
  }, [activeEmail]);

  // Helper to persist to localStorage & state
  const persistApplications = (newApps: JobApplication[]) => {
    setApplications(newApps);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newApps));
    } catch {
      // ignore localStorage errors
    }
  };

  const toggleFavorite = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = applications.map((a) =>
      a.id === id ? { ...a, isFavorite: !a.isFavorite } : a
    );
    persistApplications(updated);

    try {
      await toggleJobApplicationFavoriteAction(activeEmail, id);
    } catch (err) {
      console.warn('Error al actualizar favorito en DB:', err);
    }
  };

  const handleOpenAddModal = () => {
    setModalState({ isOpen: true, editingApp: null });
  };

  const handleOpenEditModal = (app: JobApplication) => {
    setModalState({ isOpen: true, editingApp: app });
  };

  const handleScheduleFromRow = (app: JobApplication, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onNavigateToAgenda) {
      onNavigateToAgenda({
        title: `💼 Entrevista con ${app.company} (${app.role})`,
        company: app.company === '-' ? '' : app.company,
        notes: app.notes && app.notes !== '-' ? app.notes : `Proceso de selección para el puesto de ${app.role}`,
        type: 'entrevista',
      });
    }
  };

  const handleSaveApplication = async (formData: ApplicationFormPayload) => {
    const targetEditId = formData.editingId;
    const tempId = 'temp-' + Date.now().toString();

    const payload = {
      id: targetEditId || undefined,
      company: formData.company,
      role: formData.role,
      salary: formData.salary,
      status: formData.status,
      date: formData.date || 'Hoy',
      notes: formData.notes,
      jobUrl: formData.jobUrl,
      isFavorite: formData.isFavorite,
    };

    if (targetEditId) {
      const updated: JobApplication[] = applications.map((app) =>
        app.id === targetEditId ? { ...app, ...payload, id: targetEditId } : app
      );
      persistApplications(updated);
    } else {
      const newApp: JobApplication = {
        id: tempId,
        company: formData.company,
        role: formData.role,
        salary: formData.salary,
        status: formData.status,
        date: 'Hoy',
        notes: formData.notes,
        jobUrl: formData.jobUrl,
        isFavorite: formData.isFavorite,
      };
      persistApplications([newApp, ...applications]);
    }

    setModalState({ isOpen: false, editingApp: null });

    // Save to DB in background
    try {
      const res = await saveJobApplicationAction(activeEmail, payload);
      if (res.success && res.data) {
        setApplications((prev) =>
          prev.map((a) => (a.id === targetEditId || a.id === tempId ? res.data! : a))
        );
      }
    } catch (err) {
      console.warn('Error al guardar en base de datos:', err);
    }

    if (formData.autoScheduleInCalendar && onNavigateToAgenda) {
      onNavigateToAgenda({
        title: `💼 Postulación: ${formData.company} (${formData.role})`,
        company: formData.company,
        notes: formData.notes !== '-' ? formData.notes : 'Seguimiento de postulación',
        type: 'seguimiento',
      });
    }
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = applications.filter((a) => a.id !== id);
    persistApplications(updated);

    try {
      await deleteJobApplicationAction(activeEmail, id);
    } catch (err) {
      console.warn('Error al eliminar postulación en DB:', err);
    }
  };

  const handleStatusChange = async (id: string, newStatus: JobApplication['status']) => {
    const updated = applications.map((a) => (a.id === id ? { ...a, status: newStatus } : a));
    persistApplications(updated);

    const targetApp = updated.find((a) => a.id === id);
    if (targetApp) {
      try {
        await saveJobApplicationAction(activeEmail, {
          id: targetApp.id,
          company: targetApp.company,
          role: targetApp.role,
          status: newStatus,
          salary: targetApp.salary,
          date: targetApp.date,
          notes: targetApp.notes,
          jobUrl: targetApp.jobUrl,
          isFavorite: targetApp.isFavorite,
        });
      } catch (err) {
        console.warn('Error al actualizar estado en DB:', err);
      }
    }
  };

  const filtered = applications.filter((a) => {
    if (filterStatus === 'todos') return true;
    if (filterStatus === 'favoritas') return !!a.isFavorite;
    return a.status === filterStatus;
  });

  // Metrics summary
  const favoritesCount = applications.filter((a) => a.isFavorite).length;
  const interviewsCount = applications.filter(
    (a) => a.status === 'Entrevista' || a.status === 'Contactado'
  ).length;
  const offersCount = applications.filter(
    (a) => a.status === 'Oferta' || a.status === 'Logrado'
  ).length;

  return (
    <div className={styles.trackerWrapper}>
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
      <div className={styles.trackerHeader}>
        <div>
          <div className={styles.headerBadge}>
            <Table size={13} className={styles.sparkleIcon} />
            <span>HERRAMIENTA DE GESTIÓN</span>
          </div>
          <h2 className={styles.trackerTitle}>Mi Tracker de Búsquedas Activas</h2>
          <p className={styles.trackerSubtitle}>
            Gestioná y actualizá tus postulaciones en un solo lugar. Marcá con estrella tus favoritas, guardá enlaces directos a las vacantes y agendá entrevistas.
          </p>
        </div>

        <div className={styles.headerRightActions}>
          <div className={styles.countPill}>
            <Sparkles size={14} />
            <span>{applications.length} postulaciones registradas</span>
          </div>
          <button
            type="button"
            className={styles.addBtn}
            onClick={handleOpenAddModal}
          >
            <Plus size={16} />
            <span>Nueva Postulación</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className={styles.metricsRow}>
        <div className={styles.metricCard}>
          <div className={styles.metricIconWrap}>
            <Building2 size={18} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>Total Postulaciones</span>
            <strong className={styles.metricVal}>{applications.length}</strong>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={`${styles.metricIconWrap} ${styles.metricIconInterview}`}>
            <Calendar size={18} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>En Proceso / Entrevistas</span>
            <strong className={styles.metricVal}>{interviewsCount}</strong>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={`${styles.metricIconWrap} ${styles.metricIconOffer}`}>
            <CheckCircle2 size={18} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>Ofertas Recibidas</span>
            <strong className={styles.metricVal}>{offersCount}</strong>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={`${styles.metricIconWrap} ${styles.metricIconFav}`}>
            <Star size={18} />
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricLabel}>Prioridad / Favoritas</span>
            <strong className={styles.metricVal}>{favoritesCount}</strong>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterRow}>
        <div className={styles.filterPills}>
          {(['todos', 'favoritas', ...STATUS_LIST] as const).map(
            (st) => (
              <button
                key={st}
                type="button"
                className={`${styles.filterPill} ${filterStatus === st ? styles.filterPillActive : ''} ${st === 'favoritas' ? styles.filterPillFav : ''}`}
                onClick={() => setFilterStatus(st)}
              >
                {st === 'todos'
                  ? `Todas (${applications.length})`
                  : st === 'favoritas'
                    ? `⭐ Favoritas (${favoritesCount})`
                    : st}
              </button>
            )
          )}
        </div>
      </div>

      {/* Applications Table (Fixed Layout) */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thCompany}>Empresa & Puesto</th>
              <th className={styles.thStatus}>Estado Actual</th>
              <th className={styles.thSalary}>Remuneración</th>
              <th className={styles.thNotes}>Notas</th>
              <th className={styles.thJobUrl}>URL de la Vacante</th>
              <th className={styles.thActions}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((app) => {
                const hasValidUrl = app.jobUrl && app.jobUrl.trim() !== '' && app.jobUrl !== '-';
                const formattedUrl = hasValidUrl
                  ? app.jobUrl!.startsWith('http://') || app.jobUrl!.startsWith('https://')
                    ? app.jobUrl!
                    : `https://${app.jobUrl!}`
                  : null;

                return (
                  <tr key={app.id}>
                    <td className={styles.tdCompany}>
                      <div className={styles.companyCell}>
                        <div className={styles.companyNameRow}>
                          <button
                            type="button"
                            className={`${styles.starBtn} ${app.isFavorite ? styles.starBtnActive : ''}`}
                            onClick={(e) => toggleFavorite(app.id, e)}
                            title={app.isFavorite ? 'Quitar de favoritas' : 'Marcar como favorita'}
                            aria-label="Marcar como favorita"
                          >
                            <Star size={15} fill={app.isFavorite ? '#F59E0B' : 'none'} />
                          </button>
                          <strong className={styles.companyName}>{app.company || '-'}</strong>
                        </div>
                        <span className={styles.roleName}>{app.role || '-'}</span>
                        <div className={styles.companyMetaRow}>
                          <span className={styles.dateLabel}>{app.date || '-'}</span>
                        </div>
                      </div>
                    </td>
                    <td className={styles.tdStatus}>
                      <StatusDropdown
                        value={app.status}
                        onChange={(newStatus) => handleStatusChange(app.id, newStatus)}
                      />
                    </td>
                    <td className={styles.tdSalary}>
                      <span className={styles.salaryText}>{app.salary || '-'}</span>
                    </td>
                    <td className={styles.tdNotes} title={app.notes && app.notes !== '-' ? app.notes : undefined}>
                      <span className={styles.notesText}>{app.notes || '-'}</span>
                    </td>
                    <td className={styles.tdJobUrl}>
                      {formattedUrl ? (
                        <a
                          href={formattedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.jobUrlCellBtn}
                          title="Abrir publicación original de la vacante"
                        >
                          <ExternalLink size={12} />
                          <span>Ver vacante</span>
                        </a>
                      ) : (
                        <span className={styles.noUrlText}>-</span>
                      )}
                    </td>
                    <td className={styles.tdActions}>
                      <div className={styles.actionButtonsRow}>
                        <button
                          type="button"
                          className={styles.scheduleRowBtn}
                          onClick={(e) => handleScheduleFromRow(app, e)}
                          title="Agendar esta entrevista en tu Calendario"
                          aria-label="Agendar en calendario"
                        >
                          <CalendarPlus size={14} />
                          <span>Agendar</span>
                        </button>

                        <button
                          type="button"
                          className={styles.editBtn}
                          onClick={() => handleOpenEditModal(app)}
                          title="Editar todos los datos de esta postulación"
                          aria-label="Editar postulación"
                        >
                          <Edit2 size={14} />
                        </button>

                        <button
                          type="button"
                          className={styles.deleteBtn}
                          onClick={(e) => handleDelete(app.id, e)}
                          title="Eliminar postulación"
                          aria-label="Eliminar postulación"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className={styles.emptyTable}>
                  No hay postulaciones registradas en esta categoría.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* COLORFUL & DIDACTIC MODAL (isolated state for 0 lag typing) */}
      {modalState.isOpen && (
        <ApplicationModal
          key={modalState.editingApp?.id || 'new'}
          initialApp={modalState.editingApp}
          onClose={() => setModalState({ isOpen: false, editingApp: null })}
          onSave={handleSaveApplication}
        />
      )}
    </div>
  );
}
