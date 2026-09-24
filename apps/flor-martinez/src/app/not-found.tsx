import React from 'react';
import Link from 'next/link';
import { Home, ArrowRight } from 'lucide-react';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={styles.notFoundWrapper}>
      <div className={styles.ambientGlow} />
      
      <div className={styles.contentCard}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Error 404
        </div>

        <h1 className={styles.codeNumber}>404</h1>
        <h2 className={styles.title}>Página no encontrada</h2>
        <p className={styles.description}>
          Lo sentimos, el enlace al que intentás acceder no existe, fue movido o no tenés autorización para visualizarlo.
        </p>

        <div className={styles.buttonRow}>
          <Link href="/" className={styles.primaryBtn}>
            <Home size={18} />
            <span>Volver al Inicio</span>
          </Link>
          <Link href="/soluciones" className={styles.secondaryBtn}>
            <span>Explorar Soluciones</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className={styles.footerSignature}>
          Flor Martínez · Ecosistema Digital
        </div>
      </div>
    </main>
  );
}
