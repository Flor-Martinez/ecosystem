import type { Metadata } from 'next';
import { Lora, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductModal } from '@/components/store/ProductModal';
import { CartDrawer } from '@/components/store/CartDrawer';
import { QuoteModal } from '@/components/store/QuoteModal';
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
  title: 'Tienda Flor Martinez — Prendas Formales & Regalos de Distinción',
  description:
    'Tienda oficial de Flor Martinez. Prendas sastreras, indumentaria formal y objetos de distinción seleccionados.',
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
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
            {/* Global Interactive Overlays */}
            <ProductModal />
            <CartDrawer />
            <QuoteModal />
            <AuthModal />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
