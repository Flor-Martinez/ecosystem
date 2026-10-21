'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { loginUserAction, registerUserAction } from '@/actions/auth';

export interface EcosystemUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'student' | 'client' | 'member';
  enrolledCourses?: string[];
}

interface AuthContextType {
  user: EcosystemUser | null;
  isLoading: boolean;
  isModalOpen: boolean;
  openAuthModal: (initialTab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  modalTab: 'login' | 'register';
  setModalTab: (tab: 'login' | 'register') => void;
  login: (email: string, password?: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithSocial: (provider: 'google', customEmail?: string, customName?: string, customAvatar?: string) => Promise<boolean>;
  loginDemo: () => void;
  register: (name: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'fm_ecosystem_user';
const COOKIE_KEY = 'fm_ecosystem_session_data';

// Helper to read cookie accurately
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split(';');
  for (let c of cookies) {
    c = c.trim();
    if (c.startsWith(name + '=')) {
      const val = c.substring(name.length + 1);
      if (!val || val === 'null' || val === 'undefined' || val === '""') return null;
      try {
        return decodeURIComponent(val);
      } catch {
        return val;
      }
    }
  }
  return null;
}

// Helper to write/delete cookie accurately across ports & subdomains
function setCookie(name: string, value: string | null, days = 30) {
  if (typeof document === 'undefined') return;
  if (!value) {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; SameSite=Lax`;
  } else {
    const maxAge = days * 24 * 60 * 60;
    const expires = new Date(Date.now() + maxAge * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires}; max-age=${maxAge}; SameSite=Lax`;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<EcosystemUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTab, setModalTab] = useState<'login' | 'register'>('login');
  const channelRef = useRef<BroadcastChannel | null>(null);

  // Sync state using the Shared Cookie as Single Source of Truth
  const syncSession = useCallback(() => {
    try {
      const cookieData = getCookie(COOKIE_KEY);
      if (cookieData) {
        try {
          const parsed: EcosystemUser = JSON.parse(cookieData);
          if (parsed && parsed.email) {
            setUser((prev) => {
              if (!prev || prev.email !== parsed.email || prev.name !== parsed.name) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
                return parsed;
              }
              return prev;
            });
            setIsLoading(false);
            return;
          }
        } catch {
          // Invalid cookie data
        }
      }

      // If cookie is empty or missing -> user is logged out everywhere
      setUser((prev) => {
        if (prev !== null) {
          localStorage.removeItem(STORAGE_KEY);
          return null;
        }
        return null;
      });
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Error syncing ecosystem session', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Broadcast & Sync listeners
  useEffect(() => {
    // 1. Initial sync
    syncSession();

    // 2. Setup BroadcastChannel for 0ms cross-tab notifications
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        const bc = new BroadcastChannel('fm_ecosystem_auth_sync');
        channelRef.current = bc;
        bc.onmessage = (event) => {
          if (event.data?.type === 'AUTH_STATE_CHANGED') {
            syncSession();
          }
        };
      } catch (e) {
        console.warn('BroadcastChannel not available', e);
      }
    }

    // 3. Listen for window focus & visibility
    const handleFocus = () => syncSession();
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        syncSession();
      }
    };
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        syncSession();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('storage', handleStorage);

    // 4. Fast 400ms polling heartbeat for live side-by-side browser windows
    const interval = setInterval(syncSession, 400);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
      if (channelRef.current) {
        channelRef.current.close();
      }
    };
  }, [syncSession]);

  useEffect(() => {
    if (user && isModalOpen) {
      setIsModalOpen(false);
    }
  }, [user, isModalOpen]);

  const saveUserSession = (userData: EcosystemUser | null) => {
    setUser(userData);
    if (userData) {
      const serialized = JSON.stringify(userData);
      localStorage.setItem(STORAGE_KEY, serialized);
      setCookie(COOKIE_KEY, serialized);
      setIsModalOpen(false);
    } else {
      localStorage.removeItem(STORAGE_KEY);
      setCookie(COOKIE_KEY, null);
    }

    // Notify all other open windows/tabs immediately
    try {
      channelRef.current?.postMessage({
        type: 'AUTH_STATE_CHANGED',
        user: userData,
        timestamp: Date.now(),
      });
    } catch {
      // Ignore broadcast errors
    }
  };

  const openAuthModal = useCallback((initialTab: 'login' | 'register' = 'login') => {
    setModalTab(initialTab);
    setIsModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const login = async (email: string): Promise<boolean> => {
    const formattedEmail = (email || '').toLowerCase().trim();
    if (!formattedEmail || !formattedEmail.includes('@')) {
      setIsLoading(false);
      return false;
    }

    setIsLoading(true);
    const namePart = formattedEmail.split('@')[0] || 'Usuario';
    const defaultName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const immediateUser: EcosystemUser = {
      id: 'usr_' + Math.random().toString(36).substring(2, 10),
      name: defaultName,
      email: formattedEmail,
      role: 'student',
      enrolledCourses: ['cv-de-alto-impacto', 'linkedin-estrategico-y-marca-personal'],
    };

    saveUserSession(immediateUser);
    setIsLoading(false);
    closeAuthModal();

    void (async () => {
      try {
        const res = await loginUserAction(formattedEmail);
        if (res && res.success && res.user) {
          saveUserSession({
            id: res.user.id || immediateUser.id,
            name: res.user.name || defaultName,
            email: res.user.email || formattedEmail,
            avatarUrl: res.user.avatarUrl || undefined,
            role: 'student',
            enrolledCourses: ['cv-de-alto-impacto', 'linkedin-estrategico-y-marca-personal'],
          });
        }
      } catch (e) {
        console.warn('Persistencia en servidor pospuesta (login store):', e);
      }
    })();

    return true;
  };

  const loginWithSocial = async (
    provider: 'google',
    customEmail?: string,
    customName?: string,
    customAvatar?: string
  ): Promise<boolean> => {
    const emailToUse = (customEmail || '').toLowerCase().trim();
    if (!emailToUse) {
      setIsLoading(false);
      return false;
    }

    setIsLoading(true);
    const namePart = emailToUse.split('@')[0] || 'Usuario';
    const nameToUse: string = customName?.trim() || (namePart.charAt(0).toUpperCase() + namePart.slice(1));
    const avatarToUse: string =
      customAvatar ||
      `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(nameToUse)}&backgroundColor=EA580C,2563EB`;

    const userToSave: EcosystemUser = {
      id: 'usr_' + Math.random().toString(36).substring(2, 10),
      name: nameToUse,
      email: emailToUse,
      avatarUrl: avatarToUse,
      role: 'student',
      enrolledCourses: ['cv-de-alto-impacto', 'linkedin-estrategico-y-marca-personal'],
    };

    saveUserSession(userToSave);
    setIsLoading(false);
    closeAuthModal();

    void (async () => {
      try {
        const res = await loginUserAction(emailToUse, nameToUse, avatarToUse);
        if (res && res.success && res.user) {
          saveUserSession({
            id: res.user.id || userToSave.id,
            name: res.user.name || nameToUse,
            email: res.user.email || emailToUse,
            avatarUrl: res.user.avatarUrl || avatarToUse,
            role: 'student',
            enrolledCourses: ['cv-de-alto-impacto', 'linkedin-estrategico-y-marca-personal'],
          });
        }
      } catch (e) {
        console.warn('Persistencia en servidor pospuesta (google store):', e);
      }
    })();

    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve(false);
        return;
      }

      const width = 500;
      const height = 620;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        '/auth/google',
        'GoogleLoginPopup',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes,status=no,toolbar=no,menubar=no`
      );

      if (!popup) {
        console.warn('Popup blocked by browser, redirecting...');
        window.location.href = '/auth/google';
        resolve(false);
        return;
      }

      const handleAuthMessage = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        if (event.data?.type === 'GOOGLE_AUTH_SUCCESS') {
          window.removeEventListener('message', handleAuthMessage);
          const { profile } = event.data;
          const ok = await loginWithSocial('google', profile.email, profile.name, profile.avatarUrl);
          resolve(ok);
        }
      };

      window.addEventListener('message', handleAuthMessage);

      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleAuthMessage);
          resolve(false);
        }
      }, 500);
    });
  };

  const loginDemo = () => {
    const demoUser: EcosystemUser = {
      id: 'usr_demo_1',
      name: 'Santiago Morales',
      email: 'santiago.morales@ejemplo.com',
      avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Santiago%20Morales&backgroundColor=EA580C,2563EB',
      role: 'student',
      enrolledCourses: ['cv-de-alto-impacto', 'linkedin-estrategico-y-marca-personal'],
    };
    saveUserSession(demoUser);
    closeAuthModal();
  };

  const register = async (name: string, email: string): Promise<boolean> => {
    const formattedEmail = (email || '').toLowerCase().trim();
    const formattedName = (name || '').trim();
    if (!formattedName || !formattedEmail || !formattedEmail.includes('@')) {
      setIsLoading(false);
      return false;
    }

    setIsLoading(true);
    const immediateUser: EcosystemUser = {
      id: 'usr_' + Math.random().toString(36).substring(2, 10),
      name: formattedName,
      email: formattedEmail,
      role: 'student',
      enrolledCourses: ['cv-de-alto-impacto', 'linkedin-estrategico-y-marca-personal'],
    };

    saveUserSession(immediateUser);
    setIsLoading(false);
    closeAuthModal();

    void (async () => {
      try {
        const res = await registerUserAction(formattedName, formattedEmail);
        if (res && res.success && res.user) {
          saveUserSession({
            id: res.user.id || immediateUser.id,
            name: res.user.name || formattedName,
            email: res.user.email || formattedEmail,
            role: 'student',
            enrolledCourses: ['cv-de-alto-impacto', 'linkedin-estrategico-y-marca-personal'],
          });
        }
      } catch (e) {
        console.warn('Persistencia en servidor pospuesta (register store):', e);
      }
    })();

    return true;
  };

  const logout = () => {
    saveUserSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isModalOpen,
        openAuthModal,
        closeAuthModal,
        modalTab,
        setModalTab,
        login,
        loginWithGoogle,
        loginWithSocial,
        loginDemo,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useEcosystemAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useEcosystemAuth must be used within an AuthProvider');
  }
  return context;
}

export const useAuth = useEcosystemAuth;
