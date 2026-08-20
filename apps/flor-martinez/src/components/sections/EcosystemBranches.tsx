import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, GraduationCap, Briefcase, ShoppingBag } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { ecosystemBranches } from '@/data/branches';
import styles from './EcosystemBranches.module.css';

export function EcosystemBranches() {
  const getBranchIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap size={28} />;
      case 'Briefcase':
        return <Briefcase size={28} />;
      case 'ShoppingBag':
        return <ShoppingBag size={28} />;
      default:
        return <GraduationCap size={28} />;
    }
  };

  return (
    <section className={styles.ecosystem} id="ecosistema">
      <Container size="wide">
        <SectionHeader
          badge="Unidades Especializadas"
          title="Las tres ramas del ecosistema Flor Martinez"
          subtitle="Una arquitectura de marca diseñada para brindar soluciones concretas a empresas, profesionales y organizaciones en distintas etapas."
        />

        <div className={styles.branchesGrid}>
          {ecosystemBranches.map((branch) => {
            const isActive = branch.status === 'active';
            const isExternal = branch.href.startsWith('http');

            return (
              <Card
                key={branch.id}
                variant="default"
                padding="none"
                className={`${styles.branchCard} ${styles[`card_${branch.id}`]}`}
              >
                {/* Header Banner */}
                <div className={styles.cardHeader}>
                  <div
                    className={styles.iconBox}
                    style={{
                      backgroundColor: `${branch.primaryColor}15`,
                      color: branch.primaryColor,
                    }}
                  >
                    {getBranchIcon(branch.icon)}
                  </div>
                  <div className={styles.statusBadgeWrap}>
                    <span
                      className={`${styles.statusBadge} ${
                        isActive ? styles.statusActive : styles.statusComing
                      }`}
                    >
                      {isActive && <span className={styles.activeDot} />}
                      {branch.statusLabel}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className={styles.cardBody}>
                  <div className={styles.badgeText}>{branch.badgeText}</div>
                  <h3 className={styles.branchName}>{branch.name}</h3>
                  <div className={styles.tagline}>{branch.tagline}</div>
                  <p className={styles.description}>{branch.description}</p>
                </div>

                {/* Card Action */}
                <div className={styles.cardFooter}>
                  {isActive ? (
                    <a
                      href={branch.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className={`${styles.ctaButton} ${styles.ctaActive}`}
                    >
                      <span>{branch.ctaText}</span>
                      <ArrowUpRight size={18} />
                    </a>
                  ) : (
                    <div className={styles.comingHolder}>
                      <span className={styles.comingNote}>En fase de preparación</span>
                      <Link href="/contacto" className={styles.consultLink}>
                        Consultar →
                      </Link>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
