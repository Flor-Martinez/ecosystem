'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, ArrowRight, Loader2, Lock, Check } from 'lucide-react';
import { useEcosystemAuth } from '@/context/AuthContext';
import styles from './ExperiencePurchaseModal.module.css';

interface ExperiencePurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExperiencePurchaseModal({ isOpen, onClose }: ExperiencePurchaseModalProps) {
  const { user } = useEcosystemAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-prefill if user is already authenticated
  useEffect(() => {
    if (user) {
      if (user.name) setName(user.name);
      if (user.email) setEmail(user.email);
    }
  }, [user]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Por favor ingresá tu nombre y apellido.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Por favor ingresá un correo electrónico válido.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/checkout/mercadopago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name.trim(),
          customerEmail: email.trim(),
          customerPhone: phone.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!data.success || !data.initPoint) {
        setError(data.error || 'No se pudo conectar con Mercado Pago. Intentá de nuevo.');
        setLoading(false);
        return;
      }

      // Redirect directly to Mercado Pago checkout
      window.location.href = data.initPoint;
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError('Ocurrió un error inesperado. Por favor verificá tu conexión e intentá nuevamente.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className={styles.closeBtn}
          title="Cerrar ventana"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        <div className={styles.headerArea}>
          <div className={styles.badgePill}>
            <Sparkles size={12} />
            <span>Promo de Lanzamiento</span>
          </div>
          <h2 className={styles.modalTitle}>Inscribirme a la Experiencia</h2>
          <p className={styles.modalSubtitle}>
            Completá tus datos para ingresar a la pasarela de pago oficial de Mercado Pago y activar tu acceso.
          </p>
        </div>

        {/* Order Summary */}
        <div className={styles.summaryBox}>
          <div className={styles.summaryTop}>
            <span className={styles.summaryItemTitle}>Pase Anual — Método EBL</span>
            <span className={styles.summaryBadge}>Pago Único</span>
          </div>
          <p className={styles.summaryDesc}>
            Acceso a los 10 módulos (+35 clases en HD), Tracker de Postulaciones, Agenda, plantillas ATS y consultas con Flor durante 1 año.
          </p>
          <div className={styles.summaryPriceRow}>
            <span className={styles.priceLabel}>Total a abonar:</span>
            <div className={styles.priceValues}>
              <span className={styles.oldPrice}>$ 35.000</span>
              <strong className={styles.newPrice}>$ 25.000 ARS</strong>
            </div>
          </div>
        </div>

        {error && <div className={styles.errorBox}>{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="modal-name">
              Nombre y Apellido *
            </label>
            <input
              id="modal-name"
              type="text"
              required
              className={styles.input}
              placeholder="Ej: Sofía Benítez"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="modal-email">
              Correo Electrónico *
            </label>
            <input
              id="modal-email"
              type="email"
              required
              className={styles.input}
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || Boolean(user?.email)}
              readOnly={Boolean(user?.email)}
            />
            <span className={styles.hint}>
              {user?.email
                ? 'Vinculado a tu cuenta de Google. El acceso VIP se activará automáticamente aquí al finalizar el pago.'
                : 'Con este correo se activará tu acceso inmediato en el campus virtual.'}
            </span>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="modal-phone">
              WhatsApp / Teléfono <span style={{ fontWeight: 400, color: '#94A3B8' }}>(opcional)</span>
            </label>
            <input
              id="modal-phone"
              type="tel"
              className={styles.input}
              placeholder="Ej: +54 9 11 1234-5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
            />
            <span className={styles.hint}>
              Para avisos de nuevas clases y soporte directo.
            </span>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Conectando con Mercado Pago...</span>
              </>
            ) : (
              <>
                <span>Pagar $25.000 con Mercado Pago</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <div className={styles.securityNote}>
            <Lock size={12} />
            <span>Transacción encriptada y procesada por Mercado Pago Oficial</span>
          </div>
        </form>
      </div>
    </div>
  );
}
