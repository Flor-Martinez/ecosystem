import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { projectsData } from '@/data/projects';
import styles from './Projects.module.css';

export function Projects() {
  const featuredProjects = projectsData.filter((p) => p.featured);

  return (
    <section className={styles.projects} id="proyectos">
      <Container size="wide">
        <div className={styles.headerRow}>
          <SectionHeader
            badge="Portfolio & Iniciativas"
            title="Proyectos destacados del ecosistema"
            subtitle="Plataformas formativas, consultoría estratégica y desarrollo de soluciones de marca."
            align="left"
            className={styles.sectionHeader}
          />
          <div className={styles.headerAction}>
            <Button href="/proyectos" variant="outline" size="md" rightIcon={<ArrowRight size={16} />}>
              Ver catálogo completo
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
