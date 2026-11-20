'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'navy' | 'white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  leftIcon,
  rightIcon,
  className = '',
  children,
  onClick,
  ...props
}: ButtonProps) {
  const buttonClass = [
    styles.button,
    styles[variant],
    styles[size],
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
      <span className={styles.label}>{children}</span>
      {rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
    </>
  );

  if (href) {
    const isAnchor = href.startsWith('#');

    if (external) {
      return (
        <a
          href={href}
          className={buttonClass}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick as any}
        >
          {content}
        </a>
      );
    }

    if (isAnchor) {
      const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (onClick) {
          (onClick as any)(e);
        }
        if (!e.defaultPrevented) {
          e.preventDefault();
          const targetId = href.replace('#', '');
          const elem = document.getElementById(targetId);
          if (elem) {
            elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.pushState(null, '', href);
          } else {
            window.location.hash = href;
          }
        }
      };

      return (
        <a
          href={href}
          className={buttonClass}
          onClick={handleAnchorClick}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={buttonClass} onClick={onClick as any}>
        {content}
      </Link>
    );
  }

  return (
    <button className={buttonClass} onClick={onClick} {...props}>
      {content}
    </button>
  );
}
