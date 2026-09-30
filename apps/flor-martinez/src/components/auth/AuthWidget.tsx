'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, LogOut, ChevronDown, GraduationCap, ShoppingBag, Briefcase, Sparkles, Globe, ShieldCheck } from 'lucide-react';
import { useEcosystemAuth } from '@/context/AuthContext';
import styles from './AuthWidget.module.css';

export function AuthWidget() {
  const { user, isSuperAdmin, openAuthModal, logout } = useEcosystemAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return (
      <div className={styles.authWrapper}>
        <button
          type="button"
          onClick={() => openAuthModal('login')}
          className={styles.loginBtn}
          title="Ingresar al Ecosistema Flor Martinez"
        >
          <User size={13} className={styles.userIcon} />
          <span>Ingresar</span>
        </button>
      </div>
    );
  }

  // Get user initials
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const firstName = user.name.split(' ')[0];

  return (
    <div className={styles.authWrapper} ref={dropdownRef}>
      {isSuperAdmin && (
        <Link
          href="/admin"
          className={styles.adminBtn}
          title="Ir al Panel de Administración"
        >
          <ShieldCheck size={13} className={styles.adminIcon} />
          <span>Panel Admin</span>
        </Link>
      )}

      <button
        type="button"
        className={`${styles.userBtn} ${dropdownOpen ? styles.userBtnActive : ''}`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
        aria-label="Menú de cuenta de usuario"
      >
        <div className={styles.avatarCircle}>
          <span>{initials}</span>
        </div>
        <span className={styles.userName}>{firstName}</span>
        <ChevronDown size={12} className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ''}`} />
      </button>

      {dropdownOpen && (
        <div className={styles.dropdownPopover} role="menu">
          {/* Header */}
          <div className={styles.dropdownHeader}>
            <div className={styles.dropdownAvatarLarge}>
              <span>{initials}</span>
            </div>
            <div className={styles.dropdownMeta}>
              <strong className={styles.dropdownFullName}>{user.name}</strong>
              <span className={styles.dropdownEmail}>{user.email}</span>
              <span className={styles.memberBadge}>
                <Sparkles size={10} />
                Miembro Ecosistema
              </span>
            </div>
          </div>

          {/* Quick Ecosystem Hub Links */}
          <div className={styles.dropdownSection}>
            <span className={styles.sectionHeading}>Accesos del Ecosistema</span>

            {isSuperAdmin && (
              <Link
                href="/admin"
                className={styles.menuItem}
                onClick={() => setDropdownOpen(false)}
                style={{ backgroundColor: '#FEF3C7', border: '1px solid #FDE68A' }}
              >
                <div className={styles.menuIconBox} style={{ backgroundColor: '#D97706', color: '#FFFFFF' }}>
                  <ShieldCheck size={14} />
                </div>
                <div className={styles.menuItemText}>
                  <strong style={{ color: '#92400E' }}>Panel Admin ⚡</strong>
                  <span style={{ color: '#B45309' }}>Gestión de clientes, licencias y CVs</span>
                </div>
              </Link>
            )}

            <Link
              href="/"
              className={styles.menuItem}
              onClick={() => setDropdownOpen(false)}
            >
              <div className={`${styles.menuIconBox} ${styles.iconPortfolio}`}>
                <Globe size={14} />
              </div>
              <div className={styles.menuItemText}>
                <strong>Portfolio & Hub Flor Martinez</strong>
                <span>Página principal y biografía</span>
              </div>
            </Link>
            
            <Link
              href="/proyecto/academia-flor-martinez"
              className={styles.menuItem}
              onClick={() => setDropdownOpen(false)}
            >
              <div className={`${styles.menuIconBox} ${styles.iconAcademia}`}>
                <GraduationCap size={14} />
              </div>
              <div className={styles.menuItemText}>
                <strong>Academia Flor Martinez</strong>
                <span>Propuesta & desarrollo</span>
              </div>
            </Link>

            <Link
              href="/proyecto/tienda-flor-martinez"
              className={styles.menuItem}
              onClick={() => setDropdownOpen(false)}
            >
              <div className={`${styles.menuIconBox} ${styles.iconTienda}`}>
                <ShoppingBag size={14} />
              </div>
              <div className={styles.menuItemText}>
                <strong>Tienda & Merchandising</strong>
                <span>Mis pedidos & kits</span>
              </div>
            </Link>

            <Link
              href="/proyecto/agencia-flor-martinez"
              className={styles.menuItem}
              onClick={() => setDropdownOpen(false)}
            >
              <div className={`${styles.menuIconBox} ${styles.iconAgencia}`}>
                <Briefcase size={14} />
              </div>
              <div className={styles.menuItemText}>
                <strong>Agencia & Consultoría</strong>
                <span>Servicios y propuestas</span>
              </div>
            </Link>
          </div>

          <div className={styles.dropdownDivider} />

          {/* Footer Action */}
          <div className={styles.dropdownFooter}>
            <button
              type="button"
              className={styles.logoutBtn}
              onClick={() => {
                logout();
                setDropdownOpen(false);
              }}
            >
              <LogOut size={14} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
