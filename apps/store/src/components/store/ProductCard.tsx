'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, openProductModal } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card variant="default" padding="none" className={styles.productCard}>
      {/* Media Box */}
      <div className={styles.imageWrap} onClick={() => openProductModal(product)}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1400px) 33vw, 25vw"
          className={styles.productImage}
        />
        <div className={styles.imageOverlay}>
          <button
            type="button"
            className={styles.quickViewBtn}
            onClick={(e) => {
              e.stopPropagation();
              openProductModal(product);
            }}
            aria-label={`Vista rápida de ${product.name}`}
          >
            <Eye size={16} />
            <span>Ver Ficha</span>
          </button>
        </div>

        {/* Badge on image */}
        {product.badge && (
          <div className={styles.badgeTopLeft}>
            <Badge variant="primary" size="sm">
              {product.badge}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.metaRow}>
          <span className={styles.categoryLabel}>{product.categoryLabel}</span>
        </div>

        <h3
          className={styles.title}
          onClick={() => openProductModal(product)}
          title={product.name}
        >
          {product.name}
        </h3>

        <p className={styles.highlight}>{product.highlight}</p>

        {/* Pricing */}
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button
            variant="primary"
            size="sm"
            fullWidth
            iconLeft={<ShoppingBag size={15} />}
            onClick={() => addItem(product, 1)}
          >
            <span>Añadir al Carrito</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
