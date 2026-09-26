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
  rating?: number;
  reviewsCount?: number;
  shortDescription: string;
  fullDescription: string;
  videoUrl?: string;
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
    title: 'Finanzas en Orden',
    tagline: 'Una plantilla donde cargás tus ingresos y gastos, y podés ver tu flujo mensual, presupuesto y metas en tiempo real.',
    type: 'producto',
    badgeText: 'Producto Digital',
    category: 'Productividad & Finanzas',
    priceARS: 18500,
    priceUSD: 20,
    originalPriceARS: 28000,
    deliveryTime: 'Entrega Inmediata (Acceso 24/7)',
    shortDescription:
      'Plantilla interactiva para registrar ingresos y gastos con proyecciones automáticas, presupuesto y el E-book completo "Finanzas en Orden" en PDF por Florencia Martínez.',
    fullDescription:
      'Finanzas en Orden es una herramienta inteligente desarrollada por Flor Martinez para eliminar el caos financiero y darte claridad absoluta sobre tu dinero. Incluye la plantilla de control en Google Sheets/Excel y el libro digital práctico de 12 módulos.',
    deliverables: [
      {
        title: 'Planilla de Finanzas Inteligente (Google Sheets y Excel)',
        description: 'Matriz ejecutiva automatizada con gráficos interactivos, flujo mensual y presupuestos.',
      },
      {
        title: 'Curso práctico de finanzas en PDF',
        description: 'E-book y guía práctica completa redactada por Florencia Martínez.',
      },
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: 'Pago Seguro & Confirmación',
        description: 'Realizás el pago a través de Mercado Pago o Stripe en nuestro portal seguro.',
      },
      {
        stepNumber: 2,
        title: 'Acceso Directo a tu Correo o WhatsApp',
        description: 'Recibís de forma automática el enlace a la plantilla con tu clave de licencia y el E-book en PDF.',
      },
      {
        stepNumber: 3,
        title: 'Soporte & Actualizaciones',
        description: 'Accedés a futuras mejoras de la plantilla sin costos adicionales.',
      },
    ],
    faq: [
      {
        question: '¿Necesito conocimientos avanzados de Excel o Google Sheets?',
        answer: 'Para nada. La plantilla viene completamente automatizada con fórmulas preconfiguradas y la guía paso a paso.',
      },
      {
        question: '¿Puedo usar la plantilla desde un celular o computadora?',
        answer: 'Es altamente conveniente y recomendado utilizarla desde una computadora (PC o Mac) en Google Chrome para disfrutar de los gráficos y tableros en pantalla completa.',
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
    title: 'Te Hago Tu CV',
    tagline: 'Rediseño y reestructuración profesional de tu currículum vitae para superar los filtros ATS y destacar ante los reclutadores.',
    type: 'servicio',
    badgeText: 'Servicio 1 a 1',
    category: 'Empleabilidad & Carrera',
    priceARS: 29900,
    priceUSD: 35,
    originalPriceARS: 42000,
    deliveryTime: 'Entrega en 48 a 72 horas hábiles',
    shortDescription:
      'Reescribo y optimizo tu CV con formato editorial ejecutivo y diagramación optimizada para filtros ATS.',
    fullDescription:
      'Los reclutadores le dedican un promedio de 6 segundos a cada currículum y muchos son descartados por sistemas automáticos (ATS). Con este servicio 1 a 1, tomo tu historial laboral y entrego tu CV final en PDF redactado con alto nivel ejecutivo.',
    deliverables: [
      {
        title: 'CV Final editado en PDF (Formato ATS & Imprimible)',
        description: 'Diseño editorial pulido, tipografía ejecutiva y diagramación optimizada para lectura rápida y filtros ATS.',
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
        title: 'Entrega Final & Ronda de Revisión',
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
];

export function getSolutionBySlug(slug: string): SolutionItem | undefined {
  if (slug === 'finanzas-en-orden') {
    return solutionsData.find((item) => item.slug === 'organizador-de-finanzas');
  }
  return solutionsData.find((item) => item.slug === slug);
}
