'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  MessageSquare,
  Send,
  ThumbsUp,
  Sparkles,
  ShieldCheck,
  Lock,
  Globe,
  Trash2,
  Reply,
  CheckCircle,
  Clock,
} from 'lucide-react';
import {
  getLessonCommentsAction,
  saveLessonCommentAction,
  deleteLessonCommentAction,
  toggleCommentApprovalAction,
  replyCommentAsFlorAction,
  toggleCommentLikeAction,
  CommentReply,
} from '@/actions/admin';
import styles from './LessonComments.module.css';

export interface CommentViewModel {
  id: string;
  authorName: string;
  authorEmail: string;
  avatarInitials: string;
  isInstructor: boolean;
  createdAt: string;
  content: string;
  likes: number;
  userLiked: boolean;
  isApproved: boolean;
  isRead: boolean;
  isOwn: boolean;
  replies: CommentReply[];
}

interface LessonCommentsProps {
  lessonId: string;
  lessonTitle: string;
  currentUser?: {
    name?: string | null;
    email?: string | null;
  } | null;
  isSuperAdmin?: boolean;
}

export function LessonComments({
  lessonId,
  lessonTitle,
  currentUser,
  isSuperAdmin = false,
}: LessonCommentsProps) {
  const [comments, setComments] = useState<CommentViewModel[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const userEmail = currentUser?.email?.toLowerCase().trim() || '';

  const loadComments = useCallback(async () => {
    try {
      const res = await getLessonCommentsAction(lessonId, userEmail, isSuperAdmin);
      if (res.success && res.comments) {
        setComments(res.comments);
      }
    } catch (err) {
      console.error('Error fetching lesson comments:', err);
    } finally {
      setIsLoading(false);
    }
  }, [lessonId, userEmail, isSuperAdmin]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await saveLessonCommentAction(
        lessonId,
        lessonTitle,
        inputText.trim(),
        {
          name: currentUser?.name || 'Alumno',
          email: userEmail || 'alumno@academia.flormartinezok.com',
        },
        isSuperAdmin
      );

      if (res.success) {
        setInputText('');
        await loadComments();
      }
    } catch (err) {
      console.error('Error saving comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('¿Estás seguro de que deseás eliminar este comentario?')) return;
    try {
      const res = await deleteLessonCommentAction(commentId, userEmail, isSuperAdmin);
      if (res.success) {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  const handleToggleApproval = async (commentId: string) => {
    try {
      const res = await toggleCommentApprovalAction(commentId);
      if (res.success) {
        setComments((prev) =>
          prev.map((c) => (c.id === commentId ? { ...c, isApproved: res.isApproved ?? !c.isApproved } : c))
        );
      }
    } catch (err) {
      console.error('Error toggling approval:', err);
    }
  };

  const handleSendReply = async (commentId: string) => {
    if (!replyText.trim() || isReplying) return;

    setIsReplying(true);
    try {
      const res = await replyCommentAsFlorAction(commentId, replyText.trim());
      if (res.success && res.reply) {
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId
              ? {
                  ...c,
                  replies: [...c.replies, res.reply!],
                }
              : c
          )
        );
        setReplyText('');
        setActiveReplyId(null);
      }
    } catch (err) {
      console.error('Error replying as Flor:', err);
    } finally {
      setIsReplying(false);
    }
  };

  const handleToggleLike = async (commentId: string) => {
    if (!userEmail) return;

    // Optimistic update
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const wasLiked = c.userLiked;
          return {
            ...c,
            userLiked: !wasLiked,
            likes: wasLiked ? Math.max(0, c.likes - 1) : c.likes + 1,
          };
        }
        return c;
      })
    );

    try {
      const res = await toggleCommentLikeAction(commentId, userEmail);
      if (res.success) {
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId ? { ...c, likes: res.likes ?? c.likes, userLiked: !!res.userLiked } : c
          )
        );
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const currentUserName = isSuperAdmin ? 'Flor Martínez (Instructora)' : currentUser?.name || 'Mi Perfil';
  const currentUserInitials = isSuperAdmin
    ? 'FM'
    : currentUserName
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
            <h2 className={styles.headerTitle}>Consultas & Aportes de la Clase</h2>
            <p className={styles.headerSubtitle}>
              Espacio directo con Flor Martínez para resolver inquietudes puntuales sobre esta lección.
            </p>
          </div>
        </div>
        <div className={styles.countBadge}>
          <Sparkles size={14} color="#7C3AED" />
          <span>{comments.length} consultas</span>
        </div>
      </div>

      {/* Privacy Notice Alert for students */}
      {!isSuperAdmin && (
        <div className={styles.privacyNotice}>
          <Lock size={15} className={styles.privacyNoticeIcon} />
          <div>
            <strong>Espacio Seguro & Privado:</strong> Tus consultas son privadas y visibles exclusivamente
            para vos y el equipo docente de Flor Martínez. Una vez revisadas y respondidas, podremos aprobarlas
            para compartirlas con la comunidad de alumnos.
          </div>
        </div>
      )}

      {/* New comment input form */}
      <form onSubmit={handleAddComment} className={styles.formCard}>
        <div className={styles.formHeader}>
          <div className={`${styles.authorAvatar} ${isSuperAdmin ? styles.avatarFlor : ''}`}>
            <span>{currentUserInitials}</span>
          </div>
          <div className={styles.formHeaderDetails}>
            <span className={styles.authorName}>{currentUserName}</span>
            {isSuperAdmin && (
              <span className={styles.instructorBadge}>
                <ShieldCheck size={11} />
                <span>Superadmin / Instructora</span>
              </span>
            )}
          </div>
        </div>

        <textarea
          rows={3}
          required
          maxLength={1200}
          placeholder={
            isSuperAdmin
              ? 'Publicar un mensaje oficial de Flor Martínez para esta clase...'
              : 'Escribí tu consulta puntual sobre esta clase para Flor y su equipo...'
          }
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className={styles.commentTextarea}
        />

        <div className={styles.formFooter}>
          <span className={styles.formTip}>
            {isSuperAdmin
              ? '✨ Tu mensaje se publicará con avatar y firma oficial de Flor Martínez.'
              : '🔒 Recibirás respuesta directamente de Flor Martínez.'}
          </span>
          <button
            type="submit"
            disabled={!inputText.trim() || isSubmitting}
            className={styles.submitBtn}
          >
            <Send size={14} />
            <span>{isSubmitting ? 'Enviando...' : isSuperAdmin ? 'Publicar como Flor' : 'Enviar consulta'}</span>
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className={styles.commentsList}>
        {isLoading ? (
          <div className={styles.loadingState}>
            <span>Cargando consultas...</span>
          </div>
        ) : comments.length === 0 ? (
          <div className={styles.emptyComments}>
            <div className={styles.emptyStateIcon}>
              <MessageSquare size={36} strokeWidth={1.5} color="#94A3B8" />
            </div>
            <h3 className={styles.emptyTitle}>Aún no hay consultas en esta clase</h3>
            <p className={styles.emptyText}>
              ¿Tenés alguna duda sobre el contenido de este video? Escribila arriba y Flor te responderá a la brevedad.
            </p>
          </div>
        ) : (
          comments.map((comm) => (
            <div
              key={comm.id}
              className={`${styles.commentItem} ${comm.isInstructor ? styles.commentInstructorCard : ''}`}
            >
              <div className={styles.commentTopRow}>
                <div className={styles.commentUserInfo}>
                  <div
                    className={`${styles.authorAvatar} ${comm.isInstructor ? styles.avatarFlor : ''}`}
                  >
                    {comm.avatarInitials}
                  </div>
                  <div className={styles.userNameCol}>
                    <div className={styles.userNameRow}>
                      <strong className={styles.commentUserName}>{comm.authorName}</strong>
                      {comm.isInstructor && (
                        <span className={styles.instructorBadge}>
                          <ShieldCheck size={12} />
                          <span>Instructora</span>
                        </span>
                      )}
                    </div>
                    <span className={styles.commentDate}>{comm.createdAt}</span>
                  </div>
                </div>

                {/* Status Badges */}
                <div className={styles.badgesGroup}>
                  {!comm.isApproved ? (
                    <span
                      className={styles.privateBadge}
                      title="Visible solo para el alumno y superadmins"
                    >
                      <Lock size={11} />
                      <span>{isSuperAdmin ? 'Pendiente / Privado' : 'Solo vos y Flor'}</span>
                    </span>
                  ) : (
                    <span
                      className={styles.publicBadge}
                      title="Visible para todos los alumnos"
                    >
                      <Globe size={11} />
                      <span>Público</span>
                    </span>
                  )}

                  {/* Actions (Delete / Approve / Reply) */}
                  {(comm.isOwn || isSuperAdmin) && (
                    <button
                      type="button"
                      onClick={() => handleDeleteComment(comm.id)}
                      className={styles.deleteBtn}
                      title="Eliminar este comentario"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>

              <p className={styles.commentBody}>{comm.content}</p>

              {/* Moderation Controls for Superadmin */}
              {isSuperAdmin && (
                <div className={styles.superadminBar}>
                  <button
                    type="button"
                    onClick={() => handleToggleApproval(comm.id)}
                    className={`${styles.adminActionBtn} ${
                      comm.isApproved ? styles.adminActionBtnActive : ''
                    }`}
                  >
                    {comm.isApproved ? (
                      <>
                        <Lock size={12} />
                        <span>Hacer Privado</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={12} />
                        <span>Aprobar como Público</span>
                      </>
                    )}
                  </button>

                  {!comm.isInstructor && (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveReplyId((prev) => (prev === comm.id ? null : comm.id))
                      }
                      className={styles.adminActionBtn}
                    >
                      <Reply size={12} />
                      <span>Responder como Flor</span>
                    </button>
                  )}
                </div>
              )}

              {/* Inline Reply Form for Superadmin */}
              {isSuperAdmin && activeReplyId === comm.id && (
                <div className={styles.replyForm}>
                  <div className={styles.replyFormHeader}>
                    <div className={`${styles.authorAvatarSmall} ${styles.avatarFlor}`}>
                      <span>FM</span>
                    </div>
                    <span className={styles.replyingAsText}>
                      Respondiendo como <strong>Flor Martínez</strong>:
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Escribí la respuesta para el alumno..."
                    className={styles.replyTextarea}
                  />
                  <div className={styles.replyFormActions}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveReplyId(null);
                        setReplyText('');
                      }}
                      className={styles.cancelReplyBtn}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      disabled={!replyText.trim() || isReplying}
                      onClick={() => handleSendReply(comm.id)}
                      className={styles.sendReplyBtn}
                    >
                      <Send size={12} />
                      <span>{isReplying ? 'Enviando...' : 'Enviar respuesta'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Replies list */}
              {comm.replies && comm.replies.length > 0 && (
                <div className={styles.repliesList}>
                  {comm.replies.map((reply) => (
                    <div key={reply.id} className={styles.replyItem}>
                      <div className={styles.replyHeader}>
                        <div
                          className={`${styles.authorAvatarSmall} ${
                            reply.isInstructor ? styles.avatarFlor : ''
                          }`}
                        >
                          {reply.avatarInitials}
                        </div>
                        <div className={styles.replyMeta}>
                          <div className={styles.replyAuthorRow}>
                            <strong className={styles.replyAuthorName}>
                              {reply.authorName}
                            </strong>
                            {reply.isInstructor && (
                              <span className={styles.instructorBadgeSmall}>
                                <ShieldCheck size={10} />
                                <span>Instructora</span>
                              </span>
                            )}
                          </div>
                          <span className={styles.replyDate}>{reply.createdAt}</span>
                        </div>
                      </div>
                      <p className={styles.replyBody}>{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom Likes Row */}
              <div className={styles.commentBottomRow}>
                <button
                  type="button"
                  className={`${styles.likeBtn} ${comm.userLiked ? styles.likeBtnActive : ''}`}
                  onClick={() => handleToggleLike(comm.id)}
                  title="Me sirvió este aporte"
                >
                  <ThumbsUp size={13} fill={comm.userLiked ? 'currentColor' : 'none'} />
                  <span>{comm.likes}</span>
                </button>
                {comm.replies && comm.replies.length > 0 && (
                  <span className={styles.replyCountTag}>
                    {comm.replies.length} {comm.replies.length === 1 ? 'respuesta' : 'respuestas'} de Flor
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
