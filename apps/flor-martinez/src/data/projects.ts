import { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: 'academia-flor-martinez',
    slug: 'academia-flor-martinez',
    title: 'Academia Flor Martinez',
    tagline: 'Plataforma de desarrollo profesional, empleabilidad y mentoría',
    category: 'Educación & Carrera',
    categorySlug: 'desarrollo',
    summary:
      'Diseño e implementación de un ecosistema educativo enfocado en potenciar la inserción laboral, optimización de perfiles en LinkedIn, confección de CV de alto impacto y preparación integral para entrevistas.',
    tags: ['Empleabilidad', 'Educación', 'Marca Personal', 'Mentoría'],
    year: '2025 - Presente',
    role: 'Fundadora & Directora de Contenidos',
    challenge:
      'Gran parte de los profesionales y estudiantes carecen de una guía práctica y actualizada sobre cómo posicionarse en el mercado laboral contemporáneo y destacar sus competencias reales.',
    solution:
      'Creación de programas de formación modulares, recursos descargables y mentorías directas con enfoque 100% práctico y adaptado a las dinámicas de reclutamiento actuales.',
    highlights: [
      'Estructura curricular orientada a resultados tangibles inmediatos',
      'Plantillas y guías prácticas de optimización de perfil profesional',
      'Integración con plataformas digitales de mentoría',
    ],
    featured: true,
    linkText: 'Conocer la Academia',
    linkUrl: 'http://localhost:3001',
    imageAlt: 'Academia Flor Martinez - Plataforma Educativa',
  },
  {
    id: 'agencia-flor-martinez',
    slug: 'agencia-flor-martinez',
    title: 'Agencia Flor Martinez',
    tagline: 'Estrategia de marca, marketing digital y soluciones tecnológicas B2B',
    category: 'Marketing & Estrategia',
    categorySlug: 'marketing',
    summary:
      'Unidad de consultoría y servicios orientada a ayudar a empresas y emprendedores a consolidar su posicionamiento de marca, desarrollo web y comunicación estratégica.',
    tags: ['Estrategia Digital', 'Marketing B2B', 'Branding', 'Desarrollo Web'],
    year: '2025',
    role: 'Estratega Principal',
    challenge:
      'Las organizaciones a menudo comunican sus propuestas de valor con mensajes dispersos y plataformas desactualizadas que no convierten clientes calificados.',
    solution:
      'Desarrollo de estrategias holísticas que combinan identidad visual, arquitectura de contenidos y desarrollo tecnológico para generar tracción comercial medible.',
    highlights: [
      'Enfoque consultivo centrado en retorno de inversión',
      'Diseño de interfaces limpias, modernas y accesibles',
      'Metodología ágil de implementación de marca',
    ],
    featured: true,
    linkText: 'Explorar propuesta',
    linkUrl: '/proyecto/agencia-flor-martinez',
    imageAlt: 'Agencia Flor Martinez - Estrategia y Tecnología',
  },
  {
    id: 'comercio-exterior-consultoria',
    slug: 'comercio-exterior-consultoria',
    title: 'Consultoría en Comercio Exterior',
    tagline: 'Optimización de procesos operativos y logística internacional',
    category: 'Comercio Exterior',
    categorySlug: 'comercio-exterior',
    summary:
      'Asesoramiento en gestión operativa de importación/exportación, cumplimiento normativo y articulación con actores del comercio transfronterizo.',
    tags: ['Comercio Internacional', 'Operaciones', 'Regulaciones', 'Supply Chain'],
    year: '2024 - 2025',
    role: 'Consultora Especialista',
    challenge:
      'La volatilidad de las regulaciones arancelarias y los cuellos de botella logísticos generan demoras críticas y sobrecostos en las operaciones de comercio internacional.',
    solution:
      'Auditoría y estandarización de circuitos documentales, análisis de contingencias aduaneras y optimización de la cadena de valor operativa.',
    highlights: [
      'Diagnóstico integral de procedimientos aduaneros',
      'Optimización de tiempos de desaduanamiento y logística de carga',
      'Soporte técnico a equipos comerciales y operativos',
    ],
    featured: true,
    linkText: 'Ver detalles del caso',
    linkUrl: '/proyecto/comercio-exterior-consultoria',
    imageAlt: 'Consultoría en Comercio Exterior',
  },
  {
    id: 'tienda-flor-martinez',
    slug: 'tienda-flor-martinez',
    title: 'Tienda Corporativa Flor Martinez',
    tagline: 'Merchandising corporativo, kits de bienvenida y papelería empresarial',
    category: 'Ecosistema Digital',
    categorySlug: 'ecosistema',
    summary:
      'Concepción y diseño de la línea de productos corporativos personalizados para empresas: cuadernos premium, agendas ejecutivas y kits de onboarding a gran escala.',
    tags: ['Merchandising B2B', 'Kits Corporativos', 'Branding Físico', 'Papelería'],
    year: '2025 (En desarrollo)',
    role: 'Curadora de Producto & Diseño',
    challenge:
      'El merchandising tradicional de las empresas tiende a ser genérico y de baja durabilidad, desaprovechando una oportunidad clave de fidelización de talento y clientes.',
    solution:
      'Desarrollo de una línea de objetos de oficina de alta gama y diseño cuidado que transmiten profesionalismo y pertenencia.',
    highlights: [
      'Materiales sustentables y terminaciones de primera calidad',
      'Personalización integral para eventos corporativos y bienvenida de colaboradores',
      'Logística de distribución por volumen',
    ],
    featured: false,
    linkText: 'Próximamente disponible',
    linkUrl: '/proyecto/tienda-flor-martinez',
    imageAlt: 'Tienda Flor Martinez - Merchandising Corporativo',
  },
];
