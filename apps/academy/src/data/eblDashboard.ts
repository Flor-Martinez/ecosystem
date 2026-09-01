export type EblCardType = 'modulo' | 'herramienta' | 'perfil' | 'recurso';

export interface EblCardFeature {
  iconName: string;
  label: string;
  badge?: string;
}

export interface EblDashboardCard {
  id: string;
  type: EblCardType;
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
  // 1. MÓDULOS DE FORMACIÓN (LÍNEA TRONCAL UNIFICADA VIOLETA - 8 MÓDULOS)
  // =========================================================================
  {
    id: 'mod-trabajo-ideal',
    type: 'modulo',
    number: 1,
    moduleStepLabel: 'MÓDULO 01',
    title: '¿Cómo conseguir tu trabajo ideal?',
    subtitle: 'Ruta Troncal · Paso 1 de 8',
    description: 'Autoconocimiento, método de 4 preguntas, límites no negociables y test vocacional.',
    icon: 'Compass',
    colorScheme: {
      primary: '#7C3AED',
      bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #FFFFFF 100%)',
      border: '#DDD6FE',
      accent: '#6D28D9',
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
    moduleStepLabel: 'MÓDULO 02',
    title: '¿Cómo funciona la búsqueda laboral?',
    subtitle: 'Ruta Troncal · Paso 2 de 8',
    description: 'Comprendé el proceso de selección real, la mentalidad del reclutador y armá tu plan semanal.',
    icon: 'HelpCircle',
    colorScheme: {
      primary: '#7C3AED',
      bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #FFFFFF 100%)',
      border: '#DDD6FE',
      accent: '#6D28D9',
      pillBg: '#EDE9FE',
      pillColor: '#6D28D9',
    },
    totalSteps: 3,
    completedSteps: 0,
    badge: 'Pendiente',
    features: [
      { iconName: 'PlayCircle', label: '3 Clases en video + Fases de Selección' },
      { iconName: 'Calendar', label: 'Plan de Acción y Cronograma Semanal' },
    ],
    quickActionLabel: 'Entrar a Módulo 2',
    targetView: 'modulo-fundamentos',
  },
  {
    id: 'mod-cv',
    type: 'modulo',
    number: 3,
    moduleStepLabel: 'MÓDULO 03',
    title: 'Creación y mejora de CV',
    subtitle: 'Ruta Troncal · Paso 3 de 8',
    description: 'Evitá los 6 errores comunes, superá filtros ATS y armá tu CV paso a paso con logros medibles.',
    icon: 'FileText',
    colorScheme: {
      primary: '#7C3AED',
      bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #FFFFFF 100%)',
      border: '#DDD6FE',
      accent: '#6D28D9',
      pillBg: '#EDE9FE',
      pillColor: '#6D28D9',
    },
    totalSteps: 5,
    completedSteps: 0,
    badge: 'Pendiente',
    features: [
      { iconName: 'PlayCircle', label: '5 Clases: 6 Errores, ATS, Perfiles & Estructura' },
      { iconName: 'CheckCircle2', label: 'Plantillas Word/Notion + Checklist Pre-Envío' },
    ],
    quickActionLabel: 'Entrar a Módulo 3',
    targetView: 'modulo-cv',
  },
  {
    id: 'mod-linkedin',
    type: 'modulo',
    number: 4,
    moduleStepLabel: 'MÓDULO 04',
    title: 'Creación & Mejora de LinkedIn',
    subtitle: 'Ruta Troncal · Paso 4 de 8',
    description: 'Estrategia SEO, titular magnético y prospección directa de selectores.',
    icon: 'Share2',
    colorScheme: {
      primary: '#7C3AED',
      bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #FFFFFF 100%)',
      border: '#DDD6FE',
      accent: '#6D28D9',
      pillBg: '#EDE9FE',
      pillColor: '#6D28D9',
    },
    totalSteps: 5,
    completedSteps: 0,
    badge: 'Pendiente',
    features: [
      { iconName: 'PlayCircle', label: 'Algoritmo, Titular & Acerca de mí' },
      { iconName: 'Mail', label: 'Scripts de Mensajes para Recruiters' },
    ],
    quickActionLabel: 'Entrar a Módulo 4',
    targetView: 'modulo-linkedin',
  },
  {
    id: 'mod-donde-buscar',
    type: 'modulo',
    number: 5,
    moduleStepLabel: 'MÓDULO 05',
    title: 'Dónde Buscar Ofertas & Portales',
    subtitle: 'Ruta Troncal · Paso 5 de 8',
    description: 'Ecosistema de bolsas de empleo, portales remotos en USD, Google Dorks y mercado oculto.',
    icon: 'Compass',
    colorScheme: {
      primary: '#7C3AED',
      bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #FFFFFF 100%)',
      border: '#DDD6FE',
      accent: '#6D28D9',
      pillBg: '#EDE9FE',
      pillColor: '#6D28D9',
    },
    totalSteps: 4,
    completedSteps: 0,
    badge: 'Pendiente',
    features: [
      { iconName: 'Globe', label: 'Directorio de Portales & Consultoras' },
      { iconName: 'Search', label: 'Comandos de Búsqueda Avanzada Google' },
    ],
    quickActionLabel: 'Explorar Módulo 5',
    targetView: 'modulo-donde-buscar',
  },
  {
    id: 'mod-postulacion',
    type: 'modulo',
    number: 6,
    moduleStepLabel: 'MÓDULO 06',
    title: 'Postulación, Organización & Tracker',
    subtitle: 'Ruta Troncal · Paso 6 de 8',
    description: 'Sistematizá tu seguimiento con el Tracker, armá tu kit y gestioná recordatorios.',
    icon: 'CheckSquare',
    colorScheme: {
      primary: '#7C3AED',
      bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #FFFFFF 100%)',
      border: '#DDD6FE',
      accent: '#6D28D9',
      pillBg: '#EDE9FE',
      pillColor: '#6D28D9',
    },
    totalSteps: 4,
    completedSteps: 0,
    badge: 'Pendiente',
    features: [
      { iconName: 'Layout', label: 'Kit de Postulación & Cover Letter' },
      { iconName: 'Clock', label: 'Protocolo de Follow-Up & Seguridad' },
    ],
    quickActionLabel: 'Ver Módulo 6',
    targetView: 'modulo-postulacion',
  },
  {
    id: 'mod-entrevistas',
    type: 'modulo',
    number: 7,
    moduleStepLabel: 'MÓDULO 07',
    title: 'Entrevistas & Negociación',
    subtitle: 'Ruta Troncal · Paso 7 de 8',
    description: 'Estructurá respuestas de impacto con el método STAR y negociá tu remuneración.',
    icon: 'Users',
    colorScheme: {
      primary: '#7C3AED',
      bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #FFFFFF 100%)',
      border: '#DDD6FE',
      accent: '#6D28D9',
      pillBg: '#EDE9FE',
      pillColor: '#6D28D9',
    },
    totalSteps: 5,
    completedSteps: 0,
    badge: 'Pendiente',
    features: [
      { iconName: 'Bot', label: 'Matriz STAR con 10 Casos Resueltos' },
      { iconName: 'HelpCircle', label: 'Guía de 30 Preguntas Frecuentes' },
    ],
    quickActionLabel: 'Empezar Módulo 7',
    targetView: 'modulo-entrevistas',
  },
  {
    id: 'mod-casos-especiales',
    type: 'modulo',
    number: 8,
    moduleStepLabel: 'MÓDULO 08',
    title: 'Casos Especiales de Búsqueda (Optativa)',
    subtitle: 'Ruta Troncal · Paso 8 de 8',
    description: 'Estrategias a medida para trabajo internacional en USD, primer empleo y transición.',
    icon: 'Sparkles',
    colorScheme: {
      primary: '#7C3AED',
      bgGradient: 'linear-gradient(135deg, #FAF5FF 0%, #FFFFFF 100%)',
      border: '#DDD6FE',
      accent: '#6D28D9',
      pillBg: '#EDE9FE',
      pillColor: '#6D28D9',
    },
    totalSteps: 3,
    completedSteps: 0,
    badge: 'Pendiente',
    features: [
      { iconName: 'Globe', label: 'Plantilla CV Internacional en Inglés' },
      { iconName: 'ArrowRightLeft', label: 'Matriz de Habilidades Transferibles' },
    ],
    quickActionLabel: 'Explorar Módulo 8',
    targetView: 'modulo-casos-especiales',
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
      bgGradient: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
      border: '#E2E8F0',
      accent: '#B45309',
      pillBg: '#FFFBEB',
      pillColor: '#D97706',
    },
    badge: '12 Plantillas',
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
    title: 'Charlas Semanales vía Zoom',
    subtitle: 'Mentoría en Vivo',
    description: 'Sesiones de dudas y feedback en vivo los miércoles 19 hs y grabaciones.',
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
      { iconName: 'Video', label: 'Sala Zoom en vivo + Grabaciones' },
      { iconName: 'HelpCircle', label: 'Espacio de dudas y feedback' },
    ],
    quickActionLabel: 'Ver Agenda Zoom',
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
  {
    id: 'tool-evaluaciones',
    type: 'herramienta',
    title: 'Mis Evaluaciones & Score',
    subtitle: 'Diagnóstico Laboral',
    description: 'Diagnóstico de tu nivel de preparación y recomendaciones para optimizar tus resultados.',
    icon: 'BarChart3',
    colorScheme: {
      primary: '#0D9488',
      bgGradient: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
      border: '#E2E8F0',
      accent: '#0F766E',
      pillBg: '#F0FDFA',
      pillColor: '#0D9488',
    },
    badge: 'Score: 78/100',
    features: [
      { iconName: 'ShieldCheck', label: 'Diagnóstico de 5 competencias' },
      { iconName: 'TrendingUp', label: 'Plan de acción personalizado' },
    ],
    quickActionLabel: 'Ver Evaluaciones',
    targetView: 'evaluaciones',
  },
];
