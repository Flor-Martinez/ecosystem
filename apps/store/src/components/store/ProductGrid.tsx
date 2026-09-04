'use client';

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, PackageOpen } from 'lucide-react';
import { Product, ProductCategory } from '@/types';
import { categoryTabs } from '@/data/products';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/Button';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by category
    if (selectedCategory !== 'todos') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.highlight.toLowerCase().includes(q) ||
          p.materials.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div id="catalogo" className={styles.gridSection}>
      {/* Category Tabs & Search Toolbar */}
      <div className={styles.toolbar}>
        {/* Category Pills */}
        <div className={styles.categoryTabs} role="tablist">
          {categoryTabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            const count =
              tab.id === 'todos'
                ? products.length
                : products.filter((p) => p.category === tab.id).length;

            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(tab.id as ProductCategory)}
                className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
              >
                <span>{tab.label}</span>
                <span className={styles.tabCount}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Filter Controls: Search + Sort */}
        <div className={styles.controlsRow}>
          {/* Search Box */}
          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar prendas o artículos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className={styles.clearSearchBtn}
                title="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className={styles.sortBox}>
            <SlidersHorizontal size={14} className={styles.sortIcon} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className={styles.sortSelect}
              aria-label="Ordenar catálogo"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
            </select>
          </div>
        </div>
      </div>

      {/* Meta Bar */}
      <div className={styles.metaNotice}>
        <span className={styles.resultsCount}>
          Mostrando <strong>{filteredProducts.length}</strong> artículos
        </span>
        {searchQuery && (
          <span className={styles.queryTag}>
            Búsqueda: "{searchQuery}"
          </span>
        )}
      </div>

      {/* Grid of Cards */}
      {filteredProducts.length > 0 ? (
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className={styles.emptyState}>
          <div className={styles.emptyIconBox}>
            <PackageOpen size={42} />
          </div>
          <h3 className={styles.emptyTitle}>No encontramos productos coincidentes</h3>
          <p className={styles.emptyDesc}>
            Intenta modificar los términos de búsqueda o selecciona otra categoría.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedCategory('todos');
              setSearchQuery('');
            }}
          >
            Restablecer Filtros
          </Button>
        </div>
      )}
    </div>
  );
}
