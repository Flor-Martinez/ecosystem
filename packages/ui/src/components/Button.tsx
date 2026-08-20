import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      'bg-[var(--primary)] text-white hover:opacity-90',
    secondary:
      'bg-[var(--secondary)] text-white hover:opacity-90',
    outline:
      'border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white',
  };

  return (
    <button
      className={`rounded-[var(--radius-md)] px-6 py-3 font-medium transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}