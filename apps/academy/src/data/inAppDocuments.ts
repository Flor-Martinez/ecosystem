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
    version: 'Edición 2025 (Notion Template)',
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
    title: 'Directorio de Portales de Empleo y Consultoras de Selección',
    category: 'Ecosistema de Plataformas',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 4,
    badge: 'Directorio Vivo In-App',
    estimatedReadTime: '5 min de consulta',
    summary:
      'Directorio clasificado de bolsas masivas en Sudamérica, plataformas de trabajo remoto internacional en USD y consultoras de selección.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2026 (Actualizada)',
    sections: [
      {
        id: 'portales-masivos-sudamerica',
        title: '1. Bolsas Masivas Líderes en Sudamérica',
        subtitle: 'Para posiciones locales corporativas, presenciales e híbridas',
        content: 'Plataformas principales con mayor volumen de ofertas activas en la región:',
        tableData: {
          headers: ['Plataforma', 'Presencia Regional', 'Tipo de Vacantes'],
          rows: [
            ['Computrabajo', 'Toda Sudamérica (Argentina, Colombia, Perú, Chile, etc.)', 'Corporativas, pymes, operativas y comerciales'],
            ['Indeed', 'Global & Multirregional Latam', 'Agregador masivo de ofertas directas'],
            ['Bumeran / Laborum / Multitrabajos', 'Argentina, Chile, Perú, Ecuador, Venezuela', 'Grandes corporaciones y mandos medios'],
            ['LinkedIn Jobs', 'Global y Regional', 'Multinacionales, agencias, cargos calificados'],
          ],
        },
      },
      {
        id: 'portales-remoto-usd',
        title: '2. Portales de Nicho y Trabajo Remoto Global (USD / EUR)',
        subtitle: 'Para contratación internacional, perfiles digitales y startups',
        content: 'Plataformas especializadas en esquemas contractor y salarios en moneda extranjera:',
        tableData: {
          headers: ['Plataforma', 'Especialidad', 'Modalidad'],
          rows: [
            ['Wellfound (AngelList)', 'Startups tecnológicas y de producto', 'Remoto Internacional (USD)'],
            ['RemoteOK', 'Desarrollo, Producto, Data, Diseño, Ventas B2B', '100% Remoto Global'],
            ['We Work Remotely', 'Operaciones, Marketing, Soporte, Gestión', 'Remoto Internacional'],
            ['Torre.ai', 'Perfiles bilingües y talento de Latinoamérica', 'Remoto regional / global'],
            ['Get on Board', 'Startups digitales de Latinoamérica', 'Remoto Latam'],
          ],
        },
      },
      {
        id: 'consultoras-headhunting',
        title: '3. Consultoras de Selección & Agencias de Headhunting',
        subtitle: 'Para mandos medios, líderes de área y posiciones técnicas especializadas',
        content: 'Agencias donde conviene cargar tu CV en su base de datos interna y conectar con sus recruiters:',
        tableData: {
          headers: ['Consultora', 'Especialidad', 'Alcance'],
          rows: [
            ['PageGroup (Michael Page / Page Personnel)', 'Mandos medios, ejecutivos y especialistas', 'Multinacional (Latam & Global)'],
            ['Randstad', 'Perfiles corporativos, tecnología y profesionales', 'Regional & Global'],
            ['Adecco', 'Perfiles comerciales, industriales y administrativos', 'Regional & Global'],
            ['Hays', 'Perfiles de alta especialización técnica y directivos', 'Internacional'],
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
    version: 'Edición 2025 (In-App)',
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
    moduleNumber: 1,
    badge: 'Documento de Consulta In-App',
    estimatedReadTime: '3 min de lectura',
    summary:
      'Estructura de trabajo semanal en 3 bloques de alta productividad para mantener un flujo de 2 a 3 entrevistas por semana.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2025 (In-App)',
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
    moduleNumber: 2,
    badge: 'Matriz In-App',
    estimatedReadTime: '4 min de consulta',
    summary:
      'Metodología para extraer las keywords técnicas de 3 ofertas reales y configurar tus 2 variantes de CV sincronizadas con Mi Perfil.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2025 (In-App)',
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
    moduleNumber: 2,
    badge: 'Guía de Consulta Rápida',
    estimatedReadTime: '3 min de consulta',
    summary:
      'Listado clasificado de verbos activos por área para erradicar frases pasivas y formular logros con autoridad y métricas.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2025 (In-App)',
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
    title: 'Checklist de Auditoría Pre-Envío (10 Puntos de Control)',
    category: 'Control de Calidad de CV',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 2,
    badge: 'Checklist Rápido In-App',
    estimatedReadTime: '2 min de verificación',
    summary:
      'Lista rápida de 10 verificaciones críticas de formato, links y nomenclatura antes de enviar tu postulación a cualquier vacante.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2025 (In-App)',
    sections: [
      {
        id: 'puntos-control-tecnico',
        title: '1. Verificaciones Técnicas y de Contacto',
        subtitle: 'Para asegurar que el reclutador y el ATS lean tu CV sin fricción',
        content: 'Verificá estos 4 elementos técnicos antes de enviar tu archivo a cualquier plataforma o proceso:',
        checklistItems: [
          {
            id: 'chk-1',
            text: 'Nombre de archivo profesional: Guardado como "CV_Nombre_Apellido_Puesto.pdf" (nunca "CV_final.pdf").',
          },
          {
            id: 'chk-2',
            text: 'Hipervínculo de LinkedIn funcional: Al hacer clic abre tu perfil público sin errores ni caracteres de edición.',
          },
          {
            id: 'chk-3',
            text: 'Correo y teléfono válidos: Email profesional con enlace "mailto:" y teléfono con prefijo de país (+54 9...).',
          },
          {
            id: 'chk-4',
            text: 'Prueba de selección de texto: Podés seleccionar y copiar cualquier párrafo de tu PDF con el cursor.',
          },
        ],
      },
      {
        id: 'puntos-control-contenido',
        title: '2. Consistencia Visual y Redacción',
        subtitle: 'Detalles que consolidan tu autoridad profesional',
        content: 'Revisá la coherencia visual y el tono comercial para generar un impacto memorable en los primeros 6 segundos:',
        checklistItems: [
          {
            id: 'chk-5',
            text: 'Extensión estricta: 1 página completa (o 2 páginas completas), sin páginas huérfanas con 2 o 3 renglones.',
          },
          {
            id: 'chk-6',
            text: 'Alineación a la izquierda: Todo el cuerpo de texto alineado a la izquierda (sin texto justificado).',
          },
          {
            id: 'chk-7',
            text: 'Fechas uniformes: Formato consistente "Mes Año – Mes Año" en todas las posiciones laborales.',
          },
          {
            id: 'chk-8',
            text: 'Fórmula de logros: Viñetas iniciadas con verbos de acción fuertes y respaldadas por números o métricas.',
          },
          {
            id: 'chk-9',
            text: 'Cero datos obsoletos o sensibles: Sin DNI, sin estado civil, sin dirección física exacta y sin fotos informales.',
          },
          {
            id: 'chk-10',
            text: 'Regla de los 6 segundos: El titular y las primeras 3 líneas del resumen explican claramente tu especialidad.',
          },
        ],
      },
    ],
  },
  'guia-copywriting-linkedin-titular-about': {
    id: 'guia-copywriting-linkedin-titular-about',
    slug: 'guia-copywriting-linkedin-titular-about',
    title: 'Guía de Copywriting para LinkedIn (Titular & Acerca de mí)',
    category: 'Marca Personal & Redacción',
    programTitle: 'Experiencia Búsqueda Laboral',
    moduleNumber: 3,
    badge: 'Guía de Consulta Rápida',
    estimatedReadTime: '4 min de lectura',
    summary:
      'Fórmulas estructuradas y ejemplos reales redactados para optimizar el SEO de tu titular y conectar humanamente en tu extracto.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2025 (In-App)',
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
    moduleNumber: 3,
    badge: 'Plantillas de Mensajes',
    estimatedReadTime: '3 min de consulta',
    summary:
      'Guiones cortos (< 300 caracteres) y sin presión para conectar con selectores y Hiring Managers con alta tasa de respuesta.',
    author: 'Flor Martínez · Selección & Empleabilidad',
    version: 'Edición 2025 (In-App)',
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
    moduleNumber: 4,
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
    moduleNumber: 4,
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
    return inAppDocumentsRegistry['guia-optimizacion-linkedin-2025']!;
  }
  if (clean.includes('portal') || clean.includes('remoto')) {
    return inAppDocumentsRegistry['directorio-portales-empleo-remoto']!;
  }
  if (clean.includes('sueldo') || clean.includes('salari') || clean.includes('negocia')) {
    return inAppDocumentsRegistry['matriz-sueldos-negociacion']!;
  }
  if (clean.includes('star') || clean.includes('entrevista')) {
    return inAppDocumentsRegistry['framework-star-entrevistas']!;
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
