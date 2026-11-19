'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  ThumbsUp,
  Sparkles,
  ShieldCheck,
  User,
} from 'lucide-react';
import styles from './LessonComments.module.css';

export interface CommentItem {
  id: string;
  authorName: string;
  authorEmail?: string;
  isInstructor?: boolean;
  avatarInitials: string;
  createdAt: string;
  content: string;
  likes: number;
  userLiked?: boolean;
}

interface LessonCommentsProps {
  lessonId: string;
  lessonTitle: string;
  currentUser?: {
    name?: string | null;
    email?: string | null;
  } | null;
}

const DEFAULT_COMMENTS_BY_LESSON: Record<string, CommentItem[]> = {
  'exp-1-1': [
    {
      id: 'c-flor-1-1',
      authorName: 'Flor Martínez',
      isInstructor: true,
      avatarInitials: 'FM',
      createdAt: 'Hace 3 días',
      content:
        '¡Bienvenidos al inicio de la formación! Recuerden que el primer paso no es mandar 100 CVs al azar, sino ordenar el método y entender cómo leen los selectores. Cualquier duda puntual de esta clase me la dejan aquí.',
      likes: 14,
    },
    {
      id: 'c-alumn-1-1',
      authorName: 'Camila Rossi',
      isInstructor: false,
      avatarInitials: 'CR',
      createdAt: 'Hace 1 día',
      content:
        'Muy claro el enfoque de no frustrarse por la falta de respuestas. Cambié mi mentalidad para encarar la búsqueda como un proyecto profesional.',
      likes: 5,
    },
  ],
  'exp-4-1': [
    {
      id: 'c-flor-4-1',
      authorName: 'Flor Martínez',
      isInstructor: true,
      avatarInitials: 'FM',
      createdAt: 'Hace 4 días',
      content:
        'Punto fundamental de esta lección: los softwares ATS leen texto plano estructurado. No pongan datos de contacto dentro del encabezado o pie de página de Word porque el escáner suele salteárselos.',
      likes: 18,
    },
    {
      id: 'c-lucas-4-1',
      authorName: 'Lucas Benítez',
      isInstructor: false,
      avatarInitials: 'LB',
      createdAt: 'Hace 2 días',
      content:
        '¿El formato de una sola columna es obligatorio incluso para puestos creativos?',
      likes: 3,
    },
    {
      id: 'c-flor-resp-4-1',
      authorName: 'Flor Martínez',
      isInstructor: true,
      avatarInitials: 'FM',
      createdAt: 'Ayer',
      content:
        'Lucas: para pasar el primer filtro de ATS de multinacionales siempre es preferible 1 columna limpia. Podés adjuntar tu portfolio con link clickable para mostrar tu identidad visual.',
      likes: 9,
    },
  ],
};

function getDefaultCommentsForLesson(lessonId: string, lessonTitle: string): CommentItem[] {
  if (DEFAULT_COMMENTS_BY_LESSON[lessonId]) {
    return DEFAULT_COMMENTS_BY_LESSON[lessonId]!;
  }
  return [
    {
      id: `default-${lessonId}`,
      authorName: 'Flor Martínez',
      isInstructor: true,
      avatarInitials: 'FM',
      createdAt: 'Oficial',
      content: `¡Bienvenido al espacio de consultas de "${lessonTitle}"! Dejá tus preguntas o reflexiones sobre lo aprendido y te acompañamos en cada paso de tu postulación.`,
      likes: 8,
    },
  ];
}

export function LessonComments({ lessonId, lessonTitle, currentUser }: LessonCommentsProps) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const storageKey = `campus_lesson_comments_v1_${lessonId}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setComments(parsed);
          return;
        }
      }
    } catch {
      // ignore localStorage parse error
    }
    setComments(getDefaultCommentsForLesson(lessonId, lessonTitle));
  }, [lessonId, lessonTitle, storageKey]);

  const persistComments = (newList: CommentItem[]) => {
    setComments(newList);
    try {
      localStorage.setItem(storageKey, JSON.stringify(newList));
    } catch {
      // ignore
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsSubmitting(true);
    const authorName = currentUser?.name || 'Alumno';
    const initials = authorName
      .split(' ')
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'AL';

    const newComment: CommentItem = {
      id: 'c-' + Date.now().toString(),
      authorName,
      authorEmail: currentUser?.email || undefined,
      isInstructor: false,
      avatarInitials: initials,
      createdAt: 'Recién',
      content: inputText.trim(),
      likes: 0,
      userLiked: false,
    };

    const updated = [newComment, ...comments];
    persistComments(updated);
    setInputText('');
    setIsSubmitting(false);
  };

  const handleToggleLike = (commentId: string) => {
    const updated = comments.map((c) => {
      if (c.id === commentId) {
        const wasLiked = !!c.userLiked;
        return {
          ...c,
          userLiked: !wasLiked,
          likes: wasLiked ? Math.max(0, c.likes - 1) : c.likes + 1,
        };
      }
      return c;
    });
    persistComments(updated);
  };

  const currentUserName = currentUser?.name || 'Mi Perfil';
  const currentUserInitials = currentUserName
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'YO';

  return (
    <div className={styles.commentsWrapper}>
      {/* Header */}
      <div className={styles.commentsHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.iconCircle}>
            <MessageSquare size={20} />
          </div>
          <div>
            <h2 className={styles.headerTitle}>Comentarios & Consultas de la Clase</h2>
            <p className={styles.headerSubtitle}>
              Espacio para resolver dudas sobre esta lección y compartir experiencias con la comunidad.
            </p>
          </div>
        </div>
        <div className={styles.countBadge}>
          <Sparkles size={14} color="#7C3AED" />
          <span>{comments.length} comentarios</span>
        </div>
      </div>

      {/* New comment input form */}
      <form onSubmit={handleAddComment} className={styles.formCard}>
        <div className={styles.formHeader}>
          <div className={styles.authorAvatar}>
            <span>{currentUserInitials}</span>
          </div>
          <span className={styles.authorName}>{currentUserName}</span>
        </div>

        <textarea
          rows={3}
          required
          maxLength={1200}
          placeholder="Escribí tu consulta, duda puntual o aporte sobre esta clase..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className={styles.commentTextarea}
        />

        <div className={styles.formFooter}>
          <span className={styles.formTip}>
            💡 Flor y el equipo leen periódicamente los comentarios para darte feedback.
          </span>
          <button
            type="submit"
            disabled={!inputText.trim() || isSubmitting}
            className={styles.submitBtn}
          >
            <Send size={14} />
            <span>Publicar comentario</span>
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className={styles.commentsList}>
        {comments.map((comm) => (
          <div key={comm.id} className={styles.commentItem}>
            <div className={styles.commentTopRow}>
              <div className={styles.commentUserInfo}>
                <div
                  className={`${styles.authorAvatar} ${comm.isInstructor ? styles.avatarFlor : ''}`}
                >
                  {comm.avatarInitials}
                </div>
                <div className={styles.userNameRow}>
                  <strong className={styles.commentUserName}>{comm.authorName}</strong>
                  {comm.isInstructor && (
                    <span className={styles.instructorBadge}>
                      <ShieldCheck size={12} />
                      <span>Instructora</span>
                    </span>
                  )}
                </div>
              </div>
              <span className={styles.commentDate}>{comm.createdAt}</span>
            </div>

            <p className={styles.commentBody}>{comm.content}</p>

            <div className={styles.commentBottomRow}>
              <button
                type="button"
                className={`${styles.likeBtn} ${comm.userLiked ? styles.likeBtnActive : ''}`}
                onClick={() => handleToggleLike(comm.id)}
                title="Me sirvió este comentario"
              >
                <ThumbsUp size={13} fill={comm.userLiked ? 'currentColor' : 'none'} />
                <span>{comm.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
