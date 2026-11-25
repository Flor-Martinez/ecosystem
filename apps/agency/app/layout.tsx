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
      { url: '/favicon-flor.png?v=1', type: 'image/png', sizes: '192x192' },
      { url: '/favicon-flor.ico?v=1', type: 'image/x-icon' },
    ],
    shortcut: '/favicon-flor.ico?v=1',
    apple: '/apple-touch-icon-flor.png?v=1',
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