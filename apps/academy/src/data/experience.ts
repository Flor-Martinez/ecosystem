export interface ExperienceModule {
  id: string;
  number: number;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  topics: string[];
  takeaway: string;
  iconName: 'file-text' | 'share-2' | 'message-square' | 'sparkles' | 'globe';
  colorBg: string;
  colorBorder: string;
  colorText: string;
}

export interface ExclusiveBenefit {
  id: string;
  title: string;
  badge: string;
  description: string;
  highlight: string;
  iconName: 'tracker' | 'calendar' | 'video' | 'coupon' | 'files';
  tag: string;
  colorAccent: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  featured?: boolean;
  price: string;
  billingPeriod: string;
  originalPrice?: string;
  installmentsNote?: string;
  features: string[];
  ctaText: string;
}

export const experienceProgram = {
  title: 'Experiencia Búsqueda Laboral',
  headline: 'La experiencia integral para conseguir el trabajo que querés',
  tagline:
    'No es solo un curso grabado: es una membresía activa donde te acompañamos semana a semana con clases en vivo, herramientas exclusivas, revisión de tu CV y un método probado.',
  badge: 'Experiencia Activa 2025 · Cupos Limitados',
  modality: 'Online en vivo + Campus 24/7 + Herramientas de seguimiento',
  duration: 'Acceso continuo mientras dure tu suscripción',
  communityCount: '+450 profesionales activos',

  // 5 Ejes formativos
  modules: [
    {
      id: 'modulo-cv',
      number: 1,
      title: 'Armado de CV ATS de Alto Impacto',
      tagline: 'Superá los filtros automáticos y atrapá al reclutador en 6 segundos',
      description:
        'Aprendé la arquitectura exacta de un currículum moderno: redacción basada en métricas y verbos de acción, adaptación a algoritmos ATS y plantillas editables en Word y Notion.',
      duration: '4 horas prácticas',
      topics: [
        'Anatomía y jerarquía de un CV legible y moderno',
        'Cómo vencer a los filtros ATS con palabras clave del puesto',
        'Redacción de logros cuantificados sin experiencia previa o con cambios de carrera',
        'Modelos descargables en Word, Google Docs y Notion',
      ],
      takeaway: 'CV final auditado y listo para postularte',
      iconName: 'file-text',
      colorBg: '#FAF5FF',
      colorBorder: '#DDD6FE',
      colorText: '#7C3AED',
    },
    {
      id: 'modulo-linkedin',
      number: 2,
      title: 'Estrategia & Posicionamiento en LinkedIn',
      tagline: 'Que los reclutadores te encuentren a vos sin enviar cientos de CVs',
      description:
        'Transformá tu perfil en un imán de ofertas: optimización SEO del titular, sección "Acerca de" con storytelling, configuración del algoritmo y networking estratégico con líderes de RRHH.',
      duration: '5 horas prácticas',
      topics: [
        'Optimización técnica de perfil (Titular, Acerca de, Experiencia y Destacados)',
        'SEO interno de LinkedIn para aparecer primero en las búsquedas de recruiters',
        'Estrategia de contenidos sin volverte influencer para ganar autoridad',
        'Plantillas de mensajes directos para conectar con hiring managers',
      ],
      takeaway: 'Perfil estelar listo y red de contactos activa',
      iconName: 'share-2',
      colorBg: '#EFF6FF',
      colorBorder: '#BFDBFE',
      colorText: '#2563EB',
    },
    {
      id: 'modulo-entrevistas',
      number: 3,
      title: 'Simulación & Técnica de Entrevistas',
      tagline: 'Respondé con seguridad, dominá preguntas difíciles y negociá tu sueldo',
      description:
        'Entrená las respuestas que marcan la diferencia entre un rechazo y una oferta: método STAR para preguntas por competencias, manejo de nervios y técnicas de negociación salarial.',
      duration: '6 horas prácticas + simulaciones',
      topics: [
        'Estructura de respuesta STAR (Situación, Tarea, Acción, Resultado)',
        'Cómo responder "¿Cuáles son tus debilidades?" y "¿Por qué querés este trabajo?"',
        'Preguntas inteligentes que vos tenés que hacerle a la empresa',
        'Negociación de remuneración y paquete de beneficios con criterio',
      ],
      takeaway: 'Guion personal de entrevista y seguridad total',
      iconName: 'message-square',
      colorBg: '#ECFDF5',
      colorBorder: '#A7F3D0',
      colorText: '#059669',
    },
    {
      id: 'modulo-aptitudes',
      number: 4,
      title: 'Desarrollo de Aptitudes & Autoliderazgo',
      tagline: 'Potenciá tus habilidades blandas y definí tu propuesta de valor única',
      description:
        'Descubrí qué te hace diferente frente a otros candidatos. Mapeo de fortalezas, comunicación asertiva, gestión de la frustración y proyección de carrera.',
      duration: '3 horas de taller',
      topics: [
        'Mapeo de fortalezas y habilidades transferibles',
        'Storytelling profesional: cómo contar tu trayectoria con impacto',
        'Manejo del síndrome del impostor y motivación durante la búsqueda',
        'Plan de carrera individual a 12 y 24 meses',
      ],
      takeaway: 'Mapa de competencias y discurso personal sólido',
      iconName: 'sparkles',
      colorBg: '#FEF3C7',
      colorBorder: '#FDE68A',
      colorText: '#D97706',
    },
    {
      id: 'modulo-plataformas',
      number: 5,
      title: 'Ecosistema de Plataformas & Portales Ocultos',
      tagline: 'Dónde y cómo buscar trabajo más allá de los portales tradicionales',
      description:
        'El 70% de las vacantes no se publican de forma abierta. Te enseñamos a acceder al mercado laboral oculto, plataformas de trabajo remoto internacional y agencias de reclutamiento.',
      duration: '3 horas de investigación',
      topics: [
        'Directorio curado de plataformas de empleo remoto en USD y Latinoamérica',
        'Cómo contactar a headhunters y consultoras de recruiting sin intermediarios',
        'Búsqueda activa en portales de nicho por especialidad',
        'Protocolo de seguimiento (follow-up) sin ser invasivo',
      ],
      takeaway: 'Base de datos de plataformas y pipeline de búsqueda activo',
      iconName: 'globe',
      colorBg: '#FDF2F8',
      colorBorder: '#FBCFE8',
      colorText: '#DB2777',
    },
  ] as ExperienceModule[],

  // 4 Herramientas y beneficios exclusivos de la membresía
  tools: [
    {
      id: 'tracker',
      title: 'Tracker de Búsquedas Activas',
      badge: 'Herramienta Exclusiva',
      description:
        'Tu tablero de control privado para guardar todas las ofertas a las que aplicás, registrar en qué etapa está cada proceso, guardar contactos de RRHH y tomar notas clave.',
      highlight: 'Organizá hasta 100+ postulaciones sin perder el control ni duplicar envíos.',
      iconName: 'tracker',
      tag: 'Plataforma Web / Notion / Excel',
      colorAccent: '#7C3AED',
    },
    {
      id: 'agenda',
      title: 'Agenda & Calendario de Postulaciones',
      badge: 'Planificación Semanal',
      description:
        'Sincronizá tus entrevistas, pruebas técnicas y recordatorios de follow-up en un calendario visual para que nunca llegues tarde ni olvides un paso del proceso.',
      highlight: 'Alertas y fechas clave para mantener un ritmo constante de búsqueda.',
      iconName: 'calendar',
      tag: 'Calendario Integrado',
      colorAccent: '#2563EB',
    },
    {
      id: 'zoom',
      title: 'Charlas Semanales en Vivo vía Zoom con Feedback',
      badge: 'Acompañamiento Humano',
      description:
        'Todos los miércoles nos conectamos en vivo con nuestro equipo docente para revisar CVs de los miembros, hacer simulacros de entrevista y responder dudas en tiempo real.',
      highlight: 'Feedback honesto, personalizado y en directo sobre tus documentos.',
      iconName: 'video',
      tag: 'Sesiones Semanales en Directo',
      colorAccent: '#10B981',
    },
    {
      id: 'cupones',
      title: 'Cupones Exclusivos Tienda Flor Martinez',
      badge: 'Beneficio Ecosistema',
      description:
        'Descuentos especiales y acceso preferencial a los productos de papelería ejecutiva, cuadernos de autor y kits de organización de la Tienda oficial.',
      highlight: 'Hasta un 25% OFF exclusivo para miembros activos de la Academia.',
      iconName: 'coupon',
      tag: 'Tienda Flor Martinez',
      colorAccent: '#D97706',
    },
  ] as ExclusiveBenefit[],

  // Planes de suscripción / membresía
  plans: [
    {
      id: 'mensual',
      name: 'Membresía Mensual',
      price: '$ 24.900 ARS',
      billingPeriod: 'por mes',
      installmentsNote: 'Cancelá en cualquier momento sin permanencia',
      features: [
        'Acceso completo a los 5 módulos de formación',
        'Acceso al Tracker de Búsquedas Activas',
        'Acceso a la Agenda & Calendario de Postulaciones',
        'Participación en las charlas semanales en vivo vía Zoom',
        'Descarga de todas las plantillas en Word y Notion',
        'Cupones de descuento para Tienda Flor Martinez',
      ],
      ctaText: 'Sumarme a la Membresía Mensual',
    },
    {
      id: 'trimestral',
      name: 'Plan Impulso Trimestral',
      badge: 'El Más Elegido · Ahorrás 25%',
      featured: true,
      price: '$ 56.000 ARS',
      billingPeriod: 'por 3 meses',
      originalPrice: '$ 74.700 ARS',
      installmentsNote: 'Hasta 3 cuotas sin interés con tarjeta',
      features: [
        'Todo lo incluido en la membresía mensual',
        '3 meses continuos de acceso y acompañamiento',
        '1 Auditoría 1 a 1 de tu CV realizada por nuestro equipo',
        'Acceso prioritario a las sesiones de Zoom para revisión',
        'Plantillas premium avanzadas de networking',
        'Máximo descuento en Tienda Flor Martinez',
      ],
      ctaText: 'Elegir Plan Trimestral (Recomendado)',
    },
    {
      id: 'anual',
      name: 'Acompañamiento Anual',
      price: '$ 149.000 ARS',
      billingPeriod: 'por año completo',
      installmentsNote: 'Ideal para transiciones de carrera de mediano plazo',
      features: [
        'Todo lo del Plan Trimestral por 12 meses',
        '2 Auditorías personalizadas de CV y LinkedIn',
        'Simulación de entrevista individual 1 a 1',
        'Acceso a todos los nuevos cursos futuros que se lancen',
        'Soporte prioritario por canal privado',
      ],
      ctaText: 'Sumarme al Plan Anual',
    },
  ] as PricingPlan[],
};
