'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Key,
  Copy,
  Check,
  Send,
  ExternalLink,
  Search,
  Filter,
  LogOut,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  TrendingUp,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { TEMPLATE_COPY_URL, type SpreadsheetLicenseRecord } from '@/lib/licensing-types';
import {
  authenticateAdminAction,
  adminLogoutAction,
  issueLicenseAction,
  getLicensesListAction,
} from '@/actions/licenses';
import { logoutUserAction } from '@/actions/auth';
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
  const [loginEmail, setLoginEmail] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await authenticateAdminAction(loginEmail);
      if (res.success && res.user) {
        setIsAdmin(true);
        setAdminEmail(res.user.email);
        await reloadLicenses();
      } else {
        setLoginError(res.error || 'Acceso denegado.');
      }
    } catch {
      setLoginError('Error al conectar con el servidor.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await adminLogoutAction();
    await logoutUserAction();
    setIsAdmin(false);
    setAdminEmail('');
    setLicenses([]);
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
    const primerNombre = rec.customerName.split(' ')[0] || 'Hola';
    const msg = `¡Hola ${primerNombre}! Muchas gracias por tu compra. 🙌

Acá tenés el enlace oficial para abrir tu copia de la Planilla Financiera Flor Martínez:
👉 ${TEMPLATE_COPY_URL}

🔑 Tu Clave de Activación Oficial es:
${rec.licenseKey}

📌 Instrucciones de activación:
1. Abrí el enlace y presioná 'Crear una copia'.
2. En la portada 'Activar Licencia', escribí tu clave en la celda C7 y presioná Enter.
3. ¡Listo! Se desbloquearán todas las hojas de trabajo automáticamente.`;

    navigator.clipboard.writeText(msg);
    setCopiedRowKey(rec.id);
    setTimeout(() => setCopiedRowKey(null), 2000);
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

  // Render Login Gate if not authenticated
  if (!isAdmin) {
    return (
      <div className={styles.pageWrapper}>
        <Container size="wide">
          <div className={styles.loginGateWrap}>
            <div className={styles.gateIconWrap}>
              <ShieldCheck size={28} />
            </div>
            <h1 className={styles.gateTitle}>Acceso Superadmin</h1>
            <p className={styles.gateDesc}>
              Panel exclusivo para <strong>Santiago</strong> y <strong>Flor Martínez</strong>. Ingresá tu correo autorizado para gestionar las licencias.
            </p>

            {loginError && <div className={styles.gateError}>{loginError}</div>}

            <form onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  required
                  placeholder="ej. santisose01@gmail.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className={styles.formInput}
                />
              </div>
              <button
                type="submit"
                disabled={isLoggingIn}
                className={styles.submitBtn}
              >
                {isLoggingIn ? 'Verificando...' : 'Ingresar al Gestor de Licencias'}
              </button>
            </form>
          </div>
        </Container>
      </div>
    );
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
            <a
              href="https://docs.google.com/spreadsheets/d/1-8MYVSviA07R0e2Q7XNjCobcVMqGIMEoIUQrUqMvvYM/edit?gid=299532771#gid=299532771"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.masterSheetBtn}
              title="Abrir la planilla Google Sheet matriz"
            >
              <span>Abrir Google Sheet Matriz</span>
              <ExternalLink size={14} />
            </a>

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
                          <td>{formattedDate}</td>
                          <td className={styles.actionCell}>
                            <button
                              type="button"
                              onClick={() => handleCopyRowMessage(item)}
                              className={styles.quickCopyBtn}
                              title="Copiar mensaje de entrega con enlace"
                            >
                              {copiedRowKey === item.id ? '¡Copiado!' : '📋 Copiar Mensaje'}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '30px', color: '#94A3B8' }}>
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
