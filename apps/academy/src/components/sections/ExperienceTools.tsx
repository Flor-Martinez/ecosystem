'use client';

import React, { useState } from 'react';
import {
  Table,
  Calendar,
  Video,
  BadgePercent,
  CheckCircle2,
  ExternalLink,
  Plus,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './ExperienceTools.module.css';

const trackerMockData = [
  {
    company: 'Mercado Libre',
    role: 'Product Specialist',
    stage: 'Entrevista RRHH',
    date: '18 Ago',
    statusColor: '#D1FAE5',
    statusTextColor: '#065F46',
    notes: 'Match ATS 96% con plantilla Word',
  },
  {
    company: 'Globant',
    role: 'UX / Operations Lead',
    stage: 'Prueba Técnica',
    date: '21 Ago',
    statusColor: '#EFF6FF',
    statusTextColor: '#1D4ED8',
    notes: 'CV optimizado con método STAR',
  },
  {
    company: 'Ualá',
    role: 'Growth Marketing Lead',
    stage: 'Oferta Recibida',
    date: '24 Ago',
    statusColor: '#FAF5FF',
    statusTextColor: '#6D28D9',
    notes: 'Negociación salarial asesorada en Zoom',
  },
  {
    company: 'Nubank (Remoto)',
    role: 'Business Developer',
    stage: 'Postulación Enviada',
    date: 'Hoy',
    statusColor: '#FEF3C7',
    statusTextColor: '#92400E',
    notes: 'Contacto directo a hiring manager por LinkedIn',
  },
];

export function ExperienceTools() {
  const [activeTab, setActiveTab] = useState<'tracker' | 'calendar' | 'zoom' | 'tienda'>('tracker');

  return (
    <section className={styles.section} id="herramientas-experiencia">
      <Container size="wide">
        <SectionHeader
          badge="Plataforma & Beneficios"
          badgeVariant="primary"
          title="Herramientas exclusivas que acompañan tu día a día"
          subtitle="Tu suscripción no es solo contenido teórico: te da acceso a un set de aplicaciones y canales diseñados para estructurar y acelerar tu búsqueda."
        />

        {/* Tab Switcher Buttons */}
        <div className={styles.tabsRow}>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'tracker' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('tracker')}
          >
            <Table size={16} />
            <span>1. Tracker de Búsquedas Activas</span>
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'calendar' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            <Calendar size={16} />
            <span>2. Agenda & Calendario</span>
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'zoom' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('zoom')}
          >
            <Video size={16} />
            <span>3. Charlas Semanales en Zoom</span>
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeTab === 'tienda' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('tienda')}
          >
            <BadgePercent size={16} />
            <span>4. Cupones Tienda FM</span>
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
                  Nunca más te olvides a qué puesto aplicaste ni qué versión de CV enviaste. Nuestro tracker te permite registrar empresas, salarios pretendidos, fechas de entrevista y notas de contacto.
                </p>
                <ul className={styles.tabList}>
                  <li>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Visualización por etapas: Enviado, Contactado, Entrevista, Oferta.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Recordatorios automáticos para hacer follow-up a reclutadores.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Formato disponible en plataforma web, Notion y plantilla Excel.</span>
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
                    <span className={styles.windowTitle}>Mi Panel de Búsquedas Activas</span>
                    <span className={styles.windowCount}>4 en curso</span>
                  </div>

                  <div className={styles.tableWrap}>
                    <table className={styles.mockTable}>
                      <thead>
                        <tr>
                          <th>Empresa & Puesto</th>
                          <th>Estado del Proceso</th>
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
                      <span>Registrar nueva postulación</span>
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
                  La búsqueda de empleo requiere constancia y disciplina. Sincronizá tus compromisos para llegar preparado a cada llamada y no superponer procesos de selección.
                </p>
                <ul className={styles.tabList}>
                  <li>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Planificador de preparación previa a entrevistas.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Días sugeridos para envíos estratégicos por LinkedIn.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Integración con Google Calendar y calendarios móviles.</span>
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
                        <span className={styles.calTime}>Miércoles 19:00 hs</span>
                        <strong>Sesión Zoom en Vivo de la Academia</strong>
                        <p>Revisión grupal de CVs y simulacro de entrevista técnica.</p>
                      </div>
                    </div>

                    <div className={styles.calItem}>
                      <div className={styles.calDotGreen} />
                      <div className={styles.calItemContent}>
                        <span className={styles.calTime}>Jueves 15:30 hs</span>
                        <strong>1ra Entrevista con Mercado Libre</strong>
                        <p>Entrevista con HR Business Partner (Guion STAR repasado).</p>
                      </div>
                    </div>

                    <div className={styles.calItem}>
                      <div className={styles.calDotBlue} />
                      <div className={styles.calItemContent}>
                        <span className={styles.calTime}>Viernes 11:00 hs</span>
                        <strong>Follow-up a Globant & Ualá</strong>
                        <p>Mensaje de seguimiento estructurado con plantilla de cortesía.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ZOOM */}
          {activeTab === 'zoom' && (
            <div className={styles.tabContentGrid}>
              <div className={styles.tabInfo}>
                <span className={styles.tabBadge}>Feedback Humano Directo</span>
                <h3 className={styles.tabTitle}>Charlas semanales en vivo vía Zoom con feedback</h3>
                <p className={styles.tabDesc}>
                  Lo más valioso de la Academia: todos los miércoles nos conectamos en directo con el equipo docente. Abrimos micrófonos, compartimos pantalla y auditamos tus documentos en vivo.
                </p>
                <ul className={styles.tabList}>
                  <li>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Revisión en directo de tu CV y tu titular de LinkedIn.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Roleplay y simulación de preguntas trampa de entrevistas.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Consultas sobre cartas de oferta y negociación de sueldos.</span>
                  </li>
                </ul>
              </div>

              <div className={styles.tabVisual}>
                <div className={styles.zoomCallMockCard}>
                  <div className={styles.zoomTop}>
                    <div className={styles.liveIndicator}>
                      <span className={styles.redPulse} />
                      <span>ZOOM EN VIVO · TODOS LOS MIÉRCOLES</span>
                    </div>
                    <span className={styles.zoomTime}>19:00 a 20:30 hs (Arg)</span>
                  </div>

                  <div className={styles.zoomGrid}>
                    <div className={styles.zoomSpeaker}>
                      <div className={styles.speakerAvatar}>Docente</div>
                      <div className={styles.speakerLabel}>Equipo Académico FM</div>
                    </div>
                    <div className={styles.zoomAudience}>
                      <div className={styles.miniGrid}>
                        <span className={styles.miniUser}>Juan (CV Audit)</span>
                        <span className={styles.miniUser}>Lucía (Mock Interview)</span>
                        <span className={styles.miniUser}>Matías (Negociación)</span>
                        <span className={styles.miniUser}>Camila (LinkedIn)</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.zoomFooter}>
                    <p>💡 Quedan grabadas en el campus si no podés sumarte en directo.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TIENDA COUPONS */}
          {activeTab === 'tienda' && (
            <div className={styles.tabContentGrid}>
              <div className={styles.tabInfo}>
                <span className={styles.tabBadge}>Beneficio Exclusivo del Ecosistema</span>
                <h3 className={styles.tabTitle}>Descuentos especiales en Tienda Flor Martinez</h3>
                <p className={styles.tabDesc}>
                  Como miembro de la Academia tenés cupones exclusivos de descuento para toda la línea de papelería ejecutiva, cuadernos de planificación y kits de autor de la Tienda oficial.
                </p>
                <ul className={styles.tabList}>
                  <li>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Hasta 25% OFF en agendas de cuero y cuadernos de productividad.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Acceso anticipado a nuevos lanzamientos de autor.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Cupones renovables mes a mes con tu suscripción activa.</span>
                  </li>
                </ul>
              </div>

              <div className={styles.tabVisual}>
                <div className={styles.couponVoucherCard}>
                  <div className={styles.couponTop}>
                    <BadgePercent size={24} className={styles.couponIcon} />
                    <div>
                      <strong>Cupón de Descuento Exclusivo</strong>
                      <span>Membresía Academia Flor Martinez</span>
                    </div>
                  </div>

                  <div className={styles.couponBody}>
                    <span className={styles.couponDiscount}>25% OFF</span>
                    <p>En cuadernos de autor, planners ejecutivos y papelería institucional.</p>
                    <div className={styles.couponCodeBox}>
                      <code>ACADEMIA-VIP25</code>
                    </div>
                  </div>

                  <div className={styles.couponFooter}>
                    <a
                      href="http://localhost:3000/proyecto/tienda-flor-martinez"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.tiendaLinkBtn}
                    >
                      <span>Conocer la Tienda Flor Martinez</span>
                      <ExternalLink size={14} />
                    </a>
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
