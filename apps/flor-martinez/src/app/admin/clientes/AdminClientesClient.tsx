'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, TrendingUp, ShoppingBag } from 'lucide-react';
import { CustomerMetricRecord } from '@/actions/metrics';
import styles from './AdminClientes.module.css';

interface AdminClientesClientProps {
  metrics: {
    totalAccounts: number;
    totalLicenses: number;
    totalCvOrders: number;
    totalRevenueARS: number;
    customers: CustomerMetricRecord[];
  };
}

export default function AdminClientesClient({ metrics }: AdminClientesClientProps) {
  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        <Link href="/admin" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Volver al Panel Principal</span>
        </Link>

        <h1 className={styles.title}>Gestión de Clientes & Cuentas</h1>
        <p className={styles.subtitle}>
          Listado detallado de usuarios registrados en la plataforma y su historial completo de compras realizadas.
        </p>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total de Clientes</span>
            <span className={styles.statValue}>{metrics.totalAccounts}</span>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>Ingresos Estimados</span>
            <span className={styles.statValue}>
              ${metrics.totalRevenueARS.toLocaleString('es-AR')} ARS
            </span>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>Licencias Planilla</span>
            <span className={styles.statValue}>{metrics.totalLicenses}</span>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>Pedidos de CV</span>
            <span className={styles.statValue}>{metrics.totalCvOrders}</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nombre / Cliente</th>
                  <th>Correo Electrónico</th>
                  <th>Fecha de Registro</th>
                  <th>Compras Realizadas</th>
                </tr>
              </thead>
              <tbody>
                {metrics.customers && metrics.customers.length > 0 ? (
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
                          <span style={{ fontSize: '11px', color: '#64748B' }}>Sin compras aún</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', color: '#64748B', padding: '20px' }}>
                      No hay clientes registrados en este momento.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
