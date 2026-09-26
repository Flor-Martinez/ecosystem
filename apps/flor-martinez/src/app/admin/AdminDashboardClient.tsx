'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  FileSpreadsheet,
  Users,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ShoppingBag,
  UserCheck,
} from 'lucide-react';
import { TEMPLATE_COPY_URL } from '@/lib/licensing-types';
import {
  adminLogoutAction,
  addSuperAdminEmailAction,
  removeSuperAdminEmailAction,
} from '@/actions/licenses';
import { logoutUserAction } from '@/actions/auth';
import { useEcosystemAuth } from '@/context/AuthContext';
import { CustomerMetricRecord } from '@/actions/metrics';
import styles from './AdminDashboard.module.css';

interface AdminDashboardClientProps {
  currentAdminEmail: string;
  initialAdmins: string[];
  primaryAdmins: string[];
  licensesCount: number;
  metrics?: {
    totalAccounts: number;
    totalLicenses: number;
    totalRevenueARS: number;
    customers: CustomerMetricRecord[];
  };
}

export default function AdminDashboardClient({
  currentAdminEmail,
  initialAdmins,
  primaryAdmins,
  licensesCount,
  metrics,
}: AdminDashboardClientProps) {
  const [admins, setAdmins] = useState<string[]>(initialAdmins);
  const [newEmail, setNewEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const { logout } = useEcosystemAuth();

  const handleLogout = async () => {
    await adminLogoutAction();
    await logoutUserAction();
    logout();
    window.location.href = '/';
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newEmail.includes('@')) {
      setMessage({ text: 'Ingresá un correo electrónico válido.', isError: true });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);
    try {
      const res = await addSuperAdminEmailAction(newEmail);
      if (res.success && res.emails) {
        setAdmins(res.emails);
        setNewEmail('');
        setMessage({ text: 'Superadmin agregado con éxito.', isError: false });
      } else {
        setMessage({ text: res.error || 'No se pudo agregar.', isError: true });
      }
    } catch {
      setMessage({ text: 'Error al procesar la solicitud.', isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveAdmin = async (email: string) => {
    const isPrimary = primaryAdmins.some((p) => p.toLowerCase() === email.toLowerCase());
    if (isPrimary) {
      alert('Los administradores principales no se pueden eliminar.');
      return;
    }

    if (!confirm(`¿Estás seguro de que querés remover los permisos de superadmin para ${email}?`)) {
      return;
    }

    try {
      const res = await removeSuperAdminEmailAction(email);
      if (res.success && res.emails) {
        setAdmins(res.emails);
        setMessage({ text: `Permisos removidos para ${email}.`, isError: false });
      } else {
        alert(res.error || 'Error al remover.');
      }
    } catch {
      alert('Error inesperado al remover administrador.');
    }
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

        <div className={styles.cardsGrid}>
          {/* MÓDULO 1: FINANZAS EN ORDEN */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIconWrap}>
                <FileSpreadsheet size={24} />
              </div>
              <div>
                <h2 className={styles.cardTitle}>Planilla &ldquo;Finanzas en Orden&rdquo;</h2>
                <p className={styles.cardDesc}>
                  Gestión integral de licencias comerciales, emisión de claves criptográficas y enlace a la plantilla matriz de Google Sheets.
                </p>
              </div>
            </div>

            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Licencias Emitidas</span>
                <span className={styles.statValue}>{licensesCount}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Sistema de Seguridad</span>
                <div className={styles.statActive}>
                  <span className={styles.pulseDot} />
                  <span>Seguridad Cloud (1 Uso Único)</span>
                </div>
              </div>
            </div>

            <div className={styles.cardActions}>
              <Link href="/admin/licencias" className={styles.primaryActionBtn}>
                <span>Administrar Licencias y Clientes</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href={TEMPLATE_COPY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryActionBtn}
              >
                <span>Abrir Copia de la Plantilla</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {/* MÓDULO 2: GESTIÓN DE SUPERADMINS */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIconWrap}>
                <Users size={24} />
              </div>
              <div>
                <h2 className={styles.cardTitle}>Administradores del Sistema (Superadmins)</h2>
                <p className={styles.cardDesc}>
                  Las cuentas autorizadas en este listado pueden acceder escribiendo manualmente <code>/admin</code> y emitir licencias comerciales.
                </p>
              </div>
            </div>

            <div className={styles.adminList}>
              {admins.map((email) => {
                const isPrimary = primaryAdmins.some((p) => p.toLowerCase() === email.toLowerCase());
                return (
                  <div key={email} className={styles.adminItem}>
                    <div className={styles.adminInfo}>
                      <span className={styles.adminEmail}>{email}</span>
                      {isPrimary ? (
                        <span className={styles.primaryBadge}>Fundador / Principal</span>
                      ) : (
                        <span className={styles.addedBadge}>Superadmin</span>
                      )}
                    </div>

                    {!isPrimary && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAdmin(email)}
                        className={styles.deleteBtn}
                        title={`Remover permisos para ${email}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleAddAdmin} className={styles.addForm}>
              <input
                type="email"
                required
                placeholder="Ingresá un nuevo correo de Google (ej. usuario@gmail.com)..."
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className={styles.addInput}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.addBtn}
              >
                <Plus size={16} />
                <span>{isSubmitting ? 'Guardando...' : 'Agregar Superadmin'}</span>
              </button>
            </form>

            {message && (
              <div className={`${styles.formMessage} ${message.isError ? styles.formError : styles.formSuccess}`}>
                {message.isError ? (
                  <AlertCircle size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: -2 }} />
                ) : (
                  <CheckCircle2 size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: -2 }} />
                )}
                <span>{message.text}</span>
              </div>
            )}
          </div>

          {/* MÓDULO 3: MÉTRICAS DE CLIENTES & CUENTAS CREADAS */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIconWrap}>
                <TrendingUp size={24} />
              </div>
              <div>
                <h2 className={styles.cardTitle}>Métricas de Clientes & Cuentas Creadas</h2>
                <p className={styles.cardDesc}>
                  Seguimiento en tiempo real de cuentas registradas en el ecosistema, fechas de alta y registro de ventas ($0 costo adicional de almacenamiento).
                </p>
              </div>
            </div>

            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Cuentas Registradas</span>
                <span className={styles.statValue}>{metrics?.totalAccounts || 0}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Ventas / Licencias</span>
                <span className={styles.statValue}>{metrics?.totalLicenses || 0}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Ingresos Estimados</span>
                <span className={styles.statValue}>
                  ${(metrics?.totalRevenueARS || 0).toLocaleString('es-AR')} ARS
                </span>
              </div>
            </div>

            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '20px 0 8px 0', color: '#0D1B2A' }}>
              Listado de Cuentas y Compras Realizadas
            </h3>

            <div className={styles.customerTableWrapper}>
              <table className={styles.customerTable}>
                <thead>
                  <tr>
                    <th>Nombre / Cliente</th>
                    <th>Correo Electrónico</th>
                    <th>Fecha de Alta</th>
                    <th>Compras Mediante la Web</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics?.customers && metrics.customers.length > 0 ? (
                    metrics.customers.map((cust) => (
                      <tr key={cust.id}>
                        <td>
                          <strong>{cust.name}</strong>
                        </td>
                        <td>{cust.email}</td>
                        <td>
                          {new Date(cust.createdAt).toLocaleDateString('es-AR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td>
                          {cust.purchases && cust.purchases.length > 0 ? (
                            cust.purchases.map((p, idx) => (
                              <span key={idx} className={styles.purchaseBadge}>
                                <ShoppingBag size={12} /> {p.itemTitle} ({p.amount})
                              </span>
                            ))
                          ) : (
                            <span className={styles.noPurchaseBadge}>Sin compras registradas</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', color: '#64748B', padding: '16px' }}>
                        No hay datos registrados aún.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
