'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Star,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import {
  SolutionReviewRecord,
  addSolutionReviewAction,
  toggleHideReviewAction,
  deleteSolutionReviewAction,
} from '@/actions/solutionReviews';
import styles from './AdminOpiniones.module.css';

interface AdminOpinionesClientProps {
  initialReviews: SolutionReviewRecord[];
  initialStats: {
    totalReviews: number;
    averageRating: number;
    visibleReviewsCount: number;
  };
}

export default function AdminOpinionesClient({
  initialReviews,
  initialStats,
}: AdminOpinionesClientProps) {
  const [reviews, setReviews] = useState<SolutionReviewRecord[]>(initialReviews);
  const [stats, setStats] = useState(initialStats);

  const [formData, setFormData] = useState({
    solutionSlug: 'te-hago-tu-cv',
    customerName: '',
    rating: 5,
    text: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Recalculate local stats helper
  const updateLocalStats = (currentList: SolutionReviewRecord[]) => {
    const total = currentList.length;
    const visible = currentList.filter((r) => !r.isHidden).length;
    const sum = currentList.reduce((acc, r) => acc + r.rating, 0);
    const avg = total > 0 ? Number((sum / total).toFixed(1)) : 5.0;

    setStats({
      totalReviews: total,
      averageRating: avg,
      visibleReviewsCount: visible,
    });
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.text) {
      setMessage('Nombre del cliente y texto de la opinión son obligatorios.');
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const res = await addSolutionReviewAction({
        solutionSlug: formData.solutionSlug,
        customerName: formData.customerName,
        rating: formData.rating,
        text: formData.text,
      });

      if (res.success && res.review) {
        const updated = [res.review, ...reviews];
        setReviews(updated);
        updateLocalStats(updated);
        setFormData({
          solutionSlug: 'te-hago-tu-cv',
          customerName: '',
          rating: 5,
          text: '',
        });
        setMessage('¡Reseña publicada exitosamente!');
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage(res.error || 'Error al agregar reseña.');
      }
    } catch {
      setMessage('Error inesperado al agregar la reseña.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleHide = async (id: string) => {
    try {
      const res = await toggleHideReviewAction(id);
      if (res.success && res.review) {
        const updated = reviews.map((r) => (r.id === id ? res.review! : r));
        setReviews(updated);
        updateLocalStats(updated);
      } else {
        alert(res.error || 'Error al modificar visibilidad.');
      }
    } catch {
      alert('Error inesperado al cambiar estado.');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (
      !confirm(
        `¿Estás seguro de eliminar definitivamente la opinión de "${name}"? Esta acción borrará el registro del archivo.`
      )
    )
      return;

    try {
      const res = await deleteSolutionReviewAction(id);
      if (res.success) {
        const updated = reviews.filter((r) => r.id !== id);
        setReviews(updated);
        updateLocalStats(updated);
      } else {
        alert(res.error || 'Error al eliminar.');
      }
    } catch {
      alert('Error inesperado al eliminar.');
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div style={{ display: 'inline-flex', gap: '2px', color: '#F59E0B' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < rating ? '#F59E0B' : 'transparent'}
            stroke="#F59E0B"
          />
        ))}
      </div>
    );
  };

  const getSlugLabel = (slug: string) => {
    if (slug === 'te-hago-tu-cv') return 'Te Hago Tu CV';
    if (slug === 'organizador-de-finanzas' || slug === 'finanzas-en-orden')
      return 'Finanzas en Orden';
    return slug;
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        <Link href="/admin" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Volver al Panel Principal</span>
        </Link>

        <div className={styles.topHeader}>
          <div>
            <h1 className={styles.title}>Opiniones & Reseñas de Clientes</h1>
            <p className={styles.subtitle}>
              Moderación y control de testimonios. Puedes ocultar reseñas de la web pública (mantenan su aporte a la valoración estadística total) o eliminarlas por completo.
            </p>
          </div>
        </div>

        {/* METRICS CARDS */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Valoración Promedio</span>
            <span className={styles.statValue}>⭐ {stats.averageRating} / 5.0</span>
            <span className={styles.statSub}>Basado en todas las reseñas</span>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Reseñas Registradas</span>
            <span className={styles.statValue}>{stats.totalReviews}</span>
            <span className={styles.statSub}>Sumadas en estadística global</span>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>Públicas en la Web</span>
            <span className={styles.statValue} style={{ color: '#059669' }}>
              👁️ {stats.visibleReviewsCount}
            </span>
            <span className={styles.statSub}>Visibles para potenciales clientes</span>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>Ocultas del Sitio</span>
            <span className={styles.statValue} style={{ color: '#D97706' }}>
              🙈 {stats.totalReviews - stats.visibleReviewsCount}
            </span>
            <span className={styles.statSub}>Suman a la métrica pero no se muestran</span>
          </div>
        </div>

        {/* ADD REVIEW FORM */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <Plus size={18} />
            <span>Cargar Nueva Opinión / Testimonio Manual</span>
          </h2>
          <form onSubmit={handleAddReview} className={styles.addFormGrid}>
            <select
              value={formData.solutionSlug}
              onChange={(e) => setFormData({ ...formData, solutionSlug: e.target.value })}
              className={styles.select}
            >
              <option value="te-hago-tu-cv">Solución: Te Hago Tu CV</option>
              <option value="organizador-de-finanzas">Solución: Finanzas en Orden</option>
              <option value="general">General / Ecosistema</option>
            </select>

            <input
              type="text"
              required
              placeholder="Nombre del Cliente (ej. Mariana S.) *"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className={styles.input}
            />

            <select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
              className={styles.select}
            >
              <option value={5}>Rating: ⭐⭐⭐⭐⭐ (5 estrellas)</option>
              <option value={4}>Rating: ⭐⭐⭐⭐ (4 estrellas)</option>
              <option value={3}>Rating: ⭐⭐⭐ (3 estrellas)</option>
              <option value={2}>Rating: ⭐⭐ (2 estrellas)</option>
              <option value={1}>Rating: ⭐ (1 estrella)</option>
            </select>

            <textarea
              required
              placeholder="Escribe aquí el testimonio o reseña enviada por el cliente *"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              className={styles.textarea}
            />

            <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
              <Sparkles size={16} />
              <span>{isSubmitting ? 'Guardando...' : 'Publicar Reseña'}</span>
            </button>
          </form>

          {message && (
            <div style={{ marginTop: '12px', fontSize: '13px', fontWeight: 600, color: '#0D1B2A' }}>
              {message}
            </div>
          )}
        </div>

        {/* REVIEWS TABLE */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <MessageSquare size={18} />
            <span>Listado General de Reseñas ({reviews.length})</span>
          </h2>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Solución</th>
                  <th>Cliente</th>
                  <th>Calificación</th>
                  <th>Opinión / Testimonio</th>
                  <th>Visibilidad Web</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reviews.length > 0 ? (
                  reviews.map((rev) => {
                    const isHidden = !!rev.isHidden;
                    return (
                      <tr key={rev.id} className={isHidden ? styles.rowHidden : ''}>
                        <td style={{ whiteSpace: 'nowrap', fontSize: '12px', color: '#64748B' }}>
                          {new Date(rev.createdAt).toLocaleDateString('es-AR', {
                            day: 'numeric',
                            month: 'short',
                            year: '2-digit',
                          })}
                        </td>
                        <td>
                          <span className={styles.badgeSolution}>
                            {getSlugLabel(rev.solutionSlug)}
                          </span>
                        </td>
                        <td style={{ fontWeight: 700, color: '#0D1B2A' }}>{rev.customerName}</td>
                        <td>{renderStars(rev.rating)}</td>
                        <td style={{ maxWidth: '320px', lineHeight: '1.45' }}>{rev.text}</td>
                        <td>
                          {isHidden ? (
                            <span className={styles.badgeOculta} title="Oculta al público pero suma en estadísticas">
                              🙈 Oculta (Mantiene Rating)
                            </span>
                          ) : (
                            <span className={styles.badgeVisible} title="Pública en el sitio web">
                              👁️ Visible en Web
                            </span>
                          )}
                        </td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => handleToggleHide(rev.id)}
                              className={styles.toggleBtn}
                              title={isHidden ? 'Mostrar en la web' : 'Ocultar de la web'}
                            >
                              {isHidden ? <Eye size={14} /> : <EyeOff size={14} />}
                              <span>{isHidden ? 'Mostrar' : 'Ocultar'}</span>
                            </button>

                            <button
                              onClick={() => handleDelete(rev.id, rev.customerName)}
                              className={styles.deleteBtn}
                              title="Eliminar opinión permanentemente"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', color: '#64748B', padding: '24px' }}>
                      No hay reseñas registradas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
