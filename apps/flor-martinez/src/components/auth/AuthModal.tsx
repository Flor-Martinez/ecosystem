'use client';

import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Sparkles, GraduationCap, ShoppingBag, Briefcase, CheckCircle2 } from 'lucide-react';
import { useEcosystemAuth } from '@/context/AuthContext';
import styles from './AuthModal.module.css';

export function AuthModal() {
  const { isModalOpen, closeAuthModal, modalTab, setModalTab, login, register, loginWithSocial, loginDemo, isLoading } = useEcosystemAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Por favor, ingresá un correo electrónico válido.');
      return;
    }

    try {
      if (modalTab === 'login') {
        await login(email, password);
      } else {
        if (!name.trim()) {
          setError('Por favor, ingresá tu nombre completo.');
          return;
        }
        await register(name, email, password);
      }
    } catch {
      setError('Ocurrió un error al procesar el acceso. Intentá nuevamente.');
    }
  };

  return (
    <div className={styles.overlay} onClick={closeAuthModal} role="dialog" aria-modal="true">
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className={styles.closeBtn}
          onClick={closeAuthModal}
          aria-label="Cerrar modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className={styles.header}>
          <div className={styles.monogramRow}>
            <div className={styles.monogramBox}>
              <span className={styles.letterF}>F</span>
              <span className={styles.letterM}>M</span>
            </div>
            <div className={styles.headerText}>
              <span className={styles.brandTitle}>ECOSISTEMA FLOR MARTINEZ</span>
              <span className={styles.singleAccountBadge}>
                <Sparkles size={11} />
                Acceso Único Global (SSO)
              </span>
            </div>
          </div>

          <h2 className={styles.title}>
            {modalTab === 'login' ? 'Iniciar Sesión' : 'Crear tu Cuenta'}
          </h2>
          <p className={styles.subtitle}>
            Una sola cuenta para gestionar tus cursos en la <strong>Academia</strong>, tus compras en la <strong>Tienda</strong> y tus proyectos en la <strong>Agencia</strong>.
          </p>
        </div>

        {/* Ecosystem branches indicator banner */}
        <div className={styles.ecosystemBanner}>
          <div className={styles.bannerItem}>
            <GraduationCap size={13} className={styles.iconAcademia} />
            <span>Academia</span>
          </div>
          <span className={styles.bannerDot}>•</span>
          <div className={styles.bannerItem}>
            <ShoppingBag size={13} className={styles.iconTienda} />
            <span>Tienda</span>
          </div>
          <span className={styles.bannerDot}>•</span>
          <div className={styles.bannerItem}>
            <Briefcase size={13} className={styles.iconAgencia} />
            <span>Agencia</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className={styles.tabSwitcher}>
          <button
            type="button"
            className={`${styles.tabBtn} ${modalTab === 'login' ? styles.tabBtnActive : ''}`}
            onClick={() => {
              setModalTab('login');
              setError(null);
            }}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${modalTab === 'register' ? styles.tabBtnActive : ''}`}
            onClick={() => {
              setModalTab('register');
              setError(null);
            }}
          >
            Registrarme
          </button>
        </div>

        {/* Social SSO Buttons */}
        <div className={styles.socialGroup}>
          <button
            type="button"
            className={styles.socialBtn}
            onClick={() => loginWithSocial('google')}
            disabled={isLoading}
          >
            <svg className={styles.socialIcon} viewBox="0 0 24 24" width="18" height="18">
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
            <span>Continuar con Google</span>
          </button>

          <button
            type="button"
            className={`${styles.socialBtn} ${styles.linkedinBtn}`}
            onClick={() => loginWithSocial('linkedin')}
            disabled={isLoading}
          >
            <svg className={styles.socialIcon} viewBox="0 0 24 24" width="18" height="18" fill="#0077B5">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <span>Continuar con LinkedIn</span>
          </button>
        </div>

        {/* Divider */}
        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>o con tu correo</span>
          <span className={styles.dividerLine} />
        </div>

        {/* Error Alert */}
        {error && (
          <div className={styles.errorAlert} role="alert">
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {modalTab === 'register' && (
            <div className={styles.inputGroup}>
              <label className={styles.label}>Nombre Completo</label>
              <div className={styles.inputWrapper}>
                <User size={16} className={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Ej. Santiago Morales"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
            </div>
          )}

          <div className={styles.inputGroup}>
            <label className={styles.label}>Correo Electrónico</label>
            <div className={styles.inputWrapper}>
              <Mail size={16} className={styles.inputIcon} />
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Contraseña</label>
            <div className={styles.inputWrapper}>
              <Lock size={16} className={styles.inputIcon} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            <span>{isLoading ? 'Conectando...' : modalTab === 'login' ? 'Acceder al Ecosistema' : 'Registrar Cuenta'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Demo Fast Access Pill */}
        <div className={styles.demoBox}>
          <span className={styles.demoLabel}>⚡ Modo Prueba Rápida:</span>
          <button type="button" onClick={loginDemo} className={styles.demoBtn}>
            <CheckCircle2 size={13} />
            <span>Simular login de alumno (1 clic)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
