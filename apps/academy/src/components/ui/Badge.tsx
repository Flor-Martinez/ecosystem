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
    | 'blue'
    | 'free';
  size?: 'sm' | 'md';
  dot?: boolean;
  pulse?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Badge({
  variant = 'primary',
  size = 'md',
  dot = false,
  pulse = false,
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
      {dot && <span className={`${styles.dot} ${pulse ? styles.pulse : ''}`} aria-hidden="true" />}
      <span>{children}</span>
    </span>
  );
}
