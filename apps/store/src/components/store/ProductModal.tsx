'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  ShoppingBag,
  Check,
  Plus,
  Minus,
  Layers,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import styles from './ProductModal.module.css';

export function ProductModal() {
  const { selectedProductForModal, closeProductModal, addItem } = useCart();

  const product = selectedProductForModal;

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  // Reset local state when product changes
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedSize(product.sizes?.[0] ?? '');
      setSelectedColor(product.colors?.[0]?.name ?? '');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeProductModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeProductModal]);

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const totalAmount = product.price * quantity;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor);
    closeProductModal();
  };

  return (
    <div
      className={styles.backdrop}
      onClick={closeProductModal}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalles de ${product.name}`}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className={styles.closeBtn}
          onClick={closeProductModal}
          aria-label="Cerrar ventana"
        >
          <X size={20} />
        </button>

        <div className={styles.modalGrid}>
          {/* Left Column: Image */}
          <div className={styles.imageCol}>
            <div className={styles.imageWrap}>
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className={styles.modalImage}
              />
              {product.badge && (
                <div className={styles.badgeWrap}>
                  <Badge variant="primary" size="md">
                    {product.badge}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Details & Add to cart */}
          <div className={styles.infoCol}>
            <div className={styles.categoryHeader}>
              <span className={styles.categoryName}>{product.categoryLabel}</span>
            </div>

            <h2 className={styles.productTitle}>{product.name}</h2>

            {/* Pricing Box */}
            <div className={styles.priceRow}>
              <span className={styles.priceValue}>{formatPrice(product.price)}</span>
            </div>

            <p className={styles.highlightText}>{product.highlight}</p>

            {/* Description */}
            <div className={styles.descriptionSection}>
              <p className={styles.descriptionText}>{product.description}</p>
            </div>

            {/* Materials & Specs */}
            <div className={styles.specsSection}>
              <h4 className={styles.sectionTitle}>
                <Layers size={15} />
                <span>Materiales & Características</span>
              </h4>
              <p className={styles.materialText}><strong>Composición:</strong> {product.materials}</p>
              <ul className={styles.featureList}>
                {product.features.map((feat, idx) => (
                  <li key={idx} className={styles.featureItem}>
                    <Check size={14} className={styles.checkIcon} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colors Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className={styles.optionsSection}>
                <div className={styles.optionHeader}>
                  <label className={styles.optionLabel}>Color:</label>
                  <span className={styles.optionSelected}>{selectedColor}</span>
                </div>
                <div className={styles.colorSwatches}>
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      className={`${styles.colorBtn} ${selectedColor === c.name ? styles.colorBtnActive : ''}`}
                      onClick={() => setSelectedColor(c.name)}
                      title={c.name}
                    >
                      <span
                        className={styles.colorDot}
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className={styles.colorNameText}>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className={styles.optionsSection}>
                <div className={styles.optionHeader}>
                  <label className={styles.optionLabel}>Talle / Medida:</label>
                  <span className={styles.optionSelected}>{selectedSize}</span>
                </div>
                <div className={styles.sizesRow}>
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`${styles.sizeBtn} ${selectedSize === s ? styles.sizeBtnActive : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Total Price */}
            <div className={styles.quantitySection}>
              <div className={styles.qtyControlRow}>
                <div className={styles.qtyBox}>
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className={styles.qtyInput}
                  />
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className={styles.totalPreview}>
                  <span className={styles.totalLabel}>Total:</span>
                  <strong className={styles.totalValue}>{formatPrice(totalAmount)}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={styles.modalActions}>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  iconLeft={<ShoppingBag size={18} />}
                  onClick={handleAddToCart}
                >
                  <span>Añadir al Carrito</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
