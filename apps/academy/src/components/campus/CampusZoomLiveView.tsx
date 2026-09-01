'use client';

import React, { useState } from 'react';
import {
  Video,
  PlayCircle,
  Clock,
  CalendarDays,
  ArrowLeft,
  Send,
  CheckCircle2,
  MessageSquare,
  Copy,
  Check,
  Calendar,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from './CampusZoomLiveView.module.css';

interface SubmittedQuestion {
  id: string;
  text: string;
  date: string;
  status: 'enviada' | 'respondida';
}

interface CampusZoomLiveViewProps {
  onBackToDashboard: () => void;
  onNavigateToAgenda?: () => void;
}

const pastRecordings = [
  {
    id: 'rec-1',
    date: 'Miércoles 13 de Agosto, 2025',
    title: 'Auditoría de CVs ATS y Técnica de Anclaje Salarial',
    duration: '1h 25m',
    topics: ['Auditoría en vivo de 3 CVs de alumnos', 'Cómo justificar el rango salarial', 'Tips de LinkedIn Search'],
    videoUrl: 'https://youtube.com',
  },
  {
    id: 'rec-2',
    date: 'Miércoles 06 de Agosto, 2025',
    title: 'Método STAR en Entrevistas de Screening & Negociación',
    duration: '1h 18m',
    topics: ['Estructuración de historias de logro', 'Respuestas a preguntas difíciles', 'Preguntas para hacerle al reclutador'],
    videoUrl: 'https://youtube.com',
  },
  {
    id: 'rec-3',
    date: 'Miércoles 30 de Julio, 2025',
    title: 'Optimización de LinkedIn SEO & Prospección en Frío',
    duration: '1h 12m',
    topics: ['Algoritmo de LinkedIn 2025', 'Mensajes directos a Hiring Managers', 'Networking efectivo sin sonar invasivo'],
    videoUrl: 'https://youtube.com',
  },
];

const LOCAL_QUESTIONS_KEY = 'campus_zoom_student_questions_v1';

export function CampusZoomLiveView({
  onBackToDashboard,
  onNavigateToAgenda,
}: CampusZoomLiveViewProps) {
  const { user } = useAuth();
  const activeEmail = user?.email || 'santiago.morales@ejemplo.com';

  const [questionText, setQuestionText] = useState('');
  const [copiedId, setCopiedId] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [questions, setQuestions] = useState<SubmittedQuestion[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_QUESTIONS_KEY);
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [
      {
        id: 'q-1',
        text: '¿Cómo debería incluir en mi CV un periodo de 8 meses sabáticos sin que juegue en contra en los filtros ATS?',
        date: 'Enviada el 18 de Agosto',
        status: 'enviada',
      },
    ];
  });

  const handleCopy = (text: string, type: 'id' | 'pass') => {
    navigator.clipboard.writeText(text);
    if (type === 'id') {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    }
  };

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    const newQ: SubmittedQuestion = {
      id: `q-${Date.now()}`,
      text: questionText.trim(),
      date: 'Enviada recién',
      status: 'enviada',
    };

    const nextQuestions = [newQ, ...questions];
    setQuestions(nextQuestions);
    try {
      localStorage.setItem(LOCAL_QUESTIONS_KEY, JSON.stringify(nextQuestions));
    } catch {
      // ignore
    }

    setQuestionText('');
    setSuccessAlert(true);
    setTimeout(() => setSuccessAlert(false), 4000);
  };

  return (
    <div className={styles.zoomWrapper}>
      {/* Top Back Navigation */}
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

      {/* Header */}
      <div className={styles.zoomHeader}>
        <div>
          <div className={styles.headerBadge}>
            <Video size={13} />
            <span>MENTORÍAS EN VIVO & NETWORKING</span>
          </div>
          <h1 className={styles.zoomTitle}>Charlas Semanales vía Zoom</h1>
          <p className={styles.zoomSubtitle}>
            Sesiones grupales en vivo los <strong>miércoles a las 19:00 hs (Arg)</strong> con Flor Martínez. Podés dejar tus dudas antes del encuentro para recibir feedback personalizado y ver todas las grabaciones anteriores.
          </p>
        </div>
      </div>

      {/* Hero Grid: Next Live Zoom (Left) + Tus Dudas (Right) */}
      <div className={styles.heroGrid}>
        {/* LEFT CARD: Próxima Sesión en Vivo */}
        <div className={styles.liveZoomCard}>
          <div className={styles.liveCardHeader}>
            <div className={styles.liveBadgeRow}>
              <span className={styles.liveStatusBadge}>
                <span className={styles.liveDot} />
                <span>PRÓXIMO ENCUENTRO EN VIVO</span>
              </span>
              <span className={styles.zoomAppBadge}>Sala Oficial Zoom</span>
            </div>
            <h2 className={styles.liveCardTitle}>Mentoría Grupal & Casos Reales</h2>
            <p className={styles.liveCardDesc}>
              Espacio exclusivo para alumnos: resolución de dudas en vivo, auditoría de postulaciones y estrategia de entrevistas.
            </p>
          </div>

          <div className={styles.liveCardBody}>
            <div className={styles.scheduleDetailRow}>
              <div className={styles.scheduleIconWrap}>
                <CalendarDays size={20} />
              </div>
              <div className={styles.scheduleText}>
                <strong>Miércoles 20 de Agosto de 2025</strong>
                <span>19:00 a 20:30 hs (Arg / Uru) · 17:00 hs (Col / Per / Mex)</span>
              </div>
            </div>

            <div className={styles.credentialsRow}>
              <div className={styles.credentialBox}>
                <span className={styles.credLabel}>ID de Reunión:</span>
                <div className={styles.credValueRow}>
                  <code>849 2039 1102</code>
                  <button
                    type="button"
                    className={styles.copyBtn}
                    onClick={() => handleCopy('849 2039 1102', 'id')}
                    title="Copiar ID"
                  >
                    {copiedId ? <Check size={13} color="#059669" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>

              <div className={styles.credentialBox}>
                <span className={styles.credLabel}>Código de Acceso:</span>
                <div className={styles.credValueRow}>
                  <code>EBL2025</code>
                  <button
                    type="button"
                    className={styles.copyBtn}
                    onClick={() => handleCopy('EBL2025', 'pass')}
                    title="Copiar Contraseña"
                  >
                    {copiedPass ? <Check size={13} color="#059669" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.liveActions}>
              <a
                href="https://zoom.us/j/mock-academia-flor-martinez"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.joinLiveBtn}
              >
                <Video size={18} />
                <span>Entrar a la Sala Zoom en Vivo ↗</span>
              </a>

              {onNavigateToAgenda && (
                <button
                  type="button"
                  className={styles.viewInAgendaBtn}
                  onClick={onNavigateToAgenda}
                  title="Ver en el calendario general"
                >
                  <Calendar size={15} />
                  <span>Ver en Mi Agenda</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT CARD: Tus Dudas para el Vivo */}
        <div className={styles.questionsCard}>
          <div className={styles.questionsHeader}>
            <div className={styles.qIconWrap}>
              <MessageSquare size={18} />
            </div>
            <div>
              <h2 className={styles.qCardTitle}>Tus Dudas para Flor</h2>
              <p className={styles.qCardSubtitle}>
                Dejá tus preguntas acá para que Flor las responda en vivo durante el Zoom del miércoles.
              </p>
            </div>
          </div>

          <form onSubmit={handleSendQuestion} className={styles.questionForm}>
            <div className={styles.textareaWrap}>
              <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                maxLength={600}
                placeholder="Escribí tu consulta sobre tu CV, LinkedIn, prueba técnica o negociación salarial..."
                className={styles.questionTextarea}
                rows={3}
                required
              />
              <span className={styles.charCounter}>{questionText.length}/600</span>
            </div>

            <div className={styles.formBottomRow}>
              <button type="submit" className={styles.sendQuestionBtn}>
                <Send size={14} />
                <span>Enviar Duda para el Vivo</span>
              </button>

              {successAlert && (
                <div className={styles.sentAlert}>
                  <CheckCircle2 size={14} />
                  <span>¡Pregunta registrada para el próximo Zoom!</span>
                </div>
              )}
            </div>
          </form>

          {/* List of Submitted Questions */}
          <div className={styles.submittedQuestionsSection}>
            <span className={styles.submittedHeaderLabel}>
              TUS PREGUNTAS ENVIADAS ({questions.length})
            </span>

            <div className={styles.questionsList}>
              {questions.map((q) => (
                <div key={q.id} className={styles.qItemCard}>
                  <div className={styles.qItemTop}>
                    <span className={styles.qItemBadge}>
                      <Clock size={11} />
                      <span>{q.date}</span>
                    </span>
                    <span className={styles.qStatusTag}>
                      <CheckCircle2 size={11} />
                      <span>En lista para responder</span>
                    </span>
                  </div>
                  <p className={styles.qItemText}>{q.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* LOWER SECTION: Recordings Gallery */}
      <div className={styles.recordingsSection}>
        <div className={styles.recordingsSectionHeader}>
          <div className={styles.recordingsBadgeRow}>
            <div className={styles.secBadge}>
              <PlayCircle size={14} />
              <span>BIBLIOTECA DE ENCUENTROS ANTERIORES</span>
            </div>
            <span className={styles.recCountPill}>{pastRecordings.length} Grabaciones Disponibles</span>
          </div>
          <h2 className={styles.secTitle}>Grabaciones de Sesiones Anteriores</h2>
          <p className={styles.secSubtitle}>
            Si no pudiste asistir en vivo o querés repasar casos prácticos de otros alumnos, acá tenés acceso a todas las grabaciones completas.
          </p>
        </div>

        <div className={styles.recordingsGrid}>
          {pastRecordings.map((rec) => (
            <div key={rec.id} className={styles.recCard}>
              <div className={styles.recThumbnail}>
                <div className={styles.recPlayOverlay}>
                  <PlayCircle size={44} className={styles.recPlayIcon} />
                </div>
                <span className={styles.recDurationBadge}>
                  <Clock size={12} />
                  <span>{rec.duration}</span>
                </span>
              </div>

              <div className={styles.recBody}>
                <div className={styles.recDateBadge}>
                  <CalendarDays size={13} />
                  <span>{rec.date}</span>
                </div>

                <h3 className={styles.recItemTitle}>{rec.title}</h3>

                <div className={styles.topicsList}>
                  {rec.topics.map((t, idx) => (
                    <span key={idx} className={styles.topicChip}>
                      • {t}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className={styles.watchBtn}
                  onClick={() => alert(`Reproduciendo grabación: ${rec.title}`)}
                >
                  <PlayCircle size={15} />
                  <span>Ver Grabación Completa</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
