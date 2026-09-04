'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import styles from './CartDrawer.module.css';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    subtotal,
    totalItems,
    setIsQuoteModalOpen,
  } = useCart();

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsQuoteModalOpen(true);
  };

  return (
    <div
      className={styles.backdrop}
      onClick={() => setIsCartOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Carrito de compras"
    >
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitleWrap}>
            <div className={styles.bagIconBox}>
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 className={styles.headerTitle}>Mi Carrito</h3>
              <span className={styles.headerSubtitle}>
                {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
              </span>
            </div>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setIsCartOpen(false)}
            aria-label="Cerrar carrito"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.emptyCart}>
              <div className={styles.emptyIconCircle}>
                <ShoppingBag size={38} />
              </div>
              <h4 className={styles.emptyTitle}>Tu carrito está vacío</h4>
              <p className={styles.emptyText}>
                Descubre nuestra selección de prendas formales, accesorios y regalos en el catálogo.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsCartOpen(false)}
              >
                Explorar Catálogo
              </Button>
            </div>
          ) : (
            <div className={styles.itemsList}>
              {items.map((item) => {
                const itemTotal = item.product.price * item.quantity;

                return (
                  <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className={styles.itemCard}>
                    {/* Thumbnail */}
                    <div className={styles.itemThumb}>
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        className={styles.thumbImg}
                      />
                    </div>

                    {/* Details */}
                    <div className={styles.itemInfo}>
                      <div className={styles.itemTopRow}>
                        <h4 className={styles.itemName}>{item.product.name}</h4>
                        <button
                          type="button"
                          className={styles.removeBtn}
                          onClick={() => removeItem(item.product.id)}
                          title="Quitar producto"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      {/* Options */}
                      <div className={styles.itemVariants}>
                        {item.selectedSize && (
                          <span className={styles.variantBadge}>Talle: {item.selectedSize}</span>
                        )}
                        {item.selectedColor && (
                          <span className={styles.variantBadge}>Color: {item.selectedColor}</span>
                        )}
                      </div>

                      {/* Price & Qty */}
                      <div className={styles.itemBottomRow}>
                        <div className={styles.qtyControl}>
                          <button
                            type="button"
                            className={styles.qtyBtn}
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                          >
                            <Minus size={13} />
                          </button>
                          <span className={styles.qtyDisplay}>{item.quantity}</span>
                          <button
                            type="button"
                            className={styles.qtyBtn}
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <div className={styles.itemPriceWrap}>
                          <strong className={styles.itemTotal}>
                            {formatPrice(itemTotal)}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.summaryBox}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Total a pagar:</span>
                <strong className={styles.summaryTotal}>{formatPrice(subtotal)}</strong>
              </div>
            </div>

            <div className={styles.trustNotice}>
              <ShieldCheck size={15} className={styles.trustIcon} />
              <span>Compra segura respaldada por Flor Martinez</span>
            </div>

            <div className={styles.footerActions}>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleCheckout}
              >
                <span>Iniciar Compra</span>
                <ArrowRight size={16} />
              </Button>

              <button
                type="button"
                className={styles.continueBtn}
                onClick={() => setIsCartOpen(false)}
              >
                Seguir comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
