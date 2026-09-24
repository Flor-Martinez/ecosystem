'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Copy,
  Check,
  Send,
  ExternalLink,
  ArrowLeft,
  Search,
  Filter,
  LogOut,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  TrendingUp,
  Trash2,
  RotateCcw,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { TEMPLATE_COPY_URL, generarMensajeEntrega, type SpreadsheetLicenseRecord } from '@/lib/licensing-types';
import {
  checkIsAdminAction,
  adminLogoutAction,
  issueLicenseAction,
  getLicensesListAction,
  deleteLicenseAction,
  unlinkLicenseAction,
} from '@/actions/licenses';
import { logoutUserAction } from '@/actions/auth';
import { useEcosystemAuth } from '@/context/AuthContext';
import styles from './AdminLicencias.module.css';

interface AdminLicenciasClientProps {
  initialIsAdmin: boolean;
  initialAdminEmail?: string;
  initialLicenses: SpreadsheetLicenseRecord[];
}

export default function AdminLicenciasClient({
  initialIsAdmin,
  initialAdminEmail,
  initialLicenses,
}: AdminLicenciasClientProps) {
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const [adminEmail, setAdminEmail] = useState(initialAdminEmail || '');

  const { user, logout } = useEcosystemAuth();

  useEffect(() => {
    if (user?.email) {
      const emailLower = user.email.toLowerCase().trim();
      if (
        emailLower === 'santisose01@gmail.com' ||
        emailLower === 'licenciadaflormartinez@gmail.com'
      ) {
        setIsAdmin(true);
        setAdminEmail(user.email);
        reloadLicenses();
      }
    }
  }, [user]);

  // Licenses list
  const [licenses, setLicenses] = useState<SpreadsheetLicenseRecord[]>(initialLicenses);
  const [searchQuery, setSearchQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState('ALL');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    channel: 'WHATSAPP' as 'WHATSAPP' | 'INSTAGRAM' | 'TRANSFERENCIA' | 'MANUAL',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastIssued, setLastIssued] = useState<{
    license: SpreadsheetLicenseRecord;
    deliveryMessage: string;
  } | null>(null);

  // Copy feedback states
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [copiedRowKey, setCopiedRowKey] = useState<string | null>(null);

  const reloadLicenses = async () => {
    const res = await getLicensesListAction();
    if (res.success && res.licenses) {
      setLicenses(res.licenses);
    }
  };

  const handleLogout = async () => {
    await adminLogoutAction();
    await logoutUserAction();
    logout();
    window.location.href = '/';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await issueLicenseAction({
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        channel: formData.channel,
        notes: formData.notes,
      });

      if (res.success && res.license && res.deliveryMessage) {
        setLastIssued({
          license: res.license,
          deliveryMessage: res.deliveryMessage,
        });
        await reloadLicenses();
      } else {
        alert(res.error || 'No se pudo generar la licencia.');
      }
    } catch {
      alert('Error inesperado al emitir la licencia.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyMessage = (msg: string) => {
    navigator.clipboard.writeText(msg);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2500);
  };

  const handleCopyRowMessage = (rec: SpreadsheetLicenseRecord) => {
    const msg = generarMensajeEntrega(rec.customerName, rec.licenseKey);
    navigator.clipboard.writeText(msg);
    setCopiedRowKey(rec.id);
    setTimeout(() => setCopiedRowKey(null), 2000);
  };

  const handleDeleteLicense = async (rec: SpreadsheetLicenseRecord) => {
    if (!confirm(`¿Estás seguro de que deseás eliminar permanentemente la licencia de ${rec.customerName} (${rec.licenseKey})?`)) {
      return;
    }
    try {
      const res = await deleteLicenseAction(rec.id);
      if (res.success) {
        setLicenses((prev) => prev.filter((l) => l.id !== rec.id));
        if (lastIssued?.license?.id === rec.id) {
          setLastIssued(null);
        }
      } else {
        alert(res.error || 'No se pudo eliminar la licencia.');
      }
    } catch {
      alert('Error inesperado al intentar eliminar la licencia.');
    }
  };

  const handleUnlinkLicense = async (rec: SpreadsheetLicenseRecord) => {
    if (
      !confirm(
        `¿Deseás desvincular el archivo asociado a la licencia de ${rec.customerName} (${rec.licenseKey})?\n\nEsto permitirá que la clave pueda volver a activarse en una nueva copia.`
      )
    ) {
      return;
    }
    try {
      const res = await unlinkLicenseAction(rec.id);
      if (res.success) {
        setLicenses((prev) =>
          prev.map((l) => (l.id === rec.id ? { ...l, spreadsheetId: null } : l))
        );
      } else {
        alert(res.error || 'Error al desvincular.');
      }
    } catch {
      alert('Error inesperado al desvincular.');
    }
  };

  // Filtered table
  const filtered = licenses.filter((item) => {
    const matchesChannel = channelFilter === 'ALL' || item.channel === channelFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.customerName.toLowerCase().includes(q) ||
      item.customerEmail.toLowerCase().includes(q) ||
      item.licenseKey.toLowerCase().includes(q);
    return matchesChannel && matchesSearch;
  });

  const totalWeb = licenses.filter((l) => l.channel === 'WEB').length;
  const totalManual = licenses.length - totalWeb;

  // Si no está autenticado, no renderiza (el servidor ya habrá disparado notFound())
  if (!isAdmin) {
    return null;
  }

  return (
    <div className={styles.pageWrapper}>
      <Container size="wide">
        {/* Top Header */}
        <div className={styles.topBar}>
          <div className={styles.brandCol}>
            <div className={styles.badgeRow}>
              <span className={styles.adminTag}>Superadmin</span>
              <span className={styles.liveTag}>
                <span className={styles.liveDot}></span>
                Motor Criptográfico Activo (Zero-Auth)
              </span>
            </div>
            <h1 className={styles.pageTitle}>Gestor Comercial de Licencias</h1>
            <p className={styles.pageSubtitle}>
              Sesión activa como: <strong>{adminEmail}</strong>
            </p>
          </div>

          <div className={styles.actionsCol}>
            <Link href="/admin" className={styles.backBtn} title="Volver al Panel de Control">
              <ArrowLeft size={14} />
              <span>Panel Admin</span>
            </Link>

            <button onClick={handleLogout} className={styles.logoutBtn} title="Cerrar sesión">
              <LogOut size={15} />
              <span>Salir</span>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className={styles.kpiGrid}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiLabel}>Total Licencias Emitidas</div>
            <div className={styles.kpiValue}>{licenses.length}</div>
            <div className={styles.kpiSub}>Sin colisiones ni duplicados</div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiLabel}>Ventas Web Automáticas</div>
            <div className={styles.kpiValue}>{totalWeb}</div>
            <div className={styles.kpiSub}>Generadas directamente en checkout</div>
          </div>

          <div className={styles.kpiCard}>
            <div className={styles.kpiLabel}>Ventas Manuales</div>
            <div className={styles.kpiValue}>{totalManual}</div>
            <div className={styles.kpiSub}>WhatsApp / Instagram / Transferencias</div>
          </div>
        </div>

        {/* Main 2-Column Area */}
        <div className={styles.mainGrid}>
          {/* Left Column: Form to Issue New Manual License */}
          <div className={styles.formCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                <Sparkles size={18} color="#0D1B2A" />
                <span>Emitir Licencia Manual</span>
              </h2>
              <p className={styles.cardDesc}>
                Cargá los datos del comprador para generar una clave oficial matemática y obtener el mensaje de entrega instantáneo.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Nombre del Comprador *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Mariana Gómez"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Correo Electrónico *</label>
                <input
                  type="email"
                  required
                  placeholder="mariana@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>WhatsApp (opcional)</label>
                <input
                  type="tel"
                  placeholder="+54 9 11 1234-5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Canal de Venta</label>
                <select
                  value={formData.channel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      channel: e.target.value as any,
                    })
                  }
                  className={styles.formSelect}
                >
                  <option value="WHATSAPP">💬 WhatsApp Directo</option>
                  <option value="INSTAGRAM">📸 Instagram DM</option>
                  <option value="TRANSFERENCIA">🏦 Transferencia Bancaria</option>
                  <option value="MANUAL">✍️ Otro / Manual</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Notas / Comentarios (opcional)</label>
                <input
                  type="text"
                  placeholder="Ej. Pagó por Mercado Pago / Pedido #102"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitBtn}
              >
                {isSubmitting ? 'Generando y Registrando...' : '✨ Generar y Registrar Licencia'}
              </button>
            </form>

            {/* Success Box when a license is issued */}
            {lastIssued && (
              <div className={styles.resultBox}>
                <div className={styles.resultTitle}>
                  <Check size={16} />
                  <span>¡Licencia Oficial Generada con Éxito!</span>
                </div>

                <div className={styles.keyDisplayWrap}>
                  <span className={styles.keyString}>{lastIssued.license.licenseKey}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyKey(lastIssued.license.licenseKey)}
                    className={styles.copyKeyBtn}
                  >
                    {copiedKey ? '¡Copiada!' : 'Copiar Clave'}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyMessage(lastIssued.deliveryMessage)}
                  className={styles.whatsappMessageBtn}
                >
                  <MessageCircle size={16} />
                  <span>{copiedMsg ? '¡Mensaje Copiado!' : '📋 Copiar Mensaje para WhatsApp'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLastIssued(null);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      channel: 'WHATSAPP',
                      notes: '',
                    });
                  }}
                  className={styles.resetBtn}
                >
                  Emitir otra licencia
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Live Audit Table */}
          <div className={styles.tableCard}>
            <div className={styles.tableToolbar}>
              <div className={styles.searchBox}>
                <Search size={15} color="#94A3B8" />
                <input
                  type="text"
                  placeholder="Buscar por cliente, correo o clave..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className={styles.filterWrap}>
                <select
                  value={channelFilter}
                  onChange={(e) => setChannelFilter(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="ALL">Todos los Canales</option>
                  <option value="WEB">Solo Web</option>
                  <option value="WHATSAPP">Solo WhatsApp</option>
                  <option value="INSTAGRAM">Solo Instagram</option>
                  <option value="TRANSFERENCIA">Solo Transferencias</option>
                </select>
              </div>
            </div>

            <div className={styles.tableResponsive}>
              <table className={styles.auditTable}>
                <thead>
                  <tr>
                    <th>Clave de Licencia</th>
                    <th>Cliente</th>
                    <th>Canal</th>
                    <th>Vinculación Google Sheets</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map((item) => {
                      let badgeClass = styles.channelManual;
                      if (item.channel === 'WEB') badgeClass = styles.channelWeb;
                      if (item.channel === 'WHATSAPP') badgeClass = styles.channelWhatsapp;
                      if (item.channel === 'INSTAGRAM') badgeClass = styles.channelInstagram;

                      const formattedDate = new Date(item.createdAt).toLocaleDateString('es-AR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      });

                      return (
                        <tr key={item.id}>
                          <td className={styles.keyCell}>{item.licenseKey}</td>
                          <td>
                            <strong>{item.customerName}</strong>
                            <br />
                            <small style={{ color: '#64748B' }}>{item.customerEmail}</small>
                          </td>
                          <td>
                            <span className={`${styles.channelBadge} ${badgeClass}`}>
                              {item.channel}
                            </span>
                          </td>
                          <td>
                            {item.spreadsheetId ? (
                              <span className={styles.statusBound} title={`ID: ${item.spreadsheetId}`}>
                                🔒 Activada (1 archivo)
                              </span>
                            ) : (
                              <span className={styles.statusPending}>
                                ⏳ Sin activar
                              </span>
                            )}
                          </td>
                          <td>{formattedDate}</td>
                          <td className={styles.actionCell}>
                            <div className={styles.actionBtnsWrap}>
                              <button
                                type="button"
                                onClick={() => handleCopyRowMessage(item)}
                                className={styles.quickCopyBtn}
                                title="Copiar mensaje de entrega con enlace"
                              >
                                {copiedRowKey === item.id ? '¡Copiado!' : '📋 Copiar'}
                              </button>
                              {item.spreadsheetId && (
                                <button
                                  type="button"
                                  onClick={() => handleUnlinkLicense(item)}
                                  className={styles.unlinkBtn}
                                  title="Desvincular copia para permitir activación en un nuevo archivo"
                                >
                                  <RotateCcw size={13} />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleDeleteLicense(item)}
                                className={styles.deleteLicenseBtn}
                                title="Eliminar permanentemente esta licencia"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#94A3B8' }}>
                        No se encontraron licencias registradas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
