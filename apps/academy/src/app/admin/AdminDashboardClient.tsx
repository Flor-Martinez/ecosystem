'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  LogOut,
  Settings,
  Table,
  Calendar,
  Compass,
  Video,
  Lock,
  Code2,
  Zap,
  Users,
  CheckCircle2,
  DollarSign,
} from 'lucide-react';
import { useEcosystemAuth } from '@/context/AuthContext';
import styles from './AdminDashboard.module.css';

export default function AdminDashboardClient() {
  const { user, isSuperAdmin, logout } = useEcosystemAuth();
  const [devMode, setDevMode] = useState(false);
  const [membershipTier, setMembershipTier] = useState<'paid' | 'free'>('paid');

  useEffect(() => {
    // Read local storage settings for development controls
    const savedDev = localStorage.getItem('ebl_dev_mode');
    if (savedDev === 'true') {
      setDevMode(true);
    }
    const savedTier = localStorage.getItem('ebl_simulated_tier');
    if (savedTier === 'free' || savedTier === 'paid') {
      setMembershipTier(savedTier);
    }
  }, []);

  const toggleDevMode = () => {
    const nextVal = !devMode;
    setDevMode(nextVal);
    localStorage.setItem('ebl_dev_mode', String(nextVal));
  };

  const toggleMembershipTier = () => {
    const nextTier = membershipTier === 'paid' ? 'free' : 'paid';
    setMembershipTier(nextTier);
    localStorage.setItem('ebl_simulated_tier', nextTier);
  };

  // Stealth / Unauthorized check for non-superadmins
  if (!user || !isSuperAdmin) {
    return (
      <main className={styles.pageWrapper}>
        <div className={styles.unauthorizedBox}>
          <div className={styles.unauthorizedIcon}>
            <Lock size={28} />
          </div>
          <h1 className={styles.unauthorizedTitle}>Acceso Restringido</h1>
          <p className={styles.unauthorizedDesc}>
            Este panel de administración es exclusivo para las cuentas Superadmin autorizadas de la Academia y el Ecosistema Flor Martinez.
          </p>
          <Link href="/" className={styles.campusBtn}>
            Volver a la Academia
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* TOP BAR */}
        <header className={styles.topBar}>
          <div className={styles.brandCol}>
            <div className={styles.badgeRow}>
              <span className={styles.superTag}>
                <ShieldCheck size={13} />
                Superadmin
              </span>
              <span className={styles.privateTag}>Academia Flor Martinez</span>
            </div>
            <h1 className={styles.pageTitle}>Panel de Control · Academia</h1>
            <p className={styles.pageSubtitle}>
              Sesión activa como: <strong>{user.email}</strong>
            </p>
          </div>

          <div className={styles.topActions}>
            <a
              href="https://flormartinezok.com/admin"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.globalAdminBtn}
              title="Ir al Panel General del Ecosistema"
            >
              <span>Panel Global Ecosistema</span>
              <ArrowUpRight size={14} />
            </a>

            <Link href="/campus" className={styles.campusBtn}>
              <GraduationCap size={15} />
              <span>Entrar al Campus</span>
            </Link>

            <button onClick={logout} className={styles.logoutBtn} title="Cerrar sesión segura">
              <LogOut size={14} />
              <span>Salir</span>
            </button>
          </div>
        </header>

        {/* SECCIÓN 1: HERRAMIENTAS DE DESARROLLO Y AUDITORÍA EN VIVO */}
        <section>
          <h2 className={styles.sectionHeading}>
            <Settings size={20} />
            <span>Herramientas de Auditoría y Control en Vivo</span>
          </h2>

          <div className={styles.cardsGrid}>
            {/* CARD 1: MODO DEV */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIconWrap} style={{ background: '#F5F3FF', color: '#7C3AED' }}>
                  <Code2 size={24} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>Modo Dev (Saltear Clases)</h3>
                  <p className={styles.cardDesc}>
                    Desbloquea instantáneamente todas las clases y ejercicios del aula sin restricciones de progreso.
                  </p>
                </div>
              </div>

              <div className={styles.switchRow}>
                <div className={styles.switchText}>
                  <strong className={styles.switchTitle}>
                    {devMode ? 'Modo Dev Activado' : 'Modo Alumno Normal'}
                  </strong>
                  <span className={styles.switchDesc}>
                    {devMode ? 'Podés saltear y ver cualquier video.' : 'Sigue el progreso secuencial.'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={toggleDevMode}
                  className={devMode ? styles.toggleBtnActive : styles.toggleBtnInactive}
                >
                  {devMode ? 'ACTIVADO' : 'DESACTIVADO'}
                </button>
              </div>

              <Link href="/campus" className={styles.cardAction}>
                <span>Probar en el Aula Virtual</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* CARD 2: SIMULADOR DE MEMBRESÍA */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIconWrap} style={{ background: '#FFFBEB', color: '#D97706' }}>
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>Simulador de Membresía</h3>
                  <p className={styles.cardDesc}>
                    Alterna cómo experimentas el campus: como Alumno VIP (pago acreditado) o Visitante Free Demo.
                  </p>
                </div>
              </div>

              <div className={styles.switchRow}>
                <div className={styles.switchText}>
                  <strong className={styles.switchTitle}>
                    {membershipTier === 'paid' ? 'VIP Pagado (Acceso Total)' : 'Free Demo (Acceso de Prueba)'}
                  </strong>
                  <span className={styles.switchDesc}>
                    {membershipTier === 'paid' ? 'Tracker y Agenda desbloqueados.' : 'Herramientas bloqueadas con candado.'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={toggleMembershipTier}
                  className={membershipTier === 'paid' ? styles.toggleBtnActive : styles.toggleBtnInactive}
                  style={membershipTier === 'paid' ? { background: '#D97706', borderColor: '#B45309' } : {}}
                >
                  {membershipTier === 'paid' ? 'VIP ACTIVO' : 'FREE DEMO'}
                </button>
              </div>

              <Link href="/campus" className={styles.cardAction}>
                <span>Ver Campus como {membershipTier === 'paid' ? 'VIP' : 'Free'}</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* CARD 3: STREAMING & BUNNY CDN */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIconWrap} style={{ background: '#ECFDF5', color: '#059669' }}>
                  <Video size={24} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>Streaming & Videos HD</h3>
                  <p className={styles.cardDesc}>
                    Servidor de streaming Bunny CDN configurado con fallback local y resolución 1080p.
                  </p>
                </div>
              </div>

              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>+35</span>
                  <span className={styles.statLabel}>Clases en Video</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>1080p</span>
                  <span className={styles.statLabel}>Calidad HD</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>HLS</span>
                  <span className={styles.statLabel}>Adaptive Stream</span>
                </div>
              </div>

              <Link href="/campus" className={styles.cardAction}>
                <span>Auditar Reproductor en Campus</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* SECCIÓN 2: ESTRUCTURA ACADÉMICA Y COMERCIAL */}
        <section>
          <h2 className={styles.sectionHeading}>
            <GraduationCap size={20} />
            <span>Programa Experiencia Búsqueda Laboral (EBL)</span>
          </h2>

          <div className={styles.cardsGrid}>
            {/* CARD 4: MÓDULOS DEL PROGRAMA */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIconWrap} style={{ background: '#EFF6FF', color: '#2563EB' }}>
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>Módulos & Contenidos</h3>
                  <p className={styles.cardDesc}>
                    Desglose estructurado del temario oficial publicado en la plataforma.
                  </p>
                </div>
              </div>

              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>7</span>
                  <span className={styles.statLabel}>Troncales</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>3</span>
                  <span className={styles.statLabel}>Extras</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>100%</span>
                  <span className={styles.statLabel}>Práctico</span>
                </div>
              </div>

              <Link href="/#experiencia-busqueda-laboral" className={styles.cardAction}>
                <span>Ver Temario en Landing</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* CARD 5: COMERCIAL & PROMO DE LANZAMIENTO */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIconWrap} style={{ background: '#FEF3C7', color: '#D97706' }}>
                  <DollarSign size={24} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>Precios & Lanzamiento</h3>
                  <p className={styles.cardDesc}>
                    Configuración de precios y oferta especial para el lanzamiento oficial de hoy.
                  </p>
                </div>
              </div>

              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <span className={styles.statValue} style={{ color: '#059669' }}>$20.000</span>
                  <span className={styles.statLabel}>Promo Activa</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue} style={{ textDecoration: 'line-through', color: '#9CA3AF' }}>$34.900</span>
                  <span className={styles.statLabel}>Precio Regular</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>1 Año</span>
                  <span className={styles.statLabel}>Acceso Total</span>
                </div>
              </div>

              <Link href="/#planes-suscripcion" className={styles.cardAction}>
                <span>Ver Tarjeta de Precios</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* CARD 6: TEST VOCACIONAL */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIconWrap} style={{ background: '#FDF2F8', color: '#DB2777' }}>
                  <Compass size={24} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>Test Vocacional & Orientación</h3>
                  <p className={styles.cardDesc}>
                    Cuestionario interactivo con diagnóstico de fortalezas y perfil profesional.
                  </p>
                </div>
              </div>

              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>100%</span>
                  <span className={styles.statLabel}>Gratuito</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>Radar</span>
                  <span className={styles.statLabel}>Diagnóstico</span>
                </div>
              </div>

              <Link href="/test-vocacional" className={styles.cardAction}>
                <span>Auditar Test Vocacional</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
