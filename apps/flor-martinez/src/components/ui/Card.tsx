import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  variant?: 'default' | 'surface' | 'outline' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export function Card({
  variant = 'default',
  padding = 'md',
  className = '',
  children,
}: CardProps) {
  const cardClass = [
    styles.card,
    styles[variant],
    styles[`padding_${padding}`],
    className,
  ].filter(Boolean).join(' ');

  return <div className={cardClass}>{children}</div>;
}
