'use client';

import React, { useState, useEffect } from 'react';
import { UserPlus, Shield } from 'lucide-react';

interface GoogleAccount {
  name: string;
  email: string;
  avatarUrl?: string;
}

export default function GoogleAuthPopupPage() {
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [isUsingAnother, setIsUsingAnother] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default suggested accounts from local storage or previous logins
  const [savedAccounts, setSavedAccounts] = useState<GoogleAccount[]>([
    {
      name: 'Santiago Morales',
      email: 'santiago.morales@ejemplo.com',
    },
  ]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('fm_ecosystem_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.email && parsed.email !== 'santiago.morales@ejemplo.com') {
          setSavedAccounts((prev) => [
            { name: parsed.name || 'Usuario', email: parsed.email },
            ...prev.filter((a) => a.email !== parsed.email),
          ]);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSelectAccount = (acc: GoogleAccount) => {
    setIsSubmitting(true);
    const profile = {
      name: acc.name,
      email: acc.email,
      avatarUrl: acc.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(acc.name)}&backgroundColor=EA580C,2563EB`,
    };

    // Send result to opener window
    if (window.opener) {
      window.opener.postMessage(
        {
          type: 'GOOGLE_AUTH_SUCCESS',
          profile,
        },
        window.location.origin
      );
      setTimeout(() => {
        window.close();
      }, 300);
    } else {
      // Fallback redirect if not opened as popup
      window.location.href = '/';
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!customEmail.trim() || !customEmail.includes('@')) {
      setError('Ingresá una dirección de correo de Google válida.');
      return;
    }

    const nameToUse = customName.trim() || customEmail.split('@')[0] || 'Usuario';
    const formattedName = nameToUse.charAt(0).toUpperCase() + nameToUse.slice(1);

    handleSelectAccount({
      name: formattedName,
      email: customEmail.toLowerCase().trim(),
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Google Logo */}
        <div style={styles.logoRow}>
          <svg viewBox="0 0 24 24" width="28" height="28">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        </div>

        <h1 style={styles.title}>Elegí una cuenta</h1>
        <p style={styles.subtitle}>
          para continuar en <strong>Ecosistema Flor Martínez</strong>
        </p>

        {error && <div style={styles.errorBox}>{error}</div>}

        {!isUsingAnother ? (
          <div style={styles.accountsList}>
            {savedAccounts.map((acc) => (
              <button
                key={acc.email}
                type="button"
                style={styles.accountItem}
                onClick={() => handleSelectAccount(acc)}
                disabled={isSubmitting}
              >
                <div style={styles.avatar}>
                  {acc.name.charAt(0).toUpperCase()}
                </div>
                <div style={styles.accInfo}>
                  <strong style={styles.accName}>{acc.name}</strong>
                  <span style={styles.accEmail}>{acc.email}</span>
                </div>
              </button>
            ))}

            <button
              type="button"
              style={styles.useAnotherBtn}
              onClick={() => setIsUsingAnother(true)}
              disabled={isSubmitting}
            >
              <div style={styles.useAnotherIcon}>
                <UserPlus size={18} color="#5F6368" />
              </div>
              <span style={styles.useAnotherText}>Usar otra cuenta</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleCustomSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nombre</label>
              <input
                type="text"
                placeholder="Tu nombre"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Correo de Google (@gmail.com)</label>
              <input
                type="email"
                placeholder="tu.cuenta@gmail.com"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                style={styles.input}
                autoFocus
                required
              />
            </div>

            <div style={styles.formActions}>
              <button
                type="button"
                style={styles.backBtn}
                onClick={() => setIsUsingAnother(false)}
                disabled={isSubmitting}
              >
                Volver
              </button>
              <button
                type="submit"
                style={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Iniciando...' : 'Continuar'}
              </button>
            </div>
          </form>
        )}

        <div style={styles.footerDisclaimer}>
          <Shield size={13} color="#5F6368" />
          <span>
            Para continuar, Google compartirá tu nombre, dirección de correo electrónico y foto de perfil con Flor Martínez.
          </span>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    fontFamily: '"Plus Jakarta Sans", "Roboto", Arial, sans-serif',
    padding: '1rem',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    border: '1px solid #DADCE0',
    padding: '2.25rem 2rem',
    boxSizing: 'border-box',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
    textAlign: 'center',
  },
  logoRow: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.45rem',
    fontWeight: 600,
    color: '#202124',
    margin: '0 0 0.4rem 0',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#5F6368',
    margin: '0 0 1.75rem 0',
  },
  errorBox: {
    backgroundColor: '#FCE8E6',
    color: '#C5221F',
    padding: '0.65rem 0.85rem',
    borderRadius: '4px',
    fontSize: '0.8125rem',
    marginBottom: '1rem',
    textAlign: 'left',
  },
  accountsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    marginBottom: '1.75rem',
    textAlign: 'left',
  },
  accountItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem',
    padding: '0.75rem 0.85rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'background-color 0.15s ease',
  },
  avatar: {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    backgroundColor: '#EA580C',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '1.05rem',
    flexShrink: 0,
  },
  accInfo: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    overflow: 'hidden',
  },
  accName: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#202124',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  accEmail: {
    fontSize: '0.8rem',
    color: '#5F6368',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  useAnotherBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem',
    padding: '0.75rem 0.85rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'background-color 0.15s ease',
  },
  useAnotherIcon: {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    border: '1px solid #DADCE0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  useAnotherText: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#3C4043',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1.75rem',
    textAlign: 'left',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
  },
  label: {
    fontSize: '0.8125rem',
    fontWeight: 600,
    color: '#3C4043',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.75rem 0.85rem',
    borderRadius: '4px',
    border: '1px solid #DADCE0',
    fontSize: '0.9rem',
    color: '#202124',
    outline: 'none',
  },
  formActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '0.5rem',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#1A73E8',
    fontWeight: 600,
    fontSize: '0.875rem',
    cursor: 'pointer',
    padding: '0.5rem 0.75rem',
  },
  submitBtn: {
    backgroundColor: '#1A73E8',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 600,
    fontSize: '0.875rem',
    padding: '0.65rem 1.4rem',
    cursor: 'pointer',
    boxShadow: '0 1px 2px rgba(60, 64, 67, 0.3)',
  },
  footerDisclaimer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
    paddingTop: '1.25rem',
    borderTop: '1px solid #F1F3F4',
    fontSize: '0.75rem',
    color: '#5F6368',
    lineHeight: 1.45,
    textAlign: 'left',
  },
};
