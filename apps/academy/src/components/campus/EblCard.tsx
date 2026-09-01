'use client';

import React from 'react';
import {
  Sparkles,
  UserCheck,
  Table,
  Video,
  Calendar,
  BarChart3,
  FolderDown,
  Star,
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  HelpCircle,
  Globe,
  Mail,
  Mic,
  Award,
  File,
  Clock,
  UploadCloud,
  CalendarDays,
  BellRing,
  ShieldCheck,
  TrendingUp,
  BadgePercent,
  GraduationCap,
  Lock,
  Compass,
} from 'lucide-react';
import { LinkedinIcon } from '@/components/ui/Icons';
import { EblDashboardCard } from '@/data/eblDashboard';
import styles from './EblCard.module.css';

interface EblCardProps {
  card: EblDashboardCard;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onCardClick: (targetView: string) => void;
  isLocked?: boolean;
  hideProgress?: boolean;
  canFavorite?: boolean;
  layoutMode?: 'grid' | 'list';
}

export function EblCard({
  card,
  isFavorite,
  onToggleFavorite,
  onCardClick,
  isLocked = false,
  hideProgress = false,
  canFavorite = true,
  layoutMode = 'grid',
}: EblCardProps) {
  const isModule = card.type === 'modulo';

  // For modules: unified signature GraduationCap icon for all 5 modules.
  // For tools: specific tool icon.
  const renderLargeCardIcon = () => {
    if (isLocked) {
      return <Lock size={22} color="#64748B" />;
    }

    if (isModule) {
      return <GraduationCap size={24} color="#7C3AED" />;
    }

    const props = { size: 24, color: card.colorScheme.primary };
    switch (card.icon) {
      case 'UserCheck': return <UserCheck {...props} />;
      case 'Table': return <Table {...props} />;
      case 'Video': return <Video {...props} />;
      case 'Calendar': return <Calendar {...props} />;
      case 'BarChart3': return <BarChart3 {...props} />;
      case 'FolderDown': return <FolderDown {...props} />;
      case 'Compass': return <Compass {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  const renderFeatureIcon = (name: string) => {
    const props = { size: 13, className: styles.featIcon };
    switch (name) {
      case 'PlayCircle': return <PlayCircle {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'CheckCircle2': return <CheckCircle2 {...props} />;
      case 'Bot': return <Sparkles {...props} />;
      case 'HelpCircle': return <HelpCircle {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'Mail': return <Mail {...props} />;
      case 'Mic': return <Mic {...props} />;
      case 'Award': return <Award {...props} />;
      case 'File': return <File {...props} />;
      case 'Linkedin': return <LinkedinIcon size={13} className={styles.featIcon} />;
      case 'Clock': return <Clock {...props} />;
      case 'UploadCloud': return <UploadCloud {...props} />;
      case 'CalendarDays': return <CalendarDays {...props} />;
      case 'BellRing': return <BellRing {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'TrendingUp': return <TrendingUp {...props} />;
      case 'BadgePercent': return <BadgePercent {...props} />;
      default: return <CheckCircle2 {...props} />;
    }
  };

  const hasProgress = card.totalSteps !== undefined && card.completedSteps !== undefined;
  const progressPercent = hasProgress && card.totalSteps! > 0
    ? Math.round((card.completedSteps! / card.totalSteps!) * 100)
    : 0;

  // Dynamic Action Label based on completion status:
  // 0% -> "Empezar módulo x"
  // >0% and <100% -> "Continuar módulo x"
  // 100% -> "Ver módulo x"
  const getActionLabel = () => {
    if (isModule) {
      const modNumber = card.number ?? 1;
      const comp = card.completedSteps ?? 0;
      const total = card.totalSteps ?? 1;
      if (comp === 0) {
        return `Empezar módulo ${modNumber}`;
      }
      if (comp < total) {
        return `Continuar módulo ${modNumber}`;
      }
      return `Ver módulo ${modNumber}`;
    }
    return card.quickActionLabel;
  };

  const getCardBgStyle = () => {
    let topColor = card.colorScheme.primary || '#7C3AED';
    let topHoverColor = '#9333EA';
    let glowColor = 'rgba(124, 58, 237, 0.28)';
    let normalBg = 'linear-gradient(180deg, #F6EEFE 0%, #FAF5FF 30%, #FFFFFF 100%)';
    let borderColor = '#E9D5FF';

    if (isModule) {
      topColor = '#7C3AED';
      topHoverColor = '#9333EA';
      glowColor = 'rgba(147, 51, 234, 0.28)';
      normalBg = 'linear-gradient(180deg, #F6EEFE 0%, #FAF5FF 30%, #FFFFFF 100%)';
      borderColor = '#E9D5FF';
    } else if (card.id === 'tool-perfil' || card.targetView === 'perfil') {
      topColor = '#4338CA';
      topHoverColor = '#6366F1';
      glowColor = 'rgba(99, 102, 241, 0.28)';
      normalBg = 'linear-gradient(180deg, #EEF2FF 0%, #F5F7FF 30%, #FFFFFF 100%)';
      borderColor = '#C7D2FE';
    } else if (card.id === 'tool-tracker' || card.targetView === 'tracker') {
      topColor = '#0891B2';
      topHoverColor = '#06B6D4';
      glowColor = 'rgba(6, 182, 212, 0.28)';
      normalBg = 'linear-gradient(180deg, #ECFEFF 0%, #F0FDFD 30%, #FFFFFF 100%)';
      borderColor = '#A5F3FC';
    } else if (card.id === 'tool-zoom' || card.targetView === 'zoom') {
      topColor = '#2563EB';
      topHoverColor = '#3B82F6';
      glowColor = 'rgba(59, 130, 246, 0.28)';
      normalBg = 'linear-gradient(180deg, #EFF6FF 0%, #F5F9FF 30%, #FFFFFF 100%)';
      borderColor = '#BFDBFE';
    } else if (card.id === 'tool-agenda' || card.targetView === 'agenda') {
      topColor = '#EA580C';
      topHoverColor = '#F97316';
      glowColor = 'rgba(249, 115, 22, 0.28)';
      normalBg = 'linear-gradient(180deg, #FFF7ED 0%, #FFFAF0 30%, #FFFFFF 100%)';
      borderColor = '#FED7AA';
    } else if (card.id === 'tool-evaluaciones' || card.targetView === 'evaluaciones') {
      topColor = '#0D9488';
      topHoverColor = '#14B8A6';
      glowColor = 'rgba(20, 184, 166, 0.28)';
      normalBg = 'linear-gradient(180deg, #F0FDFA 0%, #F4FBF9 30%, #FFFFFF 100%)';
      borderColor = '#99F6E4';
    } else if (card.id === 'tool-recursos' || card.targetView === 'recursos') {
      topColor = '#D97706';
      topHoverColor = '#F59E0B';
      glowColor = 'rgba(245, 158, 11, 0.28)';
      normalBg = 'linear-gradient(180deg, #FEF3C7 0%, #FFFBEB 30%, #FFFFFF 100%)';
      borderColor = '#FDE68A';
    } else if (card.id === 'tool-vocacional' || card.targetView === 'test-vocacional') {
      topColor = '#EC4899';
      topHoverColor = '#F43F5E';
      glowColor = 'rgba(236, 72, 153, 0.28)';
      normalBg = 'linear-gradient(180deg, #FDF2F8 0%, #FFF1F2 30%, #FFFFFF 100%)';
      borderColor = '#FBCFE8';
    }

    if (isLocked) {
      return {
        '--card-top-color': '#CBD5E1',
        '--card-top-hover': '#334155',
        '--card-glow': 'rgba(51, 65, 85, 0.22)',
        borderTopColor: '#CBD5E1',
        borderTopWidth: '5px',
        borderTopStyle: 'solid' as const,
        background: 'linear-gradient(180deg, #F1F5F9 0%, #F8FAFC 45%, #FFFFFF 100%)',
        borderColor: '#E2E8F0',
      } as React.CSSProperties;
    }

    return {
      '--card-top-color': topColor,
      '--card-top-hover': topHoverColor,
      '--card-glow': glowColor,
      borderTopColor: topColor,
      borderTopWidth: '5px',
      borderTopStyle: 'solid' as const,
      background: normalBg,
      borderColor: borderColor,
    } as React.CSSProperties;
  };

  return (
    <div
      className={`${styles.card} ${layoutMode === 'list' ? styles.cardList : ''} ${isModule ? styles.cardModule : styles.cardTool} ${isFavorite ? styles.cardFavorite : ''} ${isLocked ? styles.cardLocked : ''}`}
      style={getCardBgStyle()}
      onClick={() => onCardClick(card.targetView)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onCardClick(card.targetView);
        }
      }}
    >
      {/* 1. Top Header Row */}
      <div className={styles.topRow}>
        <div className={styles.headerLeft}>
          {/* Large Standalone Icon */}
          <div
            className={`${styles.largeIconCircle} ${isLocked ? styles.iconCircleLocked : ''}`}
            style={
              isLocked
                ? undefined
                : {
                    backgroundColor: card.colorScheme.pillBg,
                    borderColor: card.colorScheme.border,
                  }
            }
          >
            {renderLargeCardIcon()}
          </div>

          {/* Module Pill / Category Tag + Sequence text */}
          <div className={styles.headerMeta}>
            {isModule ? (
              <>
                <div className={`${styles.modulePill} ${isLocked ? styles.pillLocked : ''}`}>
                  <span>{card.moduleStepLabel || `MÓDULO 0${card.number}`}</span>
                </div>
                <span className={styles.sequenceText}>{card.subtitle}</span>
              </>
            ) : (
              <span
                className={`${styles.toolCategoryPill} ${isLocked ? styles.pillLocked : ''}`}
                style={
                  isLocked
                    ? undefined
                    : {
                        backgroundColor: card.colorScheme.pillBg,
                        color: card.colorScheme.pillColor,
                      }
                }
              >
                {card.subtitle}
              </span>
            )}
          </div>
        </div>

        {/* Top Right Action: Status / Locked Badge + Star */}
        <div className={styles.topRightActions}>
          {isLocked ? (
            <span className={styles.lockedPill}>
              <Lock size={10} className={styles.lockedPillIcon} />
              <span>Requiere membresía</span>
            </span>
          ) : card.badge ? (
            <span
              className={styles.statusBadge}
              style={{
                backgroundColor: card.colorScheme.pillBg,
                color: card.colorScheme.pillColor,
              }}
            >
              {card.badge}
            </span>
          ) : null}

          {canFavorite && !isLocked && (
            <button
              type="button"
              className={`${styles.actionIconBtn} ${isFavorite ? styles.starActive : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(card.id);
              }}
              title={isFavorite ? 'Quitar de favoritos' : 'Marcar como favorito'}
              aria-label="Favorito"
            >
              <Star size={17} fill={isFavorite ? '#F59E0B' : 'none'} strokeWidth={isFavorite ? 0 : 2} />
            </button>
          )}
        </div>
      </div>

      {/* 2. Title & Description */}
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{card.title}</h3>
        <p className={styles.desc}>{card.description}</p>
      </div>

      {/* 3. Large & Centered Progress Bar (Hidden in Free Tier) */}
      {!hideProgress && hasProgress && (
        <div className={styles.centeredProgressBox}>
          <div className={styles.progressHeaderRow}>
            <span className={styles.progressMainText}>
              {progressPercent === 100
                ? '¡Módulo Completado!'
                : progressPercent > 0
                ? `${progressPercent}% Completado`
                : 'Sin iniciar'}
            </span>
            <span className={styles.progressSubText}>
              {card.completedSteps}/{card.totalSteps} pasos
            </span>
          </div>

          <div className={styles.largeProgressBarBg}>
            <div
              className={styles.largeProgressBarFill}
              style={{
                width: `${progressPercent}%`,
                background: progressPercent === 100
                  ? 'linear-gradient(90deg, #10B981 0%, #059669 100%)'
                  : 'linear-gradient(90deg, #8B5CF6 0%, #7C3AED 100%)',
              }}
            />
          </div>
        </div>
      )}

      {/* 4. Clean Features List (2 items) */}
      <div className={styles.featuresSection}>
        <ul className={styles.featuresList}>
          {card.features.map((feat, idx) => (
            <li key={idx} className={styles.featureItem}>
              {renderFeatureIcon(feat.iconName)}
              <span className={styles.featureLabel}>{feat.label}</span>
              {feat.badge && <span className={styles.featureBadge}>{feat.badge}</span>}
            </li>
          ))}
        </ul>
      </div>

      {/* 5. Footer Action with Dynamic CTA Label (Includes badges/star in list view) */}
      <div className={styles.cardFooter}>
        {layoutMode === 'list' && (
          <div className={styles.listBadgesWrap}>
            {isLocked ? (
              <span className={styles.lockedPill}>
                <Lock size={10} className={styles.lockedPillIcon} />
                <span>Requiere membresía</span>
              </span>
            ) : card.badge ? (
              <span
                className={styles.statusBadge}
                style={{
                  backgroundColor: card.colorScheme.pillBg,
                  color: card.colorScheme.pillColor,
                }}
              >
                {card.badge}
              </span>
            ) : null}

            {canFavorite && !isLocked && (
              <button
                type="button"
                className={`${styles.actionIconBtn} ${isFavorite ? styles.starActive : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(card.id);
                }}
                title={isFavorite ? 'Quitar de favoritos' : 'Marcar como favorito'}
                aria-label="Favorito"
              >
                <Star size={16} fill={isFavorite ? '#F59E0B' : 'none'} strokeWidth={isFavorite ? 0 : 2} />
              </button>
            )}
          </div>
        )}

        <span
          className={styles.actionText}
          style={{ color: isLocked ? '#64748B' : card.colorScheme.primary }}
        >
          {isLocked ? 'Desbloquear VIP' : getActionLabel()}
        </span>
        <div
          className={`${styles.arrowCircle} ${isLocked ? styles.arrowCircleLocked : ''}`}
          style={
            isLocked
              ? undefined
              : {
                  backgroundColor: card.colorScheme.pillBg,
                  color: card.colorScheme.primary,
                }
          }
        >
          {isLocked ? <Lock size={12} /> : <ArrowRight size={13} />}
        </div>
      </div>
    </div>
  );
}
