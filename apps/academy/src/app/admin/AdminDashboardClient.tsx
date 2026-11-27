'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  LogOut,
  Users,
  Video,
  MessageSquare,
  Layers,
  DollarSign,
  Compass,
  Search,
  Plus,
  Trash2,
  Lock,
  Globe,
  CheckCircle,
  Clock,
  Eye,
  Reply,
  CheckCircle2,
  Code2,
  Zap,
  Save,
  Check,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useEcosystemAuth } from '@/context/AuthContext';
import {
  getAdminUsersAction,
  updateUserRoleAction,
  updateUserMembershipAction,
  toggleUserBanAction,
  deleteUserAction,
  createManualUserAction,
  getAdminVideoMetricsAction,
  getAdminCommentsAction,
  toggleCommentApprovalAction,
  toggleCommentReadAction,
  replyCommentAsFlorAction,
  deleteLessonCommentAction,
  getAdminPricingAction,
  updateFullPricingAction,
  getAdminVocationalStatsAction,
} from '@/actions/admin';
import type {
  AdminUserRecord,
  ClassVideoMetric,
  StoredCommentItem,
  PricingPlan,
} from '@/actions/admin';
import { campusPrograms } from '@/data/campus';
import styles from './AdminDashboard.module.css';

const BASE_REAL_USERS: AdminUserRecord[] = [
  {
    id: 'usr_santi_admin',
    email: 'santisose01@gmail.com',
    name: 'Santiago Sose',
    role: 'superadmin',
    membershipTier: 'VIP',
    status: 'active',
    avatarUrl: null,
    createdAt: '2026-10-01T10:00:00.000Z',
    lastLoginAt: '2026-11-23T08:00:00.000Z',
    notes: 'Superadministrador principal',
  },
  {
    id: 'usr_flor_admin',
    email: 'licenciadaflormartinez@gmail.com',
    name: 'Flor Martínez',
    role: 'superadmin',
    membershipTier: 'VIP',
    status: 'active',
    avatarUrl: null,
    createdAt: '2026-10-01T10:00:00.000Z',
    lastLoginAt: '2026-11-23T08:00:00.000Z',
    notes: 'Instructora titular y fundadora',
  },
  {
    id: 'usr_luciana_admin',
    email: 'lucianamartinez0696@gmail.com',
    name: 'Luciana Martínez',
    role: 'superadmin',
    membershipTier: 'VIP',
    status: 'active',
    avatarUrl: null,
    createdAt: '2026-10-01T10:00:00.000Z',
    lastLoginAt: '2026-11-23T08:00:00.000Z',
    notes: 'Equipo de coordinación superadmin',
  },
];

type AdminTab = 'cuentas' | 'videos' | 'comentarios' | 'modulos' | 'precios' | 'test-vocacional';

export default function AdminDashboardClient() {
  const { user, isSuperAdmin, logout } = useEcosystemAuth();

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('cuentas');

  // Top Bar Toggles (Dev Mode & Simulated Membership)
  const [devMode, setDevMode] = useState(false);
  const [membershipTier, setMembershipTier] = useState<'paid' | 'free'>('paid');

  // Tab 1: Users State - always starts populated with the 3 real team accounts
  const [users, setUsers] = useState<AdminUserRecord[]>(BASE_REAL_USERS);
  const [usersStats, setUsersStats] = useState({
    total: BASE_REAL_USERS.length,
    superadmins: 3,
    vipMembers: 3,
    banned: 0,
  });
  const [userSearch, setUserSearch] = useState('');
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserTier, setNewUserTier] = useState<'VIP' | 'TRIAL' | 'FREE'>('TRIAL');
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [selectedProgressUser, setSelectedProgressUser] = useState<AdminUserRecord | null>(null);

  // Tab 2: Video Metrics State
  const [videoMetrics, setVideoMetrics] = useState<ClassVideoMetric[]>([]);
  const [videoStats, setVideoStats] = useState({ totalVideos: 0, totalViews: 0, totalHours: '0', topWatched: null as ClassVideoMetric | null });
  const [videoCourseFilter, setVideoCourseFilter] = useState('all');

  // Tab 3: Comments State
  const [comments, setComments] = useState<StoredCommentItem[]>([]);
  const [commentsStats, setCommentsStats] = useState({ total: 0, unreadCount: 0, pendingApprovalCount: 0, unrepliedCount: 0 });
  const [commentFilter, setCommentFilter] = useState<'all' | 'unread' | 'pending' | 'unreplied'>('all');
  const [replyActiveId, setReplyActiveId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);

  // Tab 4: Modules State
  const [selectedCourseSlug, setSelectedCourseSlug] = useState('experiencia-busqueda-laboral');

  // Tab 5: Pricing State
  const [pricing, setPricing] = useState<Record<string, PricingPlan> | null>(null);
  const [eblPromoPrice, setEblPromoPrice] = useState(25000);
  const [eblRegularPrice, setEblRegularPrice] = useState(35000);
  const [eblInstallments, setEblInstallments] = useState(3);
  const [coursePrice, setCoursePrice] = useState(18500);
  const [isSavingPricing, setIsSavingPricing] = useState(false);
  const [pricingSavedSuccess, setPricingSavedSuccess] = useState(false);

  // Tab 6: Vocational Test Stats
  const [vocationalStats, setVocationalStats] = useState<any>(null);

  // Initial Load & Persistence
  useEffect(() => {
    const savedDev = localStorage.getItem('ebl_dev_mode');
    if (savedDev === 'true') setDevMode(true);
    const savedTier = localStorage.getItem('ebl_simulated_tier');
    if (savedTier === 'free' || savedTier === 'paid') setMembershipTier(savedTier);
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

  // Fetch Data Functions
  const loadUsers = useCallback(async () => {
    try {
      const res = await getAdminUsersAction();
      if (res && res.success && Array.isArray(res.users) && res.users.length > 0) {
        setUsers(res.users);
        setUsersStats({
          total: res.stats.total,
          superadmins: res.stats.superadminCount,
          vipMembers: res.stats.vipCount,
          banned: res.stats.bannedCount,
        });
      }
    } catch (err) {
      console.error('Error cargando usuarios admin:', err);
    }
  }, []);

  const loadVideos = useCallback(async () => {
    try {
      const res = await getAdminVideoMetricsAction();
      if (res.success) {
        setVideoMetrics(res.metrics);
        setVideoStats(res.stats);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const loadComments = useCallback(async () => {
    try {
      const res = await getAdminCommentsAction();
      if (res.success) {
        setComments(res.comments);
        setCommentsStats(res.stats);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const loadPricing = useCallback(async () => {
    try {
      const res = await getAdminPricingAction();
      if (res.success && res.pricing) {
        setPricing(res.pricing);
        if (res.pricing['ebl']) {
          setEblPromoPrice(res.pricing['ebl'].promoPrice);
          setEblRegularPrice(res.pricing['ebl'].regularPrice);
        }
        if (res.pricing['curso-cv']) {
          setCoursePrice(res.pricing['curso-cv'].promoPrice);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const loadVocationalStats = useCallback(async () => {
    try {
      const res = await getAdminVocationalStatsAction();
      if (res.success) {
        setVocationalStats(res.stats);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadUsers();
    loadVideos();
    loadComments();
    loadPricing();
    loadVocationalStats();
  }, [loadUsers, loadVideos, loadComments, loadPricing, loadVocationalStats]);

  // User Management Actions
  const recalcUserStats = (list: AdminUserRecord[]) => {
    setUsersStats({
      total: list.length,
      superadmins: list.filter((u) => u.role === 'superadmin').length,
      vipMembers: list.filter((u) => u.membershipTier === 'VIP').length,
      banned: list.filter((u) => u.status === 'banned').length,
    });
  };

  const handleRoleChange = async (
    userId: string,
    email: string,
    newRole: 'superadmin' | 'student' | 'client'
  ) => {
    setUsers((prev) => {
      const next = prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u));
      recalcUserStats(next);
      return next;
    });
    await updateUserRoleAction(userId, newRole, email);
  };

  const handleMembershipChange = async (
    userId: string,
    email: string,
    nextTier: 'VIP' | 'TRIAL' | 'FREE'
  ) => {
    setUsers((prev) => {
      const next = prev.map((u) => (u.id === userId ? { ...u, membershipTier: nextTier } : u));
      recalcUserStats(next);
      return next;
    });
    await updateUserMembershipAction(userId, nextTier, email);
  };

  const handleBanToggle = async (userId: string, email: string) => {
    setUsers((prev) => {
      const next: AdminUserRecord[] = prev.map((u) =>
        u.id === userId
          ? { ...u, status: (u.status === 'banned' ? 'active' : 'banned') as 'active' | 'banned' }
          : u
      );
      recalcUserStats(next);
      return next;
    });
    await toggleUserBanAction(userId, email);
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('¿Estás seguro de eliminar esta cuenta?')) return;
    const res = await deleteUserAction(userId);
    if (res.success) loadUsers();
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserEmail.trim()) return;
    setIsCreatingUser(true);
    try {
      const res = await createManualUserAction({
        email: newUserEmail.trim(),
        name: newUserName.trim() || undefined,
        membershipTier: newUserTier,
      });
      if (res.success) {
        setShowNewUserModal(false);
        setNewUserName('');
        setNewUserEmail('');
        loadUsers();
      } else {
        alert(res.error || 'Error al crear usuario');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCreatingUser(false);
    }
  };

  // Comment Actions
  const handleToggleApproval = async (commentId: string) => {
    const res = await toggleCommentApprovalAction(commentId);
    if (res.success) loadComments();
  };

  const handleToggleRead = async (commentId: string) => {
    const res = await toggleCommentReadAction(commentId);
    if (res.success) loadComments();
  };

  const handleSendReply = async (commentId: string) => {
    if (!replyText.trim() || isSendingReply) return;
    setIsSendingReply(true);
    try {
      const res = await replyCommentAsFlorAction(commentId, replyText.trim());
      if (res.success) {
        setReplyText('');
        setReplyActiveId(null);
        loadComments();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSendingReply(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('¿Eliminar este comentario permanentemente?')) return;
    const res = await deleteLessonCommentAction(commentId, user?.email || '', true);
    if (res.success) loadComments();
  };

  // Pricing Actions
  const handleSavePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingPricing(true);
    try {
      const res = await updateFullPricingAction({
        eblPromoPrice,
        eblRegularPrice,
        coursePrice,
      });
      if (res.success) {
        setPricingSavedSuccess(true);
        await loadPricing();
        setTimeout(() => setPricingSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingPricing(false);
    }
  };

  // Filtered Users
  const filteredUsers = users.filter((u) => {
    const q = userSearch.toLowerCase();
    return u.email.toLowerCase().includes(q) || u.name.toLowerCase().includes(q);
  });

  // Filtered Comments
  const filteredComments = comments.filter((c) => {
    if (commentFilter === 'unread') return !c.isRead;
    if (commentFilter === 'pending') return !c.isApproved;
    if (commentFilter === 'unreplied') return c.replies.length === 0 && !c.isInstructor;
    return true;
  });

  // Unauthorized check
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
            {/* DEV MODE & SIMULATOR PILLS IN TOP BAR */}
            <div className={styles.topBarPills}>
              <button
                type="button"
                onClick={toggleDevMode}
                className={`${styles.devPillBtn} ${devMode ? styles.devPillActive : styles.devPillInactive}`}
                title="Desbloquea instantáneamente todas las clases del aula"
              >
                <Code2 size={13} />
                <span>Modo Dev: {devMode ? 'ON' : 'OFF'}</span>
              </button>

              <button
                type="button"
                onClick={toggleMembershipTier}
                className={`${styles.tierPillBtn} ${
                  membershipTier === 'paid' ? styles.tierPillPaid : styles.tierPillFree
                }`}
                title="Alterna visualización del campus como VIP o Free Demo"
              >
                <Zap size={13} />
                <span>Simulador: {membershipTier === 'paid' ? 'VIP' : 'FREE'}</span>
              </button>
            </div>

            <a
              href="https://flormartinezok.com/admin"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.globalAdminBtn}
              title="Ir al Panel General del Ecosistema"
            >
              <span>Ecosistema Global</span>
              <ArrowUpRight size={14} />
            </a>

            <Link href="/campus" className={styles.campusBtn}>
              <GraduationCap size={15} />
              <span>Campus</span>
            </Link>

            <button onClick={logout} className={styles.logoutBtn} title="Cerrar sesión segura">
              <LogOut size={14} />
              <span>Salir</span>
            </button>
          </div>
        </header>

        {/* TAB NAVIGATION */}
        <nav className={styles.navTabs}>
          <button
            type="button"
            onClick={() => setActiveTab('cuentas')}
            className={`${styles.tabBtn} ${activeTab === 'cuentas' ? styles.tabBtnActive : ''}`}
          >
            <Users size={16} />
            <span>Cuentas & Alumnos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('videos')}
            className={`${styles.tabBtn} ${activeTab === 'videos' ? styles.tabBtnActive : ''}`}
          >
            <Video size={16} />
            <span>Métricas de Videos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('comentarios')}
            className={`${styles.tabBtn} ${activeTab === 'comentarios' ? styles.tabBtnActive : ''}`}
          >
            <MessageSquare size={16} />
            <span>Consultas & Comentarios</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('modulos')}
            className={`${styles.tabBtn} ${activeTab === 'modulos' ? styles.tabBtnActive : ''}`}
          >
            <Layers size={16} />
            <span>Módulos & Contenidos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('precios')}
            className={`${styles.tabBtn} ${activeTab === 'precios' ? styles.tabBtnActive : ''}`}
          >
            <DollarSign size={16} />
            <span>Precios</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('test-vocacional')}
            className={`${styles.tabBtn} ${activeTab === 'test-vocacional' ? styles.tabBtnActive : ''}`}
          >
            <Compass size={16} />
            <span>Test Vocacional</span>
          </button>
        </nav>

        {/* ========================================================================= */}
        {/* TAB 1: CUENTAS & ALUMNOS */}
        {/* ========================================================================= */}
        {activeTab === 'cuentas' && (
          <section>
            {/* Overview Metric Cards */}
            <div className={styles.statsOverviewGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricIconWrap} style={{ background: '#EFF6FF', color: '#2563EB' }}>
                  <Users size={22} />
                </div>
                <div className={styles.metricCol}>
                  <span className={styles.metricValue}>{usersStats.total}</span>
                  <span className={styles.metricLabel}>Total Cuentas</span>
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricIconWrap} style={{ background: '#FEF3C7', color: '#D97706' }}>
                  <ShieldCheck size={22} />
                </div>
                <div className={styles.metricCol}>
                  <span className={styles.metricValue}>{usersStats.superadmins}</span>
                  <span className={styles.metricLabel}>Superadministradores</span>
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricIconWrap} style={{ background: '#F5F3FF', color: '#7C3AED' }}>
                  <Zap size={22} />
                </div>
                <div className={styles.metricCol}>
                  <span className={styles.metricValue}>{usersStats.vipMembers}</span>
                  <span className={styles.metricLabel}>Alumnos VIP Activos</span>
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricIconWrap} style={{ background: '#FEE2E2', color: '#DC2626' }}>
                  <Lock size={22} />
                </div>
                <div className={styles.metricCol}>
                  <span className={styles.metricValue}>{usersStats.banned}</span>
                  <span className={styles.metricLabel}>Cuentas Bloqueadas</span>
                </div>
              </div>
            </div>

            {/* Search Bar + Create Button */}
            <div className={styles.searchActionBar}>
              <div className={styles.searchInputWrap}>
                <Search size={16} color="#94A3B8" />
                <input
                  type="text"
                  placeholder="Buscar por email o nombre..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              <button
                type="button"
                onClick={() => setShowNewUserModal(true)}
                className={styles.createBtn}
              >
                <Plus size={16} />
                <span>+ Nuevo Alumno</span>
              </button>
            </div>

            {/* Users Table */}
            <div className={styles.dataTableWrapper}>
              <table className={styles.adminTable}>
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th>Membresía</th>
                    <th>Progreso Clases</th>
                    <th>Estado</th>
                    <th>Último Acceso</th>
                    <th style={{ textAlign: 'center' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '2.5rem', color: '#94A3B8' }}>
                        No se encontraron cuentas registradas.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => (
                      <tr key={u.id}>
                        <td>
                          <div className={styles.userCell}>
                            <div className={styles.userAvatar}>
                              {u.name
                                .split(' ')
                                .map((w) => w[0])
                                .slice(0, 2)
                                .join('')
                                .toUpperCase() || 'U'}
                            </div>
                            <div className={styles.userNameCol}>
                              <span className={styles.userName}>{u.name}</span>
                              <span className={styles.userEmail}>{u.email}</span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <select
                            value={u.role}
                            onChange={(e) =>
                              handleRoleChange(u.id, u.email, e.target.value as 'superadmin' | 'student' | 'client')
                            }
                            className={styles.roleSelect}
                          >
                            <option value="superadmin">Superadmin</option>
                            <option value="student">Alumno</option>
                            <option value="client">Cliente</option>
                          </select>
                        </td>

                        <td>
                          <select
                            value={u.membershipTier}
                            onChange={(e) =>
                              handleMembershipChange(
                                u.id,
                                u.email,
                                e.target.value as 'VIP' | 'TRIAL' | 'FREE'
                              )
                            }
                            className={styles.roleSelect}
                            style={{
                              fontWeight: 700,
                              backgroundColor:
                                u.membershipTier === 'VIP'
                                  ? '#F5F3FF'
                                  : u.membershipTier === 'TRIAL'
                                  ? '#EFF6FF'
                                  : '#F8FAFC',
                              color:
                                u.membershipTier === 'VIP'
                                  ? '#6D28D9'
                                  : u.membershipTier === 'TRIAL'
                                  ? '#1D4ED8'
                                  : '#64748B',
                              borderColor:
                                u.membershipTier === 'VIP'
                                  ? '#DDD6FE'
                                  : u.membershipTier === 'TRIAL'
                                  ? '#BFDBFE'
                                  : '#E2E8F0',
                            }}
                            title="Elegir nivel de acceso (VIP Total, Acceso Prueba Mód. 1-4 o Free)"
                          >
                            <option value="VIP">★ VIP (Total)</option>
                            <option value="TRIAL">⚡ Acceso Prueba (Mód. 1-4)</option>
                            <option value="FREE">FREE (Mód. 1)</option>
                          </select>
                        </td>

                        <td>
                          {(() => {
                            const viewed = u.viewedLessonsCount ?? 0;
                            const completed = u.completedLessonsCount ?? 0;
                            const totalLessons = u.totalProgramLessons || 35;
                            const pct = Math.min(100, Math.round((completed / totalLessons) * 100));
                            return (
                              <button
                                type="button"
                                onClick={() => setSelectedProgressUser(u)}
                                title="Clic para ver qué clases vio y cuáles finalizó"
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '0.3rem',
                                  background: 'transparent',
                                  border: '1px solid transparent',
                                  borderRadius: '0.5rem',
                                  padding: '0.35rem 0.5rem',
                                  cursor: 'pointer',
                                  textAlign: 'left',
                                  minWidth: '150px',
                                  transition: 'background 0.15s ease, border-color 0.15s ease',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#F8FAFC';
                                  e.currentTarget.style.borderColor = '#E2E8F0';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'transparent';
                                  e.currentTarget.style.borderColor = 'transparent';
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                                  <span
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '0.25rem',
                                      fontSize: '0.73rem',
                                      fontWeight: 700,
                                      padding: '0.12rem 0.45rem',
                                      borderRadius: '9999px',
                                      background: viewed > 0 ? '#EDE9FE' : '#F1F5F9',
                                      color: viewed > 0 ? '#6D28D9' : '#64748B',
                                    }}
                                  >
                                    <Eye size={11} />
                                    {viewed} {viewed === 1 ? 'vista' : 'vistas'}
                                  </span>
                                  <span
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '0.22rem',
                                      fontSize: '0.73rem',
                                      fontWeight: 700,
                                      padding: '0.12rem 0.45rem',
                                      borderRadius: '9999px',
                                      background: completed > 0 ? '#DCFCE7' : '#F1F5F9',
                                      color: completed > 0 ? '#15803D' : '#64748B',
                                    }}
                                  >
                                    <CheckCircle2 size={11} />
                                    {completed}/{totalLessons} fin.
                                  </span>
                                </div>
                                <div
                                  style={{
                                    width: '100%',
                                    height: '5px',
                                    background: '#E2E8F0',
                                    borderRadius: '9999px',
                                    overflow: 'hidden',
                                  }}
                                >
                                  <div
                                    style={{
                                      width: `${pct}%`,
                                      height: '100%',
                                      background: completed > 0 ? 'linear-gradient(90deg, #7C3AED, #10B981)' : '#CBD5E1',
                                      borderRadius: '9999px',
                                      transition: 'width 0.3s ease',
                                    }}
                                  />
                                </div>
                              </button>
                            );
                          })()}
                        </td>

                        <td>
                          <button
                            type="button"
                            onClick={() => handleBanToggle(u.id, u.email)}
                            className={`${styles.statusBadge} ${
                              u.status === 'active' ? styles.statusActive : styles.statusBanned
                            }`}
                            title="Clic para bloquear / desbloquear acceso"
                          >
                            {u.status === 'active' ? '✓ Activo' : '✕ Bloqueado'}
                          </button>
                        </td>

                        <td style={{ fontSize: '0.8rem', color: '#64748B' }}>
                          {new Date(u.lastLoginAt).toLocaleDateString('es-AR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>

                        <td style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(u.id)}
                            className={styles.actionBtnTrash}
                            title="Eliminar usuario"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Create User Modal */}
            {showNewUserModal && (
              <div
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 9999,
                  padding: '1rem',
                }}
              >
                <div
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '1rem',
                    padding: '2rem',
                    maxWidth: '440px',
                    width: '100%',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <h3 style={{ margin: '0 0 1rem', fontSize: '1.25rem', fontWeight: 800, color: '#1E1B4B' }}>
                    Registrar Nuevo Alumno
                  </h3>
                  <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                        Nombre y Apellido <span style={{ fontWeight: 500, color: '#94A3B8' }}>(opcional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: Laura Gómez"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #CBD5E1', borderRadius: '0.5rem', fontSize: '0.875rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                        Email del Alumno *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alumno@gmail.com"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #CBD5E1', borderRadius: '0.5rem', fontSize: '0.875rem' }}
                      />
                      <span style={{ display: 'block', marginTop: '0.3rem', fontSize: '0.72rem', color: '#64748B' }}>
                        Podés cargar el mail antes de que se registre: apenas ingrese con Google se activa automático.
                      </span>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                        Nivel de Acceso
                      </label>
                      <select
                        value={newUserTier}
                        onChange={(e) => setNewUserTier(e.target.value as 'VIP' | 'TRIAL' | 'FREE')}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #CBD5E1', borderRadius: '0.5rem', fontSize: '0.875rem' }}
                      >
                        <option value="TRIAL">Acceso Prueba (Módulos 1 al 4)</option>
                        <option value="VIP">Membresía VIP (Acceso Total)</option>
                        <option value="FREE">Cuenta Gratuita (Solo Módulo 1)</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => setShowNewUserModal(false)}
                        style={{ padding: '0.65rem 1rem', background: '#F1F5F9', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={isCreatingUser}
                        style={{ padding: '0.65rem 1.25rem', background: '#7C3AED', color: '#FFFFFF', border: 'none', borderRadius: '0.5rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        {isCreatingUser ? 'Guardando...' : 'Crear Alumno'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* User Lesson Progress Detail Modal */}
            {selectedProgressUser && (() => {
              const eblProgram = campusPrograms[0];
              const publishedMods = eblProgram
                ? eblProgram.modules.filter((m) => !m.isExtra || m.number <= 8)
                : [];
              const completedSet = new Set(selectedProgressUser.completedLessonIds || []);
              const viewedSet = new Set([
                ...(selectedProgressUser.viewedLessonIds || []),
                ...(selectedProgressUser.completedLessonIds || []),
              ]);
              const totalLessons =
                selectedProgressUser.totalProgramLessons ||
                publishedMods.reduce((acc, m) => acc + m.lessons.length, 0) ||
                35;
              const pct = Math.min(100, Math.round((completedSet.size / totalLessons) * 100));

              return (
                <div
                  onClick={() => setSelectedProgressUser(null)}
                  style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    padding: '1rem',
                  }}
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '1rem',
                      padding: '1.75rem',
                      maxWidth: '640px',
                      width: '100%',
                      maxHeight: '85vh',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 20px 35px -5px rgba(15, 23, 42, 0.25)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#1E1B4B' }}>
                          Avance de {selectedProgressUser.name}
                        </h3>
                        <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#64748B' }}>
                          {selectedProgressUser.email}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedProgressUser(null)}
                        style={{
                          background: '#F1F5F9',
                          border: 'none',
                          borderRadius: '0.5rem',
                          width: '32px',
                          height: '32px',
                          fontWeight: 700,
                          color: '#475569',
                          cursor: 'pointer',
                        }}
                        aria-label="Cerrar"
                      >
                        ✕
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      <div style={{ background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: '0.75rem', padding: '0.75rem' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#6D28D9' }}>{viewedSet.size}</div>
                        <div style={{ fontSize: '0.74rem', fontWeight: 600, color: '#5B21B6' }}>Clases vistas</div>
                      </div>
                      <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '0.75rem', padding: '0.75rem' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#15803D' }}>
                          {completedSet.size} / {totalLessons}
                        </div>
                        <div style={{ fontSize: '0.74rem', fontWeight: 600, color: '#166534' }}>Clases finalizadas</div>
                      </div>
                      <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '0.75rem', padding: '0.75rem' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B' }}>{pct}%</div>
                        <div style={{ fontSize: '0.74rem', fontWeight: 600, color: '#475569' }}>Progreso total</div>
                      </div>
                    </div>

                    <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.25rem' }}>
                      {publishedMods.map((mod) => {
                        const modCompleted = mod.lessons.filter((l) => completedSet.has(l.id)).length;
                        const modViewed = mod.lessons.filter((l) => viewedSet.has(l.id)).length;
                        return (
                          <div key={mod.id} style={{ border: '1px solid #E2E8F0', borderRadius: '0.75rem', overflow: 'hidden' }}>
                            <div
                              style={{
                                background: '#F8FAFC',
                                padding: '0.6rem 0.9rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid #E2E8F0',
                              }}
                            >
                              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1E1B4B' }}>
                                {mod.isExtra ? mod.extraTag || `Extra ${mod.number}` : `Módulo ${mod.number}`} · {mod.title}
                              </span>
                              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B' }}>
                                {modViewed} vistas · {modCompleted}/{mod.lessons.length} fin.
                              </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              {mod.lessons.map((lesson) => {
                                const isDone = completedSet.has(lesson.id);
                                const isSeen = viewedSet.has(lesson.id);
                                return (
                                  <div
                                    key={lesson.id}
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      gap: '0.75rem',
                                      padding: '0.5rem 0.9rem',
                                      borderTop: '1px solid #F1F5F9',
                                      fontSize: '0.8rem',
                                    }}
                                  >
                                    <span style={{ color: isDone || isSeen ? '#0F172A' : '#94A3B8', fontWeight: isDone || isSeen ? 600 : 400 }}>
                                      {lesson.lessonNumber}. {lesson.title}
                                    </span>
                                    {isDone ? (
                                      <span
                                        style={{
                                          flexShrink: 0,
                                          fontSize: '0.7rem',
                                          fontWeight: 700,
                                          padding: '0.15rem 0.5rem',
                                          borderRadius: '9999px',
                                          background: '#DCFCE7',
                                          color: '#15803D',
                                        }}
                                      >
                                        ✓ Finalizada
                                      </span>
                                    ) : isSeen ? (
                                      <span
                                        style={{
                                          flexShrink: 0,
                                          fontSize: '0.7rem',
                                          fontWeight: 700,
                                          padding: '0.15rem 0.5rem',
                                          borderRadius: '9999px',
                                          background: '#EDE9FE',
                                          color: '#6D28D9',
                                        }}
                                      >
                                        👁 Vista
                                      </span>
                                    ) : (
                                      <span style={{ flexShrink: 0, fontSize: '0.7rem', color: '#CBD5E1', fontWeight: 600 }}>
                                        Pendiente
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: MÉTRICAS DE VIDEOS & CLASES */}
        {/* ========================================================================= */}
        {activeTab === 'videos' && (
          <section>
            {/* Overview Metrics */}
            <div className={styles.statsOverviewGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricIconWrap} style={{ background: '#EFF6FF', color: '#2563EB' }}>
                  <Video size={22} />
                </div>
                <div className={styles.metricCol}>
                  <span className={styles.metricValue}>{videoStats.totalVideos || 37}</span>
                  <span className={styles.metricLabel}>Total Clases en Video</span>
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricIconWrap} style={{ background: '#ECFDF5', color: '#059669' }}>
                  <Eye size={22} />
                </div>
                <div className={styles.metricCol}>
                  <span className={styles.metricValue}>{videoStats.totalViews}</span>
                  <span className={styles.metricLabel}>Visualizaciones CDN</span>
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricIconWrap} style={{ background: '#F5F3FF', color: '#7C3AED' }}>
                  <Clock size={22} />
                </div>
                <div className={styles.metricCol}>
                  <span className={styles.metricValue}>+{videoStats.totalHours || '4.8'} h</span>
                  <span className={styles.metricLabel}>Horas de Contenido HD</span>
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricIconWrap} style={{ background: '#FEF3C7', color: '#D97706' }}>
                  <Sparkles size={22} />
                </div>
                <div className={styles.metricCol}>
                  <span className={styles.metricValue}>1080p</span>
                  <span className={styles.metricLabel}>Full HD Bunny CDN</span>
                </div>
              </div>
            </div>

            {/* Videos Table */}
            <div className={styles.dataTableWrapper}>
              <table className={styles.adminTable}>
                <thead>
                  <tr>
                    <th>Módulo</th>
                    <th>Clase</th>
                    <th>Nombre</th>
                    <th>Curso</th>
                    <th>Duración</th>
                    <th>Visualizaciones</th>
                    <th style={{ textAlign: 'center' }}>Auditar</th>
                  </tr>
                </thead>
                <tbody>
                  {videoMetrics.map((v) => (
                    <tr key={v.lessonId}>
                      <td style={{ fontWeight: 750, color: '#6D28D9', whiteSpace: 'nowrap' }}>
                        {v.moduleDisplay}
                      </td>

                      <td style={{ fontWeight: 700, color: '#334155', textAlign: 'center' }}>
                        #{v.classNumber}
                      </td>

                      <td style={{ fontWeight: 650, color: '#0F172A' }}>
                        {v.lessonTitle}
                      </td>

                      <td>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563EB', background: '#EFF6FF', padding: '0.2rem 0.55rem', borderRadius: '4px' }}>
                          {v.courseName}
                        </span>
                      </td>

                      <td style={{ fontSize: '0.825rem', fontWeight: 600, color: '#64748B', whiteSpace: 'nowrap' }}>
                        {v.durationFormatted}
                      </td>

                      <td>
                        <span className={styles.viewsBadge}>
                          <Eye size={12} />
                          <span>{v.views} vistas</span>
                        </span>
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <Link
                          href={`/campus?clase=${v.lessonId}`}
                          className={styles.auditCampusBtn}
                          title="Abrir reproductor en campus"
                        >
                          <ExternalLink size={12} />
                          <span>Auditar</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: CONSULTAS & MODERACIÓN DE COMENTARIOS */}
        {/* ========================================================================= */}
        {activeTab === 'comentarios' && (
          <section>
            {/* Overview Metrics */}
            <div className={styles.statsOverviewGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricIconWrap} style={{ background: '#EFF6FF', color: '#2563EB' }}>
                  <MessageSquare size={22} />
                </div>
                <div className={styles.metricCol}>
                  <span className={styles.metricValue}>{commentsStats.total}</span>
                  <span className={styles.metricLabel}>Total Consultas</span>
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricIconWrap} style={{ background: '#FEE2E2', color: '#DC2626' }}>
                  <AlertCircle size={22} />
                </div>
                <div className={styles.metricCol}>
                  <span className={styles.metricValue}>{commentsStats.unreadCount}</span>
                  <span className={styles.metricLabel}>No Leídos (Pendientes)</span>
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricIconWrap} style={{ background: '#FEF3C7', color: '#D97706' }}>
                  <Lock size={22} />
                </div>
                <div className={styles.metricCol}>
                  <span className={styles.metricValue}>{commentsStats.pendingApprovalCount}</span>
                  <span className={styles.metricLabel}>Privados (Requieren Visto Bueno)</span>
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricIconWrap} style={{ background: '#F5F3FF', color: '#7C3AED' }}>
                  <Reply size={22} />
                </div>
                <div className={styles.metricCol}>
                  <span className={styles.metricValue}>{commentsStats.unrepliedCount}</span>
                  <span className={styles.metricLabel}>Sin Respuesta de Flor</span>
                </div>
              </div>
            </div>

            {/* Filter Chips */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setCommentFilter('all')}
                style={{
                  padding: '0.45rem 0.95rem',
                  borderRadius: '9999px',
                  border: '1px solid #CBD5E1',
                  background: commentFilter === 'all' ? '#7C3AED' : '#FFFFFF',
                  color: commentFilter === 'all' ? '#FFFFFF' : '#334155',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                Todos ({comments.length})
              </button>
              <button
                type="button"
                onClick={() => setCommentFilter('unread')}
                style={{
                  padding: '0.45rem 0.95rem',
                  borderRadius: '9999px',
                  border: '1px solid #FECDD3',
                  background: commentFilter === 'unread' ? '#DC2626' : '#FFFFFF',
                  color: commentFilter === 'unread' ? '#FFFFFF' : '#DC2626',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                Solo No Leídos ({commentsStats.unreadCount})
              </button>
              <button
                type="button"
                onClick={() => setCommentFilter('pending')}
                style={{
                  padding: '0.45rem 0.95rem',
                  borderRadius: '9999px',
                  border: '1px solid #FDE68A',
                  background: commentFilter === 'pending' ? '#D97706' : '#FFFFFF',
                  color: commentFilter === 'pending' ? '#FFFFFF' : '#D97706',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                Solo Privados ({commentsStats.pendingApprovalCount})
              </button>
              <button
                type="button"
                onClick={() => setCommentFilter('unreplied')}
                style={{
                  padding: '0.45rem 0.95rem',
                  borderRadius: '9999px',
                  border: '1px solid #DDD6FE',
                  background: commentFilter === 'unreplied' ? '#6D28D9' : '#FFFFFF',
                  color: commentFilter === 'unreplied' ? '#FFFFFF' : '#6D28D9',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                Sin Responder ({commentsStats.unrepliedCount})
              </button>
            </div>

            {/* Moderation Feed */}
            <div className={styles.commentsFeed}>
              {filteredComments.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', background: '#FFFFFF', borderRadius: '1rem', border: '1px solid #E2E8F0', color: '#94A3B8' }}>
                  <CheckCircle size={36} color="#10B981" style={{ marginBottom: '0.75rem' }} />
                  <h3 style={{ margin: '0 0 0.5rem', color: '#1E293B', fontWeight: 800 }}>
                    ¡Bandeja de Consultas al día!
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.875rem' }}>
                    No hay comentarios que coincidan con este filtro. Todas las preguntas de los alumnos han sido leídas o procesadas.
                  </p>
                </div>
              ) : (
                filteredComments.map((comm) => (
                  <div
                    key={comm.id}
                    className={`${styles.commentAdminCard} ${
                      !comm.isRead ? styles.commentAdminCardUnread : !comm.isApproved ? styles.commentAdminCardPending : ''
                    }`}
                  >
                    <div className={styles.commentTopMeta}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span className={styles.commentLessonBadge}>
                          <Video size={12} />
                          <span>{comm.lessonTitle}</span>
                        </span>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1E293B' }}>
                          {comm.authorName} ({comm.authorEmail})
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {!comm.isRead ? (
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#DC2626', background: '#FEE2E2', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                            ● NO LEÍDO
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#059669', background: '#ECFDF5', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                            ✓ LEÍDO
                          </span>
                        )}

                        {!comm.isApproved ? (
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#D97706', background: '#FEF3C7', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                            🔒 PRIVADO
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#2563EB', background: '#EFF6FF', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                            🌐 PÚBLICO
                          </span>
                        )}

                        <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{comm.createdAt}</span>
                      </div>
                    </div>

                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#334155', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                      {comm.content}
                    </p>

                    {/* Replies by Flor */}
                    {comm.replies && comm.replies.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '8px', padding: '0.75rem' }}>
                        {comm.replies.map((rep) => (
                          <div key={rep.id}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.25rem' }}>
                              <ShieldCheck size={12} color="#7C3AED" />
                              <strong style={{ fontSize: '0.8rem', color: '#6D28D9' }}>{rep.authorName}:</strong>
                              <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{rep.createdAt}</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#4C1D95' }}>{rep.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Inline Reply Form */}
                    {replyActiveId === comm.id && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#7C3AED' }}>
                          Responder al alumno bajo el nombre oficial de <strong>Flor Martínez</strong>:
                        </span>
                        <textarea
                          rows={2}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Escribí la respuesta para el alumno..."
                          style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <button
                            type="button"
                            onClick={() => {
                              setReplyActiveId(null);
                              setReplyText('');
                            }}
                            style={{ padding: '0.4rem 0.8rem', background: '#E2E8F0', border: 'none', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}
                          >
                            Cancelar
                          </button>
                          <button
                            type="button"
                            disabled={!replyText.trim() || isSendingReply}
                            onClick={() => handleSendReply(comm.id)}
                            style={{ padding: '0.4rem 1rem', background: '#7C3AED', color: '#FFFFFF', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            {isSendingReply ? 'Enviando...' : 'Publicar Respuesta'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Actions Bar */}
                    <div className={styles.commentActionsRow}>
                      <button
                        type="button"
                        onClick={() => handleToggleRead(comm.id)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          background: '#FFFFFF',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        <Check size={12} />
                        <span>{comm.isRead ? 'Marcar No Leído' : 'Marcar Leído'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleApproval(comm.id)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          background: comm.isApproved ? '#FEF3C7' : '#EFF6FF',
                          color: comm.isApproved ? '#B45309' : '#1D4ED8',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {comm.isApproved ? <Lock size={12} /> : <Globe size={12} />}
                        <span>{comm.isApproved ? 'Hacer Privado' : 'Aprobar como Público'}</span>
                      </button>

                      {!comm.isInstructor && (
                        <button
                          type="button"
                          onClick={() => setReplyActiveId((prev) => (prev === comm.id ? null : comm.id))}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '6px',
                            background: '#7C3AED',
                            color: '#FFFFFF',
                            border: 'none',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          <Reply size={12} />
                          <span>Responder como Flor</span>
                        </button>
                      )}

                      <Link
                        href={`/campus?clase=${comm.lessonId}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '6px',
                          border: '1px solid #E2E8F0',
                          background: '#F8FAFC',
                          color: '#475569',
                          fontSize: '0.75rem',
                          fontWeight: 650,
                          textDecoration: 'none',
                          marginLeft: 'auto',
                        }}
                      >
                        <ExternalLink size={12} />
                        <span>Ver en Clase</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDeleteComment(comm.id)}
                        className={styles.actionBtnTrash}
                        title="Eliminar este comentario"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: MÓDULOS & CONTENIDOS */}
        {/* ========================================================================= */}
        {activeTab === 'modulos' && (
          <section>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
              {campusPrograms.map((prog: any) => (
                <button
                  key={prog.id}
                  type="button"
                  onClick={() => setSelectedCourseSlug(prog.slug)}
                  style={{
                    padding: '0.6rem 1.1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #CBD5E1',
                    background: selectedCourseSlug === prog.slug ? '#7C3AED' : '#FFFFFF',
                    color: selectedCourseSlug === prog.slug ? '#FFFFFF' : '#334155',
                    fontWeight: 750,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {prog.title}
                </button>
              ))}
            </div>

            {(() => {
              const currentProgram =
                campusPrograms.find((p: any) => p.slug === selectedCourseSlug) || campusPrograms[0]!;
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {currentProgram.modules.map((mod: any, modIdx: number) => (
                    <div
                      key={mod.id}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '1rem',
                        padding: '1.25rem 1.5rem',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: mod.isExtra ? '#D97706' : '#7C3AED', textTransform: 'uppercase' }}>
                            {mod.isExtra
                              ? `Módulo Extra ${mod.number >= 8 ? mod.number - 7 : modIdx - 6}`
                              : `Módulo ${modIdx + 1}`}
                          </span>
                          <h3 style={{ margin: '0.2rem 0 0', fontSize: '1.1rem', fontWeight: 800, color: '#1E1B4B' }}>
                            {mod.title}
                          </h3>
                        </div>
                        <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 650 }}>
                          {mod.lessons.length} {mod.lessons.length === 1 ? 'lección' : 'lecciones'}
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {mod.lessons.map((les: any, lesIdx: number) => (
                          <div
                            key={les.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '0.65rem 0.85rem',
                              background: '#F8FAFC',
                              borderRadius: '8px',
                              border: '1px solid #E2E8F0',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B' }}>
                                #{lesIdx + 1}
                              </span>
                              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B' }}>
                                {les.title}
                              </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{les.duration}</span>
                              <Link
                                href={`/campus?clase=${les.id}`}
                                style={{
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  color: '#7C3AED',
                                  textDecoration: 'none',
                                  background: '#FAF5FF',
                                  padding: '0.25rem 0.6rem',
                                  borderRadius: '6px',
                                  border: '1px solid #E9D5FF',
                                }}
                              >
                                Editar en Aula
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: PRECIOS */}
        {/* ========================================================================= */}
        {activeTab === 'precios' && (
          <section>
            <form onSubmit={handleSavePricing} className={styles.pricingCard}>
              <div>
                <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.25rem', fontWeight: 800, color: '#1E1B4B' }}>
                  Gestión de Precios & Checkout
                </h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748B' }}>
                  Los cambios guardados acá se aplican inmediatamente al checkout integrado de Mercado Pago.
                </p>
              </div>

              <div className={styles.priceFieldGroup}>
                <label className={styles.priceLabel}>
                  EBL - Precio Especial Promo Lanzamiento (ARS)
                </label>
                <div className={styles.priceInputGroup}>
                  <span className={styles.priceCurrency}>$</span>
                  <input
                    type="number"
                    min="1000"
                    step="100"
                    value={eblPromoPrice}
                    onChange={(e) => setEblPromoPrice(Number(e.target.value))}
                    className={styles.priceInput}
                  />
                  <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>Activo en Checkout</span>
                </div>
              </div>

              <div className={styles.priceFieldGroup}>
                <label className={styles.priceLabel}>
                  EBL - Precio Regular de Referencia Tachado (ARS)
                </label>
                <div className={styles.priceInputGroup}>
                  <span className={styles.priceCurrency}>$</span>
                  <input
                    type="number"
                    min="1000"
                    step="100"
                    value={eblRegularPrice}
                    onChange={(e) => setEblRegularPrice(Number(e.target.value))}
                    className={styles.priceInput}
                  />
                  <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 650 }}>Visible tachado</span>
                </div>
              </div>

              {/* Cursos individuales (proximamente) */}
              <div className={styles.priceFieldGroup}>
                <label className={styles.priceLabel}>Cursos Individuales (Referencia para cuando haya lanzamientos)</label>
                <div className={styles.priceInputGroup}>
                  <span className={styles.priceCurrency}>$</span>
                  <input
                    type="number"
                    min="1000"
                    step="100"
                    value={coursePrice}
                    onChange={(e) => setCoursePrice(Number(e.target.value))}
                    className={styles.priceInput}
                  />
                  <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 650 }}>por curso</span>
                </div>
              </div>

              {pricingSavedSuccess && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', color: '#065F46', fontSize: '0.85rem', fontWeight: 700 }}>
                  <CheckCircle2 size={16} />
                  <span>¡Precios actualizados con éxito y sincronizados con Mercado Pago!</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSavingPricing}
                className={styles.savePriceBtn}
              >
                <Save size={16} />
                <span>{isSavingPricing ? 'Guardando...' : 'Guardar Precios de la Plataforma'}</span>
              </button>
            </form>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: TEST VOCACIONAL */}
        {/* ========================================================================= */}
        {activeTab === 'test-vocacional' && (
          <section>
            {/* Overview Metrics */}
            <div className={styles.statsOverviewGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricIconWrap} style={{ background: '#FDF2F8', color: '#DB2777' }}>
                  <Compass size={22} />
                </div>
                <div className={styles.metricCol}>
                  <span className={styles.metricValue}>{vocationalStats?.totalTests || 0}</span>
                  <span className={styles.metricLabel}>Tests Completados</span>
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricIconWrap} style={{ background: '#EFF6FF', color: '#2563EB' }}>
                  <Users size={22} />
                </div>
                <div className={styles.metricCol}>
                  <span className={styles.metricValue}>100%</span>
                  <span className={styles.metricLabel}>Tasa de Finalización</span>
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricIconWrap} style={{ background: '#ECFDF5', color: '#059669' }}>
                  <CheckCircle size={22} />
                </div>
                <div className={styles.metricCol}>
                  <span className={styles.metricValue}>4</span>
                  <span className={styles.metricLabel}>Arquetipos Vocacionales</span>
                </div>
              </div>
            </div>

            {/* Archetype Distribution Bars */}
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1E1B4B', margin: '2rem 0 0.75rem' }}>
              Distribución de Arquetipos Profesionales
            </h3>
            <div className={styles.archetypeBarsGrid}>
              <div className={styles.archetypeBarCard}>
                <div className={styles.archetypeBarHeader}>
                  <span className={styles.archetypeName}>Estratégico</span>
                  <span className={styles.archetypeCount}>{vocationalStats?.archetypes?.estrategico || 0}</span>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barProgress}
                    style={{
                      width: `${
                        vocationalStats?.totalTests > 0
                          ? Math.round(
                              ((vocationalStats?.archetypes?.estrategico || 0) / vocationalStats.totalTests) * 100
                            )
                          : 25
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className={styles.archetypeBarCard}>
                <div className={styles.archetypeBarHeader}>
                  <span className={styles.archetypeName}>Analítico</span>
                  <span className={styles.archetypeCount}>{vocationalStats?.archetypes?.analitico || 0}</span>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barProgress}
                    style={{
                      width: `${
                        vocationalStats?.totalTests > 0
                          ? Math.round(
                              ((vocationalStats?.archetypes?.analitico || 0) / vocationalStats.totalTests) * 100
                            )
                          : 25
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className={styles.archetypeBarCard}>
                <div className={styles.archetypeBarHeader}>
                  <span className={styles.archetypeName}>Personas / Vínculos</span>
                  <span className={styles.archetypeCount}>{vocationalStats?.archetypes?.personas || 0}</span>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barProgress}
                    style={{
                      width: `${
                        vocationalStats?.totalTests > 0
                          ? Math.round(
                              ((vocationalStats?.archetypes?.personas || 0) / vocationalStats.totalTests) * 100
                            )
                          : 25
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className={styles.archetypeBarCard}>
                <div className={styles.archetypeBarHeader}>
                  <span className={styles.archetypeName}>Creativo</span>
                  <span className={styles.archetypeCount}>{vocationalStats?.archetypes?.creativo || 0}</span>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barProgress}
                    style={{
                      width: `${
                        vocationalStats?.totalTests > 0
                          ? Math.round(
                              ((vocationalStats?.archetypes?.creativo || 0) / vocationalStats.totalTests) * 100
                            )
                          : 25
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Recent Submissions */}
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1E1B4B', margin: '2rem 0 0.75rem' }}>
              Últimos Diagnósticos Registrados
            </h3>
            <div className={styles.dataTableWrapper}>
              <table className={styles.adminTable}>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Alumno / Identificador</th>
                    <th>Arquetipo Predominante</th>
                    <th>Rol Recomendado</th>
                  </tr>
                </thead>
                <tbody>
                  {(!vocationalStats?.submissions || vocationalStats.submissions.length === 0) ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: '#94A3B8' }}>
                        Aún no se registraron envíos del test vocacional.
                      </td>
                    </tr>
                  ) : (
                    vocationalStats.submissions.map((sub: any) => (
                      <tr key={sub.id}>
                        <td style={{ fontSize: '0.8rem', color: '#64748B' }}>
                          {new Date(sub.createdAt).toLocaleDateString('es-AR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td style={{ fontWeight: 650, color: '#1E293B' }}>{sub.userEmail}</td>
                        <td>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#7C3AED', background: '#F5F3FF', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                            {sub.archetype.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.85rem', color: '#334155' }}>{sub.suggestedRole}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
