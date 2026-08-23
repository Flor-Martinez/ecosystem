export interface DocumentSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
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
  'checklist-optimizacion-cv-ats': {
    id: 'checklist-optimizacion-cv-ats',
    slug: 'checklist-optimizacion-cv-ats',
    title: 'Checklist de 25 Puntos para Auditar tu CV antes de Postularte',
    category: 'CV & Presentación ATS',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 1,
    badge: 'Auditoría ATS In-App',
    estimatedReadTime: '5 min de revisión interactiva',
    summary:
      'Guía y lista de verificación interactiva paso a paso para asegurar que tu currículum supere los filtros algorítmicos ATS y capture la atención del selector en los primeros 6 segundos.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2025 (Protegida In-App)',
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
    version: '2025.2 Editorial',
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

  'guia-optimizacion-linkedin-2025': {
    id: 'guia-optimizacion-linkedin-2025',
    slug: 'guia-optimizacion-linkedin-2025',
    title: 'Guía Rápida: Optimización de LinkedIn en 7 Pasos Clave',
    category: 'LinkedIn & Posicionamiento',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 3,
    badge: 'Guía Maestra In-App',
    estimatedReadTime: '12 min de lectura estratégica',
    summary:
      'Estrategia completa para configurar tu perfil de LinkedIn de modo que aparezca en las primeras búsquedas de LinkedIn Recruiter y genere contactos orgánicos de empresas.',
    author: 'Flor Martínez',
    version: '2025 Pro',
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
        title: '3. Sección "Acerca de": Storytelling y Propuesta de Valor',
        subtitle: 'Estructura en 4 párrafos que enganchan',
        content:
          'Las primeras 3 líneas antes del botón "...ver más" deben generar curiosidad inmediata. Luego, sintetiza tus logros, tus pasiones profesionales y tu llamado a la acción con tu email de contacto.',
        copyableTemplate: {
          label: 'Plantilla para el "Acerca de":',
          text: `¿Qué me apasiona de mi trabajo? [Pregunta o afirmación que enganche].

A lo largo de mis más de [X] años en [Industria o Área], me he especializado en [Especialidad clave], acompañando a organizaciones a [Problema que resolvés con métrica].

Mi experiencia incluye:
✓ [Logro o fortaleza 1]
✓ [Logro o fortaleza 2]
✓ [Logro o fortaleza 3]

Fuera de la oficina, disfruto [toque humano / pasatiempo / aprendizaje continuo].

📩 ¿Buscás potenciar tu equipo de [Área]? Conectemos o escribime a [tu.email@email.com].`,
        },
      },
    ],
  },

  'directorio-portales-empleo-remoto': {
    id: 'directorio-portales-empleo-remoto',
    slug: 'directorio-portales-empleo-remoto',
    title: 'Directorio Curado de 35+ Portales de Empleo Remoto e Internacional',
    category: 'Estrategia de Postulaciones',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 5,
    badge: 'Directorio In-App',
    estimatedReadTime: '10 min de consulta',
    summary:
      'Directorio clasificado de plataformas de empleo remoto para el mercado hispanohablante, estadounidense y europeo, con recomendaciones de postulación por industria.',
    author: 'Flor Martínez · Academia',
    version: '2025 Actualizado',
    sections: [
      {
        id: 'portales-globales',
        title: '1. Portales Remotos Globales (USD / EUR)',
        subtitle: 'Para perfiles bilingües y posiciones internacionales',
        content:
          'Plataformas verificadas con ofertas de empresas internacionales que contratan talento en modalidad Contractor o nómina remota.',
        tableData: {
          headers: ['Portal', 'Enfoque Principal', 'Nivel de Idioma'],
          rows: [
            ['We Work Remotely', 'Tecnología, Marketing, Operaciones, Soporte', 'Inglés B2 / C1'],
            ['RemoteOK', 'Desarrollo, Producto, Data, Diseño UX', 'Inglés Avanzado'],
            ['Wellfound (AngelList)', 'Startups en etapa de aceleración y escala', 'Inglés Intermedio / Avanzado'],
            ['FlexJobs', 'Empleos remotos certificados y auditados (sin spam)', 'Inglés / Multilingüe'],
            ['Turing / Toptal', 'Talento técnico de alto rendimiento', 'Inglés C1'],
          ],
        },
      },
      {
        id: 'portales-latam',
        title: '2. Portales Líderes en Argentina & Latinoamérica',
        subtitle: 'Mercado local y regional',
        content: 'Bolsas de empleo prioritarias para posiciones corporativas y pymes en la región.',
        tableData: {
          headers: ['Portal', 'Tipo de Empresas', 'Modalidades'],
          rows: [
            ['LinkedIn Jobs (Alertas)', 'Corporaciones, Multinacionales, Agencias', 'Remoto / Híbrido / Presencial'],
            ['Bumeran / Zonajobs', 'Empresas tradicionales y corporativas locales', 'Presencial / Híbrido'],
            ['Get on Board', 'Startups digitales de Latinoamérica', '100% Remoto'],
            ['Workana / Upwork', 'Freelance y proyectos independientes', 'Remoto por horas / hitos'],
          ],
        },
      },
    ],
  },

  'matriz-sueldos-negociacion': {
    id: 'matriz-sueldos-negociacion',
    slug: 'matriz-sueldos-negociacion',
    title: 'Matriz de Cálculo Salarial & Negociación de Ofertas',
    category: 'Negociación & Carrera',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 6,
    badge: 'Herramienta In-App',
    estimatedReadTime: '7 min de análisis',
    summary:
      'Metodología y fórmulas para definir tu piso salarial, tu expectativa de mercado y los guiones exactos para responder a "¿cuál es tu remuneración pretendida?".',
    author: 'Flor Martínez',
    version: '2025 VIP',
    sections: [
      {
        id: 'formula-piso-salarial',
        title: '1. Cómo calcular tu Rango Pretendido de Mercado',
        subtitle: 'Fórmula de 3 bandas (Piso, Target, Techo)',
        content:
          'Nunca des un número fijo único. Un número fijo te encasilla o te deja fuera de la mesa. Planteá siempre un rango con un margen de holgura del 15% al 20%.',
        callout: {
          type: 'formula',
          text: 'PISO: Costo de vida + 25% ahorro | TARGET: Media de mercado para tu seniority | TECHO: Target + 20% para margen de negociación.',
        },
      },
      {
        id: 'guion-respuesta-sueldo',
        title: '2. Guión para Responder en la Primera Entrevista',
        subtitle: 'Respuesta elegante cuando el selector insiste en saber tu número',
        content: 'Utilizá este guión para no desvalorizarte y abrir la negociación con profesionalismo.',
        copyableTemplate: {
          label: 'Guión de Respuesta Salarial:',
          text: `"En base a los requerimientos del puesto, mi trayectoria liderando [Tu Especialidad] y los valores actuales del mercado para una posición con este nivel de impacto, mi expectativa salarial bruta se encuentra en el rango de [Monto Mínimo] a [Monto Máximo], dependiendo del paquete integral de beneficios, flexibilidad y oportunidades de desarrollo que ofrezca la compañía."`,
        },
      },
    ],
  },

  'framework-star-entrevistas': {
    id: 'framework-star-entrevistas',
    slug: 'framework-star-entrevistas',
    title: 'Framework STAR para Respuestas de Entrevistas de Alto Impacto',
    category: 'Entrevistas Laborales',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 6,
    badge: 'Framework In-App',
    estimatedReadTime: '9 min de preparación',
    summary:
      'Estructura de 4 pasos (Situación, Tarea, Acción, Resultado) para responder preguntas por competencias en entrevistas con reclutadores y directores.',
    author: 'Flor Martínez · Selección',
    version: '2025 Didáctico',
    sections: [
      {
        id: 'los-4-pasos-star',
        title: '1. Los 4 Componentes del Método STAR',
        subtitle: 'Desglose del tiempo de respuesta (2 a 3 minutos en total)',
        content:
          'El 70% del tiempo de tu respuesta debe concentrarse en las ACCIONES que tomaste y los RESULTADOS cuantificables que conseguiste.',
        tableData: {
          headers: ['Fase', '% del Tiempo', 'Qué debe explicar'],
          rows: [
            ['S - Situación', '15%', 'Contexto breve: empresa, momento, problema u oportunidad.'],
            ['T - Tarea', '15%', 'Cuál era tu responsabilidad u objetivo puntual asignado.'],
            ['A - Acción', '50%', 'Paso a paso qué hiciste vos: herramientas, decisiones, liderazgo.'],
            ['R - Resultado', '20%', 'Impacto final cuantificado, aprendizajes y beneficios para el negocio.'],
          ],
        },
      },
      {
        id: 'ejemplo-resuelto-liderazgo',
        title: '2. Ejemplo Real Resuelto: Manejo de Conflicto en Equipo',
        subtitle: 'Pregunta: "Contame una ocasión en la que tuviste un desacuerdo con un compañero"',
        content: 'Respuesta modelo estructurada con el método STAR:',
        copyableTemplate: {
          label: 'Ejemplo STAR Modelo:',
          text: `[SITUACIÓN]: En mi anterior puesto en [Empresa], estábamos por entregar un proyecto clave con fecha límite inamovible y surgieron desacuerdos sobre qué metodología técnica priorizar.
[TAREA]: Como responsable de entrega, mi objetivo era alinear al equipo sin generar retrasos ni resentimientos.
[ACCIÓN]: Convoqué a una reunión de 30 minutos, escuché los fundamentos de ambas partes y propuse una matriz objetiva evaluando riesgos y tiempos. Acordamos implementar la opción más rápida para la primera versión y agendar una refactorización posterior.
[RESULTADO]: Entregamos el proyecto 2 días antes de la fecha límite y el cliente nos felicitó por la puntualidad. Además, el clima de trabajo mejoró notablemente.`,
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
    moduleNumber: 1,
    badge: 'Guía Rápida In-App',
    estimatedReadTime: '3 min de lectura',
    summary:
      'Línea de tiempo paso a paso con las 4 etapas internas de contratación en una empresa y la duración estimada de cada fase.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2025 (In-App)',
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
};

export function getInAppDocumentByIdOrSlug(idOrSlug: string): InAppDocument {
  if (inAppDocumentsRegistry[idOrSlug]) {
    return inAppDocumentsRegistry[idOrSlug]!;
  }

  // Find by slug
  const found = Object.values(inAppDocumentsRegistry).find((doc) => doc.slug === idOrSlug || doc.id === idOrSlug);
  if (found) return found;

  // Generic fallback document generator for any course/lesson resource
  return {
    id: idOrSlug,
    slug: idOrSlug,
    title: idOrSlug.replace(/-/g, ' ').toUpperCase(),
    category: 'Material de Consulta In-App',
    badge: 'Lectura Segura In-App',
    estimatedReadTime: '5 min de lectura',
    summary: 'Documento interactivo exclusivo de la Academia Flor Martínez. Visualización directa en plataforma.',
    author: 'Flor Martínez · Academia',
    version: '2025 In-App',
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
