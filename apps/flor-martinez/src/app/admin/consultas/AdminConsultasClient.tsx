'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trash2, Mail, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import {
  ContactSubmissionRecord,
  updateContactStatusAction,
  deleteContactSubmissionAction,
} from '@/actions/contactSubmissions';
import styles from './AdminConsultas.module.css';

interface AdminConsultasClientProps {
  initialContacts: ContactSubmissionRecord[];
  initialPendingCount: number;
}

export default function AdminConsultasClient({
  initialContacts,
}: AdminConsultasClientProps) {
  const [contacts, setContacts] = useState<ContactSubmissionRecord[]>(initialContacts);
  const [filter, setFilter] = useState<'TODAS' | 'PENDIENTES' | 'ATENDIDAS'>('TODAS');

  const pendingCount = contacts.filter((c) => c.status === 'PENDIENTE').length;

  const handleStatusChange = async (id: string, newStatus: 'PENDIENTE' | 'ATENDIDO') => {
    try {
      const res = await updateContactStatusAction(id, newStatus);
      if (res.success && res.contact) {
        setContacts(contacts.map((c) => (c.id === id ? res.contact! : c)));
      } else {
        alert(res.error || 'Error al actualizar el estado.');
      }
    } catch {
      alert('Error inesperado al actualizar estado.');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de eliminar la consulta de "${name}"?`)) return;

    try {
      const res = await deleteContactSubmissionAction(id);
      if (res.success) {
        setContacts(contacts.filter((c) => c.id !== id));
      } else {
        alert(res.error || 'Error al eliminar.');
      }
    } catch {
      alert('Error inesperado al eliminar.');
    }
  };

  const filteredContacts = contacts.filter((c) => {
    if (filter === 'PENDIENTES') return c.status === 'PENDIENTE';
    if (filter === 'ATENDIDAS') return c.status === 'ATENDIDO';
    return true;
  });

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        <Link href="/admin" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Volver al Panel Principal</span>
        </Link>

        <div className={styles.topHeader}>
          <div>
            <h1 className={styles.title}>Consultas Web & Mensajes Directos</h1>
            <p className={styles.subtitle}>
              Bandeja de entrada para mensajes enviados desde el formulario de contacto oficial de la web.
            </p>
          </div>
        </div>

        {/* LISTADO DE CONSULTAS */}
        <div className={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
            <h2 className={styles.cardTitle} style={{ margin: 0 }}>
              <MessageSquare size={18} />
              <span>Mensajes Recibidos ({contacts.length})</span>
            </h2>

            {pendingCount > 0 ? (
              <span style={{
                fontSize: '12px',
                fontWeight: 800,
                color: '#991B1B',
                backgroundColor: '#FEE2E2',
                padding: '4px 10px',
                borderRadius: '999px',
                border: '1px solid #FCA5A5'
              }}>
                ⚠️ {pendingCount} {pendingCount === 1 ? 'mensaje pendiente' : 'mensajes pendientes'}
              </span>
            ) : (
              <span style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#065F46',
                backgroundColor: '#D1FAE5',
                padding: '4px 10px',
                borderRadius: '999px'
              }}>
                ✅ Al día — 0 pendientes
              </span>
            )}
          </div>

          {/* FILTER BUTTONS */}
          <div className={styles.filterRow}>
            <button
              onClick={() => setFilter('TODAS')}
              className={`${styles.filterBtn} ${filter === 'TODAS' ? styles.filterActive : ''}`}
            >
              Todas ({contacts.length})
            </button>
            <button
              onClick={() => setFilter('PENDIENTES')}
              className={`${styles.filterBtn} ${filter === 'PENDIENTES' ? styles.filterActive : ''}`}
            >
              Pendientes ({pendingCount})
            </button>
            <button
              onClick={() => setFilter('ATENDIDAS')}
              className={`${styles.filterBtn} ${filter === 'ATENDIDAS' ? styles.filterActive : ''}`}
            >
              Atendidas ({contacts.length - pendingCount})
            </button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Contacto</th>
                  <th>Motivo</th>
                  <th>Mensaje</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((cnt) => {
                    const isPendiente = cnt.status === 'PENDIENTE';
                    return (
                      <tr key={cnt.id}>
                        <td style={{ whiteSpace: 'nowrap', fontSize: '12px', color: '#64748B' }}>
                          {new Date(cnt.createdAt).toLocaleDateString('es-AR', {
                            day: 'numeric',
                            month: 'short',
                            year: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, color: '#0D1B2A' }}>{cnt.name}</div>
                          <a
                            href={`mailto:${cnt.email}?subject=${encodeURIComponent(
                              `Re: Tu consulta en Lic. Flor Martínez`
                            )}`}
                            style={{
                              fontSize: '12px',
                              color: '#2563EB',
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              marginTop: '2px',
                            }}
                          >
                            <Mail size={12} />
                            <span>{cnt.email}</span>
                          </a>
                        </td>
                        <td>
                          <span className={styles.badgeMotivo}>
                            {cnt.motivo || 'General'}
                          </span>
                        </td>
                        <td>
                          <div className={styles.messageBox}>{cnt.mensaje}</div>
                        </td>
                        <td>
                          <select
                            value={cnt.status}
                            onChange={(e) =>
                              handleStatusChange(
                                cnt.id,
                                e.target.value as 'PENDIENTE' | 'ATENDIDO'
                              )
                            }
                            className={`${styles.statusSelect} ${
                              isPendiente ? styles.statusPendiente : styles.statusAtendido
                            }`}
                          >
                            <option value="PENDIENTE">PENDIENTE ⏳</option>
                            <option value="ATENDIDO">ATENDIDO ✅</option>
                          </select>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete(cnt.id, cnt.name)}
                            className={styles.deleteBtn}
                            title="Eliminar consulta"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', color: '#64748B', padding: '24px' }}>
                      No hay mensajes en esta categoría.
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
