'use server';

import fs from 'fs';
import path from 'path';
import { db, MembershipTier, Role } from '@repo/db';
import { campusPrograms } from '@/data/campus';
import bunnyMapping from '@/data/bunnyVideos.json';

import defaultUsers from '@/data/store/users.json';
import defaultComments from '@/data/store/comments.json';
import defaultPricing from '@/data/store/pricing.json';
import defaultVocational from '@/data/store/vocationalTests.json';
import defaultVideoViews from '@/data/store/videoViews.json';

const SUPERADMIN_EMAILS = [
  'santisose01@gmail.com',
  'licenciadaflormartinez@gmail.com',
  'lucianamartinez0696@gmail.com',
];

const BANNED_EMAILS = [
  'santiagocastillo98@hotmail.com',
];

const BUNNY_LIB_ID = '815825';
const BUNNY_API_KEY = 'c38f0c59-0f49-4066-af5d440d17ad-1943-4d4e';

// In-Memory store for Vercel Serverless environment resilience
const memoryStore: {
  users: AdminUserRecord[];
  comments: StoredCommentItem[];
  pricing: Record<string, PricingPlan>;
  vocationalTests: any[];
  videoViews: Record<string, number>;
} = {
  users: (defaultUsers as any[]) || [],
  comments: (defaultComments as any[]) || [],
  pricing: (defaultPricing as any) || {},
  vocationalTests: (defaultVocational as any[]) || [],
  videoViews: (defaultVideoViews as any) || {},
};

function getStoreFilePath(filename: string): string {
  const tmpPath = path.join('/tmp', 'fm_store', filename);
  if (fs.existsSync(tmpPath)) return tmpPath;

  const monorepoPath = path.join(process.cwd(), 'apps', 'academy', 'src', 'data', 'store', filename);
  if (fs.existsSync(monorepoPath)) return monorepoPath;

  const localPath = path.join(process.cwd(), 'src', 'data', 'store', filename);
  if (fs.existsSync(localPath)) return localPath;

  const parentPath = path.join(process.cwd(), '..', 'apps', 'academy', 'src', 'data', 'store', filename);
  if (fs.existsSync(parentPath)) return parentPath;

  return tmpPath;
}

function readStore<T>(key: 'users' | 'comments' | 'pricing' | 'vocationalTests' | 'videoViews', filename: string, fallback: T): T {
  try {
    const filePath = getStoreFilePath(filename);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(content) as T;
      (memoryStore as any)[key] = parsed;
      return parsed;
    }
  } catch (err) {
    // ignore
  }

  if (memoryStore[key] !== undefined && memoryStore[key] !== null) {
    return memoryStore[key] as unknown as T;
  }
  return fallback;
}

function writeStore<T>(key: 'users' | 'comments' | 'pricing' | 'vocationalTests' | 'videoViews', filename: string, data: T): void {
  (memoryStore as any)[key] = data;

  const candidatePaths = [
    path.join(process.cwd(), 'apps', 'academy', 'src', 'data', 'store', filename),
    path.join(process.cwd(), 'src', 'data', 'store', filename),
    path.join(process.cwd(), '..', 'apps', 'academy', 'src', 'data', 'store', filename),
    path.join('/tmp', 'fm_store', filename),
  ];

  for (const p of candidatePaths) {
    try {
      fs.mkdirSync(path.dirname(p), { recursive: true });
      fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8');
      break;
    } catch {
      // try next candidate
    }
  }
}

// ============================================================================
// 1. GESTIÓN DE CUENTAS / USUARIOS
// ============================================================================

export interface AdminUserRecord {
  id: string;
  email: string;
  name: string;
  role: 'superadmin' | 'student' | 'client' | 'member';
  membershipTier: 'VIP' | 'TRIAL' | 'FREE';
  status: 'active' | 'banned';
  avatarUrl?: string | null;
  createdAt: string;
  lastLoginAt: string;
  notes?: string;
  adminOverride?: boolean;
  viewedLessonsCount?: number;
  completedLessonsCount?: number;
  totalProgramLessons?: number;
  viewedLessonIds?: string[];
  completedLessonIds?: string[];
  lastLessonActivityAt?: string | null;
}

const TRIAL_HEADLINE_MARKER = 'TRIAL_MOD_4';
const ADMIN_OVERRIDE_PREFIX = 'ADMIN_OVERRIDE:';

function parseAdminTierOverride(headline?: string | null): 'VIP' | 'TRIAL' | 'FREE' | null {
  const h = String(headline || '');
  if (h.includes(`${ADMIN_OVERRIDE_PREFIX}TRIAL`)) return 'TRIAL';
  if (h.includes(`${ADMIN_OVERRIDE_PREFIX}FREE`)) return 'FREE';
  if (h.includes(`${ADMIN_OVERRIDE_PREFIX}VIP`)) return 'VIP';
  if (h.includes(TRIAL_HEADLINE_MARKER)) return 'TRIAL';
  return null;
}

function getEnvTrialEmails(): string[] {
  const raw = process.env.TRIAL_ACCESS_EMAILS || process.env.NEXT_PUBLIC_TRIAL_ACCESS_EMAILS || '';
  return raw
    .split(/[,;\n\s]+/)
    .map((e) => e.toLowerCase().trim())
    .filter((e) => e.includes('@'));
}

const REAL_ADMIN_USERS: AdminUserRecord[] = [
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

function withAdminDbTimeout<T>(promise: Promise<T>, timeoutMs = 5000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('DB Timeout')), timeoutMs)
    ),
  ]);
}

async function getApprovedMpBuyerEmails(): Promise<Map<string, { name?: string; date?: string }>> {
  const map = new Map<string, { name?: string; date?: string }>();
  try {
    const token = (
      process.env.MP_ACCESS_TOKEN ||
      process.env.MERCADOPAGO_ACCESS_TOKEN ||
      'APP_USR-4644281928495780-101119-14763e1cc4acdf248726e134b1da1279-151307739'
    ).trim();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(
      'https://api.mercadopago.com/v1/payments/search?status=approved&sort=date_created&criteria=desc&limit=100',
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
        signal: controller.signal,
      }
    );
    clearTimeout(timer);
    if (!res.ok) return map;
    const json = await res.json();
    const results = Array.isArray(json?.results) ? json.results : [];
    for (const p of results) {
      if (p?.status !== 'approved') continue;
      const extRef = String(p?.external_reference || '').toLowerCase();
      const desc = String(p?.description || '').toLowerCase();
      const items = Array.isArray(p?.additional_info?.items) ? p.additional_info.items : [];
      const isEbl =
        extRef.includes('ebl-') ||
        desc.includes('experiencia') ||
        items.some((it: any) => String(it?.id || '').toLowerCase() === 'ebl-anual');
      if (!isEbl) continue;

      const metaEmail = String(p?.metadata?.user_email || '').toLowerCase().trim();
      const refEmail = extRef.includes('|') ? extRef.split('|')[0]!.trim() : '';
      const payerEmail = String(p?.payer?.email || '').toLowerCase().trim();
      const buyerEmail = metaEmail || refEmail || payerEmail;
      if (buyerEmail && buyerEmail.includes('@') && !map.has(buyerEmail)) {
        const fullName = [p?.payer?.first_name, p?.payer?.last_name].filter(Boolean).join(' ').trim();
        map.set(buyerEmail, {
          name: fullName || undefined,
          date: p?.date_approved || p?.date_created || new Date().toISOString(),
        });
      }
    }
  } catch {
    // ignore MP errors
  }
  return map;
}

export async function getAdminUsersAction() {
  const byEmail = new Map<string, AdminUserRecord>();

  // 1. Base Superadmin team
  for (const adminU of REAL_ADMIN_USERS) {
    byEmail.set(adminU.email.toLowerCase(), { ...adminU });
  }

  // 2. Fetch real users, approved MP buyers, lesson completions & lesson views in parallel
  const [dbUsers, mpBuyers, dbCompletions, dbViews] = await Promise.all([
    withAdminDbTimeout(
      db.user.findMany({ orderBy: { createdAt: 'desc' } })
    ).catch((err) => {
      console.warn('DB read fallback in getAdminUsersAction:', err);
      return [] as any[];
    }),
    getApprovedMpBuyerEmails(),
    withAdminDbTimeout(
      db.userLessonCompletion.findMany({ orderBy: { completedAt: 'desc' } })
    ).catch(() => [] as any[]),
    withAdminDbTimeout(
      db.userLessonView.findMany({ orderBy: { lastViewedAt: 'desc' } })
    ).catch(() => [] as any[]),
  ]);

  // Build per-user lesson progress maps (completed & viewed)
  const eblProgram = campusPrograms[0];
  const publishedEblLessons = eblProgram
    ? eblProgram.modules.filter((m) => !m.isExtra || m.number <= 8).flatMap((m) => m.lessons)
    : [];
  const totalProgramLessons = publishedEblLessons.length || 35;

  const completedByEmail = new Map<string, Set<string>>();
  const viewedByEmail = new Map<string, Set<string>>();
  const lastActivityByEmail = new Map<string, number>();

  const recordActivityTs = (emailKey: string, dt: Date | string | null | undefined) => {
    if (!dt) return;
    const ms = new Date(dt).getTime();
    if (!isNaN(ms)) {
      const prev = lastActivityByEmail.get(emailKey) || 0;
      if (ms > prev) lastActivityByEmail.set(emailKey, ms);
    }
  };

  for (const c of dbCompletions) {
    const emailKey = String(c?.userEmail || '').toLowerCase().trim();
    const lid = String(c?.lessonId || '').trim();
    if (!emailKey || !lid) continue;
    if (!completedByEmail.has(emailKey)) completedByEmail.set(emailKey, new Set());
    completedByEmail.get(emailKey)!.add(lid);
    // Any completed lesson also counts as viewed
    if (!viewedByEmail.has(emailKey)) viewedByEmail.set(emailKey, new Set());
    viewedByEmail.get(emailKey)!.add(lid);
    recordActivityTs(emailKey, c?.completedAt);
  }

  for (const v of dbViews) {
    const emailKey = String(v?.userEmail || '').toLowerCase().trim();
    const lid = String(v?.lessonId || '').trim();
    if (!emailKey || !lid) continue;
    if (!viewedByEmail.has(emailKey)) viewedByEmail.set(emailKey, new Set());
    viewedByEmail.get(emailKey)!.add(lid);
    recordActivityTs(emailKey, v?.lastViewedAt || v?.firstViewedAt);
  }

  const envTrialSet = new Set(getEnvTrialEmails());

  // Merge DB users
  for (const u of dbUsers) {
    const emailLower = (u?.email || '').toLowerCase().trim();
    if (!emailLower || !emailLower.includes('@') || emailLower.startsWith('guest@')) continue;
    const isSuper = SUPERADMIN_EMAILS.includes(emailLower) || String(u.role || '').toUpperCase() === 'ADMIN';
    const isBanned = BANNED_EMAILS.includes(emailLower);
    const hasPaidMp = mpBuyers.has(emailLower);
    const dbTier = String(u.membershipTier || '').toUpperCase() === 'VIP' ? 'VIP' : 'FREE';
    const overrideTier = parseAdminTierOverride(u.headline);
    const isEnvTrial = envTrialSet.has(emailLower);
    const existing = byEmail.get(emailLower);

    const finalTier: 'VIP' | 'TRIAL' | 'FREE' = overrideTier
      ? overrideTier
      : isSuper || hasPaidMp || dbTier === 'VIP'
      ? 'VIP'
      : isEnvTrial
      ? 'TRIAL'
      : 'FREE';

    byEmail.set(emailLower, {
      id: u.id || existing?.id || 'usr_' + emailLower.replace(/[^a-z0-9]/g, '_'),
      email: emailLower,
      name: u.name || existing?.name || emailLower.split('@')[0] || 'Usuario',
      role: isSuper ? 'superadmin' : 'student',
      membershipTier: finalTier,
      status: isBanned ? 'banned' : (existing?.status || 'active'),
      avatarUrl: u.avatarUrl || existing?.avatarUrl || null,
      createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : (existing?.createdAt || new Date().toISOString()),
      lastLoginAt: u.updatedAt ? new Date(u.updatedAt).toISOString() : (existing?.lastLoginAt || new Date().toISOString()),
      adminOverride: Boolean(overrideTier),
      notes: finalTier === 'TRIAL'
        ? 'Acceso Prueba (Módulos 1 al 4)'
        : isSuper
        ? (existing?.notes || 'Superadministrador')
        : hasPaidMp && finalTier === 'VIP'
        ? 'Pago verificado en Mercado Pago'
        : (existing?.notes || 'Registro Google / Campus'),
    });
  }

  // Merge env-configured trial emails if not yet in list (respect adminOverride!)
  for (const trialEmail of envTrialSet) {
    const existing = byEmail.get(trialEmail);
    if (existing) {
      if (!existing.adminOverride && existing.membershipTier === 'FREE') {
        existing.membershipTier = 'TRIAL';
        existing.notes = 'Acceso Prueba (Módulos 1 al 4)';
      }
    } else {
      const now = new Date().toISOString();
      byEmail.set(trialEmail, {
        id: 'usr_trial_' + trialEmail.replace(/[^a-z0-9]/g, '_'),
        email: trialEmail,
        name: trialEmail.split('@')[0] || 'Alumno Prueba',
        role: 'student',
        membershipTier: 'TRIAL',
        status: 'active',
        avatarUrl: null,
        createdAt: now,
        lastLoginAt: now,
        notes: 'Acceso Prueba (Módulos 1 al 4)',
      });
    }
  }

  // 3. Merge any Mercado Pago approved buyers not yet overridden by Admin
  for (const [buyerEmail, info] of mpBuyers.entries()) {
    const existing = byEmail.get(buyerEmail);
    if (existing) {
      if (!existing.adminOverride) {
        existing.membershipTier = 'VIP';
        if (!SUPERADMIN_EMAILS.includes(buyerEmail)) {
          existing.notes = 'Pago verificado en Mercado Pago';
        }
      }
    } else {
      const isSuper = SUPERADMIN_EMAILS.includes(buyerEmail);
      byEmail.set(buyerEmail, {
        id: 'usr_mp_' + buyerEmail.replace(/[^a-z0-9]/g, '_'),
        email: buyerEmail,
        name: info.name || buyerEmail.split('@')[0] || 'Alumno VIP',
        role: isSuper ? 'superadmin' : 'student',
        membershipTier: 'VIP',
        status: BANNED_EMAILS.includes(buyerEmail) ? 'banned' : 'active',
        avatarUrl: null,
        createdAt: info.date || new Date().toISOString(),
        lastLoginAt: info.date || new Date().toISOString(),
        notes: 'Pago verificado en Mercado Pago',
      });
    }
  }

  // 4. Merge users and explicit Admin edits from local/tmp store (OVERRIDING defaults when edited!)
  try {
    const raw = readStore<any>('users', 'users.json', null);
    const fromStore: AdminUserRecord[] = Array.isArray(raw)
      ? raw
      : raw && Array.isArray(raw.default)
      ? raw.default
      : [];

    for (const u of fromStore) {
      const emailLower = (u?.email || '').toLowerCase().trim();
      if (!emailLower || !emailLower.includes('@')) continue;
      const existing = byEmail.get(emailLower);
      if (!existing) {
        byEmail.set(emailLower, u);
      } else if (u.adminOverride) {
        // Explicit Admin panel edit ALWAYS wins over static defaults & old MP payments
        byEmail.set(emailLower, {
          ...existing,
          role: u.role || existing.role,
          membershipTier: u.membershipTier || existing.membershipTier,
          status: u.status || existing.status,
          notes: u.notes || existing.notes,
          adminOverride: true,
        });
      }
    }
  } catch {
    // ignore
  }

  // Attach per-user viewed & completed lesson counts to every user record
  for (const [emailKey, rec] of byEmail.entries()) {
    const completedSet = completedByEmail.get(emailKey) || new Set<string>();
    const viewedSet = viewedByEmail.get(emailKey) || new Set<string>();
    const lastActMs = lastActivityByEmail.get(emailKey) || 0;
    const prevLoginMs = Date.parse(rec.lastLoginAt || rec.createdAt || '') || 0;

    rec.completedLessonIds = Array.from(completedSet);
    rec.viewedLessonIds = Array.from(viewedSet);
    rec.completedLessonsCount = completedSet.size;
    rec.viewedLessonsCount = viewedSet.size;
    rec.totalProgramLessons = totalProgramLessons;
    rec.lastLessonActivityAt = lastActMs > 0 ? new Date(lastActMs).toISOString() : null;
    if (lastActMs > prevLoginMs) {
      rec.lastLoginAt = new Date(lastActMs).toISOString();
    }
  }

  // Sort: newest registered non-admin students first, or superadmins & recent logins clearly visible
  const users = Array.from(byEmail.values()).sort((a, b) => {
    const tA = Date.parse(a.lastLoginAt || a.createdAt || '') || 0;
    const tB = Date.parse(b.lastLoginAt || b.createdAt || '') || 0;
    return tB - tA;
  });

  const total = users.length;
  const activeCount = users.filter((u) => u.status === 'active').length;
  const vipCount = users.filter((u) => u.membershipTier === 'VIP').length;
  const freeCount = users.filter((u) => u.membershipTier === 'FREE').length;
  const superadminCount = users.filter(
    (u) => u.role === 'superadmin' || SUPERADMIN_EMAILS.includes((u.email || '').toLowerCase())
  ).length;
  const bannedCount = users.filter(
    (u) => u.status === 'banned' || BANNED_EMAILS.includes((u.email || '').toLowerCase())
  ).length;

  return {
    success: true,
    users,
    stats: {
      total,
      activeCount,
      vipCount,
      freeCount,
      superadminCount,
      bannedCount,
    },
  };
}

export async function registerOrUpdateUserInStore(
  userOrEmail: string | { email: string; name?: string; role?: string; membershipTier?: string; avatarUrl?: string; lastLoginAt?: string },
  nameArg?: string,
  avatarUrlArg?: string
) {
  let email = '';
  let name = nameArg;
  let avatarUrl = avatarUrlArg;
  let roleOverride: 'superadmin' | 'student' | undefined;
  let membershipTierOverride: 'VIP' | 'TRIAL' | 'FREE' | undefined;

  if (typeof userOrEmail === 'object' && userOrEmail !== null) {
    email = userOrEmail.email || '';
    name = userOrEmail.name || name;
    avatarUrl = userOrEmail.avatarUrl || avatarUrl;
    if (userOrEmail.role === 'superadmin' || userOrEmail.role === 'student') {
      roleOverride = userOrEmail.role;
    }
    if (userOrEmail.membershipTier === 'VIP' || userOrEmail.membershipTier === 'TRIAL' || userOrEmail.membershipTier === 'FREE') {
      membershipTierOverride = userOrEmail.membershipTier;
    }
  } else if (typeof userOrEmail === 'string') {
    email = userOrEmail;
  }

  const cleanEmail = email.toLowerCase().trim();
  if (!cleanEmail) return;

  let users = readStore<AdminUserRecord[]>('users', 'users.json', memoryStore.users);
  if (!users || !Array.isArray(users) || users.length === 0) users = [...(defaultUsers as any[])];

  const isSuper = SUPERADMIN_EMAILS.includes(cleanEmail);
  const isBanned = BANNED_EMAILS.includes(cleanEmail);

  const existingIdx = users.findIndex((u) => (u.email || '').toLowerCase() === cleanEmail);
  const now = new Date().toISOString();

  if (existingIdx >= 0) {
    users[existingIdx] = {
      ...users[existingIdx]!,
      name: name || users[existingIdx]!.name,
      avatarUrl: avatarUrl !== undefined ? avatarUrl : users[existingIdx]!.avatarUrl,
      lastLoginAt: now,
      role: isSuper ? 'superadmin' : roleOverride || users[existingIdx]!.role,
      membershipTier: membershipTierOverride || users[existingIdx]!.membershipTier || 'VIP',
      status: isBanned ? 'banned' : users[existingIdx]!.status,
    };
  } else {
    users.unshift({
      id: 'usr_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      email: cleanEmail,
      name: name || cleanEmail.split('@')[0] || 'Usuario',
      role: isSuper ? 'superadmin' : roleOverride || 'student',
      membershipTier: isSuper ? 'VIP' : (membershipTierOverride || 'FREE'),
      status: isBanned ? 'banned' : 'active',
      avatarUrl: avatarUrl || null,
      createdAt: now,
      lastLoginAt: now,
      notes: isSuper ? 'Superadministrador verificado' : 'Registro en plataforma',
    });
  }

  writeStore('users', 'users.json', users);
}

export async function updateUserRoleAction(
  userId: string,
  newRole: 'superadmin' | 'student' | 'client',
  userEmail?: string
) {
  const cleanEmail = (userEmail || '').toLowerCase().trim();
  try {
    if (cleanEmail && cleanEmail.includes('@')) {
      await withAdminDbTimeout(
        db.user.update({
          where: { email: cleanEmail },
          data: { role: newRole === 'superadmin' ? Role.ADMIN : Role.STUDENT },
        })
      );
    } else {
      await withAdminDbTimeout(
        db.user.update({
          where: { id: userId },
          data: { role: newRole === 'superadmin' ? Role.ADMIN : Role.STUDENT },
        })
      );
    }
  } catch {}

  const users = [...(readStore<AdminUserRecord[]>('users', 'users.json', memoryStore.users) || [])];
  const idx = users.findIndex(
    (u) => u.id === userId || (cleanEmail && (u.email || '').toLowerCase().trim() === cleanEmail)
  );
  if (idx >= 0) {
    users[idx] = { ...users[idx]!, role: newRole, adminOverride: true };
    writeStore('users', 'users.json', users);
    return { success: true, user: users[idx] };
  } else if (cleanEmail && cleanEmail.includes('@')) {
    const now = new Date().toISOString();
    const created: AdminUserRecord = {
      id: userId || 'usr_' + Date.now().toString(36),
      email: cleanEmail,
      name: cleanEmail.split('@')[0] || 'Usuario',
      role: newRole,
      membershipTier: SUPERADMIN_EMAILS.includes(cleanEmail) ? 'VIP' : 'FREE',
      status: 'active',
      avatarUrl: null,
      createdAt: now,
      lastLoginAt: now,
      adminOverride: true,
    };
    writeStore('users', 'users.json', [created, ...users]);
    return { success: true, user: created };
  }
  return { success: true };
}

export async function updateUserMembershipAction(
  userId: string,
  newTier: 'VIP' | 'TRIAL' | 'FREE',
  userEmail?: string
) {
  const cleanEmail = (userEmail || '').toLowerCase().trim();
  const dbMembership = newTier === 'VIP' ? MembershipTier.VIP : MembershipTier.FREE;
  const dbHeadline = `${ADMIN_OVERRIDE_PREFIX}${newTier}`;

  try {
    if (cleanEmail && cleanEmail.includes('@')) {
      await withAdminDbTimeout(
        db.user.upsert({
          where: { email: cleanEmail },
          update: {
            membershipTier: dbMembership,
            headline: dbHeadline,
          },
          create: {
            email: cleanEmail,
            name: cleanEmail.split('@')[0] || 'Alumno',
            role: SUPERADMIN_EMAILS.includes(cleanEmail) ? Role.ADMIN : Role.STUDENT,
            membershipTier: dbMembership,
            headline: dbHeadline,
          },
        })
      );
    } else {
      await withAdminDbTimeout(
        db.user.update({
          where: { id: userId },
          data: {
            membershipTier: dbMembership,
            headline: dbHeadline,
          },
        })
      );
    }
  } catch {}

  const users = [...(readStore<AdminUserRecord[]>('users', 'users.json', memoryStore.users) || [])];
  const idx = users.findIndex(
    (u) => u.id === userId || (cleanEmail && (u.email || '').toLowerCase().trim() === cleanEmail)
  );
  if (idx >= 0) {
    users[idx] = {
      ...users[idx]!,
      membershipTier: newTier,
      adminOverride: true,
      notes:
        newTier === 'TRIAL'
          ? 'Acceso Prueba (Módulos 1 al 4)'
          : newTier === 'VIP'
          ? 'Membresía VIP habilitada'
          : 'Cuenta Gratuita',
    };
    writeStore('users', 'users.json', users);
    return { success: true, user: users[idx] };
  } else if (cleanEmail && cleanEmail.includes('@')) {
    const now = new Date().toISOString();
    const created: AdminUserRecord = {
      id: userId || 'usr_' + Date.now().toString(36),
      email: cleanEmail,
      name: cleanEmail.split('@')[0] || 'Usuario',
      role: SUPERADMIN_EMAILS.includes(cleanEmail) ? 'superadmin' : 'student',
      membershipTier: newTier,
      status: 'active',
      avatarUrl: null,
      createdAt: now,
      lastLoginAt: now,
      adminOverride: true,
      notes: newTier === 'TRIAL' ? 'Acceso Prueba (Módulos 1 al 4)' : 'Actualizado desde Admin',
    };
    writeStore('users', 'users.json', [created, ...users]);
    return { success: true, user: created };
  }
  return { success: true };
}

export async function toggleUserBanAction(userId: string, userEmail?: string) {
  const cleanEmail = (userEmail || '').toLowerCase().trim();
  const users = [...(readStore<AdminUserRecord[]>('users', 'users.json', memoryStore.users) || [])];
  const idx = users.findIndex(
    (u) => u.id === userId || (cleanEmail && (u.email || '').toLowerCase().trim() === cleanEmail)
  );
  if (idx >= 0) {
    const currentStatus = users[idx]!.status;
    users[idx] = {
      ...users[idx]!,
      status: currentStatus === 'banned' ? 'active' : 'banned',
      adminOverride: true,
    };
    writeStore('users', 'users.json', users);
    return { success: true, user: users[idx] };
  } else if (cleanEmail && cleanEmail.includes('@')) {
    const now = new Date().toISOString();
    const created: AdminUserRecord = {
      id: userId || 'usr_' + Date.now().toString(36),
      email: cleanEmail,
      name: cleanEmail.split('@')[0] || 'Usuario',
      role: SUPERADMIN_EMAILS.includes(cleanEmail) ? 'superadmin' : 'student',
      membershipTier: 'FREE',
      status: 'banned',
      avatarUrl: null,
      createdAt: now,
      lastLoginAt: now,
      adminOverride: true,
    };
    writeStore('users', 'users.json', [created, ...users]);
    return { success: true, user: created };
  }
  return { success: false, error: 'Usuario no encontrado' };
}

export async function deleteUserAction(userId: string) {
  try {
    await withAdminDbTimeout(db.user.delete({ where: { id: userId } }));
  } catch {}

  const users = readStore<AdminUserRecord[]>('users', 'users.json', memoryStore.users);
  const filtered = (Array.isArray(users) ? users : []).filter((u) => u.id !== userId);
  writeStore('users', 'users.json', filtered);
  return { success: true };
}

export async function createManualUserAction(data: {
  email: string;
  name?: string;
  role?: 'superadmin' | 'student' | 'client';
  membershipTier?: 'VIP' | 'TRIAL' | 'FREE';
  notes?: string;
}) {
  const cleanEmail = data.email.toLowerCase().trim();
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, error: 'Email inválido' };
  }

  const isSuper = SUPERADMIN_EMAILS.includes(cleanEmail);
  const resolvedTier: 'VIP' | 'TRIAL' | 'FREE' = isSuper ? 'VIP' : (data.membershipTier || 'FREE');
  const resolvedName = (data.name || '').trim() || cleanEmail.split('@')[0] || 'Usuario';
  const dbHeadline = `${ADMIN_OVERRIDE_PREFIX}${resolvedTier}`;
  let dbUserId: string | null = null;

  try {
    const dbUser = await withAdminDbTimeout(
      db.user.upsert({
        where: { email: cleanEmail },
        update: {
          name: resolvedName,
          role: isSuper || data.role === 'superadmin' ? Role.ADMIN : Role.STUDENT,
          membershipTier: resolvedTier === 'VIP' ? MembershipTier.VIP : MembershipTier.FREE,
          headline: dbHeadline,
        },
        create: {
          email: cleanEmail,
          name: resolvedName,
          role: isSuper || data.role === 'superadmin' ? Role.ADMIN : Role.STUDENT,
          membershipTier: resolvedTier === 'VIP' ? MembershipTier.VIP : MembershipTier.FREE,
          headline: dbHeadline,
        },
      })
    );
    dbUserId = dbUser.id;
  } catch {}

  const users = [...(readStore<AdminUserRecord[]>('users', 'users.json', memoryStore.users) || [])];
  const now = new Date().toISOString();
  const newUser: AdminUserRecord = {
    id: dbUserId || 'usr_' + Date.now().toString(36),
    email: cleanEmail,
    name: resolvedName,
    role: data.role || (isSuper ? 'superadmin' : 'student'),
    membershipTier: resolvedTier,
    status: 'active',
    avatarUrl: null,
    createdAt: now,
    lastLoginAt: now,
    adminOverride: true,
    notes: data.notes || (resolvedTier === 'TRIAL' ? 'Acceso Prueba (Módulos 1 al 4)' : 'Alta manual por Superadmin'),
  };

  const filtered = users.filter((u) => (u.email || '').toLowerCase() !== cleanEmail);
  writeStore('users', 'users.json', [newUser, ...filtered]);
  return { success: true, user: newUser };
}

// ============================================================================
// 2. MÉTRICAS DE VIDEOS & AUDITORÍA STREAMING
// ============================================================================

export interface ClassVideoMetric {
  moduleDisplay: string; // "1", "2", "3", "4", "5", "6", "7", "Extra 1", "Extra 2", "Extra 3"
  classNumber: number; // 1, 2, 3...
  lessonTitle: string; // nombre de la clase
  courseName: string; // "EBL"
  durationFormatted: string; // "2:46 min"
  views: number; // visualizaciones reales de Bunny CDN
  lessonId: string;
}

export async function getAdminVideoMetricsAction() {
  const internalViews = readStore<Record<string, number>>('videoViews', 'videoViews.json', memoryStore.videoViews);

  // Fetch real Bunny Stream statistics
  let bunnyItems: any[] = [];
  try {
    const url = `https://video.bunnycdn.com/library/${BUNNY_LIB_ID}/videos?page=1&itemsPerPage=100`;
    const resp = await fetch(url, {
      headers: {
        AccessKey: BUNNY_API_KEY,
        Accept: 'application/json',
      },
      next: { revalidate: 60 },
    });
    if (resp.ok) {
      const bData = await resp.json();
      bunnyItems = bData.items || [];
    }
  } catch (e) {
    console.warn('Bunny API stats fetch timeout/offline:', e);
  }

  const bunnyMapByFile: Record<string, any> = {};
  for (const item of bunnyItems) {
    if (item.title) {
      bunnyMapByFile[item.title] = item;
    }
  }

  const typedBunnyMapping = bunnyMapping as Record<string, { guid: string; embed_url: string; id: string; ts_key: string }>;
  const metrics: ClassVideoMetric[] = [];

  const eblProgram = campusPrograms[0]!;

  for (const mod of eblProgram.modules) {
    let moduleDisplay = String(mod.number);
    if (mod.isExtra) {
      if (mod.extraTag) {
        moduleDisplay = mod.extraTag.replace('EXTRA 0', 'Extra ').replace('EXTRA ', 'Extra ');
      } else {
        moduleDisplay = `Extra ${mod.number}`;
      }
    }

    for (const lesson of mod.lessons) {
      // Find matching video in bunnyMapping
      let matchedFile = '';
      for (const [file, info] of Object.entries(typedBunnyMapping)) {
        if (info.id === lesson.id || (lesson.videoUrl && lesson.videoUrl.includes(info.guid))) {
          matchedFile = file;
          break;
        }
      }

      const bunnyVideo = matchedFile ? bunnyMapByFile[matchedFile] : null;
      const durationSeconds = bunnyVideo?.length || parseDurationToSeconds(lesson.duration || '3:00 min');
      const bunnyViews = bunnyVideo?.views || 0;
      const localViews = internalViews[lesson.id] || internalViews[matchedFile] || 0;
      const totalViews = Math.max(bunnyViews, localViews);

      metrics.push({
        moduleDisplay,
        classNumber: lesson.lessonNumber,
        lessonTitle: lesson.title,
        courseName: 'EBL',
        durationFormatted: lesson.duration || formatSeconds(durationSeconds),
        views: totalViews,
        lessonId: lesson.id,
      });
    }
  }

  const totalVideos = metrics.length;
  const totalViews = metrics.reduce((acc, v) => acc + v.views, 0);
  const totalDurationSeconds = metrics.reduce((acc, v) => acc + parseDurationToSeconds(v.durationFormatted), 0);
  const totalHours = (totalDurationSeconds / 3600).toFixed(1) + ' hrs';
  const topWatched = [...metrics].sort((a, b) => b.views - a.views)[0] || null;

  return {
    success: true,
    metrics,
    stats: {
      totalVideos,
      totalViews,
      totalHours,
      topWatched,
    },
  };
}

function parseDurationToSeconds(dur: string): number {
  const parts = dur.replace('min', '').trim().split(':');
  if (parts.length === 2) {
    return parseInt(parts[0] || '0', 10) * 60 + parseInt(parts[1] || '0', 10);
  }
  return 180;
}

function formatSeconds(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s} min`;
}

export async function recordVideoViewAction(lessonId: string, videoFile?: string, userEmail?: string) {
  const views = readStore<Record<string, number>>('videoViews', 'videoViews.json', memoryStore.videoViews);
  const key = videoFile || lessonId;
  views[key] = (views[key] || 0) + 1;
  writeStore('videoViews', 'videoViews.json', views);

  // Persist per-user lesson view in Neon PostgreSQL when user is logged in
  const cleanEmail = (userEmail || '').toLowerCase().trim();
  if (cleanEmail && cleanEmail.includes('@') && !cleanEmail.startsWith('guest@') && lessonId) {
    try {
      await withAdminDbTimeout(
        db.userLessonView.upsert({
          where: { userEmail_lessonId: { userEmail: cleanEmail, lessonId } },
          update: {
            viewCount: { increment: 1 },
            lastViewedAt: new Date(),
          },
          create: {
            userEmail: cleanEmail,
            lessonId,
            viewCount: 1,
          },
        })
      );
    } catch (e) {
      console.warn('Error registrando vista de clase en Neon DB:', e);
    }
  }

  return { success: true, count: views[key] };
}

// ============================================================================
// 3. COMENTARIOS Y CONSULTAS DE CADA CLASE
// ============================================================================

export interface CommentReply {
  id: string;
  authorName: string;
  avatarInitials: string;
  isInstructor: boolean;
  createdAt: string;
  content: string;
}

export interface StoredCommentItem {
  id: string;
  lessonId: string;
  lessonTitle: string;
  courseSlug: string;
  authorName: string;
  authorEmail: string;
  avatarInitials: string;
  isInstructor: boolean;
  createdAt: string;
  createdAtIso: string;
  content: string;
  likes: number;
  likedBy: string[];
  isApproved: boolean; // TRUE = Public. FALSE = Private (only author & superadmin)
  isRead: boolean; // Superadmin read state
  replies: CommentReply[];
}

function formatCommentDate(d: Date): string {
  try {
    return d.toLocaleDateString('es-AR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  } catch {
    return 'Recién';
  }
}

function mapDbCommentToStored(row: any): StoredCommentItem {
  let likedBy: string[] = [];
  let replies: CommentReply[] = [];
  try {
    likedBy = JSON.parse(row.likedByJson || '[]');
  } catch {}
  try {
    replies = JSON.parse(row.repliesJson || '[]');
  } catch {}

  const dt = row.createdAt ? new Date(row.createdAt) : new Date();
  return {
    id: row.id,
    lessonId: row.lessonId,
    lessonTitle: row.lessonTitle,
    courseSlug: row.courseSlug || 'experiencia-busqueda-laboral',
    authorName: row.authorName,
    authorEmail: row.authorEmail,
    avatarInitials: row.avatarInitials || 'AL',
    isInstructor: Boolean(row.isInstructor),
    createdAt: formatCommentDate(dt),
    createdAtIso: dt.toISOString(),
    content: row.content,
    likes: row.likes || 0,
    likedBy: Array.isArray(likedBy) ? likedBy : [],
    isApproved: Boolean(row.isApproved),
    isRead: Boolean(row.isRead),
    replies: Array.isArray(replies) ? replies : [],
  };
}

export async function getAdminCommentsAction() {
  let comments: StoredCommentItem[] = [];
  try {
    const rows = await withAdminDbTimeout(
      db.lessonComment.findMany({ orderBy: { createdAt: 'desc' } })
    );
    comments = rows.map(mapDbCommentToStored);
  } catch {
    comments = readStore<StoredCommentItem[]>('comments', 'comments.json', memoryStore.comments);
  }

  const total = comments.length;
  const unreadCount = comments.filter((c) => !c.isRead).length;
  const pendingApprovalCount = comments.filter((c) => !c.isApproved).length;
  const unrepliedCount = comments.filter((c) => c.replies.length === 0 && !c.isInstructor).length;

  return {
    success: true,
    comments,
    stats: {
      total,
      unreadCount,
      pendingApprovalCount,
      unrepliedCount,
    },
  };
}

export async function getLessonCommentsAction(lessonId: string, currentUserEmail?: string, isSuperAdmin = false) {
  let lessonComments: StoredCommentItem[] = [];
  try {
    const rows = await withAdminDbTimeout(
      db.lessonComment.findMany({ where: { lessonId }, orderBy: { createdAt: 'desc' } })
    );
    lessonComments = rows.map(mapDbCommentToStored);
  } catch {
    const comments = readStore<StoredCommentItem[]>('comments', 'comments.json', memoryStore.comments);
    lessonComments = comments.filter((c) => c.lessonId === lessonId);
  }

  const cleanUserEmail = currentUserEmail?.toLowerCase().trim() || '';

  const visible = lessonComments.filter((c) => {
    if (isSuperAdmin) return true;
    if (c.isApproved) return true;
    if (c.isInstructor) return true;
    if (cleanUserEmail && (c.authorEmail || '').toLowerCase() === cleanUserEmail) return true;
    return false;
  });

  const mapped = visible.map((c) => ({
    id: c.id,
    authorName: c.authorName,
    authorEmail: c.authorEmail,
    avatarInitials: c.avatarInitials,
    isInstructor: c.isInstructor,
    createdAt: c.createdAt,
    content: c.content,
    likes: c.likes || 0,
    userLiked: cleanUserEmail ? (c.likedBy || []).includes(cleanUserEmail) : false,
    isApproved: c.isApproved,
    isRead: c.isRead,
    isOwn: cleanUserEmail ? (c.authorEmail || '').toLowerCase() === cleanUserEmail : false,
    replies: c.replies || [],
  }));

  return { success: true, comments: mapped };
}

export async function saveLessonCommentAction(
  lessonId: string,
  lessonTitle: string,
  content: string,
  currentUser: { name?: string | null; email?: string | null },
  isSuperAdmin = false,
  courseSlug = 'experiencia-busqueda-laboral'
) {
  if (!content || !content.trim()) {
    return { success: false, error: 'El comentario no puede estar vacío.' };
  }

  const userEmail = (currentUser.email || '').toLowerCase().trim() || 'alumno@academia.flormartinezok.com';

  let authorName = currentUser.name?.trim() || 'Alumno';
  let isInstructor = false;
  let initials = 'AL';
  let isApproved = false;
  let isRead = false;

  if (isSuperAdmin) {
    authorName = 'Flor Martínez';
    isInstructor = true;
    initials = 'FM';
    isApproved = true;
    isRead = true;
  } else {
    initials =
      authorName
        .split(' ')
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'AL';
  }

  const now = new Date();
  let createdId = 'comm_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);

  try {
    const dbRow = await withAdminDbTimeout(
      db.lessonComment.create({
        data: {
          lessonId,
          lessonTitle,
          courseSlug,
          authorName,
          authorEmail: userEmail,
          avatarInitials: initials,
          isInstructor,
          content: content.trim(),
          likes: 0,
          likedByJson: '[]',
          isApproved,
          isRead,
          repliesJson: '[]',
        },
      })
    );
    createdId = dbRow.id;
  } catch (e) {
    console.warn('Fallback store al guardar comentario:', e);
  }

  const newComment: StoredCommentItem = {
    id: createdId,
    lessonId,
    lessonTitle,
    courseSlug,
    authorName,
    authorEmail: userEmail,
    avatarInitials: initials,
    isInstructor,
    createdAt: 'Recién',
    createdAtIso: now.toISOString(),
    content: content.trim(),
    likes: 0,
    likedBy: [],
    isApproved,
    isRead,
    replies: [],
  };

  const comments = readStore<StoredCommentItem[]>('comments', 'comments.json', memoryStore.comments);
  const updatedComments = [newComment, ...(Array.isArray(comments) ? comments : [])];
  writeStore('comments', 'comments.json', updatedComments);

  return { success: true, comment: newComment };
}

export async function deleteLessonCommentAction(commentId: string, userEmail: string, isSuperAdmin = false) {
  const cleanEmail = userEmail.toLowerCase().trim();
  try {
    const existing = await withAdminDbTimeout(db.lessonComment.findUnique({ where: { id: commentId } }));
    if (existing) {
      if (!isSuperAdmin && existing.authorEmail.toLowerCase() !== cleanEmail) {
        return { success: false, error: 'No tenés permisos para eliminar este comentario.' };
      }
      await withAdminDbTimeout(db.lessonComment.delete({ where: { id: commentId } }));
      return { success: true };
    }
  } catch {}

  const comments = readStore<StoredCommentItem[]>('comments', 'comments.json', memoryStore.comments);
  const comment = comments.find((c) => c.id === commentId);
  if (!comment) return { success: true };

  if (!isSuperAdmin && comment.authorEmail.toLowerCase() !== cleanEmail) {
    return { success: false, error: 'No tenés permisos para eliminar este comentario.' };
  }

  const filtered = comments.filter((c) => c.id !== commentId);
  writeStore('comments', 'comments.json', filtered);

  return { success: true };
}

export async function toggleCommentApprovalAction(commentId: string) {
  try {
    const existing = await withAdminDbTimeout(db.lessonComment.findUnique({ where: { id: commentId } }));
    if (existing) {
      const updated = await withAdminDbTimeout(
        db.lessonComment.update({ where: { id: commentId }, data: { isApproved: !existing.isApproved } })
      );
      return { success: true, isApproved: updated.isApproved };
    }
  } catch {}

  const comments = readStore<StoredCommentItem[]>('comments', 'comments.json', memoryStore.comments);
  const idx = comments.findIndex((c) => c.id === commentId);
  if (idx === -1) return { success: false, error: 'Comentario no encontrado' };

  comments[idx]!.isApproved = !comments[idx]!.isApproved;
  writeStore('comments', 'comments.json', comments);
  return { success: true, isApproved: comments[idx]!.isApproved };
}

export async function toggleCommentReadAction(commentId: string) {
  try {
    const existing = await withAdminDbTimeout(db.lessonComment.findUnique({ where: { id: commentId } }));
    if (existing) {
      const updated = await withAdminDbTimeout(
        db.lessonComment.update({ where: { id: commentId }, data: { isRead: !existing.isRead } })
      );
      return { success: true, isRead: updated.isRead };
    }
  } catch {}

  const comments = readStore<StoredCommentItem[]>('comments', 'comments.json', memoryStore.comments);
  const idx = comments.findIndex((c) => c.id === commentId);
  if (idx === -1) return { success: false, error: 'Comentario no encontrado' };

  comments[idx]!.isRead = !comments[idx]!.isRead;
  writeStore('comments', 'comments.json', comments);
  return { success: true, isRead: comments[idx]!.isRead };
}

export async function replyCommentAsFlorAction(commentId: string, replyContent: string) {
  if (!replyContent || !replyContent.trim()) {
    return { success: false, error: 'La respuesta no puede estar vacía' };
  }

  const reply: CommentReply = {
    id: 'rep_' + Date.now().toString(36),
    authorName: 'Flor Martínez',
    avatarInitials: 'FM',
    isInstructor: true,
    createdAt: 'Recién',
    content: replyContent.trim(),
  };

  try {
    const existing = await withAdminDbTimeout(db.lessonComment.findUnique({ where: { id: commentId } }));
    if (existing) {
      let existingReplies: CommentReply[] = [];
      try {
        existingReplies = JSON.parse(existing.repliesJson || '[]');
      } catch {}
      const nextReplies = [...existingReplies, reply];
      await withAdminDbTimeout(
        db.lessonComment.update({
          where: { id: commentId },
          data: { repliesJson: JSON.stringify(nextReplies), isRead: true },
        })
      );
      return { success: true, reply };
    }
  } catch {}

  const comments = readStore<StoredCommentItem[]>('comments', 'comments.json', memoryStore.comments);
  const idx = comments.findIndex((c) => c.id === commentId);
  if (idx === -1) return { success: false, error: 'Comentario no encontrado' };

  comments[idx]!.replies.push(reply);
  comments[idx]!.isRead = true;
  writeStore('comments', 'comments.json', comments);

  return { success: true, reply };
}

export async function toggleCommentLikeAction(commentId: string, userEmail: string) {
  const cleanEmail = userEmail.toLowerCase().trim();

  try {
    const existing = await withAdminDbTimeout(db.lessonComment.findUnique({ where: { id: commentId } }));
    if (existing) {
      let likedBy: string[] = [];
      try {
        likedBy = JSON.parse(existing.likedByJson || '[]');
      } catch {}
      const alreadyLiked = likedBy.includes(cleanEmail);
      const nextLikedBy = alreadyLiked ? likedBy.filter((e) => e !== cleanEmail) : [...likedBy, cleanEmail];
      const nextLikes = alreadyLiked ? Math.max(0, (existing.likes || 1) - 1) : (existing.likes || 0) + 1;
      await withAdminDbTimeout(
        db.lessonComment.update({
          where: { id: commentId },
          data: { likes: nextLikes, likedByJson: JSON.stringify(nextLikedBy) },
        })
      );
      return { success: true, likes: nextLikes, userLiked: !alreadyLiked };
    }
  } catch {}

  const comments = readStore<StoredCommentItem[]>('comments', 'comments.json', memoryStore.comments);
  const idx = comments.findIndex((c) => c.id === commentId);
  if (idx === -1) return { success: false, error: 'Comentario no encontrado' };

  const likedBy = comments[idx]!.likedBy || [];
  const alreadyLiked = likedBy.includes(cleanEmail);

  if (alreadyLiked) {
    comments[idx]!.likedBy = likedBy.filter((e) => e !== cleanEmail);
    comments[idx]!.likes = Math.max(0, (comments[idx]!.likes || 1) - 1);
  } else {
    comments[idx]!.likedBy.push(cleanEmail);
    comments[idx]!.likes = (comments[idx]!.likes || 0) + 1;
  }

  writeStore('comments', 'comments.json', comments);
  return { success: true, likes: comments[idx]!.likes, userLiked: !alreadyLiked };
}

// ============================================================================
// 4. GESTIÓN DE PRECIOS
// ============================================================================

export interface PricingPlan {
  id: string;
  name: string;
  promoPrice: number;
  regularPrice: number;
  currency: string;
  installments?: string;
  promoActive: boolean;
  promoBadge?: string;
}

export async function getAdminPricingAction() {
  const pricing = readStore<Record<string, PricingPlan>>('pricing', 'pricing.json', memoryStore.pricing);
  return { success: true, pricing };
}

export async function updateFullPricingAction(data: {
  eblPromoPrice?: number;
  eblRegularPrice?: number;
  coursePrice?: number;
}) {
  const pricing = readStore<Record<string, PricingPlan>>('pricing', 'pricing.json', memoryStore.pricing);

  if (!pricing['ebl']) {
    pricing['ebl'] = {
      id: 'experiencia-busqueda-laboral',
      name: 'Experiencia Búsqueda Laboral — Pase Anual Completo',
      promoPrice: data.eblPromoPrice || 25000,
      regularPrice: data.eblRegularPrice || 35000,
      currency: 'ARS',
      promoActive: true,
      promoBadge: 'Oferta Oficial de Lanzamiento',
    };
  } else {
    if (data.eblPromoPrice !== undefined) pricing['ebl'].promoPrice = data.eblPromoPrice;
    if (data.eblRegularPrice !== undefined) pricing['ebl'].regularPrice = data.eblRegularPrice;
  }

  if (data.coursePrice !== undefined) {
    if (pricing['curso-cv']) pricing['curso-cv'].promoPrice = data.coursePrice;
    if (pricing['curso-linkedin']) pricing['curso-linkedin'].promoPrice = data.coursePrice;
  }

  writeStore('pricing', 'pricing.json', pricing);
  return { success: true, pricing };
}

// ============================================================================
// 5. TEST VOCACIONAL - MÉTRICAS Y AUDITORÍA
// ============================================================================

export interface VocationalSubmissionItem {
  id: string;
  userEmail?: string;
  userName?: string;
  completedAt: string;
  dominantArchetype: string;
  dominantName: string;
  scores: Record<string, number>;
  recommendedRoles: string[];
}

export async function getAdminVocationalStatsAction() {
  const submissions = readStore<VocationalSubmissionItem[]>(
    'vocationalTests',
    'vocationalTests.json',
    memoryStore.vocationalTests
  );

  const totalTests = submissions.length;
  const archetypes = {
    estrategico: 0,
    analitico: 0,
    personas: 0,
    creativo: 0,
  };

  for (const s of submissions) {
    const arch = (s.dominantArchetype || '').toLowerCase();
    if (arch.includes('estrateg')) archetypes.estrategico++;
    else if (arch.includes('analit')) archetypes.analitico++;
    else if (arch.includes('persona')) archetypes.personas++;
    else if (arch.includes('creat')) archetypes.creativo++;
  }

  return {
    success: true,
    stats: {
      totalTests,
      archetypes,
      submissions: submissions.slice(0, 50),
    },
  };
}

export async function recordVocationalSubmissionAction(data: {
  userEmail?: string;
  userName?: string;
  dominantArchetype: string;
  dominantName: string;
  scores: Record<string, number>;
  recommendedRoles?: string[];
}) {
  const submissions = readStore<VocationalSubmissionItem[]>(
    'vocationalTests',
    'vocationalTests.json',
    memoryStore.vocationalTests
  );

  const newSub: VocationalSubmissionItem = {
    id: 'voc_' + Date.now().toString(36),
    userEmail: data.userEmail || 'Anónimo',
    userName: data.userName || 'Alumno',
    completedAt: new Date().toISOString(),
    dominantArchetype: data.dominantArchetype,
    dominantName: data.dominantName,
    scores: data.scores,
    recommendedRoles: data.recommendedRoles || [],
  };

  submissions.unshift(newSub);
  writeStore('vocationalTests', 'vocationalTests.json', submissions);

  return { success: true, submission: newSub };
}
