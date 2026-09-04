'use client';

import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Send,
  MapPin,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import styles from './QuoteModal.module.css';

export function QuoteModal() {
  const { isQuoteModalOpen, setIsQuoteModalOpen, items, subtotal, totalItems, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isQuoteModalOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      clearCart();
    }, 600);
  };

  const handleClose = () => {
    setIsQuoteModalOpen(false);
    setTimeout(() => {
      setSubmitted(false);
    }, 300);
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Finalizar compra"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Cerrar ventana"
        >
          <X size={20} />
        </button>

        {submitted ? (
          /* Success Screen */
          <div className={styles.successScreen}>
            <div className={styles.successIconBox}>
              <CheckCircle2 size={46} />
            </div>
            <h3 className={styles.successTitle}>¡Pedido Registrado con Éxito!</h3>
            <p className={styles.successDesc}>
              Muchas gracias por tu compra, <strong>{formData.name}</strong>. Te enviamos el detalle y los pasos para coordinar la entrega y el pago a <strong>{formData.email}</strong>.
            </p>
            <div className={styles.ticketCard}>
              <div className={styles.ticketRow}>
                <span>Número de Orden:</span>
                <strong>FM-{Math.floor(100000 + Math.random() * 900000)}</strong>
              </div>
              <div className={styles.ticketRow}>
                <span>Estado:</span>
                <span className={styles.ticketPending}>En preparación</span>
              </div>
            </div>
            <Button variant="primary" size="md" onClick={handleClose}>
              Volver a la Tienda
            </Button>
          </div>
        ) : (
          /* Form Screen */
          <div className={styles.formContainer}>
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerIcon}>
                <ShoppingBag size={22} />
              </div>
              <div>
                <h3 className={styles.title}>Finalizar Pedido</h3>
                <p className={styles.subtitle}>
                  Completa tus datos para coordinar el despacho y medios de pago.
                </p>
              </div>
            </div>

            {/* Items preview */}
            {items.length > 0 && (
              <div className={styles.itemsSummary}>
                <div className={styles.summaryTop}>
                  <span className={styles.summaryCount}>
                    {totalItems} {totalItems === 1 ? 'producto' : 'productos'}:
                  </span>
                  <strong className={styles.summaryTotal}>{formatPrice(subtotal)}</strong>
                </div>
                <div className={styles.itemsChips}>
                  {items.map((it) => (
                    <span key={it.product.id} className={styles.itemChip}>
                      {it.quantity}x {it.product.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                {/* Nombre */}
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Nombre y Apellido *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Ej: Sofia Morales"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={styles.input}
                  />
                </div>

                {/* Email */}
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Correo Electrónico *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="sofia@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={styles.input}
                  />
                </div>

                {/* Teléfono */}
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+54 9 11 0000-0000"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={styles.input}
                  />
                </div>

                {/* Dirección / Localidad */}
                <div className={styles.formGroup}>
                  <label htmlFor="address" className={styles.label}>
                    <MapPin size={13} />
                    <span>Dirección o Ciudad *</span>
                  </label>
                  <input
                    id="address"
                    type="text"
                    required
                    placeholder="Ej: Av. Santa Fe 1234, CABA"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Notas opcionales */}
              <div className={styles.formGroup}>
                <label htmlFor="notes" className={styles.label}>
                  Aclaraciones para la entrega o detalles (opcional):
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  placeholder="Horarios de entrega preferidos o aclaraciones sobre el producto..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className={styles.textarea}
                />
              </div>

              {/* Submit */}
              <div className={styles.formActions}>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={loading || items.length === 0}
                  iconLeft={loading ? undefined : <Send size={17} />}
                >
                  <span>{loading ? 'Procesando pedido...' : 'Confirmar Pedido'}</span>
                </Button>
                <span className={styles.guaranteeText}>
                  Nos pondremos en contacto vía WhatsApp o correo para confirmar el envío.
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
