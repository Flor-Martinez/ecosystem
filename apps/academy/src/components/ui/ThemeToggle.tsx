'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  variant?: 'header' | 'navbar' | 'compact';
}

export function ThemeToggle({ variant = 'header' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={`${styles.themeToggleBtn} ${styles[variant]} ${isDark ? styles.btnDark : styles.btnLight}`}
      onClick={toggleTheme}
      title={isDark ? 'Cambiar a Modo Claro (Light)' : 'Cambiar a Modo Oscuro (Dark)'}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
    >
      <div className={styles.iconTrack}>
        {isDark ? (
          <>
            <Moon size={15} className={styles.moonIcon} />
            {variant !== 'compact' && <span className={styles.themeLabel}>Oscuro</span>}
          </>
        ) : (
          <>
            <Sun size={15} className={styles.sunIcon} />
            {variant !== 'compact' && <span className={styles.themeLabel}>Claro</span>}
          </>
        )}
      </div>
    </button>
  );
}
