export interface CampusResource {
  id: string;
  title: string;
  type: 'word' | 'notion' | 'pdf' | 'excel' | 'link';
  fileSize?: string;
  url: string;
  programId: string;
  programTitle: string;
  moduleNumber?: number;
  category:
    | 'Plantilla ATS'
    | 'Guía PDF'
    | 'Matriz Excel'
    | 'Workspace Notion'
    | 'Directorio'
    | 'Guía de Tiempos & Circuitos'
    | 'Herramienta de Posicionamiento'
    | 'Cronograma Operativo'
    | string;
  description: string;
  isEssential?: boolean;
}

export interface CampusQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CampusQuiz {
  id: string;
  moduleId: string;
  moduleNumber: number;
  title: string;
  description: string;
  minPassingScore: number;
  questions: CampusQuizQuestion[];
}

export interface CampusActionItem {
  id: string;
  title: string;
  description: string;
  linkText?: string;
  targetView?: string;
}

export interface CampusLesson {
  id: string;
  programId: string;
  moduleId: string;
  moduleNumber: number;
  moduleTitle: string;
  lessonNumber: number;
  title: string;
  duration: string;
  videoDuration?: string;
  type: 'video' | 'guia' | 'evaluacion';
  completed?: boolean;
  description: string;
  takeaways: string[];
  resources: CampusResource[];
  videoScript?: string;
  discussionPrompt?: string;
  quiz?: CampusQuiz;
  actionItems?: CampusActionItem[];
  mindsetPrompt?: string;
}

export interface CampusModule {
  id: string;
  programId: string;
  number: number;
  title: string;
  tagline: string;
  totalDuration: string;
  lessons: CampusLesson[];
  quiz?: CampusQuiz;
}

export interface CampusProgram {
  id: string;
  slug: string;
  type: 'experiencia' | 'curso';
  badge: string;
  title: string;
  tagline: string;
  hasTracker: boolean;
  hasZoom: boolean;
  modules: CampusModule[];
}

// =============================================================================
// 1. EXPERIENCIA BÚSQUEDA LABORAL (7 MÓDULOS · 30 CLASES)
// =============================================================================
const expBusquedaLaboralModules: CampusModule[] = [
  // ---------------------------------------------------------------------------
  // MÓDULO 1: ¿CÓMO FUNCIONA LA BÚSQUEDA LABORAL? (4 CLASES)
  // ---------------------------------------------------------------------------
  {
    id: 'exp-mod-1',
    programId: 'exp-busqueda-laboral',
    number: 1,
    title: '¿Cómo funciona la búsqueda laboral?',
    tagline: 'Comprendé el proceso de selección real y definí tu target sin tirar CVs al azar',
    totalDuration: '26 min · 4 clases',
    lessons: [
      {
        id: 'exp-fun-01',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-1',
        moduleNumber: 1,
        moduleTitle: '¿Cómo funciona la búsqueda laboral?',
        lessonNumber: 1,
        type: 'video',
        title: 'La mentalidad del reclutador: ¿Por qué mandar 100 CVs no funciona?',
        duration: '6 min',
        videoDuration: '3:50 min',
        completed: true,
        description:
          'Descubrí la dinámica real del embudo de contratación y por qué la postulación masiva tiene una tasa de respuesta inferior al 2%.',
        takeaways: [
          'El embudo real del selector: Gestiona entre 250 y 400 currículums por vacante abierta.',
          'La regla de los 6 segundos: Tres anclas visuales (título coincidente, experiencia afín y logros cuantificables).',
          'Del spam a la precisión: Enviar el mismo documento genérico anula tu competitividad.',
          'Pausa estratégica: Detener el envío masivo en frío mientras calibramos tus materiales en el campus.',
        ],
        actionItems: [
          {
            id: 'act-1-1',
            title: 'Frenar la postulación masiva',
            description: 'Pausa el envío de CVs genéricos en piloto automático hasta tener tus materiales de búsqueda calibrados.',
          },
          {
            id: 'act-1-2',
            title: 'Guardar ofertas de interés en el Tracker',
            description: 'Si encontrás avisos atractivos mientras navegás, anotalos en tu Tracker del campus para encararlos con estrategia más adelante.',
            linkText: 'Abrir Tracker de Postulaciones →',
            targetView: 'tracker',
          },
        ],
        mindsetPrompt: 'El problema no sos vos, es el método.',
        resources: [],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ ¡Hola! Te doy la bienvenida a la Experiencia Búsqueda Laboral.
🏷️ EXPERIENCIA BÚSQUEDA LABORAL
🔊 Swoosh suave
🗣️ Si alguna vez enviaste 50 o 100 currículums en una semana y no te respondió nadie, o solo recibiste correos automáticos de rechazo, quiero darte tranquilidad y que sepas algo importante: el problema no sos vos, es el método.
🏷️ "El problema no sos vos, es el método"
🔊 Pop sutil
📺 (Opcional) B-Roll rápido de bandeja de Gmail scrolleando correos de descarte automático.

[1:15 - SECCIÓN 2: DESARROLLO CONCEPTUAL — LOS 6 SEGUNDOS]
🗣️ Un selector recibe en promedio entre 250 y 400 postulaciones por vacante.
🏷️ 250 - 400 CVs por vacante
🔊 Pop sutil
🗣️ No tiene tiempo material de leer cada CV palabra por palabra. Lo que hace es un escaneo visual de 6 segundos...
🖼️ Video flotante a la izquierda de Flor mostrando un CV real siendo scrolleado y escaneado en 6 segundos.
🗣️ Buscando 3 cosas: 1) que tu título coincida con lo que busca, 2) que tengas experiencia en un rubro o rol compatible, y 3) que muestres logros concretos.
🏷️ 1. Título coincidente
🏷️ 2. Rubro o rol compatible
🏷️ 3. Logros concretos
🔊 Click sutil por cada punto
🗣️ Cuando mandás el mismo documento genérico a 100 avisos distintos, no encajás al 100% en ninguno. Lo que vamos a construir juntos acá es un perfil enfocado, para que cuando abran tu postulación, en esos 6 segundos entiendan al instante por qué tienen que llamarte a vos.
🏷️ Perfil enfocado = Más entrevistas

[4:20 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ A partir de este momento hacemos una pausa: dejamos de postular en masa y en piloto automático.
🏷️ Pausa: Dejar de postular en masa
🔊 Click sutil
🗣️ Si ves ofertas que te interesan, guardalas en una lista o en el Tracker de nuestro campus, porque las vamos a encarar cuando tus materiales estén listos.
🖼️ Video/Captura flotante a la izquierda mostrando el Tracker de Postulaciones interactivo del campus.
🗣️ En la próxima clase vamos a ver cuánto tarda realmente una empresa desde que abre una búsqueda hasta que contrata, para que puedas llevar tu proceso con más calma y control.
🏷️ Próxima clase: Tiempos reales del proceso ⏱️`,
      },
      {
        id: 'exp-fun-02',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-1',
        moduleNumber: 1,
        moduleTitle: '¿Cómo funciona la búsqueda laboral?',
        lessonNumber: 2,
        type: 'video',
        title: 'Tiempos y fases reales de contratación',
        duration: '5 min',
        videoDuration: '4:15 min',
        completed: true,
        description:
          'Comprendé los tiempos reales que manejan las empresas, por qué ocurren los silencios y cómo gestionar tu búsqueda con calma y control.',
        takeaways: [
          'Duración estándar: Un proceso corporativo sano demora entre 20 y 60 días desde la publicación hasta la oferta.',
          'El circuito interno: Aprobaciones de presupuesto, agendas cruzadas y prioridades del negocio que causan silencios de 7 a 10 días.',
          'Foco y perseverancia: Mantener activa la rueda de postulaciones y entrevistas sin paralizarse a esperar una respuesta.',
        ],
        mindsetPrompt:
          'Tu meta no es conseguir trabajo mañana a cualquier costo, sino construir un flujo constante de 2 a 3 entrevistas semanales de calidad.',
        resources: [
          {
            id: 'fases-proceso-seleccion',
            title: 'Fases de un Proceso de Selección Típico',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 1,
            category: 'Guía de Tiempos & Circuitos',
            description: 'Línea de tiempo con las 4 etapas internas de contratación y la duración estimada de cada fase.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ Tuviste una entrevista que sentiste excelente, te dijeron 'te contactamos la semana que viene', pasaron diez días y no tuviste ninguna novedad. Pensás que ya eligieron a otro, o que hiciste algo mal. Vamos a ver qué pasa puertas adentro de una empresa para que entiendas los tiempos reales de contratación.
🏷️ El silencio post-entrevista ⏳
🔊 Tic-tac suave de reloj
🏷️ Circuito interno de selección 🏢

[1:10 - SECCIÓN 2: DESARROLLO CONCEPTUAL — LAS FASES Y LOS 20 A 60 DÍAS]
🗣️ Un proceso de selección rara vez depende de una sola persona. El recruiter preselecciona, pero el Hiring Manager tiene reuniones, el director financiero debe aprobar la banda salarial y el cliente interno tiene prioridades del negocio.
🏷️ Circuito de aprobación (3 a 4 áreas)
🔊 Pop sutil
🖼️ Gráfica flotante: 1. Reclutamiento ➔ 2. Líder de Área ➔ 3. Finanzas / Presupuesto ➔ 4. Oferta final.
🗣️ Un proceso sano tarda entre 20 y 60 días. Conocer estos tiempos te permite planificar tu caja económica, mantener la disciplina de búsqueda y no auto-descartarte antes de tiempo.
🏷️ Duración real: 20 a 60 días ⏱️
🔊 Click sutil
🏷️ No detener la búsqueda en paralelo 🔄

[3:50 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Quedate con esta idea clave: tu objetivo no es conseguir trabajo mañana a cualquier costo, sino generar un flujo constante de 2 a 3 entrevistas semanales de calidad.
🏷️ Objetivo: 2 a 3 entrevistas semanales
🔊 Sonido suave de confirmación
🗣️ En la próxima clase vamos a definir tu Target Laboral y tus No Negociables, para que apuntes únicamente a ofertas que se alineen con lo que realmente querés.
🏷️ Próxima clase: Target & No Negociables 🎯`,
      },
      {
        id: 'exp-fun-03',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-1',
        moduleNumber: 1,
        moduleTitle: '¿Cómo funciona la búsqueda laboral?',
        lessonNumber: 3,
        type: 'video',
        title: 'Definición de target y no negociables',
        duration: '8 min',
        videoDuration: '4:30 min',
        completed: false,
        description:
          'Cómo definir con precisión quirúrgica tu puesto objetivo, industria, modalidad de trabajo y los límites que no vas a aceptar.',
        takeaways: [
          'El peligro de decir "busco de lo que sea": Te vuelve invisible en los motores de búsqueda de selectores.',
          'Los 6 filtros del target: Puesto exacto, industria, tamaño de empresa, modalidad, rango salarial y disposición a mudarse.',
          'Definir tu lista de No Negociables: Te otorga seguridad y postura firme al momento de negociar.',
        ],
        actionItems: [
          {
            id: 'act-3-1',
            title: 'Completar tus 6 filtros de postulación',
            description: 'Definí tu rol exacto, industria, seniority, modalidad, piso salarial y disponibilidad en la Matriz de Target de esta clase.',
          },
          {
            id: 'act-3-2',
            title: 'Establecer tus Límites No Negociables',
            description: 'Anotá tus líneas rojas para mantener postura firme y seguridad en las entrevistas.',
          },
          {
            id: 'act-3-3',
            title: 'Listar tus 15 Empresas Objetivo',
            description: 'Anotá 15 organizaciones donde tu perfil resuelva un problema directo para iniciar tu prospección activa.',
          },
        ],
        mindsetPrompt:
          'Definir tu puesto objetivo no te cierra puertas: construye el foco exacto para que te llamen a entrevistas.',
        resources: [
          {
            id: 'matriz-target-no-negociables',
            title: 'Matriz de Target Laboral y Límites No Negociables',
            type: 'excel',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 1,
            category: 'Herramienta de Posicionamiento',
            description: 'Plantilla de trabajo para delimitar tus 6 filtros de postulación, piso salarial y límites innegociables.',
            isEssential: true,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ El error más común es pensar que 'buscar de todo' te da más posibilidades. En el mercado laboral pasa exactamente lo contrario: el que busca cualquier cosa no califica para nada.
🏷️ Mito: "Busco de lo que sea" ❌
🔊 Error sutil
🗣️ Definir tu target no es limitarte, es construir el posicionamiento exacto que un selector necesita ver para llamarte a una entrevista.
🏷️ Foco = Posicionamiento profesional 🎯
🔊 Pop sutil

[1:15 - SECCIÓN 2: DESARROLLO CONCEPTUAL — LA MATRIZ DE TARGET, NO NEGOCIABLES Y EMPRESAS OBJETIVO]
🗣️ Tanto los motores de búsqueda como los selectores buscan especialistas que resuelvan necesidades puntuales. Para eso trabajamos con la Matriz de Target Laboral que tenés en el campus.
🏷️ Especialistas vs. Perfiles genéricos
🔊 Pop sutil
🖼️ Gráfica flotante mostrando los 6 filtros de la Matriz de Target.
🗣️ Primero calibramos tus 6 filtros de postulación: tu puesto o rol exacto, tu industria o rubro objetivo, tu seniority real, tu modalidad de trabajo (remoto o híbrido), tu piso salarial no negociable, y tu disponibilidad de incorporación.
🏷️ 1. Rol Exacto · 2. Industria · 3. Seniority
🏷️ 4. Modalidad · 5. Piso Salarial · 6. Disponibilidad
🔊 Clicks sutiles al enumerar
🗣️ En segundo lugar, definimos tus límites No Negociables. Acá anotás tus líneas rojas: esas condiciones que no vas a aceptar bajo ninguna circunstancia, como esquemas presenciales a más de una hora de viaje o sueldos por debajo de tu piso. Saber con claridad qué NO vas a aceptar te da seguridad y una postura firme desde la primera conversación.
🏷️ Límites No Negociables = Líneas rojas y postura profesional 🛑
🔊 Pop sutil
🗣️ Y en tercer lugar, armamos tu lista de Empresas Objetivo, también conocidas como empresas diana. Una empresa objetivo es una organización donde tu perfil resuelve un problema directo. En lugar de esperar pasivamente a que publiquen un aviso, las listamos para contactar a sus líderes en las próximas clases.
🏷️ Empresas Objetivo = Prospección directa hacia líderes 🏢🎯
🔊 Pop de confirmación

[6:20 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Tu siguiente paso es abrir la Matriz de Target que tenés en los Documentos de esta clase. Podés completar tus 6 filtros, tus no negociables y tus 15 empresas objetivo directamente en la pantalla, y se guarda automáticamente en tu perfil.
🏷️ Documentos: Matriz de Target 📋
🔊 Pop sutil
🖼️ Video flotante mostrando cómo se completan los campos y el cartel de sincronización con "Mi Perfil".
🗣️ En la próxima clase vamos a ver los 5 errores típicos que cometen los candidatos al buscar trabajo y cómo armar tu plan de acción semanal para que tu búsqueda sea constante y productiva.
🏷️ Próxima clase: 5 errores típicos y plan semanal 📅`,
      },
      {
        id: 'exp-fun-04',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-1',
        moduleNumber: 1,
        moduleTitle: '¿Cómo funciona la búsqueda laboral?',
        lessonNumber: 4,
        type: 'video',
        title: '5 errores típicos y plan semanal',
        duration: '7 min',
        videoDuration: '3:45 min',
        completed: false,
        description:
          'Los errores más frecuentes que sabotean búsquedas y cómo armar un bloque de 10 a 15 horas semanales de alta productividad.',
        takeaways: [
          'Errores fatales: CV genérico, pasividad en redes, no dar seguimiento y sonar desesperado en lugar de profesional.',
          'Bloque de 2 horas diarias: 40% prospección de vacantes, 30% networking directo y 30% optimización de materiales.',
          'La búsqueda de empleo debe tratarse con el mismo rigor y horario que un proyecto profesional.',
        ],
        actionItems: [
          {
            id: 'act-4-1',
            title: 'Consultar el Cronograma Semanal',
            description: 'Revisá la distribución de los 3 bloques de trabajo (prospección, networking y postulaciones) en los Documentos de la clase.',
          },
          {
            id: 'act-4-2',
            title: 'Bloquear tus horarios fijos de búsqueda',
            description: 'Definí qué días y horas vas a dedicar a tu búsqueda activa para mantener la constancia.',
          },
        ],
        mindsetPrompt:
          'Buscar trabajo no es improvisar cuando tenés tiempo: es ejecutar un proceso profesional con horarios y objetivos definidos.',
        resources: [
          {
            id: 'cronograma-semanal-busqueda',
            title: 'Plan de Acción y Cronograma Semanal',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 1,
            category: 'Cronograma Operativo',
            description: 'Guía práctica para estructurar tu rutina semanal de búsqueda y seguimiento.',
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ Buscar trabajo es, en sí mismo, un proyecto profesional. Si abrís portales de empleo 20 minutos cada tres días cuando te acordás, tu proceso va a tardar el triple y te vas a frustrar.
🏷️ La búsqueda laboral como proyecto profesional 💼
🔊 Swoosh suave
🗣️ La diferencia entre quien pasa meses sin respuestas y quien genera 2 o 3 entrevistas por semana no es la suerte: es tener un bloque de trabajo semanal organizado.
🏷️ Rutina + Método = Entrevistas constantes 🎯
🔊 Pop sutil

[1:20 - SECCIÓN 2: DESARROLLO CONCEPTUAL — 5 ERRORES TÍPICOS Y EL BLOQUE SEMANAL]
🗣️ La mayoría de las postulaciones fracasan por 5 errores evitables: enviar CVs sin adaptar, un LinkedIn sin palabras clave, no llevar registro en un tracker, sonar suplicante en los mensajes y abandonar la búsqueda si no responden en una semana.
🏷️ 5 Errores Típicos en la Búsqueda ⚠️
🔊 Pop sutil
🏷️ 1. CV genérico · 2. LinkedIn sin SEO · 3. Sin Tracker
🏷️ 4. Mensajes de súplica · 5. Cero seguimiento
🔊 Clicks sutiles por punto
🖼️ Captura flotante del Cronograma Semanal con la distribución de los 3 bloques de trabajo.
🗣️ La solución es ordenar tu semana en 3 bloques de trabajo: mapeo de empresas objetivo, contacto directo con líderes y seguimiento de procesos abiertos. Con este esquema, en los Documentos de esta clase tenés tu cronograma para que tu búsqueda avance de forma constante y medible.
🏷️ Documentos: Cronograma Semanal 📅
🔊 Pop de confirmación

[5:45 - SECCIÓN 3: CIERRE DE MÓDULO Y LLAMADA A LA ACCIÓN]
🗣️ Con tu target definido y tu rutina armada, estamos listos para entrar al corazón de tu presentación: la creación de tu CV de alto impacto en el Módulo 2.
🏷️ Módulo 2: Creación y mejora de CV 📄🚀
🔊 Fin de lección suave`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // MÓDULO 2: CREACIÓN Y MEJORA DE CV (5 CLASES)
  // ---------------------------------------------------------------------------
  {
    id: 'exp-mod-2',
    programId: 'exp-busqueda-laboral',
    number: 2,
    title: 'Creación y mejora de CV',
    tagline: 'Construí un currículum moderno, adaptado a filtros ATS y optimizado para el escaneo de 6 segundos',
    totalDuration: '35 min · 5 clases',
    lessons: [
      {
        id: 'exp-cv-01',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-2',
        moduleNumber: 2,
        moduleTitle: 'Creación y mejora de CV',
        lessonNumber: 1,
        type: 'video',
        title: 'Estructura y formato de un CV moderno',
        duration: '8 min',
        videoDuration: '4:10 min',
        completed: false,
        description:
          'Secciones obligatorias, qué descartar por completo y reglas técnicas de diseño, tipografía, extensión y formato de exportación.',
        takeaways: [
          'Secciones esenciales: Encabezado profesional, Resumen de impacto, Experiencia (orden cronológico inverso), Educación y Skills.',
          'Qué eliminar: DNI, dirección física exacta, estado civil, fecha de nacimiento y gráficos de porcentaje de habilidades.',
          'Regla de longitud: 1 página (perfiles junior/mid) o máximo 2 páginas (senior/liderazgo). Exportación siempre en PDF.',
          'Criterio de foto: Opcional en Latam (si suma profesionalismo); eliminada en procesos para USA/UK/Canadá.',
        ],
        actionItems: [
          {
            id: 'act-cv-1-1',
            title: 'Descargar la plantilla base en Word o Notion',
            description: 'Accedé a los Documentos de esta clase para descargar tu modelo en formato .docx o duplicarlo en Notion.',
          },
          {
            id: 'act-cv-1-2',
            title: 'Configurar el encabezado limpio',
            description: 'Volcá tu nombre, rol target, ubicación, datos de contacto y enlace a LinkedIn eliminando datos obsoletos.',
          },
        ],
        mindsetPrompt:
          'Tu CV no es tu autobiografía: es un documento comercial donde el selector debe entender en 6 segundos por qué sos la solución al puesto.',
        resources: [
          {
            id: 'plantilla-estructura-cv-editorial',
            title: 'Plantilla CV ATS Editorial (Word .docx)',
            type: 'word',
            fileSize: '145 KB',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 2,
            category: 'Plantilla ATS',
            description: 'Modelo en Word formateado en 1 columna optimizado para filtros ATS de Workday y Greenhouse.',
            isEssential: true,
          },
          {
            id: 'plantilla-cv-minimalista-notion',
            title: 'Plantilla CV Minimalista en Notion',
            type: 'notion',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 2,
            category: 'Workspace Notion',
            description: 'Estructura modular para actualizar tu experiencia y exportar a PDF limpio.',
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ Tu CV no es tu autobiografía; es un documento comercial de alto valor donde el producto sos vos.
🏷️ Tu CV = Documento comercial de alto valor 📄💼
🔊 Swoosh suave
🗣️ El error más común es intentar contar todo lo que hiciste desde tu primer empleo, cuando en realidad un selector necesita entender en 6 segundos qué problemas resolvés y por qué encajás en la vacante.
🏷️ El escaneo inicial: 6 segundos clave ⏱️
🔊 Pop sutil
🗣️ Menos información irrelevante significa más claridad y más entrevistas.
🏷️ Menos datos irrelevantes = Más entrevistas 🎯

[1:30 - SECCIÓN 2: DESARROLLO CONCEPTUAL — LA ESTRUCTURA EN 5 BLOQUES]
🗣️ Vamos a ordenar tu CV en 5 bloques limpios.
🗣️ Empezamos por el encabezado: solo tu nombre, título profesional, ciudad/país, teléfono con código internacional, mail y link clickeable a tu LinkedIn. Eliminamos datos obsoletos como tu DNI o estado civil que solo ocupan espacio y restan profesionalismo.
🏷️ 1. Encabezado: Contacto útil + LinkedIn (Sin DNI ni estado civil) 📇
🔊 Click sutil
🗣️ El segundo bloque es tu perfil profesional: un resumen breve de 3 a 4 líneas donde explicás quién sos, cuál es tu especialidad y qué valor concreto aportás al puesto.
🏷️ 2. Perfil profesional: Resumen de impacto de 3-4 líneas 💡
🔊 Click sutil
🗣️ El tercer bloque, y el más importante, es tu experiencia laboral: la ordenamos en orden cronológico inverso, desde tu trabajo actual hacia atrás, destacando responsabilidades clave y logros medibles en lugar de listas interminables de tareas.
🏷️ 3. Experiencia laboral: Cronológico inverso + Logros medibles 💼
🔊 Click sutil
🗣️ El cuarto bloque es tu educación: ponemos tus títulos oficiales y únicamente las certificaciones o cursos que sean relevantes para el puesto al que aspirás.
🏷️ 4. Educación: Títulos y certificaciones relevantes 🎓
🔊 Click sutil
🗣️ Y el quinto bloque son tus habilidades técnicas: las herramientas, softwares y palabras clave que los selectores y los algoritmos van a buscar en tu perfil.
🏷️ 5. Habilidades técnicas: Herramientas y palabras clave ⚙️
🔊 Click sutil
🗣️ Para todo el documento, usamos tipografías legibles como Inter, Calibri o Plus Jakarta Sans, márgenes de al menos 1.5 cm para que respire la lectura, una extensión de una a dos páginas según tu seniority, y exportación obligatoria siempre en formato PDF.
🏷️ Formato: 1-2 páginas · Tipografía limpia · Exportar en PDF 📄
🔊 Pop de confirmación

[6:30 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Tu siguiente paso es ir a la sección de Documentos de esta clase y descargar tu plantilla base de CV en Word o en Notion. Tomate tu tiempo para volcar tus datos de contacto respetando la estructura de 5 bloques que vimos en esta clase.
🏷️ Documentos: Plantilla CV ATS en Word & Notion 📥
🔊 Pop sutil
🖼️ Captura flotante mostrando las plantillas editables en Word y Notion.
🗣️ En la próxima clase vamos a analizar cómo funcionan los sistemas ATS para que entiendas exactamente cómo los algoritmos escanean tu CV antes de que llegue a manos de un selector.
🏷️ Próxima clase: Cómo funcionan los filtros ATS 🤖📄
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-cv-02',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-2',
        moduleNumber: 2,
        moduleTitle: 'Creación y mejora de CV',
        lessonNumber: 2,
        type: 'video',
        title: 'Cómo funcionan los filtros ATS',
        duration: '7 min',
        videoDuration: '3:50 min',
        completed: false,
        description:
          'Cómo procesan el texto los softwares ATS, qué elementos rompen la lectura automática y cómo garantizar 100% de compatibilidad.',
        takeaways: [
          'Los ATS (Workday, Taleo, Greenhouse, Lever) extraen texto plano y ordenan candidatos según coincidencia de palabras clave.',
          'Mito: "El robot descarta automáticamente". Realidad: El sistema clasifica por relevancia y el selector humano revisa la lista ordenada.',
          'Elementos que dañan la lectura: tablas de doble columna complejas, cuadros de texto flotantes, íconos incrustados como imágenes.',
          'Regla de oro: Maquetación en 1 sola columna vertical con encabezados estándar y exportación en PDF con texto seleccionable.',
        ],
        actionItems: [
          {
            id: 'act-cv-2-1',
            title: 'Auditar tu CV con el Checklist ATS',
            description: 'Accedé a los Documentos de esta clase para verificar que tu archivo cumpla las pautas técnicas de lectura.',
          },
          {
            id: 'act-cv-2-2',
            title: 'Realizar la prueba de texto plano',
            description: 'Copiá y pegá el contenido de tu PDF en un bloc de notas para confirmar que se lea en orden sin caracteres rotos.',
          },
        ],
        mindsetPrompt:
          'Un ATS no es un enemigo con IA que te descarta: es un lector de texto plano que premia la claridad, el orden y las palabras clave.',
        resources: [
          {
            id: 'checklist-optimizacion-cv-ats',
            title: 'Checklist de Compatibilidad ATS (25 Puntos)',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 2,
            category: 'Checklist Técnico',
            description: 'Lista de verificación interactiva para comprobar que tu documento no contenga elementos que bloqueen el parseo.',
            isEssential: true,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ ¿Escuchaste hablar del famoso 'robot que descarta CVs'? En internet hay mucho mito sobre los sistemas ATS, pero la realidad es mucho más simple.
🏷️ Mito vs. Realidad: ¿Cómo funciona un ATS? 🤖📄
🔊 Swoosh suave
🗣️ Un ATS no es una inteligencia artificial que decide si servís o no; es una base de datos que convierte tu documento a texto plano y lo indexa según palabras clave.
🏷️ ATS = Base de datos de indexación por palabras clave 🔍
🔊 Pop sutil
🗣️ Vamos a ver exactamente cómo lee tu currículum para garantizar que nunca quede invisible en el sistema.
🏷️ Objetivo: 100% de compatibilidad y visibilidad 🎯
🔊 Pop de confirmación

[1:15 - SECCIÓN 2: DESARROLLO CONCEPTUAL — POR QUÉ FALLA EL PARSEO Y CÓMO DISEÑAR EN 1 COLUMNA]
🗣️ Para entender por qué falla un CV, imaginate qué pasa cuando el sistema extrae el contenido: lee en línea recta horizontal.
🏷️ Lectura horizontal: De izquierda a derecha 📄➡️🔡
🔊 Swoosh suave
🗣️ Si tenés un diseño de doble columna con cajas flotantes, el texto de la barra lateral se mezcla con tu experiencia laboral y genera un bloque incomprensible.
🖼️ Captura flotante mostrando la comparación de un CV visual de 2 columnas vs. el texto plano roto resultante.
🗣️ Lo mismo pasa cuando reemplazás palabras por gráficos, como barritas de nivel de idioma o íconos decorativos: para el sistema simplemente no existen.
🏷️ Errores fatales: Barritas de nivel & Cajas flotantes ⚠️
🔊 Pop sutil
🗣️ La solución es directa: maquetar en una sola columna vertical, usar encabezados estándar como 'Experiencia', 'Educación' y 'Habilidades', y verificar que todo tu texto sea seleccionable antes de exportar en PDF.
🏷️ Estructura segura: 1 Columna + Encabezados Estándar 🛡️
🔊 Pop sutil
🗣️ Así garantizás que el sistema indexe cada dato en el casillero correcto.
🏷️ Indexación limpia y precisa 🎯
🔊 Pop de confirmación

[5:45 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Andá a la sección de Documentos de esta clase y pasá tu CV por el Checklist de Compatibilidad ATS: si encontrás tablas dobles, barritas o cajas flotantes, es momento de limpiarlo y pasar tu información a la plantilla de una columna.
🏷️ Documentos: Checklist de Compatibilidad ATS 📥📋
🔊 Pop sutil
🖼️ Captura flotante del Checklist interactivo in-app.
🗣️ Una vez que el formato esté asegurado, en la siguiente clase te voy a enseñar cómo mapear e incorporar las palabras clave exactas de cada vacante para que tu perfil destaque en las búsquedas.
🏷️ Próxima clase: Palabras clave y adaptación del CV 🎯📄
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-cv-03',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-2',
        moduleNumber: 2,
        moduleTitle: 'Creación y mejora de CV',
        lessonNumber: 3,
        type: 'video',
        title: 'Palabras clave y adaptación del CV',
        duration: '7 min',
        videoDuration: '3:45 min',
        completed: false,
        description:
          'Cómo escanear una oferta laboral, mapear los términos técnicos exigidos y armar versiones estratégicas según el puesto.',
        takeaways: [
          'Método del CV Maestro: Mantener un archivo integral y derivar 2 variantes según tus sub-especialidades target.',
          'Técnica de los 3 avisos: Identificar términos recurrentes en herramientas técnicas, metodologías y competencias centrales.',
          'Integración estratégica: Volcar las keywords en el titular, en las primeras 3 líneas del perfil y dentro de los logros.',
        ],
        actionItems: [
          {
            id: 'act-cv-3-1',
            title: 'Mapear las Keywords de 3 avisos reales',
            description: 'Extraé los términos técnicos y herramientas que más se repiten en tu área.',
          },
          {
            id: 'act-cv-3-2',
            title: 'Configurar tus 2 variantes de CV en Mi Perfil',
            description: 'Definí los títulos y palabras clave de tus dos versiones objetivo en tu perfil de estudiante.',
          },
        ],
        mindsetPrompt:
          'Adaptar tu CV no es inventar experiencia: es hablar el dialecto exacto de la vacante para que el sistema y el selector reconozcan tu valor al instante.',
        resources: [
          {
            id: 'guia-mapeo-keywords-industria',
            title: 'Guía de Mapeo de Palabras Clave y Variantes de CV',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 2,
            category: 'Matriz de Keywords',
            description: 'Matriz interactiva con las palabras clave, herramientas y certificaciones más demandadas en el mercado.',
            isEssential: true,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ El error más común después de diseñar un buen CV es usarlo como un folleto único para todas las vacantes.
🏷️ El error del CV Genérico vs. CV Adaptado 📄❌
🔊 Swoosh suave
🗣️ Los algoritmos y los reclutadores no buscan perfiles generales; buscan coincidencias exactas con los requisitos del puesto.
🏷️ Keywords: El dialecto técnico de la vacante 🎯
🔊 Pop sutil
🗣️ Vamos a aprender el método para mapear los términos clave de un aviso e integrarlos estratégicamente en tu presentación sin alterar tu experiencia real.
🏷️ Objetivo: Máxima afinidad y relevancia algorítmica 🚀
🔊 Pop de confirmación

[1:20 - SECCIÓN 2: DESARROLLO CONCEPTUAL — CV MAESTRO Y TÉCNICA DE LOS 3 AVISOS]
🗣️ El método más eficiente consiste en tener un 'CV Maestro' completo y derivar dos o tres variantes según las ramas a las que apliques.
🏷️ Estrategia: CV Maestro + Variantes de Enfoque 📄✨
🔊 Swoosh suave
🗣️ Tomá 3 avisos de trabajo del puesto que buscás y anotá las palabras que se repiten: herramientas, metodologías y competencias. Esas son tus 'Keywords'.
🏷️ Técnica de los 3 Avisos: Mapeo de Keywords 🔍📋
🏷️ 1. Herramientas técnicas · 2. Metodologías · 3. Competencias
🔊 Clicks sutiles por punto
🖼️ Captura flotante mostrando la distribución de keywords en el Titular, Resumen y Experiencia Laboral.
🗣️ Tu trabajo consiste en incorporar esas palabras exactas en tu resumen profesional y en la descripción de tus tareas pasadas, sin mentir, pero usando la terminología que el mercado exige hoy.
🏷️ Vocabulario de Mercado sin inventar experiencia 🛡️
🔊 Pop de confirmación

[5:30 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Andá a los Documentos de esta clase para consultar la Guía de Mapeo de Palabras Clave y armá tus dos versiones adaptadas de CV según tus sub-especialidades.
🏷️ Documentos: Guía de Mapeo de Palabras Clave 📥📊
🔊 Pop sutil
🖼️ Captura flotante de la sincronización de las 2 variantes en "Mi Perfil".
🗣️ En la siguiente clase vamos a ver cómo convertir descripciones de tareas aburridas en declaraciones de alto valor usando verbos de acción y resultados medibles.
🏷️ Próxima clase: Verbos de acción y logros cuantificables 📈🎯
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-cv-04',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-2',
        moduleNumber: 2,
        moduleTitle: 'Creación y mejora de CV',
        lessonNumber: 4,
        type: 'video',
        title: 'Verbos de acción y logros cuantificables',
        duration: '8 min',
        videoDuration: '3:55 min',
        completed: false,
        description:
          'Transformá listas de tareas pasivas en declaraciones de valor con métricas, porcentajes y verbos de acción fuertes.',
        takeaways: [
          'La fórmula del logro: [Verbo de acción en pasado] + [Contexto / Herramienta] + [Métrica o Resultado de negocio].',
          'Eliminar frases pasivas: Desterrar "Responsable de...", "Encargado de..." o "Tareas de soporte".',
          'Cuantificar sin ser financiero: Medir por tiempo ahorrado, volumen de operaciones, calidad o personas coordinadas.',
        ],
        actionItems: [
          {
            id: 'act-cv-4-1',
            title: 'Aplicar la fórmula de logros en tu CV',
            description: 'Revisá las viñetas de tu experiencia y agregales verbos activos y resultados cuantificables.',
          },
          {
            id: 'act-cv-4-2',
            title: 'Consultar el Diccionario de Verbos (Opcional)',
            description: 'Si necesitás ideas de vocabulario, revisá la lista de 100 verbos en los Documentos de la clase.',
          },
        ],
        mindsetPrompt:
          'A un líder de contratación no le interesa lo que estabas obligado a hacer, sino el valor y los resultados que conseguiste.',
        resources: [
          {
            id: 'diccionario-100-verbos-accion',
            title: 'Diccionario de 100 Verbos de Acción de Alto Impacto',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 2,
            category: 'Guía de Vocabulario',
            description: 'Listado de verbos activos clasificados por área (Liderazgo, Optimización, Ventas, Innovación) para inspirar tu redacción.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ El error más común al describir la experiencia laboral es listar las obligaciones del puesto en lugar de los resultados que conseguiste.
🏷️ Obligaciones vs. Resultados de Negocio 📄⚠️
🔊 Swoosh suave
🗣️ A un líder de contratación no le interesa lo que estabas obligado a hacer, sino el valor concreto que aportaste al equipo.
🏷️ Objetivo: Demostrar tu impacto con autoridad 🚀
🔊 Pop sutil
🗣️ Vamos a ver cómo aplicar verbos de acción y métricas reales a cada viñeta de tu currículum para demostrar tu impacto profesional.
🏷️ Fórmula: Verbo Activo + Herramienta + Métrica 📈
🔊 Pop de confirmación

[1:30 - SECCIÓN 2: DESARROLLO CONCEPTUAL — LA FÓRMULA DEL LOGRO Y CÓMO CUANTIFICAR]
🗣️ Eliminá para siempre la frase 'responsable de' de tu CV.
🏷️ Frases Prohibidas: ❌ 'Responsable de...' ❌ 'Encargado de...'
🔊 Swoosh suave
🗣️ Cada viñeta de tu experiencia laboral debe iniciar con un verbo fuerte: Implementé, Negocié, Optimicé, Diseñé, Automaticé.
🏷️ Verbos Fuertes: Implementé · Negocié · Optimicé · Automaticé
🔊 Clicks sutiles por verbo
🗣️ Y siempre que sea posible, agregale un número: porcentajes, horas ahorradas, dinero gestionado o cantidad de personas a cargo.
🖼️ Captura flotante mostrando ejemplos de viñetas cuantificadas por tiempo, volumen y porcentaje.
🗣️ Si no tenés números exactos, usá rangos o indicadores de mejora cualitativa.
🏷️ Cuantificá por: Tiempo · Volumen · Calidad · Escala 📊
🔊 Pop de confirmación

[6:30 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Tu siguiente paso es abrir tu plantilla de CV, revisar las viñetas de tu experiencia y corregirlas aplicando esta fórmula de logros con métricas.
🏷️ Acción: Corregir viñetas con la fórmula de logros ✍️
🔊 Pop sutil
🗣️ Si necesitás inspiración para encontrar las palabras más potentes, en la sección de Documentos de esta clase tenés una lista con 100 verbos de acción clasificados por área.
🏷️ Opcional en Documentos: 100 Verbos de Acción 📥📖
🔊 Pop sutil
🗣️ En la próxima clase vamos a hacer la auditoría final de tu currículum: un control de calidad paso a paso para asegurarnos de que no haya quedado ningún detalle suelto antes de pasar a tu estrategia de LinkedIn.
🏷️ Próxima clase: Auditoría final y checklist antes de enviar 🔍🚀
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-cv-05',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-2',
        moduleNumber: 2,
        moduleTitle: 'Creación y mejora de CV',
        lessonNumber: 5,
        type: 'video',
        title: 'Auditoría final y checklist antes de enviar',
        duration: '5 min',
        videoDuration: '3:30 min',
        completed: false,
        description:
          'Auditoría final de 10 puntos antes del envío para asegurar consistencia visual, links activos y cero errores ortográficos.',
        takeaways: [
          'Control de calidad en 10 puntos: Nomenclatura del archivo, links funcionales, formato de fechas y alineación visual limpia.',
          'Nombre de archivo profesional: Guardar siempre como `CV_Nombre_Apellido_Puesto.pdf` para facilitar la búsqueda del selector.',
          'Consistencia de extensión: 1 página (junior/mid) o 2 páginas completas (senior), evitando páginas a medias o renglones huérfanos.',
        ],
        actionItems: [
          {
            id: 'act-cv-5-1',
            title: 'Exportar tu PDF final optimizado',
            description: 'Guardá tu CV definitivo con la nomenclatura `CV_Nombre_Apellido_Puesto.pdf`.',
          },
          {
            id: 'act-cv-5-2',
            title: 'Consultar el Checklist de Auditoría (Opcional)',
            description: 'Revisá los 10 puntos de control en los Documentos de la clase para validar tu archivo.',
          },
        ],
        mindsetPrompt:
          'Un CV impecable en los detalles técnicos demuestra el mismo rigor y profesionalismo con el que vas a trabajar en la empresa.',
        resources: [
          {
            id: 'checklist-auditoria-pre-envio',
            title: 'Checklist de Auditoría Pre-Envío (10 Puntos)',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 2,
            category: 'Checklist de Control',
            description: 'Guía rápida de 10 puntos de verificación técnica y visual para validar tu CV antes de postularte.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ Un enlace roto a tu perfil de LinkedIn, un archivo mal nombrado o una sola falta de ortografía en tu titular pueden arruinar una postulación antes de que lean tu experiencia.
🏷️ Control de Calidad: Los detalles que definen una postulación 🔍⚠️
🔊 Swoosh suave
🗣️ En esta clase vamos a hacer un control de calidad rápido en 10 puntos para blindar tu documento y asegurarnos de que tu CV esté 100% impecable antes de mandarlo a cualquier empresa.
🏷️ Auditoría Pre-Envío: 10 Puntos de Control 🛡️📄
🔊 Pop de confirmación

[1:00 - SECCIÓN 2: DESARROLLO CONCEPTUAL — CHECKLIST DE 10 PUNTOS DE CONTROL]
🗣️ Antes de enviar cualquier postulación, hacete estas preguntas rápidas:
🗣️ ¿El archivo tiene tu nombre y puesto en el título?
🏷️ 1. Nombre Profesional: CV_Nombre_Apellido_Puesto.pdf 📄
🔊 Click sutil
🗣️ ¿Tus links de LinkedIn y mail funcionan al hacer clic?
🏷️ 2. Hipervínculos Activos y Funcionales 🔗
🔊 Click sutil
🖼️ Captura flotante mostrando el archivo bien nombrado y la prueba de clic en los enlaces de contacto.
🗣️ ¿El texto está alineado a la izquierda sin saltos extraños?
🏷️ 3. Alineación a la Izquierda (Sin justificar) 📐
🔊 Click sutil
🗣️ ¿Tus fechas laborales tienen mes y año consistentes?
🏷️ 4. Formato de Fechas Uniforme 🗓️
🔊 Click sutil
🗣️ ¿Tu documento tiene una o dos páginas completas sin renglones huérfanos?
🏷️ 5. Extensión Precisa: 1 o 2 Páginas Completas 📑
🔊 Click sutil
🗣️ Revisar estos detalles te toma menos de dos minutos y te asegura que ningún error técnico arruine tu oportunidad.
🏷️ Verificación en 2 minutos ⏱️
🔊 Pop sutil
🗣️ Cuando tu CV supera este filtro con diez de diez, está listo para salir a la cancha.
🏷️ Resultado: CV Blindado 10/10 📄🎯
🔊 Pop de confirmación

[4:00 - SECCIÓN 3: CIERRE DE MÓDULO Y LLAMADA A LA ACCIÓN]
🗣️ Guardá tu PDF final optimizado.
🏷️ Guardar PDF Definitivo 💾
🔊 Pop sutil
🗣️ Si querés hacer una última revisión rápida, en los Documentos de la clase tenés el checklist de 10 puntos para validar en cualquier momento.
🏷️ Opcional en Documentos: Checklist de 10 Puntos 📥📋
🔊 Pop sutil
🗣️ Completaste el bloque de CV: tenés un currículum moderno, adaptado a filtros ATS y orientado a resultados.
🏷️ Hito: Módulo 02 Completado (CV de Alto Impacto) 📄✅
🔊 Pop de confirmación
🗣️ Ahora entramos al Módulo 3, donde vamos a optimizar tu LinkedIn de punta a punta para que tu perfil atraiga ofertas de forma constante.
🏷️ Módulo 03: Creación y mejora de LinkedIn 🚀💼
🔊 Swoosh final de módulo`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // MÓDULO 3: CREACIÓN Y MEJORA DE LINKEDIN (5 CLASES)
  // ---------------------------------------------------------------------------
  {
    id: 'exp-mod-3',
    programId: 'exp-busqueda-laboral',
    number: 3,
    title: 'Creación y mejora de LinkedIn',
    tagline: 'Optimizá tu perfil estelar, aumentá tu posicionamiento en búsquedas y prospectá recruiters',
    totalDuration: '34 min · 5 clases',
    lessons: [
      {
        id: 'exp-lk-01',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-3',
        moduleNumber: 3,
        moduleTitle: 'Creación y mejora de LinkedIn',
        lessonNumber: 1,
        type: 'video',
        title: 'Foto, banner y URL personalizada',
        duration: '7 min',
        videoDuration: '3:45 min',
        completed: false,
        description:
          'Los elementos visuales y de configuración técnica para proyectar autoridad inmediata desde el primer segundo.',
        takeaways: [
          'La foto de perfil profesional: plano medio, rostro ocupando el 60% del círculo, iluminación frontal y fondo neutro.',
          'Banner / Portada personalizado: propuesta de valor visual clara, herramientas clave y datos de contacto.',
          'Personalización de la URL pública limpia (`linkedin.com/in/nombreapellido`) para mejorar el SEO en Google.',
        ],
        actionItems: [
          {
            id: 'act-lk-1-1',
            title: 'Personalizar tu URL pública en LinkedIn',
            description: 'Ingresá a tu perfil público y eliminá los números aleatorios de tu enlace.',
          },
          {
            id: 'act-lk-1-2',
            title: 'Actualizar tu foto y subir tu portada',
            description: 'Alineá tu encuadre visual con las pautas de iluminación y zona segura de diseño.',
          },
        ],
        mindsetPrompt:
          'LinkedIn no es un currículum estático: es tu propia página web profesional y tu principal canal de atracción de oportunidades.',
        resources: [],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ LinkedIn no es simplemente un currículum subido a internet: es tu propia página web profesional y tu principal canal de ventas en el mercado laboral.
🏷️ LinkedIn: Tu Landing Page Profesional 🌐💼
🔊 Swoosh suave
🗣️ Cuando un reclutador o un líder de área entra a tu perfil, tarda exactamente tres segundos en decidir si se queda o si sigue de largo.
🏷️ La Regla de los 3 Segundos: Impacto Visual Superior ⏱️👀
🔊 Pop sutil
🗣️ En esta clase vamos a optimizar el tercio superior de tu perfil —tu foto, tu portada y tu URL pública— para proyectar autoridad, confianza y profesionalismo desde el primer segundo.
🏷️ Tríada Visual: Foto · Portada · URL Limpia 📸🎨🔗
🔊 Pop de confirmación

[1:20 - SECCIÓN 2: DESARROLLO CONCEPTUAL — FOTO, PORTADA Y URL LIMPIA]
🗣️ Vamos a trabajar sobre los tres elementos visuales de tu cabecera:
🗣️ Primero, tu foto de perfil: tiene que ser un plano medio donde tu rostro ocupe cerca del 60% del círculo, con buena iluminación frontal, fondo liso o desenfocado y una expresión que transmita profesionalismo y cercanía. Cero selfies, fotos grupales recortadas o fondos con distracciones.
🏷️ 1. Foto: Rostro 60% · Luz Frontal · Fondo Neutro 📸
🔊 Swoosh suave
🖼️ Captura flotante mostrando el encuadre de foto profesional.
🗣️ Segundo, tu banner de portada: dejar el fondo gris por defecto transmite desinterés o perfil inactivo. Tu portada es tu cartel de presentación: tiene que incluir tu especialidad principal, tres o cuatro palabras clave de tu área y un correo de contacto, asegurándote de no poner texto en el tercio izquierdo para que tu foto no lo tape.
🏷️ 2. Banner: Especialidad + Keywords + Contacto 🎨
🔊 Pop sutil
🖼️ Captura flotante mostrando la zona segura de diseño de la portada.
🗣️ Y tercero, tu URL pública: de fábrica, LinkedIn te agrega números aleatorios al final de tu nombre. Entrá a 'Editar perfil público y URL' y limpiala para que quede solo tu nombre y apellido.
🏷️ 3. URL Limpia: linkedin.com/in/nombreapellido 🔗
🔊 Pop sutil
🗣️ Esto mejora tu posicionamiento en Google y hace que tu enlace se vea impecable cuando lo compartas.
🏷️ Posicionamiento SEO en Google & LinkedIn 🌐
🔊 Pop de confirmación

[5:45 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Andá a tu cuenta de LinkedIn, personalizá tu URL pública, seleccioná tu mejor foto y subí tu nueva portada.
🏷️ Acción en LinkedIn: Actualizar Foto, Portada y URL 📸🎨🔗
🔊 Pop sutil
🗣️ En la siguiente clase vamos a mejorar tu Titular y tu extracto Acerca de mi.
🏷️ Próxima clase: Titular magnético y sección Acerca de mí 🎯✍️
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-lk-02',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-3',
        moduleNumber: 3,
        moduleTitle: 'Creación y mejora de LinkedIn',
        lessonNumber: 2,
        type: 'video',
        title: 'Titular magnético y sección Acerca de mí',
        duration: '8 min',
        videoDuration: '3:50 min',
        completed: false,
        description:
          'Cómo redactar un titular que indexe en el buscador de reclutadores y un extracto que cuente tu historia con enganche y llamada a la acción.',
        takeaways: [
          'El Titular es el campo con mayor peso SEO: Determina tu posición en las búsquedas de LinkedIn Recruiter.',
          'Fórmula del Titular: Combinar tu cargo objetivo con herramientas y especialidad con separadores limpios (Rol | Tecnologías | Especialidad).',
          'Estructura del Acerca de mí: Redacción en 1ra persona, gancho en las primeras 3 líneas, logros cuantificados y correo de contacto directo.',
        ],
        actionItems: [
          {
            id: 'act-lk-2-1',
            title: 'Actualizar el Titular en LinkedIn',
            description: 'Cargá tu titular estructurado con cargo objetivo, herramientas y especialidad.',
          },
          {
            id: 'act-lk-2-2',
            title: 'Redactar tu sección Acerca de mí',
            description: 'Escribí tu extracto en primera persona destacando tus logros y dejando tu correo visible.',
          },
        ],
        mindsetPrompt:
          'El titular de LinkedIn no es un estado de ánimo: es la etiqueta con la que el algoritmo te indexa ante las mejores oportunidades.',
        resources: [],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ Si tu titular dice 'En búsqueda activa de nuevas oportunidades' o simplemente pusiste tu título universitario, estás desperdiciando el espacio con mayor peso SEO de todo tu perfil.
🏷️ Error Fatal: 'En búsqueda activa' en el Titular ❌📉
🔊 Swoosh suave
🖼️ Placa comparativa: 'En búsqueda activa...' (Tachado en Rojo) vs. 'Rol + Especialidad + Herramientas' (Tilde Verde).
🗣️ Los reclutadores que usan LinkedIn Recruiter nunca buscan la palabra 'desempleado' ni 'búsqueda activa': buscan cargos exactos, industrias y herramientas clave.
🏷️ SEO en LinkedIn: Palabras Clave de Alta Demanda 🔍⚙️
🔊 Pop sutil
🗣️ En esta clase vamos a construir un Titular magnético que te posicione en los primeros lugares de búsqueda y un 'Acerca de mí' que atrape al selector desde la primera línea.
🏷️ Estrategia: Titular con SEO + Acerca de Mí Comercial 🎯✍️
🔊 Pop de confirmación

[1:30 - SECCIÓN 2: DESARROLLO CONCEPTUAL — FÓRMULA DEL TITULAR Y ACERCA DE MÍ]
🗣️ El Titular tiene como único objetivo hacerte aparecer en los filtros de búsqueda de los reclutadores.
🏷️ Objetivo del Titular: Indexación Algorítmica Máxima 🎯
🔊 Swoosh suave
🗣️ Combiná tu cargo objetivo con tus herramientas y especialidades separadas por barras: eso le indica al algoritmo exactamente en qué vacantes posicionarte.
🏷️ Rol | Tecnologías | Especialidad ⚙️
🔊 Pop sutil
🖼️ Captura de búsqueda de LinkedIn Recruiter mostrando cómo indexan las palabras del titular.
🗣️ Una vez que el selector entra a tu perfil, tu 'Acerca de mí' es el encargado de generar conexión y confianza.
🗣️ Escribilo en primera persona, contá qué te apasiona resolver, listá tus principales logros y dejá siempre tu correo visible al final.
🏷️ Acerca de Mí: Tono Humano + Logros + Email de Contacto 💬
🔊 Pop de confirmación

[6:30 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Actualizá tu perfil asegurándote de cumplir los pasos anteriores.
🏷️ Acción en LinkedIn: Actualizar Titular y Acerca de Mí ✍️💼
🔊 Pop sutil
🗣️ En la siguiente clase vamos a optimizar tu experiencia laboral y la estrategia de recomendaciones.
🏷️ Próxima clase: Experiencia, aptitudes y recomendaciones 🤝⭐
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-lk-03',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-3',
        moduleNumber: 3,
        moduleTitle: 'Creación y mejora de LinkedIn',
        lessonNumber: 3,
        type: 'video',
        title: 'Experiencia, aptitudes y recomendaciones',
        duration: '6 min',
        videoDuration: '3:40 min',
        completed: false,
        description:
          'Detalle de cargos anteriores, priorización de las 5 aptitudes clave y solicitud estratégica de recomendaciones que generen confianza.',
        takeaways: [
          'Sincronizar las viñetas de experiencia con tu CV destacando proyectos y medios multimedia adjuntos.',
          'Reordenar las 5 aptitudes principales priorizando herramientas y conocimientos técnicos clave que el algoritmo filtra con más fuerza.',
          'Protocolo para pedir recomendaciones a colegas o excolegas cercanos recordándoles un proyecto concreto.',
        ],
        actionItems: [
          {
            id: 'act-lk-3-1',
            title: 'Actualizar viñetas de experiencia y adjuntar proyectos',
            description: 'Cargá los logros cuantificados y sumá enlaces o PDFs destacados en cada cargo.',
          },
          {
            id: 'act-lk-3-2',
            title: 'Reordenar Top 5 Aptitudes y solicitar 2 recomendaciones',
            description: 'Fijá tus herramientas técnicas principales y enviá 2 solicitudes de recomendación personalizadas.',
          },
        ],
        mindsetPrompt:
          'Las recomendaciones en LinkedIn son el equivalente a las reseñas de 5 estrellas: generan confianza inmediata y eliminan las dudas de los selectores.',
        resources: [],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ Las recomendaciones en LinkedIn son el equivalente a las reseñas de cinco estrellas en una tienda online: generan confianza inmediata y eliminan las dudas de cualquier selector.
🏷️ Prueba Social: Reseñas de 5 estrellas en tu perfil ⭐⭐⭐⭐⭐
🔊 Swoosh suave
🗣️ Cualquiera puede escribir que es un profesional excelente en su CV, pero cuando un exjefe o un colega validan tus resultados con nombre y apellido, tu autoridad se vuelve indiscutible.
🏷️ Validación Externa: Confianza y Autoridad Real 🛡️
🔊 Pop sutil
🖼️ Placa flotante mostrando una recomendación real destacada en un perfil de LinkedIn.
🗣️ En esta clase vamos a estructurar tu sección de Experiencia, ordenar tus cinco aptitudes clave para el algoritmo y aplicar una estrategia simple para pedir recomendaciones de alto impacto.
🏷️ Experiencia + Top 5 Aptitudes + Recomendaciones Estratégicas 📈
🔊 Pop de confirmación

[1:15 - SECCIÓN 2: DESARROLLO CONCEPTUAL — EXPERIENCIA, APTITUDES Y RECOMENDACIONES]
🗣️ Para tu sección de Experiencia, volcamos las mismas viñetas orientadas a logros que ya redactaste en tu CV:
🗣️ Iniciá cada punto con un verbo de acción fuerte y sumale métricas de impacto; si tenés certificados o enlaces a proyectos públicos, podés adjuntarlos como elementos destacados en cada cargo.
🏷️ 1. Experiencia: Viñetas con Logros + Multimedia 💼📁
🔊 Swoosh suave
🖼️ Captura flotante mostrando un puesto de LinkedIn con viñetas claras y un proyecto adjunto.
🗣️ En la sección de Aptitudes, reordená la lista para colocar en los primeros cinco lugares las herramientas técnicas y metodologías más demandadas de tu puesto objetivo.
🗣️ Evitá poner habilidades genéricas como 'proactivo'; el algoritmo filtra con más fuerza términos concretos como SAP, Salesforce, SQL o Gestión Comercial.
🏷️ 2. Top 5 Aptitudes: Hard Skills & Herramientas Técnicas ⚙️📊
🔊 Click sutil
🗣️ Y para tus Recomendaciones, elegí a dos colegas o excolegas cercanos y escribiles un mensaje privado:
🗣️ Saludalos con calidez, recordales un proyecto puntual que hayan compartido y pediles si pueden dejarte unas breves líneas sobre cómo fue trabajar juntos. Facilitarles la idea hace que te respondan con entusiasmo y en pocos minutos.
🏷️ 3. Recomendaciones: Mensaje Directo + Proyecto Concreto 🤝💬
🔊 Pop de confirmación

[4:50 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Con estos cambios tu perfil queda completamente optimizado de punta a punta.
🏷️ Perfil 100% Optimizado y Validado ✅💼
🔊 Pop sutil
🗣️ En la próxima clase vamos a dar el paso más importante: cómo contactar de forma directa a reclutadores y líderes de área con mensajes que generen conversaciones reales.
🏷️ Próxima clase: Mensajes de contacto a recruiters y líderes 📩🎯
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-lk-04',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-3',
        moduleNumber: 3,
        moduleTitle: 'Creación y mejora de LinkedIn',
        lessonNumber: 4,
        type: 'video',
        title: 'Mensajes de contacto a recruiters',
        duration: '7 min',
        videoDuration: '3:50 min',
        completed: false,
        description:
          'Protocolo de contacto directo con selectores y Hiring Managers con tasa de respuesta superior al 40%.',
        takeaways: [
          'Distinción de destinatarios: Recruiter de RRHH (vacantes activas y perfil) vs. Hiring Manager (conversaciones de valor y proyectos).',
          'Fórmula de conexión en 4 pasos (< 300 caracteres): Saludo personalizado + Motivo claro + Especialidad en 1 línea + Cierre sin presión.',
          'Regla de oro: No adjuntar el CV en el primer mensaje; dejar que el perfil optimizado despierte la curiosidad del reclutador.',
        ],
        actionItems: [
          {
            id: 'act-lk-4-1',
            title: 'Identificar 3 decisores en empresas objetivo',
            description: 'Buscá reclutadores o líderes de área en las organizaciones que mapeaste en tu perfil.',
          },
          {
            id: 'act-lk-4-2',
            title: 'Enviar 3 solicitudes de conexión con nota',
            description: 'Redactá mensajes breves de menos de 300 caracteres aplicando la fórmula de 4 pasos.',
          },
        ],
        mindsetPrompt:
          'Un mensaje personalizado y sin presión no pide trabajo desesperadamente: abre una conversación profesional entre colegas.',
        resources: [],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ Mandar una solicitud de contacto vacía es desperdiciar el setenta por ciento del impacto de tu perfil.
🏷️ Error 1: Solicitud vacía sin nota personalizada ❌
🔊 Swoosh suave
🗣️ Pero mandar un testamento de cinco párrafos pegando tu CV es garantizar que te ignoren por parecer spam.
🏷️ Error 2: Mensajes abrumadores tipo spam ⚠️📄
🔊 Pop sutil
🖼️ Placa comparativa mostrando el mensaje vacío vs. el mensaje eterno de spam.
🗣️ En esta clase te voy a enseñar la fórmula del mensaje quirúrgico: cómo escribirle a reclutadores y líderes de área con notas breves que logren más del cuarenta por ciento de respuestas positivas.
🏷️ Fórmula: Mensajes Quirúrgicos con +40% de Respuesta 📩🎯
🔊 Pop de confirmación

[1:30 - SECCIÓN 2: DESARROLLO CONCEPTUAL — A QUIÉN ESCRIBIRLE Y FÓRMULA DE 4 PASOS]
🗣️ Lo primero que tenés que definir es a quién le vas a escribir: al recruiter de Recursos Humanos le hablás directamente sobre una vacante activa y tu afinidad con el puesto, mientras que al líder de área o Hiring Manager le escribís de profesional a profesional sobre los desafíos de su equipo.
🏷️ A quién escribirle: Recruiter (Vacante activa) vs. Hiring Manager (Negocio) 🏢👥
🔊 Swoosh suave
🖼️ Placa comparativa mostrando el enfoque para Recruiter vs. Líder de Área.
🗣️ Para escribir el mensaje de conexión vamos a aplicar una fórmula de cuatro pasos en menos de trescientos caracteres:
🗣️ Primero, un saludo personalizado usando siempre el nombre de pila de la persona.
🏷️ 1. Saludo Personalizado: Hola [Nombre] 👋
🔊 Click sutil
🗣️ Segundo, el motivo claro de contacto: mencionar que viste la vacante que abrieron o que seguís los proyectos de su área.
🏷️ 2. Motivo Real: Búsqueda abierta o interés genuino 💡
🔊 Click sutil
🗣️ Tercero, tu especialidad en una sola línea, destacando tus herramientas clave y tus años de experiencia.
🏷️ 3. Propuesta de Valor en 1 línea: Especialidad + Herramientas 🎯
🔊 Click sutil
🖼️ Captura flotante mostrando un mensaje real enviado con la nota personalizada en LinkedIn.
🗣️ Y cuarto, un cierre cordial sin presión, proponiendo sumar el contacto para estar comunicados.
🏷️ 4. Cierre Sin Fricción: Sumar contacto profesional 🤝
🔊 Click sutil
🗣️ Y te doy un consejo que puede darte más chances: jamás adjuntes tu CV en este primer contacto; dejá que tu perfil optimizado haga el trabajo de generar curiosidad para que sean ellos quienes te pidan el currículum.
🏷️ Consejo Clave: No enviar CV en el primer mensaje 🛡️📄
🔊 Pop de confirmación

[5:45 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Tu siguiente paso es buscar tres reclutadores o líderes de tus empresas objetivo en LinkedIn y enviarles una solicitud de conexión aplicando esta fórmula de cuatro pasos.
🏷️ Acción: Conectar con 3 Recruiters o Líderes Target 🎯👥
🔊 Swoosh suave
🖼️ Captura flotante mostrando la búsqueda de decisores en la barra de LinkedIn.
🗣️ En la próxima clase vamos a ver el cierre de este módulo: cómo interactuar estratégicamente con contenido en tu feed para que el algoritmo posicione tu perfil ante cientos de profesionales todas las semanas.
🏷️ Próxima clase: Estrategia de contenido y networking 🚀📈
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-lk-05',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-3',
        moduleNumber: 3,
        moduleTitle: 'Creación y mejora de LinkedIn',
        lessonNumber: 5,
        type: 'video',
        title: 'Estrategia de contenido y networking',
        duration: '6 min',
        completed: false,
        description:
          'Qué publicar para posicionarte como referente de tu sector, qué temas evitar y cómo hallar vacantes no listadas en LinkedIn Jobs.',
        takeaways: [
          'Publicar aprendizajes, análisis de industria y resúmenes de proyectos para activar el alcance orgánico.',
          'Evitar quejas de búsqueda laboral, discusiones políticas o contenido que no aporte valor profesional.',
          'Filtrar en el feed de publicaciones con operadores booleanos y hashtags como `#hiring` o `#contratando`.',
        ],
        resources: [
          {
            id: 'res-lk-05',
            title: 'Calendario de Ideas de Contenido para LinkedIn (Notion)',
            type: 'notion',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 3,
            category: 'Workspace Notion',
            description: 'Matriz con 12 ideas de posts profesionales para publicar 1 vez por semana.',
          },
        ],
        videoScript:
          `[0:00 - Introducción]\nEl 60% de las vacantes en LinkedIn nunca se publican en la pestaña de 'Empleos', sino en posts orgánicos de los propios directores de área.\n\n[1:20 - Desarrollo del concepto]\nNo necesitás ser influencer para tener visibilidad. Basta con interactuar con comentarios de valor en publicaciones de referentes de tu industria y compartir reflexiones sobre tu trabajo una vez por semana. Además, te enseño cómo filtrar en la barra de búsqueda por 'Publicaciones' recientes con hashtags como #contratando o #busquedalaboral para ser de los primeros en comentar y postularte.\n\n[4:50 - Llamada a la acción]\nHacé una búsqueda en el feed con los filtros avanzados y dejá tu primer comentario de valor hoy.`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // MÓDULO 4: DÓNDE BUSCAR OFERTAS (4 CLASES)
  // ---------------------------------------------------------------------------
  {
    id: 'exp-mod-4',
    programId: 'exp-busqueda-laboral',
    number: 4,
    title: 'Dónde buscar ofertas',
    tagline: 'Dominá el mapa de portales de empleo y descubrí vacantes ocultas antes que la competencia',
    totalDuration: '24 min · 4 clases',
    lessons: [
      {
        id: 'exp-dnd-01',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-4',
        moduleNumber: 4,
        moduleTitle: 'Dónde buscar ofertas',
        lessonNumber: 1,
        type: 'video',
        title: 'Portales de empleo y consultoras',
        duration: '6 min',
        completed: false,
        description:
          'Dónde buscar según tu perfil: bolsas masivas locales, plataformas internacionales de trabajo remoto en USD y consultoras.',
        takeaways: [
          'Portales locales (Indeed, Computrabajo, ZonaJobs, InfoJobs) vs. Portales de nicho y plataformas remotas en USD (Wellfound, RemoteOK, Torre).',
          'El ecosistema de consultoras de selección y agencias de headhunting especializadas por industria.',
          'Cómo configurar alertas por correo electrónico para recibir solo vacantes altamente compatibles.',
        ],
        resources: [
          {
            id: 'res-dnd-01',
            title: 'Directorio de 50+ Portales de Empleo y Consultoras (PDF)',
            type: 'pdf',
            fileSize: '450 KB',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 4,
            category: 'Directorio',
            description: 'Guía con enlaces directos a bolsas de empleo en Latam, España y plataformas remotas globales.',
          },
        ],
        videoScript:
          `[0:00 - Introducción]\nNo todos los portales sirven para todos los perfiles. Si buscás trabajo remoto internacional en Indeed local, estás perdiendo el tiempo.\n\n[1:15 - Desarrollo del concepto]\nOrganizamos las plataformas en 3 categorías: bolsas generales masivas, portales de nicho/remoto en moneda dura y consultoras de headhunting. Te muestro cuáles priorizar según tu nivel de experiencia y cómo crear alertas inteligentes por correo para no tener que revisar 10 sitios todos los días.\n\n[4:40 - Llamada a la acción]\nConfigurá 3 alertas de empleo automáticas en los portales seleccionados para tu perfil.`,
      },
      {
        id: 'exp-dnd-02',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-4',
        moduleNumber: 4,
        moduleTitle: 'Dónde buscar ofertas',
        lessonNumber: 2,
        type: 'video',
        title: 'Búsquedas avanzadas en Google y comunidades',
        duration: '7 min',
        completed: false,
        description:
          'Cómo utilizar comandos booleanos avanzados en Google para acceder a vacantes en portales ATS de empresas sin publicidad.',
        takeaways: [
          'Comandos clave: `site:greenhouse.io "puesto" "remote"`, `site:lever.co`, `site:workday.com`.',
          'Comunidades profesionales en Slack, Discord y grupos especializados donde se comparten búsquedas directas.',
          'Postularse cuando hay solo 5 candidatos compitiendo en lugar de 800 en un portal público.',
        ],
        resources: [
          {
            id: 'res-dnd-02',
            title: 'Comandos de Búsqueda Avanzada en Google (CheatSheet)',
            type: 'pdf',
            fileSize: '190 KB',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 4,
            category: 'Guía PDF',
            description: 'Plantilla de comandos booleanos listos para copiar y pegar en el buscador de Google.',
          },
        ],
        videoScript:
          `[0:00 - Introducción]\nLas mejores ofertas son las que casi nadie ve porque la empresa las publica directamente en su software interno y no paga por listarlas en portales masivos. Hoy te enseño a 'googlearlas' como un hacker de talento.\n\n[1:30 - Desarrollo del concepto]\nUsando operadores como site:, intitle: y comillas exactas en Google, podemos acceder a todas las vacantes activas cargadas en Greenhouse, Lever o Workday en tiempo real. Esto te permite postularte cuando hay solo 5 candidatos en lugar de competir contra 800 en un portal público.\n\n[5:30 - Llamada a la acción]\nProbá los 3 comandos de búsqueda que te dejo abajo y sumate a al menos 1 comunidad de Slack o Discord de tu especialidad.`,
      },
      {
        id: 'exp-dnd-03',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-4',
        moduleNumber: 4,
        moduleTitle: 'Dónde buscar ofertas',
        lessonNumber: 3,
        type: 'video',
        title: 'Cómo detectar búsquedas no publicadas',
        duration: '5 min',
        completed: false,
        description:
          'Señales tempranas de expansión que indican futuras contrataciones antes de que se publiquen avisos oficiales.',
        takeaways: [
          'Identificar rondas de inversión, apertura de mercados y nombramientos de directores en noticias de negocios.',
          'La postulación espontánea de alto valor enfocada en resolver el nuevo desafío de la empresa en crecimiento.',
          'Contacto directo con líderes de área cuando todavía no abrieron la búsqueda formal.',
        ],
        resources: [
          {
            id: 'res-dnd-03',
            title: 'Guía de Detección Temprana de Empresas en Expansión',
            type: 'pdf',
            fileSize: '230 KB',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 4,
            category: 'Guía PDF',
            description: 'Fuentes de noticias económicas y metodología para contactar directores en expansión.',
          },
        ],
        videoScript:
          `[0:00 - Introducción]\n¿Sabías que cuando una empresa anuncia que abrió operaciones en un nuevo país o levantó financiamiento, va a contratar decenas de personas en los siguientes 60 días? Podés llegar antes que nadie.\n\n[1:10 - Desarrollo del concepto]\nSeguir medios de noticias de negocios e industria te da ventaja competitiva. Cuando detectás una empresa en expansión, identificamos al líder del área en LinkedIn y le enviamos un mensaje de felicitación y presentación estratégica. Llegar antes de que publiquen el aviso formal elimina el 99% de tu competencia.\n\n[4:00 - Llamada a la acción]\nIdentificá 2 empresas de tu sector que hayan crecido recientemente y agregalas a tu lista de prospección.`,
      },
      {
        id: 'exp-dnd-04',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-4',
        moduleNumber: 4,
        moduleTitle: 'Dónde buscar ofertas',
        lessonNumber: 4,
        type: 'video',
        title: 'Investigación previa de empresa y cultura',
        duration: '6 min',
        completed: false,
        description:
          'Cómo evaluar la reputación, salud financiera, rotación de personal y bandas salariales antes de postularte.',
        takeaways: [
          'Auditoría en Glassdoor, Openqube y comentarios de colaboradores en LinkedIn.',
          'Analizar el tiempo de permanencia promedio de los empleados para detectar alertas de clima tóxico.',
          'Validar que la empresa comparta tus valores y pague tarifas acordes a tu expectativa antes de invertir tiempo.',
        ],
        resources: [
          {
            id: 'res-dnd-04',
            title: 'Checklist de Auditoría de Empresas y Clima Laboral',
            type: 'pdf',
            fileSize: '210 KB',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 4,
            category: 'Guía PDF',
            description: 'Plantilla de 5 pasos para investigar empresas antes de enviar tu postulación.',
          },
        ],
        videoScript:
          `[0:00 - Introducción]\nUna búsqueda laboral exitosa no es solo conseguir un trabajo; es conseguir un trabajo donde te paguen bien y no te arruinen la salud mental.\n\n[1:15 - Desarrollo del concepto]\nAntes de postularte a ciegas, dedicá 10 minutos a investigar: ¿Qué dicen los empleados actuales en Glassdoor? ¿Cuánto tiempo duran las personas en el equipo? ¿Cómo comunica la empresa en sus redes? Si la rotación es altísima y los comentarios apuntan a falta de liderazgo, esa información te sirve para descartar o para hacer preguntas clave en la entrevista.\n\n[4:45 - Llamada a la acción]\nElegí una empresa a la que te quieras postular y realizá la auditoría rápida de 4 pasos.`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // MÓDULO 5: POSTULACIÓN Y ORGANIZACIÓN (4 CLASES)
  // ---------------------------------------------------------------------------
  {
    id: 'exp-mod-5',
    programId: 'exp-busqueda-laboral',
    number: 5,
    title: 'Postulación y organización',
    tagline: 'Sistematizá tu seguimiento con el Tracker del campus, armá tu kit y gestioná recordatorios',
    totalDuration: '23 min · 4 clases',
    lessons: [
      {
        id: 'exp-pst-01',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-5',
        moduleNumber: 5,
        moduleTitle: 'Postulación y organización',
        lessonNumber: 1,
        type: 'video',
        title: 'Kit de postulación y cover letters',
        duration: '7 min',
        completed: false,
        description:
          'La combinación exacta de materiales según el canal: CV, Carta de Presentación concisa, Portfolio de proyectos y mensaje de acompañamiento.',
        takeaways: [
          'La Carta de Presentación de 3 párrafos: Gancho -> Por qué este proyecto -> Aporte concreto (no una copia de tu CV).',
          'Enlaces a portfolios y proyectos demostrativos para perfiles técnicos, creativos y de gestión.',
          'Estructura del correo de postulación profesional cuando enviás tu postulación directamente por email.',
        ],
        resources: [
          {
            id: 'res-pst-01',
            title: 'Plantillas de Carta de Presentación (Cover Letter)',
            type: 'word',
            fileSize: '160 KB',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 5,
            category: 'Guía PDF',
            description: 'Modelos en Word para roles junior, senior y postulaciones espontáneas.',
          },
        ],
        videoScript:
          `[0:00 - Introducción]\nEnviar solo un archivo adjunto sin texto en el cuerpo del mail es como tirar una botella al mar sin mensaje. Veamos qué tiene que contener tu kit de postulación profesional.\n\n[1:30 - Desarrollo del concepto]\nTu kit se compone de 3 piezas: tu CV adaptado, un mensaje de presentación directo de 3 párrafos (quién sos, por qué te entusiasma este proyecto puntual y qué logro relevante aportás) y, si aplica, un link a tu portfolio o casos de éxito. Te doy la estructura exacta para enviar por mail o por formularios web sin aburrir al selector.\n\n[5:30 - Llamada a la acción]\nArmá tu plantilla base de Carta de Presentación personalizada y tenela lista para usar.`,
      },
      {
        id: 'exp-pst-02',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-5',
        moduleNumber: 5,
        moduleTitle: 'Postulación y organización',
        lessonNumber: 2,
        type: 'video',
        title: 'Gestión de postulaciones con el Tracker',
        duration: '6 min',
        completed: false,
        description:
          'Cómo registrar cada oportunidad en el Tracker integrado de la plataforma y analizar tus métricas para saber qué ajustar.',
        takeaways: [
          'Registro metódico de postulaciones: Empresa, Puesto, Rango salarial, Fecha, Enlace y Estado.',
          'Interpretación del embudo: si mandás 20 y tenés 0 respuestas, ajustamos CV/Keywords; si te caes tras la 1ra entrevista, ajustamos pitch.',
          'Establecer recordatorios de seguimiento para no perder el hilo de ningún proceso en marcha.',
        ],
        resources: [
          {
            id: 'res-pst-02',
            title: 'Guía de Métricas y Conversión del Tracker',
            type: 'pdf',
            fileSize: '270 KB',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 5,
            category: 'Guía PDF',
            description: 'Esquema para interpretar tus ratios de conversión y optimizar cada etapa.',
          },
        ],
        videoScript:
          `[0:00 - Introducción]\nLo que no se mide, no se puede mejorar. Si no registrás tus postulaciones, no sabés en qué parte del embudo estás perdiendo oportunidades.\n\n[1:15 - Desarrollo del concepto]\nEn esta clase vemos cómo usar el Tracker integrado que tenés en la barra superior del campus. Cada vez que apliques a un puesto, lo cargás con su estado. Al cabo de 2 semanas, tus números te van a decir exactamente dónde ajustar sin adivinar: si necesitamos retocar el CV o si tenemos que entrenar la entrevista.\n\n[4:45 - Llamada a la acción]\nCargá tus primeras 3 postulaciones en el Tracker del campus para activar tu panel de métricas.`,
      },
      {
        id: 'exp-pst-03',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-5',
        moduleNumber: 5,
        moduleTitle: 'Postulación y organización',
        lessonNumber: 3,
        type: 'video',
        title: 'Estrategia de seguimiento (Follow-Up)',
        duration: '5 min',
        completed: false,
        description:
          'Tiempos recomendados para el seguimiento (5 a 7 días hábiles) y redacción de mensajes profesionales que reafirmen tu interés.',
        takeaways: [
          'Ventana ideal de recontacto: entre 5 y 7 días hábiles posteriores al envío o a la entrevista.',
          'Aportar valor en el seguimiento (compartir un dato o novedad) en vez de simplemente preguntar "¿hay novedades?".',
          'Saber cuándo soltar una búsqueda y redirigir el foco a nuevas oportunidades.',
        ],
        resources: [
          {
            id: 'res-pst-03',
            title: 'Plantillas de Mensajes de Seguimiento y Follow-Up',
            type: 'pdf',
            fileSize: '195 KB',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 5,
            category: 'Guía PDF',
            description: 'Guiones para dar seguimiento respetuoso tras postulaciones y entrevistas.',
          },
        ],
        videoScript:
          `[0:00 - Introducción]\n¿Hiciste una entrevista y pasaron 7 días en silencio? El 80% de la gente no hace nada por timidez. El 20% que hace un seguimiento elegante multiplica sus chances de avanzar.\n\n[1:10 - Desarrollo del concepto]\nEl selector está tapado de trabajo y a veces tu postulación quedó en pausa por una urgencia. Enviar un mail corto a los 5 días hábiles agradeciendo el tiempo y reafirmando tu interés demuestra proactividad y compromiso. Te muestro las 2 plantillas exactas que usamos para recontactar con cordialidad y profesionalismo.\n\n[4:00 - Llamada a la acción]\nRevisá tu Tracker: si tenés postulaciones de hace más de 6 días sin respuesta, enviá tu primer mensaje de seguimiento hoy.`,
      },
      {
        id: 'exp-pst-04',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-5',
        moduleNumber: 5,
        moduleTitle: 'Postulación y organización',
        lessonNumber: 4,
        type: 'video',
        title: 'Cómo detectar ofertas sospechosas',
        duration: '5 min',
        completed: false,
        description:
          'Identificación de alertas rojas para proteger tus datos personales, tu tiempo y tu seguridad financiera.',
        takeaways: [
          'Regla absoluta: ninguna empresa seria solicita dinero para exámenes, trámites ni compra de equipos.',
          'Alertas rojas: sueldos desproporcionados sin requisitos de experiencia previa, correos genéricos de empresas grandes.',
          'Cómo validar la legitimidad de un aviso a través del sitio web oficial y perfiles corporativos verificados.',
        ],
        resources: [
          {
            id: 'res-pst-04',
            title: 'Guía de Seguridad y Alertas Rojas en Búsquedas (PDF)',
            type: 'pdf',
            fileSize: '210 KB',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 5,
            category: 'Guía PDF',
            description: 'Lista de verificación de seguridad para blindar tus datos personales en internet.',
          },
        ],
        videoScript:
          `[0:00 - Introducción]\nEn internet hay personas malintencionadas que se aprovechan de la necesidad de quienes buscan empleo. Hoy aprendés a blindarte contra cualquier estafa.\n\n[1:00 - Desarrollo del concepto]\nRegla de oro número 1: ninguna empresa seria jamás te va a pedir dinero para comprar un software, pagar un trámite o iniciar un proceso de selección. Analizamos las señales de alerta típicas: mensajes directos por WhatsApp sin haberte postulado, ofertas de 5.000 dólares por 2 horas de trabajo y contrataciones inmediatas sin videollamada. Cuidá tu información y aprendé a reportar estos avisos.\n\n[3:50 - Llamada a la acción]\nGuardá esta guía de seguridad y avanzamos al Módulo 6 para dominar las entrevistas cara a cara.`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // MÓDULO 6: ENTREVISTA LABORAL (5 CLASES)
  // ---------------------------------------------------------------------------
  {
    id: 'exp-mod-6',
    programId: 'exp-busqueda-laboral',
    number: 6,
    title: 'Entrevista Laboral',
    tagline: 'Preparate para cada etapa, dominá el Método STAR y negociá tu salario con total seguridad',
    totalDuration: '36 min · 5 clases',
    lessons: [
      {
        id: 'exp-ent-01',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-6',
        moduleNumber: 6,
        moduleTitle: 'Entrevista Laboral',
        lessonNumber: 1,
        type: 'video',
        title: 'Fases de la entrevista y filtro inicial',
        duration: '7 min',
        completed: false,
        description:
          'Entendé las etapas de un proceso: screening telefónico, entrevista con RRHH, entrevista con Hiring Manager, prueba técnica y grupal.',
        takeaways: [
          'Screening telefónico (15 min): validación de datos, pretensión salarial y disponibilidad.',
          'Entrevista RRHH: motivación, encaje con la cultura del equipo y habilidades blandas.',
          'Entrevista con Hiring Manager (líder directo): resolución de problemas operativos, autonomía y visión técnica.',
          'Puesta a punto técnica: iluminación frontal, cámara a la altura de los ojos y audio sin ruidos.',
        ],
        resources: [
          {
            id: 'res-ent-01',
            title: 'Checklist de Preparación para Entrevistas Virtuales',
            type: 'pdf',
            fileSize: '220 KB',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 6,
            category: 'Guía PDF',
            description: 'Configuración técnica y de entorno para entrevistas remotas por Zoom o Google Meet.',
          },
        ],
        videoScript:
          `[0:00 - Introducción]\nNo podés responderle lo mismo a la persona de Recursos Humanos que al Director Técnico que será tu jefe. Cada uno busca cosas totalmente distintas.\n\n[1:30 - Desarrollo del concepto]\nEn esta clase desglosamos las 4 etapas clásicas de un proceso. RRHH evalúa si encajás con la cultura y el equipo; el Hiring Manager evalúa si podés hacer el trabajo y quitarle dolores de cabeza. Además, repasamos el protocolo de videollamada: mirar a la lente de la cámara (no a la pantalla), probar micrófono antes de entrar y cuidar el lenguaje no verbal.\n\n[5:30 - Llamada a la acción]\nHacé un simulacro de 2 minutos grabándote con la cámara de tu computadora para evaluar tu encuadre, iluminación y tono de voz.`,
      },
      {
        id: 'exp-ent-02',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-6',
        moduleNumber: 6,
        moduleTitle: 'Entrevista Laboral',
        lessonNumber: 2,
        type: 'video',
        title: 'El método STAR para contar tus logros',
        duration: '8 min',
        completed: false,
        description:
          'La técnica internacional para estructurar respuestas claras y contundentes a preguntas situacionales y de comportamiento.',
        takeaways: [
          'Estructura STAR: Situación (contexto breve), Tarea (el reto), Acción (lo que hiciste vos) y Resultado (impacto medible).',
          'El 70% del tiempo debe concentrarse en las Acciones concretas y en los Resultados obtenidos.',
          'Armar un banco de 5 historias maestras sobre liderazgo, resolución de conflictos, manejo de presión y errores superados.',
        ],
        resources: [
          {
            id: 'res-ent-02',
            title: 'Matriz STAR con 10 Ejemplos Resueltos (PDF)',
            type: 'pdf',
            fileSize: '380 KB',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 6,
            category: 'Guía PDF',
            description: 'Plantilla con historias reales estructuradas paso a paso con el método STAR.',
          },
        ],
        videoScript:
          `[0:00 - Introducción]\nCuando el selector te dice 'Contame una vez que tuviste un conflicto con un compañero', no quiere que improvises. Quiere ver tu capacity de resolución bajo la estructura STAR.\n\n[1:45 - Desarrollo del concepto]\nSTAR es el estándar internacional de evaluación por competencias. El 70% de tu tiempo de respuesta debe estar en la Acción (las decisiones que tomaste vos) y en el Resultado (cómo terminó la historia y qué aprendiste). Te muestro ejemplos reales de respuestas modelo para perfiles junior, intermedios y directivos.\n\n[6:30 - Llamada a la acción]\nEscribí 3 historias maestras usando la plantilla STAR que tenés en los materiales descargables.`,
      },
      {
        id: 'exp-ent-03',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-6',
        moduleNumber: 6,
        moduleTitle: 'Entrevista Laboral',
        lessonNumber: 3,
        type: 'video',
        title: 'Preguntas difíciles y puntos ciegos',
        duration: '8 min',
        completed: false,
        description:
          'Cómo sortear con éxito las preguntas difíciles: motivos de cambio, mayores debilidades y el pitch de diferenciación.',
        takeaways: [
          'Explicar motivos de cambio de trabajo enfocándose en crecimiento y nuevos retos, sin críticas a empresas anteriores.',
          'Responder a "debilidades" con un área de mejora real y las acciones concretas que estás implementando para superarla.',
          'Construir tu pitch de 60 segundos para responder a "¿Por qué deberíamos contratarte a vos?".',
        ],
        resources: [
          {
            id: 'res-ent-03',
            title: 'Guía de 30 Preguntas Frecuentes de Entrevistas Resueltas',
            type: 'pdf',
            fileSize: '510 KB',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 6,
            category: 'Guía PDF',
            description: 'Respuestas modelo y consejos tácticos para las preguntas más complejas.',
          },
        ],
        videoScript:
          `[0:00 - Introducción]\nDecir 'mi mayor defecto es que soy demasiado responsable y perfeccionista' hace que cualquier selector ponga los ojos en blanco. Hoy aprendemos a responder con madurez profesional y autenticidad.\n\n[1:40 - Desarrollo del concepto]\nAnalizamos las 5 preguntas más difíciles del mercado y cómo responderlas con altura. Si hablás de un cambio de empleo, enfocalo en tu deseo de crecimiento y nuevos desafíos, nunca en quejas sobre tu jefe anterior. Si hablás de un error, mostrá tu capacidad de asumir la responsabilidad y la solución que implementaste.\n\n[6:30 - Llamada a la acción]\nPrepará tu respuesta en voz alta a las 3 preguntas clave usando la guía de apoyo.`,
      },
      {
        id: 'exp-ent-04',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-6',
        moduleNumber: 6,
        moduleTitle: 'Entrevista Laboral',
        lessonNumber: 4,
        type: 'video',
        title: 'Preguntas inteligentes para el selector',
        duration: '6 min',
        completed: false,
        description:
          'Técnicas para calmar la ansiedad antes de conectar y preguntas de impacto para hacerle al entrevistador al final.',
        takeaways: [
          'Reencuadre mental: una entrevista es una conversación profesional de mutua evaluación, no un interrogatorio.',
          'Técnica de respiración diafragmática 4-4-4 para reducir pulsaciones antes de iniciar la videollamada.',
          'Preguntas de alto nivel para el selector: "¿Cuáles son las metas prioritarias de los primeros 90 días?" o "¿Qué retos enfrenta el equipo actualmente?".',
        ],
        resources: [
          {
            id: 'res-ent-04',
            title: 'Banco de 15 Preguntas Inteligentes para el Entrevistador',
            type: 'pdf',
            fileSize: '180 KB',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 6,
            category: 'Guía PDF',
            description: 'Preguntas estratégicas para hacer al recruiter y al Hiring Manager.',
          },
        ],
        videoScript:
          `[0:00 - Introducción]\nCuando el selector te pregunta '¿Tenés alguna duda para nosotros?' y vos decís 'No, ninguna, todo muy claro', perdiste la oportunidad de oro de lucirte.\n\n[1:20 - Desarrollo del concepto]\nHacer buenas preguntas demuestra seniority, curiosidad y criterio. Te enseño qué preguntar para entender la realidad del equipo, los objetivos del puesto y los próximos pasos del proceso. Además, vemos ejercicios de respiración de 3 minutos para bajar las pulsaciones antes de prender la cámara.\n\n[4:50 - Llamada a la acción]\nAnotá 3 preguntas que vas a hacerle al selector en tu próxima entrevista.`,
      },
      {
        id: 'exp-ent-05',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-6',
        moduleNumber: 6,
        moduleTitle: 'Entrevista Laboral',
        lessonNumber: 5,
        type: 'video',
        title: 'Técnicas de negociación salarial',
        duration: '7 min',
        completed: false,
        description:
          'Cómo manejar la pregunta de remuneración pretendida en la primera llamada y cómo negociar la propuesta final completa.',
        takeaways: [
          'Estrategia de banda salarial: responder con un rango basado en el mercado y preguntar por el presupuesto asignado.',
          'Negociación integral del paquete: salario base, bonos por desempeño, días de vacaciones extra, equipamiento y revisiones periódicas.',
          'Cómo aceptar o realizar una contrapropuesta por escrito manteniendo una relación excelente.',
        ],
        resources: [
          {
            id: 'res-ent-05',
            title: 'Calculadora de Banda Salarial y Script de Negociación',
            type: 'excel',
            fileSize: '175 KB',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 6,
            category: 'Matriz Excel',
            description: 'Herramienta para calcular tu piso salarial y plantilla de correo para negociar ofertas.',
          },
        ],
        videoScript:
          `[0:00 - Introducción]\nEl momento más incómodo para muchos es cuando preguntan por el sueldo. Hoy aprendés a manejar la conversación económica con total naturalidad y firmeza.\n\n[1:30 - Desarrollo del concepto]\nNunca des un número fijo cerrado en la primera charla; trabajamos siempre con rangos salariales basados en el mercado y decimos: 'Mi expectativa para una posición con estas responsabilidades se sitúa entre X e Y, dependiendo del paquete integral de beneficios y proyectos'. Y cuando llega la oferta formal por escrito, te enseño cómo evaluar el paquete completo y solicitar un ajuste de manera profesional.\n\n[5:45 - Llamada a la acción]\nDefiní tu banda salarial piso y objetivo con la calculadora del campus y practicá el guion de respuesta.`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // MÓDULO 7: CASOS ESPECIALES DE BÚSQUEDA (OPTATIVA) (3 CLASES)
  // ---------------------------------------------------------------------------
  {
    id: 'exp-mod-7',
    programId: 'exp-busqueda-laboral',
    number: 7,
    title: 'Casos especiales de Búsqueda (optativa)',
    tagline: 'Estrategias a medida para trabajo internacional, primer empleo y transición de carrera',
    totalDuration: '23 min · 3 clases',
    lessons: [
      {
        id: 'exp-esp-01',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-7',
        moduleNumber: 7,
        moduleTitle: 'Casos especiales de Búsqueda (optativa)',
        lessonNumber: 1,
        type: 'video',
        title: 'Búsqueda de empleo remoto internacional',
        duration: '8 min',
        completed: false,
        description:
          'Modalidades contractuales (Contractor, EOR), cobro en moneda extranjera y adaptación de perfil a estándares globales en inglés.',
        takeaways: [
          'Diferencias entre contratación directa como Contractor (B2B) vs. intermediación por Employer of Record (Deel, Remote, Oyster).',
          'Adaptación de CV y LinkedIn al estándar internacional en inglés sin foto y eliminando datos personales sensibles.',
          'Plataformas de cobro internacional, husos horarios y manejo de impuestos.',
        ],
        resources: [
          {
            id: 'res-esp-01',
            title: 'Plantilla CV Internacional en Inglés (Word .docx)',
            type: 'word',
            fileSize: '150 KB',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 7,
            category: 'Plantilla ATS',
            description: 'Modelo en inglés estándar adaptado para empresas de USA, Europa y mercado global.',
          },
        ],
        videoScript:
          `[0:00 - Introducción]\nTrabajar desde tu casa para una empresa de Estados Unidos o Europa cobrando en dólares o euros ya no es solo para programadores. Hoy profesionales de todas las áreas están exportando sus servicios.\n\n[1:30 - Desarrollo del concepto]\nAnalizamos las 3 formas contractuales para trabajar hacia el exterior: ser contratado a través de un Employer of Record como Deel o trabajar bajo modalidad Contractor con facturación internacional. Vemos cómo adaptar tu CV al formato estándar anglosajón, cómo validar tu nivel de inglés en la práctica y en qué portales postularte.\n\n[6:30 - Llamada a la acción]\nSi tu objetivo es el mercado internacional, creá tu versión de CV en formato estándar internacional.`,
      },
      {
        id: 'exp-esp-02',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-7',
        moduleNumber: 7,
        moduleTitle: 'Casos especiales de Búsqueda (optativa)',
        lessonNumber: 2,
        type: 'video',
        title: 'Cómo postularte sin experiencia previa',
        duration: '7 min',
        completed: false,
        description:
          'Estrategia de CV funcional, proyectos demostrativos y validación de habilidades para recién graduados o personas en su primer empleo.',
        takeaways: [
          'El CV funcional: destacar proyectos académicos, voluntariados, cursos técnicos y certificaciones.',
          'La estrategia del Proyecto Demostrativo: crear un caso práctico real para evidenciar tus competencias sin esperar un empleo previo.',
          'Compensar la falta de antigüedad con actitud, proactividad y sólida preparación técnica.',
        ],
        resources: [
          {
            id: 'res-esp-02',
            title: 'Guía y Plantilla para CV sin Experiencia Previa (PDF)',
            type: 'pdf',
            fileSize: '290 KB',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 7,
            category: 'Guía PDF',
            description: 'Estructura paso a paso para perfiles junior o recién egresados.',
          },
        ],
        videoScript:
          `[0:00 - Introducción]\nEl dilema de siempre: 'Me piden experiencia para trabajar, pero necesito trabajar para tener experiencia'. Rompamos ese círculo vicioso hoy.\n\n[1:20 - Desarrollo del concepto]\nCuando no tenés experiencia formal en empresas, tu experiencia son tus proyectos. Si estudiaste marketing, mostrá una campaña que hayas auditado; si estudiaste comercio exterior, mostrá un plan de exportación simulado; si estudiaste administración, armá un dashboard en Excel. El selector no solo busca años de antigüedad, busca evidencia de que sabés resolver problemas.\n\n[5:30 - Llamada a la acción]\nArmá un mini-caso práctico de 1 página que demuestre tu conocimiento en una herramienta clave de tu rubro.`,
      },
      {
        id: 'exp-esp-03',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-7',
        moduleNumber: 7,
        moduleTitle: 'Casos especiales de Búsqueda (optativa)',
        lessonNumber: 3,
        type: 'video',
        title: 'Transición y cambio de carrera',
        duration: '8 min',
        completed: false,
        description:
          'Cómo cambiar de rol o industria sin empezar desde cero, identificando tus competencias transferibles y armando una narrativa sólida.',
        takeaways: [
          'Mapear habilidades transferibles (gestión de proyectos, liderazgo, negociación, análisis y atención al cliente).',
          'Reescribir tu CV para que tus experiencias pasadas sean el trampolín natural hacia tu nueva especialidad.',
          'La narrativa de transición en la entrevista: defender el cambio como una ventaja competitiva única.',
        ],
        resources: [
          {
            id: 'res-esp-03',
            title: 'Matriz de Mapeo de Habilidades Transferibles (Excel)',
            type: 'excel',
            fileSize: '165 KB',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 7,
            category: 'Matriz Excel',
            description: 'Plantilla para identificar competencias puente entre industrias.',
          },
        ],
        videoScript:
          `[0:00 - Introducción]\nSi trabajaste 6 años en docencia o en atención al cliente y querés pasarte a Recursos Humanos o a Project Management, tus años anteriores no fueron tiempo perdido: son tu mayor diferencial.\n\n[1:40 - Desarrollo del concepto]\nLas empresas valoran la diversidad de perfiles si sabés justificar el puente entre tu carrera anterior y la nueva. Identificamos tus 'habilidades puente': capacidad analítica, resolución de conflictos, trabajo bajo presión y trato con clientes. Te enseño cómo redactar tu resumen profesional y cómo contar tu historia en la entrevista para que el cambio se perciba como una fortaleza única.\n\n[6:30 - Llamada a la acción]\nCompletá la matriz de habilidades transferibles y redactá tu pitch de transición en 3 frases.`,
      },
    ],
  },
];

// 2. CURSO: CV DE ALTO IMPACTO (CURSO INDIVIDUAL - SOLO AULA)
const cursoCvModules: CampusModule[] = [
  {
    id: 'curso-cv-mod-1',
    programId: 'curso-cv-alto-impacto',
    number: 1,
    title: 'Anatomía y Estructura del CV Moderno',
    tagline: 'Superá los filtros automáticos y atrapá al reclutador en 6 segundos',
    totalDuration: '2.5 horas',
    lessons: [
      {
        id: 'ccv-01',
        programId: 'curso-cv-alto-impacto',
        moduleId: 'curso-cv-mod-1',
        moduleNumber: 1,
        moduleTitle: 'Anatomía y Estructura del CV Moderno',
        lessonNumber: 1,
        type: 'video',
        title: 'Los 3 errores mortales que eliminan tu CV en 6 segundos',
        duration: '18 min',
        completed: true,
        description: 'Análisis de casos reales de CVs rechazados y la estructura ganadora en 1 columna.',
        takeaways: [
          'Por qué los gráficos de barras y las columnas dobles confunden a los ATS.',
          'Cómo escribir un encabezado limpio y profesional sin datos irrelevantes.',
        ],
        resources: [
          {
            id: 'ccv-res-1',
            title: 'Plantilla CV ATS Editorial (Word .docx)',
            type: 'word',
            fileSize: '145 KB',
            url: '#',
            programId: 'curso-cv-alto-impacto',
            programTitle: 'Curso: CV de Alto Impacto & ATS',
            moduleNumber: 1,
            category: 'Plantilla ATS',
            description: 'Plantilla formateada lista para completar.',
          },
        ],
      },
      {
        id: 'ccv-02',
        programId: 'curso-cv-alto-impacto',
        moduleId: 'curso-cv-mod-1',
        moduleNumber: 1,
        moduleTitle: 'Anatomía y Estructura del CV Moderno',
        lessonNumber: 2,
        type: 'video',
        title: 'Mapeo de palabras clave y superación de filtros ATS',
        duration: '22 min',
        completed: false,
        description: 'Cómo comparar la descripción de la vacante con tu CV usando herramientas de scoring.',
        takeaways: ['Identificación de hard skills prioritarias en ofertas laborales.'],
        resources: [],
      },
      {
        id: 'ccv-eval-1',
        programId: 'curso-cv-alto-impacto',
        moduleId: 'curso-cv-mod-1',
        moduleNumber: 1,
        moduleTitle: 'Anatomía y Estructura del CV Moderno',
        lessonNumber: 3,
        type: 'evaluacion',
        title: 'Evaluación Final: Módulo 01 · Fundamentos ATS',
        duration: '10 min',
        completed: false,
        description: 'Validá tus conocimientos sobre estructura y compatibilidad ATS.',
        takeaways: ['Se requiere 75% de respuestas correctas para aprobar.'],
        resources: [],
        quiz: {
          id: 'quiz-ccv-1',
          moduleId: 'curso-cv-mod-1',
          moduleNumber: 1,
          title: 'Evaluación Final: Fundamentos ATS',
          description: 'Validá tus conocimientos sobre estructura y compatibilidad ATS.',
          minPassingScore: 75,
          questions: [
            {
              id: 'q-ccv-1',
              question: '¿Qué formato de archivo es el más recomendado para enviar por portales corporativos?',
              options: [
                'Imagen JPG o PNG de alta resolución.',
                'Documento PDF exportado de texto plano editable o Word .docx.',
                'Presentación PowerPoint de 1 diapositiva.',
                'Enlace a Canva editable.',
              ],
              correctIndex: 1,
              explanation: 'El PDF con capas de texto seleccionables o el Word .docx permiten al parser del ATS leer el contenido sin errores.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'curso-cv-mod-2',
    programId: 'curso-cv-alto-impacto',
    number: 2,
    title: 'Redacción de Logros Cuantificables & Fórmulas de Impacto',
    tagline: 'De listas aburridas de tareas a métricas que demuestran tu valor',
    totalDuration: '2 horas',
    lessons: [
      {
        id: 'ccv-03',
        programId: 'curso-cv-alto-impacto',
        moduleId: 'curso-cv-mod-2',
        moduleNumber: 2,
        moduleTitle: 'Redacción de Logros Cuantificables',
        lessonNumber: 1,
        type: 'video',
        title: 'La fórmula [Acción + Contexto + Resultado Medible]',
        duration: '20 min',
        completed: false,
        description: 'Cómo cuantificar tu trabajo aunque no manejes números directos de ventas o finanzas.',
        takeaways: ['Uso de porcentajes de ahorro de tiempo, reducción de errores y satisfacción.'],
        resources: [],
      },
      {
        id: 'ccv-eval-2',
        programId: 'curso-cv-alto-impacto',
        moduleId: 'curso-cv-mod-2',
        moduleNumber: 2,
        moduleTitle: 'Redacción de Logros Cuantificables',
        lessonNumber: 2,
        type: 'evaluacion',
        title: 'Evaluación Final: Módulo 02 · Redacción de Logros',
        duration: '10 min',
        completed: false,
        description: 'Demostrá el dominio de la redacción de impacto profesional.',
        takeaways: ['Se requiere 75% para aprobar y certificar el curso.'],
        resources: [],
        quiz: {
          id: 'quiz-ccv-2',
          moduleId: 'curso-cv-mod-2',
          moduleNumber: 2,
          title: 'Evaluación Final: Redacción de Logros',
          description: 'Demostrá el dominio de la redacción de impacto profesional.',
          minPassingScore: 75,
          questions: [
            {
              id: 'q-ccv-2',
              question: '¿Cuál de las siguientes viñetas describe mejor un logro profesional?',
              options: [
                'Responsable de atender llamadas y responder consultas de clientes.',
                'Lideré la atención al cliente optimizando el tiempo de respuesta en un 35% y manteniendo un 98% de satisfacción.',
                'Hacía tareas administrativas y de soporte en la oficina.',
                'Encargado de tareas varias del área comercial.',
              ],
              correctIndex: 1,
              explanation: 'La opción B utiliza un verbo de acción activo ("Lideré"), contextualiza la función y aporta dos métricas verificables.',
            },
          ],
        },
      },
    ],
  },
];

// 3. CURSO: LINKEDIN ESTRATÉGICO (CURSO INDIVIDUAL - SOLO AULA)
const cursoLinkedinModules: CampusModule[] = [
  {
    id: 'curso-li-mod-1',
    programId: 'curso-linkedin-estrategico',
    number: 1,
    title: 'Optimización del Perfil de Alto Rendimiento',
    tagline: 'Posicioná tu perfil en los primeros resultados de búsqueda de recruiters',
    totalDuration: '3 horas',
    lessons: [
      {
        id: 'cli-01',
        programId: 'curso-linkedin-estrategico',
        moduleId: 'curso-li-mod-1',
        moduleNumber: 1,
        moduleTitle: 'Optimización del Perfil de Alto Rendimiento',
        lessonNumber: 1,
        type: 'video',
        title: 'Titular profesional magnético y sección Acerca de en primera persona',
        duration: '25 min',
        completed: true,
        description: 'Cómo estructurar el titular con palabras clave de búsqueda y tu propuesta de valor.',
        takeaways: ['La regla del Titular: [Rol] + [Especialidad] + [A quién ayudás] + [Keywords].'],
        resources: [],
      },
      {
        id: 'cli-eval-1',
        programId: 'curso-linkedin-estrategico',
        moduleId: 'curso-li-mod-1',
        moduleNumber: 1,
        moduleTitle: 'Optimización del Perfil de Alto Rendimiento',
        lessonNumber: 2,
        type: 'evaluacion',
        title: 'Evaluación Final: Módulo 01 · Perfil LinkedIn',
        duration: '10 min',
        completed: false,
        description: 'Evaluá tus conocimientos sobre el algoritmo y perfil de LinkedIn.',
        takeaways: ['Se requiere 75% para aprobar.'],
        resources: [],
        quiz: {
          id: 'quiz-cli-1',
          moduleId: 'curso-li-mod-1',
          moduleNumber: 1,
          title: 'Evaluación Final: Perfil LinkedIn',
          description: 'Evaluá tus conocimientos sobre el algoritmo y perfil de LinkedIn.',
          minPassingScore: 75,
          questions: [
            {
              id: 'q-cli-1',
              question: '¿Qué es lo primero que ve un reclutador en los resultados de búsqueda de LinkedIn?',
              options: [
                'La foto, el nombre y el Titular Profesional.',
                'La sección de recomendaciones de colegas.',
                'Los cursos completados en la secundaria.',
                'El número de seguidores.',
              ],
              correctIndex: 0,
              explanation: 'La foto, el nombre y el Titular Profesional son los tres elementos clave que determinan si el reclutador hace clic en tu perfil.',
            },
          ],
        },
      },
    ],
  },
];

// ALL PROGRAMS / COURSES ENROLLED ON CAMPUS
export const campusPrograms: CampusProgram[] = [
  {
    id: 'exp-busqueda-laboral',
    slug: 'experiencia-busqueda-laboral',
    type: 'experiencia',
    badge: 'Experiencia Integral',
    title: 'Experiencia Búsqueda Laboral',
    tagline: 'Programa integral con clases, tablero, tracker, agenda y Zooms semanales',
    hasTracker: true,
    hasZoom: true,
    modules: expBusquedaLaboralModules,
  },
  {
    id: 'curso-cv-alto-impacto',
    slug: 'cv-de-alto-impacto',
    type: 'curso',
    badge: 'Curso Individual',
    title: 'Curso: CV de Alto Impacto & ATS',
    tagline: 'Taller intensivo en video y plantillas para dominar filtros ATS',
    hasTracker: false,
    hasZoom: false,
    modules: cursoCvModules,
  },
  {
    id: 'curso-linkedin-estrategico',
    slug: 'linkedin-estrategico-y-marca-personal',
    type: 'curso',
    badge: 'Curso Individual',
    title: 'Curso: LinkedIn Estratégico',
    tagline: 'Posicionamiento en el algoritmo SSI y atracción de reclutadores',
    hasTracker: false,
    hasZoom: false,
    modules: cursoLinkedinModules,
  },
];

// CATALOGUE OF ALL AVAILABLE OFFERINGS (TO EXPLORE & ADD)
export interface CampusCatalogItem {
  id: string;
  slug: string;
  type: 'experiencia' | 'curso';
  badge: string;
  title: string;
  tagline: string;
  duration: string;
  price: string;
  rating: number;
  studentsCount: number;
  highlightPerk: string;
  publicUrl: string;
}

export const availableOfferingsCatalog: CampusCatalogItem[] = [
  {
    id: 'exp-busqueda-laboral',
    slug: 'experiencia-busqueda-laboral',
    type: 'experiencia',
    badge: 'Membresía Integral',
    title: 'Experiencia Búsqueda Laboral (Integral)',
    tagline: 'Acompañamiento completo con 5 módulos, Tracker de búsquedas, Agenda con Zoom semanal y diagnósticos.',
    duration: 'Acceso continuo · 18 horas',
    price: '$45.000 ARS / mes',
    rating: 4.9,
    studentsCount: 380,
    highlightPerk: 'Incluye Tracker, Agenda, Zoom semanal y revisión en vivo',
    publicUrl: '/experiencia',
  },
  {
    id: 'curso-cv-alto-impacto',
    slug: 'cv-de-alto-impacto',
    type: 'curso',
    badge: 'Curso Grabado',
    title: 'Taller Intensivo: CV de Alto Impacto & ATS',
    tagline: 'Aprendé la fórmula concreta para armar un CV profesional en 1 columna 100% compatible con ATS.',
    duration: '3 horas prácticas · 2 módulos',
    price: '$18.500 ARS',
    rating: 4.9,
    studentsCount: 520,
    highlightPerk: 'Incluye 4 plantillas editables Word y Notion',
    publicUrl: '/cursos/cv-de-alto-impacto',
  },
  {
    id: 'curso-linkedin-estrategico',
    slug: 'linkedin-estrategico-y-marca-personal',
    type: 'curso',
    badge: 'Curso Grabado',
    title: 'Curso: LinkedIn Estratégico & Marca Personal',
    tagline: 'Optimizá tu perfil estelar, aumentá tu Social Selling Index y prospectá reclutadores en frío.',
    duration: '4 horas prácticas · 3 módulos',
    price: '$22.000 ARS',
    rating: 4.8,
    studentsCount: 410,
    highlightPerk: 'Fórmulas de mensajes en frío y networking',
    publicUrl: '/cursos/linkedin-estrategico-y-marca-personal',
  },
  {
    id: 'curso-entrevistas-star',
    slug: 'simulacion-y-tecnicas-de-entrevista',
    type: 'curso',
    badge: 'Curso Grabado',
    title: 'Curso: Simulación & Técnicas de Entrevista Laboral',
    tagline: 'Dominá el método STAR, respondé preguntas trampa y negociá tu salario en moneda dura.',
    duration: '4 horas prácticas · 3 módulos',
    price: '$24.000 ARS',
    rating: 4.9,
    studentsCount: 340,
    highlightPerk: 'Simulaciones reales y guión de preguntas difíciles',
    publicUrl: '/cursos/simulacion-y-tecnicas-de-entrevista',
  },
  {
    id: 'curso-comex-operativa',
    slug: 'comercio-exterior-operativa-aduanera',
    type: 'curso',
    badge: 'Curso Profesional',
    title: 'Curso: Comercio Exterior & Operativa Aduanera',
    tagline: 'De la teoría a la práctica en importación, exportación, clasificación arancelaria y logística.',
    duration: '8 horas prácticas · 4 módulos',
    price: '$32.000 ARS',
    rating: 5.0,
    studentsCount: 210,
    highlightPerk: 'Casos reales de despachos aduaneros e Incoterms',
    publicUrl: '/cursos/comercio-exterior-operativa-aduanera',
  },
];

// FLAT RESOURCES LIST ACROSS ALL MODULES
export const campusResourcesVault: CampusResource[] = expBusquedaLaboralModules.flatMap(
  (mod) => mod.lessons.flatMap((l) => l.resources)
);

export const allCampusResources: CampusResource[] = campusResourcesVault;

