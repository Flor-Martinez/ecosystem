import React from 'react';
import { Badge, BadgeProps } from './Badge';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: BadgeProps['variant'];
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  badge,
  badgeVariant = 'primary',
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'left' ? styles.alignLeft : styles.alignCenter;

  return (
    <header className={`${styles.header} ${alignClass} ${className}`}>
      {badge && (
        <div className={styles.badgeWrapper}>
          <Badge variant={badgeVariant} size="md">
            {badge}
          </Badge>
        </div>
      )}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
}
