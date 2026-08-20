import { Hero } from '@/components/sections/Hero';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <main>
      {/* 1. SECCIÓN INICIO: Presentación de Flor Martinez, Retrato Editorial & Métricas */}
      <Hero />

      {/* 2. SECCIÓN PROYECTOS: Central de Derivación Estratégica (Agencia, Academia, Tienda) */}
      <ProjectsSection />

      {/* 3. SECCIÓN SOBRE MÍ: Biografía, Visión, Valores y Línea de Tiempo Profesional */}
      <AboutSection />

      {/* 4. SECCIÓN CONTACTO: Canales directos & Formulario de Consulta */}
      <ContactSection />
    </main>
  );
}
