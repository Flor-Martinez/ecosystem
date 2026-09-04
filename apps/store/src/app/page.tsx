import React from 'react';
import { products } from '@/data/products';
import { Container } from '@/components/ui/Container';
import { ProductGrid } from '@/components/store/ProductGrid';
import styles from './page.module.css';

export default function StoreHomePage() {
  return (
    <main className={styles.main}>
      <section className={styles.catalogSection}>
        <Container size="wide">
          {/* Clean E-commerce Header */}
          <div className={styles.pageHeader}>
            <span className={styles.pageTag}>CATÁLOGO OFICIAL</span>
            <h1 className={styles.pageTitle}>Tienda Flor Martinez</h1>
            <p className={styles.pageSubtitle}>
              Prendas formales, indumentaria y objetos de distinción seleccionados con la calidad y elegancia de la marca.
            </p>
          </div>

          {/* Interactive Products Grid */}
          <ProductGrid products={products} />
        </Container>
      </section>
    </main>
  );
}
