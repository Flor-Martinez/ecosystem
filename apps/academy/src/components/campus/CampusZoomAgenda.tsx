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

function generateWednesdayZooms(): CalendarEvent[] {
  const zoomEvents: CalendarEvent[] = [];
  // From 2026-09-01 to 2027-12-31
  const start = new Date(2026, 8, 1);
  const end = new Date(2027, 11, 31);
  const current = new Date(start);

  while (current <= end) {
    if (current.getDay() === 3) {
      // 3 = Wednesday
      const y = current.getFullYear();
      const m = String(current.getMonth() + 1).padStart(2, '0');
      const d = String(current.getDate()).padStart(2, '0');
      const dateStr = `${y}-${m}-${d}`;
      zoomEvents.push({
        id: `zoom-${dateStr}`,
        title: '🎙️ Sesión en Vivo: Mentoría y Consultas Semanales',
        type: 'zoom',
        date: dateStr,
        time: '19:00 hs (Arg/Uru) · 17:00 hs (Col/Per)',
        notes: 'Espacio semanal de resolución de dudas, consultas y feedback en vivo con Flor Martínez.',
        zoomLink: 'zoom-live',
      });
    }
    current.setDate(current.getDate() + 1);
  }
  return zoomEvents;
}

const defaultEvents: CalendarEvent[] = [
  ...generateWednesdayZooms(),
  {
    id: 'ent-1',
    title: '💼 Entrevista con Mercado Libre (Especialista en Marketing)',
    type: 'entrevista',
    date: '2026-09-10',
    time: '15:00 hs (Arg)',
    company: 'Mercado Libre',
    notes: 'Llamada con Hiring Manager sobre proyectos B2B.',
  },
];

const CALENDAR_STORAGE_KEY = 'campus_agenda_events_v2';

export interface CalendarPrefillData {
  title?: string;
  company?: string;
  notes?: string;
  type?: 'entrevista' | 'prueba' | 'seguimiento';
}

interface CampusZoomAgendaProps {
  onBackToDashboard?: () => void;
  onNavigateToZoom?: () => void;
  prefillData?: CalendarPrefillData | null;
  onClearPrefill?: () => void;
}

export function CampusZoomAgenda({
  onBackToDashboard,
  onNavigateToZoom,
  prefillData,
  onClearPrefill,
}: CampusZoomAgendaProps = {}) {
  const { user } = useAuth();
  const activeEmail = user?.email || 'santiago.morales@ejemplo.com';

  const [events, setEvents] = useState<CalendarEvent[]>(defaultEvents);
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-09');
  const [currentMonth, setCurrentMonth] = useState({ year: 2026, month: 8 }); // 0-indexed: 8 = Septiembre

  // Modal New Event
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<CalendarEvent['type']>('entrevista');
  const [newDate, setNewDate] = useState('2026-09-09');
  const [newTime, setNewTime] = useState('15:00 hs');
  const [newCompany, setNewCompany] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newZoomLink, setNewZoomLink] = useState('');

  // Handle incoming prefill data from Tracker (e.g. "Agendar Entrevista")
  useEffect(() => {
    if (prefillData) {
      setNewTitle(prefillData.title || '');
      setNewCompany(prefillData.company || '');
      setNewNotes(prefillData.notes || '');
      setNewType(prefillData.type || 'entrevista');
      setNewTime('15:00 hs');
      setNewDate(selectedDate);
      setShowAddModal(true);
      if (onClearPrefill) {
        onClearPrefill();
      }
    }
  }, [prefillData, onClearPrefill, selectedDate]);

  // Load from DB / LocalStorage
  useEffect(() => {
    async function loadData() {
      try {
        const res = await getCampusInitialDataAction(activeEmail);
        const wednesdayZooms = generateWednesdayZooms();
        let loadedEvents: CalendarEvent[] = [];

        if (res.success && res.data && res.data.calendarEvents.length > 0) {
          loadedEvents = res.data.calendarEvents;
        } else {
          const saved = localStorage.getItem(CALENDAR_STORAGE_KEY);
          if (saved) {
            try {
              loadedEvents = JSON.parse(saved);
            } catch {
              loadedEvents = defaultEvents;
            }
          } else {
            loadedEvents = defaultEvents;
          }
        }

        // Merge all Wednesday Zooms into loadedEvents so all Wednesdays always have the weekly Zoom
        const merged: CalendarEvent[] = [...loadedEvents];
        wednesdayZooms.forEach((zoomEv) => {
          if (!merged.some((e) => e.date === zoomEv.date && e.type === 'zoom')) {
            merged.push(zoomEv);
          }
        });

        // Ensure default initial interview is there
        if (!merged.some((e) => e.id === 'ent-1')) {
          merged.push({
            id: 'ent-1',
            title: '💼 Entrevista con Mercado Libre (Especialista en Marketing)',
            type: 'entrevista',
            date: '2026-09-10',
            time: '15:00 hs (Arg)',
            company: 'Mercado Libre',
            notes: 'Llamada con Hiring Manager sobre proyectos B2B.',
          });
        }

        setEvents(merged);
        localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(merged));
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

  // Month navigation boundaries:
  // Starts on join date (Septiembre 2026) and extends up to 1 year ahead (at least Diciembre 2027)
  const minMonthIndex = 2026 * 12 + 8; // Septiembre 2026 (0-indexed month 8)
  const maxMonthIndex = 2027 * 12 + 11; // Diciembre 2027
  const currentMonthIndex = currentMonth.year * 12 + currentMonth.month;

  const canPrev = currentMonthIndex > minMonthIndex;
  const canNext = currentMonthIndex < maxMonthIndex;

  const handlePrevMonth = () => {
    if (!canPrev) return;
    if (currentMonth.month === 0) {
      setCurrentMonth({ year: currentMonth.year - 1, month: 11 });
    } else {
      setCurrentMonth({ year: currentMonth.year, month: currentMonth.month - 1 });
    }
  };

  const handleNextMonth = () => {
    if (!canNext) return;
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
  // Fill exactly 42 slots (6 rows x 7 days) so month height is always constant
  while (calendarDays.length < 42) {
    calendarDays.push(null);
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
                  disabled={!canPrev}
                  aria-label="Mes anterior"
                  title={canPrev ? 'Mes anterior' : 'Límite de inicio de membresía'}
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
                  disabled={!canNext}
                  aria-label="Mes siguiente"
                  title={canNext ? 'Mes siguiente' : 'Límite de 1 año en adelante'}
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <button
                type="button"
                className={styles.addEventBtn}
                onClick={() => {
                  setNewDate(selectedDate || '2026-09-09');
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
                      {hasZoom && <span className={`${styles.dot} ${styles.dotZoom}`} title="Sesión en Vivo Semanal" />}
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
                <span>Sesión en Vivo (Miércoles 19 hs)</span>
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
                        <span>{ev.type === 'zoom' ? 'SESIÓN EN VIVO SEMANAL' : 'ENTREVISTA LABORAL'}</span>
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
                        <button
                          type="button"
                          className={styles.joinZoomLinkBtn}
                          onClick={() => {
                            if (onNavigateToZoom) {
                              onNavigateToZoom();
                            }
                          }}
                        >
                          <Video size={14} />
                          <span>Entrar a la Sesión en Vivo</span>
                        </button>
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
