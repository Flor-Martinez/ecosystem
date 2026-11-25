'use server';

import fs from 'fs';
import path from 'path';
import { db, MembershipTier, Role } from '@repo/db';

export type JobApplicationStatus =
  | 'Por postular'
  | 'Postulado'
  | 'Contactado'
  | 'Entrevista'
  | 'Oferta'
  | 'Cerrado'
  | 'Logrado';

function normalizeJobStatus(status: string | null | undefined): JobApplicationStatus {
  if (!status) return 'Por postular';
  const s = status.trim().toLowerCase();
  if (s.includes('identificada') || s.includes('por postular')) return 'Por postular';
  if (s.includes('postulado')) return 'Postulado';
  if (s.includes('contactado') || s.includes('contacto')) return 'Contactado';
  if (s.includes('entrevista') || s.includes('prueba')) return 'Entrevista';
  if (s.includes('oferta')) return 'Oferta';
  if (s.includes('descartado') || s.includes('cerrado') || s.includes('rechazado')) return 'Cerrado';
  if (s.includes('logrado') || s.includes('contratado') || s.includes('ganado')) return 'Logrado';
  return 'Por postular';
}

export type CalendarEventType = 'zoom' | 'entrevista' | 'prueba' | 'seguimiento';

const DEFAULT_DEMO_EMAIL = 'guest@academia.flormartinezok.com';

const SUPERADMIN_EMAILS = [
  'santisose01@gmail.com',
  'licenciadaflormartinez@gmail.com',
  'lucianamartinez0696@gmail.com',
];

function isSuperAdminEmail(email: string): boolean {
  const clean = (email || '').toLowerCase().trim();
  return SUPERADMIN_EMAILS.includes(clean);
}

const TRIAL_HEADLINE_MARKER = 'TRIAL_MOD_4';
const ADMIN_OVERRIDE_PREFIX = 'ADMIN_OVERRIDE:';

function parseAdminHeadlineTier(headline?: string | null): 'paid' | 'trial' | 'free' | null {
  const h = String(headline || '');
  if (h.includes(`${ADMIN_OVERRIDE_PREFIX}TRIAL`) || h.includes(TRIAL_HEADLINE_MARKER)) return 'trial';
  if (h.includes(`${ADMIN_OVERRIDE_PREFIX}FREE`)) return 'free';
  if (h.includes(`${ADMIN_OVERRIDE_PREFIX}VIP`)) return 'paid';
  return null;
}

function isEnvTrialEmail(email: string): boolean {
  const clean = (email || '').toLowerCase().trim();
  if (!clean || !clean.includes('@')) return false;
  const raw = process.env.TRIAL_ACCESS_EMAILS || process.env.NEXT_PUBLIC_TRIAL_ACCESS_EMAILS || '';
  return raw
    .split(/[,;\n\s]+/)
    .map((e) => e.toLowerCase().trim())
    .includes(clean);
}

function getMembershipFromLocalUsersStore(
  email: string
): { tier: 'paid' | 'trial' | 'free'; adminOverride: boolean } | null {
  try {
    const clean = (email || '').toLowerCase().trim();
    if (!clean || !clean.includes('@')) return null;
    const filePath = getStoreFilePath('users.json');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        const found = parsed.find((u: any) => (u?.email || '').toLowerCase().trim() === clean);
        if (found) {
          const t = String(found.membershipTier || '').toUpperCase();
          const tier = t === 'VIP' ? 'paid' : t === 'TRIAL' ? 'trial' : 'free';
          return { tier, adminOverride: Boolean(found.adminOverride) };
        }
      }
    }
  } catch {
    // ignore
  }
  return null;
}

const MP_TOKEN_FALLBACK =
  'APP_USR-4644281928495780-101119-14763e1cc4acdf248726e134b1da1279-151307739';

function getMpAccessToken(): string {
  return (
    process.env.MP_ACCESS_TOKEN ||
    process.env.MERCADOPAGO_ACCESS_TOKEN ||
    MP_TOKEN_FALLBACK
  ).trim();
}

// Check Mercado Pago API directly for any approved EBL payment linked to this email (cloud source of truth)
async function hasApprovedMercadoPagoPayment(email: string): Promise<boolean> {
  const clean = (email || '').toLowerCase().trim();
  if (!clean || !clean.includes('@')) return false;

  try {
    const token = getMpAccessToken();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(
      'https://api.mercadopago.com/v1/payments/search?status=approved&sort=date_created&criteria=desc&limit=100',
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
        signal: controller.signal,
      }
    );
    clearTimeout(timer);
    if (!res.ok) return false;

    const json = await res.json();
    const results = Array.isArray(json?.results) ? json.results : [];
    const oneYearMs = 366 * 24 * 60 * 60 * 1000;
    const nowMs = Date.now();

    return results.some((p: any) => {
      if (p?.status !== 'approved') return false;
      const extRef = String(p?.external_reference || '').toLowerCase();
      const desc = String(p?.description || '').toLowerCase();
      const items = Array.isArray(p?.additional_info?.items) ? p.additional_info.items : [];
      const isEblItem =
        extRef.includes('ebl-') ||
        desc.includes('experiencia') ||
        items.some((it: any) => String(it?.id || '').toLowerCase() === 'ebl-anual');

      if (!isEblItem) return false;

      // Verify within 1 year membership window
      const createdMs = Date.parse(p?.date_approved || p?.date_created || '');
      if (!isNaN(createdMs) && nowMs - createdMs > oneYearMs) return false;

      const metaEmail = String(p?.metadata?.user_email || '').toLowerCase().trim();
      const payerEmail = String(p?.payer?.email || '').toLowerCase().trim();
      const refEmail = extRef.includes('|') ? extRef.split('|')[0]!.trim() : '';

      return metaEmail === clean || refEmail === clean || payerEmail === clean;
    });
  } catch (e) {
    console.warn('Error consultando pagos en Mercado Pago:', e);
    return false;
  }
}

// Verify a specific payment_id (or search by email) on return from Mercado Pago and activate VIP
export async function verifyAndActivateMercadoPagoPaymentAction(
  userEmail: string,
  paymentId?: string | null
) {
  const cleanEmail = (userEmail || '').toLowerCase().trim();
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, isVip: false };
  }

  let isApproved = false;

  if (paymentId && /^\d+$/.test(String(paymentId).trim())) {
    try {
      const token = getMpAccessToken();
      const res = await fetch(`https://api.mercadopago.com/v1/payments/${String(paymentId).trim()}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });
      if (res.ok) {
        const payment = await res.json();
        if (payment?.status === 'approved') {
          isApproved = true;
        }
      }
    } catch (e) {
      console.warn('Error verificando payment_id en MP:', e);
    }
  }

  if (!isApproved) {
    isApproved = await hasApprovedMercadoPagoPayment(cleanEmail);
  }

  if (isApproved) {
    await updateUserMembershipTierAction(cleanEmail, 'paid');
    return { success: true, isVip: true };
  }

  return { success: true, isVip: false };
}

// Helper for store path resolution across monorepo and standalone builds
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

const memoryProgressStore: Record<string, string[]> = {};

function readProgressStore(): Record<string, string[]> {
  try {
    const filePath = getStoreFilePath('userProgress.json');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(content);
      if (parsed && typeof parsed === 'object') {
        Object.assign(memoryProgressStore, parsed);
        return memoryProgressStore;
      }
    }
  } catch {
    // ignore
  }
  return memoryProgressStore;
}

function writeProgressStore(data: Record<string, string[]>): void {
  Object.assign(memoryProgressStore, data);

  const candidatePaths = [
    path.join(process.cwd(), 'apps', 'academy', 'src', 'data', 'store', 'userProgress.json'),
    path.join(process.cwd(), 'src', 'data', 'store', 'userProgress.json'),
    path.join(process.cwd(), '..', 'apps', 'academy', 'src', 'data', 'store', 'userProgress.json'),
    path.join('/tmp', 'fm_store', 'userProgress.json'),
  ];

  for (const p of candidatePaths) {
    try {
      fs.mkdirSync(path.dirname(p), { recursive: true });
      fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8');
      break;
    } catch {
      // try next
    }
  }
}

// Helper with timeout to prevent DB hangs (5s handles Neon cold-start wakeup)
function withDbTimeout<T>(promise: Promise<T>, timeoutMs = 5000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('DB Timeout')), timeoutMs)
    ),
  ]);
}

// Helper to ensure user exists in DB if available
async function getOrCreateUser(email: string) {
  const formattedEmail = (email || 'guest').toLowerCase().trim();
  let user = await withDbTimeout(
    db.user.findUnique({
      where: { email: formattedEmail },
      include: {
        studentProfile: true,
        jobApplications: { orderBy: { createdAt: 'desc' } },
        calendarEvents: { orderBy: { date: 'asc' } },
        quizSubmissions: true,
      },
    })
  );

  if (!user) {
    const isSuper = isSuperAdminEmail(formattedEmail);
    const namePart = formattedEmail.split('@')[0] || 'Usuario';
    const dynamicName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    user = await withDbTimeout(
      db.user.create({
        data: {
          email: formattedEmail,
          name: dynamicName,
          role: isSuper ? Role.ADMIN : Role.STUDENT,
          membershipTier: isSuper ? MembershipTier.VIP : MembershipTier.FREE,
          headline: isSuper ? 'Superadministrador' : 'Estudiante en Academia Flor Martínez',
          studentProfile: {
            create: {
              targetRole: '',
              seniority: '',
              modality: '',
              expectedSalary: '',
              linkedinUrl: '',
              cvFileName: '',
              atsScore: 0,
              linkedinScore: 0,
              starScore: 0,
              negotiationScore: 0,
              networkingScore: 0,
            },
          },
        },
        include: {
          studentProfile: true,
          jobApplications: { orderBy: { createdAt: 'desc' } },
          calendarEvents: { orderBy: { date: 'asc' } },
          quizSubmissions: true,
        },
      })
    );
  }

  return user;
}

// 1. Get complete initial state for Campus Virtual (resilient with userProgress.json)
export async function getCampusInitialDataAction(userEmail?: string) {
  const cleanEmail = (userEmail || 'guest').toLowerCase().trim();
  const progressStore = readProgressStore();
  const savedCompletedLessonIds = progressStore[cleanEmail] || [];

  try {
    if (cleanEmail && cleanEmail !== 'guest' && cleanEmail.includes('@')) {
      const user = await getOrCreateUser(cleanEmail);

      const [globalEvents, userEvents, enrollments, directCompletions] = await Promise.all([
        withDbTimeout(db.calendarEvent.findMany({ where: { isGlobal: true }, orderBy: { date: 'asc' } })).catch(() => []),
        withDbTimeout(db.calendarEvent.findMany({ where: { userId: user.id }, orderBy: { date: 'asc' } })).catch(() => []),
        withDbTimeout(db.enrollment.findMany({ where: { userId: user.id }, include: { progressRecords: true } })).catch(() => []),
        withDbTimeout(db.userLessonCompletion.findMany({ where: { userEmail: cleanEmail } })).catch(() => []),
      ]);

      const dbCompletedIds: string[] = [];
      enrollments.forEach((enr: any) => {
        enr.progressRecords?.forEach((pr: any) => {
          if (pr.isCompleted && pr.lessonId) {
            dbCompletedIds.push(pr.lessonId);
          }
        });
      });
      directCompletions.forEach((dc: any) => {
        if (dc?.lessonId) dbCompletedIds.push(dc.lessonId);
      });

      // Merge DB progress with file store progress
      const mergedSet = new Set([...savedCompletedLessonIds, ...dbCompletedIds]);
      const finalCompletedList = Array.from(mergedSet);

      if (finalCompletedList.length !== savedCompletedLessonIds.length) {
        progressStore[cleanEmail] = finalCompletedList;
        writeProgressStore(progressStore);
      }

      const overrideTier = parseAdminHeadlineTier(user.headline);
      let resolvedDbTier: 'free' | 'trial' | 'paid' = overrideTier
        ? overrideTier
        : user.membershipTier === MembershipTier.VIP
        ? 'paid'
        : isEnvTrialEmail(cleanEmail)
        ? 'trial'
        : 'free';

      if (!overrideTier && resolvedDbTier !== 'paid' && !isSuperAdminEmail(cleanEmail)) {
        const hasMpPaid = await hasApprovedMercadoPagoPayment(cleanEmail);
        if (hasMpPaid) {
          resolvedDbTier = 'paid';
          withDbTimeout(
            db.user.update({ where: { id: user.id }, data: { membershipTier: MembershipTier.VIP } })
          ).catch(() => {});
        }
      }

      return {
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            membershipTier: resolvedDbTier,
          },
          completedLessonIds: finalCompletedList,
          studentProfile: user.studentProfile || {
            targetRole: '',
            seniority: '',
            modality: '',
            expectedSalary: '',
            linkedinUrl: '',
            cvFileName: '',
            atsScore: 0,
            linkedinScore: 0,
            starScore: 0,
            negotiationScore: 0,
            networkingScore: 0,
          },
          jobApplications: (user.jobApplications || []).map((app: any) => ({
            id: app.id,
            company: app.company,
            role: app.role,
            status: normalizeJobStatus(app.status),
            salary: app.salary || '',
            date: app.date,
            nextStep: app.nextStep || '',
            notes: app.notes || '',
            jobUrl: app.jobUrl || '',
            isFavorite: app.isFavorite,
          })),
          calendarEvents: [...(globalEvents as any[]), ...(userEvents as any[])].map((evt: any) => ({
            id: evt.id,
            title: evt.title,
            type: evt.type as CalendarEventType,
            date: evt.date,
            time: evt.time,
            notes: evt.notes || '',
            company: evt.company || '',
            zoomLink: evt.zoomLink || '',
          })),
          quizSubmissions: (user.quizSubmissions || []).map((qs: any) => ({
            id: qs.id,
            moduleNumber: qs.moduleNumber,
            lessonId: qs.lessonId,
            score: qs.score,
            isPassed: qs.isPassed,
          })),
        },
      };
    }
  } catch (error) {
    console.warn('DB offline or timed out, returning persisted store progress:', error);
  }

  // Fallback return: always succeeds and preserves progress + verifies live Mercado Pago payment & trial access
  const isSuperFallback = isSuperAdminEmail(cleanEmail);
  const storeInfo = getMembershipFromLocalUsersStore(cleanEmail);
  let resolvedTier: 'paid' | 'trial' | 'free' = isSuperFallback
    ? 'paid'
    : storeInfo?.tier || (isEnvTrialEmail(cleanEmail) ? 'trial' : 'free');
  if (
    !storeInfo?.adminOverride &&
    resolvedTier !== 'paid' &&
    cleanEmail &&
    cleanEmail !== 'guest' &&
    cleanEmail.includes('@')
  ) {
    const hasMpPaid = await hasApprovedMercadoPagoPayment(cleanEmail);
    if (hasMpPaid) {
      resolvedTier = 'paid';
    }
  }
  return {
    success: true,
    data: {
      user: {
        id: 'usr_' + cleanEmail.replace(/[^a-zA-Z0-9]/g, '_'),
        name: cleanEmail === 'guest' ? 'Invitado' : cleanEmail.split('@')[0],
        email: cleanEmail === 'guest' ? '' : cleanEmail,
        role: isSuperFallback ? 'superadmin' : 'student',
        membershipTier: resolvedTier,
      },
      completedLessonIds: savedCompletedLessonIds,
      studentProfile: {
        targetRole: '',
        seniority: '',
        modality: '',
        expectedSalary: '',
        linkedinUrl: '',
        cvFileName: '',
        atsScore: 0,
        linkedinScore: 0,
        starScore: 0,
        negotiationScore: 0,
        networkingScore: 0,
      },
      jobApplications: [],
      calendarEvents: [],
      quizSubmissions: [],
    },
  };
}

// 2. Save / toggle lesson progress (permanently in userProgress.json and DB if available)
export async function saveLessonProgressAction(
  userEmail?: string,
  lessonId?: string,
  isCompleted: boolean = true
) {
  if (!lessonId) return { success: false, error: 'ID de clase no proporcionado' };

  const cleanEmail = (userEmail || 'guest').toLowerCase().trim();
  const progressStore = readProgressStore();
  const userList = [...(progressStore[cleanEmail] || [])];

  if (isCompleted) {
    if (!userList.includes(lessonId)) {
      userList.push(lessonId);
    }
  } else {
    const idx = userList.indexOf(lessonId);
    if (idx >= 0) {
      userList.splice(idx, 1);
    }
  }

  progressStore[cleanEmail] = userList;
  writeProgressStore(progressStore);

  // Persist directly in Neon PostgreSQL (UserLessonCompletion table - no FK issues!)
  if (cleanEmail !== 'guest' && cleanEmail.includes('@')) {
    try {
      if (isCompleted) {
        await withDbTimeout(
          db.userLessonCompletion.upsert({
            where: { userEmail_lessonId: { userEmail: cleanEmail, lessonId } },
            update: { completedAt: new Date() },
            create: { userEmail: cleanEmail, lessonId },
          })
        );
      } else {
        await withDbTimeout(
          db.userLessonCompletion.deleteMany({
            where: { userEmail: cleanEmail, lessonId },
          })
        );
      }
    } catch (e) {
      console.warn('Error guardando avance en DB:', e);
    }
  }

  return { success: true, lessonId, isCompleted, completedLessonIds: userList };
}

// 3. Save / Update Job Application (Tracker)
export async function saveJobApplicationAction(
  userEmail: string = 'guest',
  application: {
    id?: string;
    company: string;
    role: string;
    status: string;
    salary?: string;
    date: string;
    nextStep?: string;
    notes?: string;
    jobUrl?: string;
    isFavorite?: boolean;
    interviewDate?: string;
  }
) {
  try {
    const user = await getOrCreateUser(userEmail);

    let savedApp;
    if (application.id && !application.id.startsWith('temp-')) {
      const existing = await db.jobApplication.findUnique({
        where: { id: application.id },
      });
      if (existing) {
        savedApp = await db.jobApplication.update({
          where: { id: application.id },
          data: {
            company: application.company,
            role: application.role,
            status: application.status,
            salary: application.salary || null,
            date: application.date,
            nextStep: application.nextStep || null,
            notes: application.notes || null,
            jobUrl: application.jobUrl || null,
            isFavorite: application.isFavorite ?? false,
            interviewDate: application.interviewDate ? new Date(application.interviewDate) : null,
          },
        });
      }
    }

    if (!savedApp) {
      savedApp = await db.jobApplication.create({
        data: {
          userId: user.id,
          company: application.company,
          role: application.role,
          status: application.status,
          salary: application.salary || null,
          date: application.date,
          nextStep: application.nextStep || null,
          notes: application.notes || null,
          jobUrl: application.jobUrl || null,
          isFavorite: application.isFavorite ?? false,
          interviewDate: application.interviewDate ? new Date(application.interviewDate) : null,
        },
      });
    }

    // If application has an interview date, automatically synchronize with CalendarEvent
    if (application.interviewDate) {
      const parsedDate = new Date(application.interviewDate);
      if (!isNaN(parsedDate.getTime())) {
        const yyyyMmDd = parsedDate.toISOString().split('T')[0]!;
        await db.calendarEvent.create({
          data: {
            userId: user.id,
            title: `💼 Entrevista con ${application.company} (${application.role})`,
            type: 'entrevista',
            date: yyyyMmDd,
            time: '15:00 hs (Arg)',
            company: application.company,
            notes: application.notes || 'Entrevista agendada desde el Tracker de postulaciones.',
            isGlobal: false,
          },
        });
      }
    }

    return {
      success: true,
      data: {
        id: savedApp.id,
        company: savedApp.company,
        role: savedApp.role,
        status: normalizeJobStatus(savedApp.status),
        salary: savedApp.salary || '',
        date: savedApp.date,
        nextStep: savedApp.nextStep || '',
        notes: savedApp.notes || '',
        jobUrl: savedApp.jobUrl || '',
        isFavorite: savedApp.isFavorite,
      },
    };
  } catch (error) {
    console.error('Error en saveJobApplicationAction:', error);
    return { success: false, error: 'No se pudo guardar la postulación en la base de datos.' };
  }
}

// 4. Delete Job Application (Tracker)
export async function deleteJobApplicationAction(
  userEmail: string = DEFAULT_DEMO_EMAIL,
  applicationId: string
) {
  try {
    const user = await getOrCreateUser(userEmail);
    await db.jobApplication.deleteMany({
      where: { id: applicationId, userId: user.id },
    });
    return { success: true, applicationId };
  } catch (error) {
    console.error('Error en deleteJobApplicationAction:', error);
    return { success: false, error: 'No se pudo eliminar la postulación.' };
  }
}

// 5. Toggle Job Application Favorite (Tracker)
export async function toggleJobApplicationFavoriteAction(
  userEmail: string = DEFAULT_DEMO_EMAIL,
  applicationId: string
) {
  try {
    const user = await getOrCreateUser(userEmail);
    const existing = await db.jobApplication.findFirst({
      where: { id: applicationId, userId: user.id },
    });

    if (existing) {
      const updated = await db.jobApplication.update({
        where: { id: applicationId },
        data: { isFavorite: !existing.isFavorite },
      });
      return { success: true, isFavorite: updated.isFavorite };
    }

    return { success: true, isFavorite: true };
  } catch (error) {
    console.error('Error en toggleJobApplicationFavoriteAction:', error);
    return { success: false, error: 'No se pudo actualizar el favorito.' };
  }
}

// 6. Save Calendar Event (Agenda)
export async function saveCalendarEventAction(
  userEmail: string = DEFAULT_DEMO_EMAIL,
  event: {
    id?: string;
    title: string;
    type: string;
    date: string;
    time: string;
    notes?: string;
    company?: string;
    zoomLink?: string;
  }
) {
  try {
    const user = await getOrCreateUser(userEmail);

    let savedEvent;
    if (event.id && !event.id.startsWith('temp-')) {
      const existing = await db.calendarEvent.findUnique({ where: { id: event.id } });
      if (existing) {
        savedEvent = await db.calendarEvent.update({
          where: { id: event.id },
          data: {
            title: event.title,
            type: event.type,
            date: event.date,
            time: event.time,
            notes: event.notes || null,
            company: event.company || null,
            zoomLink: event.zoomLink || null,
          },
        });
      }
    }

    if (!savedEvent) {
      savedEvent = await db.calendarEvent.create({
        data: {
          userId: user.id,
          title: event.title,
          type: event.type,
          date: event.date,
          time: event.time,
          notes: event.notes || null,
          company: event.company || null,
          zoomLink: event.zoomLink || null,
          isGlobal: false,
        },
      });
    }

    return {
      success: true,
      data: {
        id: savedEvent.id,
        title: savedEvent.title,
        type: savedEvent.type as CalendarEventType,
        date: savedEvent.date,
        time: savedEvent.time,
        notes: savedEvent.notes || '',
        company: savedEvent.company || '',
        zoomLink: savedEvent.zoomLink || '',
      },
    };
  } catch (error) {
    console.error('Error en saveCalendarEventAction:', error);
    return { success: false, error: 'No se pudo guardar el evento en la agenda.' };
  }
}

// 7. Delete Calendar Event (Agenda)
export async function deleteCalendarEventAction(
  userEmail: string = DEFAULT_DEMO_EMAIL,
  eventId: string
) {
  try {
    const user = await getOrCreateUser(userEmail);
    await db.calendarEvent.deleteMany({
      where: { id: eventId, userId: user.id },
    });
    return { success: true, eventId };
  } catch (error) {
    console.error('Error en deleteCalendarEventAction:', error);
    return { success: false, error: 'No se pudo eliminar el evento.' };
  }
}

// 8. Submit Quiz Evaluation (Aula / Player)
export async function submitQuizEvaluationAction(
  userEmail: string = DEFAULT_DEMO_EMAIL,
  moduleNumber: number,
  lessonId: string,
  score: number,
  isPassed: boolean,
  answers?: Record<string, number>
) {
  try {
    const user = await getOrCreateUser(userEmail);

    const submission = await db.quizSubmission.create({
      data: {
        userId: user.id,
        moduleNumber,
        lessonId,
        score,
        isPassed,
        answersJson: answers ? JSON.stringify(answers) : null,
      },
    });

    // If passed, mark the evaluation lesson as completed in DB
    if (isPassed) {
      await saveLessonProgressAction(userEmail, lessonId, true);
    }

    return {
      success: true,
      data: {
        id: submission.id,
        moduleNumber: submission.moduleNumber,
        score: submission.score,
        isPassed: submission.isPassed,
      },
    };
  } catch (error) {
    console.error('Error en submitQuizEvaluationAction:', error);
    return { success: false, error: 'No se pudo registrar la evaluación en la base de datos.' };
  }
}

// 9. Save Student Profile (Expediente del Alumno)
export async function saveStudentProfileAction(
  userEmail: string = DEFAULT_DEMO_EMAIL,
  profileData: {
    fullName?: string;
    linkedinUrl?: string;
    targetRole?: string;
    seniority?: string;
    modality?: string;
    expectedSalary?: string;
    cvFileName?: string;
  }
) {
  try {
    const user = await getOrCreateUser(userEmail);

    if (profileData.fullName && profileData.fullName !== user.name) {
      await db.user.update({
        where: { id: user.id },
        data: { name: profileData.fullName },
      });
    }

    const updatedProfile = await db.studentProfile.upsert({
      where: { userId: user.id },
      update: {
        linkedinUrl: profileData.linkedinUrl || undefined,
        targetRole: profileData.targetRole || undefined,
        seniority: profileData.seniority || undefined,
        modality: profileData.modality || undefined,
        expectedSalary: profileData.expectedSalary || undefined,
        cvFileName: profileData.cvFileName || undefined,
      },
      create: {
        userId: user.id,
        linkedinUrl: profileData.linkedinUrl || '',
        targetRole: profileData.targetRole || '',
        seniority: profileData.seniority || '',
        modality: profileData.modality || '',
        expectedSalary: profileData.expectedSalary || '',
        cvFileName: profileData.cvFileName || '',
        atsScore: 0,
        linkedinScore: 0,
        starScore: 0,
        negotiationScore: 0,
        networkingScore: 0,
      },
    });

    return { success: true, data: updatedProfile };
  } catch (error) {
    console.error('Error en saveStudentProfileAction:', error);
    return { success: false, error: 'No se pudo guardar el perfil del alumno.' };
  }
}

// 10. Update User Membership Tier (Dev Switch / VIP Management)
export async function updateUserMembershipTierAction(
  userEmail: string = DEFAULT_DEMO_EMAIL,
  tier: 'free' | 'trial' | 'paid'
) {
  const cleanEmail = (userEmail || DEFAULT_DEMO_EMAIL).toLowerCase().trim();
  const tierLabel = tier === 'paid' ? 'VIP' : tier === 'trial' ? 'TRIAL' : 'FREE';

  // Also persist in local/tmp users.json store (for resilience if DB times out)
  try {
    const filePath = getStoreFilePath('users.json');
    let parsed: any[] = [];
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const json = JSON.parse(content);
      if (Array.isArray(json)) parsed = json;
    }
    const idx = parsed.findIndex((u: any) => (u?.email || '').toLowerCase().trim() === cleanEmail);
    if (idx >= 0) {
      parsed[idx].membershipTier = tierLabel;
      parsed[idx].adminOverride = true;
    } else if (cleanEmail.includes('@')) {
      const now = new Date().toISOString();
      parsed.unshift({
        id: 'usr_' + Date.now().toString(36),
        email: cleanEmail,
        name: cleanEmail.split('@')[0] || 'Usuario',
        role: isSuperAdminEmail(cleanEmail) ? 'superadmin' : 'student',
        membershipTier: tierLabel,
        status: 'active',
        avatarUrl: null,
        createdAt: now,
        lastLoginAt: now,
        adminOverride: true,
      });
    }
    const writeTargets = [filePath, path.join('/tmp', 'fm_store', 'users.json')];
    for (const target of writeTargets) {
      try {
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, JSON.stringify(parsed, null, 2), 'utf-8');
        break;
      } catch {}
    }
  } catch {
    // ignore local write errors
  }

  try {
    const user = await getOrCreateUser(cleanEmail);
    const membershipTier = tier === 'paid' ? MembershipTier.VIP : MembershipTier.FREE;
    const headline = `${ADMIN_OVERRIDE_PREFIX}${tierLabel}`;

    await db.user.update({
      where: { id: user.id },
      data: {
        membershipTier,
        headline,
      },
    });

    return { success: true, membershipTier: tier };
  } catch (error) {
    console.error('Error en updateUserMembershipTierAction:', error);
    return { success: true, membershipTier: tier };
  }
}
