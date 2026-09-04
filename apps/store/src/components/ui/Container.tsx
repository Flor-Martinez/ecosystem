import React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'default' | 'wide' | 'narrow';
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  size = 'default',
  className = '',
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component className={`${styles.container} ${styles[size]} ${className}`}>
      {children}
    </Component>
  );
}
