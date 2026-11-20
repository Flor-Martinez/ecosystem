import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { ValuePillars } from '@/components/sections/ValuePillars';
import { ExperienceFeature } from '@/components/sections/ExperienceFeature';
import { ExperienceTools } from '@/components/sections/ExperienceTools';
import { ExperiencePricing } from '@/components/sections/ExperiencePricing';
import { TrialBanner } from '@/components/sections/TrialBanner';
import { SocialCommunity } from '@/components/sections/SocialCommunity';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function HomePage() {
  return (
    <main>
      {/* 1. HERO: Propuesta EBL & Preview del Aula Virtual con Flor */}
      <Hero />

      {/* 2. PILARES: ¿Por qué formarte en la Academia? */}
      <ValuePillars />

      {/* 3. LA EXPERIENCIA CENTRAL: 7 Módulos Troncales + 3 Extras */}
      <ExperienceFeature />

      {/* 4. HERRAMIENTAS EXCLUSIVAS: Tracker de Postulaciones y Agenda */}
      <ExperienceTools />

      {/* 5. INVERSIÓN: Promo de Lanzamiento ($20.000 ARS) Pago Único por 1 Año */}
      <ExperiencePricing />

      {/* 6. PROBAR LA ACADEMIA: Invitación al Campus Virtual */}
      <TrialBanner />

      {/* 7. COMUNIDAD & REDES: Instagram y LinkedIn */}
      <SocialCommunity />

      {/* 8. CTA FINAL: Banner violeta de conversión */}
      <FinalCTA />
    </main>
  );
}
