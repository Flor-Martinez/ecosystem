'use client';

import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Send, Check, Eye, EyeOff, Trash2, ShieldCheck } from 'lucide-react';
import { useEcosystemAuth } from '@/context/AuthContext';
import styles from './SolutionReviewsSection.module.css';

interface Review {
  id: string;
  solutionSlug: string;
  customerName: string;
  rating: number;
  text: string;
  isHidden?: boolean;
  createdAt: string;
}

interface SolutionReviewsSectionProps {
  solutionSlug: string;
  initialUser?: { name?: string; email?: string } | null;
}

const SolutionReviewsSection = React.memo(function SolutionReviewsSection({
  solutionSlug,
  initialUser,
}: SolutionReviewsSectionProps) {
  const { isSuperAdmin } = useEcosystemAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [name, setName] = useState(initialUser?.name || '');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialUser?.name && !name) {
      setName(initialUser.name);
    }
  }, [initialUser, name]);

  const fetchReviews = async () => {
    try {
      const adminParam = isSuperAdmin ? '&admin=true' : '';
      const res = await fetch(`/api/solutions/reviews?slug=${encodeURIComponent(solutionSlug)}${adminParam}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.reviews)) {
        setReviews(data.reviews);
      }
    } catch (err) {
      console.error('Error al cargar opiniones:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [solutionSlug, isSuperAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      setErrorMsg('Por favor completá tu nombre y opinión.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/solutions/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          solutionSlug,
          customerName: name,
          rating,
          text,
        }),
      });

      const data = await res.json();
      if (data.success && data.review) {
        setReviews([data.review, ...reviews]);
        setText('');
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 4000);
      } else {
        setErrorMsg(data.error || 'No se pudo guardar tu opinión.');
      }
    } catch {
      setErrorMsg('Error de conexión al enviar la opinión.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleHide = async (id: string) => {
    try {
      const res = await fetch('/api/solutions/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success && data.review) {
        setReviews(reviews.map((r) => (r.id === id ? data.review : r)));
      } else {
        alert(data.error || 'Error al cambiar visibilidad.');
      }
    } catch {
      alert('Error de conexión al modificar visibilidad.');
    }
  };

  const handleDelete = async (id: string, authorName: string) => {
    if (!confirm(`¿Estás seguro de eliminar la opinión de "${authorName}"?`)) return;

    try {
      const res = await fetch(`/api/solutions/reviews?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setReviews(reviews.filter((r) => r.id !== id));
      } else {
        alert(data.error || 'Error al eliminar.');
      }
    } catch {
      alert('Error de conexión al eliminar la opinión.');
    }
  };

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <div className={styles.titleRow}>
          <MessageSquare size={22} className={styles.sectionIcon} />
          <h3 className={styles.sectionTitle}>Opiniones y Experiencias de Clientes</h3>
          {isSuperAdmin && (
            <span style={{
              fontSize: '11px',
              fontWeight: 800,
              backgroundColor: '#0D1B2A',
              color: '#FFFFFF',
              padding: '3px 9px',
              borderRadius: '999px',
              marginLeft: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <ShieldCheck size={12} />
              Modo Superadmin Activo
            </span>
          )}
        </div>
        <p className={styles.sectionSubtitle}>
          Conocé los resultados reales de profesionales y emprendedores que ya aplicaron esta herramienta.
        </p>
      </div>

      {/* REVIEWS GRID */}
      {isLoading ? (
        <div className={styles.emptyState}>Cargando opiniones...</div>
      ) : reviews.length > 0 ? (
        <div className={styles.reviewsGrid}>
          {reviews.map((rev) => {
            const isHidden = !!rev.isHidden;
            return (
              <div
                key={rev.id}
                className={styles.reviewCard}
                style={isHidden ? { opacity: 0.8, backgroundColor: '#FFFBEB', borderColor: '#FDE68A' } : undefined}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.authorInfo}>
                    <div className={styles.avatarCircle}>
                      {rev.customerName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className={styles.authorName}>{rev.customerName}</div>
                      <div className={styles.reviewDate}>
                        {new Date(rev.createdAt).toLocaleDateString('es-AR', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className={styles.starsRow}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          fill={star <= rev.rating ? '#F59E0B' : 'transparent'}
                          color={star <= rev.rating ? '#F59E0B' : '#CBD5E1'}
                        />
                      ))}
                    </div>

                    {/* Superadmin Moderation Icons */}
                    {isSuperAdmin && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '6px' }}>
                        <button
                          type="button"
                          onClick={() => handleToggleHide(rev.id)}
                          style={{
                            background: isHidden ? '#FEF3C7' : '#F1F5F9',
                            border: '1px solid #CBD5E1',
                            borderRadius: '6px',
                            padding: '4px 6px',
                            cursor: 'pointer',
                            color: isHidden ? '#D97706' : '#475569',
                            display: 'inline-flex',
                            alignItems: 'center',
                          }}
                          title={isHidden ? 'Mostrar reseña públicamente' : 'Ocultar de la web (mantiene rating)'}
                        >
                          {isHidden ? <Eye size={14} /> : <EyeOff size={14} />}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(rev.id, rev.customerName)}
                          style={{
                            background: '#FEE2E2',
                            border: '1px solid #FCA5A5',
                            borderRadius: '6px',
                            padding: '4px 6px',
                            cursor: 'pointer',
                            color: '#DC2626',
                            display: 'inline-flex',
                            alignItems: 'center',
                          }}
                          title="Eliminar reseña definitivamente"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {isHidden && (
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#92400E',
                    backgroundColor: '#FEF3C7',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    alignSelf: 'flex-start',
                    marginTop: '-4px',
                    marginBottom: '4px'
                  }}>
                    🙈 Reseña Oculta (Visible solo para Superadmin — Sigue sumando a la puntuación general)
                  </div>
                )}

                <p className={styles.reviewText}>&ldquo;{rev.text}&rdquo;</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.emptyState}>
          Todavía no hay opiniones públicas para esta solución. ¡Sé el primero en compartir tu experiencia!
        </div>
      )}

      {/* SUBMIT FORM */}
      <div className={styles.formCard}>
        <h4 className={styles.formTitle}>Dejar una Opinión o Reseña</h4>
        <p className={styles.formSubtitle}>
          Tu experiencia ayuda a otros usuarios a tomar mejores decisiones profesionales.
        </p>

        {isSuccess && (
          <div className={styles.successAlert}>
            <Check size={16} style={{ display: 'inline', marginRight: 6 }} />
            ¡Muchas gracias por tu opinión! Ha sido guardada y publicada en el sistema.
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Tu Nombre o Nick *</label>
            <input
              type="text"
              required
              placeholder="Ej. Maria Belén"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Valoración General *</label>
            <div className={styles.ratingSelectRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className={styles.starBtn}
                  title={`${star} de 5 estrellas`}
                >
                  <Star
                    size={22}
                    fill={(hoverRating || rating) >= star ? '#F59E0B' : 'transparent'}
                    color={(hoverRating || rating) >= star ? '#F59E0B' : '#CBD5E1'}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Tu Comentario u Opinión *</label>
            <textarea
              required
              rows={3}
              placeholder="Contanos cómo te ayudó esta plantilla o servicio..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={styles.textarea}
            />
          </div>

          {errorMsg && <div className={styles.emptyState}>{errorMsg}</div>}

          <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
            <Send size={16} />
            <span>{isSubmitting ? 'Publicando...' : 'Publicar Opinión'}</span>
          </button>
        </form>
      </div>
    </section>
  );
});

export default SolutionReviewsSection;
