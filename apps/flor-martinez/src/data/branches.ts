import { EcosystemBranch } from '@/types';

export const ecosystemBranches: EcosystemBranch[] = [
  {
    id: 'agencia',
    name: 'Agencia Flor Martinez',
    shortName: 'Agencia',
    tagline: 'Marketing, estrategia, tecnología y desarrollo web',
    description:
      'Soluciones integrales de comunicación digital, desarrollo tecnológico y estrategias de crecimiento para empresas y emprendedores.',
    primaryColor: '#2563eb',
    secondaryColor: '#7c3aed',
    status: 'coming_soon',
    statusLabel: 'Próximamente',
    ctaText: 'Ver detalles',
    href: '/#ecosistema',
    badgeText: 'B2B & Estrategia',
    icon: 'Briefcase',
  },
  {
    id: 'academia',
    name: 'Academia Flor Martinez',
    shortName: 'Academia',
    tagline: 'Educación profesional, empleabilidad y desarrollo de carrera',
    description:
      'Cursos prácticos, recursos aplicados y herramientas concretas para potenciar tu CV, optimizar tu perfil de LinkedIn y acelerar tu inserción laboral.',
    primaryColor: '#7c3aed',
    secondaryColor: '#2563eb',
    status: 'active',
    statusLabel: 'Rama Activa',
    ctaText: 'Ir a la Academia',
    href: 'http://localhost:3001',
    badgeText: 'Formación Práctica',
    icon: 'GraduationCap',
  },
  {
    id: 'tienda',
    name: 'Tienda Flor Martinez',
    shortName: 'Tienda',
    tagline: 'Productos corporativos, kits y merchandising de impacto',
    description:
      'Cuadernos, agendas, sets de bienvenida y kits personalizados en volumen para empresas que buscan fortalecer su cultura y presencia de marca.',
    primaryColor: '#ea580c',
    secondaryColor: '#f59e0b',
    status: 'coming_soon',
    statusLabel: 'Próximamente',
    ctaText: 'Ver catálogo futuro',
    href: '/#ecosistema',
    badgeText: 'Kits Corporativos',
    icon: 'ShoppingBag',
  },
];
