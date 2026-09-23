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
          role: Role.MEMBER,
          avatarUrl: avatarUrl || undefined,
        },
      });
    } else if (name || avatarUrl) {
      user = await db.user.update({
        where: { id: user.id },
        data: {
          ...(name ? { name: name.trim() } : {}),
          ...(avatarUrl ? { avatarUrl } : {}),
        },
      });
    }

    // Crear sesión de base de datos
    const sessionToken = 'sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 días

    await db.session.create({
      data: {
        sessionToken,
        userId: user.id,
        expires,
      },
    });

    // Guardar cookie
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
    console.warn('DB no conectada, utilizando fallback de sesión local/cookie:', e);
    const formattedEmail = email.toLowerCase().trim();
    const namePart = formattedEmail.split('@')[0] || 'Usuario';
    const formattedName = name?.trim() || (namePart.charAt(0).toUpperCase() + namePart.slice(1));
    const isSuperadmin =
      formattedEmail === 'santisose01@gmail.com' ||
      formattedEmail === 'licenciadaflormartinez@gmail.com';

    const fallbackUser = {
      id: 'local_' + Math.random().toString(36).substring(2, 9),
      name: formattedName,
      email: formattedEmail,
      role: isSuperadmin ? Role.ADMIN : Role.MEMBER,
      avatarUrl: avatarUrl || undefined,
    };

    const sessionPayload = Buffer.from(JSON.stringify(fallbackUser)).toString('base64');
    const sessionToken = 'mock_sess_' + sessionPayload;
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    try {
      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE, sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires,
        path: '/',
      });
    } catch {
      // ignorar error de cookie en entornos aislados
    }

    return {
      success: true,
      user: fallbackUser,
    };
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
    console.warn('DB no conectada al registrar, derivando a login con fallback local:', e);
    return loginUserAction(email, name);
  }
}

export async function getCurrentUserAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    if (token.startsWith('mock_sess_')) {
      try {
        const raw = Buffer.from(token.replace('mock_sess_', ''), 'base64').toString('utf8');
        const parsed = JSON.parse(raw);
        return {
          id: parsed.id || 'local_user',
          name: parsed.name || 'Usuario',
          email: parsed.email || '',
          role: parsed.role || Role.MEMBER,
          avatarUrl: parsed.avatarUrl,
          enrollments: [
            {
              courseId: 'cv-de-alto-impacto',
              status: 'ACTIVE',
            },
          ],
        };
      } catch {
        return null;
      }
    }

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
      if (!token.startsWith('mock_sess_')) {
        try {
          await db.session.deleteMany({ where: { sessionToken: token } });
        } catch {
          // ignore db error
        }
      }
      cookieStore.delete(SESSION_COOKIE);
    }
    return { success: true };
  } catch {
    return { success: false };
  }
}
