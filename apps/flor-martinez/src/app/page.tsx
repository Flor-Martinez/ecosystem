import { Hero } from '@/components/sections/Hero';
import { ReachSection } from '@/components/sections/ReachSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <main>
      {/* 1. SECCIÓN INICIO: Presentación de Flor Martinez & Foto 1 (Rooftop con laptop y teléfono) */}
      <Hero />

      {/* 2. SECCIÓN ALCANCE & COMUNIDAD: +35k Instagram, +22k LinkedIn & Foto 3 (Retrato editorial) */}
      <ReachSection />

      {/* 3. SECCIÓN UNIDADES DEL ECOSISTEMA: Agencia, Academia y Tienda */}
      <ProjectsSection />

      {/* 4. SECCIÓN SOBRE MÍ: Biografía, Trayectoria & Foto 2 (Full Stature en Arquitectura) */}
      <AboutSection />

      {/* 5. SECCIÓN CONTACTO: Canales directos & Formulario de Consulta */}
      <ContactSection />
    </main>
  );
}
