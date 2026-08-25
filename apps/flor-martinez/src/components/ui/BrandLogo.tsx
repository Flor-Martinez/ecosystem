import React from 'react';
import styles from './BrandLogo.module.css';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'arena';
  branch?: 'agencia' | 'academia' | 'tienda';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

/**
 * Authentic Interlocking FM Monogram SVG
 * Exactly matching the Flor Martinez Brand Manual:
 * - Serif 'F' with extended top arm sheltering the 'M' with upward terminal curve.
 * - Classical Didone / Playfair high-contrast serifs and interlocking middle bar.
 */
export function FMMonogramSvg({
  size = 40,
  className = '',
  color = 'currentColor',
}: {
  size?: number;
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 220 220"
      width={size}
      height={size}
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
      aria-label="Flor Martinez Monogram"
    >
      {/* Letter F Vertical Stem & Foot/Head Serifs */}
      <path d="M 32 184 L 62 184 L 62 178 L 53 178 C 49.5 178 48.5 176.5 48.5 172.5 L 48.5 48 C 48.5 44 49.5 42.5 53 42.5 L 62 42.5 L 62 36.5 L 22 36.5 L 22 42.5 L 30 42.5 C 33.5 42.5 34.5 44 34.5 48 L 34.5 172.5 C 34.5 176.5 33.5 178 30 178 L 22 178 L 22 184 Z" />
      
      {/* Letter F Extended Top Arm Sheltering M with graceful upward terminal curve */}
      <path d="M 48.5 42.5 L 140 42.5 C 160 42.5 178 39.5 192 33 C 187 37.5 182 47.5 185 52.5 C 188 57 195 55 195 49 C 195 39 178 35.5 152 35.5 L 48.5 35.5 Z" />
      
      {/* Letter F Middle Crossbar */}
      <path d="M 48.5 98 L 94 98 L 98 91 L 94 84 L 48.5 84 Z" />

      {/* Letter M Left Stem */}
      <path d="M 84 184 L 110 184 L 110 178 L 103 178 C 99.5 178 98.5 176.5 98.5 172.5 L 98.5 82 C 99.5 78 100.5 76.5 104 76.5 L 110 76.5 L 110 70.5 L 82 70.5 L 82 76.5 L 89 76.5 C 92.5 76.5 93.5 78 93.5 82 L 93.5 172.5 C 93.5 176.5 92.5 178 89 178 L 82 178 L 82 184 Z" />

      {/* Letter M High-Contrast Diagonal V-Strokes */}
      <polygon points="98,76 136,170 144,170 110,76" />
      <polygon points="136,170 174,76 179,76 142,170" />

      {/* Letter M Right Stem */}
      <path d="M 166 184 L 194 184 L 194 178 L 187 178 C 183.5 178 182.5 176.5 182.5 172.5 L 182.5 82 C 182.5 78 183.5 76.5 187 76.5 L 194 76.5 L 194 70.5 L 166 70.5 L 166 76.5 L 173 76.5 C 176.5 76.5 177.5 78 177.5 82 L 177.5 172.5 C 177.5 176.5 176.5 178 173 178 L 166 178 L 166 184 Z" />
    </svg>
  );
}

export function BrandLogo({
  variant = 'light',
  branch,
  size = 'md',
  showSubtitle = true,
  className = '',
}: BrandLogoProps) {
  const branchLabels = {
    agencia: 'AGENCIA',
    academia: 'ACADEMIA',
    tienda: 'TIENDA',
  };

  const monogramSizes = {
    sm: 34,
    md: 44,
    lg: 54,
  };

  return (
    <div className={`${styles.logoWrap} ${styles[variant]} ${styles[size]} ${className}`}>
      {/* Official Vector FM Monogram Emblem */}
      <div className={styles.monogramBox}>
        <FMMonogramSvg size={monogramSizes[size]} />
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
              <span className={styles.genericSub}>MARCA PERSONAL & ECOSISTEMA</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function FMMonogram({
  size = 48,
  variant = 'circle-navy',
  className = '',
}: {
  size?: number;
  variant?: 'circle-navy' | 'circle-blue' | 'circle-arena' | 'circle-marfil' | 'plain';
  className?: string;
}) {
  return (
    <div
      className={`${styles.monogramCircle} ${styles[variant]} ${className}`}
      style={{ width: size, height: size }}
    >
      <FMMonogramSvg size={Math.round(size * 0.72)} />
    </div>
  );
}
