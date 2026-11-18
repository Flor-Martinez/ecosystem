export type EblCardType = 'modulo' | 'herramienta' | 'perfil' | 'recurso';

export interface EblCardFeature {
  iconName: string;
  label: string;
  badge?: string;
}

export interface EblDashboardCard {
  id: string;
  type: EblCardType;
  isExtra?: boolean;
  isWip?: boolean;
  number?: number;
  moduleStepLabel?: string; // e.g. "MÓDULO 01"
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  colorScheme: {
    primary: string;
    bgGradient: string;
    border: string;
    accent: string;
    pillBg: string;
    pillColor: string;
  };
  totalSteps?: number;
  completedSteps?: number;
  badge?: string;
  features: EblCardFeature[];
  quickActionLabel: string;
  targetView: string;
}

export const eblCards: EblDashboardCard[] = [
  // =========================================================================
  // 1. MÓDULOS TRONCALES (7 MÓDULOS)
  // =========================================================================
  {
    id: 'mod-trabajo-ideal',
    type: 'modulo',
    number: 1,
    isExtra: false,
    moduleStepLabel: 'MÓDULO 01',
    title: '¿Cómo conseguir tu trabajo ideal?',
    subtitle: 'Módulo troncal · Paso 1 de 7',
    description: 'Autoconocimiento, método de 4 preguntas, límites no negociables y test vocacional.',
    icon: 'Compass',
    colorScheme: {
      primary: '#7C3AED',
      bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #FFFFFF 100%)',
      border: '#DDD6FE',
      accent: '#8B5A2B', // Traje Flor M1 (Camel/Marrón elegante)
      pillBg: '#EDE9FE',
      pillColor: '#6D28D9',
    },
    totalSteps: 4,
    completedSteps: 0,
    badge: 'Comenzar',
    features: [
      { iconName: 'PlayCircle', label: '4 Clases en video + Guía de 4 Preguntas' },
      { iconName: 'FileSpreadsheet', label: 'Matriz de Target & No Negociables' },
    ],
    quickActionLabel: 'Continuar Módulo 1',
    targetView: 'modulo-trabajo-ideal',
  },
  {
    id: 'mod-fundamentos',
    type: 'modulo',
    number: 2,
    isExtra: false,
    moduleStepLabel: 'MÓDULO 02',
    title: '¿Cómo funciona la búsqueda laboral?',
    subtitle: 'Módulo troncal · Paso 2 de 7',
    description: 'Comprendé el proceso de selección real, la mentalidad del reclutador y armá tu plan semanal.',
    icon: 'HelpCircle',
    colorScheme: {
      primary: '#7C3AED',
      bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #FFFFFF 100%)',
      border: '#DDD6FE',
      accent: '#9C7C58', // Traje Flor M2 (Tono tierra/Beige tostado)
      pillBg: '#EDE9FE',
      pillColor: '#6D28D9',
    },
    totalSteps: 3,
    completedSteps: 0,
    badge: 'Pendiente',
    features: [
      { iconName: 'PlayCircle', label: '3 Clases en video: Reclutador, Tiempos & Errores' },
      { iconName: 'Calendar', label: 'Cronograma Ejemplo: Plan Semanal de Búsqueda' },
    ],
    quickActionLabel: 'Entrar a Módulo 2',
    targetView: 'modulo-fundamentos',
  },
  {
    id: 'mod-cv',
    type: 'modulo',
    number: 3,
    isExtra: false,
    moduleStepLabel: 'MÓDULO 03',
    title: 'Creación y mejora de CV',
    subtitle: 'Módulo troncal · Paso 3 de 7',
    description: 'Elegí tu plantilla modelo Harvard (con o sin foto), evitá los 6 errores comunes, superá los filtros ATS y armá tu CV paso a paso.',
    icon: 'FileText',
    colorScheme: {
      primary: '#7C3AED',
      bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #FFFFFF 100%)',
      border: '#DDD6FE',
      accent: '#B06B5B', // Traje Flor M3 (Terracota suave/Rosa viejo)
      pillBg: '#EDE9FE',
      pillColor: '#6D28D9',
    },
    totalSteps: 5,
    completedSteps: 0,
    badge: 'Pendiente',
    features: [
      { iconName: 'PlayCircle', label: '5 Clases: Errores, ATS, Perfiles, Armado & Logros' },
      { iconName: 'CheckCircle2', label: 'Plantillas CV Modelo Harvard (Con y Sin Foto)' },
    ],
    quickActionLabel: 'Entrar a Módulo 3',
    targetView: 'modulo-cv',
  },
  {
    id: 'mod-linkedin',
    type: 'modulo',
    number: 4,
    isExtra: false,
    moduleStepLabel: 'MÓDULO 04',
    title: 'Creación & Mejora de LinkedIn',
    subtitle: 'Módulo troncal · Paso 4 de 7',
    description: 'Estrategia SEO, titular magnético y prospección directa de selectores.',
    icon: 'Share2',
    colorScheme: {
      primary: '#7C3AED',
      bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #FFFFFF 100%)',
      border: '#DDD6FE',
      accent: '#5C7894', // Traje Flor M4 (Slate Blue/Celeste grisáceo)
      pillBg: '#EDE9FE',
      pillColor: '#6D28D9',
    },
    totalSteps: 5,
    completedSteps: 0,
    badge: 'Pendiente',
    features: [
      { iconName: 'PlayCircle', label: '5 Clases: Foto/Banner, Titular, Experiencia, Contactos & Feed' },
      { iconName: 'Mail', label: 'Scripts de Mensajes para Recruiters' },
    ],
    quickActionLabel: 'Entrar a Módulo 4',
    targetView: 'modulo-linkedin',
  },
  {
    id: 'mod-donde-buscar',
    type: 'modulo',
    number: 5,
    isExtra: false,
    moduleStepLabel: 'MÓDULO 05',
    title: '¿Dónde encontrar oportunidades laborales?',
    subtitle: 'Módulo troncal · Paso 5 de 7',
    description: 'Construí tu mapa de fuentes laborales en 4 cuadrantes: portales, empresas objetivo, consultoras y canales de nicho.',
    icon: 'Compass',
    colorScheme: {
      primary: '#7C3AED',
      bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #FFFFFF 100%)',
      border: '#DDD6FE',
      accent: '#965C38', // Traje Flor M5 (Canela/Caramelo cálido)
      pillBg: '#EDE9FE',
      pillColor: '#6D28D9',
    },
    totalSteps: 3,
    completedSteps: 0,
    badge: 'Pendiente',
    features: [
      { iconName: 'Globe', label: '3 Clases: Fuentes, Portales y Mapa In-App' },
      { iconName: 'Map', label: '🗺️ Mi Mapa de Fuentes Laborales (In-App)' },
    ],
    quickActionLabel: 'Explorar Módulo 5',
    targetView: 'modulo-donde-buscar',
  },
  {
    id: 'mod-postulacion',
    type: 'modulo',
    number: 6,
    isExtra: false,
    moduleStepLabel: 'MÓDULO 06',
    title: 'De la oferta a la postulación',
    subtitle: 'Módulo troncal · Paso 6 de 7',
    description: 'Aprendé a evaluar requisitos, postularte con rigor profesional, gestionar tus postulaciones en el Tracker y hacer seguimiento.',
    icon: 'CheckSquare',
    colorScheme: {
      primary: '#7C3AED',
      bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #FFFFFF 100%)',
      border: '#DDD6FE',
      accent: '#AA8C70', // Traje Flor M6 (Arena/Nude claro)
      pillBg: '#EDE9FE',
      pillColor: '#6D28D9',
    },
    totalSteps: 5,
    completedSteps: 0,
    badge: 'Pendiente',
    features: [
      { iconName: 'CheckSquare', label: '5 Clases: Requisitos, Formas de Postulación, Carta & Tracker' },
      { iconName: 'Table', label: 'Tracker de Postulaciones & Seguimiento' },
    ],
    quickActionLabel: 'Ver Módulo 6',
    targetView: 'modulo-postulacion',
  },
  {
    id: 'mod-entrevistas',
    type: 'modulo',
    number: 7,
    isExtra: false,
    moduleStepLabel: 'MÓDULO 07',
    title: 'Entrevista Laboral',
    subtitle: 'Módulo troncal · Paso 7 de 7',
    description: 'Superá cada etapa con confianza, dominá el Método STAR con tus 5 historias maestras y negociá tu salario profesionalmente.',
    icon: 'Users',
    colorScheme: {
      primary: '#7C3AED',
      bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #FFFFFF 100%)',
      border: '#DDD6FE',
      accent: '#312E81', // Traje Flor M7 (Carbón/Dark formal)
      pillBg: '#EDE9FE',
      pillColor: '#6D28D9',
    },
    totalSteps: 5,
    completedSteps: 0,
    badge: 'Pendiente',
    features: [
      { iconName: 'MessageSquare', label: '5 Clases: Etapas, Estructura, STAR, Preguntas & Negociación' },
      { iconName: 'DollarSign', label: 'Matriz Salarial & Preguntas Difíciles' },
    ],
    quickActionLabel: 'Empezar Módulo 7',
    targetView: 'modulo-entrevistas',
  },

  // =========================================================================
  // 2. MÓDULOS EXTRA (3 MÓDULOS OPCIONALES)
  // =========================================================================
  {
    id: 'mod-extra-mineria',
    type: 'modulo',
    number: 8,
    isExtra: true,
    moduleStepLabel: 'EXTRA 01',
    title: 'Minería y Petróleo',
    subtitle: 'Módulo extra · Opcional',
    description: 'Cómo ingresar y desarrollarte en minería, petróleo y energía: carreras, perfiles, páginas oficiales y proveedores.',
    icon: 'GraduationCap',
    colorScheme: {
      primary: '#7C3AED',
      bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #FFFFFF 100%)',
      border: '#E9D5FF',
      accent: '#7C3AED',
      pillBg: '#F5F3FF',
      pillColor: '#7C3AED',
    },
    totalSteps: 8,
    completedSteps: 0,
    badge: 'Opcional',
    features: [
      { iconName: 'PlayCircle', label: '8 Clases: Yacimientos, Requisitos, Portales & Ferias' },
      { iconName: 'File', label: 'Guía de Carreras, Proveedores & Vocabulario HSE' },
    ],
    quickActionLabel: 'Ver Minería y Petróleo',
    targetView: 'modulo-extra-mineria',
  },
  {
    id: 'mod-extra-remoto',
    type: 'modulo',
    number: 9,
    isExtra: true,
    isWip: true,
    moduleStepLabel: 'EXTRA 02',
    title: 'Trabajo Remoto',
    subtitle: 'Módulo extra · Opcional',
    description: 'Modalidades de contratación internacional, portales globales, CV en inglés, prevención de estafas, contratos y tarifas.',
    icon: 'GraduationCap',
    colorScheme: {
      primary: '#7C3AED',
      bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #FFFFFF 100%)',
      border: '#E9D5FF',
      accent: '#7C3AED',
      pillBg: '#F5F3FF',
      pillColor: '#7C3AED',
    },
    totalSteps: 7,
    completedSteps: 0,
    badge: 'Opcional',
    features: [
      { iconName: 'PlayCircle', label: '7 Clases: Modalidades, Portales, CV & Contratos' },
      { iconName: 'Globe', label: 'Directorio Internacional & Calculadora de Tarifa' },
    ],
    quickActionLabel: 'Ver Trabajo Remoto',
    targetView: 'modulo-extra-remoto',
  },
  {
    id: 'mod-extra-primer-empleo',
    type: 'modulo',
    number: 10,
    isExtra: true,
    isWip: true,
    moduleStepLabel: 'EXTRA 03',
    title: 'Primer Empleo y Sin Experiencia Laboral',
    subtitle: 'Módulo extra · Opcional',
    description: 'Cómo romper el círculo vicioso, convertir proyectos en evidencia, encontrar vacantes iniciales y defender tu potencial.',
    icon: 'GraduationCap',
    colorScheme: {
      primary: '#7C3AED',
      bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #FFFFFF 100%)',
      border: '#E9D5FF',
      accent: '#7C3AED',
      pillBg: '#F5F3FF',
      pillColor: '#7C3AED',
    },
    totalSteps: 4,
    completedSteps: 0,
    badge: 'Opcional',
    features: [
      { iconName: 'PlayCircle', label: '4 Clases: Proyectos, Bolsas de Empleo & Entrevista' },
      { iconName: 'CheckCircle2', label: 'Plantilla CV Harvard sin experiencia previa' },
    ],
    quickActionLabel: 'Ver Primer Empleo',
    targetView: 'modulo-extra-primer-empleo',
  },

  // =========================================================================
  // 2. HERRAMIENTAS & RECURSOS DE APOYO (DISTINTIVOS SECUNDARIOS)
  // =========================================================================
  {
    id: 'tool-recursos',
    type: 'recurso',
    title: 'Biblioteca de Recursos',
    subtitle: 'Bóveda de Plantillas',
    description: 'Bóveda con plantillas en Word (.docx), bases de datos en Notion, Excel y guías PDF.',
    icon: 'FolderDown',
    colorScheme: {
      primary: '#D97706',
      bgGradient: 'linear-gradient(180deg, #FEF3C7 0%, #FFFBEB 30%, #FFFFFF 100%)',
      border: '#FDE68A',
      accent: '#B45309',
      pillBg: '#FEF3C7',
      pillColor: '#B45309',
    },
    badge: '28 materiales protegidos',
    features: [
      { iconName: 'FileText', label: 'Modelos ATS Word & Notion' },
      { iconName: 'BadgePercent', label: 'Cupón 25% OFF Tienda FM' },
    ],
    quickActionLabel: 'Abrir Recursos',
    targetView: 'recursos',
  },
  {
    id: 'tool-vocacional',
    type: 'herramienta',
    title: 'Test Vocacional & Orientación',
    subtitle: 'Diagnóstico de Carrera',
    description: 'Cuestionario integral para descubrir tus fortalezas, perfil de competencias y áreas de mayor proyección laboral.',
    icon: 'Compass',
    colorScheme: {
      primary: '#EC4899',
      bgGradient: 'linear-gradient(135deg, #FDF2F8 0%, #FFFFFF 100%)',
      border: '#FBCFE8',
      accent: '#DB2777',
      pillBg: '#FDF2F8',
      pillColor: '#DB2777',
    },
    badge: 'Gratuito',
    features: [
      { iconName: 'HelpCircle', label: 'Cuestionario de 12 dimensiones' },
      { iconName: 'Sparkles', label: 'Conclusión & Perfil sugerido' },
    ],
    quickActionLabel: 'Realizar Test',
    targetView: 'test-vocacional',
  },
  {
    id: 'tool-perfil',
    type: 'perfil',
    title: 'Datos del Alumno & Perfil',
    subtitle: 'Expediente del Alumno',
    description: 'Tu CV guardado, LinkedIn vinculado, rol objetivo, pretensión salarial y certificados.',
    icon: 'UserCheck',
    colorScheme: {
      primary: '#4338CA',
      bgGradient: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
      border: '#E2E8F0',
      accent: '#3730A3',
      pillBg: '#EEF2FF',
      pillColor: '#4338CA',
    },
    badge: 'Al día',
    features: [
      { iconName: 'File', label: 'CV activo & LinkedIn vinculado' },
      { iconName: 'Award', label: '2 Certificados emitidos' },
    ],
    quickActionLabel: 'Ver Mi Perfil',
    targetView: 'perfil',
  },
  {
    id: 'tool-tracker',
    type: 'herramienta',
    title: 'Tracker de Postulaciones',
    subtitle: 'Herramienta de Gestión',
    description: 'Seguimiento de etapas de entrevistas, ofertas salariales y contactos de RRHH.',
    icon: 'Table',
    colorScheme: {
      primary: '#0891B2',
      bgGradient: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
      border: '#E2E8F0',
      accent: '#0E7490',
      pillBg: '#ECFEFF',
      pillColor: '#0891B2',
    },
    badge: '4 Activas',
    features: [
      { iconName: 'CheckCircle2', label: 'Tablero de procesos activos' },
      { iconName: 'Clock', label: 'Recordatorios de seguimiento' },
    ],
    quickActionLabel: 'Abrir Tracker',
    targetView: 'tracker',
  },
  {
    id: 'tool-zoom',
    type: 'herramienta',
    title: 'Sesiones en Vivo',
    subtitle: 'Mentoría Semanal',
    description: 'Encuentros de resolución de dudas y feedback en vivo los miércoles 19 hs y grabaciones.',
    icon: 'Video',
    colorScheme: {
      primary: '#2563EB',
      bgGradient: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
      border: '#E2E8F0',
      accent: '#1D4ED8',
      pillBg: '#EFF6FF',
      pillColor: '#2563EB',
    },
    badge: 'Miércoles 19 hs',
    features: [
      { iconName: 'Video', label: 'Sala Virtual en vivo + Grabaciones' },
      { iconName: 'HelpCircle', label: 'Espacio de dudas y feedback' },
    ],
    quickActionLabel: 'Entrar a Sesiones en Vivo',
    targetView: 'zoom',
  },
  {
    id: 'tool-agenda',
    type: 'herramienta',
    title: 'Agenda & Calendario',
    subtitle: 'Cronograma',
    description: 'Fechas de tus próximas entrevistas, pruebas técnicas y sincronización con Google Calendar.',
    icon: 'Calendar',
    colorScheme: {
      primary: '#EA580C',
      bgGradient: 'linear-gradient(135deg, #FFF7ED 0%, #FFFFFF 100%)',
      border: '#FED7AA',
      accent: '#C2410C',
      pillBg: '#FFEDD5',
      pillColor: '#EA580C',
    },
    badge: '2 Próximos',
    features: [
      { iconName: 'CalendarDays', label: 'Fechas clave de entrevistas' },
      { iconName: 'BellRing', label: 'Alertas y sincronización' },
    ],
    quickActionLabel: 'Ver Agenda',
    targetView: 'agenda',
  },
];
