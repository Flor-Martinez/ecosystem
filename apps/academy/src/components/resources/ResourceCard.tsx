import React from 'react';
import Link from 'next/link';
import { FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { Resource } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import styles from './ResourceCard.module.css';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.typeBadge}>
          <FileText size={13} className={styles.typeIcon} />
          <span>{resource.type}</span>
        </div>

        <div className={styles.topRightTags}>
          <span className={styles.freePill}>100% Gratis</span>
          {resource.badge && (
            <Badge variant="primary" size="sm">
              {resource.badge}
            </Badge>
          )}
        </div>
      </div>

      <div className={styles.contentBody}>
        <span className={styles.categoryLabel}>{resource.category}</span>

        <h3 className={styles.title}>
          <Link href={`/recursos/${resource.slug}`} className={styles.titleLink}>
            {resource.title}
          </Link>
        </h3>

        <p className={styles.tagline}>{resource.tagline}</p>

        {resource.highlights && resource.highlights.length > 0 && (
          <ul className={styles.highlightsList}>
            {resource.highlights.slice(0, 2).map((highlight, idx) => (
              <li key={idx} className={styles.highlightItem}>
                <CheckCircle2 size={13} className={styles.checkIcon} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {resource.instagramReference && (
        <div className={styles.instagramRow}>
          <InstagramIcon size={13} className={styles.igIcon} />
          <span className={styles.igText}>
            Visto en Instagram: <em>&ldquo;{resource.instagramReference.postTitle}&rdquo;</em>
          </span>
        </div>
      )}

      <div className={styles.footer}>
        <div className={styles.formatInfo}>
          <span className={styles.formatText}>{resource.format}</span>
          {resource.pagesOrItems && (
            <span className={styles.pagesText}>· {resource.pagesOrItems}</span>
          )}
        </div>

        <Button
          href={`/recursos/${resource.slug}`}
          variant="outline"
          size="sm"
          className={styles.actionBtn}
        >
          <span>Ver In-App</span>
          <ArrowRight size={13} />
        </Button>
      </div>
    </article>
  );
}
