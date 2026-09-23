export interface SolutionDeliverable {
  title: string;
  description: string;
}

export interface SolutionProcessStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface SolutionItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  type: 'producto' | 'servicio';
  badgeText: string;
  category: string;
  priceARS: number;
  priceUSD: number;
  originalPriceARS?: number;
  deliveryTime: string;
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  fullDescription: string;
  videoUrl?: string; // YouTube / Vimeo embed URL or video ID
  videoTitle?: string;
  deliverables: SolutionDeliverable[];
  processSteps: SolutionProcessStep[];
  faq: { question: string; answer: string }[];
  isFeatured?: boolean;
}

export const solutionsData: SolutionItem[] = [
  {
    id: 'sol-1',
    slug: 'organizador-de-finanzas',
    title: 'Organizador de Finanzas Personales & Ejecutivas',
    tagline: 'Control total de ingresos, gastos, ahorros e inversiones en una sola plantilla inteligente.',
    type: 'producto',
    badgeText: 'Producto Digital',
    category: 'Productividad & Finanzas',
    priceARS: 18500,
    priceUSD: 20,
    originalPriceARS: 28000,
    deliveryTime: 'Entrega Inmediata (Descarga 24/7)',
    rating: 4.9,
    reviewsCount: 38,
    shortDescription:
      'Plantilla interactiva diseñada para profesionales y emprendedores que buscan ordenar sus finanzas con proyecciones automáticas, alertas de presupuesto y seguimiento de inversiones.',
    fullDescription:
      'El Organizador de Finanzas de Flor Martinez es una herramienta desarrollada para eliminar el caos financiero y darte claridad absoluta. Incluye tableros automatizados de flujo de caja, categorización de gastos fijos y variables, metas de ahorro con barra de progreso y resumen ejecutivo mensual.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoTitle: 'Demostración en video: Cómo usar el Organizador de Finanzas',
    deliverables: [
      {
        title: 'Plantilla de Finanzas Inteligente (Excel & Google Sheets)',
        description: 'Matriz automatizada con gráficos de pastel, barras de presupuesto y cálculos de rentabilidad.',
      },
      {
        title: 'Guía en PDF & Video Tutorial Explicativo (15 min)',
        description: 'Paso a paso para personalizar la plantilla según tus fuentes de ingresos y monedas (ARS / USD).',
      },
      {
        title: 'Tablero de Control de Deudas y Metas de Ahorro',
        description: 'Calculadora automática de amortización e interés con proyecciones a 12 meses.',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: 'Pago Seguro & Confirmación',
        description: 'Realizás el pago a través de Mercado Pago o tarjeta de crédito en nuestro portal seguro.',
      },
      {
        stepNumber: 2,
        title: 'Acceso Directo a tu Correo',
        description: 'Recibís de forma automática el enlace de descarga e instrucciones para importar la plantilla.',
      },
      {
        stepNumber: 3,
        title: 'Soporte & Actualizaciones',
        description: 'Accedés a futuras mejoras de la plantilla sin costos adicionales.',
      },
    ],
    faq: [
      {
        question: '¿Necesito conocimientos avanzados de Excel?',
        answer: 'Para nada. La plantilla viene completamente automatizada con fórmulas preconfiguradas y un video explicativo de 15 minutos donde te muestro exactamente dónde ingresar cada dato.',
      },
      {
        question: '¿Funciona con varias monedas (pesos y dólares)?',
        answer: 'Sí, podés registrar movimientos tanto en pesos argentinos como en dólares u otras divisas.',
      },
    ],
    isFeatured: true,
  },
  {
    id: 'sol-2',
    slug: 'te-hago-tu-cv',
    title: 'Te Hago Tu CV (Redacción & Optimización ATS)',
    tagline: 'Rediseño y reestructuración completa de tu currículum vitae para superar los filtros de Selección.',
    type: 'servicio',
    badgeText: 'Servicio 1 a 1',
    category: 'Empleabilidad & Carrera',
    priceARS: 29900,
    priceUSD: 35,
    originalPriceARS: 42000,
    deliveryTime: 'Entrega en 48 a 72 horas hábiles',
    rating: 5.0,
    reviewsCount: 64,
    shortDescription:
      'Reescribo y optimizo tu CV con formato editorial ejecutivo, palabras clave de tu industria y métricas de impacto para que logres un 300% más de llamadas a entrevistas.',
    fullDescription:
      'Los reclutadores le dedican un promedio de 6 segundos a cada currículum y el 75% son descartados por sistemas automáticos (ATS). Con este servicio 1 a 1, tomo tu historial laboral y redacto un CV de alto nivel ejecutivo que resalta tus logros reales y supera los algoritmos de búsqueda.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoTitle: 'Video: Cómo transformamos tu CV en un currículum ganador',
    deliverables: [
      {
        title: 'CV Final Editado en PDF (Formato ATS & Imprimible)',
        description: 'Diseño editorial pulido, tipografía ejecutiva y diagramación optimizada para lectura rápida.',
      },
      {
        title: 'Archivo Editable en Microsoft Word (.docx)',
        description: 'Para que puedas actualizar futuras experiencias o fechas cuando lo necesites.',
      },
      {
        title: 'Resumen de Palabras Clave de tu Industria',
        description: 'Lista de los términos más buscados por los reclutadores de tu sector.',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: 'Contratación & Cuestionario Inicial',
        description: 'Al confirmar el servicio, completás un formulario breve y nos adjuntás tu CV actual.',
      },
      {
        stepNumber: 2,
        title: 'Análisis & Redacción Editorial',
        description: 'Flor Martinez y su equipo reestructuran tu Perfil Profesional, Experiencia y Logros.',
      },
      {
        stepNumber: 3,
        title: 'Entrega Final & Ronda de Revision',
        description: 'Recibís tu nuevo CV en 48-72hs con opción de ajustes finos incluidos.',
      },
    ],
    faq: [
      {
        question: '¿Qué información tengo que enviar?',
        answer: 'Solo necesitás enviar tu CV actual (aunque esté desactualizado) o un listado con tu trayectoria y estudios.',
      },
      {
        question: '¿Tengo derecho a cambios si quiero ajustar algo?',
        answer: 'Sí, el servicio incluye 1 ronda de revisiones ilimitadas sobre la versión entregada.',
      },
    ],
    isFeatured: true,
  },
  {
    id: 'sol-3',
    slug: 'auditoria-y-optimizacion-de-linkedin',
    title: 'Auditoría & Posicionamiento de LinkedIn',
    tagline: 'Convertí tu perfil en un imán orgánico de propuestas laborales y clientes sin enviar mensajes fríos.',
    type: 'servicio',
    badgeText: 'Servicio 1 a 1',
    category: 'Marca Personal & B2B',
    priceARS: 34500,
    priceUSD: 40,
    originalPriceARS: 48000,
    deliveryTime: 'Entrega en 3 a 4 días hábiles',
    rating: 4.95,
    reviewsCount: 42,
    shortDescription:
      'Optimizamos tu Titular, Extracto (Acerca de), Experiencia y Ajustes Algorítmicos para posicionarte como referente en tu sector.',
    fullDescription:
      'LinkedIn es la base de datos profesional más grande del mundo. Si tu perfil no aparece en los primeros resultados de búsqueda de reclutadores y directores, estás perdiendo oportunidades valiosas. Este servicio reescribe cada sección de tu perfil con estrategia SEO profesional.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoTitle: 'Video: El poder de un perfil de LinkedIn bien posicionado',
    deliverables: [
      {
        title: 'Redacción Completa de Titular & Extracto ("Acerca de")',
        description: 'Textos persuasivos diseñados para captar atención e impulsar llamadas a la acción.',
      },
      {
        title: 'Guía de Configuración Algorítmica & Palabras Clave',
        description: 'Ajustes invisibles en tu cuenta para multiplicar tu visibilidad orgánica.',
      },
      {
        title: 'Sugerencias para Banner & Foto de Perfil',
        description: 'Recomendaciones visuales para alinear tu marca personal con los estándares ejecutivos.',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: 'Auditoría Inicial de tu Perfil',
        description: 'Revisamos tu enlace actual de LinkedIn y definimos los objetivos de carrera o negocio.',
      },
      {
        stepNumber: 2,
        title: 'Entrega del Documento de Optimización',
        description: 'Te enviamos la redacción exacta lista para copiar y pegar en tu perfil de LinkedIn.',
      },
      {
        stepNumber: 3,
        title: 'Verificación Final',
        description: 'Revisamos tu perfil una vez cargado para asegurar que la presentación sea impecable.',
      },
    ],
    faq: [
      {
        question: '¿Necesitas mi contraseña de LinkedIn?',
        answer: 'No. Te enviamos un documento estructurado paso a paso con los textos exactos para que vos mismo los pegues con 1 clic en tu cuenta de forma 100% segura.',
      },
    ],
    isFeatured: true,
  },
  {
    id: 'sol-4',
    slug: 'planner-marca-personal',
    title: 'Planner Estratégico de Marca Personal',
    tagline: 'Calendario y plantilla para planificar contenidos, networking e hitos profesionales.',
    type: 'producto',
    badgeText: 'Producto Digital',
    category: 'Estrategia & Marca',
    priceARS: 16000,
    priceUSD: 18,
    originalPriceARS: 24000,
    deliveryTime: 'Entrega Inmediata (Descarga 24/7)',
    rating: 4.88,
    reviewsCount: 29,
    shortDescription:
      'Sistema de planificación para profesionales que quieren comunicar sus proyectos, casos de éxito y reflexiones de valor en redes profesionales sin quedarse sin ideas.',
    fullDescription:
      'Diseñado para directores, consultores y profesionales que entienden que comunicar su trabajo es fundamental. Incluye matrices de pilares de contenido, generador de ganchos de lectura y calendario editorial prediseñado.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoTitle: 'Demostración: Planificá tu contenido mensual en 1 hora',
    deliverables: [
      {
        title: 'Planner Editorial Interactivo (Notion & Excel)',
        description: 'Organizador con 30 disparadores de contenido profesional de alto impacto.',
      },
      {
        title: 'Plantilla de Medición de Alcance & Métricas',
        description: 'Seguimiento visual de crecimiento de conexiones y mensajes recibidos.',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: 'Pago & Descarga Instantánea',
        description: 'Acceso inmediato a la plantilla en Notion y Excel al confirmar tu compra.',
      },
      {
        stepNumber: 2,
        title: 'Implementación Sencilla',
        description: 'Duplicás la plantilla en tu cuenta personal y comenzás a planificar.',
      },
    ],
    faq: [
      {
        question: '¿Necesito pagar suscripción en Notion?',
        answer: 'No, funciona perfectamente con la versión totalmente gratuita de Notion y Excel.',
      },
    ],
    isFeatured: false,
  },
];

export function getSolutionBySlug(slug: string): SolutionItem | undefined {
  return solutionsData.find((item) => item.slug === slug);
}
