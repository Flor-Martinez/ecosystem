import type { Metadata } from 'next';
import { Lora, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Academia Flor Martinez — Formación Práctica, Empleabilidad & LinkedIn',
  description:
    'Plataforma educativa de Flor Martinez especializada en optimización de CV, posicionamiento estratégico en LinkedIn, preparación para entrevistas y desarrollo de carrera.',
  keywords: [
    'Academia Flor Martinez',
    'Flor Martinez',
    'Cursos de Empleabilidad',
    'Optimización de CV',
    'LinkedIn Profesional',
    'Preparación de Entrevistas',
    'Búsqueda Laboral',
    'Marca Personal',
    'Desarrollo Profesional',
  ],
  authors: [{ name: 'Flor Martinez' }],
  openGraph: {
    title: 'Academia Flor Martinez — Formación Práctica & Empleabilidad',
    description:
      'Herramientas reales y metodología aplicada para potenciar tu perfil laboral, dominar LinkedIn y acelerar tu crecimiento profesional.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Academia Flor Martinez',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Academia Flor Martinez — Formación Práctica & Empleabilidad',
    description:
      'Herramientas reales para tu crecimiento profesional y búsqueda laboral.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${lora.variable} ${plusJakarta.variable}`}>
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
