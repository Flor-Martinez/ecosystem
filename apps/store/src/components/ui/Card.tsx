import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'surface' | 'outline' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  as?: React.ElementType;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
  as: Component = 'div',
}: CardProps) {
  const classes = [
    styles.card,
    styles[variant],
    styles[`padding_${padding}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} onClick={onClick}>
      {children}
    </Component>
  );
}
