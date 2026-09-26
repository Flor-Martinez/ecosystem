'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  addSuperAdminEmailAction,
  removeSuperAdminEmailAction,
} from '@/actions/licenses';
import styles from './AdminSuperadmins.module.css';

interface AdminSuperadminsClientProps {
  initialAdmins: string[];
  primaryAdmins: string[];
}

export default function AdminSuperadminsClient({
  initialAdmins,
  primaryAdmins,
}: AdminSuperadminsClientProps) {
  const [admins, setAdmins] = useState<string[]>(initialAdmins);
  const [newEmail, setNewEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

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

    if (!confirm(`¿Estás seguro de remover permisos de superadmin para ${email}?`)) {
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
        <Link href="/admin" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Volver al Panel Principal</span>
        </Link>

        <h1 className={styles.title}>Administradores del Sistema (Superadmins)</h1>
        <p className={styles.subtitle}>
          Cuentas de correo autorizadas para acceder al panel privado de administración y gestionar licencias y pedidos.
        </p>

        <div className={styles.card}>
          <div className={styles.adminList}>
            {admins.map((email) => {
              const isPrimary = primaryAdmins.some((p) => p.toLowerCase() === email.toLowerCase());
              return (
                <div key={email} className={styles.adminItem}>
                  <div>
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
              className={styles.input}
            />
            <button type="submit" disabled={isSubmitting} className={styles.addBtn}>
              <Plus size={16} />
              <span>{isSubmitting ? 'Guardando...' : 'Agregar Superadmin'}</span>
            </button>
          </form>

          {message && (
            <div style={{ marginTop: '12px', fontSize: '13px', fontWeight: 600 }}>
              {message.isError ? (
                <AlertCircle size={14} style={{ display: 'inline', marginRight: 4, color: '#DC2626' }} />
              ) : (
                <CheckCircle2 size={14} style={{ display: 'inline', marginRight: 4, color: '#16A34A' }} />
              )}
              <span>{message.text}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
