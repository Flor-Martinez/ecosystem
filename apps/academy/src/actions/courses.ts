'use server';

import { db, CourseCategory, CourseLevel, Prisma } from '@repo/db';

export async function getCoursesAction(filters?: { category?: string; level?: string; search?: string }) {
  try {
    const where: Prisma.CourseWhereInput = { isPublished: true };

    if (filters?.category && filters.category !== 'todos') {
      const enumVal = Object.keys(CourseCategory).find(
        (k) => k.toLowerCase() === filters.category?.toLowerCase()
      );
      if (enumVal) {
        where.category = enumVal as CourseCategory;
      }
    }

    if (filters?.level && filters.level !== 'todos') {
      const enumVal = Object.keys(CourseLevel).find(
        (k) => k.toLowerCase() === filters.level?.toLowerCase()
      );
      if (enumVal) {
        where.level = enumVal as CourseLevel;
      }
    }

    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { tagline: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const courses = await db.course.findMany({
      where,
      orderBy: { orderIndex: 'asc' },
      include: {
        modules: {
          select: {
            id: true,
            title: true,
            lessons: {
              select: {
                id: true,
                title: true,
                durationMinutes: true,
                isFreePreview: true,
              },
            },
          },
        },
      },
    });

    return { success: true, data: courses };
  } catch (error) {
    console.error('Error al obtener cursos desde la base de datos:', error);
    return { success: false, error: 'No se pudieron cargar los cursos.' };
  }
}

export async function getCourseBySlugAction(slug: string) {
  try {
    const course = await db.course.findUnique({
      where: { slug },
      include: {
        modules: {
          orderBy: { orderIndex: 'asc' },
          include: {
            lessons: {
              orderBy: { orderIndex: 'asc' },
            },
          },
        },
      },
    });

    if (!course) {
      return { success: false, error: 'Curso no encontrado.' };
    }

    return { success: true, data: course };
  } catch (error) {
    console.error('Error al obtener curso por slug:', error);
    return { success: false, error: 'Error al consultar el curso.' };
  }
}

export async function enrollStudentAction(userId: string, courseSlug: string) {
  try {
    const course = await db.course.findUnique({ where: { slug: courseSlug } });
    if (!course) {
      return { success: false, error: 'Curso no válido.' };
    }

    const enrollment = await db.enrollment.upsert({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id,
        },
      },
      update: {},
      create: {
        userId,
        courseId: course.id,
        progressPercent: 0,
      },
    });

    return { success: true, data: enrollment };
  } catch (error) {
    console.error('Error al inscribir alumno:', error);
    return { success: false, error: 'No se pudo completar la inscripción.' };
  }
}
