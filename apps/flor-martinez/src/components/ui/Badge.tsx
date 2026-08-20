import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'success'
    | 'warning'
    | 'academia'
    | 'agencia'
    | 'tienda';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Badge({
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
  children,
}: BadgeProps) {
  const badgeClass = [
    styles.badge,
    styles[variant],
    styles[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClass}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      <span>{children}</span>
    </span>
  );
}
