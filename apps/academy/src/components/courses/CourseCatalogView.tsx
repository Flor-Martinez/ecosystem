'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, Sparkles, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { CourseCard } from './CourseCard';
import { coursesData } from '@/data/courses';
import { learningCategories } from '@/data/categories';
import styles from './CourseCatalogView.module.css';

export function CourseCatalogView() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('categoria') || 'todas';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'todas' || course.categorySlug === selectedCategory;

      // Level filter
      const matchesLevel =
        selectedLevel === 'todos' ||
        course.level === selectedLevel ||
        (selectedLevel === 'Todos los niveles' && course.level === 'Todos los niveles');

      // Search query
      const matchesSearch =
        searchQuery.trim() === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.summary.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [selectedCategory, selectedLevel, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('todas');
    setSelectedLevel('todos');
    setSearchQuery('');
  };

  return (
    <div className={styles.catalogWrapper}>
      {/* Header */}
      <section className={styles.headerSection}>
        <Container size="wide">
          <SectionHeader
            badge="Oferta Formativa"
            badgeVariant="primary"
            title="Experiencias & Talleres de Formación"
            subtitle="Conocé nuestro programa integral de membresía y los talleres de profundización temáticos."
          />

          {/* Central Experience Highlight Banner */}
          <div className={styles.expHeroBanner}>
            <div className={styles.expBannerContent}>
              <div className={styles.expBadge}>
                <Sparkles size={12} />
                <span>PROGRAMA CENTRAL ACTIVO CON SUSCRIPCIÓN</span>
              </div>
              <h2 className={styles.expTitle}>Experiencia Búsqueda Laboral</h2>
              <p className={styles.expDesc}>
                Incluye todos los módulos formativos (CV ATS, LinkedIn, Entrevistas, Aptitudes, Dónde buscar), tracker interactivo, agenda y charlas semanales de feedback en vivo vía Zoom.
              </p>
              <div className={styles.expPills}>
                <span>✔ 5 Módulos Core</span>
                <span>✔ Zoom semanal en vivo</span>
                <span>✔ Tracker de búsquedas</span>
                <span>✔ Cupones Tienda FM</span>
              </div>
            </div>
            <div className={styles.expBannerAction}>
              <Button href="/experiencia" variant="white" size="lg">
                <span>Ver Experiencia Búsqueda Laboral</span>
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>

          {/* Search and Quick Category Bar */}
          <div className={styles.searchFilterBox}>
            <div className={styles.searchBar}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Buscar talleres por palabra clave (ej. CV, LinkedIn, Entrevista, ATS)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className={styles.clearSearchBtn}
                  aria-label="Limpiar búsqueda"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className={styles.categoryPillsRow}>
              <button
                type="button"
                className={`${styles.categoryPill} ${selectedCategory === 'todas' ? styles.categoryPillActive : ''}`}
                onClick={() => setSelectedCategory('todas')}
              >
                Todos los talleres ({coursesData.length})
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

            {/* Level Selector & Results Meta */}
            <div className={styles.filterMetaRow}>
              <div className={styles.levelFilter}>
                <Filter size={14} className={styles.filterIcon} />
                <span className={styles.filterLabel}>Nivel:</span>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className={styles.levelSelect}
                >
                  <option value="todos">Todos los niveles</option>
                  <option value="Inicial">Inicial</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Todos los niveles">General / Multi-nivel</option>
                </select>
              </div>

              <div className={styles.metaRight}>
                <span className={styles.resultsCount}>
                  Mostrando <strong>{filteredCourses.length}</strong> de {coursesData.length} talleres
                </span>
                {(selectedCategory !== 'todas' || selectedLevel !== 'todos' || searchQuery) && (
                  <button type="button" onClick={handleResetFilters} className={styles.resetBtn}>
                    Limpiar filtros
                  </button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Course Grid */}
      <section className={styles.gridSection}>
        <Container size="wide">
          {filteredCourses.length > 0 ? (
            <div className={styles.courseGrid}>
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔍</div>
              <h3 className={styles.emptyTitle}>No encontramos talleres con esos criterios</h3>
              <p className={styles.emptyDesc}>
                Probá buscando con otras palabras clave o restablecé los filtros para ver todos los programas.
              </p>
              <button type="button" onClick={handleResetFilters} className={styles.emptyResetBtn}>
                Restablecer todos los filtros
              </button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
