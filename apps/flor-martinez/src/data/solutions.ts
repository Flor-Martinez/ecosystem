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
    slug: 'finanzas-en-orden',
    title: 'Finanzas en Orden',
    tagline: 'Una plantilla donde cargás tus ingresos y gastos, y podés ver tu flujo mensual, presupuesto y metas en tiempo real.',
    type: 'producto',
    badgeText: 'Producto Digital',
    category: 'Productividad & Finanzas',
    priceARS: 14900,
    priceUSD: 15,
    originalPriceARS: 29800,
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
        title: 'Pago Seguro',
        description: 'Realizás el pago a través de nuestro portal seguro.',
      },
      {
        stepNumber: 2,
        title: 'Acceso Inmediato en la Web',
        description: 'Al instante te mostramos en pantalla tu link para copiar la planilla y tu clave. Si la perdés o tenés dudas, podés pedirla por WhatsApp.',
      },
      {
        stepNumber: 3,
        title: 'Activación Inmediata',
        description: 'Ingresás tu clave en la planilla ¡y ya tenés todo listo para usar!',
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
        title: 'Pago & Carga de Datos',
        description: 'Realizás el pago y nos cargás la información de tu experiencia o tu CV actual en la web.',
      },
      {
        stepNumber: 2,
        title: 'Redacción & Diseño Profesional',
        description: 'Optimizamos la estructura, redacción ejecutiva y formato para filtros ATS.',
      },
      {
        stepNumber: 3,
        title: 'Entrega por WhatsApp',
        description: 'Te enviamos tu nuevo CV final en PDF directamente por WhatsApp Business (en 48 a 72hs hábiles).',
      },
    ],
    faq: [
      {
        question: '¿Qué información tengo que enviar?',
        answer: 'Solo necesitás enviar tu CV actual (aunque esté desactualizado) o un listado con tu trayectoria y estudios.',
      },
      {
        question: '¿Tengo derecho a cambios si quiero ajustar algo?',
        answer: 'Sí, el servicio incluye 1 ronda de revisiones sobre la versión entregada.',
      },
    ],
    isFeatured: true,
  },
];

export function getSolutionBySlug(slug: string): SolutionItem | undefined {
  if (slug === 'organizador-de-finanzas') {
    return solutionsData.find((item) => item.slug === 'finanzas-en-orden');
  }
  return solutionsData.find((item) => item.slug === slug);
}
