'use server';

import { db, MembershipTier, Role } from '@repo/db';

export type JobApplicationStatus =
  | 'Postulado'
  | 'Entrevista RRHH'
  | 'Prueba Técnica'
  | 'Oferta Recibida'
  | 'Descartado';

export type CalendarEventType = 'zoom' | 'entrevista' | 'prueba' | 'seguimiento';

const DEFAULT_DEMO_EMAIL = 'santiago.morales@ejemplo.com';

// Helper to ensure demo user exists in DB
async function getOrCreateUser(email: string = DEFAULT_DEMO_EMAIL) {
  const formattedEmail = email.toLowerCase().trim();
  let user = await db.user.findUnique({
    where: { email: formattedEmail },
    include: {
      studentProfile: true,
      jobApplications: { orderBy: { createdAt: 'desc' } },
      calendarEvents: { orderBy: { date: 'asc' } },
      quizSubmissions: true,
    },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        email: formattedEmail,
        name: 'Santiago Morales',
        role: Role.STUDENT,
        membershipTier: MembershipTier.VIP,
        headline: 'Profesional en Desarrollo & Gestión',
        studentProfile: {
          create: {
            targetRole: 'Product Designer / UX Lead',
            seniority: 'Senior',
            modality: '100% Remoto (Latam / Global)',
            expectedSalary: '$2.200 USD / mes',
            linkedinUrl: 'https://linkedin.com/in/santiago-martinez-demo',
            cvFileName: 'CV_Santiago_Martinez_2026.pdf',
            atsScore: 85,
            linkedinScore: 70,
            starScore: 60,
            negotiationScore: 40,
            networkingScore: 55,
          },
        },
      },
      include: {
        studentProfile: true,
        jobApplications: { orderBy: { createdAt: 'desc' } },
        calendarEvents: { orderBy: { date: 'asc' } },
        quizSubmissions: true,
      },
    });
  }

  return user;
}

// 1. Get complete initial state for Campus Virtual
export async function getCampusInitialDataAction(userEmail?: string) {
  try {
    const user = await getOrCreateUser(userEmail);

    // Fetch all global calendar events (zooms) + user private events
    const globalEvents = await db.calendarEvent.findMany({
      where: { isGlobal: true },
      orderBy: { date: 'asc' },
    });

    const userEvents = await db.calendarEvent.findMany({
      where: { userId: user.id },
      orderBy: { date: 'asc' },
    });

    // Fetch user enrollments and completed lesson records
    const enrollments = await db.enrollment.findMany({
      where: { userId: user.id },
      include: {
        progressRecords: true,
        course: { select: { slug: true, title: true } },
      },
    });

    const completedLessonIds: string[] = [];
    enrollments.forEach((enr) => {
      enr.progressRecords.forEach((pr) => {
        if (pr.isCompleted) {
          completedLessonIds.push(pr.lessonId);
        }
      });
    });

    // Default seeded completed lessons if brand new user
    const finalCompletedSet = new Set(
      completedLessonIds.length > 0 ? completedLessonIds : ['exp-cv-01', 'exp-cv-02', 'ccv-01']
    );

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          membershipTier: user.membershipTier === MembershipTier.FREE ? 'free' : 'paid',
        },
        completedLessonIds: Array.from(finalCompletedSet),
        studentProfile: user.studentProfile || {
          targetRole: 'Product Designer / UX Lead',
          seniority: 'Senior',
          modality: '100% Remoto (Latam / Global)',
          expectedSalary: '$2.200 USD / mes',
          linkedinUrl: 'https://linkedin.com/in/santiago-martinez-demo',
          cvFileName: 'CV_Santiago_Martinez_2026.pdf',
          atsScore: 85,
          linkedinScore: 70,
          starScore: 60,
          negotiationScore: 40,
          networkingScore: 55,
        },
        jobApplications: user.jobApplications.map((app) => ({
          id: app.id,
          company: app.company,
          role: app.role,
          status: app.status as JobApplicationStatus,
          salary: app.salary || '',
          date: app.date,
          nextStep: app.nextStep || '',
          notes: app.notes || '',
          jobUrl: app.jobUrl || '',
          isFavorite: app.isFavorite,
        })),
        calendarEvents: [...globalEvents, ...userEvents].map((evt) => ({
          id: evt.id,
          title: evt.title,
          type: evt.type as CalendarEventType,
          date: evt.date,
          time: evt.time,
          notes: evt.notes || '',
          company: evt.company || '',
          zoomLink: evt.zoomLink || '',
        })),
        quizSubmissions: user.quizSubmissions.map((qs) => ({
          id: qs.id,
          moduleNumber: qs.moduleNumber,
          lessonId: qs.lessonId,
          score: qs.score,
          isPassed: qs.isPassed,
        })),
      },
    };
  } catch (error) {
    console.error('Error en getCampusInitialDataAction:', error);
    return {
      success: false,
      error: 'No se pudo cargar los datos iniciales del Campus desde la base de datos.',
    };
  }
}

// 2. Save / toggle lesson progress
export async function saveLessonProgressAction(
  userEmail: string = DEFAULT_DEMO_EMAIL,
  lessonId: string,
  isCompleted: boolean = true
) {
  try {
    const user = await getOrCreateUser(userEmail);

    // Find course or default first course
    const course = (await db.course.findFirst({
      where: { isPublished: true },
    })) || (await db.course.findFirst());

    if (!course) {
      return { success: true, lessonId, isCompleted };
    }

    const enrollment = await db.enrollment.upsert({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id,
        },
      },
      update: {},
      create: {
        userId: user.id,
        courseId: course.id,
        progressPercent: 15,
      },
    });

    // Check if lesson exists in DB
    let dbLesson = await db.lesson.findUnique({ where: { id: lessonId } });
    if (!dbLesson) {
      // Find by title or first lesson
      dbLesson = await db.lesson.findFirst();
    }

    if (dbLesson) {
      await db.lessonProgress.upsert({
        where: {
          enrollmentId_lessonId: {
            enrollmentId: enrollment.id,
            lessonId: dbLesson.id,
          },
        },
        update: {
          isCompleted,
          completedAt: new Date(),
        },
        create: {
          enrollmentId: enrollment.id,
          lessonId: dbLesson.id,
          isCompleted,
          completedAt: new Date(),
        },
      });
    }

    return { success: true, lessonId, isCompleted };
  } catch (error) {
    console.error('Error en saveLessonProgressAction:', error);
    return { success: false, error: 'Error al registrar progreso en la base de datos.' };
  }
}

// 3. Save / Update Job Application (Tracker)
export async function saveJobApplicationAction(
  userEmail: string = DEFAULT_DEMO_EMAIL,
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
        status: savedApp.status as JobApplicationStatus,
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
        linkedinUrl: profileData.linkedinUrl || 'https://linkedin.com/in/santiago-martinez-demo',
        targetRole: profileData.targetRole || 'Product Designer / UX Lead',
        seniority: profileData.seniority || 'Senior',
        modality: profileData.modality || '100% Remoto (Latam / Global)',
        expectedSalary: profileData.expectedSalary || '$2.200 USD / mes',
        cvFileName: profileData.cvFileName || 'CV_Santiago_Martinez_2026.pdf',
        atsScore: 85,
        linkedinScore: 70,
        starScore: 60,
        negotiationScore: 40,
        networkingScore: 55,
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
  tier: 'free' | 'paid'
) {
  try {
    const user = await getOrCreateUser(userEmail);
    const membershipTier = tier === 'free' ? MembershipTier.FREE : MembershipTier.VIP;

    await db.user.update({
      where: { id: user.id },
      data: { membershipTier },
    });

    return { success: true, membershipTier: tier };
  } catch (error) {
    console.error('Error en updateUserMembershipTierAction:', error);
    return { success: false, error: 'No se pudo actualizar la membresía en la base de datos.' };
  }
}
