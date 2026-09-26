'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  DollarSign,
  User,
  Mail,
  Phone,
} from 'lucide-react';
import {
  CvOrderRecord,
  createCvOrderAction,
  updateCvOrderStatusAction,
  deleteCvOrderAction,
} from '@/actions/cvOrders';
import styles from './AdminCvs.module.css';

interface AdminCvsClientProps {
  initialOrders: CvOrderRecord[];
}

export default function AdminCvsClient({ initialOrders }: AdminCvsClientProps) {
  const [orders, setOrders] = useState<CvOrderRecord[]>(initialOrders);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    priceARS: 29900,
    channel: 'MANUAL' as 'WEB' | 'WHATSAPP' | 'INSTAGRAM' | 'TRANSFERENCIA' | 'MANUAL',
    status: 'PENDIENTE' as 'PENDIENTE' | 'ENTREGADO' | 'CANCELADO',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleAddOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setMessage('Nombre y correo del cliente son requeridos.');
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const res = await createCvOrderAction({
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        channel: formData.channel,
        priceARS: Number(formData.priceARS) || 29900,
        status: formData.status,
        notes: formData.notes,
      });

      if (res.success && res.order) {
        setOrders([res.order, ...orders]);
        setFormData({
          name: '',
          email: '',
          phone: '',
          priceARS: 29900,
          channel: 'MANUAL',
          status: 'PENDIENTE',
          notes: '',
        });
        setMessage('¡Pedido de CV registrado con éxito!');
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage(res.error || 'Error al registrar pedido.');
      }
    } catch {
      setMessage('Error al procesar la solicitud.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'PENDIENTE' | 'ENTREGADO' | 'CANCELADO') => {
    try {
      const res = await updateCvOrderStatusAction(id, newStatus);
      if (res.success && res.order) {
        setOrders(orders.map((o) => (o.id === id ? res.order! : o)));
      } else {
        alert(res.error || 'Error al cambiar estado.');
      }
    } catch {
      alert('Error inesperado al actualizar estado.');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de eliminar el pedido de CV de ${name}?`)) return;

    try {
      const res = await deleteCvOrderAction(id);
      if (res.success) {
        setOrders(orders.filter((o) => o.id !== id));
      } else {
        alert(res.error || 'Error al eliminar.');
      }
    } catch {
      alert('Error inesperado al eliminar.');
    }
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        <Link href="/admin" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Volver al Panel Principal</span>
        </Link>

        <div className={styles.topHeader}>
          <div>
            <h1 className={styles.title}>Tablero de Pedidos — &quot;Te Hago Tu CV&quot;</h1>
            <p className={styles.subtitle}>
              Gestión integral de encargos de rediseño de CV, cambio de estados (Pendiente, Entregado, Cancelado) y registros manuales.
            </p>
          </div>
        </div>

        {/* REGISTRO MANUAL FORM */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Registrar Venta / Pedido de CV (Otros Medios)</h2>
          <form onSubmit={handleAddOrder} className={styles.addFormGrid}>
            <input
              type="text"
              required
              placeholder="Nombre del Cliente *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={styles.input}
            />

            <input
              type="email"
              required
              placeholder="Correo Electrónico *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={styles.input}
            />

            <input
              type="tel"
              placeholder="WhatsApp / Teléfono"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={styles.input}
            />

            <input
              type="number"
              placeholder="Monto en ARS"
              value={formData.priceARS}
              onChange={(e) => setFormData({ ...formData, priceARS: Number(e.target.value) })}
              className={styles.input}
            />

            <select
              value={formData.channel}
              onChange={(e) => setFormData({ ...formData, channel: e.target.value as any })}
              className={styles.select}
            >
              <option value="WHATSAPP">Canal: WhatsApp</option>
              <option value="INSTAGRAM">Canal: Instagram</option>
              <option value="TRANSFERENCIA">Canal: Transferencia Directa</option>
              <option value="WEB">Canal: Web Mercado Pago</option>
              <option value="MANUAL">Canal: Registro Manual</option>
            </select>

            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className={styles.select}
            >
              <option value="PENDIENTE">Estado: PENDIENTE</option>
              <option value="ENTREGADO">Estado: ENTREGADO</option>
              <option value="CANCELADO">Estado: CANCELADO</option>
            </select>

            <input
              type="text"
              placeholder="Notas u observaciones (opcional)"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className={styles.input}
              style={{ gridColumn: '1 / -1' }}
            />

            <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
              <Plus size={16} />
              <span>{isSubmitting ? 'Guardando...' : 'Registrar Pedido de CV'}</span>
            </button>
          </form>

          {message && (
            <div style={{ marginTop: '12px', fontSize: '13px', fontWeight: 600, color: '#0D1B2A' }}>
              {message}
            </div>
          )}
        </div>

        {/* ORDERS TABLE */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Listado de Pedidos de CV ({orders.length})</h2>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>N° Orden</th>
                  <th>Cliente</th>
                  <th>Contacto</th>
                  <th>Canal</th>
                  <th>Monto ARS</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((ord) => {
                    const statusClass =
                      ord.status === 'ENTREGADO'
                        ? styles.statusEntregado
                        : ord.status === 'CANCELADO'
                        ? styles.statusCancelado
                        : styles.statusPendiente;

                    return (
                      <tr key={ord.id}>
                        <td>
                          <strong>{ord.orderNumber}</strong>
                        </td>
                        <td>{ord.customerName}</td>
                        <td>
                          <div>{ord.customerEmail}</div>
                          {ord.customerPhone && (
                            <small style={{ color: '#64748B' }}>{ord.customerPhone}</small>
                          )}
                        </td>
                        <td>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#475569' }}>
                            {ord.channel}
                          </span>
                        </td>
                        <td>${ord.priceARS.toLocaleString('es-AR')}</td>
                        <td>
                          {new Date(ord.createdAt).toLocaleDateString('es-AR', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </td>
                        <td>
                          <select
                            value={ord.status}
                            onChange={(e) =>
                              handleStatusChange(
                                ord.id,
                                e.target.value as 'PENDIENTE' | 'ENTREGADO' | 'CANCELADO'
                              )
                            }
                            className={`${styles.statusSelect} ${statusClass}`}
                          >
                            <option value="PENDIENTE">PENDIENTE ⏳</option>
                            <option value="ENTREGADO">ENTREGADO ✅</option>
                            <option value="CANCELADO">CANCELADO ❌</option>
                          </select>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete(ord.id, ord.customerName)}
                            className={styles.deleteBtn}
                            title="Eliminar pedido"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', color: '#64748B', padding: '20px' }}>
                      No hay pedidos de CV registrados.
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
