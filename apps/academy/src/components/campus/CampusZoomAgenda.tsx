'use client';

import React, { useState, useEffect } from 'react';
import {
  Video,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  Sparkles,
  PlayCircle,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  CalendarDays,
  Building2,
  FileText,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  getCampusInitialDataAction,
  saveCalendarEventAction,
  deleteCalendarEventAction,
} from '@/actions/campus';
import styles from './CampusZoomAgenda.module.css';

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'zoom' | 'entrevista' | 'prueba' | 'seguimiento';
  date: string; // YYYY-MM-DD
  time: string;
  notes?: string;
  company?: string;
  zoomLink?: string;
}

const defaultEvents: CalendarEvent[] = [
  {
    id: 'zoom-aug-20',
    title: '🎙️ Zoom Semanal: Mentoría y Consultas en Vivo',
    type: 'zoom',
    date: '2025-08-20',
    time: '19:00 hs (Arg/Uru) · 17:00 hs (Col/Per)',
    notes: 'Espacio semanal de resolución de dudas, consultas y feedback en vivo con Flor Martínez.',
    zoomLink: 'https://zoom.us/j/mock-academia-flor-martinez',
  },
  {
    id: 'zoom-aug-27',
    title: '🎙️ Zoom Semanal: Mentoría y Consultas en Vivo',
    type: 'zoom',
    date: '2025-08-27',
    time: '19:00 hs (Arg/Uru) · 17:00 hs (Col/Per)',
    notes: 'Espacio semanal de resolución de dudas, consultas y feedback en vivo con Flor Martínez.',
    zoomLink: 'https://zoom.us/j/mock-academia-flor-martinez',
  },
  {
    id: 'zoom-sep-03',
    title: '🎙️ Zoom Semanal: Mentoría y Consultas en Vivo',
    type: 'zoom',
    date: '2025-09-03',
    time: '19:00 hs (Arg/Uru) · 17:00 hs (Col/Per)',
    notes: 'Espacio semanal de resolución de dudas, consultas y feedback en vivo con Flor Martínez.',
    zoomLink: 'https://zoom.us/j/mock-academia-flor-martinez',
  },
  {
    id: 'ent-1',
    title: '💼 Entrevista con Mercado Libre (Especialista en Marketing)',
    type: 'entrevista',
    date: '2025-08-21',
    time: '15:00 hs (Arg)',
    company: 'Mercado Libre',
    notes: 'Llamada con Hiring Manager sobre proyectos B2B.',
  },
];

const pastRecordings = [
  {
    id: 'past-1',
    date: 'Miércoles 13 de Agosto de 2025',
    title: 'Sesión en Vivo — 13 de Agosto',
    duration: '1h 15m',
    description: 'Espacio de resolución de dudas y consultas de alumnos en vivo.',
  },
  {
    id: 'past-2',
    date: 'Miércoles 06 de Agosto de 2025',
    title: 'Sesión en Vivo — 06 de Agosto',
    duration: '1h 22m',
    description: 'Espacio de resolución de dudas y consultas de alumnos en vivo.',
  },
  {
    id: 'past-3',
    date: 'Miércoles 30 de Julio de 2025',
    title: 'Sesión en Vivo — 30 de Julio',
    duration: '1h 10m',
    description: 'Espacio de resolución de dudas y consultas de alumnos en vivo.',
  },
];

const CALENDAR_STORAGE_KEY = 'campus_agenda_events_v2';

interface CampusZoomAgendaProps {
  onBackToDashboard?: () => void;
}

export function CampusZoomAgenda({ onBackToDashboard }: CampusZoomAgendaProps = {}) {
  const { user } = useAuth();
  const activeEmail = user?.email || 'santiago.morales@ejemplo.com';

  const [events, setEvents] = useState<CalendarEvent[]>(defaultEvents);
  const [selectedDate, setSelectedDate] = useState<string>('2025-08-20');
  const [currentMonth, setCurrentMonth] = useState({ year: 2025, month: 7 }); // 0-indexed: 7 = August

  // Modal New Event
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<CalendarEvent['type']>('entrevista');
  const [newDate, setNewDate] = useState('2025-08-20');
  const [newTime, setNewTime] = useState('15:00 hs');
  const [newCompany, setNewCompany] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newZoomLink, setNewZoomLink] = useState('');

  // Load from database on mount (with localStorage fallback)
  useEffect(() => {
    async function loadData() {
      try {
        const res = await getCampusInitialDataAction(activeEmail);
        if (res.success && res.data && res.data.calendarEvents.length > 0) {
          // Merge with default zoom events so students always see live weekly sessions
          const dbEvents = res.data.calendarEvents;
          const merged: CalendarEvent[] = [...dbEvents];
          defaultEvents.forEach((defEv) => {
            if (!merged.some((e) => e.id === defEv.id || (e.title === defEv.title && e.date === defEv.date))) {
              merged.push(defEv);
            }
          });
          setEvents(merged);
          localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(merged));
        } else {
          const saved = localStorage.getItem(CALENDAR_STORAGE_KEY);
          if (saved) {
            try {
              setEvents(JSON.parse(saved));
            } catch {
              // ignore
            }
          }
        }
      } catch (err) {
        console.error('Error cargando eventos de la agenda:', err);
      }
    }
    loadData();
  }, [activeEmail]);

  // Helper functions for calendar
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => {
    const d = new Date(y, m, 1).getDay();
    return d === 0 ? 6 : d - 1; // Mon=0, Sun=6
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const handleOpenAddModal = (forDate?: string) => {
    setNewDate(forDate || selectedDate);
    setNewTitle('');
    setNewType('entrevista');
    setNewTime('15:00 hs');
    setNewCompany('');
    setNewNotes('');
    setNewZoomLink('');
    setShowAddModal(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEv: CalendarEvent = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      type: newType,
      date: newDate,
      time: newTime.trim() || '12:00 hs',
      company: newCompany.trim() || undefined,
      notes: newNotes.trim() || undefined,
      zoomLink: newZoomLink.trim() || undefined,
    };

    const updated = [...events, newEv];
    setEvents(updated);
    localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(updated));
    setShowAddModal(false);

    try {
      await saveCalendarEventAction(activeEmail, newEv);
    } catch (err) {
      console.error('Error guardando evento en DB:', err);
    }
  };

  const handleDeleteEvent = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = events.filter((ev) => ev.id !== id);
    setEvents(updated);
    localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(updated));

    try {
      await deleteCalendarEventAction(activeEmail, id);
    } catch (err) {
      console.error('Error eliminando evento en DB:', err);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth.month === 0) {
      setCurrentMonth({ year: currentMonth.year - 1, month: 11 });
    } else {
      setCurrentMonth({ year: currentMonth.year, month: currentMonth.month - 1 });
    }
  };

  const handleNextMonth = () => {
    if (currentMonth.month === 11) {
      setCurrentMonth({ year: currentMonth.year + 1, month: 0 });
    } else {
      setCurrentMonth({ year: currentMonth.year, month: currentMonth.month + 1 });
    }
  };

  const { year, month } = currentMonth;
  const totalDays = getDaysInMonth(year, month);
  const startDay = getFirstDayOfMonth(year, month);

  const calendarDays = [];
  for (let i = 0; i < startDay; i++) calendarDays.push(null);
  for (let d = 1; d <= totalDays; d++) {
    const fd = d < 10 ? `0${d}` : `${d}`;
    const fm = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
    calendarDays.push({ day: d, dateStr: `${year}-${fm}-${fd}` });
  }

  const selectedDateEvents = events.filter((e) => e.date === selectedDate);

  return (
    <div className={styles.agendaWrapper}>
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
      <div className={styles.agendaHeader}>
        <div>
          <div className={styles.headerBadge}>
            <CalendarDays size={13} />
            <span>CRONOGRAMA DE POSTULACIONES</span>
          </div>
          <h2 className={styles.agendaTitle}>Agenda & Calendario de Entrevistas</h2>
          <p className={styles.agendaSubtitle}>
            Seguimiento de tus entrevistas laborales agendadas, fechas de pruebas técnicas y recordatorios de tus procesos de selección.
          </p>
        </div>
      </div>

      <div className={styles.calendarLayoutGrid}>
          {/* LEFT: Interactive Month Calendar */}
          <div className={styles.calendarCard}>
            <div className={styles.calendarHeaderRow}>
              <div className={styles.monthNav}>
                <button
                  type="button"
                  className={styles.navMonthBtn}
                  onClick={handlePrevMonth}
                  aria-label="Mes anterior"
                >
                  <ChevronLeft size={16} />
                </button>
                <strong className={styles.monthTitle}>
                  {monthNames[currentMonth.month]} {currentMonth.year}
                </strong>
                <button
                  type="button"
                  className={styles.navMonthBtn}
                  onClick={handleNextMonth}
                  aria-label="Mes siguiente"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <button
                type="button"
                className={styles.addEventBtn}
                onClick={() => {
                  setNewDate(selectedDate || '2025-08-20');
                  setShowAddModal(true);
                }}
              >
                <Plus size={15} />
                <span>Agregar Evento</span>
              </button>
            </div>

            {/* Weekdays row */}
            <div className={styles.weekdaysGrid}>
              {['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'].map((w) => (
                <span key={w} className={styles.weekdayName}>
                  {w}
                </span>
              ))}
            </div>

            {/* Days grid */}
            <div className={styles.daysGrid}>
              {calendarDays.map((item, idx) => {
                if (!item) {
                  return <div key={`empty-${idx}`} className={styles.emptyDayCell} />;
                }

                const dayEvents = events.filter((e) => e.date === item.dateStr);
                const hasZoom = dayEvents.some((e) => e.type === 'zoom');
                const hasInterview = dayEvents.some((e) => e.type === 'entrevista' || e.type === 'prueba' || e.type === 'seguimiento');
                const isSelected = selectedDate === item.dateStr;

                return (
                  <button
                    key={item.dateStr}
                    type="button"
                    className={`${styles.dayCell} ${isSelected ? styles.dayCellSelected : ''} ${dayEvents.length > 0 ? styles.dayCellHasEvents : ''}`}
                    onClick={() => setSelectedDate(item.dateStr)}
                  >
                    <span className={styles.dayNum}>{item.day}</span>
                    <div className={styles.dayDotsRow}>
                      {hasZoom && <span className={`${styles.dot} ${styles.dotZoom}`} title="Zoom Semanal" />}
                      {hasInterview && <span className={`${styles.dot} ${styles.dotInterview}`} title="Entrevista Laboral" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className={styles.calendarLegend}>
              <div className={styles.legendItem}>
                <span className={`${styles.dot} ${styles.dotZoom}`} />
                <span>Zoom Semanal (Miércoles 19 hs)</span>
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.dot} ${styles.dotInterview}`} />
                <span>Entrevistas & Pruebas Técnicas (Tracker)</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Events of Selected Day & Upcoming List */}
          <div className={styles.eventsSideCard}>
            <div className={styles.eventsSideHeader}>
              <h3 className={styles.eventsSideTitle}>
                Eventos del {selectedDate ? selectedDate.split('-').reverse().join('/') : 'Día Seleccionado'}
              </h3>
              <span className={styles.eventsCountBadge}>
                {selectedDateEvents.length} {selectedDateEvents.length === 1 ? 'evento' : 'eventos'}
              </span>
            </div>

            {selectedDateEvents.length > 0 ? (
              <div className={styles.eventsList}>
                {selectedDateEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className={`${styles.eventItemCard} ${ev.type === 'zoom' ? styles.eventZoom : styles.eventInterview}`}
                  >
                    <div className={styles.eventCardTop}>
                      <div className={styles.eventPill}>
                        {ev.type === 'zoom' ? (
                          <Video size={13} />
                        ) : (
                          <Briefcase size={13} />
                        )}
                        <span>{ev.type === 'zoom' ? 'ZOOM SEMANAL EN VIVO' : 'ENTREVISTA LABORAL'}</span>
                      </div>
                      <div className={styles.eventTime}>
                        <Clock size={13} />
                        <span>{ev.time}</span>
                      </div>
                    </div>

                    <h4 className={styles.eventTitle} title={ev.title}>{ev.title}</h4>
                    {ev.notes && <p className={styles.eventNotes} title={ev.notes}>{ev.notes}</p>}

                    <div className={styles.eventActionsRow}>
                      {ev.zoomLink ? (
                        <a
                          href={ev.zoomLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.joinZoomLinkBtn}
                          onClick={(e) => {
                            e.preventDefault();
                            alert('Abriendo enlace de sesión Zoom semanal.');
                          }}
                        >
                          <Video size={14} />
                          <span>Entrar al Zoom</span>
                        </a>
                      ) : <span />}

                      {!ev.id.startsWith('zoom-') && (
                        <button
                          type="button"
                          className={styles.delEventBtn}
                          onClick={() => handleDeleteEvent(ev.id)}
                          title="Eliminar evento"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyDayEvents}>
                <CalendarDays size={32} className={styles.emptyCalIcon} />
                <p>No tenés eventos agendados para este día.</p>
                <button
                  type="button"
                  className={styles.quickAddBtn}
                  onClick={() => {
                    setNewDate(selectedDate);
                    setShowAddModal(true);
                  }}
                >
                  <Plus size={14} />
                  <span>Agendar evento aquí</span>
                </button>
              </div>
            )}
          </div>
        </div>

      {/* UNIFIED DESIGN MODAL TO ADD CUSTOM EVENT */}
      {showAddModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderInfo}>
                <div className={styles.modalPillBadge}>
                  <Sparkles size={13} />
                  <span>GESTOR DE CALENDARIO</span>
                </div>
                <h3 className={styles.modalTitle}>Agendar Nuevo Evento</h3>
                <p className={styles.modalSubtitle}>
                  Registrá tus próximas entrevistas laborales, pruebas técnicas y recordatorios.
                </p>
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setShowAddModal(false)}
                aria-label="Cerrar modal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label className={styles.fieldLabel}>
                  <Briefcase size={14} className={styles.labelIconRole} />
                  <span>Título del Evento *</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  placeholder="Ej. Entrevista Técnica con Líder de Producto..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className={styles.didacticInput}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.fieldLabel}>
                    <Clock size={14} className={styles.labelIconStatus} />
                    <span>Tipo de Evento</span>
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as CalendarEvent['type'])}
                    className={styles.didacticSelect}
                  >
                    <option value="entrevista">💼 Entrevista RRHH / Manager</option>
                    <option value="prueba">💻 Prueba Técnica / Live Coding</option>
                    <option value="seguimiento">✉️ Follow-up / Seguimiento</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.fieldLabel}>
                    <Building2 size={14} className={styles.labelIconCompany} />
                    <span>Empresa (opcional)</span>
                  </label>
                  <input
                    type="text"
                    maxLength={100}
                    placeholder="Ej. Mercado Libre, Ualá..."
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className={styles.didacticInput}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.fieldLabel}>
                    <CalendarDays size={14} className={styles.labelIconCalendar} />
                    <span>Fecha *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className={styles.didacticInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.fieldLabel}>
                    <Clock size={14} className={styles.labelIconTime} />
                    <span>Hora *</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={50}
                    placeholder="Ej. 15:00 hs (Arg)"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className={styles.didacticInput}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.fieldLabel}>
                  <FileText size={14} className={styles.labelIconNotes} />
                  <span>Notas / Preguntas preparadas</span>
                </label>
                <textarea
                  rows={3}
                  maxLength={1000}
                  placeholder="Ej. Tener a mano portfolio, preparar preguntas sobre cultura del equipo... (opcional)"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className={styles.didacticTextarea}
                />
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowAddModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.submitModalBtn}>
                  <Sparkles size={15} />
                  <span>Guardar en Calendario</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
