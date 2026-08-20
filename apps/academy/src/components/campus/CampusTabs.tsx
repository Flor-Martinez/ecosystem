'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  BookOpen,
  CheckCircle2,
  Send,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import { CampusLesson } from '@/data/campus';
import styles from './CampusTabs.module.css';

interface CampusTabsProps {
  lesson: CampusLesson;
}

export function CampusTabs({ lesson }: CampusTabsProps) {
  const [activeTab, setActiveTab] = useState<'recursos' | 'apuntes' | 'dudas'>('recursos');
  const [questionText, setQuestionText] = useState('');
  const [questionSent, setQuestionSent] = useState(false);

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    setQuestionSent(true);
    setQuestionText('');
    setTimeout(() => setQuestionSent(false), 4000);
  };

  return (
    <div className={styles.tabsWrapper}>
      {/* Tab Navigation */}
      <div className={styles.tabNavRow}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'recursos' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('recursos')}
        >
          <FileText size={16} />
          <span>Materiales & Descargas ({lesson.resources.length})</span>
        </button>

        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'apuntes' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('apuntes')}
        >
          <BookOpen size={16} />
          <span>Puntos Clave & Resumen</span>
        </button>

        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'dudas' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('dudas')}
        >
          <MessageSquare size={16} />
          <span>Dudas para el Zoom de los Miércoles</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className={styles.tabBody}>
        {/* TAB 1: RECURSOS & DESCARGAS */}
        {activeTab === 'recursos' && (
          <div className={styles.resourcesTab}>
            {lesson.resources.length > 0 ? (
              <div className={styles.resourcesGrid}>
                {lesson.resources.map((res, idx) => (
                  <div key={idx} className={styles.resourceCard}>
                    <div className={styles.resIconWrap}>
                      <FileText size={20} className={styles.resIcon} />
                    </div>
                    <div className={styles.resInfo}>
                      <strong className={styles.resTitle}>{res.title}</strong>
                      <span className={styles.resMeta}>
                        Formato: {res.type.toUpperCase()} {res.fileSize ? `· ${res.fileSize}` : ''}
                      </span>
                    </div>
                    <a
                      href={res.url}
                      className={styles.downloadBtn}
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Descargando recurso: ${res.title}`);
                      }}
                    >
                      <Download size={15} />
                      <span>Descargar</span>
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyRes}>
                <Sparkles size={20} className={styles.sparkleIcon} />
                <p>
                  Esta clase es explicativa y conceptual. Todos los ejercicios se realizan directamente sobre tu plantilla central del Módulo 01.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: APUNTES & PUNTOS CLAVE */}
        {activeTab === 'apuntes' && (
          <div className={styles.takeawaysTab}>
            <h3 className={styles.takeawaysHeading}>Conclusiones principales de esta lección:</h3>
            <ul className={styles.takeawaysList}>
              {lesson.takeaways.map((point, idx) => (
                <li key={idx} className={styles.takeawayItem}>
                  <CheckCircle2 size={16} className={styles.checkIcon} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* TAB 3: DUDAS PARA EL ZOOM */}
        {activeTab === 'dudas' && (
          <div className={styles.questionsTab}>
            <div className={styles.zoomNotice}>
              <strong>🎙️ Sesión de Zoom semanal todos los miércoles 19:00 hs (Arg)</strong>
              <p>
                Dejanos tu consulta puntual sobre esta clase o sobre tu caso personal. El equipo la revisará en vivo y te dará feedback directo.
              </p>
            </div>

            {questionSent ? (
              <div className={styles.sentSuccessBox}>
                <CheckCircle2 size={20} className={styles.sentCheck} />
                <div>
                  <strong>¡Consulta recibida con éxito!</strong>
                  <span>La sumamos a la orden del día del próximo Zoom semanal.</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuestion} className={styles.questionForm}>
                <label className={styles.formLabel}>
                  ¿Qué duda o traba puntual tenés con este tema?
                </label>
                <textarea
                  rows={3}
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Ej: Tengo una brecha de 8 meses en 2023 porque me dediqué a estudiar y no sé cómo redactarla en mi CV..."
                  className={styles.questionInput}
                  required
                />
                <div className={styles.formFooter}>
                  <button type="submit" className={styles.submitBtn}>
                    <Send size={15} />
                    <span>Enviar consulta para el Zoom</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
