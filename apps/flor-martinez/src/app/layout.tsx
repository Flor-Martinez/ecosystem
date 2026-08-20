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
  title: 'Flor Martinez — Marca Personal, Portfolio & Ecosistema Digital',
  description:
    'Especialista en Comercio Exterior, Marketing y Desarrollo Profesional. Hub central del ecosistema Flor Martinez: Agencia, Academia y Tienda.',
  keywords: [
    'Flor Martinez',
    'Comercio Exterior',
    'Marketing',
    'Desarrollo Profesional',
    'Academia Flor Martinez',
    'Agencia Flor Martinez',
    'Consultoría',
  ],
  authors: [{ name: 'Flor Martinez' }],
  openGraph: {
    title: 'Flor Martinez — Marca Personal & Ecosistema Digital',
    description:
      'Especialista en Comercio Exterior, Marketing y Desarrollo Profesional. Portfolio y ecosistema digital.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Flor Martinez',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flor Martinez — Marca Personal & Ecosistema Digital',
    description:
      'Especialista en Comercio Exterior, Marketing y Desarrollo Profesional.',
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
