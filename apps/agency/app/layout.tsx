import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Flor Martinez — Agencia',
  description:
    'Estrategia, marketing, tecnología y desarrollo web para empresas y emprendedores.',
  icons: {
    icon: [
      { url: '/favicon-fm.png?v=2', type: 'image/png', sizes: '192x192' },
      { url: '/favicon-fm.ico?v=2', type: 'image/x-icon' },
    ],
    shortcut: '/favicon-fm.ico?v=2',
    apple: '/apple-touch-icon-fm.png?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}