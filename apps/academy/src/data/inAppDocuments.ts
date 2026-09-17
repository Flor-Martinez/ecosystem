export interface DocumentSection {
  id: string;
  title: string;
  subtitle?: string;
  content?: string;
  callout?: {
    type: 'tip' | 'warning' | 'formula' | 'quote';
    text: string;
  };
  checklistItems?: {
    id: string;
    text: string;
    description?: string;
  }[];
  copyableTemplate?: {
    label: string;
    text: string;
  };
  tableData?: {
    headers: string[];
    rows: string[][];
  };
}

export interface InAppDocument {
  id: string;
  slug: string;
  title: string;
  category: string;
  programTitle?: string;
  moduleNumber?: number;
  badge: string;
  estimatedReadTime: string;
  summary: string;
  author: string;
  version: string;
  sections: DocumentSection[];
}

export const inAppDocumentsRegistry: Record<string, InAppDocument> = {
  'checklist-6-errores-cv': {
    id: 'checklist-6-errores-cv',
    slug: 'checklist-6-errores-cv',
    title: 'Checklist: Los 6 Errores que Arruinan tu CV',
    category: 'Auditoría de CV',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 3,
    badge: 'Checklist Interactivo In-App',
    estimatedReadTime: '3 min de verificación',
    summary:
      'Identificá y corregí los 6 errores más comunes que provocan el descarte automático de un currículum para maximizar tus posibilidades de conseguir entrevistas.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'los-6-errores-cv',
        title: '1. Los 6 Errores Críticos y sus Soluciones',
        subtitle: 'Evitá estos patrones para destacar frente al reclutador',
        content: 'Verificá que tu currículum esté libre de estos 6 fallos habituales:',
        checklistItems: [
          {
            id: 'err-1',
            text: 'Longitud excesiva: Más páginas no significa mejor CV. Mantené tu currículum en 1 página (o máximo 2 páginas para perfiles senior con más de 10 años).',
          },
          {
            id: 'err-2',
            text: 'Objetivo genérico: Evitá frases vacías como "Busco crecer profesionalmente". Reemplazalo por tu perfil profesional con propuesta de valor concreta.',
          },
          {
            id: 'err-3',
            text: 'Solo describir funciones: No hagas listas pasivas de tareas u obligaciones. Destacá logros medibles, mejoras de procesos e impacto real.',
          },
          {
            id: 'err-4',
            text: 'Diseño recargado: Eliminá el exceso de colores, gráficos, íconos o barras de porcentaje. Priorizá un diseño simple, limpio y profesional.',
          },
          {
            id: 'err-5',
            text: 'Errores de ortografía o fechas inconsistentes: Un solo error de tipeo o fechas contradictorias puede descartarte. Hacé una doble revisión antes de enviar.',
          },
          {
            id: 'err-6',
            text: 'El mismo CV para todas las búsquedas: No uses un archivo único genérico. Mantené un CV base y adaptalo a los requisitos clave de cada oferta.',
          },
        ],
      },
      {
        id: 'principio-clave-cv',
        title: '2. Principio Rector de Empleabilidad',
        subtitle: 'La premisa para evaluar tu documento',
        content:
          '> *"Un buen CV no es el más largo. Es el que consigue entrevistas."*\n\n' +
          'Tu currículum es un documento comercial de alto impacto: cada línea debe justificar por qué sos la persona indicada para resolver los problemas del puesto.',
      },
    ],
  },
  'guia-cv-segun-perfil': {
    id: 'guia-cv-segun-perfil',
    slug: 'guia-cv-segun-perfil',
    title: 'Guía: El CV según tu Perfil y Momento de Carrera',
    category: 'Estrategia y Posicionamiento',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 3,
    badge: 'Matriz de Carrera In-App',
    estimatedReadTime: '4 min de lectura',
    summary:
      'Estrategias de jerarquía, enfoque y redacción para adaptar tu currículum según tu nivel de experiencia: Junior / Sin experiencia, Experiencia Media (3 a 10 años) o Senior (+10 años).',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'matriz-niveles-experiencia',
        title: '1. Estructura y Enfoque según Seniority',
        subtitle: 'Dónde poner el foco en cada etapa profesional',
        content:
          'No existe un CV universal. El documento debe reflejar con autenticidad dónde estás hoy y hacia dónde querés proyectar tu carrera:',
        tableData: {
          headers: ['Nivel de Perfil', 'Bloques Prioritarios', 'Enfoque Estratégico'],
          rows: [
            [
              'Perfil 1: Sin experiencia / Poca experiencia',
              '• Formación académica, cursos y certificaciones.\n• Experiencia inicial: voluntariados, pasantías y proyectos personales.\n• Habilidades técnicas, idiomas y herramientas.',
              'Mostrar potencial, iniciativa, agilidad y compromiso de aprendizaje.',
            ],
            [
              'Perfil 2: Experiencia media (3 a 10 años)',
              '• Crecimiento profesional y evolución entre puestos.\n• Logros cuantificables y responsabilidades clave.\n• Personalización y palabras clave según el aviso.',
              'Demostrar el valor que podés aportar desde el primer día con autonomía.',
            ],
            [
              'Perfil 3: Senior (+10 años / Liderazgo)',
              '• Logros de alto impacto en el negocio o facturación.\n• Liderazgo de equipos, proyectos transversales y decisiones.\n• Visión estratégica y optimización a gran escala.',
              'Transmitir experiencia consolidada, autoridad, solvencia y confianza.',
            ],
          ],
        },
      },
      {
        id: 'regla-transversal',
        title: '2. Regla Universal en Todos los Casos',
        subtitle: 'Personalización estratégica para cada postulación',
        content:
          'Sea cual sea tu nivel de antigüedad, **no existe el CV perfecto: existe un CV adaptado al puesto al que querés postularte**. Alineá tus términos y logros con las prioridades de la vacante.',
      },
    ],
  },
  'checklist-optimizacion-cv-ats': {
    id: 'checklist-optimizacion-cv-ats',
    slug: 'checklist-optimizacion-cv-ats',
    title: 'Checklist de 25 Puntos para Auditar tu CV antes de Postularte',
    category: 'CV & Presentación ATS',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 3,
    badge: 'Auditoría ATS In-App',
    estimatedReadTime: '5 min de revisión interactiva',
    summary:
      'Guía y lista de verificación interactiva paso a paso para asegurar que tu currículum supere los filtros algorítmicos ATS y capture la atención del selector en los primeros 6 segundos.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (Protegida In-App)',
    sections: [
      {
        id: 'formato-y-estructura',
        title: '1. Formato, Tipografía y Compatibilidad ATS',
        subtitle: 'Requisitos técnicos para que los lectores ATS no corrompan tu información',
        content:
          'Los Applicant Tracking Systems (ATS) procesan texto plano estructurado. Las tablas invisibles, íconos gráficos como barras de porcentaje y columnas dobles asimétricas desordenan la lectura cronológica del software.',
        callout: {
          type: 'warning',
          text: 'Nunca utilices barras de nivel o porcentajes (ej. "Inglés 80%"). El software ATS busca palabras clave estandarizadas como "B2 Advanced" o "C1 Fluent".',
        },
        checklistItems: [
          {
            id: 'c1',
            text: 'Extensión máxima de 1 página (hasta 10 años de experiencia) o 2 páginas (más de 10 años).',
            description: 'La concisión demuestra capacidad de síntesis ejecutiva.',
          },
          {
            id: 'c2',
            text: 'Tipografía estándar y legible (Calibri, Arial, Inter, Plus Jakarta Sans, Georgia) de 10 a 11.5 pt.',
            description: 'Evitar tipografías decorativas o manuscritas.',
          },
          {
            id: 'c3',
            text: 'Estructura en una sola columna limpia o jerarquía lineal clara.',
            description: 'Garantiza lectura secuencial de izquierda a derecha y de arriba a abajo.',
          },
          {
            id: 'c4',
            text: 'Sin fotos, DNI, estado civil o dirección física completa (solo Ciudad, País).',
            description: 'Protege tu privacidad y previene sesgos no profesionales.',
          },
        ],
      },
      {
        id: 'datos-y-titular',
        title: '2. Cabecera, Datos de Contacto y Titular Profesional',
        subtitle: 'La primera impresión visual de tu expediente',
        content:
          'Tu cabecera debe ser un bloque limpio y directo. El titular profesional debe posicionarte con el rol exacto al que aspirás en el mercado actual.',
        callout: {
          type: 'formula',
          text: 'FÓRMULA DEL TITULAR: [Rol Objetivo Principal] | [Especialidad o Tecnología Clave] | [Propuesta de Valor / Idioma]',
        },
        copyableTemplate: {
          label: 'Ejemplo de Titular Profesional Copiable:',
          text: 'Senior Project Manager | Agile & Scrum Master | Transformación Digital B2B (Inglés Bilingüe)',
        },
        checklistItems: [
          {
            id: 'c5',
            text: 'Nombre y Apellido en tipografía destacada (16 a 18 pt).',
          },
          {
            id: 'c6',
            text: 'Enlace directo y clicable a tu perfil de LinkedIn personalizado (ej. linkedin.com/in/tunombre).',
          },
          {
            id: 'c7',
            text: 'Email profesional (ej. nombre.apellido@gmail.com) y teléfono con código de país (+54 9...).',
          },
          {
            id: 'c8',
            text: 'Ubicación formateada: Ciudad, Provincia/Estado, País (ej. Buenos Aires, Argentina).',
          },
        ],
      },
      {
        id: 'redaccion-de-logros',
        title: '3. Redacción de Experiencia: Fórmula Acción + Contexto + Métrica',
        subtitle: 'Cómo redactar viñetas que demuestren resultados tangibles',
        content:
          'Los reclutadores no buscan una lista pasiva de responsabilidades del puesto, sino pruebas concretas de cómo agregaste valor, resolviste problemas y mejoraste métricas en cada empresa.',
        callout: {
          type: 'formula',
          text: 'FÓRMULA DE VIÑETA: [Verbo de Acción Fuerte] + [Contexto / Herramienta / Metodología] + [Resultado Cuantificable / Métrica]',
        },
        tableData: {
          headers: ['Redacción Pasiva Débil ❌', 'Redacción de Alto Impacto ATS ✅'],
          rows: [
            [
              'Encargado de coordinar reuniones de equipo y tareas.',
              'Lideré ceremonias ágiles (Scrum) para 12 colaboradores, reduciendo el tiempo de entrega de sprints en un 25%.',
            ],
            [
              'Manejo de redes sociales y generación de contenido.',
              'Diseñé e implementé la estrategia de contenidos en LinkedIn, incrementando el alcance orgánico un 140% en 6 meses.',
            ],
            [
              'Atención al cliente y resolución de quejas.',
              'Optimicé el protocolo de soporte técnico, elevando la tasa de satisfacción del cliente (CSAT) del 78% al 94%.',
            ],
          ],
        },
        checklistItems: [
          {
            id: 'c9',
            text: 'Cada experiencia incluye: Puesto exacto, Nombre de Empresa, Período (Mes/Año - Mes/Año) y Modalidad.',
          },
          {
            id: 'c10',
            text: 'Entre 3 y 5 viñetas de logros cuantificables por cada posición relevante.',
          },
          {
            id: 'c11',
            text: 'Verbos en pasado para experiencias previas y en presente para el trabajo actual.',
          },
          {
            id: 'c12',
            text: 'Presencia de palabras clave técnicas coincidentes con la descripción de la vacante.',
          },
        ],
      },
      {
        id: 'educacion-y-skills',
        title: '4. Educación, Idiomas y Skills Técnicas',
        subtitle: 'Cierre y validación de competencias duras',
        content:
          'Estructura tus estudios formales y certificaciones vigentes. Clasifica tus habilidades entre herramientas duras y metodologías de trabajo sin inventar escalas porcentuales.',
        checklistItems: [
          {
            id: 'c13',
            text: 'Grado académico o carrera universitaria (Título, Universidad, Año de graduación o "En curso").',
          },
          {
            id: 'c14',
            text: 'Certificaciones relevantes emitidas por entidades reconocidas con año de expedición.',
          },
          {
            id: 'c15',
            text: 'Nivel de idioma estandarizado (Nativo, Bilingüe, C1 Avanzado, B2 Intermedio-Avanzado).',
          },
        ],
      },
    ],
  },

  'plantilla-estructura-cv-editorial': {
    id: 'plantilla-estructura-cv-editorial',
    slug: 'plantilla-estructura-cv-editorial',
    title: 'Plantilla de CV Editorial de 1 Página (Estructura ATS)',
    category: 'Plantillas & Modelos In-App',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 1,
    badge: 'Plantilla In-App',
    estimatedReadTime: '8 min de estudio y adaptación',
    summary:
      'Estructura editorial maestra de 1 página optimizada para superar lectores ATS y capturar la atención de selectores de Argentina y el exterior.',
    author: 'Flor Martínez · Academia',
    version: '2026.1 Editorial',
    sections: [
      {
        id: 'anatomia-de-la-plantilla',
        title: '1. Anatomía y Jerarquía de la Página',
        subtitle: 'Distribución espacial recomendada',
        content:
          'Esta plantilla utiliza una proporción áurea vertical con márgenes simétricos de 1.5 cm. Toda la información crítica se ubica en el tercio superior (Nombre, Titular, Contacto y Perfil Profesional).',
        callout: {
          type: 'tip',
          text: 'Podes copiar los bloques directamente al portapapeles con los botones que figuran abajo y pegarlos en tu procesador de texto favorito.',
        },
      },
      {
        id: 'bloque-cabecera',
        title: '2. Bloque Cabecera & Perfil Profesional',
        subtitle: 'Copiar y completar con tus datos',
        content: 'El resumen ejecutivo debe contener entre 3 y 4 líneas enfocadas en tu valor comercial diferencial.',
        copyableTemplate: {
          label: 'Copiar Bloque Cabecera:',
          text: `[NOMBRE Y APELLIDO]
[TITULAR: Rol Objetivo Principal | 2 Tecnologías / Especialidades | Idioma]
[Ciudad, País] · [Email Profesional] · [Teléfono con código de país] · [URL LinkedIn Personalizada]

PERFIL PROFESIONAL
Profesional especializado en [Tu Especialidad Principal] con más de [X] años de trayectoria liderando [Proyectos / Áreas / Procesos clave]. Experiencia comprobada en [Logro 1 representativo] y [Logro 2 representativo]. Dominio de [Herramientas / Metodologías clave] y capacidad demostrada para [Impacto final en el negocio].`,
        },
      },
      {
        id: 'bloque-experiencia',
        title: '3. Bloque Experiencia Laboral Estructurada',
        subtitle: 'Estructura por posición',
        content: 'Repetí este bloque para cada uno de tus empleos de los últimos 7 a 10 años.',
        copyableTemplate: {
          label: 'Copiar Bloque Experiencia:',
          text: `EXPERIENCIA LABORAL

[NOMBRE DEL PUESTO] | [NOMBRE DE LA EMPRESA]
[Ciudad, País / Modalidad Remota / Híbrida] · [Mes Año Inicio – Mes Año Fin / Actualidad]
• [Verbo de acción] [Proyecto o proceso clave], logrando [resultado con métrica cuantificable: %, $, tiempo].
• Diseñé e implementé [solución / metodología / herramienta], optimizando [indicador clave de rendimiento] en un [X]%.
• Coordiné a un equipo multidisciplinario de [X] personas para el lanzamiento de [iniciativa], alcanzando [hito exitoso].
• Automaticé [proceso manual repetitivo] mediante [herramienta técnica], ahorrando [X] horas semanales del área.`,
        },
      },
      {
        id: 'bloque-educacion-skills',
        title: '4. Bloque Educación, Idiomas y Habilidades',
        subtitle: 'Cierre ordenado y sin saturación visual',
        content: 'Cerrá tu CV agrupando tus competencias duras por categoría lógica.',
        copyableTemplate: {
          label: 'Copiar Bloque Educación & Habilidades:',
          text: `EDUCACIÓN & CERTIFICACIONES
• [Título de Grado o Licenciatura] – [Universidad o Institución] ([Año Egreso / En curso])
• [Nombre de Certificación Internacional] – [Entidad Emisora] ([Año])

IDIOMAS
• Español: Nativo
• Inglés: [C1 Avanzado / B2 Profesional] (Capacidad de negociación y presentaciones ejecutivas)

HABILIDADES & HERRAMIENTAS
• Gestión & Metodologías: [Scrum, Kanban, OKRs, Gestión de Presupuestos, Negociación B2B]
• Herramientas Técnicas: [Jira, Notion, Excel Avanzado, SQL, Power BI, Google Analytics]`,
        },
      },
    ],
  },

  'plantilla-cv-minimalista-notion': {
    id: 'plantilla-cv-minimalista-notion',
    slug: 'plantilla-cv-minimalista-notion',
    title: 'Plantilla de CV Minimalista en Notion (Workspace Duplicable)',
    category: 'Plantillas & Modelos In-App',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 2,
    badge: 'Workspace Notion',
    estimatedReadTime: '5 min de duplicación y ajuste',
    summary:
      'Estructura modular en Notion lista para duplicar, mantener actualizada tu trayectoria profesional y exportar a PDF limpio con un solo clic.',
    author: 'Flor Martínez · Academia',
    version: 'Edición 2026 (Notion Template)',
    sections: [
      {
        id: 'instrucciones-duplicacion',
        title: '1. Cómo duplicar la plantilla en tu Notion',
        subtitle: 'Acceso directo a tu espacio de trabajo',
        content:
          'Podés duplicar esta plantilla directamente a tu cuenta de Notion. Te permite tener tu base de datos de experiencia siempre al día y generar versiones adaptadas para cada postulación.',
        callout: {
          type: 'tip',
          text: 'Al exportar desde Notion a PDF, seleccioná formato "A4" y márgenes "Default" para mantener la proporción limpia de una sola página.',
        },
      },
      {
        id: 'estructura-modular',
        title: '2. Bloques modulares listos para editar',
        subtitle: 'Jerarquía limpia en una columna',
        content:
          'La plantilla está configurada respetando los 5 bloques esenciales: Encabezado con enlaces interactivos, Perfil Profesional, Experiencia cronológica inversa con viñetas de logros, Educación y Habilidades.',
      },
    ],
  },

  'guia-optimizacion-linkedin-2026': {
    id: 'guia-optimizacion-linkedin-2026',
    slug: 'guia-optimizacion-linkedin-2026',
    title: 'Guía Rápida: Optimización de LinkedIn en 7 Pasos Clave',
    category: 'LinkedIn & Posicionamiento',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 3,
    badge: 'Guía Maestra In-App',
    estimatedReadTime: '12 min de lectura estratégica',
    summary:
      'Estrategia completa para configurar tu perfil de LinkedIn de modo que aparezca en las primeras búsquedas de LinkedIn Recruiter y genere contactos orgánicos de empresas.',
    author: 'Flor Martínez',
    version: '2026 Pro',
    sections: [
      {
        id: 'algoritmo-recruiter',
        title: '1. Cómo funciona el buscador de LinkedIn Recruiter',
        subtitle: 'Palabras clave y filtros booleanos',
        content:
          'Los selectores utilizan búsquedas con palabras clave exactas (Keywords), filtros de ubicación y operadores booleanos (AND, OR, NOT). Si tu perfil no tiene las palabras clave en el Titular, Acerca De y Experiencias, tu perfil permanece invisible.',
        callout: {
          type: 'quote',
          text: 'LinkedIn no premia la poesía abstracta; premia la precisión de palabras clave y la claridad de tu propuesta de valor.',
        },
      },
      {
        id: 'titular-magnetico',
        title: '2. La Fórmula del Titular Magnético (220 Caracteres)',
        subtitle: 'La línea más importante de todo tu perfil',
        content:
          'Tu titular te acompaña en cada comentario, mensaje privado y resultado de búsqueda. No pongas solo "En búsqueda de nuevas oportunidades" o "Licenciado en Administración".',
        copyableTemplate: {
          label: 'Fórmula de Titular de Alta Conversión:',
          text: '[Rol Profesional Actual / Aspirado] | [Especialidad o Industria] | [Herramientas / Metodologías Core] | Ayudo a [Target] a [Resultado específico]',
        },
      },
      {
        id: 'acerca-de-storytelling',
        title: '3. Redacción del "Acerca de mí" con Storytelling',
        subtitle: 'Estructura en 4 párrafos que convierte visitas en entrevistas',
        content:
          'Las primeras 3 líneas antes del botón "...ver más" deben generar curiosidad inmediata. Luego, sintetiza tus logros, tus pasiones profesionales y tu llamado a la acción con tu email de contacto.',
        copyableTemplate: {
          label: 'Estructura recomendada en 4 párrafos:',
          text:
            '• Párrafo 1 (Gancho): Quién sos, tu especialidad principal y qué problemas concretos resolvés.\n' +
            '• Párrafo 2 (Trayectoria): Resumen de tu experiencia destacando proyectos y áreas de conocimiento.\n' +
            '• Párrafo 3 (Logros): 3 viñetas con impacto medible y herramientas clave.\n' +
            '• Párrafo 4 (Llamada a la Acción): Tu email de contacto directo para propuestas profesionales.',
        },
      },
    ],
  },
  'directorio-portales-empleo-remoto': {
    id: 'directorio-portales-empleo-remoto',
    slug: 'directorio-portales-empleo-remoto',
    title: 'Directorio Actualizado de Portales y Consultoras',
    category: 'Canales de Búsqueda',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 5,
    badge: 'Directorio Activo In-App',
    estimatedReadTime: '4 min de navegación',
    summary:
      'Listado dinámico y clasificado de plataformas de empleo en Sudamérica, portales de nicho y trabajo remoto global, y consultoras de selección / headhunters con enlaces directos.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (Actualizada)',
    sections: [
      {
        id: 'portales-masivos-sudamerica',
        title: '1. Bolsas de Empleo Masivas Líderes en Sudamérica',
        subtitle: 'Plataformas consolidadas para puestos corporativos, híbridos y presenciales',
        content:
          'Recomendamos concentrar las postulaciones en las plataformas con mayor volumen de vacantes por país y configurar alertas automáticas por correo:',
        tableData: {
          headers: ['Plataforma', 'Cobertura Principal', 'Tipo de Vacantes'],
          rows: [
            ['Computrabajo', 'Argentina, Colombia, Chile, Perú, México', 'Corporativo, Comercial, Administración, Operaciones'],
            ['Bumeran / Laborum', 'Argentina, Perú, Chile, Ecuador, Panamá', 'Mandos medios, Profesionales, Multinacionales'],
            ['Indeed', 'Regional e Internacional', 'Metabuscador masivo de todas las fuentes'],
            ['ZonaJobs', 'Argentina', 'Perfiles profesionales y corporativos'],
            ['LinkedIn Jobs', 'Global / Regional', 'Perfiles especializados, mandos medios y tecnología'],
          ],
        },
      },
      {
        id: 'portales-remoto-usd',
        title: '2. Portales de Nicho y Trabajo Remoto Global (USD / EUR)',
        subtitle: 'Para trabajar desde Latinoamérica exportando servicios',
        content:
          'Plataformas internacionales donde las contrataciones se realizan bajo modalidad Contractor o EOR:',
        tableData: {
          headers: ['Plataforma', 'Especialidad', 'Modalidad / Moneda'],
          rows: [
            ['Wellfound (AngelList)', 'Startups internacionales, Producto, Ventas tech', 'Remoto Global · USD'],
            ['RemoteOK', 'Marketing, Operaciones, Soporte, Desarrollo', 'Remoto 100% · USD'],
            ['Torre.ai', 'Perfiles profesionales de toda Latinoamérica', 'Híbrido / Remoto · Multimoneda'],
            ['We Work Remotely', 'Empresas de USA y Europa sin límite geográfico', 'Remoto Global · USD'],
            ['FlexJobs', 'Vacantes verificadas sin spam (Plataforma curada)', 'Remoto Internacional'],
          ],
        },
      },
      {
        id: 'consultoras-headhunting',
        title: '3. Consultoras de Selección & Headhunters Internacionales',
        subtitle: 'Registrá tu CV en su base de datos interna y conectá con sus recruiters',
        content:
          'Las consultoras de selección gestionan procesos confidenciales que no se publican en portales públicos:',
        tableData: {
          headers: ['Consultora', 'Especialidad', 'Recomendación'],
          rows: [
            ['PageGroup (Michael Page / Page Personnel)', 'Mandos medios, ejecutivos, finanzas, comex y tech', 'Cargar CV en su portal y conectar con recruiters de tu área en LinkedIn'],
            ['Randstad', 'Perfiles profesionales, logística, operaciones y comerciales', 'Revisar portal de empleos semanalmente'],
            ['Adecco / Manpower', 'Volumen operativo, mandos iniciales e intermedios', 'Registro en base de datos nacional'],
            ['Hays', 'Perfiles técnicos y de alta especialización', 'Seguir a sus líderes de práctica en LinkedIn'],
          ],
        },
      },
    ],
  },
  'plantilla-registro-empresas-objetivo': {
    id: 'plantilla-registro-empresas-objetivo',
    slug: 'plantilla-registro-empresas-objetivo',
    title: 'Plantilla de Registro de Sitios de Empleo de Empresas Objetivo',
    category: 'Empresas Objetivo',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 5,
    badge: 'Plantilla In-App',
    estimatedReadTime: '4 min de aplicación',
    summary:
      'Planilla estructurada para auditar y registrar los portales de talento, sistemas ATS y opciones de perfil de tus 15 empresas objetivo del Módulo 1.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'registro-sistemas-carreras',
        title: '1. Registro de Ecosistemas de Contratación de Empresas Target',
        subtitle: 'Auditoría de cómo contrata cada una de tus 15 empresas',
        content:
          'Completá esta tabla ingresando a la web oficial de cada empresa de tu lista del Módulo 1:',
        tableData: {
          headers: ['#', 'Empresa Objetivo', 'URL de Carreras / Trabaja con Nosotros', 'Sistema (ATS propio / Base / Formulario)', '¿Permite Alertas?'],
          rows: [
            ['1', 'Mercado Libre', 'mercadolibre.com/careers', 'Portal propio con perfil', 'Sí (Por área y país)'],
            ['2', 'Globant', 'globant.com/careers', 'Base de talentos global', 'Sí (Alertas por rol)'],
            ['3', 'Auth0 / Okta', 'okta.com/company/careers', 'Software ATS (Greenhouse)', 'Sí (Notificaciones por correo)'],
            ['4', '[Tu Empresa 4]', 'https://...', 'Portal propio / Formulario', 'Pendiente de registrar'],
            ['5', '[Tu Empresa 5]', 'https://...', 'Portal propio / Formulario', 'Pendiente de registrar'],
          ],
        },
      },
      {
        id: 'preguntas-auditoria-empresas',
        title: '2. Checklist de Preguntas para la Auditoría de Carrera',
        subtitle: 'Qué verificar al ingresar a la web de la empresa',
        content:
          'Utilizá este checklist cada vez que navegues el sitio oficial de una empresa target para no perder oportunidades de postulación:',
        checklistItems: [
          {
            id: 'chk-car-1',
            text: '¿Tiene un portal de carreras propio o deriva a un formulario externo?',
            description: 'Identificar si tienen plataforma dedicada o reciben CV por correo.',
          },
          {
            id: 'chk-car-2',
            text: '¿Permite crear un perfil de candidato y cargar CV en su base de talentos?',
            description: 'Aunque no haya vacante hoy, registrar el perfil para futuras búsquedas.',
          },
          {
            id: 'chk-car-3',
            text: '¿Permite configurar alertas automáticas por país, área o modalidad?',
            description: 'Activar avisos para recibir notificaciones inmediatas ante nuevas aperturas.',
          },
        ],
      },
    ],
  },
  'guia-fuentes-no-tradicionales': {
    id: 'guia-fuentes-no-tradicionales',
    slug: 'guia-fuentes-no-tradicionales',
    title: 'Guía de Fuentes No Tradicionales y Búsqueda Estratégica',
    category: 'Estrategias de Búsqueda',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 5,
    badge: 'Guía de Estrategia',
    estimatedReadTime: '4 min de consulta',
    summary:
      'Estrategias para descubrir vacantes fuera de las bolsas masivas: cámaras empresariales, asociaciones, ferias y combinación estratégica de términos en buscadores.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'canales-no-tradicionales-principales',
        title: '1. Los 4 Canales No Tradicionales de Alta Efectividad',
        subtitle: 'Dónde buscar cuando querés evitar la sobrepoblación de postulantes',
        content:
          '• **Cámaras y Asociaciones Sectoriales:** Cámaras de comercio bilateral (AmCham, Cámara Franco-Argentina, etc.), cámaras industriales y colegios profesionales que tienen bolsas internas.\n' +
          '• **Ferias y Congresos Profesionales:** Eventos presenciales o virtuales organizados por universidades, cámaras o polos tecnológicos.\n' +
          '• **Comunidades y Espacios de Nicho:** Grupos en Slack, Discord o newsletters temáticos donde líderes de área publican avisos antes de abrir procesos masivos.\n' +
          '• **Búsqueda Estratégica en Internet:** Combinaciones específicas de términos en buscadores web para encontrar portales de empleo directo.',
      },
      {
        id: 'combinaciones-busqueda-estrategica',
        title: '2. Combinaciones Clave para Buscadores Web',
        subtitle: 'Fórmulas para encontrar portales de carreras de empresas',
        content:
          'Utilizá estas combinaciones booleanas y de palabras clave directamente en Google para descubrir páginas de carreras y vacantes directas no indexadas en portales masivos:',
        tableData: {
          headers: ['Objetivo de Búsqueda', 'Combinación de Términos'],
          rows: [
            ['Páginas de carreras por puesto y país', '"[Tu Puesto]" ("trabaja con nosotros" OR "oportunidades laborales") "[País]"'],
            ['Vacantes en startups o empresas de nicho', '"[Tu Puesto]" ("careers" OR "jobs") ("remoto" OR "remote") "[Región]"'],
            ['Bolsas de empleo de asociaciones', '"bolsa de trabajo" OR "oportunidades" "[Tu Profesión o Industria]"'],
          ],
        },
      },
    ],
  },
  'mapa-fuentes-laborales': {
    id: 'mapa-fuentes-laborales',
    slug: 'mapa-fuentes-laborales',
    title: '🗺️ Mi Mapa de Fuentes Laborales',
    category: 'Ecosistema de Búsqueda',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 5,
    badge: 'Herramienta Troncal In-App',
    estimatedReadTime: '5 min de aplicación',
    summary:
      'Tu ecosistema personalizado de búsqueda laboral en 4 cuadrantes: portales relevantes para tu perfil, empresas objetivo con sus sitios de carrera, consultoras/headhunters de tu sector y fuentes especializadas.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (Plantilla Activa)',
    sections: [
      {
        id: 'cuadrante-1-portales',
        title: '1. Cuadrante 1: Portales de Empleo Seleccionados',
        subtitle: 'Solo aquellas plataformas que tienen vacantes reales para tu perfil y modalidad',
        content:
          'Completá tus portales clave (generales o de nicho) y la frecuencia con la que vas a revisarlos o activar alertas:',
        tableData: {
          headers: ['Portal de Empleo', 'Tipo (General / Especializado)', 'Modalidad / Región', 'Frecuencia de Revisión'],
          rows: [
            ['[Ej. Portal Generalista]', 'Generalista', 'Híbrido / Presencial (Nacional)', 'Alertas automáticas activas'],
            ['[Ej. Portal Remoto Tech / Digital]', 'Especializado en Remoto', 'Remoto Global (USD / EUR)', 'Martes y Jueves'],
            ['[Ej. Portal de tu Industria / Nicho]', 'Especializado por Sector', 'Nacional / Regional', 'Semanal'],
          ],
        },
      },
      {
        id: 'cuadrante-2-empresas-objetivo',
        title: '2. Cuadrante 2: Empresas Objetivo & Sitios de Carrera',
        subtitle: 'Tus 15 empresas del Módulo 1 con sus enlaces directos a sus portales de talento',
        content:
          'Registrá el enlace directo a la sección de carreras de tus empresas deseadas y el estado de tu postulación o registro en base de talentos:',
        tableData: {
          headers: ['Empresa Objetivo', 'Enlace a Carreras / Empleos', '¿Tiene Base de Talentos?', 'Estado'],
          rows: [
            ['[Empresa Target 1]', 'https://empresa1.com/careers', 'Sí (Perfil creado)', 'Guardada en radar'],
            ['[Empresa Target 2]', 'https://empresa2.com/jobs', 'Sí (CV cargado en ATS)', 'Alerta de vacantes activa'],
            ['[Empresa Target 3]', 'https://empresa3.com/talento', 'No (Monitoreo mensual)', 'Revisión periódica'],
          ],
        },
      },
      {
        id: 'cuadrante-3-consultoras',
        title: '3. Cuadrante 3: Consultoras de Selección & Headhunters',
        subtitle: 'Firmas de reclutamiento que intermedian en tu industria, seniority o especialidad',
        content:
          'Mapeá las consultoras que gestionan procesos confidenciales o tercerizados en tu área:',
        tableData: {
          headers: ['Consultora / Agencia', 'Especialidad / Seniority', 'Acción Realizada', 'Contacto / Recruiter'],
          rows: [
            ['[Consultora Ejecutiva / Mandos Medios]', 'Finanzas, Operaciones, Tech', 'CV registrado en base interna', 'Conexión enviada en LinkedIn'],
            ['[Consultora Sectorial de tu Rubro]', 'Industria específica', 'Suscripción a newsletter de empleos', 'Seguimiento mensual'],
          ],
        },
      },
      {
        id: 'cuadrante-4-fuentes-especializadas',
        title: '4. Cuadrante 4: Fuentes Especializadas & Canales No Tradicionales',
        subtitle: 'Cámaras, asociaciones, ferias, comunidades y newsletters de nicho',
        content:
          'Tus canales complementarios donde circulan oportunidades que no llegan a los portales masivos:',
        tableData: {
          headers: ['Fuente Especializada', 'Tipo de Canal (Cámara / Comunidad / Evento)', 'Cómo acceder', 'Beneficio'],
          rows: [
            ['[Colegio / Asociación Profesional]', 'Asociación Profesional', 'Bolsa de trabajo exclusiva miembros', 'Vacantes con poca competencia'],
            ['[Comunidad en Slack / Discord]', 'Comunidad Profesional', 'Canal #jobs / #oportunidades', 'Contacto directo con líderes'],
            ['[Feria Laboral / Congreso Anual]', 'Evento del Sector', 'Asistencia anual / networking', 'Descubrimiento de empresas nuevas'],
          ],
        },
      },
    ],
  },
  'guia-evaluacion-requisitos-ofertas': {
    id: 'guia-evaluacion-requisitos-ofertas',
    slug: 'guia-evaluacion-requisitos-ofertas',
    title: 'Guía de Evaluación de Requisitos y Match Laboral',
    category: 'Evaluación de Vacantes',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 6,
    badge: 'Herramienta de Decisión In-App',
    estimatedReadTime: '4 min de aplicación',
    summary:
      'Metodología para clasificar los requisitos de cualquier oferta laboral en tres niveles (indispensables, importantes y deseables) y tomar decisiones de postulación sin auto-descarte.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'los-3-niveles-requisitos',
        title: '1. Los 3 Niveles de Requisitos en una Descripción de Puesto',
        subtitle: 'Cómo interpretar la búsqueda con la mirada de un selector',
        content:
          'Una descripción de puesto suele representar el perfil ideal que la empresa busca, pero casi nunca se cumple el 100% de los requisitos. Clasificá la oferta en estos 3 grupos:',
        tableData: {
          headers: ['Nivel de Requisito', 'Definición & Criterio', 'Ejemplos Habituales', '¿Cómo proceder?'],
          rows: [
            [
              '1. Indispensables',
              'Imprescindibles para poder realizar el trabajo diario. Sin ellos es casi imposible operar.',
              'Matrícula habilitante, idioma de uso diario con clientes externos, licencia obligatoria o base técnica central.',
              'Si no los cumplís, evalúa no postularte para no generar frustración.',
            ],
            [
              '2. Importantes',
              'Competencias de alto peso pero donde existe margen de compensación según tu perfil general.',
              'Años de experiencia (ej. piden 5 y tenés 3), herramientas de software secundarias o metodologías ágiles.',
              'Si cumplís con el resto y tu experiencia es sólida, ¡postulate!',
            ],
            [
              '3. Deseables',
              'Conocimientos "nice to have" que suman valor adicional pero cuya ausencia no te descalifica.',
              'Cursos complementarios, conocimientos de herramientas accesorias o industrias afines.',
              'Nunca dejes de postularte por no tener un requisito deseable.',
            ],
          ],
        },
      },
      {
        id: 'checklist-autodiagnostico-match',
        title: '2. Checklist Rápido de Match antes de Postular',
        subtitle: 'Preguntas para tomar una decisión informada en 2 minutos',
        content: 'Respondé mentalmente estas 3 preguntas frente a cualquier vacante:',
        checklistItems: [
          {
            id: 'match-chk-1',
            text: '¿Cumplo con los requisitos indispensables para realizar las tareas operativas centrales?',
            description: 'Verificar competencias técnicas base, matriculación o idioma de trabajo.',
          },
          {
            id: 'match-chk-2',
            text: '¿Mi experiencia previa o conocimientos tienen relación demostrable con este puesto?',
            description: 'Tener trayectoria o habilidades transferibles que justifiquen tu candidatura.',
          },
          {
            id: 'match-chk-3',
            text: '¿Estoy evitando auto-descartarme solo porque me falta un punto menor?',
            description: 'Recordar que el selector busca a la mejor persona real, no a un perfil de manual inalcanzable.',
          },
        ],
      },
    ],
  },
  'plantilla-postulacion-profesional-cover-letter': {
    id: 'plantilla-postulacion-profesional-cover-letter',
    slug: 'plantilla-postulacion-profesional-cover-letter',
    title: 'Plantilla de Mensajes de Presentación & Checklist Pre-Envío',
    category: 'Postulación Profesional',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 6,
    badge: 'Plantillas & Checklist In-App',
    estimatedReadTime: '4 min de aplicación',
    summary:
      'Estructura breve y profesional de 3 partes para postulaciones por correo electrónico o formularios con nota, ejemplos adaptables y checklist de verificación antes del envío.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'estructura-3-partes-mensaje',
        title: '1. Estructura del Mensaje de Presentación en 3 Partes',
        subtitle: 'Sin cartas de venta agresivas ni párrafos interminables',
        content:
          'Cuando la postulación se realiza por correo electrónico o la plataforma solicita una nota de presentación, utilizá esta estructura concisa:\n\n' +
          '• **Parte 1 — Presentación y Puesto:** Tu nombre y la posición exacta a la que aplicás.\n' +
          '• **Parte 2 — Vínculo de Experiencia:** Breve síntesis de tu trayectoria vinculada a los desafíos del rol.\n' +
          '• **Parte 3 — Cierre & Disponibilidad:** Mención del CV adjunto y cordial disposición para ampliar información.',
        copyableTemplate: {
          label: 'Plantilla Base Adaptable (Mensaje / Email):',
          text: `Hola, mi nombre es [Tu Nombre y Apellido] y me contacto para postularme a la posición de [Nombre del Puesto].

Cuento con experiencia en [Área o Especialidad 1] y [Área o Especialidad 2], especialmente vinculada a [Logro, función principal o sector relacionado].

Adjunto mi CV para su consideración y quedo a total disposición para ampliar cualquier información.

Muchas gracias.
[Tu Nombre y Apellido] · [Teléfono / WhatsApp] · [Enlace a LinkedIn]`,
        },
      },
      {
        id: 'checklist-pre-envio-postulacion',
        title: '2. Checklist de Verificación Pre-Envío',
        subtitle: 'Qué revisar antes de hacer clic en enviar',
        content: 'Verificá estos 5 elementos críticos antes de confirmar la postulación:',
        checklistItems: [
          {
            id: 'chk-pre-1',
            text: 'Versión del CV correcta y actualizada',
            description: 'El CV está adaptado con las palabras clave y logros pertinentes para esta búsqueda (Módulo 3).',
          },
          {
            id: 'chk-pre-2',
            text: 'Nombre del archivo profesional',
            description: 'El archivo está guardado en PDF con formato claro: CV_Nombre_Apellido_Puesto.pdf.',
          },
          {
            id: 'chk-pre-3',
            text: 'Canal oficial respetado',
            description: 'Se utilizó el medio solicitado por la empresa (formulario, ATS o correo específico).',
          },
          {
            id: 'chk-pre-4',
            text: 'Asunto de correo claro y prolijo (si aplica)',
            description: 'Ejemplo: Postulación [Puesto] - [Nombre y Apellido].',
          },
          {
            id: 'chk-pre-5',
            text: 'Datos de contacto e hipervínculos funcionales',
            description: 'Teléfono, correo y enlace a LinkedIn perfectamente legibles y activos.',
          },
        ],
      },
    ],
  },
  'guia-seguimiento-profesional-protocolos': {
    id: 'guia-seguimiento-profesional-protocolos',
    slug: 'guia-seguimiento-profesional-protocolos',
    title: 'Guía de Seguimiento Profesional y Protocolos de Recontacto',
    category: 'Seguimiento & Follow-Up',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 6,
    badge: 'Guía & Scripts In-App',
    estimatedReadTime: '4 min de consulta',
    summary:
      'Protocolos para recontactar selectores con criterio: respetar plazos informados, redactar mensajes profesionales de agradecimiento y registrar el estado en el Tracker sin paralizar la búsqueda.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'criterio-tiempos-seguimiento',
        title: '1. Criterio de Tiempos y Respeto de Plazos',
        subtitle: 'Cuándo escribir y cuándo esperar',
        content:
          '• **Si te informaron un plazo específico:** (Ejemplo: "Te avisamos a mediados de la semana próxima"). Esperá a que venza el plazo antes de enviar un mensaje.\n' +
          '• **Si venció el plazo informado:** Podés enviar un recontacto breve, cordial y profesional para consultar el estado del proceso.\n' +
          '• **Si no hubo plazo explícito:** Una ventana prudencial para consultas es de 5 a 7 días hábiles posteriores a la última comunicación.\n' +
          '• **Regla de Oro:** Continuá con tu búsqueda en paralelo. Ningún proceso está cerrado hasta que exista una propuesta formal firmada.',
      },
      {
        id: 'modelos-recontacto-profesional',
        title: '2. Modelos de Mensaje para Seguimiento',
        subtitle: 'Scripts elegantes y sin presión',
        content: 'Elegí el modelo adecuado según tu situación:',
        copyableTemplate: {
          label: 'Modelo 1: Seguimiento Posterior a una Entrevista (Plazo Vencido):',
          text: `Hola, [Nombre del Selector/a]. ¿Cómo estás?

Quería agradecerte nuevamente por el espacio de la entrevista del pasado [Día] y consultar si existen novedades respecto del proceso de selección para la posición de [Nombre del Puesto].

Continúo muy interesado/a en la oportunidad y en los desafíos del equipo, y quedo a total disposición si necesitan información adicional.

Muchas gracias.
[Tu Nombre y Apellido]`,
        },
      },
      {
        id: 'modelo-post-postulacion-directa',
        title: '3. Modelo 2: Consulta sobre Postulación Directa',
        subtitle: 'Cuando postulaste por correo o mensaje a un recruiter',
        content: 'Para enviar sobre el mismo hilo de correo original:',
        copyableTemplate: {
          label: 'Modelo 2: Consulta de Recepción y Estado:',
          text: `Hola, [Nombre]. ¿Cómo estás?

Te escribo brevemente sobre este hilo para confirmar si tuvieron oportunidad de recibir mi postulación para la búsqueda de [Nombre del Puesto].

Reitero mi interés en la posición y quedo a disposición ante cualquier consulta sobre mi perfil.

¡Muchas gracias y que tengas una excelente semana!
[Tu Nombre y Apellido]`,
        },
      },
    ],
  },
  'guia-seguridad-laboral-ofertas-sospechosas': {
    id: 'guia-seguridad-laboral-ofertas-sospechosas',
    slug: 'guia-seguridad-laboral-ofertas-sospechosas',
    title: 'Guía de Seguridad Laboral y Detección de Ofertas Sospechosas',
    category: 'Seguridad & Verificación',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 6,
    badge: 'Guía de Seguridad In-App',
    estimatedReadTime: '4 min de prevención',
    summary:
      'Guía práctica para identificar señales de alerta en búsquedas laborales dudosas, proteger tus datos personales y validar la autenticidad de empresas y reclutadores.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'senales-alerta-criticas',
        title: '1. Las 6 Señales de Alerta Críticas (Red Flags)',
        subtitle: 'Patrones recurrentes en propuestas dudosas o fraudulentas',
        content:
          'Mantené una postura de verificación inmediata ante cualquiera de estas señales:',
        checklistItems: [
          {
            id: 'sec-chk-1',
            text: '1. Solicitudes de dinero o pagos para iniciar el proceso',
            description: 'Ninguna empresa seria te pedirá pagar por exámenes médicos, trámites, capacitaciones iniciales o compra de software/equipos.',
          },
          {
            id: 'sec-chk-2',
            text: '2. Pedido prematuro de datos sensibles o financieros',
            description: 'Desconfiá si solicitan datos de cuentas bancarias, claves, números de tarjeta o fotos de documentación antes de una entrevista formal.',
          },
          {
            id: 'sec-chk-3',
            text: '3. Dominios de correo genéricos o identidades dudosas',
            description: 'Supuestos selectores de grandes compañías que escriben desde cuentas @gmail/@hotmail o dominios web que no coinciden con la empresa oficial.',
          },
          {
            id: 'sec-chk-4',
            text: '4. Presión desmedida y urgencia para aceptar ya',
            description: 'Mensajes que exigen respuestas inmediatas o contratación instantánea sin haber tenido siquiera una videollamada de conocimiento.',
          },
          {
            id: 'sec-chk-5',
            text: '5. Salarios extraordinarios sin requisitos de experiencia',
            description: 'Ofertas de miles de dólares o sueldos fuera de cualquier lógica de mercado por tareas simples de 1 o 2 horas diarias.',
          },
          {
            id: 'sec-chk-6',
            text: '6. Mensajes no solicitados por canales informales',
            description: 'Contactos por WhatsApp o Telegram de números desconocidos ofreciendo empleo sin que te hayas postulado previamente.',
          },
        ],
      },
      {
        id: 'protocolo-verificacion-empresas',
        title: '2. Protocolo de Verificación de Legitimidad',
        subtitle: 'Cómo comprobar si la búsqueda y la empresa son reales',
        content:
          '• **Verificar el sitio oficial:** Ingresá al portal corporativo de la empresa y constatá si la vacante figura en su sección de "Carreras" / "Trabajá con nosotros".\n' +
          '• **Auditar el perfil del reclutador en LinkedIn:** Comprobá si la persona que te contacta trabaja formalmente en la empresa y cuenta con trayectoria comprobable.\n' +
          '• **Canales corporativos:** Confirmá que las comunicaciones provengan de direcciones con el dominio oficial de la organización.\n' +
          '• **Priorizá tu seguridad:** Ante cualquier duda fundada, no compartas información confidencial y consultá en las sesiones semanales de la Academia.',
      },
    ],
  },
  'checklist-preparacion-fases-entrevistas': {
    id: 'checklist-preparacion-fases-entrevistas',
    slug: 'checklist-preparacion-fases-entrevistas',
    title: 'Checklist de Preparación por Fases y Puesta a Punto Virtual',
    category: 'Entrevistas & Puesta a Punto',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 7,
    badge: 'Checklist In-App',
    estimatedReadTime: '4 min de verificación',
    summary:
      'Guía paso a paso para auditar tu entorno técnico virtual (cámara, audio, iluminación) y preparar tu mensaje según el interlocutor de cada fase (RRHH, Hiring Manager o Prueba Técnica).',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'puesta-a-punto-virtual',
        title: '1. Puesta a Punto Técnica y Entorno de Videollamada',
        subtitle: 'Detalles que comunican solvencia y profesionalismo antes de decir una sola palabra',
        content: 'Verificá estos 6 elementos al menos 15 minutos antes de conectar:',
        checklistItems: [
          {
            id: 'tec-1',
            text: 'Cámara a la altura de los ojos: Elevá tu laptop o monitor para mantener contacto visual natural a la lente.',
            description: 'Evitá ángulos en contrapicado o enfocar el techo.',
          },
          {
            id: 'tec-2',
            text: 'Iluminación frontal suave: Fuente de luz principal ubicada frente a tu rostro, nunca a tus espaldas (evitar contraluz).',
            description: 'Si tenés una ventana detrás, cerrá la cortina y usá una lámpara cálida o neutra al frente.',
          },
          {
            id: 'tec-3',
            text: 'Audio nítido y probado: Auriculares con micrófono o micrófono probado en la plataforma (Zoom / Google Meet / Teams).',
            description: 'Hacé una prueba de sonido previa para eliminar eco ambiental.',
          },
          {
            id: 'tec-4',
            text: 'Fondo ordenado y profesional: Espacio despejado, pared neutra o desenfoque leve si el entorno no es óptimo.',
            description: 'Evitá fondos virtuales artificiales que parpadeen con tus movimientos.',
          },
          {
            id: 'tec-5',
            text: 'Conexión y notificaciones silenciadas: Cerrá pestañas pesadas y activá "No molestar" en computadora y celular.',
            description: 'Garantizá ancho de banda estable para evitar cortes o congelamientos de imagen.',
          },
          {
            id: 'tec-6',
            text: 'Vaso de agua, libreta física y CV a mano: Para tomar notas de nombres y dudas clave sin teclear frente a cámara.',
            description: 'Tener agua al lado te permite hacer una pausa natural si necesitás aclarar la garganta.',
          },
        ],
      },
      {
        id: 'fases-y-objetivos-interlocutor',
        title: '2. Qué Evalúa Realmente Cada Interlocutor',
        subtitle: 'Adaptá tu enfoque y profundidad técnica según quién te entrevista',
        content: 'No des el mismo tipo de respuesta a todos los evaluadores:',
        tableData: {
          headers: ['Fase / Interlocutor', 'Objetivo Principal del Evaluador', 'Foco de tu Preparación'],
          rows: [
            [
              '1. Screening / RRHH (15-30 min)',
              'Validar requisitos básicos: disponibilidad, rango salarial, estabilidad y encaje con la cultura.',
              'Pitch de 90s impecable, claridad en pretensión económica y motivos de cambio positivos.',
            ],
            [
              '2. Hiring Manager / Futuro Jefe (45-60 min)',
              'Comprobar criterio técnico, capacidad de resolución de problemas reales y autonomía diaria.',
              'Historias STAR con foco en metodologías, decisiones tomadas y métricas de impacto en el negocio.',
            ],
            [
              '3. Prueba Técnica / Caso Práctico',
              'Evaluar razonamiento analítico, estructura de trabajo, priorización y justificación de decisiones.',
              'Explicar tu proceso mental, supuestos de negocio y cómo argumentás técnicamente tu solución.',
            ],
            [
              '4. Entrevista Final / Directiva',
              'Validar visión estratégica, valores humanos a largo plazo y sinergia con el liderazgo.',
              'Preguntas estratégicas sobre el futuro del negocio y compromiso con los objetivos de la compañía.',
            ],
          ],
        },
      },
      {
        id: 'regla-de-oro-entrevistas',
        title: '3. Regla de Oro de Preparación',
        subtitle: 'El cambio de mentalidad fundamental',
        content:
          '> *"No prepares solo respuestas de memoria. Prepará tu historia profesional y demostrá con hechos cómo agregás valor."*\n\n' +
          'Una entrevista no es un examen donde tenés que adivinar una respuesta "correcta": es una conversación profesional de igual a igual para evaluar si existe un encaje mutuo de trabajo.',
      },
    ],
  },
  'framework-star-entrevistas': {
    id: 'framework-star-entrevistas',
    slug: 'framework-star-entrevistas',
    title: 'Framework STAR y Banco de las 5 Historias Maestras',
    category: 'Entrevistas Laborales',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 7,
    badge: 'Framework In-App',
    estimatedReadTime: '6 min de preparación',
    summary:
      'Estructura en 3 partes para responder "Contame sobre vos", metodología STAR para preguntas por competencias y plantilla para construir tus 5 historias profesionales maestras.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'apertura-contame-sobre-vos',
        title: '1. Estructura en 3 Partes para "Contame sobre vos"',
        subtitle: 'Cómo responder a la pregunta inicial en 90 segundos con máxima claridad',
        content:
          'La pregunta de apertura no es para recitar tu CV ni para contar tu vida personal. Es tu presentación de valor profesional organizada en 3 bloques consecutivos:',
        callout: {
          type: 'formula',
          text: 'FÓRMULA 3 PARTES: [1. Quién sos hoy y tu especialidad] + [2. Recorrido con 1 o 2 logros destacados] + [3. Por qué te entusiasma esta vacante puntual]',
        },
        copyableTemplate: {
          label: 'Plantilla Modelo para "Contame sobre vos" (90s):',
          text: `“Soy [Tu Profesión / Rol actual o en búsqueda], especializado en [Tus 2 o 3 herramientas o áreas clave]. Cuento con +[X] años de trayectoria liderando [tipo de procesos o proyectos].
A lo largo de mi experiencia en empresas como [Empresa previa o proyectos], me enfoqué principalmente en [Logro o impacto concreto, ej. optimizar los tiempos de entrega en un 30% / liderar la migración de sistemas / gestionar cuentas clave].
Lo que más me entusiasma de este rol en [Nombre de la Empresa] es la oportunidad de aplicar este enfoque en [Desafío puntual que viste en la vacante], aportando mi experiencia en [Herramienta/Metodología] para ayudar al equipo a alcanzar sus metas.”`,
        },
      },
      {
        id: 'metodologia-star-detalle',
        title: '2. Metodología STAR para Preguntas por Competencias',
        subtitle: 'Distribución óptima del tiempo en cada respuesta situacional (máx. 2 min)',
        content:
          'Cuando te pregunten *"Contame una ocasión en la que..."*, estructurá tu respuesta con esta distribución cronológica:',
        tableData: {
          headers: ['Fase STAR', '% de Tiempo', 'Qué debes responder'],
          rows: [
            ['S - Situación', '15% (15-20 seg)', 'Contexto indispensable: empresa, proyecto, fecha y cuál era el problema.'],
            ['T - Tarea', '15% (15-20 seg)', 'Cuál era tu responsabilidad directa y el objetivo específico a alcanzar.'],
            ['A - Acción', '50% (50-60 seg)', 'Las decisiones que tomaste vos, herramientas usadas y cómo lideraste el plan.'],
            ['R - Resultado', '20% (20-30 seg)', 'Métricas de impacto, lección aprendida y beneficios reales para el negocio.'],
          ],
        },
        callout: {
          type: 'warning',
          text: 'Error frecuente: Gastar 1 minuto y medio describiendo la Situación. Recordá: el 70% del tiempo debe estar en la ACCIÓN y en el RESULTADO.',
        },
      },
      {
        id: 'banco-5-historias-maestras',
        title: '3. El Banco de las 5 Historias Maestras',
        subtitle: 'Las 5 experiencias que tenés que tener preparadas para responder cualquier pregunta',
        content:
          'Prepará con anticipación una historia real para cada uno de estos 5 ejes:',
        checklistItems: [
          {
            id: 'hist-1',
            text: 'Historia 1: Tu Mayor Logro Cuantificable. Un proyecto donde superaste objetivos, redujiste costos o aumentaste ingresos.',
          },
          {
            id: 'hist-2',
            text: 'Historia 2: Un Problema Operativo o Crisis Resuelto. Situación imprevista donde mantuviste la calma y aplicaste una solución creativa.',
          },
          {
            id: 'hist-3',
            text: 'Historia 3: Un Error del que Aprendiste. Un fallo real que reconociste a tiempo, corregiste y convertiste en una mejora de proceso duradera.',
          },
          {
            id: 'hist-4',
            text: 'Historia 4: Una Situación Difícil o Manejo de Desacuerdo. Cómo gestionaste una discrepancia técnica o con un cliente priorizando el resultado común.',
          },
          {
            id: 'hist-5',
            text: 'Historia 5: Trabajo en Equipo o Liderazgo con Impacto. Cómo colaboraste transversalmente para destrabar una meta conjunta.',
          },
        ],
      },
      {
        id: 'ejemplo-resuelto-star',
        title: '4. Ejemplo STAR Resuelto: Manejo de Desacuerdo Técnico',
        subtitle: 'Pregunta: "Contame una situación en la que tuviste un desacuerdo con un compañero de equipo"',
        content: 'Ejemplo de respuesta con balance profesional:',
        copyableTemplate: {
          label: 'Respuesta Modelo STAR Copiable:',
          text: `[SITUACIÓN]: En mi puesto anterior en [Empresa], estábamos a dos semanas de lanzar una nueva funcionalidad y surgieron dos posturas opuestas en el equipo sobre qué arquitectura técnica implementar.
[TAREA]: Como responsable de entrega, mi desafío era destrabar la decisión sin demorar el cronograma ni generar fricciones en el equipo.
[ACCIÓN]: Convoqué a una sesión de trabajo de 30 minutos, listamos los pros y contras de cada alternativa con foco en el cliente final y propuse una solución escalonada: implementar la alternativa más ágil para la primera entrega y programar la refactorización técnica para el siguiente sprint.
[RESULTADO]: Lanzamos el proyecto 2 días antes de la fecha límite pactada, no hubo incidentes en producción y el equipo acordó adoptar este esquema de evaluación para futuros desacuerdos.`,
        },
      },
    ],
  },
  'guia-preguntas-dificiles-entrevista': {
    id: 'guia-preguntas-dificiles-entrevista',
    slug: 'guia-preguntas-dificiles-entrevista',
    title: 'Guía de Preguntas Difíciles y Respuestas con Madurez Profesional',
    category: 'Entrevistas Laborales',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 7,
    badge: 'Guía Táctica In-App',
    estimatedReadTime: '6 min de lectura',
    summary:
      'Estrategias y respuestas modelo para sortear las preguntas incómodas de entrevistas: motivos de cambio, lagunas laborales, debilidades reales y qué hacer si no sabés una respuesta técnica.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'reglas-preguntas-dificiles',
        title: '1. Las 4 Reglas de Oro ante Preguntas Incómodas',
        subtitle: 'Criterio para responder con aplomo y credibilidad',
        content:
          '• **Regla 1: Jamás critiques a tus empleadores o jefes anteriores.** Hablar mal de un ex trabajo proyecta conflictividad futura.\n' +
          '• **Regla 2: Enfocate en lo que buscás hacia adelante.** Tu motivación debe orientarse al crecimiento, aprendizaje y nuevos retos.\n' +
          '• **Regla 3: Desterrá los clichés falsos.** Decir "soy demasiado perfeccionista" resta credibilidad. Planteá una debilidad real y cómo la gestionás.\n' +
          '• **Regla 4: No inventes respuestas si no sabés algo técnico.** La honestidad inteligente y la velocidad de aprendizaje valen más que una mentira.',
      },
      {
        id: 'preguntas-dificiles-modelos',
        title: '2. Respuestas Modelo a las Preguntas Más Temidas',
        subtitle: 'Guiones y estructuras recomendadas para cada caso',
        content: 'Modelos de respuesta listos para adaptar a tu historia:',
        tableData: {
          headers: ['Pregunta Difícil', 'Enfoque Recomendado', 'Ejemplo de Respuesta Modelo'],
          rows: [
            [
              '¿Por qué estás buscando un cambio de trabajo?',
              'Enfocarse en crecimiento profesional y búsqueda de nuevos desafíos, agradeciendo la experiencia previa.',
              '"En mi posición actual aprendí muchísimo y alcancé logros importantes junto al equipo. Hoy siento que cumplí una etapa y busco un proyecto con mayores desafíos en [Área/Tecnología], donde pueda aportar mi experiencia y seguir creciendo profesionalmente."',
            ],
            [
              '¿Por qué te fuiste / te desvincularon de tu último empleo?',
              'Explicación transparente y natural, sin dramatizar ni colocarse en rol de víctima.',
              '"La empresa atravesó una reestructuración de áreas / cierre de unidad de negocios que afectó a varias posiciones, incluida la mía. Me llevé excelentes relaciones y aprendizajes valiosos, y aproveché este tiempo para capacitarme en [Herramienta] y reenfocar mi búsqueda."',
            ],
            [
              '¿Qué hiciste durante este tiempo sin trabajar (laguna laboral)?',
              'Mostrar actividad, actualización y búsqueda intencional.',
              '"Durante estos meses decidí capacitarme a fondo en [Área/Certificación], realicé proyectos de consultoría independiente y me tomé el tiempo de enfocar mi búsqueda laboral de manera estratégica en empresas alineadas a mis metas."',
            ],
            [
              '¿Cuál es tu mayor debilidad o aspecto de mejora?',
              'Mencionar una debilidad real no excluyente para el puesto + el sistema concreto que usás para gestionarla.',
              '"Al principio me costaba delegar tareas operativas cuando los plazos eran muy ajustados. Al identificarlo, comencé a utilizar herramientas de gestión de proyectos y checkpoints semanales, lo que me permitió empoderar al equipo y mejorar los tiempos de entrega sin sobrecargarme."',
            ],
            [
              '¿Qué harías si te hacen una pregunta técnica y no sabés la respuesta?',
              'Honestidad profesional + razonamiento deductivo + disposición de aprendizaje rápido.',
              '"No trabajé directamente con esa herramienta/escenario puntual, pero por mi experiencia en [Herramienta análoga] entiendo que la lógica de resolución pasa por [explicar enfoque general]. Cuento con gran agilidad para investigar la documentación y familiarizarme en cuestión de días."',
            ],
            [
              '¿Por qué deberíamos contratarte a vos y no a otros candidatos?',
              'Propuesta de valor única combinando experiencia técnica, método de trabajo y motivación genuina.',
              '"Más allá de cumplir con los requisitos técnicos en [Herramienta/Área], aporto una sólida orientación a resultados y capacidad de integrarme rápidamente al equipo para resolver los desafíos de [objetivo del puesto] desde las primeras semanas."',
            ],
          ],
        },
      },
    ],
  },
  'preguntas-inteligentes-candidato-entrevistador': {
    id: 'preguntas-inteligentes-candidato-entrevistador',
    slug: 'preguntas-inteligentes-candidato-entrevistador',
    title: 'Banco de Preguntas Estratégicas del Candidato al Entrevistador',
    category: 'Evaluación Bidireccional',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 7,
    badge: 'Banco de Preguntas In-App',
    estimatedReadTime: '4 min de lectura',
    summary:
      'Preguntas de alto impacto para formular al selector y al Hiring Manager, demostrando criterio y evaluando si la empresa es el lugar adecuado para vos.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'el-valor-de-preguntar',
        title: '1. El Valor Estratégico de Hacer Preguntas',
        subtitle: 'La entrevista como conversación bidireccional',
        content:
          'Cuando el entrevistador pregunta *"¿Tenés alguna duda para nosotros?"*, responder *"No, ninguna, todo muy claro"* es desaprovechar una oportunidad de oro.\n\n' +
          'Hacer preguntas estratégicas comunica **seniority, interés real y visión de negocio**, además de darte información vital para saber si realmente querés trabajar allí.',
      },
      {
        id: 'preguntas-para-hiring-manager',
        title: '2. Preguntas de Alto Impacto para el Líder de Área (Hiring Manager)',
        subtitle: 'Para evaluar expectativas, desafíos y dinámica de equipo',
        content: 'Elegí 2 o 3 de estas preguntas para tu conversación técnica:',
        checklistItems: [
          {
            id: 'hm-1',
            text: '“¿Cuáles son los principales desafíos u objetivos prioritarios que tiene el equipo para los próximos 6 meses?”',
          },
          {
            id: 'hm-2',
            text: '“¿Cómo se mide el éxito en esta posición durante los primeros 90 días? ¿Qué esperan que esté resuelto en ese período?”',
          },
          {
            id: 'hm-3',
            text: '“¿Qué es lo que más valorás en la dinámica de trabajo de los miembros de tu equipo?”',
          },
          {
            id: 'hm-4',
            text: '“¿Esta vacante surge por un reemplazo o por el crecimiento y expansión de un área nueva?”',
          },
        ],
      },
      {
        id: 'preguntas-para-rrhh',
        title: '3. Preguntas para el Selector de Recursos Humanos',
        subtitle: 'Para evaluar cultura, proyección y próximos pasos del proceso',
        checklistItems: [
          {
            id: 'rh-1',
            text: '“¿Cómo describirías la cultura de trabajo y los valores del equipo en el día a día?”',
          },
          {
            id: 'rh-2',
            text: '“¿Qué oportunidades de desarrollo profesional o formación continua ofrece la compañía?”',
          },
          {
            id: 'rh-3',
            text: '“¿Cuáles son los próximos pasos del proceso de selección y qué tiempos estiman para la siguiente etapa?”',
          },
        ],
      },
      {
        id: 'pregunta-maestra-cierre',
        title: '4. La Pregunta Maestra de Cierre de Profundización',
        subtitle: 'Para despejar dudas antes de desconectarte',
        content:
          'Utilizá esta pregunta en los últimos minutos de la entrevista para asegurarte de que no queden dudas sobre tu perfil:',
        copyableTemplate: {
          label: 'Pregunta Maestra de Cierre:',
          text: `“Antes de terminar, me gustaría consultar: en base a lo que conversamos hoy, ¿hay algún punto de mi perfil o experiencia que te gustaría que profundice o sobre el que te haya quedado alguna duda?”`,
        },
      },
    ],
  },
  'matriz-sueldos-negociacion': {
    id: 'matriz-sueldos-negociacion',
    slug: 'matriz-sueldos-negociacion',
    title: 'Matriz de Compensación, Cálculo de Piso y Negociación Salarial',
    category: 'Negociación & Compensaciones',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 7,
    badge: 'Matriz de Negociación In-App',
    estimatedReadTime: '6 min de aplicación',
    summary:
      'Framework para calcular tu piso salarial no negociable, guiones para responder sobre pretensión económica y salario actual, y plantilla de negociación por escrito.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'calculo-piso-y-banda',
        title: '1. Cómo Calcular tu Piso Salarial y Banda Objetivo',
        subtitle: 'Fórmula financiera para no negociar a ciegas',
        content:
          'Tu pretensión salarial no se basa en lo que ganabas antes, sino en tus costos reales y en el valor de mercado de la posición:',
        callout: {
          type: 'formula',
          text: 'FÓRMULA PISO NETO: (Gastos Fijos Mensuales + Ahorro Mínimo 15% + Costos de Cobertura/Impuestos) = PISO SALARIAL NETO NO NEGOCIABLE',
        },
        tableData: {
          headers: ['Nivel de Banda', 'Cálculo Respecto al Piso', 'Objetivo Estratégico'],
          rows: [
            ['Piso No Negociable', 'Base mínima calculada', 'Tu límite absoluto: por debajo de este monto no aceptás.'],
            ['Banda Media (Target)', 'Piso + 20% a 30%', 'Tu objetivo real en base a tu experiencia de mercado.'],
            ['Banda Alta (Aspiracional)', 'Piso + 35% a 50%', 'Monto para negociar en roles con alta exigencia técnica o volumen.'],
          ],
        },
      },
      {
        id: 'guiones-verbales-sueldo',
        title: '2. Guiones para Responder "¿Cuál es tu pretensión salarial?"',
        subtitle: 'Manejo firme y profesional en el primer screening',
        content: 'Estructura de respuesta recomendada sin dar números cerrados que te limiten:',
        copyableTemplate: {
          label: 'Guion Recomendado para Screening Telefónico:',
          text: `“En base a las responsabilidades que estuvimos conversando y a la investigación de mercado para este nivel de rol, mi expectativa salarial se sitúa en un rango de [Monto Mínimo] a [Monto Objetivo] netos mensuales. De todas formas, este valor puede variar en función del paquete integral de beneficios, revisiones periódicas y esquema de trabajo. ¿Tienen un presupuesto asignado para la posición?”`,
        },
      },
      {
        id: 'manejo-salario-actual',
        title: '3. Cómo Responder si Preguntan "¿Cuánto estás ganando hoy?"',
        subtitle: 'Reenfocar elegantemente en el valor del nuevo puesto',
        content:
          'Si un selector te consulta por tu sueldo presente, no te sientas obligado a revelar un número que perjudique tu negociación:',
        copyableTemplate: {
          label: 'Guion de Reenfoque Salarial:',
          text: `“En mi puesto actual cuento con un esquema de compensación adaptado a responsabilidades y proyectos diferentes a los de esta búsqueda. Por eso, prefiero enfocar la conversación económica en el valor de mercado y en los desafíos específicos de este nuevo rol, donde mi pretensión se ubica en el rango de [Monto Mínimo] a [Monto Objetivo].”`,
        },
      },
      {
        id: 'evaluacion-paquete-integral',
        title: '4. Evaluación Integral de la Oferta (Más Allá del Sueldo Base)',
        subtitle: 'Aspectos a considerar antes de aceptar o contraofertar',
        checklistItems: [
          {
            id: 'paq-1',
            text: 'Monto neto en mano y moneda de pago (Moneda local / USD / Mixto).',
          },
          {
            id: 'paq-2',
            text: 'Frecuencia y mecanismo de actualización por inflación o revisiones por desempeño.',
          },
          {
            id: 'paq-3',
            text: 'Cobertura de salud (Plan médico para vos y tu grupo familiar).',
          },
          {
            id: 'paq-4',
            text: 'Modalidad de trabajo (100% remoto / Híbrido) y flexibilidad horaria.',
          },
          {
            id: 'paq-5',
            text: 'Días de vacaciones adicionales a los legales y feriados flexibles.',
          },
          {
            id: 'paq-6',
            text: 'Equipamiento de trabajo provisto (Laptop, monitor, bono de conectividad).',
          },
        ],
      },
      {
        id: 'plantilla-contrapropuesta-escrita',
        title: '5. Plantilla de Negociación de Contrapropuesta por Escrito',
        subtitle: 'Para cuando la propuesta económica quedó un poco por debajo de tus expectativas',
        content: 'Modelo de correo profesional y constructivo:',
        copyableTemplate: {
          label: 'Email de Contrapropuesta Salarial:',
          text: `Hola [Nombre del Selector / Líder],

Muchas gracias por la propuesta para sumarme como [Nombre del Puesto] en [Nombre de la Empresa]. Estoy muy entusiasmado/a con la visión del equipo y los desafíos que conversamos.

Revisando los términos de la propuesta, noté que la compensación fija propuesta de [Monto Ofrecido] se encuentra un poco por debajo de la banda que conversamos inicialmente ([Tu Rango Pretendido]).

Considerando el impacto que puedo aportar desde el primer día en [Especialidad/Métrica clave], me gustaría consultar si existe margen para acercar la remuneración a [Monto Objetivo Deseado] netos, o evaluar alternativas dentro del paquete de beneficios como [revisión a los 3 meses / bono por objetivos / días libres].

Quedo a total disposición para conversarlo brevemente. ¡Muchísimas gracias por su confianza y consideración!

Un cordial saludo,
[Tu Nombre y Apellido]`,
        },
      },
      {
        id: 'regla-oro-renuncia',
        title: '6. Regla de Oro Inquebrantable',
        subtitle: 'Cuidá tu estabilidad profesional',
        content:
          '> ⚠️ **NUNCA renuncies a tu trabajo actual hasta no tener la propuesta laboral formal POR ESCRITO y firmada por ambas partes.**\n\n' +
          'Los acuerdos verbales o intenciones de contratación pueden demorarse o cancelarse por factores ajenos a vos. Tu renuncia se presenta únicamente con el contrato o carta de oferta formal rubricada.',
      },
    ],
  },
  'guia-metodo-trabajo-ideal': {
    id: 'guia-metodo-trabajo-ideal',
    slug: 'guia-metodo-trabajo-ideal',
    title: 'Guía de las 4 Preguntas: Cómo Identificar y Construir tu Trabajo Ideal',
    category: 'Autoconocimiento & Claridad Laboral',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 1,
    badge: 'Ejercicio de Claridad In-App',
    estimatedReadTime: '4 min de reflexión aplicada',
    summary:
      'Metodología de 4 preguntas para conectar tus habilidades actuales, tus intereses, la demanda del mercado y trazar el plan de acción para llegar a tu trabajo ideal.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'las-4-preguntas-clave',
        title: '1. Las 4 Preguntas de Autodiagnóstico',
        subtitle: 'Bajar a papel tu punto de partida y tu dirección profesional',
        content:
          'Tu trabajo ideal no aparece por casualidad: se construye encontrando la intersección entre lo que sabés hacer, lo que disfrutás y lo que las organizaciones están dispuestas a pagar.',
        checklistItems: [
          {
            id: 'p1',
            text: '1. ¿En qué sos bueno hoy? (Tus habilidades y conocimientos actuales)',
            description: 'Anotá tus herramientas, tareas donde te destacás y aprendizajes de tus experiencias previas.',
          },
          {
            id: 'p2',
            text: '2. ¿Qué es lo que te gusta hacer? (Tus intereses y motivaciones)',
            description: 'Identificá los tipos de proyectos, problemas y dinámicas de trabajo que realmente disfrutás.',
          },
          {
            id: 'p3',
            text: '3. ¿Cómo podés monetizarlo? (Identificación de roles en el mercado)',
            description: 'Mapeá qué puestos y empresas demandan y pagan por esa combinación de habilidades e intereses.',
          },
          {
            id: 'p4',
            text: '4. ¿Qué te falta para llegar ahí? (Brechas a cerrar)',
            description: 'Revisá qué certificaciones, herramientas técnicas o contactos necesitás incorporar a tu plan.',
          },
        ],
      },
      {
        id: 'estrategia-de-construccion',
        title: '2. Estrategia y Plan de Acción Progresivo',
        subtitle: 'El puente entre donde estás hoy y el trabajo que querés',
        content:
          'La mayoría de las personas se queda esperando que aparezca la oportunidad perfecta. Quienes avanzan son los que construyen un plan concreto con pasos progresivos:',
        callout: {
          type: 'quote',
          text: 'Tu trabajo ideal no aparece: se construye. Cada paso, por más chico que sea, te va acercando hasta tu objetivo.',
        },
      },
    ],
  },
  'fases-proceso-seleccion': {
    id: 'fases-proceso-seleccion',
    slug: 'fases-proceso-seleccion',
    title: 'Fases de un Proceso de Selección Típico',
    category: 'Guía de Tiempos & Circuitos',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 2,
    badge: 'Guía Rápida In-App',
    estimatedReadTime: '3 min de lectura',
    summary:
      'Línea de tiempo paso a paso con las 4 etapas internas de contratación en una empresa y la duración estimada de cada fase.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'fase-1-preseleccion',
        title: 'Fase 1: Apertura de la Búsqueda y Filtro Inicial',
        subtitle: 'Duración estimada: Días 1 al 10',
        content:
          'La empresa publica el aviso y el selector recibe entre 250 y 400 postulaciones. Realiza el escaneo visual de 6 segundos y preselecciona entre 15 y 25 perfiles que cumplen con los requisitos excluyentes.',
        callout: {
          type: 'tip',
          text: 'Durante esta etapa se descartan los CVs genéricos o mal titulados.',
        },
      },
      {
        id: 'fase-2-screening',
        title: 'Fase 2: Contacto Inicial (Screening Telefónico o Virtual)',
        subtitle: 'Duración estimada: Días 10 al 20',
        content:
          'Contacto breve (15 a 20 minutos) para validar disponibilidad horaria, pretensión salarial aproximada, nivel de idiomas y nivel de interés en la vacante. Se define una terna de 5 a 8 candidatos.',
      },
      {
        id: 'fase-3-entrevistas-lideres',
        title: 'Fase 3: Entrevistas con el Líder de Área y Evaluación Técnica',
        subtitle: 'Duración estimada: Días 20 al 45',
        content:
          'Entrevista profunda con el Hiring Manager o evaluación técnica práctica. Acá se generan los silencios más largos (7 a 10 días) debido a la compatibilización de agendas internas de los directores.',
        callout: {
          type: 'warning',
          text: 'Un silencio de más de una semana no significa rechazo: el líder del área suele estar atendiendo prioridades urgentes del negocio en paralelo.',
        },
      },
      {
        id: 'fase-4-aprobacion-oferta',
        title: 'Fase 4: Aprobación de Presupuesto, Carta Oferta y Contratación',
        subtitle: 'Duración estimada: Días 45 al 60',
        content:
          'El líder de área selecciona al candidato final. Se envía la propuesta a Recursos Humanos y Finanzas para aprobación de la banda salarial. Una vez validada, se envía la carta oferta formal y se pacta la fecha de ingreso.',
      },
    ],
  },
  'matriz-target-no-negociables': {
    id: 'matriz-target-no-negociables',
    slug: 'matriz-target-no-negociables',
    title: 'Matriz de Target Laboral y Límites No Negociables',
    category: 'Herramienta de Posicionamiento',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 1,
    badge: 'Plantilla de Trabajo In-App',
    estimatedReadTime: '4 min de lectura aplicada',
    summary:
      'Guía metodológica para definir tus 6 filtros de postulación diana, delimitar tu piso salarial y establecer tus líneas rojas antes de postularte.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'los-6-filtros-target',
        title: '1. Los 6 Filtros de tu Puesto Objetivo',
        subtitle: 'Definí exactamente a qué vacantes vas a postular',
        content:
          'Para que tu CV y tu perfil de LinkedIn atraigan a los selectores correctos, tu búsqueda debe responder con precisión a estos 6 parámetros:',
        checklistItems: [
          {
            id: 't1',
            text: 'Rol o Puesto Exacto: 1 título principal (ej. Analista Sr. de Comex) y hasta 2 sinónimos compatibles.',
            description: 'No mezclar ramas distintas (ej. RRHH y Programación) en el mismo perfil.',
          },
          {
            id: 't2',
            text: 'Industria o Rubro Objetivo: Identificar 2 o 3 sectores afines a tu trayectoria.',
            description: 'La experiencia previa en el rubro acelera tu contratación.',
          },
          {
            id: 't3',
            text: 'Seniority y Nivel de Responsabilidad: Junior, Semi-Senior, Senior o Lead.',
            description: 'Alinea tu pretensión salarial y tus logros con el nivel del puesto.',
          },
          {
            id: 't4',
            text: 'Modalidad de Trabajo: Remoto 100%, Híbrido o Presencial.',
            description: 'Sé realista con tu ubicación geográfica y tus tiempos de traslado.',
          },
          {
            id: 't5',
            text: 'Piso Salarial No Negociable: El monto neto mensual mínimo para cubrir tus gastos fijos.',
            description: 'Te permite descartar ofertas que no cubran tu piso económico antes de perder semanas en entrevistas.',
          },
          {
            id: 't6',
            text: 'Disponibilidad de Incorporación: Inmediata, 15 días o 1 mes.',
            description: 'Claridad total para responder en el primer screening.',
          },
        ],
      },
      {
        id: 'limites-no-negociables',
        title: '2. Tus Límites No Negociables',
        subtitle: 'Saber qué NO vas a aceptar te da postura y poder de negociación',
        content:
          'La desesperación hace que muchos profesionales acepten condiciones abusivas o ambientes tóxicos. Establecer tus No Negociables por escrito antes de postularte te protege y te da firmeza profesional.',
        callout: {
          type: 'quote',
          text: 'Cuando sabés con certeza qué condiciones no estás dispuesto a negociar, dejás de sonar necesitado y empezás a sonar como un profesional con criterio.',
        },
      },
      {
        id: 'lista-empresas-diana',
        title: '3. Lista de Empresas Diana (Prospección Activa)',
        subtitle: 'Elegí 15 empresas donde tu perfil aporte una solución inmediata',
        content:
          'En lugar de esperar pasivamente que se publiquen vacantes, listá 15 empresas que contraten perfiles como el tuyo. En las próximas clases vamos a ver cómo contactar directamente a los decisores de esas empresas.',
      },
    ],
  },
  'cronograma-semanal-busqueda': {
    id: 'cronograma-semanal-busqueda',
    slug: 'cronograma-semanal-busqueda',
    title: 'Plan de Acción y Cronograma Semanal de Búsqueda',
    category: 'Cronograma Operativo',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 2,
    badge: 'Documento de Consulta In-App',
    estimatedReadTime: '3 min de lectura',
    summary:
      'Estructura de trabajo semanal en 3 bloques de alta productividad para mantener un flujo de 2 a 3 entrevistas por semana.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'bloque-1-mapeo',
        title: '1. Bloque 1: Mapeo y Prospección (40% del tiempo)',
        subtitle: 'Lunes y Miércoles: Detectar oportunidades antes que la competencia',
        content:
          'Dedicá este bloque a identificar nuevas empresas afines a tu target, analizar qué perfiles están contratando y detectar a los Hiring Managers y líderes de equipo.',
        checklistItems: [
          {
            id: 'b1',
            text: 'Revisar portales especializados y páginas de carreras de tus 15 empresas objetivo.',
            description: 'Guardar las vacantes detectadas en el Tracker bajo estado "Identificada".',
          },
          {
            id: 'b2',
            text: 'Mapear 3 a 5 decisores en LinkedIn para cada vacante identificada.',
            description: 'Líderes de área, Hiring Managers o Selectores asignados.',
          },
        ],
      },
      {
        id: 'bloque-2-networking',
        title: '2. Bloque 2: Contacto Directo & Networking (30% del tiempo)',
        subtitle: 'Martes y Jueves: Activar conversaciones de valor',
        content:
          'Conectar con personas reales dentro de las empresas. El objetivo no es pedir trabajo de forma desesperada, sino iniciar conversaciones profesionales y solicitar 10 minutos de charla informativa.',
        callout: {
          type: 'tip',
          text: 'Un mensaje directo personalizado a un líder de área tiene una tasa de respuesta 4 veces más alta que una postulación pasiva por portal.',
        },
      },
      {
        id: 'bloque-3-postulaciones',
        title: '3. Bloque 3: Postulaciones Adaptadas & Seguimiento (30% del tiempo)',
        subtitle: 'Viernes: Cierre semanal y actualización del Tracker',
        content:
          'Adaptar tu CV con las palabras clave exactas de cada vacante identificada, enviar las postulaciones definitivas y registrar cada movimiento en tu Tracker de Búsquedas.',
        tableData: {
          headers: ['Día', 'Bloque Operativo', 'Objetivo Concreto'],
          rows: [
            ['Lunes', 'Mapeo & Empresas', '5 vacantes identificadas en el Tracker'],
            ['Martes', 'Networking Directo', '3 conexiones con decisores en LinkedIn'],
            ['Miércoles', 'Mapeo & Target', 'Revisión de avisos y palabras clave'],
            ['Jueves', 'Networking Directo', 'Mensajes de seguimiento a contactos previos'],
            ['Viernes', 'Postulación & Tracker', '2 a 3 envíos de CV ultra-personalizados'],
          ],
        },
      },
    ],
  },
  'guia-mapeo-keywords-industria': {
    id: 'guia-mapeo-keywords-industria',
    slug: 'guia-mapeo-keywords-industria',
    title: 'Guía de Mapeo de Palabras Clave y Variantes de CV',
    category: 'Estrategia de CV & Keywords',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 3,
    badge: 'Matriz In-App',
    estimatedReadTime: '4 min de consulta',
    summary:
      'Metodología para extraer las keywords técnicas de 3 ofertas reales y configurar tus 2 variantes de CV sincronizadas con Mi Perfil.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'clasificacion-keywords',
        title: '1. Las 3 Categorías de Palabras Clave',
        subtitle: 'Cómo agrupar los requisitos de los avisos de empleo',
        content:
          'Al analizar 3 avisos de tu rol objetivo, identificá y agrupá los términos recurrentes en estas 3 columnas para integrarlos en tu perfil:',
        tableData: {
          headers: ['Categoría', 'Qué incluye', 'Ejemplos representativos'],
          rows: [
            ['Herramientas & Software', 'Programas técnicos, ERPs, CRMs, software de datos', 'SAP, Salesforce, Power BI, SQL, Jira, Excel Avanzado'],
            ['Metodologías & Procesos', 'Marcos de trabajo, metodologías ágiles o comerciales', 'Scrum, Ciclo de Ventas B2B, Lean Six Sigma, STAR, Inbound'],
            ['Competencias de Negocio', 'Funciones críticas y áreas de impacto del puesto', 'Gestión presupuestaria, Prospección en frío, Churn, Negociación'],
          ],
        },
      },
      {
        id: 'estrategia-2-variantes',
        title: '2. Definición de tus 2 Variantes de CV',
        subtitle: 'Especialización sin alterar tu trayectoria real',
        content:
          'Mantené un CV Maestro y derivá 2 variantes según tus sub-especialidades target. Cada variante ajusta el Titular, el Resumen y el orden de tus habilidades principales para lograr un match del 100% con cada vacante.',
        callout: {
          type: 'tip',
          text: 'Completá tus palabras clave y los nombres de tus 2 variantes en los campos de abajo: se sincronizarán automáticamente con tu sección de CV en "Mi Perfil".',
        },
      },
    ],
  },
  'diccionario-100-verbos-accion': {
    id: 'diccionario-100-verbos-accion',
    slug: 'diccionario-100-verbos-accion',
    title: 'Diccionario de 100 Verbos de Acción de Alto Impacto',
    category: 'Vocabulario & Redacción de Logros',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 3,
    badge: 'Guía de Consulta Rápida',
    estimatedReadTime: '3 min de consulta',
    summary:
      'Listado clasificado de verbos activos por área para erradicar frases pasivas y formular logros con autoridad y métricas.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'verbos-liderazgo-gestion',
        title: '1. Liderazgo, Gestión y Coordinación',
        subtitle: 'Para posiciones de mando, seniors o coordinadores',
        content: 'Verbos recomendados para demostrar iniciativa y capacidad de alineación de personas:',
        tableData: {
          headers: ['Verbo de Acción', 'Contexto Sugerido', 'Ejemplo de Impacto'],
          rows: [
            ['Lideré / Conduje', 'Equipos multidisciplinarios, comités o squads', 'Lideré un equipo de 6 analistas reduciendo tiempos de entrega en 25%.'],
            ['Coordiné', 'Lanzamientos, eventos o proveedores', 'Coordiné a 4 agencias externas para el rediseño del portal.'],
            ['Capacité / Mentoré', 'Onboarding de talento o formación interna', 'Capacité a 15 nuevos ingresos estandarizando procesos de venta.'],
            ['Estandaricé', 'Manuales, políticas operativas o SOPs', 'Estandaricé los protocolos de atención al cliente en 3 sucursales.'],
          ],
        },
      },
      {
        id: 'verbos-optimizacion-eficiencia',
        title: '2. Optimización, Procesos y Ahorro',
        subtitle: 'Para perfiles analíticos, operativos o técnicos',
        content: 'Verbos para evidenciar mejoras de tiempo, costos y reducción de errores:',
        tableData: {
          headers: ['Verbo de Acción', 'Contexto Sugerido', 'Ejemplo de Impacto'],
          rows: [
            ['Automaticé', 'Flujos con macros, scripts o software', 'Automaticé la conciliación bancaria ahorrando 8 horas semanales.'],
            ['Optimicé', 'Embudos, presupuestos o inventarios', 'Optimicé los niveles de stock disminuyendo mermas en un 18%.'],
            ['Reduje / Disminuí', 'Tiempos de espera, costos o incidencias', 'Reduje la tasa de cancelaciones de clientes (churn) en un 12%.'],
            ['Implementé', 'Nuevas herramientas, ERPs o CRMs', 'Implementé HubSpot CRM centralizando más de 200 leads mensuales.'],
          ],
        },
      },
      {
        id: 'verbos-ventas-negocios',
        title: '3. Ventas, Negociación y Crecimiento',
        subtitle: 'Para perfiles comerciales, marketing y desarrollo de cuentas',
        content: 'Verbos de generación directa de valor e ingresos:',
        tableData: {
          headers: ['Verbo de Acción', 'Contexto Sugerido', 'Ejemplo de Impacto'],
          rows: [
            ['Negocié', 'Contratos anuales, condiciones o tarifas', 'Negocié acuerdos con proveedores logrando un ahorro del 14% anual.'],
            ['Capté / Prospecté', 'Nuevos clientes corporativos B2B', 'Capté 12 cuentas clave corporativas en los primeros 6 meses.'],
            ['Incrementé / Aceleré', 'Ventas, retención o cuota de mercado', 'Incrementé la facturación del canal digital en un 35% interanual.'],
            ['Diversifiqué', 'Líneas de producto o canales comerciales', 'Diversifiqué el catálogo ingresando a 2 nuevos mercados regionales.'],
          ],
        },
      },
    ],
  },
  'checklist-auditoria-pre-envio': {
    id: 'checklist-auditoria-pre-envio',
    slug: 'checklist-auditoria-pre-envio',
    title: 'Checklist de Auditoría Pre-Envío (5 Puntos Clave)',
    category: 'Control de Calidad de CV',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 3,
    badge: 'Checklist Rápido In-App',
    estimatedReadTime: '2 min de verificación',
    summary:
      'Los 5 puntos de control indispensables para revisar tu currículum antes de postularte a cualquier oportunidad laboral.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'puntos-control-cv',
        title: '1. Los 5 Controles Pre-Envío',
        subtitle: 'Para asegurar que tu postulación genere el impacto correcto',
        content: 'Verificá estos 5 puntos antes de enviar tu archivo a cualquier plataforma o proceso:',
        checklistItems: [
          {
            id: 'chk-1',
            text: 'Datos de contacto: Nombre, teléfono con código de área, email profesional y link clickeable a LinkedIn correctos y actualizados.',
          },
          {
            id: 'chk-2',
            text: 'Redacción y coherencia: Cero faltas de ortografía, redacción impecable y fechas de experiencia consistentes (Mes Año – Mes Año).',
          },
          {
            id: 'chk-3',
            text: 'Adaptación y palabras clave: CV adaptado al puesto con las herramientas, conocimientos y keywords relevantes que pide el aviso.',
          },
          {
            id: 'chk-4',
            text: 'Diseño claro y ordenado: Fácil de leer, maquetación limpia y libre de gráficos, barritas o columnas excesivas.',
          },
          {
            id: 'chk-5',
            text: 'Formato PDF y nombre profesional: Guardado en PDF con nomenclatura "CV_Nombre_Apellido.pdf" (o CV_Nombre_Apellido_Puesto.pdf).',
          },
        ],
      },
      {
        id: 'la-mirada-del-reclutador',
        title: '2. La Pregunta del Reclutador (Prueba de los 6 Segundos)',
        subtitle: 'Ponete en el lugar de quien va a contratarte',
        content:
          'Abrí tu archivo PDF y hacé una lectura rápida como si fueras el selector:\n\n' +
          '> *"¿Entiendo rápidamente quién es esta persona, qué sabe hacer y qué puede aportar?"*\n\n' +
          'Si la respuesta es un **sí rotundo**, tu CV está 100% listo para salir a la cancha.',
      },
    ],
  },
  'guia-copywriting-linkedin-titular-about': {
    id: 'guia-copywriting-linkedin-titular-about',
    slug: 'guia-copywriting-linkedin-titular-about',
    title: 'Guía de Copywriting para LinkedIn (Titular & Acerca de mí)',
    category: 'Marca Personal & Redacción',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 4,
    badge: 'Guía de Consulta Rápida',
    estimatedReadTime: '4 min de lectura',
    summary:
      'Fórmulas estructuradas y ejemplos reales redactados para optimizar el SEO de tu titular y conectar humanamente en tu extracto.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'ejemplos-titulares-por-area',
        title: '1. Modelos de Titular por Especialidad',
        subtitle: 'Estructura: [Rol] | [Tecnologías / Herramientas] | [Especialidad]',
        content: 'Modelos listos para adaptar según tu área profesional:',
        tableData: {
          headers: ['Especialidad', 'Titular Sugerido (< 220 caracteres)'],
          rows: [
            ['Comercial & Ventas B2B', 'Key Account Manager B2B | Salesforce · HubSpot | Expansión Comercial & Negociación de Cuentas Clave | +30% facturación'],
            ['Tecnología & Producto', 'Product Designer | Figma · Design Systems · UX Research | Fintech & SaaS B2B | Diseño centrado en conversión'],
            ['Operaciones & Logística', 'Supply Chain Analyst | SAP MM · Power BI · Excel Avanzado | Logística Internacional & Comercio Exterior'],
            ['Administración & Finanzas', 'Analista Financiero Senior | Modelado Financiero · SQL · Power BI | Control Presupuestario & Reporting Ejecutivo'],
          ],
        },
      },
      {
        id: 'estructura-acerca-de-mi',
        title: '2. Plantilla de 4 Párrafos para el "Acerca de mí"',
        subtitle: 'Tono cercano, profesional y orientado a resolución de problemas',
        content:
          'Escribí siempre en primera persona y dividí tu historia en 4 bloques claros:\n\n' +
          '• **Párrafo 1 (Gancho):** "Ayudo a [tipo de empresas] a resolver [problema principal] a través de [tu especialidad]. Con más de [X] años en el sector..."\n' +
          '• **Párrafo 2 (Trayectoria):** "A lo largo de mi carrera me especialicé en [áreas clave], liderando procesos como [ejemplo concreto]..."\n' +
          '• **Párrafo 3 (Logros):** "Algunos hitos recientes:\n- [Logro 1 con métrica]\n- [Logro 2 con herramienta/proceso]"\n' +
          '• **Párrafo 4 (Contacto):** "Siempre abierto a conectar con líderes y equipos en crecimiento. 📧 Contacto: [tu-email@correo.com]"',
      },
    ],
  },
  'scripts-mensajes-conexion-recruiters': {
    id: 'scripts-mensajes-conexion-recruiters',
    slug: 'scripts-mensajes-conexion-recruiters',
    title: 'Scripts de Mensajes de Conexión para Recruiters & Líderes',
    category: 'Prospección & Networking',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 4,
    badge: 'Plantillas de Mensajes',
    estimatedReadTime: '3 min de consulta',
    summary:
      'Guiones cortos (< 300 caracteres) y sin presión para conectar con selectores y Hiring Managers con alta tasa de respuesta.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'script-vacante-abierta',
        title: '1. Mensaje para Vacante Abierta (Al Recruiter)',
        subtitle: 'Cuando identificaste una postulación activa',
        content:
          '**Plantilla (< 280 caracteres):**\n\n' +
          '> *"Hola [Nombre], vi la búsqueda de [Puesto] que abrieron en [Empresa]. Cuento con +[X] años de experiencia en [Área] y dominio de [Herramienta 1] y [Herramienta 2]. Me encantaría sumar tu perfil a mi red y quedar en contacto para este u otros procesos. ¡Un saludo!"*',
      },
      {
        id: 'script-contacto-hiring-manager',
        title: '2. Mensaje Espontáneo a Líder de Área (Hiring Manager)',
        subtitle: 'Para tu futuro jefe directo, sin pedir trabajo directamente',
        content:
          '**Plantilla (< 280 caracteres):**\n\n' +
          '> *"Hola [Nombre], sigo de cerca el crecimiento del área de [Nombre del Área] en [Empresa]. Como colega enfocado en [Especialidad/Herramienta], me gustaría sumar tu contacto para seguir sus novedades y proyectos en el sector. ¡Un saludo!"*',
      },
    ],
  },
  'comandos-busqueda-avanzada-google': {
    id: 'comandos-busqueda-avanzada-google',
    slug: 'comandos-busqueda-avanzada-google',
    title: 'Comandos de Búsqueda Avanzada en Google (CheatSheet)',
    category: 'Estrategias de Búsqueda',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 5,
    badge: 'CheatSheet In-App',
    estimatedReadTime: '3 min de consulta',
    summary:
      'Comandos booleanos listos para copiar y pegar en Google para rastrear ofertas cargadas directamente en softwares ATS sin publicidad masiva.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (Actualizada)',
    sections: [
      {
        id: 'comandos-ats-globales',
        title: '1. Comandos para Softwares de Selección (ATS)',
        subtitle: 'Copia y reemplaza "[Tu Puesto]" con tu cargo objetivo',
        content: 'Pega estas líneas directamente en la barra de búsqueda de Google:',
        tableData: {
          headers: ['Software / ATS', 'Comando para Google'],
          rows: [
            ['Greenhouse', 'site:greenhouse.io "[Tu Puesto]" ("Remote" OR "Remoto" OR "Latam")'],
            ['Lever', 'site:lever.co "[Tu Puesto]" ("Remote" OR "Remoto")'],
            ['Ashby HQ', 'site:ashbyhq.com "[Tu Puesto]"'],
            ['Workday', 'site:myworkdayjobs.com "[Tu Puesto]" ("Argentina" OR "Colombia" OR "Chile" OR "Remote")'],
            ['Breezy HR', 'site:breezy.hr "[Tu Puesto]"'],
          ],
        },
      },
      {
        id: 'comandos-paginas-carreras',
        title: '2. Rastreo de Páginas de Carreras & Vacantes Ocultas',
        subtitle: 'Para encontrar portales de empleo de empresas por país o industria',
        content:
          '• **Búsqueda por URL:** `inurl:careers OR inurl:jobs "[Tu Puesto]" "Argentina"`\n' +
          '• **Búsqueda por Título de Página:** `intitle:"Trabaja con nosotros" OR intitle:"Únete al equipo" "[Tu Área]"`\n' +
          '• **Ofertas con salarios en USD:** `site:lever.co OR site:greenhouse.io "[Tu Puesto]" "USD" OR "Contractor"`',
      },
    ],
  },
  'checklist-auditoria-empresas-cultura': {
    id: 'checklist-auditoria-empresas-cultura',
    slug: 'checklist-auditoria-empresas-cultura',
    title: 'Checklist de Auditoría de Empresas y Clima Laboral',
    category: 'Evaluación de Empresas',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 5,
    badge: 'Checklist In-App',
    estimatedReadTime: '3 min de lectura',
    summary:
      'Paso a paso de 3 controles clave para evaluar la reputación, rotación de personal y estabilidad de una empresa antes de avanzar.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'auditoria-3-pasos',
        title: '1. Los 3 Controles de la Auditoría Express (10 min)',
        subtitle: 'Validá la salud de la empresa antes de postularte',
        content: 'Revisá estos 3 puntos antes de postularte o sentarte en una entrevista:',
        checklistItems: [
          {
            id: 'chk-emp-1',
            text: 'Reseñas en Glassdoor / Openqube: Calificación mayor a 3.8 y análisis de patrones repetitivos en comentarios de liderazgo.',
            description: 'Identificar si hay quejas recurrentes sobre horas extras o falta de dirección.',
          },
          {
            id: 'chk-emp-2',
            text: 'Rotación en LinkedIn (Pestaña Personas): Permanencia promedio del equipo mayor a 18 meses.',
            description: 'Si la mayoría renuncia antes del año, es una alerta roja de clima o management.',
          },
          {
            id: 'chk-emp-3',
            text: 'Bandas Salariales y Beneficios: Validación de que el rango de mercado cumpla tu piso salarial.',
            description: 'Asegurate de que la empresa esté dentro de tus límites económicos no negociables.',
          },
        ],
      },
      {
        id: 'preguntas-entrevista-empresa',
        title: '2. Preguntas Clave para el Líder de Área en la Entrevista',
        subtitle: 'Para evaluar la cultura desde adentro',
        content:
          '• *"¿Cuáles son los principales desafíos que tiene el equipo para los próximos 6 meses?"*\n' +
          '• *"¿Cómo evalúan el éxito de esta posición durante los primeros 90 días?"*\n' +
          '• *"¿Qué es lo que más valoran los miembros del equipo sobre la cultura de trabajo acá?"*',
      },
    ],
  },
  'plantillas-carta-presentacion-cover-letter': {
    id: 'plantillas-carta-presentacion-cover-letter',
    slug: 'plantillas-carta-presentacion-cover-letter',
    title: 'Plantillas de Carta de Presentación (Cover Letter)',
    category: 'Materiales de Postulación',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 6,
    badge: 'Plantillas In-App',
    estimatedReadTime: '4 min de lectura',
    summary:
      'Modelos de cartas de presentación y mensajes de correo en 3 párrafos, orientados a resultados y adaptables a cualquier industria.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'modelo-postulacion-activa',
        title: '1. Modelo para Búsqueda Publicada (Convocatoria Abierta)',
        subtitle: 'Para enviar por correo electrónico o adjuntar en formulario web',
        content:
          '**Asunto:** `Postulación [Nombre del Puesto] - [Nombre y Apellido] | [Herramienta Clave / Especialidad]`\n\n' +
          '**Cuerpo del mensaje:**\n\n' +
          '> *"Estimado equipo de selección / Hola [Nombre del Recruiter]:*\n>\n' +
          '> *Les escribo para presentar mi postulación al rol de [Nombre del Puesto] publicado en [LinkedIn / Portal]. Cuento con +[X] años de trayectoria en [Especialidad/Industria], especializándome en [Herramienta 1] y [Herramienta 2].*\n>\n' +
          '> *En mi experiencia más reciente en [Empresa previa o proyecto], lideré [logro concreto o métrica medible, ej. la optimización del proceso X logrando una reducción del 25% en tiempos operativos]. Me entusiasma la posibilidad de aportar este mismo enfoque de resultados a los proyectos actuales de [Nombre de la Empresa].*\n>\n' +
          '> *Adjunto mi CV en formato PDF y les comparto el enlace a mi perfil de LinkedIn [URL]. Quedo a entera disposición para coordinar una breve entrevista inicial y profundizar en cómo mi perfil puede sumar al equipo. ¡Muchas gracias por su tiempo y consideración!*\n>\n' +
          '> *Saludos cordiales,*\n> *[Tu Nombre y Apellido]*\n> *[Teléfono] · [Email] · [LinkedIn]"*',
      },
    ],
  },
  'guia-metricas-conversion-tracker': {
    id: 'guia-metricas-conversion-tracker',
    slug: 'guia-metricas-conversion-tracker',
    title: 'Guía de Métricas y Diagnóstico del Tracker',
    category: 'Métricas de Selección',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 6,
    badge: 'Guía de Diagnóstico In-App',
    estimatedReadTime: '3 min de lectura',
    summary:
      'Matriz para diagnosticar en qué etapa del embudo se frenan tus postulaciones y qué corregir con precisión matemática.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'diagnostico-embudo-seleccion',
        title: '1. Diagnóstico del Embudo por Ratios de Conversión',
        subtitle: 'Cómo saber qué corregir según tus números reales',
        content: 'Matriz de control según los datos arrojados por tu Job Tracker:',
        tableData: {
          headers: ['Síntoma en el Tracker', 'Diagnóstico Real', 'Acción de Corrección'],
          rows: [
            ['+20 postulaciones y 0 llamadas / contactos', 'Filtro ATS no superado o falta de palabras clave requeridas.', 'Ajustar palabras clave y hard skills en el CV (Módulo 3).'],
            ['Te llaman al screening pero no pasás a la entrevista técnica', 'El CV funciona pero falla el pitch de 90s, salario pretendido o seguridad al hablar.', 'Entrenar el pitch de presentación y respuestas difíciles (Módulo 7).'],
            ['Llegás a la entrevista técnica final pero no recibís oferta', 'Falta profundizar en ejemplos prácticos STAR o negociación salarial.', 'Entrenar resolución de casos y preguntas de cierre (Módulo 7).'],
          ],
        },
      },
    ],
  },
  'plantillas-mensajes-seguimiento-followup': {
    id: 'plantillas-mensajes-seguimiento-followup',
    slug: 'plantillas-mensajes-seguimiento-followup',
    title: 'Plantillas de Mensajes de Seguimiento y Follow-Up',
    category: 'Estrategia de Seguimiento',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 6,
    badge: 'Plantillas In-App',
    estimatedReadTime: '3 min de lectura',
    summary:
      'Guiones cortos y profesionales para dar seguimiento respetuoso tras postulaciones y entrevistas sin presionar al selector.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'followup-postulacion',
        title: '1. Follow-Up Post-Postulación (A los 5-7 días hábiles)',
        subtitle: 'Para responder sobre el mismo hilo del correo inicial',
        content:
          '> *"Hola [Nombre del Selector]:*\n>\n' +
          '> *Les escribo en relación a la postulación que envié la semana pasada para la vacante de [Puesto]. Sé que suelen estar con mucho volumen de trabajo, por lo que solo quería consultarles cómo sigue el cronograma del proceso y reiterar mi gran interés en sumarme al equipo de [Empresa].*\n>\n' +
          '> *Quedo a entera disposición ante cualquier consulta adicional. ¡Muchas gracias y buena semana!*\n>\n' +
          '> *Saludos cordiales,*\n> *[Tu Nombre y Apellido]*"',
      },
      {
        id: 'followup-entrevista',
        title: '2. Follow-Up Post-Entrevista (A los 5-7 días hábiles de la llamada)',
        subtitle: 'Para consultar novedades recordando un punto conversado',
        content:
          '> *"Hola [Nombre del Selector / Líder de Área]:*\n>\n' +
          '> *Espero que estés teniendo una excelente semana. Quería agradecerte nuevamente por la conversación que tuvimos sobre el rol de [Puesto]. Me quedé muy motivado con los desafíos que mencionaste respecto a [Tema puntual conversado en la entrevista, ej. la migración del sistema / la apertura de nuevos clientes].*\n>\n' +
          '> *Quería consultar respetuosamente el estado del proceso y ponerme a disposición si necesitan alguna referencia o material adicional. ¡Muchas gracias de nuevo!*\n>\n' +
          '> *Un saludo cordial,*\n> *[Tu Nombre y Apellido]*"',
      },
    ],
  },
  'guia-empleo-remoto-internacional': {
    id: 'guia-empleo-remoto-internacional',
    slug: 'guia-empleo-remoto-internacional',
    title: 'Guía de Empleo Remoto Internacional y Checklist Contractual',
    category: 'Casos Especiales · Empleo Remoto',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 8,
    badge: 'Guía Internacional In-App',
    estimatedReadTime: '5 min de lectura',
    summary:
      'Criterios de elegibilidad geográfica (Worldwide vs. LATAM), esquemas contractuales (Contractor vs. EOR), moneda de pago y checklist de prevención de estafas.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'criterios-elegibilidad-geografica',
        title: '1. Criterios de Elegibilidad Geográfica en Búsquedas Remotas',
        subtitle: 'Por qué "Remoto" no significa automáticamente desde cualquier país',
        content:
          'Las empresas establecen restricciones por cuestiones fiscales, regulatorias y husos horarios. Antes de postularte, verificá el alcance de la vacante:',
        tableData: {
          headers: ['Etiqueta en la Oferta', 'Significado Real', '¿Sos Elegible desde LATAM?'],
          rows: [
            ['Remote - Worldwide / Anywhere', 'Contratación abierta sin restricción de residencia física.', '✅ Sí, 100% elegible.'],
            ['Remote - LATAM / Latin America', 'Búsqueda acotada a candidatos residentes en países de América Latina.', '✅ Sí, ideal para nuestra región.'],
            ['Remote - US / EU Only', 'Remoto pero restringido legalmente a residentes fiscales en EE.UU. o Unión Europea.', '❌ No, descarte automático salvo permiso de trabajo legal.'],
            ['Must be based in [País]', 'La empresa exige residencia local por regulaciones impositivas o presencialidad híbrida.', '❌ Solo elegible si residís en ese país.'],
          ],
        },
      },
      {
        id: 'esquemas-contratacion-internacional',
        title: '2. Modalidades de Contratación Internacional',
        subtitle: 'Cómo te contrata una empresa extranjera y qué implica cada formato',
        content: 'Existen 3 estructuras habituales en el mercado global:',
        tableData: {
          headers: ['Modalidad', 'Cómo Funciona', 'Aspectos Clave a Considerar'],
          rows: [
            [
              'Contractor Independiente (B2B)',
              'Facturás como profesional independiente directamente a la empresa extranjera.',
              'Mayor tarifa bruta en USD/EUR. Vos gestionás tus impuestos locales, cobertura médica y ahorros.',
            ],
            [
              'Employer of Record (EOR) / Intermediario',
              'Una plataforma como Deel, Remote u Ontop actúa como empleador legal registrado en tu país.',
              'Contrato en relación de dependencia local con beneficios de ley y aportes patronales.',
            ],
            [
              'Entidad Legal Propia (Subsidiaria Local)',
              'La multinacional tiene sede constituida en tu país y te contrata bajo nómina formal.',
              'Relación laboral estándar según la legislación de tu país con paquete corporativo.',
            ],
          ],
        },
      },
      {
        id: 'preguntas-antes-de-aceptar-remoto',
        title: '3. Checklist de 6 Preguntas antes de Aceptar una Propuesta Remota',
        subtitle: 'Evaluación integral de condiciones laborales',
        checklistItems: [
          {
            id: 'chk-rem-1',
            text: '¿Bajo qué modalidad jurídica me contratan? (Contractor B2B vs. Nómina EOR local).',
          },
          {
            id: 'chk-rem-2',
            text: '¿En qué moneda se fija la remuneración y a través de qué plataforma se procesa el pago? (Wise, Payoneer, transferencia SWIFT o cuenta bancaria).',
          },
          {
            id: 'chk-rem-3',
            text: '¿Cuál es el huso horario y disponibilidad esperada? (Sincrónico con horario de la empresa vs. Asincrónico por objetivos).',
          },
          {
            id: 'chk-rem-4',
            text: '¿El contrato incluye días libres remunerados (PTO / Paid Time Off) y cómo se contemplan los feriados locales?',
          },
          {
            id: 'chk-rem-5',
            text: '¿Proveen bono de conectividad, equipamiento de trabajo (laptop/monitor) o estipendio de salud?',
          },
          {
            id: 'chk-rem-6',
            text: 'Seguridad verificada: Confirmé la identidad del recruiter en LinkedIn y el dominio corporativo del correo (nunca pagar trámites).',
          },
        ],
      },
    ],
  },
  'guia-primer-empleo-sin-experiencia': {
    id: 'guia-primer-empleo-sin-experiencia',
    slug: 'guia-primer-empleo-sin-experiencia',
    title: 'Guía de Primer Empleo y Conversión de Proyectos en Evidencia',
    category: 'Casos Especiales · Primer Empleo',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 8,
    badge: 'Guía Práctica In-App',
    estimatedReadTime: '5 min de aplicación',
    summary:
      'Cómo convertir proyectos universitarios, voluntariados y portfolios en evidencia de habilidades, y cómo responder en la entrevista ante la falta de experiencia formal.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'filosofia-evidencia-practica',
        title: '1. No tener experiencia formal ≠ No tener nada que mostrar',
        subtitle: 'Cómo generar credibilidad técnica desde el primer momento',
        content:
          'Cuando todavía no tuviste un empleo registrado, tu experiencia son los **proyectos reales y aplicaciones prácticas** que realizaste durante tu formación o por iniciativa propia:\n\n' +
          '• **Proyectos Universitarios / Terciarios:** Campañas de marketing, planes de exportación, auditorías de procesos o trabajos de investigación aplicada.\n' +
          '• **Proyectos Personales & Portfolios:** Sitios web, dashboards de Business Intelligence en Power BI/Excel, piezas de diseño o casos de estudio.\n' +
          '• **Voluntariados y Prácticas:** Coordinación de eventos, gestión de redes sociales o soporte administrativo en ONGs o iniciativas comunitarias.',
      },
      {
        id: 'guion-entrevista-sin-experiencia',
        title: '2. Cómo Responder en la Entrevista: "Veo que no tenés experiencia previa"',
        subtitle: 'Respuesta con madurez, aplomo y enfoque en resultados',
        content: 'Evitá quejarte del mercado o colocarte a la defensiva. Usá este modelo estructurado:',
        copyableTemplate: {
          label: 'Guion Modelo para Entrevistas Iniciales:',
          text: `“Es cierto, estoy buscando mi primera oportunidad profesional en el área. Durante mi formación en [Carrera/Especialidad] desarrollé proyectos prácticos en [Materia/Herramienta], donde por ejemplo lideré [describir brevemente un proyecto: ej. el análisis de un caso real / la creación de un tablero en Excel / una propuesta comercial].
Justamente busco una posición inicial donde pueda aportar esta base técnica, mi capacidad de aprendizaje rápido y compromiso de sumar valor al equipo desde el primer día.”`,
        },
      },
      {
        id: 'ejercicio-3-habilidades-proyecto',
        title: '3. Ejercicio: De las 3 Habilidades Clave al Caso Demostrativo',
        subtitle: 'Estrategia de 3 pasos para tu próxima postulación',
        checklistItems: [
          {
            id: 'paso-1-ini',
            text: '1. Identificá 1 oferta junior/trainee que te interese y anotá las 3 habilidades técnicas más solicitadas (ej. Excel avanzado, redacción comercial, atención a usuarios).',
          },
          {
            id: 'paso-2-ini',
            text: '2. Mapeá un proyecto propio donde hayas aplicado cada una de esas herramientas (incluso un ejercicio académico bien pulido).',
          },
          {
            id: 'paso-3-ini',
            text: '3. Incluí ese proyecto en tu CV dentro de la sección "Proyectos Destacados" utilizando la fórmula Acción + Contexto + Resultado.',
          },
        ],
      },
    ],
  },
  'matriz-habilidades-transferibles-transicion': {
    id: 'matriz-habilidades-transferibles-transicion',
    slug: 'matriz-habilidades-transferibles-transicion',
    title: 'Matriz de Mapeo de Habilidades Transferibles y Pitch del Puente',
    category: 'Casos Especiales · Transición Laboral',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 8,
    badge: 'Matriz de Carrera In-App',
    estimatedReadTime: '5 min de aplicación',
    summary:
      'Metodología para traducir tu trayectoria previa a una nueva industria, detectar brechas técnicas y articular el pitch del puente en 3 frases.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (In-App)',
    sections: [
      {
        id: 'principio-traduccion-profesional',
        title: '1. Principio Rector: "No borres tu pasado profesional, tradúcelo"',
        subtitle: 'Tus años previos son tu ventaja competitiva si encontrás el puente',
        content:
          'Cambiar de carrera o especialidad no significa arrancar de cero. Las habilidades blandas y metodológicas desarrolladas a lo largo de los años tienen un valor inmenso si las articulás con el lenguaje del nuevo rol:',
        tableData: {
          headers: ['Rol o Industria de Origen', 'Habilidades Transferibles Desarrolladas', 'Nuevo Rol Objetivo'],
          rows: [
            [
              'Atención al Cliente / Recepción',
              'Escucha activa, manejo de objeciones, resolución de conflictos bajo presión, empatía y seguimiento.',
              'Ventas B2B / Customer Success / Account Management',
            ],
            [
              'Docencia / Educación',
              'Capacidad pedagógica, oratoria, diseño instruccional, evaluación de desempeño y liderazgo de grupos.',
              'Capacitación y Desarrollo / Recursos Humanos / People Care',
            ],
            [
              'Administración / Contabilidad',
              'Rigor analítico, conciliación de datos, atención al detalle, manejo avanzado de planillas y procesos.',
              'Data Analytics / Business Operations / FinOps',
            ],
            [
              'Logística / Depósito',
              'Planificación de rutas, gestión de inventario, negociación con proveedores y optimización de tiempos.',
              'Compras / Supply Chain / Gestión de Proyectos Operativos',
            ],
          ],
        },
      },
      {
        id: 'deteccion-brechas-skills-gap',
        title: '2. Detección de la Brecha Técnica (Skills Gap)',
        subtitle: 'Capacitación intencional basada en datos del mercado',
        content:
          '• **Paso 1:** Buscá entre 5 y 10 ofertas de empleo del puesto al que querés migrar.\n' +
          '• **Paso 2:** Listá los requisitos técnicos que se repiten con frecuencia y que hoy no dominás (ej. una certificación puntual, un software ERP, un CRM o un lenguaje).\n' +
          '• **Paso 3:** Capacitate con foco exclusivo en cerrar esa brecha concreta. No hagas 20 cursos dispersos: hacé el curso exacto que te pide la vacante.',
      },
      {
        id: 'formula-pitch-del-puente',
        title: '3. La Fórmula del Puente en 3 Frases para Entrevistas',
        subtitle: 'Cómo responder "¿Por qué querés cambiar de área?" con total solvencia',
        content:
          'Nunca construyas tu respuesta desde la queja o el desgaste del rol anterior. Construila como una evolución lógica:',
        callout: {
          type: 'formula',
          text: 'FÓRMULA DEL PUENTE: [1. Vengo de...] + [2. Durante esos años desarrollé...] + [3. Ahora quiero pasar a... y me preparé haciendo...]',
        },
        copyableTemplate: {
          label: 'Guion Modelo del Pitch del Puente:',
          text: `“Durante los últimos [X] años me desempeñé en [Tu Área/Puesto Anterior], donde desarrollé una sólida experiencia en [Tus 2 habilidades transferibles más fuertes, ej. relación con clientes, resolución de problemas y gestión operativa].
Con el tiempo identifiqué que mi mayor motivación y proyección están en el área de [Nuevo Rol Objetivo]. Por eso, durante el último año me capacité en [Curso/Certificación/Herramienta clave] y desarrollé proyectos prácticos en [Tecnología].
Hoy busco sumarme a este equipo para combinar mi experiencia consolidada en [Habilidad previa] con mis nuevos conocimientos técnicos en [Nueva especialidad].”`,
        },
      },
    ],
  },
};

export function getInAppDocumentByIdOrSlug(idOrSlugOrTitle: string): InAppDocument {
  if (inAppDocumentsRegistry[idOrSlugOrTitle]) {
    return inAppDocumentsRegistry[idOrSlugOrTitle]!;
  }

  const clean = idOrSlugOrTitle
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  // Find by slug, id, or normalized title match
  const found = Object.values(inAppDocumentsRegistry).find((doc) => {
    const docCleanTitle = doc.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const docCleanId = doc.id.toLowerCase();
    const docCleanSlug = doc.slug.toLowerCase();

    return (
      docCleanId === clean ||
      docCleanSlug === clean ||
      docCleanTitle.includes(clean) ||
      clean.includes(docCleanId) ||
      clean.includes(docCleanSlug) ||
      docCleanTitle === clean
    );
  });
  if (found) return found;

  // Keyword smart matching
  if (clean.includes('remoto-internacional') || clean.includes('contractor') || (clean.includes('remoto') && clean.includes('internacional')) || clean.includes('eor')) {
    return inAppDocumentsRegistry['guia-empleo-remoto-internacional']!;
  }
  if (clean.includes('sin experiencia') || clean.includes('primer empleo') || clean.includes('junior') || clean.includes('trainee') || clean.includes('proyecto demostrativo')) {
    return inAppDocumentsRegistry['guia-primer-empleo-sin-experiencia']!;
  }
  if (clean.includes('transferible') || clean.includes('transicion') || clean.includes('cambio de carrera') || clean.includes('puente')) {
    return inAppDocumentsRegistry['matriz-habilidades-transferibles-transicion']!;
  }
  if (clean.includes('dificil') || clean.includes('incomod') || clean.includes('defecto') || clean.includes('debilidad')) {
    return inAppDocumentsRegistry['guia-preguntas-dificiles-entrevista']!;
  }
  if (clean.includes('pregunta') && (clean.includes('inteligente') || clean.includes('candidato') || clean.includes('entrevistador') || clean.includes('hacer') || clean.includes('vos'))) {
    return inAppDocumentsRegistry['preguntas-inteligentes-candidato-entrevistador']!;
  }
  if (clean.includes('virtual') || clean.includes('puesta a punto') || clean.includes('entorno') || clean.includes('setup') || (clean.includes('fase') && clean.includes('entrevista'))) {
    return inAppDocumentsRegistry['checklist-preparacion-fases-entrevistas']!;
  }
  if (clean.includes('fase') || clean.includes('cronograma') || clean.includes('tiempo') || clean.includes('seleccion')) {
    return inAppDocumentsRegistry['fases-proceso-seleccion']!;
  }
  if (clean.includes('ats') || clean.includes('checklist') || clean.includes('auditar')) {
    return inAppDocumentsRegistry['checklist-optimizacion-cv-ats']!;
  }
  if (clean.includes('plantilla') || clean.includes('cv') || clean.includes('curriculum')) {
    return inAppDocumentsRegistry['plantilla-estructura-cv-editorial']!;
  }
  if (clean.includes('linkedin')) {
    return inAppDocumentsRegistry['guia-optimizacion-linkedin-2026']!;
  }
  if (clean.includes('portal') || clean.includes('remoto')) {
    return inAppDocumentsRegistry['directorio-portales-empleo-remoto']!;
  }
  if (clean.includes('sueldo') || clean.includes('salari') || clean.includes('negocia') || clean.includes('compensacion') || clean.includes('piso')) {
    return inAppDocumentsRegistry['matriz-sueldos-negociacion']!;
  }
  if (clean.includes('star') || clean.includes('historia') || clean.includes('logro') || clean.includes('contame')) {
    return inAppDocumentsRegistry['framework-star-entrevistas']!;
  }
  if (clean.includes('requisito') || clean.includes('match') || clean.includes('evalua')) {
    return inAppDocumentsRegistry['guia-evaluacion-requisitos-ofertas']!;
  }
  if (clean.includes('cover') || clean.includes('presentacion') || clean.includes('pre-envio')) {
    return inAppDocumentsRegistry['plantilla-postulacion-profesional-cover-letter']!;
  }
  if (clean.includes('seguimiento') || clean.includes('recontacto') || clean.includes('follow')) {
    return inAppDocumentsRegistry['guia-seguimiento-profesional-protocolos']!;
  }
  if (clean.includes('sospech') || clean.includes('estafa') || clean.includes('seguridad')) {
    return inAppDocumentsRegistry['guia-seguridad-laboral-ofertas-sospechosas']!;
  }

  // Generic fallback document generator for any course/lesson resource
  return {
    id: idOrSlugOrTitle,
    slug: idOrSlugOrTitle,
    title: idOrSlugOrTitle.replace(/-/g, ' ').toUpperCase(),
    category: 'Material de Consulta In-App',
    badge: 'Lectura Segura In-App',
    estimatedReadTime: '3 min de lectura',
    summary: 'Documento interactivo exclusivo de la Academia Flor Martínez. Visualización directa en plataforma.',
    author: 'Flor Martínez · Academia',
    version: '2026 In-App',
    sections: [
      {
        id: 'introduccion-general',
        title: '1. Introducción y Aplicación Práctica',
        subtitle: 'Pautas de uso para tu proceso formativo',
        content:
          'Este material fue diseñado como complemento pedagógico para tu aprendizaje dentro del campus. Aplica los conceptos directamente sobre tus proyectos y ejercicios de la plataforma.',
        callout: {
          type: 'tip',
          text: 'Podes revisar este documento en pantalla tantas veces como necesites durante tu cursada.',
        },
      },
    ],
  };
}
