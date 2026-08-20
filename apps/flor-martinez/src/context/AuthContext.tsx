'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

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
  loginWithSocial: (provider: 'google' | 'linkedin') => Promise<boolean>;
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

  const saveUserSession = (userData: EcosystemUser | null) => {
    setUser(userData);
    if (userData) {
      const serialized = JSON.stringify(userData);
      localStorage.setItem(STORAGE_KEY, serialized);
      setCookie(COOKIE_KEY, serialized);
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
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 300));
    const namePart = email.split('@')[0] || 'Usuario';
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

    const newUser: EcosystemUser = {
      id: 'usr_' + Date.now(),
      name: formattedName,
      email,
      role: 'member',
      enrolledCourses: ['cv-de-alto-impacto'],
    };

    saveUserSession(newUser);
    setIsLoading(false);
    closeAuthModal();
    return true;
  };

  const loginWithSocial = async (provider: 'google' | 'linkedin'): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 300));

    const providerNames: Record<string, string> = {
      google: 'Usuario Google',
      linkedin: 'Profesional LinkedIn',
    };

    const newUser: EcosystemUser = {
      id: 'usr_' + provider + '_' + Date.now(),
      name: providerNames[provider] || 'Usuario Ecosistema',
      email: `${provider}.user@ecosistema.com`,
      role: 'student',
      enrolledCourses: ['cv-de-alto-impacto', 'linkedin-estrategico-y-marca-personal'],
    };

    saveUserSession(newUser);
    setIsLoading(false);
    closeAuthModal();
    return true;
  };

  const loginDemo = () => {
    const demoUser: EcosystemUser = {
      id: 'usr_demo_1',
      name: 'Santiago Morales',
      email: 'santiago.morales@ejemplo.com',
      role: 'student',
      enrolledCourses: ['cv-de-alto-impacto', 'linkedin-estrategico-y-marca-personal'],
    };
    saveUserSession(demoUser);
    closeAuthModal();
  };

  const register = async (name: string, email: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 300));

    const newUser: EcosystemUser = {
      id: 'usr_' + Date.now(),
      name: name || 'Nuevo Usuario',
      email,
      role: 'student',
      enrolledCourses: [],
    };

    saveUserSession(newUser);
    setIsLoading(false);
    closeAuthModal();
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
