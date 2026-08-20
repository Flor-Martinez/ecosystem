import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { ValuePillars } from '@/components/sections/ValuePillars';
import { ExperienceFeature } from '@/components/sections/ExperienceFeature';
import { ExperienceTools } from '@/components/sections/ExperienceTools';
import { ExperiencePricing } from '@/components/sections/ExperiencePricing';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { UpcomingCoursesSection } from '@/components/sections/UpcomingCoursesSection';
import { ResourcesPreview } from '@/components/sections/ResourcesPreview';
import { AboutAcademy } from '@/components/sections/AboutAcademy';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { SocialCommunity } from '@/components/sections/SocialCommunity';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function HomePage() {
  return (
    <main>
      {/* 1. HERO: Propuesta de la Experiencia Búsqueda Laboral & Simulador Interactivo */}
      <Hero />

      {/* 2. PILARES & METODOLOGÍA: Por qué elegir la Academia */}
      <ValuePillars />

      {/* 3. LA EXPERIENCIA CENTRAL: 5 Ejes Modulares de Formación */}
      <ExperienceFeature />

      {/* 4. HERRAMIENTAS EXCLUSIVAS: Tracker, Agenda, Zoom en Vivo y Tienda FM */}
      <ExperienceTools />

      {/* 5. PLANES & MEMBRESÍA: Suscripción Mensual, Trimestral y Anual */}
      <ExperiencePricing />

      {/* 6. CÓMO FUNCIONA EL MÉTODO: 3 pasos para conseguir respuestas */}
      <HowItWorks />

      {/* 7. CURSOS ESPECÍFICOS FUTUROS: Distinción de próximos talleres temáticos */}
      <UpcomingCoursesSection />

      {/* 8. RECURSOS GRATUITOS: Plantillas y checklists */}
      <ResourcesPreview />

      {/* 9. SOBRE LA ACADEMIA: Manifiesto pedagógico */}
      <AboutAcademy />

      {/* 10. TESTIMONIOS: Experiencias de alumnos y métricas reales */}
      <TestimonialsSection />

      {/* 11. COMUNIDAD & REDES: Conexión con Instagram y LinkedIn */}
      <SocialCommunity />

      {/* 12. CTA FINAL: Banner violeta de conversión */}
      <FinalCTA />
    </main>
  );
}
