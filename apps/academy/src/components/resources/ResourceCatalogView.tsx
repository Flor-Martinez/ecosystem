'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, FolderDown, RotateCcw } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ResourceCard } from './ResourceCard';
import { resourcesData } from '@/data/resources';
import { learningCategories } from '@/data/categories';
import styles from './ResourceCatalogView.module.css';

export function ResourceCatalogView() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('categoria') || 'todas';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedType, setSelectedType] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const types = [
    { id: 'todos', label: 'Todos los formatos' },
    { id: 'Plantilla', label: 'Plantillas' },
    { id: 'Guía PDF', label: 'Guías PDF' },
    { id: 'Checklist', label: 'Checklists' },
    { id: 'Directorio', label: 'Directorios' },
  ];

  const filteredResources = useMemo(() => {
    return resourcesData.filter((res) => {
      const matchesCategory =
        selectedCategory === 'todas' || res.categorySlug === selectedCategory;

      const matchesType = selectedType === 'todos' || res.type === selectedType;

      const matchesSearch =
        searchQuery.trim() === '' ||
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesType && matchesSearch;
    });
  }, [selectedCategory, selectedType, searchQuery]);

  const handleReset = () => {
    setSelectedCategory('todas');
    setSelectedType('todos');
    setSearchQuery('');
  };

  return (
    <div className={styles.catalogWrapper}>
      <section className={styles.headerSection}>
        <Container size="wide">
          <SectionHeader
            badge="Biblioteca Gratuita"
            badgeVariant="primary"
            title="Recursos & Herramientas de Empleabilidad"
            subtitle="Accedé sin costo a plantillas de CV editables, listas de control para entrevistas y directorios curados para acelerar tu búsqueda laboral."
          />

          <div className={styles.searchFilterBox}>
            <div className={styles.searchBar}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Buscar recursos por tema o palabra clave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className={styles.clearBtn}
                  aria-label="Limpiar búsqueda"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className={styles.categoryPillsRow}>
              <button
                type="button"
                className={`${styles.categoryPill} ${selectedCategory === 'todas' ? styles.categoryPillActive : ''}`}
                onClick={() => setSelectedCategory('todas')}
              >
                Todos los recursos ({resourcesData.length})
              </button>
              {learningCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`${styles.categoryPill} ${selectedCategory === cat.slug ? styles.categoryPillActive : ''}`}
                  onClick={() => setSelectedCategory(cat.slug)}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Type Filter & Count */}
            <div className={styles.filterMetaRow}>
              <div className={styles.typeFilter}>
                <span className={styles.typeLabel}>Formato:</span>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className={styles.typeSelect}
                >
                  {types.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.resultsCount}>
                <span>Mostrando <strong>{filteredResources.length}</strong> de {resourcesData.length} recursos</span>
                {(selectedCategory !== 'todas' || selectedType !== 'todos' || searchQuery) && (
                  <button type="button" onClick={handleReset} className={styles.resetBtn}>
                    <RotateCcw size={12} />
                    <span>Restablecer</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Grid */}
      <section className={styles.resultsSection}>
        <Container size="wide">
          {filteredResources.length > 0 ? (
            <div className={styles.grid}>
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIconWrap}>
                <FolderDown size={36} />
              </div>
              <h3 className={styles.emptyTitle}>No se encontraron recursos</h3>
              <p className={styles.emptyDesc}>
                No hay materiales para los filtros seleccionados. Probá modificando el término de búsqueda.
              </p>
              <button type="button" onClick={handleReset} className={styles.emptyResetBtn}>
                Ver todos los recursos
              </button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
