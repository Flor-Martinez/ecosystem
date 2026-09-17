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
// 1. EXPERIENCIA BÚSQUEDA LABORAL (8 MÓDULOS · 33 CLASES)
// =============================================================================
const expBusquedaLaboralModules: CampusModule[] = [
  // ---------------------------------------------------------------------------
  // MÓDULO 1: ¿CÓMO CONSEGUIR TU TRABAJO IDEAL? (4 CLASES)
  // ---------------------------------------------------------------------------
  {
    id: 'exp-mod-1',
    programId: 'exp-busqueda-laboral',
    number: 1,
    title: '¿Cómo conseguir tu trabajo ideal?',
    tagline: 'Autoconocimiento, método de 4 preguntas, límites no negociables y test vocacional',
    totalDuration: '24 min · 4 clases',
    lessons: [
      {
        id: 'exp-ide-01',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-1',
        moduleNumber: 1,
        moduleTitle: '¿Cómo conseguir tu trabajo ideal?',
        lessonNumber: 1,
        type: 'video',
        title: 'Introducción',
        duration: '4 min',
        videoDuration: '3:15 min',
        completed: true,
        description:
          'Presentación de Florencia Martínez, su trayectoria profesional y el enfoque 100% práctico de la Experiencia de Búsqueda Laboral.',
        takeaways: [
          'Trayectoria profesional: Licenciada en Comercio Internacional, Gerente de filial de multinacional y Máster en la Universidad de Barcelona.',
          'Doble perspectiva: La visión real de quien selecciona candidatos en empresas combinada con la experiencia propia de buscar empleo.',
          'Enfoque 100% práctico: Construir juntos un CV enfocado, LinkedIn optimizado, prospección de vacantes y preparación para entrevistas.',
        ],
        actionItems: [
          {
            id: 'act-intro-1',
            title: 'Recorrer el campus y configurar tu perfil',
            description: 'Explorá las herramientas, documentos y completá tus datos iniciales en Mi Perfil.',
          },
        ],
        mindsetPrompt:
          'La idea no es solamente mirar clases pasivamente: vamos a ir construyendo juntos tus herramientas de búsqueda.',
        resources: [],
        videoScript:
          `[0:00 - SECCIÓN 1: BIENVENIDA Y TRAYECTORIA]
🗣️ Hola a todos, soy Florencia Martínez y les doy la bienvenida a esta Experiencia de Búsqueda Laboral.
🏷️ Florencia Martínez · Experiencia Búsqueda Laboral 👋✨
🔊 Swoosh suave
🗣️ Antes de empezar quiero contarles brevemente quién soy.
🏷️ Quién soy 👤✨
🔊 Pop sutil
🗣️ Soy Licenciada en Comercio Internacional, actualmente soy Gerente de la oficina de Mendoza de una empresa multinacional de origen chino y recientemente terminé mi Máster en Dirección Comercial y Liderazgo Comercial en la Universidad de Barcelona.
🏷️ Lic. Comercio Internacional · Gerente Filial Multinacional · Máster UB 🎓🏢
🔊 Click sutil
🗣️ Además, a lo largo de mi carrera hice distintas capacitaciones en áreas como recursos humanos, optimización de perfiles en LinkedIn, logística minera, vinos, inglés, Excel y marketing digital.
🏷️ RRHH · LinkedIn · Logística · Vinos · Inglés · Excel · Marketing Digital 🌐🍷
🔊 Click sutil

[1:15 - SECCIÓN 2: LA PERSPECTIVA COMO RECLUTADORA Y CANDIDATA]
🗣️ Pero hoy quiero hablarles especialmente desde mi faceta como reclutadora.
🏷️ Mi Faceta como Reclutadora 👥🔍
🔊 Swoosh suave
🗣️ Como gerente, me ha tocado recibir currículums, entrevistar candidatos y seleccionar personas para formar parte de mis equipos. Entonces conozco qué pasa del otro lado: qué miramos en un CV, qué buscamos en un candidato y qué evaluamos en una entrevista.
🏷️ Qué miramos en un CV · Qué buscamos en un candidato · Entrevistas 📋🎯
🔊 Pop sutil
🗣️ Y también estuve del otro lado: yo también busqué trabajo, mandé currículums y pasé por procesos de selección.
🏷️ De ambos lados del proceso: Candidata y Reclutadora 🤝💡
🔊 Click sutil

[2:30 - SECCIÓN 3: ENFOQUE PRÁCTICO Y LLAMADA A LA ACCIÓN]
🗣️ Por eso armé este curso de una manera muy práctica.
🏷️ Un Curso 100% Práctico y Aplicable 🚀
🔊 Swoosh suave
🗣️ Quiero que cuando termines tengas un CV que realmente te sirva, un LinkedIn actualizado —o creado desde cero—, sepas cómo buscar oportunidades, cómo generar contactos y cómo prepararte para una entrevista.
🏷️ CV de Impacto · LinkedIn Optimizado · Oportunidades · Entrevistas ✨📄
🔊 Pop sutil
🗣️ La idea no es solamente mirar clases: quiero que vayamos haciendo todo juntos.
🏷️ ¡Hagámoslo juntos paso a paso! 🌟🤝
🔊 Pop de confirmación
🗣️ Arrancamos ahora mismo: en la siguiente clase te muestro las cuatro preguntas clave para descubrir y empezar a construir tu trabajo ideal.
🏷️ Próxima clase: El método para descubrir tu trabajo ideal 📝✨
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-ide-02',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-1',
        moduleNumber: 1,
        moduleTitle: '¿Cómo conseguir tu trabajo ideal?',
        lessonNumber: 2,
        type: 'video',
        title: 'El método para descubrir tu trabajo ideal',
        duration: '6 min',
        videoDuration: '3:45 min',
        completed: false,
        description:
          'Las 4 preguntas de autodiagnóstico para encontrar la intersección entre lo que sabés hacer, lo que te apasiona y las oportunidades del mercado.',
        takeaways: [
          'Las 4 preguntas guía: Qué sabés hacer hoy, qué disfrutás, cómo monetizarlo y qué brechas necesitás cerrar.',
          'El trabajo ideal se construye: Cruzar el puente de donde estás hoy a tu objetivo mediante una estrategia clara.',
          'Plan de acción paso a paso: Cada avance, por pequeño que sea, te acerca a tu meta profesional.',
        ],
        actionItems: [
          {
            id: 'act-ide-2-1',
            title: 'Responder las 4 preguntas en papel',
            description: 'Anotá qué sabés hacer, qué te gusta, cómo monetizarlo y qué te falta para llegar ahí.',
          },
        ],
        mindsetPrompt:
          'Tu trabajo ideal no aparece por casualidad: se construye con autoconocimiento, estrategia y constancia.',
        resources: [
          {
            id: 'guia-metodo-trabajo-ideal',
            title: 'Guía de las 4 Preguntas: Trabajo Ideal y Plan de Acción',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 1,
            category: 'Autoconocimiento',
            description: 'Plantilla de reflexión guiada para identificar tus habilidades, intereses y pasos para llegar a tu meta.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y LAS 4 PREGUNTAS]
🗣️ Muchos me dicen: "No sé qué hacer ni qué me gusta. Trabajo porque tengo que pagar las cuentas, o el alquiler".
🏷️ "Trabajo porque tengo que pagar las cuentas o el alquiler" 💭💬
🔊 Swoosh suave
🗣️ Si no sabés qué trabajo elegir, arrancá por el autoconocimiento: agarrá un lápiz y un papel y respondé las siguientes preguntas:
🏷️ Ejercicio de Autoconocimiento: 4 Preguntas Clave 📝✨
🔊 Pop sutil
🗣️ Primera: "¿En qué sos bueno hoy?". Es decir, lo que ya sabés hacer, tus habilidades y conocimientos adquiridos.
🏷️ 1. ¿En qué sos bueno hoy? (Lo que ya sabés hacer) 🧠💡
🔊 Click sutil
🗣️ Segunda: "¿Qué es lo que te gusta hacer?". Aquello con lo que disfrutás trabajar y te genera entusiasmo.
🏷️ 2. ¿Qué es lo que te gusta hacer? (Tus intereses y motivaciones) ❤️🎯
🔊 Click sutil
🗣️ Tercera: "¿Cómo podés ganar dinero con eso en lo que sos bueno y te gusta hacer?".
🏷️ 3. ¿Cómo monetizarlo? (Identificar tu trabajo ideal) 💼💵
🔊 Click sutil
🗣️ Ahí ya empezás a identificar cuál es tu trabajo ideal.
🏷️ Intersección: Habilidades + Pasión + Mercado 🌟
🔊 Pop sutil
🖼️ Gráfica flotante mostrando los círculos de Habilidad, Interés y Demanda laboral.
🗣️ Y cuarta: "¿Qué me falta para llegar ahí?". Experiencias, estudios, herramientas o contactos.
🏷️ 4. ¿Qué te falta para llegar ahí? (Experiencia · Cursos · Contactos) 📚🤝
🔊 Click sutil

[1:30 - SECCIÓN 2: DESARROLLO CONCEPTUAL — LA ESTRATEGIA Y LA CONSTRUCCIÓN]
🗣️ Hay un camino desde donde estás hoy hasta el trabajo que querés.
🏷️ El puente entre tu presente y tu trabajo ideal 🌉🚶‍♂️
🔊 Swoosh suave
🗣️ La mayoría se queda del primer lado; la diferencia entre los que avanzan y los que se quedan es tener una estrategia.
🏷️ La diferencia es tener una estrategia 🎯🛡️
🔊 Pop sutil
🗣️ Tu trabajo ideal no aparece: se construye.
🏷️ "Tu trabajo ideal no aparece: se construye" 🏗️✨
🔊 Pop de confirmación
🗣️ Y armá un plan de acción: cada paso, por más chico que sea, te va acercando hasta tu objetivo.
🏷️ Plan de Acción: Pasos concretos hacia tu meta 📋🚀
🔊 Click sutil

[3:45 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Tomate tu tiempo para bajar estas cuatro respuestas por escrito y armar ese plan de acción. No te vas a arrepentir.
🏷️ Acción: Responder las 4 preguntas y plan de acción ✍️📄
🔊 Pop sutil
🗣️ Ya tenemos la dirección general. Ahora toca afinar la puntería: delimitar tu target laboral exacto y qué condiciones vas a aceptar.
🏷️ Próximo paso: Definición de target y no negociables 🎯📋
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-ide-03',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-1',
        moduleNumber: 1,
        moduleTitle: '¿Cómo conseguir tu trabajo ideal?',
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
            title: 'Listar tus Empresas Objetivo',
            description: 'Anotá las organizaciones donde tu perfil resuelva un problema directo para iniciar tu prospección activa.',
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
🗣️ Hay una frase que escucho muchísimo cuando hablo con personas que están buscando trabajo: "Estoy buscando de lo que sea".
🏷️ Mito Común: "Estoy buscando de lo que sea" ❌
🔊 Error sutil
🗣️ Y aunque parezca que decir "de lo que sea" te abre más posibilidades, muchas veces genera exactamente lo contrario.
🏷️ "De lo que sea" cierra puertas en lugar de abrirlas ⚠️
🔊 Swoosh suave
🗣️ Porque si vos no sabés qué estás buscando, va a ser muy difícil armar un CV enfocado, optimizar tu LinkedIn, buscar las empresas correctas y, sobre todo, explicarle a un reclutador por qué sos una buena opción para determinado puesto.
🏷️ Foco: CV Enfocado · LinkedIn Optimizado · Empresas Correctas 🎯📄
🔊 Pop sutil
🗣️ Por eso, antes de empezar a postularnos, vamos a definir nuestro target laboral: en palabras simples, ¿a qué puestos queremos apuntar?
🏷️ Target Laboral: ¿A qué puestos queremos apuntar? 🧭💼
🔊 Pop de confirmación

[1:15 - SECCIÓN 2: DESARROLLO CONCEPTUAL — LOS 6 PUNTOS, NO NEGOCIABLES Y EMPRESAS OBJETIVO]
🗣️ Pensá en seis puntos: qué puesto buscás, en qué industria, qué nivel de seniority tenés, qué modalidad preferís, cuál es tu expectativa salarial y tu disponibilidad de incorporación.
🏷️ Los 6 Puntos: Puesto · Industria · Seniority · Modalidad · Salario · Disponibilidad 📋✨
🔊 Swoosh suave
🖼️ Gráfica flotante mostrando los 6 filtros del Target Laboral.
🗣️ En segundo lugar vamos a definir tus no negociables: aquellas condiciones que realmente necesitás para aceptar un trabajo.
🏷️ Límites No Negociables: Condiciones indispensables 🛑🛡️
🔊 Click sutil
🗣️ Puede ser un salario mínimo, determinada ubicación, horarios o modalidad.
🏷️ Ejemplos: Salario Mínimo · Ubicación · Horarios · Modalidad 💵📍
🔊 Click sutil
🗣️ Y por último, vamos a crear una lista de empresas objetivo.
🏷️ Lista de Empresas Objetivo 🏢🎯
🔊 Click sutil
🗣️ No quiero que dependas solamente de las vacantes que aparecen publicadas: quiero que identifiques empresas en las que realmente te gustaría trabajar.
🏷️ Prospección Activa: Empresas donde realmente querés trabajar 🚀🌟
🔊 Pop de confirmación

[6:20 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Tu siguiente paso es abrir la Matriz de Target que tenés en los Documentos de esta clase. Podés completar tus 6 filtros, tus no negociables y tus empresas objetivo directamente en la pantalla, y se guarda automáticamente en tu perfil.
🏷️ Documentos: Matriz de Target 📋
🔊 Pop sutil
🖼️ Video flotante mostrando cómo se completan los campos y el cartel de sincronización con "Mi Perfil".
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-ide-04',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-1',
        moduleNumber: 1,
        moduleTitle: '¿Cómo conseguir tu trabajo ideal?',
        lessonNumber: 4,
        type: 'video',
        title: 'Test vocacional: Descubrí tu perfil y afinidad laboral',
        duration: '6 min',
        videoDuration: '3:30 min',
        completed: false,
        description:
          'Por qué el test vocacional es una brújula clave de autoconocimiento y cómo realizar la evaluación interactiva en nuestra plataforma.',
        takeaways: [
          'Autoconocimiento objetivo: Evaluar intereses, estilos de trabajo y fortalezas para clarificar tu dirección profesional.',
          'Validación y nuevas posibilidades: Confirmar tu afinidad o descubrir roles y áreas que no habías considerado.',
          'Herramienta interactiva: Realizar el Test Vocacional integrado en el campus para obtener tu arquetipo y recomendaciones personalizadas.',
        ],
        actionItems: [
          {
            id: 'act-vocacional-1',
            title: 'Realizar el Test Vocacional en el campus',
            description: 'Completá la evaluación de 12 preguntas para descubrir tu arquetipo profesional y roles sugeridos.',
            linkText: 'Realizar Test Vocacional →',
            targetView: 'test-vocacional',
          },
        ],
        mindsetPrompt:
          'Conocerte a vos mismo es el primer paso para elegir un trabajo donde no solo rindas, sino donde realmente disfrutes lo que hacés.',
        resources: [],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y POR QUÉ ES ÚTIL EL TEST]
🗣️ Muchas veces nos cuesta definir qué rumbo tomar porque no nos detenemos a reflexionar sobre nuestras fortalezas, intereses y formas de trabajar.
🏷️ Autoconocimiento: La base de tu decisión profesional 🧭💡
🔊 Swoosh suave
🗣️ Y acá es donde un test vocacional se convierte en una herramienta muy útil.
🏷️ ¿Por qué es útil un Test Vocacional? 📊✨
🔊 Pop sutil
🗣️ No se trata de una prueba que te dice qué tenés que hacer de tu vida de forma rígida: es una brújula que te ayuda a ordenar tus preferencias, entender tus talentos naturales y validar si estás apuntando en la dirección correcta.
🏷️ Una brújula para ordenar intereses y talentos naturales 🧭🎯
🔊 Swoosh suave

[1:15 - SECCIÓN 2: BENEFICIOS Y CÓMO APROVECHAR EL RESULTADO]
🗣️ Un buen test vocacional te aporta tres beneficios fundamentales:
🗣️ Primero: te ayuda a identificar tus áreas de mayor afinidad, mostrándote en qué tipos de entornos, proyectos y tareas te sentís más cómodo.
🏷️ 1. Áreas de Mayor Afinidad: Entornos y tareas donde destacás 🏢🌿
🔊 Click sutil
🗣️ Segundo: te ayuda a descubrir o validar opciones de trabajo y roles que quizás no habías considerado, pero que encajan muy bien con tu personalidad profesional.
🏷️ 2. Descubrimiento de Roles: Opciones alineadas a tu perfil 💡📋
🔊 Click sutil
🗣️ Y tercero: te da claridad y confianza para encarar tu búsqueda con una propuesta mucho más sólida.
🏷️ 3. Claridad y Confianza: Enfoque seguro en tu postulación 🚀🛡️
🔊 Pop de confirmación
🖼️ Captura flotante mostrando la interfaz del Test Vocacional en el campus y el reporte de arquetipo resultante.
🗣️ En nuestra plataforma tenemos un Test Vocacional diseñado especialmente para acompañarte en este proceso. Si todavía no lo hiciste, debajo de este video te dejo un link para realizarlo.
🏷️ Link directo al Test Vocacional 🖥️⭐
🔊 Swoosh suave

[3:30 - SECCIÓN 3: CIERRE DE MÓDULO Y VISIÓN GLOBAL DEL PROGRAMA]
🗣️ Con esto cerramos el Módulo N°1: ya tenés claridad sobre quién sos, qué buscás y hacia dónde querés proyectar tu carrera.
🏷️ Hito: Módulo 01 Completado (¿Cómo conseguir tu trabajo ideal?) 🏆🌟
🔊 Pop de confirmación
🗣️ En los próximos módulos vamos a transformar esta claridad en oportunidades reales: vamos a entender la mentalidad del reclutador, armar tu CV de alto impacto, optimizar tu perfil de LinkedIn, encontrar vacantes estratégicas y prepararte para destacarte en cada una de tus entrevistas laborales.
🏷️ Ruta Completa: Mercado · CV · LinkedIn · Prospección · Entrevistas 🚀💼
🔊 Swoosh final de módulo`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // MÓDULO 2: ¿CÓMO FUNCIONA LA BÚSQUEDA LABORAL? (3 CLASES)
  // ---------------------------------------------------------------------------
  {
    id: 'exp-mod-2',
    programId: 'exp-busqueda-laboral',
    number: 2,
    title: '¿Cómo funciona la búsqueda laboral?',
    tagline: 'Comprendé el proceso de selección real, la mentalidad del reclutador y armá tu plan semanal',
    totalDuration: '18 min · 3 clases',
    lessons: [
      {
        id: 'exp-fun-01',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-2',
        moduleNumber: 2,
        moduleTitle: '¿Cómo funciona la búsqueda laboral?',
        lessonNumber: 1,
        type: 'video',
        title: 'La mentalidad del reclutador: ¿Por qué mandar 100 CVs no funciona?',
        duration: '6 min',
        videoDuration: '3:50 min',
        completed: false,
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
🗣️ Quiero empezar este módulo hablando de uno de los errores que más veo cuando una persona está buscando trabajo: mandar currículums de manera masiva.
🏷️ Error Común: Mandar currículums de manera masiva ⚠️📄
🔊 Swoosh suave
🗣️ Mandás 50, 100 currículums… y no te llama nadie. O recibís solamente esos mails automáticos que dicen que decidieron avanzar con otros candidatos.
🏷️ 50 - 100 postulaciones sin respuesta 📥🚫
🔊 Pop sutil
🖼️ Captura flotante mostrando bandeja de correo con mensajes automáticos de descarte.
🗣️ Y lo primero que empezás a pensar es: "¿Qué estoy haciendo mal? ¿Mi CV está mal? ¿No tengo suficiente experiencia?".
🏷️ "¿Qué estoy haciendo mal? ¿Mi CV está mal?" 💭❓
🔊 Swoosh suave
🗣️ Pero muchas veces el problema no sos vos: el problema es el método que estás utilizando para buscar trabajo.
🏷️ "El problema no sos vos: es el método" 💡🎯
🔊 Pop de confirmación
🗣️ Para entenderlo, primero tenemos que ponernos del otro lado: del lado del reclutador.
🏷️ La Perspectiva del Reclutador 👥🔍
🔊 Swoosh suave

[1:15 - SECCIÓN 2: DESARROLLO CONCEPTUAL — EL ESCANEO DE 6 SEGUNDOS]
🗣️ Una búsqueda laboral puede recibir cientos de postulaciones. El reclutador no tiene tiempo de sentarse a leer detenidamente cada currículum desde la primera hasta la última palabra.
🏷️ Cientos de postulaciones por vacante 📊👥
🔊 Swoosh suave
🗣️ Lo primero que hace es un escaneo muy rápido, de 6 segundos, para determinar si ese perfil puede encajar o no con la posición.
🏷️ La Regla de los 6 Segundos: Escaneo Visual Rápido ⏱️📄
🔊 Pop sutil
🖼️ Video flotante mostrando un CV real siendo escaneado en 6 segundos.
🗣️ Y en esos segundos hay tres cosas que tienen que quedar claras:
🗣️ Primero: qué sos o cuál es tu perfil profesional.
🏷️ 1. Perfil Profesional Claro: Quién sos y cuál es tu especialidad 👤🎯
🔊 Click sutil
🗣️ Segundo: si tu experiencia tiene relación con el puesto o con el rubro.
🏷️ 2. Experiencia Relacionada: Afinidad con el puesto y rubro 🏢💼
🔊 Click sutil
🗣️ Y tercero: qué resultados, conocimientos o logros concretos podés aportar.
🏷️ 3. Aporte Concreto: Resultados, conocimientos y logros 📈⭐
🔊 Click sutil
🗣️ Cuando mandás el mismo documento genérico a 100 avisos distintos, no encajás al 100% en ninguno. Lo que vamos a construir juntos acá es un perfil enfocado, con el objetivo de que consigas más y mejores entrevistas.
🏷️ Perfil Enfocado = Más y Mejores Entrevistas 🎯📈
🔊 Pop de confirmación

[4:20 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ A partir de este momento hacemos una pausa: dejamos de postular en masa y en piloto automático.
🏷️ Pausa: Dejar de postular en masa ⏸️
🔊 Click sutil
🗣️ Si ves ofertas que te interesan, guardalas en una lista o en el Tracker de nuestro campus, porque las vamos a encarar cuando tus materiales estén listos.
🏷️ Guardar vacantes en el Tracker 📋🖥️
🔊 Pop sutil
🖼️ Video/Captura flotante a la izquierda mostrando el Tracker de Postulaciones interactivo del campus.
🗣️ En la próxima clase vamos a ver cuánto tarda realmente una empresa desde que abre una búsqueda hasta que contrata, para que puedas llevar tu proceso con más calma y control.
🏷️ Próxima clase: Tiempos reales del proceso ⏱️
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-fun-02',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-2',
        moduleNumber: 2,
        moduleTitle: '¿Cómo funciona la búsqueda laboral?',
        lessonNumber: 2,
        type: 'video',
        title: 'Tiempos y fases reales de contratación',
        duration: '5 min',
        videoDuration: '4:15 min',
        completed: false,
        description:
          'Comprendé los tiempos reales que manejan las empresas, por qué ocurren los silencios y cómo gestionar tu búsqueda con calma y control.',
        takeaways: [
          'Duración estándar: Un proceso corporativo sano demora entre 20 y 60 días desde la publicación hasta la oferta.',
          'El circuito interno: Aprobaciones de presupuesto, agendas cruzadas y prioridades del negocio que causan silencios de 7 a 10 días.',
          'Foco y perseverancia: Mantener activa la rueda de postulaciones y entrevistas sin paralizarse a esperar una respuesta.',
        ],
        actionItems: [
          {
            id: 'act-2-1',
            title: 'Mapear tu colchón de tiempo',
            description: 'Calculá tus tiempos de búsqueda contemplando que un proceso saludable toma entre 20 y 60 días.',
          },
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
            moduleNumber: 2,
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
🗣️ Ahora, esto tampoco significa que vamos a quedarnos esperando indefinidamente una respuesta.
🏷️ No esperar indefinidamente una respuesta ⏳🚫
🔊 Swoosh suave
🗣️ Si tuviste una entrevista, hacé el seguimiento correspondiente.
🏷️ Hacer el seguimiento correspondiente 📩📅
🔊 Click sutil
🗣️ Pero continuá con tu búsqueda laboral.
🏷️ Continuar con tu búsqueda laboral en paralelo 🔄💼
🔊 Pop sutil
🗣️ No dejes de postularte porque una entrevista salió bien.
🏷️ No dejes de postularte por una buena entrevista ⚠️
🔊 Click sutil
🗣️ No rechaces otras entrevistas porque "seguramente quedaste".
🏷️ No rechaces otras entrevistas por suposiciones 🚫
🔊 Click sutil
🗣️ Y, sobre todo, no consideres que tenés un nuevo trabajo hasta que exista una propuesta concreta y hayas avanzado formalmente en la contratación.
🏷️ Propuesta concreta y contratación formal 📝🤝
🔊 Pop de confirmación
🗣️ Ahora que ya conocés los tiempos, toca organizarnos: en la siguiente clase vemos los 5 errores más comunes y cómo armar tu rutina semanal de búsqueda.
🏷️ Próxima clase: 5 errores típicos y plan semanal 📅⚠️
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-fun-03',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-2',
        moduleNumber: 2,
        moduleTitle: '¿Cómo funciona la búsqueda laboral?',
        lessonNumber: 3,
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
            moduleNumber: 2,
            category: 'Cronograma Operativo',
            description: 'Guía práctica para estructurar tu rutina semanal de búsqueda y seguimiento.',
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ Buscar trabajo también es un proyecto profesional.
🏷️ La búsqueda laboral como proyecto profesional 💼🎯
🔊 Swoosh suave
🗣️ Si entrás a los portales de empleo de vez en cuando, mandás algunos CV y después esperás resultados, probablemente la búsqueda se vuelva frustrante.
🏷️ Búsqueda intermitente = Frustración e incertidumbre ⚠️
🔊 Pop sutil
🗣️ La diferencia muchas veces no está en mandar más CV, sino en tener método, constancia y organización.
🏷️ Método · Constancia · Organización 📋✨
🔊 Pop de confirmación

[1:20 - SECCIÓN 2: DESARROLLO CONCEPTUAL — LOS 5 ERRORES Y EL PLAN SEMANAL]
🗣️ Hay cinco errores que quiero que evites:
🗣️ Primero: usar el mismo CV para todas las búsquedas. Tu CV tiene que estar orientado al puesto al que querés aplicar.
🏷️ 1. CV Genérico: Debe estar orientado al puesto 📄🎯
🔊 Click sutil
🗣️ Segundo: tener LinkedIn incompleto o sin palabras clave. LinkedIn también funciona como una herramienta para que los reclutadores puedan encontrarte.
🏷️ 2. LinkedIn Incompleto: Sin palabras clave para que te encuentren 🌐🔍
🗣️ Tercero: no llevar un registro de tus postulaciones. Necesitamos saber dónde postulamos, cuándo y en qué etapa estamos.
🏷️ 3. Sin Registro: Control de empresas, fechas y etapas 📊📁
🔊 Click sutil
🗣️ Cuarto: buscar trabajo solamente cuando tenemos ganas o estamos desesperados. La búsqueda necesita constancia.
🏷️ 4. Falta de Constancia: Buscar solo por impulsos ⚠️⏳
🔊 Click sutil
🗣️ Y quinto: postularte y simplemente esperar. También tenemos que hacer seguimiento y generar contactos estratégicos.
🏷️ 5. Pasividad: Falta de seguimiento y contactos estratégicos 📩🤝
🔊 Click sutil
🗣️ Por eso vamos a trabajar con un plan semanal: reservá determinados momentos de tu semana para buscar nuevas oportunidades, contactar empresas o personas y hacer seguimiento de procesos abiertos.
🏷️ Plan Semanal: Oportunidades · Contactos · Seguimiento 📅✅
🔊 Swoosh suave
🖼️ Captura flotante del Cronograma Semanal con los bloques de trabajo.
🗣️ No necesitás estar ocho horas por día buscando trabajo. Necesitás tener una rutina que puedas mantener.
🏷️ No son 8 horas diarias: es una rutina sostenible ⏱️💼
🔊 Pop de confirmación

[4:30 - SECCIÓN 3: CIERRE DE MÓDULO Y LLAMADA A LA ACCIÓN]
🗣️ A partir de ahora quiero que pienses tu búsqueda como un proceso: objetivo, estrategia, seguimiento y constancia.
🏷️ Tu Búsqueda como Proceso: Objetivo · Estrategia · Seguimiento · Constancia 🚀
🔊 Swoosh suave
🗣️ En los Documentos de esta clase tenés un cronograma ejemplo para que tu búsqueda avance de forma constante y medible.
🏷️ Documentos: Cronograma Semanal de Trabajo 📋📅
🔊 Pop sutil
🖼️ Captura flotante mostrando el documento del Cronograma Semanal en el campus.
🗣️ Completaste el módulo N°2. Ya entendemos cómo funciona el mercado y cómo organizarnos. En el Módulo N°3 nos metemos de lleno en tu herramienta de presentación: vamos a crear y optimizar tu CV juntos.
🏷️ Hito: Módulo 02 Completado (¿Cómo funciona la búsqueda laboral?) ✅🏆
🔊 Pop de confirmación
🏷️ Próximo: Módulo 03 — Creación y mejora de CV 📄✨
🔊 Fin de lección suave`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // MÓDULO 3: CREACIÓN Y MEJORA DE CV (5 CLASES)
  // ---------------------------------------------------------------------------
  {
    id: 'exp-mod-3',
    programId: 'exp-busqueda-laboral',
    number: 3,
    title: 'Creación y mejora de CV',
    tagline: 'Construí un currículum moderno, adaptado a filtros ATS y optimizado para el escaneo de 6 segundos',
    totalDuration: '38 min · 5 clases',
    lessons: [
      {
        id: 'exp-cv-01',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-3',
        moduleNumber: 3,
        moduleTitle: 'Creación y mejora de CV',
        lessonNumber: 1,
        type: 'video',
        title: '6 errores que arruinan tu CV',
        duration: '7 min',
        videoDuration: '3:50 min',
        completed: false,
        description:
          'Los 6 errores más frecuentes que provocan el descarte de tu postulación y cómo presentar un CV enfocado en conseguir entrevistas.',
        takeaways: [
          'El principio rector: Un buen CV no es el más largo, es el que consigue entrevistas (1 o máximo 2 páginas son suficientes).',
          'Los 6 errores fatales: Longitud excesiva, objetivo genérico, solo funciones pasivas, diseño recargado, faltas de ortografía y CV único sin adaptar.',
          'Propuesta de valor vs. tareas: Enfocar el currículum en lo que podés resolver y aportar en lugar de listas pasivas de obligaciones.',
        ],
        actionItems: [
          {
            id: 'act-cv-1-1',
            title: 'Auditar tu CV con el Checklist de los 6 Errores',
            description: 'Accedé a los Documentos de esta clase para verificar que tu currículum no contenga ninguno de los 6 fallos críticos.',
          },
          {
            id: 'act-cv-1-2',
            title: 'Limpiar elementos innecesarios',
            description: 'Eliminá datos obsoletos (DNI, estado civil, dirección completa) y barras o íconos que recarguen el diseño.',
          },
        ],
        mindsetPrompt:
          'Un buen CV no es el más largo ni el más decorado: es el que comunica con claridad y consigue entrevistas.',
        resources: [
          {
            id: 'checklist-6-errores-cv',
            title: 'Checklist: Los 6 Errores que Arruinan tu CV',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 3,
            category: 'Auditoría de CV',
            description: 'Lista de verificación interactiva para identificar y corregir los 6 errores más comunes en tu currículum.',
            isEssential: true,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y EL PRINCIPIO RECTOR]
🗣️ Cuando una postulación no recibe respuestas, lo primero que solemos pensar es que nos falta experiencia o que el mercado está difícil.
🏷️ "¿Por qué no me llaman? ¿Qué tiene mi CV?" 💭❓
🔊 Swoosh suave
🗣️ Pero muchas veces el problema está en pequeños errores en el currículum que hacen que el reclutador pase de largo en los primeros segundos.
🏷️ Pequeños errores que generan descartes automáticos ⚠️📄
🔊 Pop sutil
🗣️ Antes de empezar a escribir, quiero que grabes este principio: un buen CV no es el más largo. Es el que consigue entrevistas.
🏷️ "Un buen CV no es el más largo: es el que consigue entrevistas" 🎯⭐
🔊 Pop de confirmación

[1:15 - SECCIÓN 2: DESARROLLO CONCEPTUAL — LOS 6 ERRORES QUE ARRUINAN TU CV]
🗣️ Hay seis errores muy comunes que quiero que evites por completo:
🗣️ Primero: el CV demasiado largo. Más páginas no significa un mejor currículum: una o dos páginas son más que suficientes para mostrar tu trayectoria con poder de síntesis.
🏷️ 1. CV Demasiado Largo: 1 o 2 páginas son suficientes 📄⏳
🔊 Click sutil
🗣️ Segundo: el objetivo genérico. Frases como "Busco crecer profesionalmente en una empresa líder" no dicen nada; en su lugar, mostrá tu perfil y tu propuesta de valor concreta.
🏷️ 2. Objetivo Genérico ❌ -> Mostrá tu Propuesta de Valor ✔️ 💡
🔊 Click sutil
🗣️ Tercero: solo describir funciones. No te limites a contar tareas u obligaciones pasivas: destacá logros, mejoras y resultados que hayas obtenido.
🏷️ 3. Solo Funciones ❌ -> Destacá Logros y Resultados ✔️ 📈
🔊 Click sutil
🗣️ Cuarto: diseño recargado. Llenar el documento de muchos colores, gráficos o barras de porcentaje de habilidades dificulta la lectura: priorizá un diseño simple, limpio y profesional.
🏷️ 4. Diseño Recargado ❌ -> Diseño Simple y Profesional ✔️ 📐
🔊 Click sutil
🗣️ Quinto: errores de ortografía y fechas inconsistentes. Un solo error de redacción o fechas contradictorias puede transmitirte falta de atención al detalle y descartarte.
🏷️ 5. Errores de Ortografía y Fechas: Revisá antes de enviar ✍️🔍
🔊 Click sutil
🗣️ Y sexto: tener un solo CV para todas las búsquedas. Mandar el mismo archivo idéntico a todas las postulaciones reduce tus posibilidades: la clave es tener un CV base y adaptarlo a cada oportunidad.
🏷️ 6. Mismo CV para Todo ❌ -> Adaptalo a cada oportunidad ✔️ 🎯
🔊 Pop de confirmación
🖼️ Placa flotante resumiendo los 6 errores vs. las 6 soluciones profesionales.

[4:45 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ En los Documentos de esta clase tenés el Checklist interactivo con los seis errores para revisar tu currículum punto por punto.
🏷️ Documentos: Checklist de los 6 Errores del CV 📋📥
🔊 Pop sutil
🗣️ ¿Sabías que antes de una persona, tu CV lo lee un sistema? En el siguiente video te enseño qué son los filtros ATS y cómo destacar frente al algoritmo.
🏷️ Próxima clase: Filtros ATS y cómo destacar frente al algoritmo 🤖🎯
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-cv-02',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-3',
        moduleNumber: 3,
        moduleTitle: 'Creación y mejora de CV',
        lessonNumber: 2,
        type: 'video',
        title: 'Filtros ATS: Cómo hacer match con el aviso laboral',
        duration: '7 min',
        videoDuration: '3:55 min',
        completed: false,
        description:
          'Qué son los sistemas ATS, cómo escanean las palabras clave y el método en 3 pasos para hacer coincidir tu CV con los requisitos de la vacante.',
        takeaways: [
          'Qué es un ATS: Sistemas automáticos que usan las empresas para escanear y filtrar CVs buscando palabras clave antes de la revisión humana.',
          'Idea clave: El ATS no entiende como una persona; busca coincidencias de palabras clave exactas.',
          'Método del MATCH en 3 pasos: Leé el anuncio, identificá y usá esas palabras en tu perfil, y aumentá tus posibilidades de pasar el filtro.',
          'Regla ética innegociable: Adaptar un CV no significa inventar; significa destacar de tu experiencia real aquello que es más relevante.',
        ],
        actionItems: [
          {
            id: 'act-cv-2-1',
            title: 'Mapear las palabras clave de 3 avisos',
            description: 'Compará 3 ofertas laborales similares e identificá los requisitos técnicos y herramientas que más se repiten.',
          },
          {
            id: 'act-cv-2-2',
            title: 'Incorporar keywords en tu borrador',
            description: 'Volcá de forma natural las herramientas y conocimientos que realmente poseés en tu perfil y experiencia.',
          },
        ],
        mindsetPrompt:
          'El ATS no entiende como una persona: busca palabras clave. Hablar el dialecto exacto de la vacante es lo que te abre la puerta a la entrevista.',
        resources: [
          {
            id: 'guia-mapeo-keywords-industria',
            title: 'Guía de Mapeo de Palabras Clave y Variantes de CV',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 3,
            category: 'Matriz de Keywords',
            description: 'Matriz interactiva con las palabras clave, herramientas y certificaciones más demandadas en el mercado.',
            isEssential: true,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN — ¿QUÉ SON LOS FILTROS ATS?]
🗣️ Muchas veces enviamos nuestro currículum a través de portales o sitios corporativos y sentimos que cae en un agujero negro.
🏷️ El filtro previo al reclutador humano 🤖📄
🔊 Swoosh suave
🗣️ Esto sucede porque la mayoría de las medianas y grandes empresas utilizan sistemas ATS: softwares que escanean y filtran los CVs buscando palabras clave antes de que los vea una persona.
🏷️ ¿Qué son los Filtros ATS? Sistemas de escaneo previo 🔍⚙️
🔊 Pop sutil
🗣️ La idea clave que tenés que entender es que el ATS no lee ni interpreta como un ser humano: solo busca coincidencias directas de palabras clave.
🏷️ "El ATS no entiende como una persona: busca coincidencias" 💡
🔊 Pop de confirmación

[1:15 - SECCIÓN 2: DESARROLLO CONCEPTUAL — CÓMO HACER MATCH EN 3 PASOS]
🗣️ ¿Cómo hacemos match para que tu CV pase el filtro y llegue a manos del reclutador?
🗣️ Paso 1: Leé el anuncio con atención e identificá los requisitos obligatorios y las palabras clave principales.
🏷️ Paso 1: Leé el Anuncio (Herramientas · Conocimientos · Requisitos) 📖🔍
🔊 Click sutil
🗣️ Por ejemplo, si un aviso para Analista de Marketing Digital menciona Google Analytics, Google Ads, Meta Ads, SEO, Excel avanzado y Análisis de datos, esas son las palabras clave prioritarias.
🏷️ Ejemplo de Keywords: Google Analytics · Meta Ads · SEO · Excel 📊✨
🔊 Click sutil
🖼️ Captura flotante mostrando el anuncio de marketing con los requisitos resaltados vs. la lista de keywords del aviso.
🗣️ Paso 2: Identificá cuáles de esas competencias tenés realmente e incorporalas de forma natural en tu perfil profesional, en tus habilidades y en la descripción de tu experiencia.
🏷️ Paso 2: Usá esas palabras de forma natural en tu CV ✍️🎯
🔊 Click sutil
🗣️ Y Paso 3: Más match, más posibilidades: cuantas más coincidencias reales tenga tu CV con el anuncio, más alto vas a posicionar en el sistema y más chances tenés de pasar al screening telefónico.
🏷️ Paso 3: Más Match = Más Posibilidades de Entrevista 🚀📈
🔊 Pop de confirmación
🗣️ Una técnica muy simple es comparar tres avisos similares al puesto que buscás: fijate qué requisitos se repiten, porque esas palabras te muestran exactamente qué está buscando el mercado.
🏷️ Técnica de los 3 Avisos: Patrones que busca el mercado 📋🔍
🔊 Swoosh suave
🗣️ Importante: nunca agregues conocimientos o herramientas que no tengas. Adaptar un CV no significa inventar; significa destacar estratégicamente lo que es más relevante para esa vacante.
🏷️ Regla Innegociable: Adaptar no es inventar, es priorizar lo relevante 🛡️✅
🔊 Pop de confirmación

[4:40 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ En los Documentos de esta clase tenés la Guía de Mapeo de Palabras Clave para clasificar los términos de tu área y aplicarlos a tu perfil.
🏷️ Documentos: Guía de Mapeo de Palabras Clave 📥📊
🔊 Pop sutil
🗣️ Una vez que termines, pasamos a la siguiente clase para ver cómo armar tu CV según tus años de trayectoria: junior, experiencia media o senior.
🏷️ Próxima clase: El CV según tu perfil (Junior, Mid o Senior) 🧭💼
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-cv-03',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-3',
        moduleNumber: 3,
        moduleTitle: 'Creación y mejora de CV',
        lessonNumber: 3,
        type: 'video',
        title: 'El CV según tu perfil: Junior, Experiencia Media y Senior',
        duration: '8 min',
        videoDuration: '4:15 min',
        completed: false,
        description:
          'Cómo estructurar la jerarquía, el foco y los bloques de tu currículum según tu nivel de trayectoria: sin experiencia previa, 3 a 10 años o perfiles senior.',
        takeaways: [
          'No existe un CV universal: El CV debe reflejar dónde estás hoy y hacia dónde querés proyectar tu carrera.',
          'Perfil 1 (Sin experiencia / Junior): Foco en formación académica, proyectos, voluntariados, habilidades y ganas de aprender.',
          'Perfil 2 (Experiencia media 3 a 10 años): Foco en crecimiento profesional, evolución de puestos, logros medibles y valor agregado.',
          'Perfil 3 (Senior +10 años / Liderazgo): Foco en logros de alto impacto, liderazgo de equipos, proyectos clave y visión estratégica.',
        ],
        actionItems: [
          {
            id: 'act-cv-3-1',
            title: 'Identificar tu nivel de perfil y enfoque',
            description: 'Determiná si tu postulación se apoya en formación inicial, crecimiento comprobado o liderazgo senior.',
          },
          {
            id: 'act-cv-3-2',
            title: 'Consultar la Guía de Estructura según Seniority',
            description: 'Revisá la jerarquía de secciones sugerida en los Documentos de la clase para ordenar tus bloques.',
          },
        ],
        mindsetPrompt:
          'Tu antigüedad no te define: lo que te posiciona es cómo contás tu evolución y los resultados que aportás al equipo.',
        resources: [
          {
            id: 'guia-cv-segun-perfil',
            title: 'Guía: El CV según tu Perfil y Momento de Carrera',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 3,
            category: 'Estrategia y Posicionamiento',
            description: 'Matriz interactiva con la jerarquía y enfoque recomendado según tus años de experiencia.',
            isEssential: true,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN — NO EXISTE UN CV UNIVERSAL]
🗣️ Uno de los mayores errores es creer que hay un único modelo de CV que le sirve a todo el mundo por igual.
🏷️ Mito: "Hay un formato universal para todos" ❌
🔊 Swoosh suave
🗣️ No existe un CV universal. El currículum debe adaptarse al momento exacto de tu carrera: debe reflejar con claridad dónde estás hoy y hacia dónde querés ir.
🏷️ "El CV debe reflejar dónde estás hoy y hacia dónde querés ir" 🧭✨
🔊 Pop de confirmación

[1:20 - SECCIÓN 2: DESARROLLO CONCEPTUAL — LOS 3 PERFILES PROFESIONALES]
🗣️ Vamos a analizar tres perfiles y cómo estructurar la información en cada caso:
🗣️ Perfil 1: Si no tenés experiencia formal o contás con poca experiencia laboral.
🏷️ Perfil 1: Sin Experiencia o Poca Experiencia (Junior) 🎓🌱
🔊 Swoosh suave
🗣️ En este caso tu fortaleza está en la Formación: destacá proyectos académicos, cursos, certificaciones y talleres prácticos.
🏷️ Formación: Proyectos Académicos · Cursos · Certificaciones 📚
🔊 Click sutil
🗣️ En Experiencia, sumá voluntariados, pasantías o actividades extracurriculares. Y resaltá tus habilidades técnicas, idiomas y herramientas.
🏷️ Experiencia Inicial: Voluntariados · Pasantías · Habilidades 🛠️🌐
🔊 Click sutil
🗣️ Tu enfoque principal debe ser mostrar tu potencial, tu iniciativa y tus ganas de aprender.
🏷️ Enfoque Junior: Mostrar Potencial y Ganas de Aprender 🌟🚀
🔊 Pop sutil
🗣️ Perfil 2: Si tenés experiencia media, entre tres y diez años de trayectoria.
🏷️ Perfil 2: Experiencia Media (3 a 10 años · Semi-Senior) 💼📈
🔊 Swoosh suave
🗣️ Acá el foco está en el Crecimiento: mostrá cómo evolucionaste profesionalmente y asumiste mayores responsabilidades.
🏷️ Crecimiento: Evolución profesional y mayores desafíos 📊
🔊 Click sutil
🗣️ Destacá logros y resultados concretos con números, y personalizá el CV para cada búsqueda. Tu enfoque es demostrar el valor que podés aportar desde el día uno.
🏷️ Enfoque Semi-Senior: Logros Concretos y Aporte de Valor 🎯⭐
🔊 Pop sutil
🗣️ Y Perfil 3: Si sos un perfil Senior, con más de diez años de trayectoria o roles de liderazgo.
🏷️ Perfil 3: Senior (+10 años de experiencia · Liderazgo) 👔👑
🔊 Swoosh suave
🗣️ Priorizá tus logros más importantes y de mayor impacto en el negocio. Resaltá tu capacidad para liderar equipos, gestionar proyectos de envergadura y tomar decisiones estratégicas.
🏷️ Liderazgo e Impacto: Equipos · Proyectos · Decisiones Estratégicas 🏆
🔊 Click sutil
🗣️ Tu enfoque debe transmitir experiencia consolidada, autoridad profesional y total confianza.
🏷️ Enfoque Senior: Autoridad, Solvencia y Confianza 🛡️💼
🔊 Pop de confirmación
🖼️ Placa interactiva mostrando las 3 columnas de perfiles y sus bloques destacados.
🗣️ Recordá que en todos los casos la regla de oro se mantiene: no existe el CV perfecto, existe un CV adaptado al puesto al que querés postularte.
🏷️ Regla Clave: CV Adaptado al Puesto Target 🎯✨
🔊 Pop sutil

[5:10 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Revisá en qué perfil te encontrás hoy y consultá la Guía de Estructura según Seniority en los Documentos de la clase.
🏷️ Documentos: Guía de CV según tu Perfil 📥📋
🔊 Pop sutil
🗣️ Ahora que ya sabés qué destacar, pasemos a la práctica: en la siguiente clase armamos tus datos de contacto, la foto profesional y tu perfil paso a paso.
🏷️ Próxima clase: Hagamos el CV juntos: Secciones y foto 📸📄
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-cv-04',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-3',
        moduleNumber: 3,
        moduleTitle: 'Creación y mejora de CV',
        lessonNumber: 4,
        type: 'video',
        title: 'Hagamos el CV juntos: Secciones y foto profesional',
        duration: '9 min',
        videoDuration: '4:45 min',
        completed: false,
        description:
          'Construcción paso a paso de cada bloque del currículum: datos de contacto indispensables, foto adecuada vs. errores de imagen, perfil profesional, educación y habilidades.',
        takeaways: [
          'Estructura integral paso a paso: Datos de contacto, perfil profesional, educación, habilidades e idiomas.',
          'Datos indispensables del encabezado: Nombre completo destacado, titular/posición profesional clara, teléfono con código de área, mail profesional y LinkedIn.',
          'Criterios de la foto profesional: Cuándo suma (cercanía, credibilidad, confianza) y qué errores evitar (selfies, escotes, mala luz, fondos distractores).',
          'Perfil profesional de alto impacto: Resumen de 3 a 4 líneas que sintetiza quién sos, tu especialidad y el valor concreto que aportás.',
        ],
        actionItems: [
          {
            id: 'act-cv-4-1',
            title: 'Descargar la Plantilla Oficial de CV',
            description: 'Accedé a los Documentos de esta clase para descargar tu plantilla base en formato Word (.docx) o duplicarla en Notion.',
          },
          {
            id: 'act-cv-4-2',
            title: 'Completar encabezado, foto y perfil profesional',
            description: 'Volcá tus datos actualizados, elegí una foto profesional adecuada y redactá tu resumen de 3-4 líneas.',
          },
        ],
        mindsetPrompt:
          'Cada sección de tu CV cuenta: la claridad y el orden visual generan una primera impresión de confianza inmediata.',
        resources: [
          {
            id: 'plantilla-estructura-cv-editorial',
            title: 'Plantilla CV ATS Editorial (Word .docx)',
            type: 'word',
            fileSize: '145 KB',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 3,
            category: 'Plantilla ATS',
            description: 'Modelo profesional en Word formateado en 1 columna optimizado para lectura visual y filtros ATS.',
            isEssential: true,
          },
          {
            id: 'plantilla-cv-minimalista-notion',
            title: 'Plantilla CV Minimalista en Notion',
            type: 'notion',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 3,
            category: 'Workspace Notion',
            description: 'Estructura modular editable en Notion lista para exportar a PDF limpio.',
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: HAGAMOS EL CV JUNTOS — METODOLOGÍA PASO A PASO]
🗣️ Ahora que ya conocemos los errores y cómo enfocar nuestro perfil, vamos a construir tu currículum juntos: paso a paso, de manera práctica y 100% profesional.
🏷️ Hagamos el CV Juntos: Paso a Paso · Práctico · Profesional 🛠️📄
🔊 Swoosh suave
🗣️ Cada sección de tu documento cuenta: vamos a asegurarnos de que muestre tu mejor versión en una sola página.
🏷️ ¡Vos podés! Tu próximo trabajo empieza con un gran CV 🚀✨
🔊 Pop de confirmación

[1:15 - SECCIÓN 2: DESARROLLO CONCEPTUAL — SECCIONES Y CRITERIOS DE FOTO]
🗣️ Empecemos por la parte superior: tus datos personales y de contacto.
🗣️ Esta información debe ser clara, completa y estar siempre al inicio de tu CV.
🏷️ Paso 1: Datos Personales y de Contacto 📇✨
🔊 Swoosh suave
🗣️ Tu nombre completo debe destacar en tipografía más grande y ser muy fácil de encontrar.
🏷️ Nombre Completo: Destacado y Visible 👤
🔊 Click sutil
🗣️ Justo debajo colocá tu posición profesional o titular: indicá tu especialidad o el puesto exacto al que aplicás, por ejemplo: "Analista Administrativa" o "Especialista en Marketing Digital".
🏷️ Posición Profesional / Titular: Rol objetivo o especialidad 🎯
🔊 Click sutil
🗣️ Y en los datos de contacto incluí únicamente lo indispensable: teléfono con código de país, email profesional, ciudad y tu link actualizado a LinkedIn. Eliminamos datos innecesarios como DNI, estado civil, recomendaciones o dirección física completa.
🏷️ Contacto Útil: Teléfono · Mail · Ciudad · LinkedIn (Sin DNI, estado civil ni recomendaciones) 📬
🔊 Click sutil
🖼️ Captura flotante mostrando la cabecera del CV modelo de María Fernández con los datos resaltados.
🗣️ Hablemos de la foto: una buena foto suma cuando transmite profesionalismo, confianza, cercanía y credibilidad.
🏷️ La Foto Profesional: Profesionalismo · Confianza · Cercanía 📸🤝
🔊 Pop sutil
🗣️ Evitá por completo selfies, fotos con escotes pronunciados, maquillaje excesivo, fotos recortadas de fiestas, personas de espaldas, fotos oscuras o con fondos distractores.
🏷️ Errores de Foto a Evitar: Selfies · Mala Luz · Ropa Arrugada · Fiestas ❌📸
🔊 Click sutil
🖼️ Gráfica comparativa con ejemplos visuales de fotos no recomendadas vs. foto profesional correcta.
🗣️ Elegí un plano medio con buena luz frontal, fondo neutro, ropa acorde a tu industria y una sonrisa natural. Si postulás a países anglosajones como Estados Unidos o Reino Unido, recordá que por normativa legal el CV va sin foto.
🏷️ Foto Correcta: Buena Luz · Fondo Neutro · Ropa Profesional ✔️
🔊 Pop de confirmación
🗣️ Pasemos al segundo bloque: tu Perfil Profesional.
🏷️ Paso 2: Perfil Profesional (Resumen de 3 a 4 líneas) 💡✍️
🔊 Swoosh suave
🗣️ Es un breve resumen de quién sos, tu trayectoria, tu especialidad principal y el valor que aportás al equipo. Sé conciso y andá directo al grano.
🏷️ Quién sos · Tu especialidad · El valor que aportás 🎯
🔊 Click sutil
🗣️ Y en la parte inferior organizamos la Educación, las Habilidades y los Idiomas.
🏷️ Paso 3: Educación · Habilidades · Idiomas 🎓🛠️🌐
🔊 Click sutil
🗣️ En Educación poné tu título más relevante, institución y año de egreso. En Habilidades, destacá competencias técnicas y blandas alineadas con lo que busca la vacante. Y en Idiomas y Herramientas, listá el software que realmente dominás.
🏷️ Formación Relevante + Habilidades Específicas + Software Real 📋✅
🔊 Pop de confirmación

[6:15 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Andá a la sección de Documentos de esta clase, descargá tu Plantilla de CV, o usá una propia, y completá estos primeros tres bloques.
🏷️ Documentos: Plantilla Oficial de CV 📥📄
🔊 Pop sutil
🗣️ En la próxima clase nos metemos de lleno en el corazón de tu currículum: cómo redactar la experiencia laboral con logros cuantificables y realizar la auditoría final antes de enviarlo.
🏷️ Próxima clase: Experiencia laboral con logros y auditoría final 📈🔍
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-cv-05',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-3',
        moduleNumber: 3,
        moduleTitle: 'Creación y mejora de CV',
        lessonNumber: 5,
        type: 'video',
        title: 'Experiencia laboral con logros y auditoría final',
        duration: '8 min',
        videoDuration: '4:15 min',
        completed: false,
        description:
          'Cómo transformar tareas pasivas en declaraciones de logros cuantificables, las 4 reglas de diseño en una página y el checklist de 5 puntos antes de postularte.',
        takeaways: [
          'La fórmula del logro: [Verbo de acción fuerte] + [Contexto / Tarea] + [Métrica o Resultado de impacto].',
          'Eliminar frases pasivas: Desterrar "Responsable de..." (\'Responsable de ventas\' ❌ -> \'Gestioné una cartera de 30 clientes y aumenté las ventas un 20%\' ✔️).',
          'Resultados cualitativos: Si no tenés números exactos, no los inventes; explicá la mejora o el impacto de manera cualitativa.',
          'Las 4 reglas de diseño: 1 sola página, diseño limpio y profesional, fácil de escanear y adaptado al puesto.',
          'Los 5 puntos de la Auditoría Final: Contacto actualizado, ortografía/fechas, palabras clave del aviso, maquetación ordenada y guardado en PDF profesional (CV_Nombre_Apellido.pdf).',
        ],
        actionItems: [
          {
            id: 'act-cv-5-1',
            title: 'Reescribir las viñetas de tu experiencia con logros',
            description: 'Aplicá verbos de acción fuertes y métricas o impactos cualitativos a cada rol de tu trayectoria.',
          },
          {
            id: 'act-cv-5-2',
            title: 'Exportar en PDF y realizar la prueba de los 6 segundos',
            description: 'Guardá tu archivo como CV_Nombre_Apellido.pdf y verificalo con el Checklist de Auditoría Pre-Envío.',
          },
        ],
        mindsetPrompt:
          'Un CV impecable en sus logros y detalles es tu mejor carta de presentación para abrir puertas a entrevistas.',
        resources: [
          {
            id: 'diccionario-100-verbos-accion',
            title: 'Diccionario de 100 Verbos de Acción de Alto Impacto',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 3,
            category: 'Guía de Vocabulario',
            description: 'Listado de verbos activos clasificados por área (Liderazgo, Optimización, Ventas, Innovación) para inspirar tu redacción.',
            isEssential: false,
          },
          {
            id: 'checklist-auditoria-pre-envio',
            title: 'Checklist de Auditoría Pre-Envío (5 Puntos Clave)',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 3,
            category: 'Checklist de Control',
            description: 'Guía interactiva de verificación técnica y visual para validar tu CV antes de postularte.',
            isEssential: true,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: EXPERIENCIA LABORAL Y FÓRMULA DE LOGROS]
🗣️ Llegamos al bloque más importante de todo tu currículum: la Experiencia Laboral.
🏷️ Bloque Clave: Experiencia Laboral con Logros Medibles 💼⭐
🔊 Swoosh suave
🗣️ Ordenamos tus empleos en orden cronológico inverso, desde el actual o más reciente hacia atrás.
🏷️ Orden Cronológico Inverso: De lo actual hacia atrás 🗓️
🔊 Click sutil
🗣️ Y en cada puesto, eliminá para siempre frases pasivas como 'Responsable de' o 'Encargado de'.
🏷️ Frases Prohibidas: ❌ 'Responsable de...' ❌ 'Encargado de...'
🔊 Error sutil
🗣️ Cada viñeta debe iniciar con un verbo de acción fuerte: Gestioné, Implementé, Negocié, Optimicé, Diseñé o Coordiné.
🏷️ Verbos de Acción Fuertes: Gestioné · Implementé · Optimicé · Coordiné ⚡
🔊 Clicks sutiles por verbo
🗣️ Por ejemplo, en vez de escribir: "Responsable de ventas", podemos decir: "Gestioné una cartera de 30 clientes y aumenté las ventas un 20%".
🏷️ Ejemplo de Logro: "Gestioné 30 clientes y aumenté ventas 20%" 📈⭐
🔊 Swoosh suave
🖼️ Captura flotante mostrando la comparación entre la tarea genérica vs. el logro cuantificado.
🗣️ Si no tenés números exactos, no los inventes: podés explicar el resultado de manera cualitativa, mencionando mejoras de procesos, tiempos ahorrados o satisfacción de clientes.
🏷️ Sin inventar números: Explicar mejoras cualitativas reales 🛡️✨
🔊 Pop de confirmación

[1:45 - SECCIÓN 2: LAS 4 REGLAS DE DISEÑO Y LOS 5 PUNTOS DE AUDITORÍA]
🗣️ Para que tu CV sea impecable, tené en cuenta estas cuatro reglas clave de diseño y lectura:
🗣️ Primera: Una sola página. Sé conciso y mostrá lo más importante.
🏷️ 1. Una Sola Página: Capacidad de síntesis ejecutiva 📄⏱️
🔊 Click sutil
🗣️ Segunda: Diseño limpio y profesional. Usá espacios, márgenes y tipografías claras.
🏷️ 2. Diseño Limpio: Márgenes, espacios y tipografía clara 📐✨
🔊 Click sutil
🗣️ Tercera: Fácil de leer y escanear. Usá títulos claros, viñetas y resaltá lo importante.
🏷️ 3. Fácil de Escanear: Títulos claros y viñetas ordenadas 👁️🔍
🔊 Click sutil
🗣️ Y cuarta: Adaptado al puesto. Ajustá tu CV a cada búsqueda utilizando las palabras clave del anuncio.
🏷️ 4. Adaptado al Puesto: Palabras clave relevantes del aviso 🎯
🔊 Pop de confirmación
🗣️ Y antes de enviarlo, pasá tu archivo por estos cinco puntos de control:
🗣️ Primero: verificá que tu nombre, teléfono, mail y LinkedIn estén correctos y actualizados.
🏷️ Control 1: Contacto útil y LinkedIn actualizados 📇
🔊 Click sutil
🗣️ Segundo: revisá ortografía, redacción y que las fechas de tu experiencia sean coherentes.
🏷️ Control 2: Ortografía impecable y coherencia en fechas ✍️🗓️
🔊 Click sutil
🗣️ Tercero: comprobá que el CV esté adaptado al puesto y contenga las palabras clave relevantes.
🏷️ Control 3: Match de palabras clave del anuncio 🎯
🔊 Click sutil
🗣️ Cuarto: asegurate de que el diseño sea claro, ordenado y fácil de leer.
🏷️ Control 4: Maquetación limpia y libre de saturación 📐
🔊 Click sutil
🗣️ Y quinto: guardalo en PDF y poné un nombre profesional al archivo, por ejemplo: CV_Florencia_Martinez.pdf.
🏷️ Control 5: Guardado en PDF como CV_Nombre_Apellido.pdf 💾📄
🔊 Pop sutil
🖼️ Captura flotante mostrando el archivo PDF bien nombrado y su vista previa limpia.
🗣️ Un último consejo: antes de enviarlo, abrí el PDF y miralo como si fueras un reclutador.
🏷️ La Prueba de los 6 Segundos: La mirada del reclutador 👥🔍
🔊 Swoosh suave
🗣️ Preguntate: "¿Entiendo rápidamente quién es esta persona, qué sabe hacer y qué puede aportar?".
🏷️ "¿Quién es? ¿Qué sabe hacer? ¿Qué puede aportar?" 💭💡
🔊 Pop sutil
🗣️ Si la respuesta es sí, tu CV está listo.
🏷️ ¡Tu CV está 100% listo para salir a la cancha! 🚀✅
🔊 Pop de confirmación

🗣️ En la sección de Documentos de esta clase tenés el Diccionario de 100 Verbos de Acción y el Checklist de Auditoría Pre-Envío para validar tu archivo final.
🏷️ Documentos: Checklist de Auditoría y Diccionario de Verbos 📋📥
🔊 Pop sutil
🗣️ Excelente trabajo: ya tenés un currículum sólido, claro e impecable. Ahora demos el salto al Módulo N°4 para optimizar tu perfil de LinkedIn y empezar a generar contactos clave.
🏷️ Hito: Módulo 03 Completado (Creación y mejora de CV) 📄🏆
🔊 Pop de confirmación
🏷️ Próximo: Módulo 04 — Creación y mejora de LinkedIn 🌐🚀
🔊 Fin de lección suave`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // MÓDULO 4: CREACIÓN Y MEJORA DE LINKEDIN (5 CLASES)
  // ---------------------------------------------------------------------------
  {
    id: 'exp-mod-4',
    programId: 'exp-busqueda-laboral',
    number: 4,
    title: 'Creación y mejora de LinkedIn',
    tagline: 'Optimizá tu perfil estelar, aumentá tu posicionamiento en búsquedas y prospectá recruiters',
    totalDuration: '34 min · 5 clases',
    lessons: [
      {
        id: 'exp-lk-01',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-4',
        moduleNumber: 4,
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
🗣️ LinkedIn no es solamente un lugar donde cargamos nuestro CV. Es nuestra vidriera profesional, y la primera impresión importa.
🏷️ LinkedIn: Tu vidriera profesional 🌐✨
🔊 Swoosh suave
🗣️ Cuando un reclutador o un líder de área entra a tu perfil, tarda aproximadamente tres segundos en decidir si se queda o si sigue de largo.
🏷️ La Regla de los 3 Segundos: Primera Impresión ⏱️👀
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
🗣️ Andá a tu cuenta de LinkedIn, personalizá tu URL pública, seleccioná tu mejor foto y subí tu nueva portada. En el próximo video nos metemos con el texto: cómo redactar un Titular magnético y tu sección Acerca de mí.
🏷️ Próxima clase: Titular magnético y sección Acerca de mí 🎯✍️
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-lk-02',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-4',
        moduleNumber: 4,
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
        resources: [
          {
            id: 'guia-copywriting-linkedin-titular-about',
            title: 'Guía de Copywriting para LinkedIn (Titular & Acerca de mí)',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 4,
            category: 'Guía de Redacción',
            description: 'Modelos redactados de titulares por especialidad y plantilla en 4 párrafos para tu extracto.',
            isEssential: false,
          },
        ],
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
🗣️ Aprovechá ese espacio para incluir tu rol, especialidad y palabras clave relacionadas con los puestos que buscás.
🏷️ Rol · Especialidad · Palabras Clave Relevantes ⚙️🔍
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
🗣️ Con tu titular y tu extracto listos, pasemos a la siguiente clase para volcar tu experiencia laboral con logros y estructurar tus recomendaciones.
🏷️ Próxima clase: Experiencia, aptitudes y recomendaciones 🤝⭐
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-lk-03',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-4',
        moduleNumber: 4,
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
🗣️ Ahora que ya trabajamos la parte inicial de nuestro perfil, vamos a completar tres secciones muy importantes: experiencia, aptitudes y recomendaciones.
🏷️ Tres Secciones Clave: Experiencia · Aptitudes · Recomendaciones 📋🤝
🔊 Swoosh suave

[1:15 - SECCIÓN 2: DESARROLLO CONCEPTUAL — EXPERIENCIA, APTITUDES Y RECOMENDACIONES]
🗣️ Empecemos por la experiencia laboral: no alcanza solamente con poner el nombre de la empresa y el puesto.
🏷️ 1. Experiencia: Más que el nombre y el puesto 💼
🔊 Swoosh suave
🗣️ Contá brevemente qué hiciste y, siempre que puedas, qué resultados obtuviste.
🏷️ Descripción de tareas + Resultados obtenidos 📈
🔊 Pop sutil
🗣️ Aplicá lo mismo que vimos en el CV: utilizá verbos de acción y destacá logros concretos.
🏷️ Verbos de Acción + Logros Concretos 🎯
🔊 Click sutil
🗣️ Por ejemplo, en lugar de poner "Encargado de atención al cliente", podrías escribir: "Gestioné una cartera de más de 50 clientes, realizando seguimiento comercial y resolución de consultas".
🏷️ Ejemplo: "Gestioné cartera de +50 clientes y seguimiento comercial" 💬⭐
🔊 Swoosh suave
🖼️ Captura flotante mostrando un cargo en LinkedIn con la redacción orientada a logros.
🗣️ Después revisá tus aptitudes: elegí habilidades que realmente estén relacionadas con tu profesión y con los puestos que estás buscando.
🏷️ 2. Aptitudes: Habilidades alineadas a tu profesión ⚙️
🔊 Click sutil
🗣️ Pueden ser herramientas, conocimientos técnicos, idiomas, metodologías o competencias específicas.
🏷️ Herramientas · Conocimientos · Idiomas · Metodologías 🌐📊
🔊 Click sutil
🗣️ Y por último tenemos las recomendaciones: podés pedírselas a antiguos jefes, compañeros, clientes o personas con las que hayas trabajado.
🏷️ 3. Recomendaciones: Jefes · Colegas · Clientes 👥🤝
🔊 Click sutil
🗣️ Mi recomendación es que no mandes simplemente "¿me hacés una recomendación?": personalizá el mensaje.
🏷️ Personalizar la solicitud de recomendación ✍️
🔊 Pop sutil
🗣️ Recordale a esa persona qué proyecto o experiencia compartieron y pedile, si puede, que destaque cómo fue trabajar con vos.
🏷️ Recordar proyecto compartido + Pedir feedback concreto 💡
🔊 Click sutil
🗣️ Las recomendaciones aportan algo muy valioso: no sos solamente vos contando lo que sabés hacer; hay otras personas respaldando tu experiencia profesional.
🏷️ Validación Externa: Respaldo de tu experiencia profesional 🛡️⭐
🔊 Pop de confirmación

[4:50 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Entonces, para esta clase quiero que hagas tres cosas: revisá tu experiencia, actualizá tus aptitudes y empezá a pedir algunas recomendaciones.
🏷️ Acción: Revisar Experiencia · Actualizar Aptitudes · Pedir Recomendaciones 🚀✅
🔊 Pop sutil
🗣️ En la próxima clase vamos a dar el paso más importante: cómo contactar de forma directa a reclutadores y líderes de área con mensajes que generen conversaciones reales.
🏷️ Próxima clase: Mensajes de contacto a recruiters y líderes 📩🎯
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-lk-04',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-4',
        moduleNumber: 4,
        moduleTitle: 'Creación y mejora de LinkedIn',
        lessonNumber: 4,
        type: 'video',
        title: 'Mensajes de contacto a recruiters',
        duration: '7 min',
        videoDuration: '3:50 min',
        completed: false,
        description:
          'Estrategia de contacto directo con recruiters y líderes de área a través de mensajes breves, personalizados y sin presión.',
        takeaways: [
          'Identificar a las personas correctas: El recruiter a cargo de la búsqueda y el líder o responsable del área.',
          'Mensajes breves y personalizados: Abrir conversaciones profesionales personalizando nombre, empresa, puesto o motivo.',
          'No enviar el CV de entrada: Generar primero el contacto y la conexión profesional antes de compartir el documento.',
        ],
        actionItems: [
          {
            id: 'act-lk-4-1',
            title: 'Identificar decisores en empresas objetivo',
            description: 'Buscá reclutadores o líderes de área en las organizaciones que te interesan.',
          },
          {
            id: 'act-lk-4-2',
            title: 'Enviar mensajes de contacto personalizados',
            description: 'Redactá notas breves y personalizadas sin adjuntar tu CV en el primer contacto.',
          },
        ],
        mindsetPrompt:
          'Un mensaje personalizado y sin presión no pide trabajo desesperadamente: abre una conversación profesional entre colegas.',
        resources: [
          {
            id: 'scripts-mensajes-conexion-recruiters',
            title: 'Scripts de Mensajes de Conexión para Recruiters & Líderes',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 4,
            category: 'Plantillas de Mensajes',
            description: 'Guiones cortos para vacantes abiertas y contacto espontáneo a líderes de área.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ Tener un buen perfil de LinkedIn es importante, pero también tenemos que movernos y generar oportunidades.
🏷️ Proactividad: Moverse y generar oportunidades 🚀🌐
🔊 Swoosh suave
🗣️ Uno de los errores más comunes es mandar solicitudes de conexión vacías o mensajes genéricos como: "Hola, estoy buscando trabajo, te adjunto mi CV".
🏷️ Error Común: Solicitudes vacías o mensajes genéricos ❌⚠️
🔊 Pop sutil
🖼️ Placa comparativa mostrando: Mensaje genérico vacío vs. Mensaje estratégico personalizado.
🗣️ En lugar de eso, vamos a contactar de manera estratégica.
🏷️ Contacto Estratégico en LinkedIn 🎯🤝
🔊 Pop de confirmación

[1:15 - SECCIÓN 2: DESARROLLO CONCEPTUAL — A QUIÉN CONTACTAR Y CÓMO ESCRIBIR]
🗣️ Primero, identificá a las personas correctas: si viste una vacante, podés buscar al recruiter relacionado con esa búsqueda, y también podés buscar al líder o responsable del área donde te gustaría trabajar.
🏷️ 1. Identificar a las Personas Correctas: Recruiter & Líder de Área 👥🏢
🔊 Swoosh suave
🗣️ Una vez que encontraste a la persona, mandale un mensaje breve, personalizado y concreto.
🏷️ 2. Mensaje Breve, Personalizado y Concreto ✍️✨
🔊 Click sutil
🗣️ No hace falta contar toda tu vida profesional en el primer mensaje: el objetivo inicial es abrir una conversación.
🏷️ Objetivo: Abrir una conversación profesional 💬🚪
🔊 Pop sutil
🗣️ Y algo muy importante: no mandes exactamente el mismo mensaje a cincuenta personas. Personalizalo aunque sea con el nombre, la empresa, el puesto o el motivo por el cual estás contactando.
🏷️ Personalización Real: Nombre · Empresa · Puesto · Motivo 🎯
🔊 Click sutil
🖼️ Captura flotante mostrando un mensaje breve y personalizado en LinkedIn.
🗣️ Tampoco hace falta adjuntar inmediatamente el CV si nadie te lo pidió: primero generá el contacto y, si corresponde, después podés compartirlo.
🏷️ Criterio Clave: No adjuntar CV de entrada (Primero el contacto) 🛡️📄
🔊 Click sutil
🗣️ Si necesitás ejemplos de estructura para el mensaje inicial, te dejo algunos en los Documentos de esta clase para que tengas una base, y vos le pongas tu impronta.
🏷️ Documentos: Ejemplos de Mensajes de Conexión 📥📋
🔊 Pop de confirmación

[5:30 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Tu siguiente paso es buscar tres reclutadores o líderes de tus empresas objetivo en LinkedIn y enviarles una solicitud de conexión personalizada.
🏷️ Acción: Conectar con 3 Recruiters o Líderes Target 🎯👥
🔊 Swoosh suave
🖼️ Captura flotante mostrando la búsqueda de decisores en la barra de LinkedIn.
🗣️ En la próxima clase vamos a ver el cierre de este módulo: cómo interactuar con contenido en tu feed para ganar visibilidad y atraer oportunidades.
🏷️ Próxima clase: Estrategia de contenido y networking 🚀📈
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-lk-05',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-4',
        moduleNumber: 4,
        moduleTitle: 'Creación y mejora de LinkedIn',
        lessonNumber: 5,
        type: 'video',
        title: 'Estrategia de contenido y networking',
        duration: '6 min',
        videoDuration: '3:30 min',
        completed: false,
        description:
          'Cómo interactuar de forma estratégica, aportar comentarios de valor y encontrar publicaciones de empleo en el feed.',
        takeaways: [
          'Presencia sin crear contenido: Seguir a empresas, recruiters y referentes dejando aportes profesionales que inviten a la conversación.',
          'Búsqueda en el feed: Rastrear términos como "buscamos" o "contratando" junto a tu puesto para hallar vacantes directas.',
          'Constancia y networking: Usar LinkedIn para generar relaciones profesionales de manera ágil sin pasar horas conectado.',
        ],
        actionItems: [
          {
            id: 'act-lk-5-1',
            title: 'Buscar publicaciones de vacantes en el feed',
            description: 'Filtrá por publicaciones recientes usando palabras como "contratando" o "sumamos" con tu rol.',
          },
          {
            id: 'act-lk-5-2',
            title: 'Dejar un comentario de valor en una empresa o referente',
            description: 'Comentá en el posteo de un referente o empresa compartiendo una perspectiva o experiencia profesional.',
          },
        ],
        mindsetPrompt:
          'No necesitás ser creador de contenido ni publicar a diario: la clave en LinkedIn es participar con criterio, aportar valor y construir relaciones.',
        resources: [],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ Para conseguir oportunidades en LinkedIn no alcanza solamente con tener un buen perfil: también necesitamos tener presencia y generar relaciones.
🏷️ LinkedIn: Presencia activa y construcción de relaciones 🌐🤝
🔊 Swoosh suave
🗣️ Y esto no significa que tengas que convertirte en creador de contenido ni publicar todos los días.
🏷️ No necesitás ser creador de contenido ni publicar a diario 🛡️
🔊 Pop sutil

[1:15 - SECCIÓN 2: DESARROLLO CONCEPTUAL — INTERACCIÓN ESTRATÉGICA Y BÚSQUEDA EN EL FEED]
🗣️ Una forma muy simple de empezar es seguir a empresas, recruiters y referentes de tu sector, e interactuar con sus publicaciones.
🏷️ 1. Seguir e Interactuar: Empresas · Recruiters · Referentes 👥🏢
🔊 Swoosh suave
🗣️ Pero tratá de evitar comentarios como "Excelente post" o simplemente un emoji: la idea es aportar algo, ya sea una opinión profesional, una experiencia, un dato o una pregunta que genere conversación.
🏷️ Comentarios de Valor: Opinión · Experiencia · Datos · Preguntas 💬💡
🔊 Pop sutil
🗣️ Por ejemplo, si una empresa publica sobre un proyecto relacionado con tu área, podés comentar desde tu conocimiento y experiencia.
🏷️ Comentar desde tu conocimiento técnico ✍️⭐
🔊 Click sutil
🗣️ Esto hace que otras personas del sector puedan conocerte y llegar a tu perfil.
🏷️ Visibilidad Orgánica hacia tu Perfil 🎯👀
🔊 Pop sutil
🖼️ Captura flotante mostrando un comentario profesional que atrae visitas al perfil.
🗣️ Otra estrategia que podés utilizar es buscar publicaciones recientes relacionadas con oportunidades laborales.
🏷️ 2. Búsqueda de Publicaciones Recientes en el Feed 🔍🕒
🔊 Swoosh suave
🗣️ Además de mirar la sección de empleos, buscá términos como "buscamos", "estamos contratando" o "sumamos al equipo" junto con el nombre de tu puesto o área.
🏷️ Búsqueda: [Puesto] + "buscamos" / "contratando" / "sumamos" 📋✨
🔊 Click sutil
🖼️ Video flotante mostrando el paso a paso del filtro por 'Publicaciones' y 'Más recientes'.
🗣️ Muchas veces vas a encontrar publicaciones realizadas directamente por recruiters, empresas o líderes de equipo.
🏷️ Publicaciones directas de líderes y recruiters 🏢👤
🔊 Pop sutil
🗣️ Y ahí aparece una ventaja: además de conocer la oportunidad, podés identificar quién la publicó, seguir a esa persona, interactuar y, si corresponde, generar un contacto.
🏷️ Ventaja: Identificar al decisor + Contacto directo ⚡🤝
🔊 Pop de confirmación
🗣️ Entonces no uses LinkedIn solamente para entrar, buscar empleo y salir: usalo también para hacer networking, participar y construir relaciones profesionales.
🏷️ Networking Activo: Participar y construir relaciones 🌐🚀
🔊 Swoosh suave
🗣️ No necesitás estar horas conectado: lo importante es hacerlo de manera constante y estratégica.
🏷️ Constancia y Estrategia (Sin pasar horas conectado) ⏱️✅
🔊 Pop de confirmación

[4:45 - SECCIÓN 3: CIERRE DE MÓDULO Y LLAMADA A LA ACCIÓN]
🗣️ ¡Completaste el Módulo N°4! Tu perfil de LinkedIn está optimizado y tenés las herramientas para generar visibilidad y contactos estratégicos. En el Módulo N°5 expandimos el radar: vamos a dominar los mejores portales de empleo y plataformas remotas internacionales.
🏷️ Hito: Módulo 04 Completado (LinkedIn Estratégico) 🌐🏆
🔊 Pop de confirmación
🏷️ Próximo: Módulo 05 — ¿Dónde encontrar oportunidades laborales? 🗺️💼
🔊 Fin de lección suave`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // MÓDULO 5: ¿DÓNDE ENCONTRAR OPORTUNIDADES LABORALES? (4 CLASES)
  // ---------------------------------------------------------------------------
  {
    id: 'exp-mod-5',
    programId: 'exp-busqueda-laboral',
    number: 5,
    title: '¿Dónde encontrar oportunidades laborales?',
    tagline: 'Construí tu propio mapa de fuentes laborales y descubrí vacantes en portales, empresas, consultoras y canales especializados',
    totalDuration: '25 min · 4 clases',
    lessons: [
      {
        id: 'exp-dnd-01',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-5',
        moduleNumber: 5,
        moduleTitle: '¿Dónde encontrar oportunidades laborales?',
        lessonNumber: 1,
        type: 'video',
        title: 'No todas las oportunidades están en el mismo lugar',
        duration: '6 min',
        videoDuration: '3:45 min',
        completed: false,
        description:
          'Dejá de buscar en un solo sitio: descubrí los cuatro grandes grupos de fuentes laborales (portales, empresas, consultoras y canales especializados) y cómo diversificar tu búsqueda.',
        takeaways: [
          'El mercado laboral está distribuido: concentrar toda la búsqueda en un solo portal limita drásticamente tus posibilidades reales.',
          'Los 4 grandes grupos de fuentes: Portales de empleo, sitios de carrera de empresas, consultoras/headhunters y fuentes especializadas.',
          'Recurso vivo y complementario: El Directorio Actualizado en Documentos te permite consultar plataformas vigentes sin depender de nombres fijos en el video.',
        ],
        actionItems: [
          {
            id: 'act-dnd-1-1',
            title: 'Explorar el Directorio en Documentos',
            description: 'Revisá el Directorio de Portales y Recursos para familiarizarte con las categorías disponibles.',
          },
        ],
        mindsetPrompt:
          'Dejá de preguntarte "¿cuál es la mejor página?" y empezá a preguntarte "¿cuáles son las fuentes relevantes para mi perfil?".',
        resources: [
          {
            id: 'directorio-portales-empleo-remoto',
            title: 'Directorio Actualizado de Portales y Recursos',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 5,
            category: 'Directorio',
            description: 'Listado dinámico y clasificado de plataformas de empleo en Sudamérica, portales de nicho y trabajo remoto global, y consultoras de selección / headhunters.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y CAMBIO DE MENTALIDAD]
🗣️ ¡Hola a todos! Hasta acá ya definimos qué tipo de trabajo estamos buscando, preparamos nuestro CV y trabajamos nuestro perfil de LinkedIn.
🏷️ Siguiente Paso: Dónde encontrar oportunidades 🗺️💼
🔊 Swoosh suave
🗣️ Ahora viene una pregunta fundamental: ¿Dónde encontramos las oportunidades?
🏷️ Pregunta Clave: ¿Dónde están las vacantes? ❓
🔊 Pop sutil
🗣️ Uno de los errores más comunes es concentrar toda la búsqueda laboral en un solo lugar. Entramos siempre al mismo portal, hacemos una búsqueda rápida, vemos qué apareció y sentimos que esas son todas las oportunidades que existen.
🏷️ El error de depender de un único portal ⚠️📉
🔊 Pop sutil
🗣️ Pero el mercado laboral funciona de una manera mucho más amplia. Una oportunidad puede aparecer en un portal de empleo, directamente en la página de una empresa, a través de una consultora de selección o en una fuente especializada de tu industria.
🏷️ Mercado Distribuido: Portales · Empresas · Consultoras · Especializadas 🌐
🔊 Pop de confirmación
🗣️ Por eso, quiero que a partir de ahora dejes de pensar: "¿Cuál es la mejor página para buscar trabajo?"... y empieces a pensar: "¿Cuáles son las fuentes que tengo que revisar para encontrar oportunidades relacionadas con mi perfil?".
🏷️ Cambio de Enfoque: Fuentes relevantes para tu perfil 💡🎯
🔊 Swoosh suave

[1:15 - SECCIÓN 2: DESARROLLO — LOS 4 GRANDES GRUPOS DE FUENTES]
🗣️ Vamos a dividir estas fuentes en cuatro grandes grupos:
🗣️ Primero, los portales de empleo. Son sitios que concentran búsquedas de distintas empresas y sectores. Algunos son generales y otros están especializados en determinadas industrias, perfiles o modalidades de trabajo.
🏷️ 1. Portales de Empleo: Generales y especializados 🏢💻
🔊 Click sutil
🗣️ Segundo, los portales de carrera de las propias empresas. Muchas organizaciones tienen dentro de su página web una sección específica donde publican sus oportunidades laborales.
🏷️ 2. Portales de Carrera: Publicaciones directas de empresas 💼🌐
🔊 Click sutil
🗣️ Tercero, las consultoras de selección y headhunters. Hay empresas que tercerizan parte o todo su proceso de selección. Por eso, determinadas oportunidades son gestionadas por consultoras y no aparecen publicadas directamente por la empresa contratante.
🏷️ 3. Consultoras & Headhunters: Procesos tercerizados 👥📁
🔊 Click sutil
🗣️ Y cuarto, las fuentes especializadas. Dependiendo de tu profesión o industria, pueden existir bolsas de empleo específicas, asociaciones profesionales, universidades, cámaras empresariales o comunidades donde también se difunden oportunidades.
🏷️ 4. Fuentes Especializadas: Cámaras, asociaciones y comunidades 🏛️💬
🔊 Pop de confirmación
🗣️ Entonces, a partir de ahora no vamos a depender de una única fuente: vamos a construir nuestro propio mapa de búsqueda laboral.
🏷️ Construí tu propio mapa de búsqueda 🗺️🚀
🔊 Swoosh suave

[2:40 - SECCIÓN 3: RECURSO ACTUALIZABLE EN DOCUMENTOS]
🗣️ Y algo importante: no voy a darte en este video una lista cerrada de páginas, porque las plataformas cambian, aparecen nuevas y otras pueden dejar de funcionar.
🏷️ Contenido Siempre Actualizado 🔄✨
🔊 Pop sutil
🗣️ Por eso, dentro de los Documentos de esta clase vas a encontrar un Directorio Actualizado de Portales y Recursos, que vas a poder consultar como complemento.
🏷️ Documentos: Directorio Actualizado de Portales y Recursos 📥📋
🔊 Click sutil
🖼️ Captura flotante mostrando el Directorio Interactivo In-App con las distintas categorías de plataformas.
🗣️ Lo importante de esta clase no es que memorices nombres: lo importante es que entiendas dónde pueden estar las oportunidades y que aprendas a diversificar tu búsqueda.
🏷️ Comprensión Estratégica vs. Memorizar Páginas 🎯💡
🔊 Pop de confirmación

[3:25 - SECCIÓN 4: CIERRE Y PRÓXIMO PASO]
🗣️ En la próxima clase vamos a trabajar con algo que ya hicimos al comienzo del curso: tu lista de empresas objetivo. Y vamos a convertir esa lista en una fuente concreta de oportunidades.
🏷️ Próxima clase: Buscá oportunidades directamente en tus empresas objetivo 🏢🎯
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-dnd-02',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-5',
        moduleNumber: 5,
        moduleTitle: '¿Dónde encontrar oportunidades laborales?',
        lessonNumber: 2,
        type: 'video',
        title: 'Buscá oportunidades directamente en tus empresas objetivo',
        duration: '6 min',
        videoDuration: '3:45 min',
        completed: false,
        description:
          'Hacé el camino inverso: cómo transformar tu lista de 15 empresas objetivo del Módulo 1 en fuentes reales de oportunidades e ingresar a sus ecosistemas de contratación.',
        takeaways: [
          'El camino inverso: Primero identificamos las organizaciones donde queremos trabajar y luego investigamos activamente sus oportunidades.',
          'Ecosistema de contratación: Evaluar si el sitio de carrera permite crear perfil, cargar CV, sumarse a la base de talentos o activar alertas por país/región.',
          'Persistencia estratégica: Si hoy no hay vacante activa, registrá tu perfil o conservá la empresa en tu mapa para seguimiento periódico.',
        ],
        actionItems: [
          {
            id: 'act-dnd-2-1',
            title: 'Auditar los sitios de empleo de 3 a 5 empresas objetivo',
            description: 'Ingresá a la web de tus empresas elegidas, localizá su sección de carreras y registrá si cuentan con base de talentos o alertas.',
          },
        ],
        mindsetPrompt:
          'No esperes a que una vacante aparezca por azar en un portal: andá a buscar activamente a las empresas en las que querés estar.',
        resources: [
          {
            id: 'plantilla-registro-empresas-objetivo',
            title: 'Plantilla de Registro de Sitios de Empleo de Empresas Objetivo',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 5,
            category: 'Empresas Objetivo',
            description: 'Planilla estructurada para auditar y registrar los portales de talento, sistemas ATS y opciones de perfil de tus empresas objetivo.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y CONEXIÓN CON EL MÓDULO 1]
🗣️ En el primer módulo de esta experiencia te pedí que crearas una lista de 15 empresas en las que realmente te gustaría trabajar.
🏷️ Reconexión: Tu lista de 15 empresas objetivo 📋🎯
🔊 Swoosh suave
🗣️ Ahora vamos a volver a buscar esa lista porque llegó el momento de utilizarla.
🏷️ De la lista a la acción 🚀
🔊 Pop sutil
🗣️ Muchas veces hacemos exactamente al revés: primero encontramos una vacante y recién ahí conocemos la empresa.
🏷️ El error habitual: Buscar puestos a ciegas ⚠️
🔊 Pop sutil
🗣️ Yo quiero enseñarte a hacer el camino contrario: primero identificamos la empresa y después investigamos qué oportunidades tiene.
🏷️ Estrategia Inversa: Primero la empresa, luego la oportunidad 🏢🔍
🔊 Pop de confirmación

[1:05 - SECCIÓN 2: DESARROLLO — CÓMO INVESTIGAR EL ECOSISTEMA DE CONTRATACIÓN]
🗣️ Elegí una de tus empresas objetivo. Ingresá a su página web oficial y buscá su sección de oportunidades laborales.
🗣️ Puede aparecer con diferentes nombres: empleo, carreras, oportunidades, talento, trabajá con nosotros o expresiones similares.
🏷️ Secciones clave: Carreras · Empleos · Trabajá con nosotros 🌐💼
🔊 Click sutil
🖼️ Captura de pantalla mostrando cómo ubicar la sección de carreras en el footer o menú principal de una empresa.
🗣️ Una vez que encuentres esa sección, no mires solamente si hoy existe una vacante abierta para vos: quiero que investigues cómo funciona el sistema de contratación de esa empresa.
🏷️ Auditoría del Sistema de Contratación 🔍⚙️
🔊 Pop sutil
🗣️ Hacete estas preguntas: ¿Tiene un portal propio? ¿Permite crear un perfil? ¿Podés cargar tu currículum? ¿Tiene una base de talentos? ¿Permite configurar algún tipo de alerta? ¿Publica oportunidades por país o región?
🏷️ Checklist: Portal propio · Base de talentos · Alertas por país 📋✅
🔊 Click sutil
🗣️ Toda esta información nos ayuda a entender cómo ingresar al ecosistema de contratación de esa compañía.
🗣️ Y puede pasar que hoy no haya ninguna vacante relacionada con tu perfil: eso no significa que tengamos que eliminar esa empresa de nuestra lista.
🏷️ Si no hay vacante hoy: ¿Qué hacemos? 💡
🔊 Pop sutil
🗣️ Si permite crear un perfil o ingresar a su base de candidatos, hacelo. Y si no tiene ninguna de esas opciones, simplemente conservamos la empresa dentro de nuestro mapa para revisarla periódicamente.
🏷️ Cargar CV en base interna + Mantener en el radar 👥📁
🔊 Pop de confirmación

[2:50 - SECCIÓN 3: HERRAMIENTA EN DOCUMENTOS Y ACCIÓN]
🗣️ Ahora quiero que hagas este ejercicio con tus 15 empresas objetivo. No hace falta hacerlo todo de una vez: lo importante es que empieces a transformar esa lista en fuentes reales de oportunidades.
🏷️ Práctica: Relevar los portales de empleo de tu lista 📝🏢
🔊 Swoosh suave
🗣️ En los Documentos de esta clase vas a encontrar una plantilla para registrar las páginas de empleo de tus empresas objetivo y llevar un control ordenado.
🏷️ Documentos: Plantilla de Registro de Sitios de Empleo 📥📊
🔊 Click sutil
🖼️ Captura flotante de la plantilla interactiva para registrar URLs de carreras y tipos de portal.

[3:25 - SECCIÓN 4: CIERRE Y PRÓXIMO PASO]
🗣️ En la próxima clase vamos a salir de los caminos más evidentes y aprender a detectar oportunidades que pueden aparecer fuera de los portales tradicionales.
🏷️ Próxima clase: Cómo encontrar oportunidades fuera de los portales tradicionales 🔍🌐
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-dnd-03',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-5',
        moduleNumber: 5,
        moduleTitle: '¿Dónde encontrar oportunidades laborales?',
        lessonNumber: 3,
        type: 'video',
        title: 'Cómo encontrar oportunidades fuera de los portales tradicionales',
        duration: '6 min',
        videoDuration: '3:45 min',
        completed: false,
        description:
          'Ampliá tu radar hacia canales no evidentes: organizaciones sectoriales, ferias y congresos, comunidades profesionales y búsquedas estratégicas en Internet.',
        takeaways: [
          'Fuentes no tradicionales: Cámaras empresariales, asociaciones profesionales, colegios de graduados y universidades.',
          'Eventos y comunidades: Ferias de empleo, congresos sectoriales, grupos profesionales y newsletters de nicho.',
          'Búsqueda estratégica en buscadores: Combinar términos clave de rol, sector, ubicación y expresiones de contratación sin depender de fórmulas rígidas.',
        ],
        actionItems: [
          {
            id: 'act-dnd-3-1',
            title: 'Identificar 1 fuente no tradicional',
            description: 'Encontrá al menos una cámara, asociación profesional, evento o comunidad de tu sector y guardá el enlace.',
          },
        ],
        mindsetPrompt:
          'Una búsqueda más específica y creativa te conecta con vacantes donde la competencia es infinitamente menor.',
        resources: [
          {
            id: 'guia-fuentes-no-tradicionales',
            title: 'Guía de Fuentes No Tradicionales y Búsqueda Estratégica',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 5,
            category: 'Estrategias de Búsqueda',
            description: 'Guía práctica para explorar cámaras, asociaciones, ferias, comunidades de nicho y operadores de búsqueda.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y APERTURA DE HORIZONTES]
🗣️ Hasta ahora vimos portales, empresas y consultoras. Pero el mercado laboral no termina ahí.
🏷️ Más allá de lo evidente: El mercado no tradicional 🔍🌐
🔊 Swoosh suave
🗣️ Hay oportunidades que pueden aparecer en lugares que quizás no revisarías si tu búsqueda consiste solamente en entrar a una bolsa de empleo.
🏷️ Oportunidades fuera del radar común 💡
🔊 Pop sutil
🗣️ Por eso quiero enseñarte a ampliar tus fuentes de información explorando canales que la mayoría de los candidatos pasa por alto.
🏷️ Ampliando fuentes de información estratégica 🎯
🔊 Pop de confirmación

[0:55 - SECCIÓN 2: DESARROLLO — LAS 4 FUENTES NO TRADICIONALES]
🗣️ Una primera fuente son las organizaciones relacionadas con tu sector.
🗣️ Dependiendo de tu profesión, puede haber cámaras empresariales, asociaciones profesionales, colegios profesionales, universidades u organizaciones sectoriales que compartan oportunidades, programas de talento o convocatorias directas.
🏷️ 1. Organizaciones Sectoriales: Cámaras, asociaciones y colegios 🏛️📋
🔊 Click sutil
🗣️ Una segunda fuente son las ferias laborales y eventos profesionales.
🗣️ Muchas empresas participan en universidades, exposiciones, congresos y encuentros de determinados sectores. Y estos espacios no sirven solamente para entregar un currículum: también te permiten descubrir empresas que quizás no conocías, entender qué perfiles están buscando y ampliar tu mapa del mercado.
🏷️ 2. Ferias & Eventos: Congresos, exposiciones y encuentros 🎪👥
🔊 Click sutil
🗣️ Una tercera fuente son las comunidades profesionales especializadas.
🗣️ Hay industrias y profesiones que cuentan con comunidades, grupos, foros o newsletters donde circulan oportunidades específicas antes de que salgan a la luz de forma masiva.
🏷️ 3. Comunidades Profesionales: Grupos y newsletters de nicho 💬📧
🔊 Click sutil
🗣️ Y también podemos utilizar los buscadores de Internet de una manera mucho más estratégica.
🗣️ En lugar de buscar solamente "trabajo + mi profesión", podemos combinar términos relacionados con nuestro puesto, industria, ubicación y expresiones asociadas a oportunidades laborales.
🏷️ 4. Búsqueda Estratégica en Internet: Combinación de términos clave 🔍⌨️
🔊 Swoosh suave
🖼️ Video demostrativo en pantalla mostrando búsquedas en Google combinando palabras clave de industria, modalidad y términos de contratación.
🗣️ El objetivo no es aprender una fórmula de memoria: el objetivo es entender que una búsqueda más específica puede llevarnos a oportunidades que no encontramos haciendo siempre la misma consulta.
🏷️ Especificidad: Menos competencia, mejores resultados 🎯✨
🔊 Pop de confirmación

[2:50 - SECCIÓN 3: RECOMENDACIÓN PRÁCTICA Y DOCUMENTO]
🗣️ Quiero que pruebes diferentes combinaciones relacionadas con tu perfil y observes qué nuevas fuentes aparecen. Guardá aquellas que realmente sean relevantes para vos.
🏷️ Práctica: Explorar y guardar fuentes relevantes 📌
🔊 Pop sutil
🗣️ Porque nuevamente, no estamos intentando acumular cientos de páginas: estamos construyendo un sistema de fuentes que tenga sentido para nuestra búsqueda.
🏷️ Sistema de Fuentes con Sentido Estratégico 🧭
🔊 Click sutil
🗣️ En la sección de Documentos te dejo la Guía de Fuentes No Tradicionales y Búsqueda Estratégica para que tengas ejemplos prácticos de consulta.
🏷️ Documentos: Guía de Fuentes No Tradicionales 📥📋
🔊 Pop de confirmación

[3:25 - SECCIÓN 4: CIERRE Y PUENTE AL ENTREGABLE FINAL]
🗣️ En la próxima clase vamos a unir todo lo que vimos en este módulo y vas a crear tu propio Mapa Personal de Fuentes Laborales.
🏷️ Próxima clase: Creá tu Mapa Personal de Fuentes Laborales 🗺️🏆
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-dnd-04',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-5',
        moduleNumber: 5,
        moduleTitle: '¿Dónde encontrar oportunidades laborales?',
        lessonNumber: 4,
        type: 'video',
        title: 'Creá tu Mapa Personal de Fuentes Laborales',
        duration: '7 min',
        videoDuration: '4:00 min',
        completed: false,
        description:
          'La actividad central del Módulo 5: consolidá tu propio ecosistema de búsqueda en 4 cuadrantes (portales, empresas, consultoras y fuentes especializadas) y preparate para postular.',
        takeaways: [
          'Tu ecosistema propio: Un mapa personalizado en 4 cuadrantes adaptado a tu industria, rol y modalidad objetivo.',
          'Estrategia a medida: No existe una lista única para todo el mundo; tu mapa responde a tus metas (primer empleo, especialista o remoto global).',
          'Entregable troncal: Completar y guardar "Mi Mapa de Fuentes Laborales" para usarlo en el seguimiento diario del Módulo 6.',
        ],
        actionItems: [
          {
            id: 'act-dnd-4-1',
            title: 'Completar 🗺️ Mi Mapa de Fuentes Laborales (Actividad Obligatoria)',
            description: 'Descargá o completá en la app tu Mapa Personal con tus portales clave, tus empresas objetivo, consultoras y fuentes especializadas.',
          },
        ],
        mindsetPrompt:
          'No dependas de listas ajenas: cuando construís tu propio mapa de fuentes, tomás el control total de tu proceso de búsqueda.',
        resources: [
          {
            id: 'mapa-fuentes-laborales',
            title: '🗺️ Mi Mapa de Fuentes Laborales (Entregable Troncal)',
            type: 'pdf',
            fileSize: 'Herramienta In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 5,
            category: 'Ecosistema de Búsqueda',
            description: 'Herramienta central del módulo para consolidar tu mapa de fuentes en 4 cuadrantes listo para postular.',
            isEssential: true,
          },
          {
            id: 'directorio-portales-empleo-remoto',
            title: 'Directorio Actualizado de Portales y Recursos',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 5,
            category: 'Directorio',
            description: 'Listado dinámico y clasificado de plataformas de empleo en Sudamérica, portales de nicho y trabajo remoto global, y consultoras de selección / headhunters.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ACTIVIDAD CENTRAL]
🗣️ Llegamos al final de este módulo. Y no quiero que termines simplemente sabiendo que existen muchos lugares donde buscar trabajo: quiero que termines con algo concreto... tu propio Mapa de Fuentes Laborales.
🏷️ Hito Central: Tu propio Mapa de Fuentes Laborales 🗺️🏆
🔊 Swoosh suave
🗣️ Entrá a los Documentos de esta clase y abrí la herramienta que preparé para este ejercicio: "Mi Mapa de Fuentes Laborales".
🏷️ Documentos: 🗺️ Mi Mapa de Fuentes Laborales 📥📋
🔊 Pop sutil
🖼️ Captura flotante mostrando la plantilla interactiva de 4 cuadrantes organizada para completar.
🗣️ Vamos a dividir nuestro mapa en cuatro categorías clave:
🏷️ Estructura del Mapa en 4 Cuadrantes 📐
🔊 Pop de confirmación

[1:05 - SECCIÓN 2: DESARROLLO — LOS 4 CUADRANTES DE TU MAPA]
🗣️ Primero: Portales de empleo relevantes para mi perfil.
🗣️ No agregues páginas porque sí: seleccioná solamente aquellas que realmente tengan oportunidades relacionadas con lo que buscás, ya sean generales o de nicho.
🏷️ Cuadrante 1: Portales de empleo seleccionados 🏢💻
🔊 Click sutil
🗣️ Segundo: Empresas objetivo.
🗣️ Acá vamos a incorporar las empresas que ya definimos en el primer módulo y los enlaces directos a sus respectivos sitios de empleo o sistemas de talento.
🏷️ Cuadrante 2: Empresas objetivo y sitios de carrera 💼🌐
🔊 Click sutil
🗣️ Tercero: Consultoras y empresas de selección relevantes.
🗣️ Identificá aquellas consultoras o headhunters que trabajen específicamente con tu industria, profesión, seniority o mercado geográfico.
🏷️ Cuadrante 3: Consultoras y Headhunters de tu sector 👥📁
🔊 Click sutil
🗣️ Cuarto: Fuentes especializadas.
🗣️ Acá podés incorporar cámaras, asociaciones, universidades, bolsas sectoriales, comunidades profesionales u otras fuentes que hayas descubierto en la clase anterior.
🏷️ Cuadrante 4: Fuentes especializadas y comunidades 🏛️💬
🔊 Pop de confirmación

[2:25 - SECCIÓN 3: POR QUÉ CADA MAPA ES ÚNICO]
🗣️ Cuando termines, vas a tener algo mucho más valioso que una lista genérica de páginas: vas a tener tu propio ecosistema de búsqueda laboral.
🏷️ Tu propio ecosistema de búsqueda personalizado ✨🧭
🔊 Swoosh suave
🗣️ Y esto es muy importante porque cada persona que está haciendo esta experiencia puede terminar con un mapa completamente diferente.
🗣️ Una persona que busca su primer trabajo probablemente necesite determinadas fuentes... un profesional especializado puede necesitar otras... y alguien que busca oportunidades internacionales posiblemente construya un mapa totalmente distinto.
🏷️ Mapa Adaptado a tu Meta: Primer Empleo · Especialista · Remoto Global 🎯
🔊 Pop sutil
🗣️ Por eso no existe una lista perfecta que funcione para todo el mundo: existe una estrategia de búsqueda adaptada a tu objetivo.
🏷️ Estrategia a Medida de tus Metas 💡
🔊 Click sutil
🗣️ Y recordá que dentro de la Academia también tenés siempre disponible mi Directorio Actualizado de Portales y Recursos, para descubrir nuevas fuentes y agregarlas a tu mapa cada vez que lo necesites.
🏷️ Directorio Actualizado como fuente de consulta continua 🔄📚
🔊 Pop de confirmación

[3:35 - SECCIÓN 4: CIERRE DE MÓDULO Y PUENTE AL MÓDULO 6]
🗣️ Con esto terminamos el Módulo 5. Ya sabemos qué buscamos, tenemos nuestras herramientas profesionales preparadas y ahora también sabemos con precisión dónde detectar oportunidades.
🏷️ Hito: Módulo 05 Completado (¿Dónde encontrar oportunidades laborales?) 🗺️✅
🔊 Pop de confirmación
🗣️ En el próximo módulo vamos a dar el siguiente gran paso: vamos a organizar tu sistema de postulación, armar tu kit profesional y utilizar el Tracker del campus para llevar el control diario de tus procesos.
🏷️ Próximo: Módulo 06 — Postulación y organización 📊📁
🔊 Fin de lección suave`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // MÓDULO 6: DE LA OFERTA A LA POSTULACIÓN (4 CLASES + BONUS)
  // ---------------------------------------------------------------------------
  {
    id: 'exp-mod-6',
    programId: 'exp-busqueda-laboral',
    number: 6,
    title: 'De la oferta a la postulación',
    tagline: 'Aprendé a evaluar una oportunidad, postularte correctamente, registrar el proceso y hacer seguimiento',
    totalDuration: '30 min · 4 clases + Bonus',
    lessons: [
      {
        id: 'exp-pos-01',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-6',
        moduleNumber: 6,
        moduleTitle: 'De la oferta a la postulación',
        lessonNumber: 1,
        type: 'video',
        title: '¿Vale la pena postularme a esta oferta?',
        duration: '6 min',
        videoDuration: '3:45 min',
        completed: false,
        description:
          'Aprendé a evaluar una descripción de puesto, clasificar requisitos en indispensables, importantes y deseables, y tomar decisiones seguras de postulación sin auto-descarte.',
        takeaways: [
          'Las ofertas representan perfiles ideales: casi ningún candidato cumple el 100% de los requisitos solicitados.',
          'Los 3 grupos de requisitos: Indispensables (claves para operar), Importantes (mucho peso pero con margen) y Deseables (suman valor pero no te descalifican).',
          'El análisis correcto: No preguntarte "¿cumplo todo?", sino "¿cumplo lo fundamental para desempeñarme en este puesto?".',
        ],
        actionItems: [
          {
            id: 'act-pos-1-1',
            title: 'Analizar una vacante real en 3 niveles',
            description: 'Elegí una oferta de tu interés y clasificá sus requisitos en indispensables, importantes y deseables.',
          },
        ],
        mindsetPrompt:
          'Si cumplís con lo fundamental y tu experiencia tiene relación con el puesto, no te descartes antes de que el selector evalúe tu perfil.',
        resources: [
          {
            id: 'guia-evaluacion-requisitos-ofertas',
            title: 'Guía de Evaluación de Requisitos y Match Laboral',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 6,
            category: 'Evaluación de Vacantes',
            description: 'Metodología para clasificar requisitos en 3 niveles y checklist de autodiagnóstico previo a la postulación.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y EL DILEMA DEL AUTO-DESCARTE]
🗣️ Encontraste una oferta que te encanta.
🏷️ El Dilema de la Vacante Atractiva 🎯💼
🔊 Swoosh suave
🗣️ Empezás a leer los requisitos y aparece el primer problema: cumplís algunos, otros parcialmente y hay uno o dos que no tenés.
🏷️ "Piden 5 años y tengo 3... ¿Me postulo igual?" ❓⚠️
🔊 Pop sutil
🗣️ Y entonces aparece la pregunta: ¿Me postulo igual o estoy perdiendo el tiempo?
🏷️ ¿Postularme o perder el tiempo? ⏳🤔
🔊 Click sutil
🗣️ Quiero que entiendas algo muy importante: una descripción de puesto representa el perfil ideal que una empresa está buscando, pero casi nunca vas a encontrar un candidato que cumpla absolutamente todos los puntos.
🏷️ La oferta es el "perfil ideal", no una lista excluyente al 100% 🛡️✨
🔊 Pop de confirmación

[1:10 - SECCIÓN 2: DESARROLLO CONCEPTUAL — LOS 3 NIVELES DE REQUISITOS]
🗣️ Lo primero que vamos a hacer es separar los requisitos de cualquier aviso en tres grandes grupos:
🏷️ Los 3 Grupos de Requisitos en un Aviso 📋📐
🔊 Swoosh suave
🗣️ Primero: requisitos indispensables. Son aquellos sin los cuales probablemente no puedas realizar el trabajo diario.
🏷️ 1. Requisitos Indispensables: Centrales para operar ⚙️✅
🔊 Click sutil
🗣️ Por ejemplo: una matrícula habilitante para determinadas profesiones, un idioma necesario para trabajar diariamente con determinado mercado, una licencia específica o conocimientos técnicos centrales para la posición.
🏷️ Ejemplos: Matrícula · Idioma de uso diario · Base técnica central 🌐📄
🔊 Pop sutil
🗣️ Segundo: requisitos importantes. Son conocimientos o experiencias que tienen mucho peso para la posición, pero donde puede existir cierto margen dependiendo del resto de tu perfil.
🏷️ 2. Requisitos Importantes: Peso alto con margen de compensación ⚖️📈
🔊 Click sutil
🗣️ Por ejemplo, si piden cinco años de experiencia y tenés tres, o si piden una herramienta de software que podés aprender rápidamente porque ya dominás herramientas equivalentes.
🏷️ Años de experiencia previa · Herramientas afines 🛠️
🔊 Click sutil
🗣️ Y tercero: requisitos deseables. Son aquellos que suman valor adicional, pero cuya ausencia no necesariamente debería impedirte postularte.
🏷️ 3. Requisitos Deseables: Suman valor, no excluyen 💡⭐
🔊 Pop de confirmación
🗣️ Entonces, cuando encuentres una oferta, no quiero que solamente pienses: "¿Cumplo todo?".
🏷️ De "¿Cumplo todo?" a "¿Cumplo lo fundamental?" 🎯
🔊 Swoosh suave
🗣️ Quiero que analices: "¿Cumplo lo fundamental para poder desempeñarme con solidez en este puesto?".
🏷️ Pregunta Clave: ¿Cumplo lo fundamental para operar? 🚀
🔊 Pop de confirmación

[3:00 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Si cumplís con los requisitos centrales y tu experiencia tiene relación con la posición, no te descartes automáticamente porque haya uno o dos puntos que todavía no tengas.
🏷️ Criterio: No te autoelimines si cumplís lo central 🛡️💪
🔊 Pop sutil
🗣️ En la sección de Documentos te dejé la Guía de Evaluación de Requisitos y Match Laboral para que clasifiques cualquier vacante antes de decidir.
🏷️ Documentos: Guía de Evaluación de Requisitos y Match 📥📋
🔊 Click sutil
🖼️ Captura flotante mostrando la tabla de los 3 niveles de requisitos y checklist interactivo.
🗣️ Ahora sí, una vez que decidimos que una oportunidad tiene sentido para nosotros, en la próxima clase vamos a preparar nuestra postulación profesional.
🏷️ Próxima clase: Cómo hacer una postulación profesional 📝📬
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-pos-02',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-6',
        moduleNumber: 6,
        moduleTitle: 'De la oferta a la postulación',
        lessonNumber: 2,
        type: 'video',
        title: 'Cómo hacer una postulación profesional',
        duration: '7 min',
        videoDuration: '4:00 min',
        completed: false,
        description:
          'El paso a paso para postularte con rigor: utilizar la versión correspondiente de tu CV, respetar el canal solicitado por la empresa y redactar un mensaje de presentación conciso en tres partes.',
        takeaways: [
          'Evitar envíos apresurados: Tómate unos minutos para revisar antes de enviar en lugar de mandar cualquier archivo por impulso.',
          'Respetar el canal oficial: Formularios web, portales corporativos/ATS o correo electrónico según lo requiera la empresa.',
          'Estructura del mensaje en 3 partes: 1) Presentación y puesto, 2) Breve vínculo de experiencia y logros, 3) Cierre con adjunto de CV y disponibilidad.',
          'Checklist pre-envío: Verificar destinatario, asunto profesional, archivos adjuntos y datos de contacto legibles.',
        ],
        actionItems: [
          {
            id: 'act-pos-2-1',
            title: 'Adaptar tu mensaje de presentación en 3 partes',
            description: 'Tomá el modelo de Flor en Documentos y personalizalo para tus próximas postulaciones por correo o nota.',
          },
        ],
        mindsetPrompt:
          'Una postulación profesional no necesita sonar a técnica de venta agresiva: necesita claridad, respeto por el canal y alineación con la vacante.',
        resources: [
          {
            id: 'plantilla-postulacion-profesional-cover-letter',
            title: 'Plantilla de Mensajes de Presentación & Checklist Pre-Envío',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 6,
            category: 'Postulación Profesional',
            description: 'Modelos de mensajes de acompañamiento en 3 partes y lista de control antes de enviar.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y EL ERROR DEL ENVÍO APURADO]
🗣️ Ya decidimos que esta oportunidad tiene sentido para nuestro perfil. Ahora vamos a postularnos.
🏷️ De la Decisión a la Postulación Profesional 🎯📬
🔊 Swoosh suave
🗣️ Y quiero que evites algo que pasa muchísimo: encontrar una vacante interesante y enviar rápidamente cualquier archivo solamente para "no perderla".
🏷️ Error Común: Envío impulsivo de cualquier archivo ❌⚠️
🔊 Pop sutil
🗣️ Antes de hacer clic en enviar, vamos a revisar nuestra postulación con método y cuidado.
🏷️ Método y Rigor antes de hacer clic en enviar 📋✨
🔊 Pop de confirmación

[1:10 - SECCIÓN 2: DESARROLLO CONCEPTUAL — CV, CANALES Y EL MENSAJE EN 3 PARTES]
🗣️ Primero: utilizá la versión correspondiente de tu CV, aplicando todo lo que trabajamos en el Módulo 3.
🏷️ 1. CV Correspondiente: Versión adaptada con palabras clave (Mod. 3) 📄🎯
🔊 Click sutil
🗣️ Segundo: revisá cómo solicita la empresa que realices la postulación. Puede ser mediante un formulario web, un portal corporativo o ATS, o por correo electrónico.
🏷️ 2. Respetar el Canal Solicitado: Portal · Formulario · Email 🌐🏢
🔊 Click sutil
🗣️ Respetá siempre el canal solicitado por la empresa. Si requiere completar un formulario, prestá atención a cada campo y verificá los datos antes de confirmar. Si solicita documentación adicional, adjuntá únicamente lo que corresponda.
🏷️ Completar con atención cada campo y adjuntos solicitados ✍️📁
🔊 Pop sutil
🗣️ Y si la postulación se realiza por correo electrónico, ahí sí tenemos una gran oportunidad para diferenciarnos: el mensaje de presentación.
🏷️ 3. El Mensaje de Presentación por Correo Electrónico 📩⭐
🔊 Swoosh suave
🗣️ No necesitás escribir una carta de una página contando toda tu trayectoria. Podés utilizar una estructura breve y profesional de tres partes:
🏷️ Estructura Breve en 3 Partes 📐
🔊 Click sutil
🗣️ Primero: presentate e indicá para qué posición estás aplicando.
🏷️ Parte 1: Presentación y Puesto Objetivo 👤💼
🔊 Pop sutil
🗣️ Segundo: explicá brevemente por qué tu experiencia o conocimientos tienen relación directa con esa oportunidad.
🏷️ Parte 2: Vínculo de Experiencia y Competencias 📈🤝
🔊 Pop sutil
🗣️ Y tercero: cerrá indicando que adjuntás tu CV y quedás disponible para ampliar información.
🏷️ Parte 3: Mención del CV adjunto y Disponibilidad 📝🤝
🔊 Pop de confirmación
🗣️ Por ejemplo: "Hola, mi nombre es Florencia Martínez y me contacto para postularme a la posición de Especialista en Selección. Cuento con experiencia en atracción de talento y consultoría de RRHH, especialmente vinculada a perfiles técnicos. Adjunto mi CV para su consideración y quedo disponible para ampliar cualquier información. Muchas gracias."
🏷️ Ejemplo: Mensaje profesional, conciso y directo 💬✨
🔊 Swoosh suave
🖼️ Captura flotante mostrando el correo estructurado con los 3 bloques resaltados.
🗣️ No copies exactamente este texto para todas tus búsquedas: utilizalo como estructura base y adaptalo a cada oportunidad.
🏷️ Adaptar la estructura a cada empresa y rol ✍️🎯
🔊 Click sutil
🗣️ Antes de enviar, hacé una última revisión: destinatario correcto, asunto prolijo, archivos adjuntos y datos de contacto. Y recién ahí: enviar.
🏷️ Checklist Pre-Envío: Destinatario · Asunto · Adjunto · Contacto 📬✅
🔊 Pop de confirmación

[3:25 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ En la sección de Documentos te dejé la Plantilla de Mensajes de Presentación y el Checklist Pre-Envío para que lo tengas siempre a mano.
🏷️ Documentos: Plantilla de Mensajes & Checklist Pre-Envío 📥📋
🔊 Pop sutil
🗣️ En la próxima clase vamos a resolver un problema clave: cómo registrar y controlar cada postulación que envíes utilizando el Job Tracker de nuestra Academia.
🏷️ Próxima clase: Registrá tus postulaciones y controlá tu proceso 📊🖥️
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-pos-03',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-6',
        moduleNumber: 6,
        moduleTitle: 'De la oferta a la postulación',
        lessonNumber: 3,
        type: 'video',
        title: 'Gestión de postulaciones con el Job Tracker',
        duration: '6 min',
        videoDuration: '3:30 min',
        completed: false,
        description:
          'Cómo registrar cada oportunidad en el Job Tracker del campus, mantener el orden de tus búsquedas y analizar patrones reales de tu proceso para tomar mejores decisiones.',
        takeaways: [
          'Evitar el descontrol: Centralizar empresa, puesto, fecha, canal de postulación y estado para no olvidar ningún proceso abierto.',
          'El flujo de estados: Actualizar cada proceso a medida que avanza (Postulado → Contactado → Entrevista → Oferta → Cerrado).',
          'Lectura de patrones con criterio: Si no hay respuestas, revisar variables de estrategia; si se frena en entrevistas, trabajar esa instancia sin caer en diagnósticos automáticos o dogmáticos.',
        ],
        actionItems: [
          {
            id: 'act-pos-3-1',
            title: 'Cargar tus postulaciones en el Job Tracker',
            description: 'Ingresá al Tracker del campus y registrá todas las candidaturas activas con sus datos y estados actuales.',
            linkText: 'Ir al Job Tracker del Campus',
            targetView: 'tracker',
          },
        ],
        mindsetPrompt:
          'No se trata de obsesionarse con los números: se trata de dejar de buscar trabajo a ciegas y empezar a tener información sobre nuestro propio proceso.',
        resources: [
          {
            id: 'guia-seguimiento-profesional-protocolos',
            title: 'Guía de Seguimiento Profesional y Protocolos de Recontacto',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 6,
            category: 'Seguimiento & Follow-Up',
            description: 'Protocolos de recontacto y gestión integral del flujo de postulaciones en el Tracker.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y EL PROBLEMA DEL DESCONTROL]
🗣️ Una vez que empezamos a postularnos, aparece un problema nuevo.
🏷️ El Desafío del Seguimiento Múltiple 📋🔄
🔊 Swoosh suave
🗣️ Después de varias semanas podemos tener tantas búsquedas abiertas que empezamos a olvidarnos: ¿Dónde me postulé? ¿Cuándo? ¿Para qué puesto? ¿Me contactaron? ¿Tuve una entrevista?
🏷️ ¿Dónde? · ¿Cuándo? · ¿Para qué puesto? · ¿En qué estado? ❓📁
🔊 Pop sutil
🗣️ Por eso vamos a utilizar el Job Tracker de nuestra Academia.
🏷️ Job Tracker de la Academia: Tu Centro de Control 🖥️✨
🔊 Pop de confirmación
🖼️ Captura en pantalla mostrando la interfaz interactiva del Job Tracker en la barra superior.

[1:05 - SECCIÓN 2: DESARROLLO — REGISTRO DE DATOS Y LECTURA DE PATRONES]
🗣️ Cada vez que realices una postulación, registrá como mínimo: empresa, puesto, fecha, canal de postulación y estado del proceso.
🏷️ Registro Mínimo: Empresa · Puesto · Fecha · Canal · Estado 📝📊
🔊 Click sutil
🗣️ A medida que avances, actualizá el estado en el tablero: Postulado, Contactado, Entrevista, Oferta o Cerrado.
🏷️ Flujo: Postulado ➔ Contactado ➔ Entrevista ➔ Oferta ➔ Cerrado 🔄🏆
🔊 Pop sutil
🗣️ Esto te permite tener toda tu búsqueda organizada en un solo lugar y saber en cualquier momento en qué instancia está cada candidatura.
🏷️ Búsqueda Centralizada y Organizada 📁🎯
🔊 Click sutil
🗣️ Pero además, nos permite observar patrones y aprender de nuestro proceso:
🏷️ Observar Patrones en tu Propio Proceso 🔍💡
🔊 Swoosh suave
🗣️ Si después de varias postulaciones relevantes no estás obteniendo respuestas, podemos revisar diferentes variables de nuestra estrategia, como la adaptación del CV o las palabras clave.
🏷️ Si no hay respuestas: Revisar variables estratégicas y alineación 📄🔍
🔊 Click sutil
🗣️ Si estás llegando a entrevistas pero no avanzás a las siguientes etapas, podemos analizar qué está ocurriendo en esa instancia de conversación.
🏷️ Si llegás a entrevistas: Analizar preparación y comunicación 🎙️💬
🔊 Click sutil
🗣️ No se trata de obsesionarnos con los números. Se trata de dejar de buscar trabajo a ciegas y empezar a tener información sobre nuestro propio proceso.
🏷️ De la Búsqueda a Ciegas a la Información Real 📈✨
🔊 Pop de confirmación

[2:50 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ A partir de ahora, cada postulación que realices, cargala en tu Tracker. Encontrás el acceso directo en el menú superior y en el botón debajo de esta clase.
🏷️ Acción: Cargar tus postulaciones activas en el Tracker 🖥️✅
🔊 Pop sutil
🗣️ En la próxima clase vamos a ver cómo hacer un seguimiento profesional después de postularte o entrevistarte, sin parecer insistente.
🏷️ Próxima clase: Seguimiento después de postularte o entrevistarte ⏱️🤝
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-pos-04',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-6',
        moduleNumber: 6,
        moduleTitle: 'De la oferta a la postulación',
        lessonNumber: 4,
        type: 'video',
        title: 'Seguimiento después de postularte o entrevistarte',
        duration: '6 min',
        videoDuration: '3:45 min',
        completed: false,
        description:
          'El criterio profesional para hacer seguimiento sin invadir: respetar plazos comunicados, redactar mensajes de recontacto con valor y mantener la búsqueda activa en paralelo.',
        takeaways: [
          'El seguimiento requiere criterio: No existen números rígidos universales; lo fundamental es respetar los plazos informados por la empresa.',
          'Recontacto tras entrevista: Si venció el plazo indicado, enviar un mensaje cordial agradeciendo el espacio y consultando novedades sobre el proceso.',
          'Seguimiento tras postulación: Adaptado al canal utilizado y a si disponés de una vía apropiada de contacto (sin perseguir al selector).',
          'Continuar la búsqueda: Una buena conversación no es contratación cerrada; continuá tu proceso y registrá los seguimientos en el Tracker.',
        ],
        actionItems: [
          {
            id: 'act-pos-4-1',
            title: 'Identificar procesos para seguimiento',
            description: 'Revisá tu Tracker, detectá qué postulaciones o entrevistas cumplieron sus plazos y redactá tu mensaje de recontacto.',
          },
        ],
        mindsetPrompt:
          'El objetivo del seguimiento no es perseguir al selector: es reafirmar tu interés con altura profesional mientras continuás en movimiento con tu mapa de búsqueda.',
        resources: [
          {
            id: 'guia-seguimiento-profesional-protocolos',
            title: 'Guía de Seguimiento Profesional y Protocolos de Recontacto',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 6,
            category: 'Seguimiento & Follow-Up',
            description: 'Guía completa de protocolos de recontacto post-postulación y post-entrevista.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y EL DILEMA DEL SEGUIMIENTO]
🗣️ Ya te postulaste. O incluso ya tuviste una entrevista.
🏷️ La Etapa Posterior a la Postulación o Entrevista ⏱️💬
🔊 Swoosh suave
🗣️ Pasaron algunos días y no recibiste novedades. ¿Escribís? ¿Esperás? ¿Vas a parecer insistente?
🏷️ ¿Escribir? ¿Esperar? ¿Parecer insistente? ❓🤔
🔊 Pop sutil
🗣️ Hacer seguimiento no está mal. Lo importante es cuándo y cómo lo hacemos.
🏷️ El Criterio del Seguimiento: Cuándo y Cómo 🎯✨
🔊 Pop de confirmación

[1:05 - SECCIÓN 2: DESARROLLO CONCEPTUAL — RESPETAR PLAZOS Y MENSAJES MODELO]
🗣️ Primero: respetá cualquier plazo que te hayan informado.
🏷️ 1. Respetar los Plazos Informados por la Empresa 📅⏳
🔊 Click sutil
🗣️ Si durante una entrevista te dijeron "vamos a contactarte la próxima semana", esperá hasta que ese plazo haya finalizado antes de escribir.
🏷️ Esperar el vencimiento del plazo comunicado 🛡️
🔊 Pop sutil
🗣️ Si pasó el período indicado y no recibiste novedades, podés enviar un mensaje breve y profesional.
🏷️ 2. Mensaje Breve, Respetuoso y Profesional ✍️🤝
🔊 Click sutil
🗣️ Por ejemplo: "Hola, [Nombre]. ¿Cómo estás? Quería agradecer nuevamente el espacio de la entrevista y consultar si existen novedades respecto del proceso de selección para la posición de [Puesto]. Continúo muy interesada en la oportunidad y quedo disponible si necesitan información adicional. Muchas gracias."
🏷️ Ejemplo de Recontacto Post-Entrevista 💬⭐
🔊 Swoosh suave
🖼️ Captura flotante mostrando el modelo de mensaje de seguimiento en pantalla.
🗣️ Si todavía no tuviste una entrevista y simplemente enviaste una postulación, el seguimiento va a depender del canal utilizado y de si tenés una vía apropiada de contacto.
🏷️ Seguimiento Post-Postulación: Según canal y contacto disponible 📬
🔊 Click sutil
🗣️ No necesitamos perseguir al reclutador: el objetivo es reafirmar nuestro interés de manera profesional.
🏷️ Reafirmar interés con profesionalismo (Sin perseguir) 🎯🛡️
🔊 Pop de confirmación
🗣️ Y mientras esperamos una respuesta, continuamos con nuestra búsqueda.
🏷️ Continuar con la búsqueda en paralelo 🔄🚀
🔊 Swoosh suave
🗣️ Como vimos anteriormente: una buena entrevista o una buena conversación no significa que el proceso esté cerrado. No frenes tu actividad hasta tener una propuesta formal en mano.
🏷️ Ningún proceso está cerrado hasta la propuesta formal 📝🤝
🔊 Click sutil
🗣️ Registrá también estos seguimientos en tu Tracker para saber cuándo y con quién te comunicaste.
🏷️ Registrar seguimientos y fechas en el Tracker 📊✅
🔊 Pop de confirmación

[3:20 - SECCIÓN 3: CIERRE DE MÓDULO Y PUENTE AL MÓDULO 7]
🗣️ Con esto cerramos la secuencia central del Módulo 6: aprendimos a evaluar vacantes, postularnos con rigor, registrar en el Tracker y hacer seguimiento.
🏷️ Hito: Módulo 06 Completado (De la oferta a la postulación) 🏆📋
🔊 Pop de confirmación
🗣️ En el Módulo 7 llega la instancia decisiva: cómo prepararte para la entrevista laboral, responder preguntas difíciles con el Método STAR y negociar tu propuesta económica con total seguridad.
🏷️ Próximo: Módulo 07 — Entrevista Laboral 🎙️💼
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-pos-05',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-6',
        moduleNumber: 6,
        moduleTitle: 'De la oferta a la postulación',
        lessonNumber: 5,
        type: 'video',
        title: '🎁 BONUS: Cómo detectar ofertas laborales sospechosas',
        duration: '6 min',
        videoDuration: '3:30 min',
        completed: false,
        description:
          'Lección especial de seguridad laboral: aprendé a identificar señales de alerta en búsquedas dudosas, proteger tus datos personales y validar la autenticidad de empresas y reclutadores.',
        takeaways: [
          'Las 6 señales de alerta (red flags): Pedidos de dinero, solicitudes prematuras de datos bancarios, dominios dudosos, urgencia desmedida, sueldos fuera de mercado y mensajes no solicitados por canales informales.',
          'Enseñar a verificar: Comprobar el portal de carreras oficial de la empresa, auditar perfiles en LinkedIn y verificar canales corporativos.',
          'Seguridad y tranquilidad: No actuar bajo presión; proteger tu información personal es parte de tu postura profesional.',
        ],
        actionItems: [
          {
            id: 'act-pos-5-1',
            title: 'Consultar la Guía de Seguridad Laboral',
            description: 'Revisá el checklist de verificación ante cualquier propuesta que te genere dudas antes de compartir datos.',
          },
        ],
        mindsetPrompt:
          'En el mercado de empleo, la tranquilidad y la seguridad de tus datos son prioritarias: verificar la autenticidad de una búsqueda demuestra tu madurez profesional.',
        resources: [
          {
            id: 'guia-seguridad-laboral-ofertas-sospechosas',
            title: 'Guía de Seguridad Laboral y Detección de Ofertas Sospechosas',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 6,
            category: 'Seguridad & Verificación',
            description: 'Checklist de alertas rojas y protocolo de verificación de ofertas y selectores.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y SEGURIDAD LABORAL]
🗣️ En esta lección bonus quiero hablarte de un tema fundamental para tu tranquilidad: la seguridad en la búsqueda laboral.
🏷️ 🎁 BONUS: Seguridad Laboral y Detección de Ofertas Sospechosas 🛡️🔍
🔊 Swoosh suave
🗣️ En internet vas a encontrar miles de ofertas reales y valiosas, pero también pueden circular publicaciones dudosas, intermediarios informales o directamente propuestas engañosas.
🏷️ Aprender a verificar con criterio profesional 💡
🔊 Pop sutil
🗣️ Por eso, quiero enseñarte a reconocer las señales de alerta y a verificar la legitimidad de cualquier búsqueda con criterio.
🏷️ Señales de Alerta y Protocolo de Verificación 📋✅
🔊 Pop de confirmación

[1:00 - SECCIÓN 2: DESARROLLO CONCEPTUAL — LAS SEÑALES DE ALERTA Y CÓMO VERIFICAR]
🗣️ Hay señales de alerta que deben hacerte encender las alarmas de inmediato:
🏷️ Principales Red Flags en Búsquedas Laborales ⚠️🚨
🔊 Swoosh suave
🗣️ Primera: solicitudes de dinero. Si te piden pagar por supuestos exámenes médicos, trámites administrativos, capacitaciones iniciales o compra de equipos, desconfiá inmediatamente. Las empresas reales asumen los costos de sus procesos de selección.
🏷️ 1. Solicitudes de dinero para trámites o exámenes 🚫💸
🔊 Click sutil
🗣️ Segunda: pedido prematuro de datos bancarios o confidenciales. Nunca compartas números de tarjeta, claves o copias de documentación sensible en una primera postulación o antes de una entrevista formal.
🏷️ 2. Pedidos prematuros de datos financieros o claves 🔒❌
🔊 Click sutil
🗣️ Tercera: dominios de correo genéricos o identidades dudosas. Si dicen representar a una compañía multinacional pero escriben desde cuentas gratuitas o dominios no oficiales, investigá con cuidado.
🏷️ 3. Dominios genéricos o identidades no verificables 📧⚠️
🔊 Click sutil
🗣️ Cuarta: urgencia extrema y presión para actuar ya. Mensajes que te ofrecen contratación inmediata sin videollamada ni evaluación previa.
🏷️ 4. Presión desmedida y contrataciones instantáneas ⏱️❓
🔊 Click sutil
🗣️ Y quinta: salarios extraordinarios sin requisitos de experiencia. Ofertas de miles de dólares por pocas horas de tareas mínimas suelen esconder mecanismos engañosos.
🏷️ 5. Sueldos exorbitantes sin requisitos claros 📉
🔊 Pop sutil
🗣️ Frente a cualquiera de estas dudas, aplicá un protocolo simple de verificación:
🏷️ Protocolo Simple de Verificación 🔍🏢
🔊 Swoosh suave
🗣️ Ingresá a la web oficial de la empresa y revisá su sección de carreras. Buscá al reclutador en LinkedIn para validar su trayectoria. Y si la oferta no figura en ningún canal oficial o los datos no concuerdan, cuidá tu tiempo y tu seguridad.
🏷️ Web oficial · Perfil de LinkedIn · Canales corporativos 🌐👤
🔊 Pop de confirmación

[2:50 - SECCIÓN 3: CIERRE DE LA LECCIÓN BONUS]
🗣️ En la sección de Documentos te dejé la Guía de Seguridad Laboral y Detección de Ofertas Sospechosas con el checklist completo para consultar cuando lo necesites.
🏷️ Documentos: Guía de Seguridad Laboral 📥📋
🔊 Pop sutil
🖼️ Captura flotante mostrando la guía de prevención y checklist de seguridad.
🗣️ Con todas tus herramientas y precauciones listas, ¡avanzamos al Módulo 7 para dominar las entrevistas cara a cara!
🏷️ ¡Todo listo para el Módulo 07: Entrevista Laboral! 🎙️🚀
🔊 Fin de lección suave`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // MÓDULO 7: ENTREVISTA LABORAL (5 CLASES)
  // ---------------------------------------------------------------------------
  {
    id: 'exp-mod-7',
    programId: 'exp-busqueda-laboral',
    number: 7,
    title: 'Entrevista Laboral',
    tagline: 'Preparate para cada etapa, dominá el Método STAR y negociá tu salario con total seguridad',
    totalDuration: '43 min · 5 clases',
    lessons: [
      {
        id: 'exp-ent-01',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-7',
        moduleNumber: 7,
        moduleTitle: 'Entrevista Laboral',
        lessonNumber: 1,
        type: 'video',
        title: 'Qué pasa realmente en un proceso de entrevistas',
        duration: '8 min',
        videoDuration: '4:15 min',
        completed: false,
        description:
          'Descubrí qué evalúa cada interlocutor (RRHH, Líder de Área / Hiring Manager, Evaluador Técnico) y cómo preparar tu entorno virtual para transmitir máxima solvencia.',
        takeaways: [
          'No todas las entrevistas evalúan lo mismo: RRHH valida ajuste general, motivación, condiciones y cultura; el Líder de Área evalúa si sabés hacer el trabajo y resolver los problemas del equipo.',
          'Si hay prueba técnica o panel con pares, el foco cambia hacia el razonamiento analítico, estructura de trabajo y colaboración.',
          'Error común a evitar: Preparar la entrevista como un examen con respuestas fijas de memoria.',
          'Puesta a punto técnica remota: cámara a la altura de los ojos, iluminación frontal, audio probado sin eco, libreta y agua a mano.',
          'Regla de Oro de este módulo: "No prepares solo respuestas. Prepará tu historia profesional."',
        ],
        actionItems: [
          {
            id: 'act-ent-1-1',
            title: 'Auditar tu setup de videollamada',
            description: 'Hacé una prueba de 2 minutos grabándote con la cámara de tu equipo para verificar encuadre, luz y claridad de audio.',
          },
          {
            id: 'act-ent-1-2',
            title: 'Revisar el Checklist de Fases de Entrevistas',
            description: 'Consultá el documento interactivo para adaptar tu mensaje según el interlocutor de tu próxima llamada.',
          },
        ],
        mindsetPrompt:
          'Una entrevista no es un examen donde tenés que adivinar una respuesta correcta: es una conversación profesional de mutua evaluación para ver si ambos pueden construir valor juntos.',
        resources: [
          {
            id: 'checklist-preparacion-fases-entrevistas',
            title: 'Checklist de Preparación por Fases y Puesta a Punto Virtual',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 7,
            category: 'Entrevistas & Puesta a Punto',
            description: 'Checklist de entorno técnico y matriz de enfoque por interlocutor.',
            isEssential: true,
          },
          {
            id: 'fases-proceso-seleccion',
            title: 'Guía de Fases del Proceso de Selección y Tiempos de Respuesta',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 7,
            category: 'Proceso de Selección',
            description: 'Cronograma típico de etapas, tiempos de respuesta y seguimiento.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ANSIEDAD EN LA ENTREVISTA]
🗣️ Hola a todos. Llegamos a una de las etapas que más ansiedad suele generar en una búsqueda laboral: la entrevista.
🏷️ MÓDULO 07: Entrevista Laboral 🎙️💼
🔊 Swoosh suave
🗣️ Y quiero empezar diciéndote algo que aprendí estando del otro lado, entrevistando candidatos: no todas las entrevistas buscan evaluar lo mismo.
🏷️ No todas las entrevistas buscan evaluar lo mismo 🎯
🔊 Pop sutil
🗣️ Muchas veces una persona tiene una primera entrevista excelente con Recursos Humanos y después siente que la entrevista con su posible jefe fue completamente diferente. Y es normal, porque cada persona que participa del proceso está tratando de responder preguntas diferentes.
🏷️ RRHH vs. Líder de Área vs. Prueba Técnica 👥🔍
🔊 Pop de confirmación

[1:00 - SECCIÓN 2: DESARROLLO CONCEPTUAL — QUÉ EVALÚA CADA INTERLOCUTOR]
🗣️ En una primera llamada o screening, Recursos Humanos normalmente necesita validar cuestiones generales de tu perfil y de la búsqueda.
🏷️ 1. Screening / RRHH: Validación general y cultura 📞📋
🔊 Swoosh suave
🗣️ Puede preguntarte por tu experiencia general, por qué estás buscando un cambio, tu disponibilidad horaria, tu remuneración pretendida y cómo encajás con la cultura de la empresa.
🏷️ Disponibilidad · Rango salarial · Motivación · Encaje cultural 🏢✨
🔊 Click sutil
🗣️ En cambio, el líder del área o tu posible jefe va a evaluar algo completamente distinto: ¿Esta persona realmente sabe hacer el trabajo? ¿Tiene el criterio técnico necesario? ¿Me va a ayudar a resolver los problemas que tengo hoy en el equipo?
🏷️ 2. Líder de Área (Hiring Manager): Criterio y resolución de problemas 🛠️📈
🔊 Pop de confirmación
🗣️ Y si después hay una prueba técnica o una entrevista con pares, el foco vuelve a cambiar hacia la metodología, estructura analítica y trabajo colaborativo.
🏷️ 3. Prueba Técnica / Pares: Razonamiento y trabajo en equipo 💻🤝
🔊 Click sutil
🗣️ Por eso, el error más común es preparar una entrevista como si fuera un examen escolar donde te toman siempre lo mismo.

[2:30 - SECCIÓN 3: PUESTA A PUNTO TÉCNICA DEL ENTORNO VIRTUAL]
🗣️ En esta clase también vamos a ver cómo preparar tu entorno para entrevistas virtuales: cámara, luz, audio y encuadre.
🏷️ Puesta a Punto Virtual: Cámara · Iluminación · Audio 🎥💡🎙️
🔊 Swoosh suave
🗣️ Cámara a la altura de los ojos para mantener contacto visual natural a la lente; fuente de luz suave al frente para que tu rostro se vea nítido sin contraluz; y audio probado previamente sin eco.
🏷️ Contacto visual a la lente · Luz frontal · Audio limpio 👁️✨
🔊 Click sutil
🗣️ Tené a mano un vaso de agua, una libreta física para anotar nombres o dudas clave, y cerrá todas las notificaciones en tu computadora. En una videollamada, estos detalles comunican profesionalismo desde el primer segundo.
🏷️ Libreta física · Vaso de agua · Notificaciones silenciadas 📝🔇
🔊 Pop de confirmación

[3:40 - SECCIÓN 4: REGLA DE ORO Y LLAMADA A LA ACCIÓN]
🗣️ La regla de oro de este módulo que quiero que te grabes es: No prepares solo respuestas. Prepará tu historia profesional.
🏷️ Regla de Oro: "No prepares solo respuestas. Prepará tu historia profesional" 💡🏆
🔊 Swoosh suave
🗣️ En la sección de Documentos tenés el Checklist de Preparación por Fases y Puesta a Punto Virtual para auditar tu setup antes de tu próxima llamada.
🏷️ Documentos: Checklist de Preparación por Fases 📥📋
🔊 Pop sutil
🖼️ Captura flotante mostrando el checklist interactivo de puesta a punto y fases.
🗣️ ¡En la siguiente clase vamos a ver cómo responder de forma impecable a la pregunta que abre casi todas las entrevistas: "Contame sobre vos"!
🏷️ Próxima clase: Cómo responder "Contame sobre vos" y Método STAR 🚀
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-ent-02',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-7',
        moduleNumber: 7,
        moduleTitle: 'Entrevista Laboral',
        lessonNumber: 2,
        type: 'video',
        title: 'Cómo responder "Contame sobre vos" y contar tus logros',
        duration: '9 min',
        videoDuration: '4:45 min',
        completed: false,
        description:
          'Dominá la apertura de 90 segundos con la fórmula en 3 partes, la metodología STAR para preguntas por competencias y tu banco de 5 historias maestras.',
        takeaways: [
          'La pregunta "Contame sobre vos" no es una charla informal ni recitar tu CV: es tu presentación de valor profesional en menos de 2 minutos.',
          'Fórmula en 3 partes: 1) Quién sos hoy y tu especialidad, 2) Tu recorrido con logros concretos, 3) Por qué te entusiasma esta oportunidad puntual.',
          'Metodología STAR para preguntas situacionales: Situación (15%), Tarea (15%), Acción (50% - tus decisiones y herramientas) y Resultado (20% - métricas y aprendizajes).',
          'El 70% de tu tiempo debe concentrarse en la Acción y en el Resultado medible, no en la descripción del problema.',
          'El Banco de 5 Historias Maestras: 1 logro principal, 1 problema resuelto, 1 error del que aprendiste, 1 situación difícil/conflicto y 1 ejemplo de trabajo en equipo o liderazgo.',
        ],
        actionItems: [
          {
            id: 'act-ent-2-1',
            title: 'Redactar tu pitch "Contame sobre vos"',
            description: 'Completá la plantilla en 3 partes y cronometrate para no superar los 90 segundos.',
          },
          {
            id: 'act-ent-2-2',
            title: 'Estructurar tus 5 Historias Maestras STAR',
            description: 'Completá el framework interactivo en la sección de Documentos para tener tus ejemplos listos.',
          },
        ],
        mindsetPrompt:
          'No le pidas al selector que imagine tu potencial: mostrale con hechos y datos concretos cómo ya resolviste situaciones similares en el pasado.',
        resources: [
          {
            id: 'framework-star-entrevistas',
            title: 'Framework STAR y Banco de las 5 Historias Maestras',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 7,
            category: 'Metodología STAR',
            description: 'Estructura en 3 partes para apertura y plantilla de las 5 historias maestras.',
            isEssential: true,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y EL ERROR DE LA APERTURA]
🗣️ Casi todas las entrevistas empiezan con la misma pregunta: "Bueno, contame un poco sobre vos". O su versión parecida: "Haceme un resumen de tu experiencia".
🏷️ Cómo Responder: "Contame sobre vos" 💬🎯
🔊 Swoosh suave
🗣️ Y acá es donde muchísimas personas se pierden: algunos repiten punto por punto todo su CV de memoria; otros empiezan a hablar de cosas personales; y otros se ponen tan nerviosos que dan una respuesta desordenada de cinco minutos.
🏷️ No es charla informal · No es recitar el CV 🚫
🔊 Pop sutil
🗣️ La pregunta "Contame sobre vos" es tu oportunidad de oro para presentar tu perfil profesional en menos de dos minutos y dejar una primera impresión clara, sólida y atractiva.
🏷️ Pitch de Impacto: < 2 minutos estructurados ⏱️✨
🔊 Pop de confirmación

[1:10 - SECCIÓN 2: FÓRMULA EN 3 PARTES PARA "CONTAME SOBRE VOS"]
🗣️ Para responder impecable, vas a usar una estructura en tres partes:
🏷️ Estructura en 3 Partes para la Apertura 📐
🔊 Swoosh suave
🗣️ Primera parte: Quién sos profesionalmente hoy y cuál es tu especialidad principal.
🏷️ 1. Quién sos hoy y tu especialidad principal 👤💼
🔊 Click sutil
🗣️ Segunda parte: Cuál fue tu recorrido profesional, destacando uno o dos logros concretos o proyectos clave donde generaste impacto.
🏷️ 2. Recorrido profesional con logros concretos 📈🏆
🔊 Click sutil
🗣️ Y tercera parte: Por qué te interesa esta oportunidad puntual y cómo tu perfil se conecta con lo que la empresa necesita.
🏷️ 3. Por qué te entusiasma este puesto y empresa 🏢🎯
🔊 Pop de confirmación

[2:20 - SECCIÓN 3: METODOLOGÍA STAR Y EL BANCO DE 5 HISTORIAS MAESTRAS]
🗣️ Pero además, a lo largo de la entrevista van a aparecer preguntas por competencias como: "Contame una vez que tuviste que resolver una crisis" o "Contame cómo manejás la presión".
🏷️ Preguntas por Competencias y Metodología STAR 🌟
🔊 Swoosh suave
🗣️ Acá aplicamos la metodología internacional STAR: Situación, Tarea, Acción y Resultado.
🏷️ S: Situación · T: Tarea · A: Acción · R: Resultado 🧩
🔊 Click sutil
🗣️ Situación: contexto breve en 15 segundos. Tarea: cuál era tu reto específico. Acción: qué decisiones tomaste vos y qué herramientas usaste, concentrando el 50% de tu tiempo. Y Resultado: el impacto medible y qué aprendiste.
🏷️ 70% del tiempo en la ACCIÓN y en el RESULTADO 📊✅
🔊 Pop de confirmación
🗣️ Al responder con STAR, dejás de decir frases genéricas como "soy resolutivo" o "sé trabajar bajo presión" y empezás a demostrarlo con evidencia concreta.
🏷️ Demostrar con hechos, no solo adjetivos 💡
🔊 Click sutil
🗣️ Al terminar esta clase vas a armar tu banco de 5 historias maestras: un logro principal, un problema que resolviste, un error del que aprendiste, una situación difícil o conflicto, y un ejemplo de trabajo en equipo o liderazgo.
🏷️ Las 5 Historias Maestras: Logro · Problema · Error · Conflicto · Equipo 📚⭐
🔊 Pop de confirmación

[4:00 - SECCIÓN 4: EJERCICIO PRÁCTICO Y LLAMADA A LA ACCIÓN]
🗣️ Con estas 5 historias bien preparadas, vas a poder responder prácticamente cualquier pregunta situacional que te hagan en una entrevista.
🏷️ Documentos: Framework STAR y 5 Historias Maestras 📥📋
🔊 Pop sutil
🖼️ Captura flotante mostrando la plantilla interactiva de Historias STAR.
🗣️ Redactá tu pitch de 90 segundos y tus historias en la plantilla del campus. ¡En la siguiente clase vamos a ver cómo responder las preguntas difíciles que realmente aparecen!
🏷️ Próxima clase: Las preguntas difíciles que realmente aparecen 🛡️
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-ent-03',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-7',
        moduleNumber: 7,
        moduleTitle: 'Entrevista Laboral',
        lessonNumber: 3,
        type: 'video',
        title: 'Las preguntas difíciles que realmente aparecen',
        duration: '9 min',
        videoDuration: '4:30 min',
        completed: false,
        description:
          'Aprendé a sortear con madurez y honestidad las preguntas incómodas: motivos de cambio, desvinculaciones o baches laborales, debilidades reales y qué decir cuando no sabés una respuesta.',
        takeaways: [
          'Las 4 Reglas de Oro ante preguntas incómodas: nunca hablar mal de ex empleadores, enfocarte en metas futuras, no usar clichés defensivos y demostrar capacidad de aprendizaje.',
          'Motivos de cambio: explicarlos desde la búsqueda de nuevos desafíos, tecnología o proyectos con mayor impacto.',
          'Desvinculaciones y lagunas laborales: naturalidad y serenidad profesional, destacando proyectos personales, capacitación o redireccionamiento durante el período.',
          'Debilidades y defectos: desterrar "soy perfeccionista" y presentar un área de mejora real junto con el sistema concreto que implementás hoy para gestionarla.',
          'Qué hacer cuando no sabés una respuesta técnica: reconocerlo con honestidad, explicar tu razonamiento deductivo y destacar tu velocidad de aprendizaje.',
        ],
        actionItems: [
          {
            id: 'act-ent-3-1',
            title: 'Preparar tus respuestas a las preguntas difíciles',
            description: 'Utilizá la Guía de Preguntas Difíciles para pulir tu motivo de cambio y tu área de mejora real.',
          },
        ],
        mindsetPrompt:
          'La madurez profesional no se demuestra sabiendo todo ni teniendo una carrera perfecta, sino mostrando cómo asumís responsabilidades y cómo aprendés de cada experiencia.',
        resources: [
          {
            id: 'guia-preguntas-dificiles-entrevista',
            title: 'Guía de Preguntas Difíciles y Respuestas con Madurez Profesional',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 7,
            category: 'Entrevistas Laborales',
            description: 'Guiones modelo y respuestas a las 7 preguntas más complejas del mercado.',
            isEssential: true,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y EL MIEDO A LAS PREGUNTAS INCÓMODAS]
🗣️ En las entrevistas siempre aparecen preguntas que generan incomodidad: "¿Por qué estás buscando un cambio?", "¿Por qué te fuiste de tu último trabajo?", "¿Cuál es tu mayor defecto?" o preguntas sobre momentos donde las cosas no salieron bien.
🏷️ Cómo Responder a las Preguntas Difíciles 🛡️💬
🔊 Swoosh suave
🗣️ El problema no son las preguntas: el problema es que la mayoría de las personas intenta esquivarlas, dar respuestas cliché o ponerse a la defensiva.
🏷️ Evitar clichés y posturas defensivas 🚫
🔊 Pop sutil
🗣️ Por ejemplo, responder "mi mayor defecto es que soy demasiado perfeccionista" ya no convence a ningún entrevistador. Y hablar mal de tu empresa anterior o de tu jefe actual siempre te deja mal parado a vos, nunca a ellos.
🏷️ Jamás hablar mal de ex empleadores · Proyectar madurez 🤝
🔊 Pop de confirmación

[1:15 - SECCIÓN 2: CÓMO RESPONDER MOTIVOS DE CAMBIO Y LAGUNAS LABORALES]
🗣️ Vamos a ver cómo encarar estas preguntas con honestidad, profesionalismo y altura.
🏷️ Motivos de Cambio y Períodos sin Trabajar 🔄
🔊 Swoosh suave
🗣️ Para explicar motivos de cambio: enfocarte siempre en lo que buscás construir hacia adelante. Agradecé lo aprendido en tu puesto actual o anterior, y explicá que sentís haber cumplido una etapa y que buscás nuevos desafíos técnicos o de escala.
🏷️ Motivo de cambio: Enfoque hacia adelante y nuevos desafíos 🚀
🔊 Click sutil
🗣️ Si te preguntan por una desvinculación o un bache laboral: hablalo con naturalidad, sin dramatizarlo ni victimizarte. Si hubo una reestructuración de la empresa, mencionalo claramente y destacá qué hiciste durante ese tiempo: capacitación, proyectos independientes o búsqueda estratégica enfocada.
🏷️ Desvinculaciones y lagunas: Naturalidad y actualización continua 📚✨
🔊 Pop de confirmación

[2:35 - SECCIÓN 3: DEBILIDADES REALES Y QUÉ HACER CUANDO NO SABÉS UNA RESPUESTA]
🗣️ Cuando te pregunten por tu mayor debilidad o defecto: presentá una debilidad real que no sea excluyente para el rol, y lo más importante: explicá qué sistema o hábito concreto usás hoy para mejorarla.
🏷️ Debilidad real + Sistema concreto de mejora 🛠️📈
🔊 Swoosh suave
🗣️ Por ejemplo: "Al principio me costaba delegar tareas en momentos de alta demanda; para gestionarlo, implementé tableros de gestión y checkpoints semanales que me permiten delegar con seguimiento sin sobrecargarme".
🏷️ Ejemplo: De la dificultad al hábito operativo 📋✅
🔊 Click sutil
🗣️ ¿Y qué pasa si te hacen una pregunta técnica o de negocio y no sabés la respuesta?
🏷️ Qué hacer cuando no sabés una respuesta técnica ❓💡
🔊 Pop sutil
🗣️ Pista clave: la honestidad inteligente y la disposición para aprender suman mucho más que inventar. Podés decir: "No trabajé puntualmente con esa herramienta, pero por mi manejo en X entiendo que la lógica pasa por ahí, y tengo gran velocidad para familiarizarme con la documentación en pocos días".
🏷️ Honestidad inteligente + Razonamiento lógico + Curva rápida 🧠⚡
🔊 Pop de confirmación

[3:50 - SECCIÓN 4: GUÍA TÁCTICA Y LLAMADA A LA ACCIÓN]
🗣️ En la sección de Documentos te dejé la Guía de Preguntas Difíciles con respuestas modelo para los 7 escenarios más habituales.
🏷️ Documentos: Guía de Preguntas Difíciles 📥📋
🔊 Pop sutil
🖼️ Captura flotante mostrando las respuestas modelo de la guía.
🗣️ Prepará tus respuestas en voz alta. ¡En la siguiente clase vamos a ver el poder de las preguntas que VOS tenés que hacerle al entrevistador!
🏷️ Próxima clase: Las preguntas que VOS tenés que hacer 🙋‍♂️
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-ent-04',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-7',
        moduleNumber: 7,
        moduleTitle: 'Entrevista Laboral',
        lessonNumber: 4,
        type: 'video',
        title: 'Las preguntas que VOS tenés que hacer',
        duration: '7 min',
        videoDuration: '3:45 min',
        completed: false,
        description:
          'Convertí la entrevista en una evaluación bidireccional: banco de preguntas inteligentes para el selector y el Hiring Manager, y la pregunta maestra de cierre.',
        takeaways: [
          'Una entrevista es una conversación profesional de mutua evaluación, no un interrogatorio unilateral.',
          'Decir "No tengo preguntas, me quedó todo claro" transmite desinterés o falta de visión estratégica.',
          'Preguntas para el Hiring Manager: desafíos prioritarios a 6 meses, definición de éxito a 90 días y dinámica de toma de decisiones.',
          'Preguntas para RRHH: cultura de trabajo cotidiana, oportunidades de crecimiento y próximos pasos del proceso.',
          'La Pregunta Maestra de Cierre: "En base a lo que conversamos hoy, ¿hay algún punto de mi perfil o experiencia que te gustaría que profundice o sobre el que te haya quedado alguna duda?".',
        ],
        actionItems: [
          {
            id: 'act-ent-4-1',
            title: 'Elegir tus 3 preguntas clave para tu próxima entrevista',
            description: 'Seleccioná 2 preguntas de equipo/negocio y la pregunta maestra de cierre de la guía interactiva.',
          },
        ],
        mindsetPrompt:
          'Una buena pregunta comunica tanto o más sobre tu seniority y pensamiento crítico que una respuesta ensayada.',
        resources: [
          {
            id: 'preguntas-inteligentes-candidato-entrevistador',
            title: 'Banco de Preguntas Estratégicas del Candidato al Entrevistador',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 7,
            category: 'Evaluación Bidireccional',
            description: 'Preguntas estratégicas para RRHH, Hiring Manager y pregunta de cierre.',
            isEssential: true,
          },
          {
            id: 'checklist-auditoria-empresas-cultura',
            title: 'Checklist de Auditoría de Empresas y Clima Laboral',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 7,
            category: 'Evaluación de Empresas',
            description: 'Controles para evaluar clima, rotación y cultura antes de aceptar.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y LA OPORTUNIDAD PERDIDA AL FINAL]
🗣️ Hay un momento clave en casi todas las entrevistas que muchos candidatos desaprovechan por completo. Pasa casi al final, cuando el entrevistador te mira y te dice: "Bueno, ¿tenés alguna pregunta para nosotros?".
🏷️ Las Preguntas que VOS tenés que Hacer 🙋‍♀️💼
🔊 Swoosh suave
🗣️ Y la respuesta típica de muchísima gente es: "No, la verdad que no, me quedó todo súper claro". Grave error.
🏷️ "No, me quedó todo claro" = Oportunidad perdida ❌
🔊 Pop sutil
🗣️ Una entrevista no es un interrogatorio donde solo vos tenés que responder: es una conversación profesional bidireccional donde ambas partes están evaluando si tiene sentido trabajar juntas.
🏷️ Conversación Bidireccional de Mutua Evaluación 🔄🤝
🔊 Pop de confirmación
🗣️ Cuando no hacés preguntas, podés transmitir falta de interés, falta de curiosidad o que aceptás cualquier cosa. En cambio, cuando hacés buenas preguntas, demostrás seniority, criterio profesional y un interés genuino en la posición.
🏷️ Demostrar seniority, criterio e interés genuino ✨
🔊 Click sutil

[1:10 - SECCIÓN 2: PREGUNTAS ESTRATÉGICAS PARA EL HIRING MANAGER Y RRHH]
🗣️ En esta clase te voy a enseñar qué tipo de preguntas conviene hacer y cuáles es mejor evitar en una primera instancia.
🏷️ Preguntas Estratégicas según el Evaluador 🎯
🔊 Swoosh suave
🗣️ Al Líder de Área o futuro jefe directo, preguntale por los desafíos reales: "¿Cuáles son los principales retos que tiene el equipo para los próximos 6 meses?" o "¿Cómo evalúan el éxito en esta posición durante los primeros 90 días?".
🏷️ Al Líder: Retos a 6 meses · Éxito a 90 días · Dinámica de equipo 🛠️📊
🔊 Click sutil
🗣️ A Recursos Humanos, preguntale por la cultura cotidiana y los próximos pasos: "¿Cómo describirías la dinámica de trabajo del equipo?" y "¿Cuáles son las siguientes etapas del proceso y tiempos estimados?".
🏷️ A RRHH: Cultura cotidiana · Oportunidades · Próximos pasos 🏢⏳
🔊 Pop de confirmación

[2:30 - SECCIÓN 3: LA PREGUNTA MAESTRA DE CIERRE DE PROFUNDIZACIÓN]
🗣️ Y te voy a dar una pregunta de cierre fundamental que podés usar antes de terminar para no irte con dudas:
🏷️ Pregunta Maestra de Cierre de Profundización 🔑
🔊 Swoosh suave
🗣️ Podés decir: "Antes de terminar, me gustaría consultar: en base a lo que conversamos hoy, ¿hay algún punto de mi perfil o experiencia que te gustaría que profundice o sobre el que te haya quedado alguna duda?".
🏷️ "¿Hay algún punto de mi perfil sobre el que te haya quedado alguna duda?" 💬⭐
🔊 Pop de confirmación
🗣️ Esta sola pregunta te permite aclarar cualquier duda o malentendido en el acto, en lugar de enterarte semanas después.

[3:15 - SECCIÓN 4: LLAMADA A LA ACCIÓN]
🗣️ En la sección de Documentos tenés el Banco de Preguntas Estratégicas listo para consultar.
🏷️ Documentos: Banco de Preguntas Estratégicas 📥📋
🔊 Pop sutil
🖼️ Captura flotante mostrando el listado de preguntas categorizadas.
🗣️ Elegí 3 preguntas para tu próxima entrevista. ¡En la última clase del módulo entramos al tema económico: cómo responder cuánto querés ganar y cómo negociar tu propuesta!
🏷️ Próxima clase: Sueldo y negociación salarial 💰🚀
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-ent-05',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-7',
        moduleNumber: 7,
        moduleTitle: 'Entrevista Laboral',
        lessonNumber: 5,
        type: 'video',
        title: 'Sueldo: qué decir cuando te preguntan cuánto querés ganar',
        duration: '10 min',
        videoDuration: '5:00 min',
        completed: false,
        description:
          'Dominá la conversación económica: cómo calcular tu piso y banda salarial, responder en el screening inicial, manejar la pregunta de salario actual, y evaluar y negociar una oferta formal por escrito.',
        takeaways: [
          'Cálculo de piso salarial no negociable (gastos fijos + ahorro mínimo 15% + impuestos/salud) vs. banda objetivo (piso + 20% a 40%).',
          'Respuesta en el primer screening: dar un rango basado en el mercado y repreguntar con cordialidad por el presupuesto asignado.',
          'Manejo si preguntan "¿Cuánto ganás hoy?": reenfocar cortésmente en el valor y desafíos del nuevo puesto, no en compensaciones previas.',
          'Evaluación del paquete integral: sueldo neto, bonos, cláusulas de ajuste por inflación, salud, vacaciones, equipamiento y modelo contractual.',
          'Protocolo de negociación por escrito: cómo enviar una contrapropuesta respetuosa si los números están cerca.',
          'Regla de Oro Inquebrantable: NUNCA renuncies a tu trabajo actual sin tener la propuesta formal por escrito y debidamente firmada.',
        ],
        actionItems: [
          {
            id: 'act-ent-5-1',
            title: 'Calcular tu piso y banda salarial en la Matriz',
            description: 'Definí tu límite no negociable y tu rango objetivo antes de tu próxima llamada.',
          },
          {
            id: 'act-ent-5-2',
            title: 'Practicar el guion de respuesta salarial',
            description: 'Ensayá la respuesta en voz alta para expresarla con firmeza y naturalidad.',
          },
        ],
        mindsetPrompt:
          'Negociar tu compensación con fundamentos y serenidad no es arrogancia: es el reflejo directo de tu criterio profesional y del valor que aportás al negocio.',
        resources: [
          {
            id: 'matriz-sueldos-negociacion',
            title: 'Matriz de Compensación, Cálculo de Piso y Negociación Salarial',
            type: 'excel',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 7,
            category: 'Negociación & Compensaciones',
            description: 'Calculadora de piso, banda objetivo y plantilla de contrapropuesta por escrito.',
            isEssential: true,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y LA INCOMODIDAD DE HABLAR DE DINERO]
🗣️ Llegamos al tema que más incomodidad suele generar en cualquier proceso de selección: la conversación sobre el dinero.
🏷️ Sueldo: Qué decir cuando te preguntan cuánto querés ganar 💰💼
🔊 Swoosh suave
🗣️ Aparece casi siempre en dos momentos: al principio, cuando te preguntan "¿Cuál es tu remuneración pretendida?", o al final, cuando llega una oferta y hay que evaluarla o negociarla.
🏷️ Screening inicial vs. Oferta final por escrito ⚖️
🔊 Pop sutil
🗣️ Muchas personas cometen uno de dos errores: o tiran un número al azar sin fundamentos y quedan fuera por pedir demasiado, o terminan cobrando muy por debajo de lo que deberían. O se ponen tan incómodos que dicen "lo que ustedes consideren", perdiendo completamente el control de su valor profesional.
🏷️ Evitar números al azar o frases de sumisión 🚫
🔊 Pop de confirmación

[1:15 - SECCIÓN 2: CÁLCULO DE PISO SALARIAL Y GUION PARA EL SCREENING]
🗣️ En esta clase vamos a aprender a manejar la conversación económica con fundamentos y total tranquilidad.
🏷️ Cálculo de Piso Salarial y Banda Objetivo 📊
🔊 Swoosh suave
🗣️ Primero: calculá tu piso salarial no negociable sumando tus costos fijos de vida, cobertura de salud/impuestos y un ahorro mínimo del 15%. A partir de ahí, definís tu banda objetivo entre un 20% y un 40% adicional según la media del mercado.
🏷️ Piso No Negociable vs. Banda Target (+20% a +40%) 🎯💵
🔊 Click sutil
🗣️ Cuando te pregunten en el primer screening telefónico por tu pretensión, respondé siempre con un rango justificado: "En base a las responsabilidades del puesto y la investigación de mercado, mi expectativa se ubica en un rango de X a Y netos mensuales, dependiendo del paquete integral de beneficios. ¿Tienen un presupuesto asignado para el rol?".
🏷️ Guion: Rango justificado + Consulta sobre presupuesto asignado 🗣️📋
🔊 Pop de confirmación

[2:40 - SECCIÓN 3: MANEJO DEL SALARIO ACTUAL Y EVALUACIÓN DEL PAQUETE INTEGRAL]
🗣️ ¿Y cómo manejar la pregunta "¿Cuánto estás ganando hoy?" sin sentirte acorralado?
🏷️ Cómo responder: "¿Cuánto estás ganando hoy?" 🔒
🔊 Swoosh suave
🗣️ Reenfocá la conversación con elegancia: "En mi trabajo actual tengo un esquema acorde a responsabilidades distintas; por eso prefiero enfocarme en los desafíos de esta nueva posición, donde mi expectativa está en el rango de X a Y".
🏷️ Reenfoque elegante en el valor del nuevo puesto 🤝
🔊 Click sutil
🗣️ Cuando llega la oferta, evaluá el paquete completo: no solo el sueldo base neto, sino la moneda de pago, frecuencia de ajuste por inflación, cobertura médica, días libres y modalidad de trabajo.
🏷️ Paquete Total: Neto · Ajustes por inflación · Salud · Modalidad 🏥🏖️
🔊 Pop de confirmación

[3:50 - SECCIÓN 4: NEGOCIACIÓN POR ESCRITO Y LA REGLA DE ORO DE RENUNCIA]
🗣️ Si la oferta está cerca pero necesitás ajustar algún punto, te enseño a enviar una contrapropuesta por escrito profesional y constructiva, agradeciendo la propuesta y fundamentando el ajuste en el impacto que vas a aportar.
🏷️ Contrapropuesta profesional y fundamentada por escrito 📝✉️
🔊 Click sutil
🗣️ Y una regla de oro fundamental que no podés olvidar jamás: Nunca renuncies a tu trabajo actual hasta no tener la propuesta formal por escrito, con todas las condiciones claras y firmada por ambas partes.
🏷️ Regla de Oro: NUNCA renunciar sin propuesta formal FIRMADA ⚠️📄
🔊 Pop de confirmación

[4:30 - SECCIÓN 5: CIERRE TOTAL DEL PROGRAMA Y MÓDULO DE CASOS ESPECIALES]
🗣️ En la sección de Documentos tenés la Matriz de Compensación y Negociación Salarial con la calculadora y los guiones listos.
🏷️ Documentos: Matriz de Negociación Salarial 📥📋
🔊 Pop sutil
🖼️ Captura flotante mostrando la calculadora de bandas y plantilla de contraoferta.
🗣️ ¡Felicitaciones! Con esta clase completaste la ruta troncal de Experiencia Búsqueda Laboral: desde definir tu objetivo, crear tu CV y optimizar LinkedIn, hasta rastrear ofertas, postularte y negociar tus entrevistas con total solidez.
🏷️ ¡Ruta Troncal Completada con Éxito! 🎓🏆🚀
🔊 Fanfarria / Pop de celebración
🗣️ Si en tu camino particular te encontrás con situaciones muy específicas de búsqueda, recordá que tenés a disposición el módulo complementario de casos especiales dentro del campus.
🏷️ Módulo Complementario: Casos Especiales Disponible 💡📚
🔊 Click sutil
🗣️ ¡Te deseo el mayor de los éxitos en tus próximas postulaciones y entrevistas!
🏷️ ¡Muchos éxitos en tu camino profesional! ✨🤝
🔊 Fin de lección suave`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // MÓDULO 8: CASOS ESPECIALES DE BÚSQUEDA (OPTATIVA) (3 CLASES)
  // ---------------------------------------------------------------------------
  {
    id: 'exp-mod-8',
    programId: 'exp-busqueda-laboral',
    number: 8,
    title: 'Casos especiales de Búsqueda (optativa)',
    tagline: 'Estrategias a medida para trabajo remoto internacional, primer empleo y transición de carrera',
    totalDuration: '28 min · 3 clases',
    lessons: [
      {
        id: 'exp-esp-01',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-8',
        moduleNumber: 8,
        moduleTitle: 'Casos especiales de Búsqueda (optativa)',
        lessonNumber: 1,
        type: 'video',
        title: 'Búsqueda de empleo remoto internacional',
        duration: '10 min',
        videoDuration: '4:45 min',
        completed: false,
        description:
          'Criterios de elegibilidad geográfica (worldwide vs. regional), nivel real de inglés, convenciones de CV internacional, esquemas de contratación (Contractor vs. EOR) y prevención de estafas.',
        takeaways: [
          'Trabajo remoto no significa automáticamente elegible desde cualquier país: validar si la búsqueda indica "Remote worldwide", "Remote LATAM" o restricciones legales por país.',
          'Nivel de idioma: indicar un nivel de inglés que puedas defender en la entrevista; si la vacante está en inglés, el screening será en ese idioma.',
          'CV internacional: formato breve, sin fotografía ni datos personales sensibles, adaptado a estándares globales.',
          'Modalidades contractuales: Contractor independiente (B2B) vs. Intermediación por Employer of Record (Deel, Remote) vs. Dependencia local.',
          'Análisis del paquete integral: moneda de pago, costos de transferencia e impuestos, huso horario exigido, días libres y cobertura médica.',
          'Seguridad laboral: verificar dominios corporativos y recordar que NUNCA debés pagar para que una empresa te contrate.',
        ],
        actionItems: [
          {
            id: 'act-esp-1-1',
            title: 'Auditar tu elegibilidad para búsquedas remotas',
            description: 'Utilizá la Guía de Empleo Remoto Internacional para verificar husos horarios, nivel de inglés y esquema contractual antes de postularte.',
          },
        ],
        mindsetPrompt:
          'En el mercado remoto internacional, el objetivo no es solo encontrar una oferta que diga "Remote", sino validar que seas elegible y que las condiciones contractuales y horarias se adapten a tu realidad.',
        resources: [
          {
            id: 'guia-empleo-remoto-internacional',
            title: 'Guía de Empleo Remoto Internacional y Checklist Contractual',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 8,
            category: 'Casos Especiales · Empleo Remoto',
            description: 'Elegibilidad geográfica, esquemas Contractor/EOR y checklist de verificación.',
            isEssential: true,
          },
          {
            id: 'directorio-portales-empleo-remoto',
            title: 'Directorio de Portales de Empleo Remoto Internacional',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 8,
            category: 'Estrategias de Búsqueda',
            description: 'Directorio de plataformas especializadas en trabajo remoto global.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ELEGIBILIDAD GEOGRÁFICA]
🗣️ Hola a todos. Esta clase es específicamente para vos si estás buscando trabajar de manera remota para una empresa del exterior.
🏷️ MÓDULO 08 · Clase 1: Búsqueda de Empleo Remoto Internacional 🌐💻
🔊 Swoosh suave
🗣️ Y quiero empezar aclarando algo fundamental: trabajo remoto no significa automáticamente trabajo desde cualquier parte del mundo.
🏷️ "Remoto" ≠ Elegible desde cualquier país ⚠️
🔊 Pop sutil
🗣️ Muchas veces encontrás una vacante que dice "Remote", cumplís los requisitos, te postulás y descubrís que la empresa solo contrata en EE.UU., Europa o determinados países por cuestiones legales, impositivas u horarias.
🏷️ Razones legales · Fiscales · Horarias · Operativas ⚖️
🔊 Click sutil
🗣️ Por eso, desde Latinoamérica, revisá que la vacante especifique "Remote worldwide", "Remote - LATAM" o "Work from anywhere". Si dice "US only" o "Must be based in...", no es una búsqueda abierta para nuestra región.
🏷️ Buscar: Remote worldwide · Remote LATAM · Work from anywhere 🌎✅
🔊 Pop de confirmación

[1:20 - SECCIÓN 2: IDIOMA, CV INTERNACIONAL Y MODALIDADES CONTRACTUALES]
🗣️ Segundo punto: el idioma. Si la publicación está en inglés, el proceso se evaluará en inglés. No pongas "avanzado" si no podés sostener una conversación fluida; indicá un nivel que realmente puedas defender con soltura.
🏷️ Nivel de idioma real y defendible en entrevista 🗣️🇬🇧
🔊 Click sutil
🗣️ En cuanto al CV: para procesos internacionales utilizá un formato conciso, sin fotografía y sin datos personales sensibles (como DNI, estado civil o dirección física), adaptado al estándar global.
🏷️ CV Internacional: Breve · Sin foto · En inglés si aplica 📄✨
🔊 Pop sutil
🗣️ Y algo crucial que tenés que investigar: ¿Bajo qué modalidad te contratarían?
🏷️ Modalidades de Contratación Internacional 📝
🔊 Swoosh suave
🗣️ Existen tres esquemas principales: Contractor independiente (donde facturás de forma directa y gestionás tus impuestos locales), intermediación por Employer of Record (plataformas como Deel o Remote con nómina local), o entidad legal propia de la empresa en tu país.
🏷️ Contractor B2B · Employer of Record (Deel/Remote) · Dependencia local 💼🏦
🔊 Pop de confirmación

[2:50 - SECCIÓN 3: PAQUETE TOTAL, HUSOS HORARIOS Y PREVENCIÓN DE ESTAFAS]
🗣️ Antes de aceptar cualquier propuesta, evaluá el paquete completo: en qué moneda te pagan, por qué plataforma transfieren, qué sucede con vacaciones y feriados, si hay cobertura médica y cuál es el horario esperado.
🏷️ Moneda · Cobro · Vacaciones · Cobertura · Huso horario 💵🏖️
🔊 Click sutil
🗣️ Recordá que trabajar para otro país puede implicar una diferencia horaria importante: un puesto 100% remoto puede exigir sincronía con el horario laboral de la empresa.
🏷️ Disponibilidad y diferencia horaria sincrónica ⏱️🌎
🔊 Pop sutil
🗣️ Y prestá mucha atención a la seguridad: que una empresa sea extranjera no la hace automáticamente legítima. Verificá perfiles en LinkedIn, dominios oficiales y recordá que NUNCA debés pagar dinero para que te contraten.
🏷️ Seguridad: Verificar dominios · NUNCA pagar por trabajar 🛡️🚫
🔊 Pop de confirmación

[4:00 - SECCIÓN 4: CHECKLIST FINAL Y LLAMADA A LA ACCIÓN]
🗣️ Antes de tu próxima postulación internacional, hacé este chequeo rápido: ¿Aceptan candidatos desde mi país? ¿Cumplo el idioma? ¿Mi CV está adaptado? ¿Puedo trabajar en ese huso horario? ¿Y entiendo la modalidad de contratación?
🏷️ Los 5 Chequeos de Elegibilidad Internacional 📋✅
🔊 Swoosh suave
🗣️ En la sección de Documentos tenés la Guía de Empleo Remoto Internacional con el checklist completo para auditar cada oferta.
🏷️ Documentos: Guía de Empleo Remoto Internacional 📥📋
🔊 Pop sutil
🖼️ Captura flotante mostrando el checklist contractual y de elegibilidad.
🗣️ ¡En la siguiente clase vamos a ver una estrategia concreta para quienes están buscando su primera oportunidad laboral sin experiencia previa!
🏷️ Próxima clase: Cómo postularte sin experiencia previa 🚀
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-esp-02',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-8',
        moduleNumber: 8,
        moduleTitle: 'Casos especiales de Búsqueda (optativa)',
        lessonNumber: 2,
        type: 'video',
        title: 'Cómo postularte sin experiencia previa',
        duration: '9 min',
        videoDuration: '4:15 min',
        completed: false,
        description:
          'Cómo convertir proyectos universitarios, materias, voluntariados y casos prácticos en evidencia sólida de habilidades, y cómo responder en la entrevista con autenticidad.',
        takeaways: [
          'No tener experiencia laboral formal no significa no tener nada que mostrar: tus proyectos, casos académicos, voluntariados y portfolios son tu evidencia práctica.',
          'Buscar vacantes coherentes con el momento profesional: focalizarse en términos como Trainee, Pasantía, Junior, Asistente o Posiciones Iniciales.',
          'Nunca inventar experiencia ni inflar fechas: la solidez se demuestra explicando cómo resolviste problemas en proyectos reales.',
          'Respuesta modelo en entrevista: asumir con total serenidad que buscás tu primera oportunidad formal y conectar tus proyectos y herramientas con los requerimientos del rol.',
          'Tu primer trabajo es una plataforma de aprendizaje: el objetivo es ganar antecedentes, referencias y habilidades para impulsarte.',
        ],
        actionItems: [
          {
            id: 'act-esp-2-1',
            title: 'Identificar 3 habilidades y tu proyecto demostrativo',
            description: 'Elegí una oferta junior y redactá cómo tus proyectos o estudios demuestran tu capacidad práctica en 3 competencias clave.',
          },
        ],
        mindsetPrompt:
          'Si todavía ninguna empresa te dio la oportunidad de demostrar lo que sabés hacer, creá vos mismo la evidencia a través de proyectos, portfolios y casos prácticos.',
        resources: [
          {
            id: 'guia-primer-empleo-sin-experiencia',
            title: 'Guía de Primer Empleo y Conversión de Proyectos en Evidencia',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 8,
            category: 'Casos Especiales · Primer Empleo',
            description: 'Cómo estructurar el CV y defender proyectos prácticos en entrevistas.',
            isEssential: true,
          },
          {
            id: 'guia-cv-segun-perfil',
            title: 'Guía: El CV según tu Perfil y Momento de Carrera',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 3,
            category: 'Estrategia y Posicionamiento',
            description: 'Enfoques de jerarquía para perfiles sin experiencia previa o junior.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y EL DILEMA DEL PRIMER EMPLEO]
🗣️ Esta clase es para vos si abrís una oferta laboral y pensás: "¿Cómo quieren que tenga experiencia si nadie me da mi primera oportunidad?".
🏷️ MÓDULO 08 · Clase 2: Cómo Postularte sin Experiencia Previa 🎓💼
🔊 Swoosh suave
🗣️ Es una situación súper común. Y quiero empezar diferenciando algo fundamental: no tener experiencia laboral formal no significa no tener nada para mostrar.
🏷️ Sin experiencia formal ≠ Sin nada para mostrar 💡
🔊 Pop sutil
🗣️ Pero seamos realistas: si una empresa busca un perfil senior con 5 años liderando equipos, no es la búsqueda indicada para arrancar. Busquemos posiciones coherentes: prestá atención a términos como Trainee, Pasantía, Práctica Profesional, Junior, Asistente o Auxiliar.
🏷️ Posiciones Iniciales: Trainee · Pasantía · Junior · Auxiliar 🎯
🔊 Pop de confirmación

[1:10 - SECCIÓN 2: CÓMO CONVERTIR PROYECTOS EN EVIDENCIA REAL]
🗣️ Ahora aparece la gran pregunta: "¿Qué pongo en el CV si nunca trabajé?".
🏷️ De la Falta de Experiencia a la Evidencia Práctica 📁
🔊 Swoosh suave
🗣️ La regla de oro es: no inventes experiencia, no infles meses y no pongas habilidades que no tenés. Lo que vamos a hacer es encontrar evidencia de lo que sí sabés hacer.
🏷️ No inventar · Mostrar evidencia de lo que sabés hacer 🚫✅
🔊 Click sutil
🗣️ Pensá en tu universidad, colegio técnico, cursos, proyectos personales, voluntariados o trabajos informales. Si estudiaste marketing y armaste una campaña para una materia, eso es un proyecto: ¿qué analizaste?, ¿qué herramientas usaste?
🏷️ Proyectos académicos · Voluntariados · Casos reales · Portfolios 📊
🔊 Pop sutil
🗣️ Si estudiaste comercio exterior y armaste un plan de exportación; si estudiás administración y creaste un dashboard en Excel; si programás o diseñás y tenés un portfolio visible.
🏷️ "¿Cómo puedo demostrar lo que sé hacer antes de que me contraten?" 🧠✨
🔊 Pop de confirmación

[2:30 - SECCIÓN 3: CÓMO RESPONDER EN LA ENTREVISTA Y EXPECTATIVAS]
🗣️ Ahora imaginemos que conseguís una entrevista y te dicen: "Veo que todavía no tenés experiencia previa".
🏷️ Cómo Responder en la Entrevista: "No tenés experiencia" 🗣️💬
🔊 Swoosh suave
🗣️ No te quejes ni intentes esconderlo. Podés responder con total aplomo: "Es cierto, estoy buscando mi primera experiencia formal en el área. Durante mi formación desarrollé proyectos prácticos en X, donde aprendí a utilizar X herramientas. Justamente busco una posición inicial donde aplicar esta base y seguir aprendiendo con el equipo".
🏷️ Respuesta con madurez: Asumir + Mostrar proyectos + Compromiso 🤝⭐
🔊 Pop de confirmación
🗣️ Y algo importante: tu primer trabajo probablemente no sea tu trabajo ideal en salario o puesto soñado. Pero es la plataforma para construir antecedentes, referencias y habilidades que te permitan dar los siguientes pasos.
🏷️ Tu primer trabajo como plataforma de aprendizaje y referencias 🚀📈
🔊 Click sutil

[3:35 - SECCIÓN 4: EJERCICIO PRÁCTICO Y LLAMADA A LA ACCIÓN]
🗣️ Después de esta clase quiero que hagas algo concreto: buscá una oferta junior, identificá las 3 habilidades centrales que piden y preguntate cómo podés demostrar que sabés hacer eso con tus proyectos o estudios.
🏷️ Ejercicio: 3 Habilidades Clave → Tu Proyecto Demostrativo 📝🔍
🔊 Swoosh suave
🗣️ En la sección de Documentos tenés la Guía de Primer Empleo con plantillas y modelos de respuesta listos.
🏷️ Documentos: Guía de Primer Empleo y Proyectos 📥📋
🔊 Pop sutil
🖼️ Captura flotante mostrando la guía y ejemplos de proyectos demostrativos.
🗣️ ¡En la siguiente clase vamos a ver cómo encarar una transición laboral o cambio de carrera sin empezar de cero!
🏷️ Próxima clase: Transición y cambio de carrera 🔄
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-esp-03',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-8',
        moduleNumber: 8,
        moduleTitle: 'Casos especiales de Búsqueda (optativa)',
        lessonNumber: 3,
        type: 'video',
        title: 'Transición y cambio de carrera',
        duration: '9 min',
        videoDuration: '4:30 min',
        completed: false,
        description:
          'Estrategias para cambiar de rol o industria: mapeo de habilidades transferibles, detección de brechas técnicas reales y la fórmula del puente en 3 frases para la entrevista.',
        takeaways: [
          '"No borres tu pasado profesional: tradúcelo": tus años previos son tu diferencial si identificás tus habilidades transferibles (comunicación, análisis, resolución, liderazgo, negociación).',
          'Detección de brechas reales (skills gap): auditar 5 a 10 ofertas del nuevo puesto para capacitarte con foco en herramientas indispensables, no en cursos al azar.',
          'Construir el puente en la entrevista: nunca justificar el cambio desde la queja del trabajo anterior, sino desde la proyección y las acciones de capacitación realizadas.',
          'La Fórmula del Puente en 3 frases: 1) "Vengo de...", 2) "Durante esos años desarrollé...", 3) "Ahora quiero pasar a... y me preparé haciendo...".',
          'Realismo de seniority: evaluar si el cambio requiere ingresar inicialmente en un rol de menor nivel o lateral para consolidar la nueva especialidad.',
        ],
        actionItems: [
          {
            id: 'act-esp-3-1',
            title: 'Completar tu Matriz de Habilidades Transferibles',
            description: 'Escribí tu pitch del puente en 3 frases y mapeá tus competencias anteriores hacia tu nuevo rol objetivo.',
          },
        ],
        mindsetPrompt:
          'Cambiar de carrera no significa empezar de cero: significa lograr que el entrevistador entienda por qué toda tu historia anterior tiene sentido para este nuevo paso.',
        resources: [
          {
            id: 'matriz-habilidades-transferibles-transicion',
            title: 'Matriz de Mapeo de Habilidades Transferibles y Pitch del Puente',
            type: 'excel',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 8,
            category: 'Casos Especiales · Transición Laboral',
            description: 'Mapeo de competencias puente, auditoría de brechas y guion de entrevista.',
            isEssential: true,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y EL PRINCIPIO DE LA TRADUCCIÓN]
🗣️ Esta clase es para una situación diferente: ya tenés experiencia laboral, pero querés trabajar de otra cosa.
🏷️ MÓDULO 08 · Clase 3: Transición y Cambio de Carrera 🔄🚀
🔊 Swoosh suave
🗣️ Quizás trabajaste años en administración y querés pasar a Recursos Humanos; o en atención al cliente y querés entrar a ventas o consultoría; o estudiaste algo nuevo y querés cambiar de rubro.
🏷️ Cambiar de rol o industria con experiencia previa 👥✨
🔊 Pop sutil
🗣️ El dilema típico es mirar el CV y pensar: "Toda mi experiencia es de otra cosa, ¿cómo hago para que me contraten?".
🏷️ Principio Rector: "No borres tu pasado profesional: tradúcelo" 💡
🔊 Pop de confirmación
🗣️ Tus años anteriores no desaparecen: lo que hacemos es identificar tus habilidades transferibles. Si estuviste en atención al cliente, desarrollaste comunicación, manejo de objeciones y negociación. Si fuiste docente, tenés oratoria, liderazgo y diseño pedagógico. No empezás de cero: construís un puente.
🏷️ Habilidades Transferibles: Negociación · Liderazgo · Análisis · Comunicación 🌉
🔊 Click sutil

[1:25 - SECCIÓN 2: DETECCIÓN DE BRECHAS TÉCNICAS Y CAPACITACIÓN CON FOCO]
🗣️ Ahora viene una parte fundamental: buscá entre 5 y 10 ofertas del puesto al que querés pasar y fijate qué conocimientos técnicos se repiten que hoy no tenés.
🏷️ Detección de la Brecha Técnica (Skills Gap) 🔍📊
🔊 Swoosh suave
🗣️ Cambiar de carrera no es solo reformular el CV; puede haber una brecha real: un software específico, una certificación o un método. Ahí sí tiene sentido capacitarte, pero con foco. No hagas 20 cursos dispersos: cubrí la brecha exacta que pide el mercado.
🏷️ Capacitación intencional basada en lo que pide el mercado 🎯📚
🔊 Pop de confirmación

[2:30 - SECCIÓN 3: EL PITCH DEL PUENTE EN 3 FRASES PARA LA ENTREVISTA]
🗣️ ¿Y cómo explicás el cambio en una entrevista cuando te pregunten "¿Por qué querés cambiar de área?"?
🏷️ La Fórmula del Puente en 3 Frases 📐💬
🔊 Swoosh suave
🗣️ Nunca construyas tu respuesta desde la queja o el cansancio de tu trabajo anterior. Construí un puente con esta estructura en 3 frases:
🏷️ 1. Vengo de... · 2. Desarrollé... · 3. Quiero pasar a... y me preparé haciendo... 🗣️✨
🔊 Click sutil
🗣️ Por ejemplo: "Durante los últimos años trabajé en atención al cliente, donde desarrollé una sólida relación comercial y manejo de cuentas. Con el tiempo identifiqué mi vocación hacia las ventas B2B, por lo que me capacité en metodologías de prospección y CRM. Hoy busco sumarme a este equipo para combinar mi experiencia con clientes con estas nuevas herramientas".
🏷️ "Vengo de acá, desarrollé esto, me preparé y ahora voy hacia allá" 🌟
🔊 Pop de confirmación
🗣️ Y seamos realistas: un cambio de carrera puede requerir inicialmente considerar una posición de menor seniority o lateral para consolidarte en el nuevo rubro. Evaluá si estás dispuesto a ese movimiento.
🏷️ Evaluar seniority inicial y movimientos laterales estratégicos ⚖️
🔊 Click sutil

[3:45 - SECCIÓN 4: EJERCICIO PRÁCTICO Y CIERRE]
🗣️ Para terminar, escribí tus 3 frases del puente: "Vengo de...", "Durante esos años desarrollé...", "Ahora quiero pasar a... y me preparé haciendo...".
🏷️ Ejercicio: Redactar tus 3 Frases del Puente 📝🌉
🔊 Swoosh suave
🗣️ En la sección de Documentos tenés la Matriz de Habilidades Transferibles con ejemplos por industria para completar tu ejercicio.
🏷️ Documentos: Matriz de Habilidades Transferibles 📥📋
🔊 Pop sutil
🖼️ Captura flotante mostrando la matriz de mapeo y plantilla del puente.
🗣️ Con esto completamos el módulo de casos especiales. ¡Muchos éxitos en tu camino profesional y en la conquista de tus nuevas metas laborales!
🏷️ ¡Éxitos en tu nueva etapa profesional! 🏆🌟🤝
🔊 Fin de lección suave`,
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

