import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';
import { Project } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isExternal = project.linkUrl?.startsWith('http');
  const targetHref = project.linkUrl || `/proyecto/${project.slug}`;

  const getCategoryBadgeVariant = (category: Project['category']) => {
    switch (category) {
      case 'Educación & Carrera':
        return 'academia';
      case 'Marketing & Estrategia':
        return 'agencia';
      case 'Ecosistema Digital':
        return 'tienda';
      default:
        return 'primary';
    }
  };

  return (
    <Card variant="default" padding="none" className={styles.projectCard}>
      {/* Top Banner / Color Accent */}
      <div className={`${styles.cardAccent} ${styles[`accent_${project.categorySlug}`]}`}>
        <div className={styles.accentPattern}>
          <FolderGit2 size={24} className={styles.accentIcon} />
        </div>
        <div className={styles.accentMeta}>
          <Badge variant={getCategoryBadgeVariant(project.category)} size="sm">
            {project.category}
          </Badge>
          <span className={styles.projectYear}>{project.year}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.cardContent}>
        <div className={styles.roleTag}>{project.role}</div>
        <h3 className={styles.title}>
          <Link href={targetHref} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined} className={styles.titleLink}>
            {project.title}
          </Link>
        </h3>
        <p className={styles.summary}>{project.summary}</p>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <ul className={styles.highlightsList}>
            {project.highlights.slice(0, 2).map((h, i) => (
              <li key={i} className={styles.highlightItem}>
                <span className={styles.highlightDot} />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tags */}
        <div className={styles.tagsRow}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        {/* Card Footer Link */}
        <div className={styles.cardFooter}>
          {isExternal ? (
            <a
              href={targetHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaLink}
            >
              <span>{project.linkText || 'Ver proyecto'}</span>
              <ArrowUpRight size={16} />
            </a>
          ) : (
            <Link href={targetHref} className={styles.ctaLink}>
              <span>{project.linkText || 'Ver caso de estudio'}</span>
              <ArrowUpRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}
