'use server';

import fs from 'fs';
import path from 'path';
import { SUPERADMIN_EMAILS, BANNED_EMAILS } from '@/context/AuthContext';
import { campusPrograms, CampusModule, CampusLesson } from '@/data/campus';
import bunnyMapping from '@/data/bunnyVideos.json';

const STORE_DIR = path.join(process.cwd(), 'src', 'data', 'store');
const USERS_FILE = path.join(STORE_DIR, 'users.json');
const COMMENTS_FILE = path.join(STORE_DIR, 'comments.json');
const PRICING_FILE = path.join(STORE_DIR, 'pricing.json');
const VOCATIONAL_FILE = path.join(STORE_DIR, 'vocationalTests.json');
const VIDEO_VIEWS_FILE = path.join(STORE_DIR, 'videoViews.json');

const BUNNY_LIB_ID = '815825';
const BUNNY_API_KEY = 'c38f0c59-0f49-4066-af5d440d17ad-1943-4d4e';

// Helper to safely read JSON store with fallback
function readJsonStore<T>(filePath: string, fallback: T): T {
  try {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), 'utf-8');
      return fallback;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return fallback;
  }
}

// Helper to safely write JSON store
function writeJsonStore<T>(filePath: string, data: T): void {
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
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
  membershipTier: 'VIP' | 'FREE';
  status: 'active' | 'banned';
  avatarUrl?: string | null;
  createdAt: string;
  lastLoginAt: string;
  notes?: string;
}

export async function getAdminUsersAction() {
  const users = readJsonStore<AdminUserRecord[]>(USERS_FILE, []);

  const total = users.length;
  const activeCount = users.filter((u) => u.status === 'active').length;
  const vipCount = users.filter((u) => u.membershipTier === 'VIP').length;
  const freeCount = users.filter((u) => u.membershipTier === 'FREE').length;
  const superadminCount = users.filter((u) => u.role === 'superadmin' || SUPERADMIN_EMAILS.includes(u.email.toLowerCase())).length;
  const bannedCount = users.filter((u) => u.status === 'banned' || BANNED_EMAILS.includes(u.email.toLowerCase())).length;

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

// Ensure user exists or update in registry whenever they log in
export async function registerOrUpdateUserInStore(email: string, name: string, avatarUrl?: string) {
  const cleanEmail = email.toLowerCase().trim();
  const users = readJsonStore<AdminUserRecord[]>(USERS_FILE, []);

  const isSuper = SUPERADMIN_EMAILS.includes(cleanEmail);
  const isBanned = BANNED_EMAILS.includes(cleanEmail);

  const existingIdx = users.findIndex((u) => u.email.toLowerCase() === cleanEmail);
  const now = new Date().toISOString();

  if (existingIdx >= 0) {
    users[existingIdx] = {
      ...users[existingIdx]!,
      name: name || users[existingIdx]!.name,
      avatarUrl: avatarUrl || users[existingIdx]!.avatarUrl,
      lastLoginAt: now,
      role: isSuper ? 'superadmin' : users[existingIdx]!.role,
      status: isBanned ? 'banned' : users[existingIdx]!.status,
    };
  } else {
    users.unshift({
      id: 'usr_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      email: cleanEmail,
      name: name || cleanEmail.split('@')[0] || 'Usuario',
      role: isSuper ? 'superadmin' : 'student',
      membershipTier: isSuper ? 'VIP' : 'VIP',
      status: isBanned ? 'banned' : 'active',
      avatarUrl: avatarUrl || null,
      createdAt: now,
      lastLoginAt: now,
      notes: isSuper ? 'Superadministrador verificado' : 'Registro en plataforma',
    });
  }

  writeJsonStore(USERS_FILE, users);
}

export async function updateUserRoleAction(userId: string, newRole: 'superadmin' | 'student' | 'client') {
  const users = readJsonStore<AdminUserRecord[]>(USERS_FILE, []);
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return { success: false, error: 'Usuario no encontrado' };

  users[idx]!.role = newRole;
  writeJsonStore(USERS_FILE, users);
  return { success: true, user: users[idx] };
}

export async function updateUserMembershipAction(userId: string, newTier: 'VIP' | 'FREE') {
  const users = readJsonStore<AdminUserRecord[]>(USERS_FILE, []);
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return { success: false, error: 'Usuario no encontrado' };

  users[idx]!.membershipTier = newTier;
  writeJsonStore(USERS_FILE, users);
  return { success: true, user: users[idx] };
}

export async function toggleUserBanAction(userId: string) {
  const users = readJsonStore<AdminUserRecord[]>(USERS_FILE, []);
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return { success: false, error: 'Usuario no encontrado' };

  const currentStatus = users[idx]!.status;
  users[idx]!.status = currentStatus === 'banned' ? 'active' : 'banned';
  writeJsonStore(USERS_FILE, users);
  return { success: true, user: users[idx] };
}

export async function deleteUserAction(userId: string) {
  const users = readJsonStore<AdminUserRecord[]>(USERS_FILE, []);
  const filtered = users.filter((u) => u.id !== userId);
  writeJsonStore(USERS_FILE, filtered);
  return { success: true };
}

export async function createManualUserAction(data: {
  email: string;
  name?: string;
  role?: 'superadmin' | 'student' | 'client';
  membershipTier?: 'VIP' | 'FREE';
  notes?: string;
}) {
  const cleanEmail = data.email.toLowerCase().trim();
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, error: 'Email inválido' };
  }

  const users = readJsonStore<AdminUserRecord[]>(USERS_FILE, []);
  if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
    return { success: false, error: 'Ya existe un usuario con este correo electrónico.' };
  }

  const now = new Date().toISOString();
  const newUser: AdminUserRecord = {
    id: 'usr_' + Date.now().toString(36),
    email: cleanEmail,
    name: (data.name || '').trim() || cleanEmail.split('@')[0] || 'Usuario',
    role: data.role || 'student',
    membershipTier: data.membershipTier || 'VIP',
    status: 'active',
    avatarUrl: null,
    createdAt: now,
    lastLoginAt: now,
    notes: data.notes || 'Alta manual por Superadmin',
  };

  users.unshift(newUser);
  writeJsonStore(USERS_FILE, users);
  return { success: true, user: newUser };
}

// ============================================================================
// 2. MÉTRICAS DE VIDEOS DE CLASES (BUNNY STREAM + CAMPUS)
// ============================================================================

export interface ClassVideoMetric {
  file: string;
  guid: string;
  courseTitle: string;
  courseSlug: string;
  moduleNumber: number | string;
  moduleTitle: string;
  lessonId: string;
  lessonTitle: string;
  durationSeconds: number;
  durationFormatted: string;
  views: number;
  averageWatchTime: number;
  totalWatchTime: number;
  quality: string;
  thumbnailUrl: string;
  embedUrl: string;
  storageSizeMb: number;
}

export async function getAdminVideoMetricsAction() {
  const internalViews = readJsonStore<Record<string, number>>(VIDEO_VIEWS_FILE, {});

  // Fetch Bunny Stream statistics
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

  // Cross-reference with campusPrograms
  const metrics: ClassVideoMetric[] = [];
  const typedBunnyMapping = bunnyMapping as Record<string, { guid: string; embed_url: string; id: string; ts_key: string }>;

  for (const program of campusPrograms) {
    for (const mod of program.modules) {
      for (const lesson of mod.lessons) {
        // Find matching video in bunnyMapping
        let matchedFile = '';
        let matchedGuid = '';
        let matchedEmbed = lesson.videoUrl || '';

        for (const [file, info] of Object.entries(typedBunnyMapping)) {
          if (info.id === lesson.id || (lesson.videoUrl && lesson.videoUrl.includes(info.guid))) {
            matchedFile = file;
            matchedGuid = info.guid;
            matchedEmbed = info.embed_url;
            break;
          }
        }

        if (!matchedFile && lesson.videoUrl && lesson.videoUrl.includes('/embed/815825/')) {
          const m = lesson.videoUrl.match(/embed\/815825\/([a-zA-Z0-9-]+)/);
          if (m && m[1]) {
            matchedGuid = m[1];
            for (const [file, info] of Object.entries(typedBunnyMapping)) {
              if (info.guid === matchedGuid) {
                matchedFile = file;
                break;
              }
            }
          }
        }

        const bunnyVideo = matchedFile ? bunnyMapByFile[matchedFile] : null;

        const durationSeconds = bunnyVideo?.length || (lesson.videoDuration ? parseDurationToSeconds(lesson.videoDuration) : 120);
        const bunnyViews = bunnyVideo?.views || 0;
        const localViews = internalViews[lesson.id] || internalViews[matchedFile] || 0;
        const totalViews = Math.max(bunnyViews, localViews);

        const storageMb = bunnyVideo?.storageSize ? Number((bunnyVideo.storageSize / (1024 * 1024)).toFixed(1)) : 80;

        metrics.push({
          file: matchedFile || `${lesson.id}.mp4`,
          guid: matchedGuid,
          courseTitle: program.title,
          courseSlug: program.slug,
          moduleNumber: mod.number,
          moduleTitle: mod.title,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          durationSeconds,
          durationFormatted: formatSeconds(durationSeconds),
          views: totalViews,
          averageWatchTime: bunnyVideo?.averageWatchTime || 0,
          totalWatchTime: bunnyVideo?.totalWatchTime || 0,
          quality: '1080p Full HD',
          thumbnailUrl: bunnyVideo?.thumbnailUrl || `/images/check_${matchedFile ? matchedFile.replace('.mp4', '.jpg') : 'EBL-1-1.jpg'}`,
          embedUrl: matchedEmbed,
          storageSizeMb: storageMb,
        });
      }
    }
  }

  // Aggregate stats
  const totalVideos = metrics.length;
  const totalViews = metrics.reduce((acc, v) => acc + v.views, 0);
  const totalDurationSeconds = metrics.reduce((acc, v) => acc + v.durationSeconds, 0);
  const totalHours = (totalDurationSeconds / 3600).toFixed(1);

  // Top watched
  const sorted = [...metrics].sort((a, b) => b.views - a.views);
  const topWatched = sorted[0] || null;

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

export async function recordVideoViewAction(lessonId: string, videoFile?: string) {
  const views = readJsonStore<Record<string, number>>(VIDEO_VIEWS_FILE, {});
  const key = videoFile || lessonId;
  views[key] = (views[key] || 0) + 1;
  writeJsonStore(VIDEO_VIEWS_FILE, views);
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
  likedBy: string[]; // array of emails that liked
  isApproved: boolean; // TRUE = Public for all students. FALSE = Private (only author & superadmins)
  isRead: boolean; // Superadmin read state
  replies: CommentReply[];
}

export async function getAdminCommentsAction() {
  const comments = readJsonStore<StoredCommentItem[]>(COMMENTS_FILE, []);

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
  const comments = readJsonStore<StoredCommentItem[]>(COMMENTS_FILE, []);
  const lessonComments = comments.filter((c) => c.lessonId === lessonId);

  const cleanUserEmail = currentUserEmail?.toLowerCase().trim() || '';

  // Filter visibility:
  // - Superadmin sees ALL
  // - Regular user sees APPROVED comments + THEIR OWN private comments
  const visible = lessonComments.filter((c) => {
    if (isSuperAdmin) return true;
    if (c.isApproved) return true;
    if (cleanUserEmail && c.authorEmail.toLowerCase() === cleanUserEmail) return true;
    return false;
  });

  // Map to client-friendly format
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
    isOwn: cleanUserEmail ? c.authorEmail.toLowerCase() === cleanUserEmail : false,
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

  const comments = readJsonStore<StoredCommentItem[]>(COMMENTS_FILE, []);
  const userEmail = (currentUser.email || '').toLowerCase().trim();

  // If superadmin: ALWAYS published as "Flor Martínez" (instructora)
  let authorName = currentUser.name?.trim() || 'Alumno';
  let isInstructor = false;
  let initials = 'AL';
  let isApproved = false; // Students start PRIVATE
  let isRead = false;

  if (isSuperAdmin) {
    authorName = 'Flor Martínez';
    isInstructor = true;
    initials = 'FM';
    isApproved = true; // Instructor comments are public
    isRead = true;
  } else {
    initials = authorName
      .split(' ')
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'AL';
  }

  const now = new Date();
  const newComment: StoredCommentItem = {
    id: 'comm_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    lessonId,
    lessonTitle,
    courseSlug,
    authorName,
    authorEmail: userEmail || 'alumno@academia.flormartinezok.com',
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

  comments.unshift(newComment);
  writeJsonStore(COMMENTS_FILE, comments);

  return { success: true, comment: newComment };
}

export async function deleteLessonCommentAction(commentId: string, userEmail: string, isSuperAdmin = false) {
  const comments = readJsonStore<StoredCommentItem[]>(COMMENTS_FILE, []);
  const cleanEmail = userEmail.toLowerCase().trim();

  const comment = comments.find((c) => c.id === commentId);
  if (!comment) return { success: false, error: 'Comentario no encontrado' };

  // Can delete if Superadmin OR if it is their own comment
  if (!isSuperAdmin && comment.authorEmail.toLowerCase() !== cleanEmail) {
    return { success: false, error: 'No tenés permisos para eliminar este comentario.' };
  }

  const filtered = comments.filter((c) => c.id !== commentId);
  writeJsonStore(COMMENTS_FILE, filtered);

  return { success: true };
}

export async function toggleCommentApprovalAction(commentId: string) {
  const comments = readJsonStore<StoredCommentItem[]>(COMMENTS_FILE, []);
  const idx = comments.findIndex((c) => c.id === commentId);
  if (idx === -1) return { success: false, error: 'Comentario no encontrado' };

  comments[idx]!.isApproved = !comments[idx]!.isApproved;
  writeJsonStore(COMMENTS_FILE, comments);
  return { success: true, isApproved: comments[idx]!.isApproved };
}

export async function toggleCommentReadAction(commentId: string) {
  const comments = readJsonStore<StoredCommentItem[]>(COMMENTS_FILE, []);
  const idx = comments.findIndex((c) => c.id === commentId);
  if (idx === -1) return { success: false, error: 'Comentario no encontrado' };

  comments[idx]!.isRead = !comments[idx]!.isRead;
  writeJsonStore(COMMENTS_FILE, comments);
  return { success: true, isRead: comments[idx]!.isRead };
}

export async function replyCommentAsFlorAction(commentId: string, replyContent: string) {
  if (!replyContent || !replyContent.trim()) {
    return { success: false, error: 'La respuesta no puede estar vacía' };
  }

  const comments = readJsonStore<StoredCommentItem[]>(COMMENTS_FILE, []);
  const idx = comments.findIndex((c) => c.id === commentId);
  if (idx === -1) return { success: false, error: 'Comentario no encontrado' };

  const reply: CommentReply = {
    id: 'rep_' + Date.now().toString(36),
    authorName: 'Flor Martínez',
    avatarInitials: 'FM',
    isInstructor: true,
    createdAt: 'Recién',
    content: replyContent.trim(),
  };

  comments[idx]!.replies.push(reply);
  comments[idx]!.isRead = true; // Auto-mark read when answered
  writeJsonStore(COMMENTS_FILE, comments);

  return { success: true, reply };
}

export async function toggleCommentLikeAction(commentId: string, userEmail: string) {
  const comments = readJsonStore<StoredCommentItem[]>(COMMENTS_FILE, []);
  const idx = comments.findIndex((c) => c.id === commentId);
  if (idx === -1) return { success: false, error: 'Comentario no encontrado' };

  const cleanEmail = userEmail.toLowerCase().trim();
  const likedBy = comments[idx]!.likedBy || [];
  const alreadyLiked = likedBy.includes(cleanEmail);

  if (alreadyLiked) {
    comments[idx]!.likedBy = likedBy.filter((e) => e !== cleanEmail);
    comments[idx]!.likes = Math.max(0, (comments[idx]!.likes || 1) - 1);
  } else {
    comments[idx]!.likedBy.push(cleanEmail);
    comments[idx]!.likes = (comments[idx]!.likes || 0) + 1;
  }

  writeJsonStore(COMMENTS_FILE, comments);
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
  installments: string;
  promoActive: boolean;
  promoBadge: string;
}

export async function getAdminPricingAction() {
  const pricing = readJsonStore<Record<string, PricingPlan>>(PRICING_FILE, {});
  return { success: true, pricing };
}

export async function updateAdminPricingAction(
  planKey: string,
  updatedData: Partial<PricingPlan>
) {
  const pricing = readJsonStore<Record<string, PricingPlan>>(PRICING_FILE, {});
  if (!pricing[planKey]) {
    return { success: false, error: 'Plan no encontrado' };
  }

  pricing[planKey] = {
    ...pricing[planKey]!,
    ...updatedData,
  };

  writeJsonStore(PRICING_FILE, pricing);
  return { success: true, plan: pricing[planKey] };
}

export async function updateFullPricingAction(data: {
  eblPromoPrice?: number;
  eblRegularPrice?: number;
  eblInstallments?: number;
  coursePrice?: number;
}) {
  const pricing = readJsonStore<Record<string, PricingPlan>>(PRICING_FILE, {});
  if (pricing['ebl']) {
    if (data.eblPromoPrice !== undefined) pricing['ebl'].promoPrice = data.eblPromoPrice;
    if (data.eblRegularPrice !== undefined) pricing['ebl'].regularPrice = data.eblRegularPrice;
    if (data.eblInstallments !== undefined) {
      pricing['ebl'].installments = `Hasta ${data.eblInstallments} cuotas fijas`;
    }
  }
  if (data.coursePrice !== undefined) {
    if (pricing['curso-cv']) pricing['curso-cv'].promoPrice = data.coursePrice;
    if (pricing['curso-linkedin']) pricing['curso-linkedin'].promoPrice = data.coursePrice;
  }
  writeJsonStore(PRICING_FILE, pricing);
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
  const submissions = readJsonStore<VocationalSubmissionItem[]>(VOCATIONAL_FILE, []);

  const total = submissions.length;

  const archetypesCount: Record<string, number> = {
    estrategico: 0,
    analitico: 0,
    personas: 0,
    creativo: 0,
  };

  for (const s of submissions) {
    const arch = (s.dominantArchetype || '').toLowerCase();
    if (archetypesCount[arch] !== undefined) {
      archetypesCount[arch] += 1;
    }
  }

  return {
    success: true,
    submissions,
    stats: {
      total,
      archetypesCount,
    },
  };
}

export async function recordVocationalSubmissionAction(data: {
  userEmail?: string;
  userName?: string;
  dominantArchetype: string;
  dominantName: string;
  scores: Record<string, number>;
  recommendedRoles: string[];
}) {
  const submissions = readJsonStore<VocationalSubmissionItem[]>(VOCATIONAL_FILE, []);

  const newItem: VocationalSubmissionItem = {
    id: 'voc_' + Date.now().toString(36),
    userEmail: data.userEmail || 'Anónimo',
    userName: data.userName || 'Visitante',
    completedAt: new Date().toISOString(),
    dominantArchetype: data.dominantArchetype,
    dominantName: data.dominantName,
    scores: data.scores,
    recommendedRoles: data.recommendedRoles,
  };

  submissions.unshift(newItem);
  writeJsonStore(VOCATIONAL_FILE, submissions);
  return { success: true, submission: newItem };
}
