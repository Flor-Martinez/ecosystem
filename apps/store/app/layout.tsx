import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tienda Flor Martinez',
  description: 'Productos corporativos, kits y merchandising personalizado.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
