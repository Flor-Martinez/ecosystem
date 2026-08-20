import React from 'react';
import styles from './BrandLogo.module.css';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'arena' | 'violet';
  branch?: 'agencia' | 'academia' | 'tienda';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export function BrandLogo({
  variant = 'light',
  branch = 'academia',
  size = 'md',
  showSubtitle = true,
  className = '',
}: BrandLogoProps) {
  const branchLabels = {
    agencia: 'AGENCIA',
    academia: 'ACADEMIA',
    tienda: 'TIENDA',
  };

  return (
    <div className={`${styles.logoWrap} ${styles[variant]} ${styles[size]} ${className}`}>
      {/* Interlocking FM Monogram Emblem */}
      <div className={styles.monogramBox}>
        <span className={styles.letterF}>F</span>
        <span className={styles.letterM}>M</span>
      </div>

      {/* Wordmark typography */}
      <div className={styles.wordmarkWrap}>
        <span className={styles.brandName}>FLOR MARTINEZ</span>
        {showSubtitle && (
          <div className={styles.subtitleRow}>
            {branch ? (
              <>
                <span className={styles.subLine} />
                <span className={styles.branchName}>{branchLabels[branch]}</span>
                <span className={styles.subLine} />
              </>
            ) : (
              <span className={styles.genericSub}>EDUCACIÓN & EMPLEABILIDAD</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function FMMonogram({
  size = 48,
  variant = 'circle-violet',
  className = '',
}: {
  size?: number;
  variant?: 'circle-navy' | 'circle-blue' | 'circle-violet' | 'circle-arena' | 'circle-marfil' | 'plain';
  className?: string;
}) {
  return (
    <div
      className={`${styles.monogramCircle} ${styles[variant]} ${className}`}
      style={{ width: size, height: size }}
    >
      <div className={styles.emblemLetters}>
        <span className={styles.emblemF}>F</span>
        <span className={styles.emblemM}>M</span>
      </div>
    </div>
  );
}
