'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Star,
  Clock,
  ShieldCheck,
  ShoppingBag,
  Briefcase,
  FileSpreadsheet,
  FileText,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { solutionsData } from '@/data/solutions';
import styles from './SolucionesCatalog.module.css';

export default function SolucionesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSolutions = solutionsData.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.tagline.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.shortDescription.toLowerCase().includes(q)
    );
  });

  return (
    <main className={styles.main}>
      {/* Header Banner */}
      <section className={styles.heroSection}>
        <Container size="wide">
          <div className={styles.heroContent}>
            <div className={styles.badgeWrap}>
              <Badge variant="primary" size="md">
                <Sparkles size={14} />
                Soluciones & Herramientas Prácticas
              </Badge>
            </div>

            <h1 className={styles.title}>
              Soluciones de Alto Impacto
            </h1>

            <p className={styles.subtitle}>
              Productos digitales listos para descargar y servicios 1 a 1 personalizados para potenciar tu carrera, organizar tus finanzas y hacer destacar tu perfil.
            </p>

            {/* Simple Search Box (clean, uncluttered) */}
            <div className={styles.searchWrapper}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Buscar por solución, servicio o palabra clave (ej. CV, Finanzas, LinkedIn)..."
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
          </div>
        </Container>
      </section>

      {/* Solutions Grid */}
      <section className={styles.gridSection}>
        <Container size="wide">
          <div className={styles.metaRow}>
            <span className={styles.metaResultsCount}>
              Mostrando <strong>{filteredSolutions.length}</strong> soluciones disponibles
            </span>
            <div className={styles.guaranteePill}>
              <ShieldCheck size={14} color="#16A34A" />
              <span>Garantía de Calidad & Pago Seguro</span>
            </div>
          </div>

          {filteredSolutions.length > 0 ? (
            <div className={styles.solutionsGrid}>
              {filteredSolutions.map((item) => {
                const isExcel = item.slug === 'organizador-de-finanzas' || item.slug === 'finanzas-en-orden';

                return (
                  <Card
                    key={item.id}
                    variant="default"
                    padding="none"
                    className={styles.solutionCard}
                  >
                    {/* Top Type Ribbon */}
                    <div className={styles.cardHeaderRow}>
                      <span
                        className={`${styles.typeBadge} ${
                          isExcel ? styles.badgeExcel : styles.badgeCv
                        }`}
                      >
                        {isExcel ? <FileSpreadsheet size={14} /> : <FileText size={14} />}
                        <span>
                          {isExcel ? 'Planilla Excel / Google Sheets' : 'Rediseño de CV Profesional'}
                        </span>
                      </span>
                    </div>

                    {/* Body Info */}
                    <div className={styles.cardBody}>
                      <span className={styles.categoryLabel}>{item.category}</span>
                      <h2 className={styles.itemTitle}>
                        <Link href={`/soluciones/${item.slug}`}>{item.title}</Link>
                      </h2>
                      <p className={styles.itemTagline}>{item.tagline}</p>

                      {/* Deliverables Checklist Preview */}
                      <div className={styles.deliverablesPreview}>
                        {item.deliverables.slice(0, 2).map((del, idx) => (
                          <div key={idx} className={styles.previewCheckItem}>
                            <CheckCircle2 size={14} className={styles.checkIcon} />
                            <span>{del.title}</span>
                          </div>
                        ))}
                      </div>

                      {/* Delivery Estimate */}
                      <div className={styles.deliveryRow}>
                        <Clock size={13} className={styles.clockIcon} />
                        <span>{item.deliveryTime}</span>
                      </div>
                    </div>

                    {/* Card Footer Price & Action */}
                    <div className={styles.cardFooter}>
                      <div className={styles.priceContainer}>
                        <div className={styles.priceMain}>
                          ${item.priceARS.toLocaleString('es-AR')}{' '}
                          <small className={styles.currencyCode}>ARS</small>
                        </div>
                        <div className={styles.priceSub}>
                          o USD ${item.priceUSD} (Internacional)
                        </div>
                      </div>

                      <Link
                        href={`/soluciones/${item.slug}`}
                        className={styles.detailsCtaBtn}
                      >
                        <span>Ver detalles & Adquirir</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h3 className={styles.emptyTitle}>No encontramos soluciones para &quot;{searchQuery}&quot;</h3>
              <p className={styles.emptyDesc}>
                Probá buscando por términos como &quot;CV&quot;, &quot;Finanzas&quot;, &quot;LinkedIn&quot; o &quot;Planner&quot;.
              </p>
              <button
                type="button"
                className={styles.resetSearchBtn}
                onClick={() => setSearchQuery('')}
              >
                Ver todas las soluciones
              </button>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
