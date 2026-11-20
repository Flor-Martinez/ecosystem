'use client';

import React, { useState } from 'react';
import {
  Table,
  Calendar,
  CheckCircle2,
  Plus,
  Building2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './ExperienceTools.module.css';

const trackerMockData = [
  {
    company: 'Mercado Libre',
    role: 'HR Business Partner / People Analyst',
    stage: 'Oferta Recibida',
    date: '18 Nov',
    statusColor: '#D1FAE5',
    statusTextColor: '#065F46',
    notes: 'Oferta salarial superior al target pretendido',
  },
  {
    company: 'Globant',
    role: 'Talent Acquisition Specialist',
    stage: 'Entrevista Final',
    date: '15 Nov',
    statusColor: '#EDE9FE',
    statusTextColor: '#6D28D9',
    notes: 'Entrevista por competencias con Hiring Manager',
  },
  {
    company: 'Ualá',
    role: 'Operations & People Coordinator',
    stage: 'Contactado',
    date: '12 Nov',
    statusColor: '#DBEAFE',
    statusTextColor: '#1E40AF',
    notes: 'Recruiter respondió positivamente al CV enviado',
  },
  {
    company: 'Techint',
    role: 'Analista de Recursos Humanos',
    stage: 'Postulado',
    date: '08 Nov',
    statusColor: '#FEF3C7',
    statusTextColor: '#92400E',
    notes: 'Postulación con palabras clave ATS optimizadas',
  },
];

export function ExperienceTools() {
  const [activeTab, setActiveTab] = useState<'tracker' | 'calendar'>('tracker');

  return (
    <section className={styles.section} id="herramientas-experiencia">
      <Container size="wide">
        <SectionHeader
          badge="Herramientas Exclusivas"
          badgeVariant="primary"
          title="Herramientas que acompañan tu día a día"
          subtitle="Tu acceso a la Academia incluye aplicaciones web diseñadas especialmente para estructurar y acelerar tu búsqueda laboral."
        />

        {/* Tab Switcher Buttons (Only Tracker & Calendar) */}
        <div className={styles.tabsRow}>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'tracker' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('tracker')}
          >
            <Table size={16} />
            <span>1. Tracker de Postulaciones</span>
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'calendar' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            <Calendar size={16} />
            <span>2. Agenda de Entrevistas</span>
          </button>
        </div>

        {/* Dynamic Display Area */}
        <div className={styles.displayCard}>
          {/* TAB 1: TRACKER */}
          {activeTab === 'tracker' && (
            <div className={styles.tabContentGrid}>
              <div className={styles.tabInfo}>
                <span className={styles.tabBadge}>Gestión de Postulaciones</span>
                <h3 className={styles.tabTitle}>Guardá, organizá y medí tus búsquedas activas</h3>
                <p className={styles.tabDesc}>
                  Nunca más te olvides a qué puesto aplicaste ni qué versión de CV enviaste. Nuestro tracker te permite registrar empresas, salarios pretendidos, fechas de entrevista y notas de contacto en tiempo real.
                </p>
                <ul className={styles.tabList}>
                  <li>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Visualización por etapas: Postulado, Contactado, Entrevista y Oferta.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Filtros instantáneos para encontrar cualquier proceso abierto.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Integrado al Campus Virtual con almacenamiento automático.</span>
                  </li>
                </ul>
              </div>

              <div className={styles.tabVisual}>
                {/* Mockup Tracker Window */}
                <div className={styles.trackerWindow}>
                  <div className={styles.windowHeader}>
                    <div className={styles.windowDots}>
                      <span className={styles.wDotRed} />
                      <span className={styles.wDotYellow} />
                      <span className={styles.wDotGreen} />
                    </div>
                    <span className={styles.windowTitle}>Mi Tracker de Postulaciones</span>
                    <span className={styles.windowCount}>4 en curso</span>
                  </div>

                  <div className={styles.tableWrap}>
                    <table className={styles.mockTable}>
                      <thead>
                        <tr>
                          <th>Empresa & Puesto</th>
                          <th>Estado</th>
                          <th>Fecha</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trackerMockData.map((row, idx) => (
                          <tr key={idx}>
                            <td>
                              <div className={styles.companyCell}>
                                <strong>{row.company}</strong>
                                <span>{row.role}</span>
                              </div>
                            </td>
                            <td>
                              <span
                                className={styles.statusBadge}
                                style={{ backgroundColor: row.statusColor, color: row.statusTextColor }}
                              >
                                {row.stage}
                              </span>
                            </td>
                            <td>
                              <span className={styles.dateCell}>{row.date}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className={styles.tableFooter}>
                    <span className={styles.addBtn}>
                      <Plus size={14} />
                      <span>Registrar nueva postulación en el Campus</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CALENDAR */}
          {activeTab === 'calendar' && (
            <div className={styles.tabContentGrid}>
              <div className={styles.tabInfo}>
                <span className={styles.tabBadge}>Organización & Tiempos</span>
                <h3 className={styles.tabTitle}>Agenda de entrevistas y seguimiento semanal</h3>
                <p className={styles.tabDesc}>
                  La búsqueda de empleo requiere constancia y método. Sincronizá tus compromisos para llegar preparado a cada llamada y no superponer procesos de selección.
                </p>
                <ul className={styles.tabList}>
                  <li>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Planificador de preparación previa a entrevistas.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Registro de fechas límite de postulación y seguimiento.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Historial cronológico de avances en cada empresa.</span>
                  </li>
                </ul>
              </div>

              <div className={styles.tabVisual}>
                <div className={styles.calendarMockCard}>
                  <div className={styles.calHeader}>
                    <Calendar size={18} className={styles.calIcon} />
                    <strong>Semana en Curso — Tus Hitos Laborales</strong>
                  </div>

                  <div className={styles.calTimeline}>
                    <div className={styles.calItem}>
                      <div className={styles.calDotViolet} />
                      <div className={styles.calItemContent}>
                        <span className={styles.calTime}>Lunes 10:00 hs</span>
                        <strong>Envío de postulaciones estratégicas</strong>
                        <p>CV ATS adaptado a 3 vacantes seleccionadas en LinkedIn.</p>
                      </div>
                    </div>

                    <div className={styles.calItem}>
                      <div className={styles.calDotGreen} />
                      <div className={styles.calItemContent}>
                        <span className={styles.calTime}>Miércoles 15:30 hs</span>
                        <strong>1ra Entrevista con Mercado Libre</strong>
                        <p>Entrevista con HR Business Partner (Guion STAR repasado).</p>
                      </div>
                    </div>

                    <div className={styles.calItem}>
                      <div className={styles.calDotBlue} />
                      <div className={styles.calItemContent}>
                        <span className={styles.calTime}>Viernes 11:00 hs</span>
                        <strong>Follow-up profesional a reclutadores</strong>
                        <p>Mensaje de seguimiento estructurado con plantilla de cortesía.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
