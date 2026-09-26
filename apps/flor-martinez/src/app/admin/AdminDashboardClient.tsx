'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  ShieldCheck,
  FileSpreadsheet,
  FileText,
  LogOut,
  ArrowRight,
  Briefcase,
  Settings,
} from 'lucide-react';
import { adminLogoutAction } from '@/actions/licenses';
import { logoutUserAction } from '@/actions/auth';
import { useEcosystemAuth } from '@/context/AuthContext';
import styles from './AdminDashboard.module.css';

interface AdminDashboardClientProps {
  currentAdminEmail: string;
  licensesCount: number;
  cvOrdersCount: number;
  pendingCvOrdersCount?: number;
  totalCustomersCount: number;
  totalRevenueARS: number;
}

export default function AdminDashboardClient({
  currentAdminEmail,
  licensesCount,
  cvOrdersCount,
  pendingCvOrdersCount = 0,
  totalCustomersCount,
  totalRevenueARS,
}: AdminDashboardClientProps) {
  const { logout } = useEcosystemAuth();

  const handleLogout = async () => {
    await adminLogoutAction();
    await logoutUserAction();
    logout();
    window.location.href = '/';
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* TOP BAR */}
        <div className={styles.topBar}>
          <div className={styles.brandCol}>
            <div className={styles.badgeRow}>
              <span className={styles.superTag}>Superadmin</span>
              <span className={styles.privateTag}>Acceso Privado</span>
            </div>
            <h1 className={styles.pageTitle}>Panel de Administración</h1>
            <p className={styles.pageSubtitle}>
              Sesión activa como: <strong>{currentAdminEmail}</strong>
            </p>
          </div>

          <button onClick={handleLogout} className={styles.logoutBtn} title="Cerrar sesión segura">
            <LogOut size={15} />
            <span>Cerrar Sesión</span>
          </button>
        </div>

        {/* SECCIÓN 1: ADMINISTRACIÓN */}
        <section className={styles.adminSection}>
          <h2 className={styles.sectionHeading}>
            <Settings size={20} />
            <span>Administración</span>
          </h2>

          <div className={styles.cardsGrid}>
            {/* CARD CLIENTES */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIconWrap}>
                  <Users size={22} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>Clientes</h3>
                  <p className={styles.miniDesc}>
                    Gestión y métricas de cuentas de clientes registradas en el ecosistema.
                  </p>
                </div>
              </div>

              <div className={styles.statsInlineRow}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Cantidad de Clientes</span>
                  <span className={styles.statValue}>{totalCustomersCount}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Ingresos Estimados</span>
                  <span className={styles.statValue}>
                    ${totalRevenueARS.toLocaleString('es-AR')} ARS
                  </span>
                </div>
              </div>

              <Link href="/admin/clientes" className={styles.accessBtn}>
                <span>Ver Menú Clientes</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* CARD SUPERADMINS */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIconWrap}>
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>Superadmins</h3>
                  <p className={styles.miniDesc}>
                    Administración y control de cuentas con permisos de superadministrador.
                  </p>
                </div>
              </div>

              <Link href="/admin/superadmins" className={styles.accessBtn}>
                <span>Ver Menú Superadmins</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* SECCIÓN 2: SOLUCIONES */}
        <section className={styles.adminSection}>
          <h2 className={styles.sectionHeading}>
            <Briefcase size={20} />
            <span>Soluciones</span>
          </h2>

          <div className={styles.cardsGrid}>
            {/* CARD FINANZAS EN ORDEN */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIconWrap}>
                  <FileSpreadsheet size={22} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>Finanzas en Orden</h3>
                  <p className={styles.miniDesc}>
                    Gestión de licencias comerciales y plantilla matriz de Google Sheets.
                  </p>
                </div>
              </div>

              <div className={styles.statsInlineRow}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Planillas Vendidas</span>
                  <span className={styles.statValue}>{licensesCount}</span>
                </div>
              </div>

              <Link href="/admin/finanzas-en-orden" className={styles.accessBtn}>
                <span>Ver Menú Finanzas en Orden</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* CARD TE HAGO TU CV */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIconWrap}>
                  <FileText size={22} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>Te Hago Tu CV</h3>
                  <p className={styles.miniDesc}>
                    Tablero de pedidos de rediseño de CV, estados y registros de ventas.
                  </p>
                </div>
              </div>

              <div className={styles.statsInlineRow}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>CVs Vendidos</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className={styles.statValue}>{cvOrdersCount}</span>
                    {pendingCvOrdersCount > 0 ? (
                      <span style={{
                        fontSize: '12px',
                        fontWeight: 800,
                        color: '#991B1B',
                        backgroundColor: '#FEE2E2',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        border: '1px solid #FCA5A5'
                      }}>
                        {pendingCvOrdersCount} pendientes
                      </span>
                    ) : (
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#065F46',
                        backgroundColor: '#D1FAE5',
                        padding: '2px 6px',
                        borderRadius: '999px'
                      }}>
                        0 pendientes
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <Link href="/admin/cvs" className={styles.accessBtn}>
                <span>Ver Menú Te Hago Tu CV</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
