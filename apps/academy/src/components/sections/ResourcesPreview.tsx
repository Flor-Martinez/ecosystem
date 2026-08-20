import React from 'react';
import { ArrowRight, FolderDown } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { ResourceCard } from '@/components/resources/ResourceCard';
import { resourcesData } from '@/data/resources';
import styles from './ResourcesPreview.module.css';

export function ResourcesPreview() {
  const featuredResources = resourcesData.slice(0, 3);

  return (
    <section className={styles.section} id="recursos">
      <Container size="wide">
        <SectionHeader
          badge="Materiales 100% Gratuitos"
          badgeVariant="primary"
          title="Descargá plantillas y empezá hoy mismo"
          subtitle="Accedé sin costo a checklists de postulación, guías de LinkedIn y directorios curados para acelerar tu búsqueda."
        />

        <div className={styles.grid}>
          {featuredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>

        <div className={styles.viewAllRow}>
          <Button href="/recursos" variant="outline" size="lg" className={styles.viewAllBtn}>
            <FolderDown size={18} />
            <span>Explorar los {resourcesData.length} recursos gratuitos</span>
            <ArrowRight size={16} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
