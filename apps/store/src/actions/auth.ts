'use server';

import { cookies } from 'next/headers';
import { db, Role } from '@repo/db';

const SESSION_COOKIE = 'fm_session_token';

export async function loginUserAction(email: string, name?: string, avatarUrl?: string) {
  if (!email || !email.includes('@')) {
    return { success: false, error: 'Ingresá un correo electrónico válido.' };
  }

  try {
    const formattedEmail = email.toLowerCase().trim();
    let user = await db.user.findUnique({
      where: { email: formattedEmail },
    });

    if (!user) {
      const namePart = formattedEmail.split('@')[0] || 'Usuario';
      const formattedName = name?.trim() || (namePart.charAt(0).toUpperCase() + namePart.slice(1));
      user = await db.user.create({
        data: {
          email: formattedEmail,
          name: formattedName,
          role: Role.STUDENT,
          membershipTier: 'VIP',
          avatarUrl: avatarUrl || undefined,
        },
      });

      try {
        await db.studentProfile.create({
          data: {
            userId: user.id,
            targetRole: 'Profesional en Búsqueda Activa',
            seniority: 'Semi-Senior',
            modality: 'Remoto / Híbrido',
            linkedinScore: 75,
            atsScore: 78,
          },
        });
      } catch {
        // profile already exists or error
      }
    } else if (name || avatarUrl) {
      // Update avatar or name if provided
      user = await db.user.update({
        where: { id: user.id },
        data: {
          ...(name ? { name: name.trim() } : {}),
          ...(avatarUrl ? { avatarUrl } : {}),
        },
      });
    }

    const sessionToken = 'sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await db.session.create({
      data: {
        sessionToken,
        userId: user.id,
        expires,
      },
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires,
      path: '/',
    });

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl || avatarUrl,
      },
    };
  } catch (e) {
    console.error('Error en loginUserAction:', e);
    return { success: false, error: 'Error al iniciar sesión en el servidor.' };
  }
}

export async function registerUserAction(name: string, email: string) {
  if (!name || !email) {
    return { success: false, error: 'Todos los campos son obligatorios.' };
  }

  try {
    const formattedEmail = email.toLowerCase().trim();
    const existing = await db.user.findUnique({ where: { email: formattedEmail } });
    if (existing) {
      return loginUserAction(formattedEmail);
    }

    const user = await db.user.create({
      data: {
        name: name.trim(),
        email: formattedEmail,
        role: Role.STUDENT,
        membershipTier: 'VIP',
      },
    });

    const sessionToken = 'sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await db.session.create({
      data: {
        sessionToken,
        userId: user.id,
        expires,
      },
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires,
      path: '/',
    });

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (e) {
    console.error('Error en registerUserAction:', e);
    return { success: false, error: 'Error al registrar usuario en el servidor.' };
  }
}

export async function getCurrentUserAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    const session = await db.session.findUnique({
      where: { sessionToken: token },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            avatarUrl: true,
            enrollments: {
              select: {
                courseId: true,
                status: true,
                progressPercent: true,
              },
            },
          },
        },
      },
    });

    if (!session || session.expires < new Date()) {
      return null;
    }

    return session.user;
  } catch {
    return null;
  }
}

export async function logoutUserAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (token) {
      await db.session.deleteMany({ where: { sessionToken: token } });
      cookieStore.delete(SESSION_COOKIE);
    }
    return { success: true };
  } catch {
    return { success: false };
  }
}
