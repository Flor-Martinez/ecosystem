import React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'wide' | 'narrow';
  id?: string;
}

export function Container({
  children,
  className = '',
  size = 'default',
  id,
}: ContainerProps) {
  const sizeClass =
    size === 'wide'
      ? styles.containerWide
      : size === 'narrow'
        ? styles.containerNarrow
        : styles.containerDefault;

  return (
    <div id={id} className={`${styles.container} ${sizeClass} ${className}`}>
      {children}
    </div>
  );
}
