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
🗣️ Además, a lo largo de mi carrera hice distintas capacitaciones en áreas como logística minera, vinos, inglés, Excel y marketing digital.
🏷️ Logística Minera · Vinos · Inglés · Excel · Marketing Digital 🌐🍷
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
🗣️ Si no sabés qué trabajo elegir, arrancá por esto: agarrá un lápiz y un papel y respondé las siguientes preguntas:
🏷️ Ejercicio Inicial: 4 Preguntas Clave 📝✨
🔊 Swoosh suave
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
🗣️ En la próxima clase vamos a analizar los 5 errores típicos que se cometen al buscar trabajo y cómo estructurar tu plan de acción semanal para mantener la constancia.
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
🗣️ Con esto terminamos el segundo módulo. Ya entendemos cómo funciona el mercado y cómo organizarnos. En el próximo módulo vamos a trabajar una de las herramientas más importantes de nuestra búsqueda: tu CV.
🏷️ Hito: Módulo 02 Completado (¿Cómo funciona la búsqueda laboral?) ✅🏆
🔊 Pop de confirmación
🗣️ En el próximo módulo vamos a trabajar la creación y optimización de tu CV de alto impacto.
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
🗣️ En la próxima clase vamos a ver qué son los filtros ATS y cómo leer un aviso laboral para hacer match con las palabras clave exactas que busca el reclutador.
🏷️ Próxima clase: Filtros ATS y cómo hacer match con el aviso 🤖🎯
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
🗣️ En la próxima clase vamos a ver cómo estructurar tu currículum según el momento exacto de tu carrera: sin experiencia previa, experiencia media o nivel senior.
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
🗣️ En la próxima clase vamos a construir el CV juntos paso a paso: datos personales, la foto profesional, perfil profesional, educación y habilidades.
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
🗣️ Y en los datos de contacto incluí únicamente lo indispensable: teléfono con código de país, email profesional, ciudad y tu link actualizado a LinkedIn. Eliminamos datos innecesarios como DNI, estado civil o dirección física completa.
🏷️ Contacto Útil: Teléfono · Mail · Ciudad · LinkedIn (Sin DNI ni estado civil) 📬
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
🗣️ Andá a la sección de Documentos de esta clase, descargá tu Plantilla de CV en Word o Notion y completá estos primeros tres bloques.
🏷️ Documentos: Plantilla Oficial de CV en Word & Notion 📥📄
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

[5:15 - SECCIÓN 3: CIERRE DE MÓDULO Y TRANSICIÓN]
🗣️ En la sección de Documentos de esta clase tenés el Diccionario de 100 Verbos de Acción y el Checklist de Auditoría Pre-Envío para validar tu archivo final.
🏷️ Documentos: Checklist de Auditoría y Diccionario de Verbos 📋📥
🔊 Pop sutil
🗣️ Con esto completamos el Módulo 3: tenés un currículum moderno, adaptado a filtros ATS y enfocado en resultados.
🏷️ Hito: Módulo 03 Completado (Creación y mejora de CV) 📄🏆
🔊 Pop de confirmación
🗣️ En el próximo módulo vamos a trabajar en tu perfil de LinkedIn para que los reclutadores y empresas empiecen a encontrarte a vos.
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
🗣️ En la siguiente clase vamos a optimizar tu experiencia laboral y la estrategia de recomendaciones.
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
🗣️ Con esto completamos el Módulo 4: tu perfil de LinkedIn está optimizado y tenés las herramientas para generar visibilidad y contactos estratégicos.
🏷️ Hito: Módulo 04 Completado (LinkedIn Estratégico) 🌐🏆
🔊 Pop de confirmación
🗣️ En el próximo módulo vamos a expandir tu búsqueda a otros canales: portales de empleo, plataformas remotas internacionales y consultoras de selección.
🏷️ Próximo: Módulo 05 — Dónde buscar ofertas 🗺️💼
🔊 Fin de lección suave`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // MÓDULO 5: DÓNDE BUSCAR OFERTAS (4 CLASES)
  // ---------------------------------------------------------------------------
  {
    id: 'exp-mod-5',
    programId: 'exp-busqueda-laboral',
    number: 5,
    title: 'Dónde buscar ofertas',
    tagline: 'Dominá el mapa de portales de empleo y descubrí vacantes ocultas antes que la competencia',
    totalDuration: '24 min · 4 clases',
    lessons: [
      {
        id: 'exp-dnd-01',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-5',
        moduleNumber: 5,
        moduleTitle: 'Dónde buscar ofertas',
        lessonNumber: 1,
        type: 'video',
        title: 'Portales de empleo y consultoras',
        duration: '6 min',
        videoDuration: '3:45 min',
        completed: false,
        description:
          'Dónde buscar según tu perfil: bolsas masivas de Sudamérica, plataformas de trabajo remoto internacional en USD y consultoras.',
        takeaways: [
          'Los 3 canales principales: Bolsas masivas líderes (Computrabajo, Indeed, Bumeran), portales de trabajo remoto global (Wellfound, RemoteOK, Torre) y consultoras de headhunting.',
          'Estrategia pan-regional: Enfocar la búsqueda en las plataformas líderes según si buscás rol local corporativo o trabajo remoto internacional en USD.',
          'Automatización con alertas inteligentes: Configurar filtros exactos por correo para que las vacantes lleguen a tu bandeja de entrada sin scrolling manual.',
        ],
        actionItems: [
          {
            id: 'act-dnd-1-1',
            title: 'Consultar el Directorio de Portales en Documentos',
            description: 'Revisá el listado interactivo con enlaces directos a las plataformas líderes del mercado.',
          },
          {
            id: 'act-dnd-1-2',
            title: 'Configurar 3 alertas automáticas de empleo',
            description: 'Activá filtros por cargo y modalidad en los portales seleccionados para tu perfil.',
          },
        ],
        mindsetPrompt:
          'Postularte en diez portales al azar genera dispersión: el secreto está en elegir los dos o tres canales donde realmente contratan tu especialidad.',
        resources: [
          {
            id: 'directorio-portales-empleo-remoto',
            title: 'Directorio de Portales de Empleo y Consultoras de Selección',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 5,
            category: 'Directorio',
            description: 'Listado actualizado con enlaces directos a bolsas de empleo en Sudamérica, plataformas de trabajo remoto en USD y consultoras.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ No todas las plataformas de empleo sirven para todos los perfiles.
🏷️ Estrategia de Canales: Dónde está tu rol objetivo 🗺️🎯
🔊 Swoosh suave
🗣️ Si estás buscando un puesto remoto internacional o una posición ejecutiva en portales locales generalistas, estás perdiendo tiempo y energía valiosa.
🏷️ El error de buscar en plataformas equivocadas ⏱️⚠️
🔊 Pop sutil
🖼️ Placa comparativa mostrando: Portales Masivos Locales vs. Plataformas Remotas Globales vs. Consultoras de Selección.
🗣️ En esta clase vamos a mapear los tres grandes canales del mercado laboral para que sepas exactamente en qué plataformas enfocarte y cómo automatizar alertas inteligentes.
🏷️ Mapa del Mercado: Bolsas Locales · Remoto USD · Consultoras 🏢🌐
🔊 Pop de confirmación

[1:15 - SECCIÓN 2: DESARROLLO CONCEPTUAL — CANALES EN SUDAMÉRICA Y PLATAFORMAS REMOTAS]
🗣️ Para ordenar tu búsqueda vamos a dividir las plataformas en tres grandes canales según tu objetivo:
🗣️ Primero, las bolsas de empleo masivas líderes en toda la región, como Computrabajo, Indeed, Bumeran, Laborum o Multitrabajos, ideales para puestos presenciales, híbridos o empresas corporativas tradicionales de tu país.
🏷️ 1. Bolsas Líderes en Sudamérica: Computrabajo · Indeed · Bumeran · Laborum 🏢🌎
🔊 Swoosh suave
🗣️ Segundo, los portales de nicho y trabajo remoto global como Wellfound, RemoteOK, Torre o We Work Remotely, si tu objetivo es trabajar para startups, el sector digital o cobrar en dólares desde cualquier lugar de Latinoamérica.
🏷️ 2. Portales Remotos Globales (USD): Wellfound · RemoteOK · Torre 🌐💵
🔊 Click sutil
🖼️ Captura flotante mostrando plataformas de trabajo remoto internacional con salarios en USD.
🗣️ Y tercero, las consultoras de selección y agencias de headhunting internacionales como PageGroup, Randstad, Adecco o Hays, donde lo importante es registrar tu perfil en su base de datos interna y conectar con sus recruiters.
🏷️ 3. Consultoras de Selección & Headhunters: Carga en Base Interna 👥📁
🔊 Click sutil
🗣️ Tené en cuenta que estas plataformas son las más activas a mediados de 2026, pero el mercado digital evoluciona constantemente:
🗣️ Por eso, en la sección de Documentos de esta clase tenés el Directorio de Portales de Empleo con el listado completo y actualizado con los enlaces directos.
🏷️ Documentos: Directorio Actualizado de Portales & Consultoras 📥🗺️
🔊 Pop sutil
🖼️ Captura flotante del directorio interactivo in-app clasificado por país y modalidad.
🗣️ Y para no perder horas abriendo diez sitios web todos los días, configurá alertas inteligentes por correo con tu cargo y modalidad: dejá que las vacantes lleguen a tu bandeja de entrada de forma automática.
🏷️ Automatización: Alertas Inteligentes por Correo 📬⚙️
🔊 Pop de confirmación

[4:40 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ En la próxima clase vamos a ir un paso más allá de los portales:
🗣️ Te voy a enseñar cómo hacer búsquedas avanzadas con comandos en Google para encontrar ofertas ocultas y cómo aprovechar comunidades profesionales para enterarte antes que nadie.
🏷️ Próxima clase: Búsquedas avanzadas en Google y comunidades 🔍🌐
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-dnd-02',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-5',
        moduleNumber: 5,
        moduleTitle: 'Dónde buscar ofertas',
        lessonNumber: 2,
        type: 'video',
        title: 'Búsquedas avanzadas en Google y comunidades',
        duration: '7 min',
        videoDuration: '3:40 min',
        completed: false,
        description:
          'Cómo utilizar comandos booleanos avanzados en Google para acceder a vacantes en portales ATS de empresas sin publicidad.',
        takeaways: [
          'Comandos clave de Google: `site:greenhouse.io "[puesto]" "[remoto]"`, `site:lever.co`, `site:ashbyhq.com`, `site:workday.com`.',
          'Comunidades profesionales en Slack, Discord y Telegram donde se comparten vacantes en tiempo real antes de llegar a los portales.',
          'Ventaja competitiva: Postularse de forma temprana cuando compiten menos de 10 candidatos en lugar de cientos en un portal masivo.',
        ],
        actionItems: [
          {
            id: 'act-dnd-2-1',
            title: 'Probar comandos de búsqueda en Google',
            description: 'Copiá la sintaxis de la clase y rastreá vacantes directas en software ATS para tu cargo.',
          },
          {
            id: 'act-dnd-2-2',
            title: 'Unirte a una comunidad profesional',
            description: 'Sumate a al menos un canal o grupo de tu especialidad en Slack, Discord o Telegram.',
          },
        ],
        mindsetPrompt:
          'Las mejores oportunidades no siempre tienen publicidad: con los comandos adecuados podés acceder a vacantes donde casi no hay competencia.',
        resources: [
          {
            id: 'comandos-busqueda-avanzada-google',
            title: 'Comandos de Búsqueda Avanzada en Google (CheatSheet)',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 5,
            category: 'Guía de Comandos',
            description: 'Plantilla con sintaxis booleanas listas para copiar y pegar en Google para rastrear software ATS.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ Las mejores oportunidades laborales suelen ser las que casi nadie ve en los portales masivos.
🏷️ Vacantes Ocultas en Software de Selección 🔍⚙️
🔊 Swoosh suave
🗣️ Muchas empresas publican sus búsquedas directamente en sus propios sistemas internos y no pagan cientos de dólares por publicitar el aviso en bolsas de empleo tradicionales.
🏷️ Avisos Directos en Greenhouse · Lever · Ashby · Workday 🏢
🔊 Pop sutil
🖼️ Placa comparativa: 800 postulantes en portal masivo vs. 8 postulantes en el ATS directo de la empresa.
🗣️ En esta clase te voy a enseñar cómo rastrear estas ofertas ocultas desde el buscador y cómo sumarte a comunidades de tu industria donde se comparten oportunidades en tiempo real.
🏷️ Búsqueda Avanzada + Comunidades Profesionales 🚀💬
🔊 Pop de confirmación

[1:30 - SECCIÓN 2: DESARROLLO CONCEPTUAL — OPERADORES DE BÚSQUEDA Y COMUNIDADES]
🗣️ Para encontrar estas publicaciones vamos a usar los comandos avanzados de Google:
🗣️ Escribiendo el operador 'site:' seguido del dominio del software de selección, le indicamos que busque exclusivamente dentro de las páginas de carreras de las empresas.
🏷️ 1. Operador 'site:' -> Buscar en Greenhouse · Lever · Ashby 🔍🖥️
🔊 Swoosh suave
🖼️ Video flotante mostrando la barra de Google con el comando \`site:greenhouse.io "Supply Chain Analyst" "Remote"\`.
🗣️ Agregá tu puesto objetivo entre comillas exactas y sumale palabras como 'remoto', 'Latam' o el nombre de tu país para filtrar las vacantes compatibles.
🏷️ Sintaxis: site:lever.co "[Tu Puesto]" "Remoto" ⌨️🎯
🔊 Click sutil
🗣️ En la sección de Documentos te dejo la lista completa de comandos listos para copiar, pegar y reemplazar con tu cargo.
🏷️ Documentos: Comandos Avanzados de Búsqueda 📋📥
🔊 Pop sutil
🗣️ La segunda gran fuente son las comunidades profesionales en Slack, Discord o Telegram:
🗣️ Grupos de diseño, tecnología, ventas B2B o logística donde los líderes de equipo publican vacantes directas y piden recomendaciones antes de abrir los procesos formales.
🏷️ 2. Comunidades en Slack / Discord: Vacantes Tempranas en Tiempo Real 💬🌐
🔊 Pop de confirmación

[5:30 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Probá los comandos en Google con tu cargo objetivo y unite a un grupo de tu especialidad.
🏷️ Búsqueda Avanzada + Red en Comunidades 🚀
🔊 Pop sutil
🗣️ En la próxima clase vamos a analizar señales tempranas de contratación y cómo hacer postulaciones espontáneas de alto impacto.
🏷️ Próxima clase: Detección de búsquedas no publicadas 🎯
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-dnd-03',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-5',
        moduleNumber: 5,
        moduleTitle: 'Dónde buscar ofertas',
        lessonNumber: 3,
        type: 'video',
        title: 'Cómo detectar búsquedas no publicadas',
        duration: '5 min',
        videoDuration: '3:15 min',
        completed: false,
        description:
          'Señales tempranas de expansión que indican futuras contrataciones antes de que se publiquen avisos oficiales.',
        takeaways: [
          'Identificar rondas de inversión, apertura de mercados y nombramientos de directores en medios y redes de negocios.',
          'La postulación espontánea de alto valor enfocada en resolver los nuevos desafíos de la de la empresa en expansión.',
          'Llegar antes de la publicación masiva para iniciar conversaciones directas con líderes de área.',
        ],
        actionItems: [
          {
            id: 'act-dnd-3-1',
            title: 'Mapear 2 empresas en expansión',
            description: 'Identificá organizaciones de tu sector con noticias de crecimiento reciente y sumalas a tu lista.',
          },
          {
            id: 'act-dnd-3-2',
            title: 'Localizar al líder de área en LinkedIn',
            description: 'Detectá al responsable del equipo de tu especialidad para proyectar un contacto de valor.',
          },
        ],
        mindsetPrompt:
          'Los profesionales más cotizados no esperan a que salgan los avisos: detectan las empresas que están creciendo y se presentan en el momento justo.',
        resources: [],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ Esperar a que una vacante se publique en un portal significa competir desde el inicio con cientos de personas.
🏷️ El Riesgo de Postularse Tarde en Procesos Masivos ⚠️
🔊 Swoosh suave
🗣️ Los profesionales más cotizados no esperan a que salgan los avisos: detectan las empresas que están creciendo y se presentan en el momento justo.
🏷️ Prospección Estratégica en Empresas en Escala 🚀
🔊 Pop sutil
🗣️ Vamos a ver cuáles son las fuentes de información clave para anticiparte a las contrataciones y abrir tus propias oportunidades.
🏷️ Fuentes de Inteligencia de Mercado & Negocios 🌐💼
🔊 Pop de confirmación

[1:10 - SECCIÓN 2: DESARROLLO CONCEPTUAL — LAS 3 SEÑALES Y EL CONTACTO ESPONTÁNEO]
🗣️ Para detectar estas oportunidades monitoreamos tres señales clave en medios de negocios y redes profesionales:
🗣️ Primero, empresas que reciben rondas de inversión o financiamiento para escalar sus operaciones.
🏷️ 1. Señal: Rondas de Inversión y Financiamiento 💵📈
🔊 Swoosh suave
🖼️ Captura flotante mostrando noticias de negocios y portales de inversión.
🗣️ Segundo, anuncios de apertura de oficinas, nuevas líneas de producto o desembarco en otros países.
🏷️ 2. Señal: Expansión a Nuevos Mercados y Proyectos 🌎🏢
🔊 Click sutil
🗣️ Y tercero, el nombramiento de nuevos directores o líderes de área, quienes en sus primeros tres meses siempre buscan sumar talento de confianza a sus equipos.
🏷️ 3. Señal: Nuevos Líderes y Directores de Área 👥⭐
🔊 Click sutil
🗣️ Cuando detectás cualquiera de estas tres señales, identificás al responsable en LinkedIn y le enviás un mensaje felicitándolo por el hito y contándole en dos líneas cómo tu experiencia puede resolver los nuevos desafíos del área.
🏷️ Contacto Espontáneo: Felicitación + Propuesta de Solución 💬🎯
🔊 Pop de confirmación

[4:00 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Tu tarea en esta clase es identificar dos empresas de tu sector que hayan anunciado expansiones recientes y agregarlas a tu lista de prospección.
🏷️ Acción: 2 Empresas en Expansión a tu Lista 📋🏢
🔊 Swoosh suave
🗣️ En la próxima clase cerramos este módulo con un paso crítico: cómo investigar la cultura, reputación y clima laboral de una empresa antes de enviar tu postulación.
🏷️ Próxima clase: Investigación previa de empresa y cultura 🔍🛡️
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-dnd-04',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-5',
        moduleNumber: 5,
        moduleTitle: 'Dónde buscar ofertas',
        lessonNumber: 4,
        type: 'video',
        title: 'Investigación previa de empresa y cultura',
        duration: '6 min',
        videoDuration: '3:35 min',
        completed: false,
        description:
          'Cómo evaluar la reputación, salud financiera, rotación de personal y bandas salariales antes de postularte.',
        takeaways: [
          'La búsqueda laboral es un proceso de doble vía: mientras la empresa te evalúa, vos también debés auditar si la cultura y el clima son saludables.',
          'Los 3 pilares de la Auditoría Express (10 min): Reseñas en Glassdoor/Openqube, tiempo de permanencia del equipo en LinkedIn y bandas salariales.',
          'Usar los datos para formular preguntas clave e inteligentes durante las entrevistas con el líder de área.',
        ],
        actionItems: [
          {
            id: 'act-dnd-4-1',
            title: 'Auditar 1 empresa objetivo',
            description: 'Revisá las opiniones en Glassdoor, la rotación en LinkedIn y el rango salarial estimado.',
          },
          {
            id: 'act-dnd-4-2',
            title: 'Formular 2 preguntas de clima para la entrevista',
            description: 'Anotá dudas puntuales sobre los desafíos y dinámica del equipo para consultar al Hiring Manager.',
          },
        ],
        mindsetPrompt:
          'El objetivo de una búsqueda laboral no es conseguir cualquier trabajo: es encontrar un lugar donde reconozcan tu valor, paguen acorde y cuiden tu bienestar.',
        resources: [
          {
            id: 'checklist-auditoria-empresas-cultura',
            title: 'Checklist de Auditoría de Empresas y Clima Laboral',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 4,
            category: 'Checklist de Control',
            description: 'Checklist rápido de 3 pasos para investigar la salud financiera, rotación y clima de una empresa.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ Una búsqueda laboral exitosa no consiste en conseguir cualquier trabajo: el objetivo es conseguir un empleo donde reconozcan tu valor, paguen acorde al mercado y cuiden tu bienestar.
🏷️ Búsqueda Estratégica: Empleo Saludable + Buena Remuneración 🛡️💼
🔊 Swoosh suave
🗣️ Recordá siempre que un proceso de selección es de doble vía: mientras la empresa te evalúa, vos también tenés que auditar a la empresa.
🏷️ Evaluación Mutua: Vos también elegís dónde trabajar ⚖️
🔊 Pop sutil
🖼️ Placa comparativa mostrando: Postulación a ciegas vs. Postulación auditada con información previa.
🗣️ En esta clase te voy a enseñar una auditoría rápida de diez minutos para revisar la reputación, rotación de personal y clima laboral de cualquier organización antes de postularte.
🏷️ Auditoría Express: Reputación · Clima · Rotación 🔍📊
🔊 Pop de confirmación

[1:15 - SECCIÓN 2: DESARROLLO CONCEPTUAL — AUDITORÍA EXPRESS DE 3 PASOS]
🗣️ Para auditar una empresa antes de avanzar, aplicamos tres pasos muy simples en diez minutos:
🗣️ Primero, revisá las opiniones de empleados en plataformas como Glassdoor u Openqube, buscando patrones repetitivos sobre liderazgo, beneficios y cumplimiento de acuerdos.
🏷️ 1. Reseñas Reales: Glassdoor · Openqube · Opiniones 💬⭐
🔊 Swoosh suave
🖼️ Captura flotante mostrando un perfil de empresa en Glassdoor con la puntuación y comentarios destacados.
🗣️ Segundo, entrá al perfil de la empresa en LinkedIn y hacé clic en la pestaña de 'Personas' para observar la antigüedad del equipo:
🗣️ Si la mayoría renuncia antes del año, hay una señal de alerta; pero si la permanencia promedio es de dos a cuatro años, es síntoma de estabilidad y crecimiento.
🏷️ 2. Rotación en LinkedIn: Pestaña 'Personas' y Tiempo de Permanencia 👥⏱️
🔊 Click sutil
🗣️ Y tercero, consultá las estimaciones salariales para asegurarte de que la compañía pague tarifas acordes a tus límites no negociables.
🏷️ 3. Bandas Salariales: Validación con tu Piso Salarial 💵📊
🔊 Click sutil
🗣️ Esta información no solo te protege de ambientes conflictivos, sino que te da argumentos sólidos para hacer preguntas inteligentes cuando te entrevistes con el líder de área.
🏷️ Postura Profesional: Preguntas Clave en la Entrevista 🎯🤝
🔊 Pop de confirmación

[4:45 - SECCIÓN 3: CIERRE DE MÓDULO Y LLAMADA A LA ACCIÓN]
🗣️ Tu tarea en esta clase es elegir una de las empresas de tu lista de objetivos y realizarle esta auditoría rápida de diez minutos antes de postularte.
🏷️ Acción: Auditar 1 Empresa Target (Opiniones + Rotación) 🔍🏢
🔊 Swoosh suave
🗣️ Con esto completamos el Módulo 5: ahora tenés el mapa completo de dónde buscar, cómo rastrear vacantes ocultas y cómo elegir empresas que realmente valgan la pena.
🏷️ Hito: Módulo 05 Completado (Dónde buscar ofertas) 🗺️✅
🔊 Pop de confirmación
🗣️ En el Módulo 6 vamos a organizar tu sistema de postulación: armaremos tu kit profesional y utilizaremos el Tracker del campus para llevar el control diario de cada proceso y sus recordatorios de seguimiento.
🏷️ Próximo: Módulo 06 — Postulación y organización 📊📁
🔊 Fin de lección suave`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // MÓDULO 6: POSTULACIÓN Y ORGANIZACIÓN (4 CLASES)
  // ---------------------------------------------------------------------------
  {
    id: 'exp-mod-6',
    programId: 'exp-busqueda-laboral',
    number: 6,
    title: 'Postulación y organización',
    tagline: 'Sistematizá tu seguimiento con el Tracker del campus, armá tu kit y gestioná recordatorios',
    totalDuration: '23 min · 4 clases',
    lessons: [
      {
        id: 'exp-pst-01',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-6',
        moduleNumber: 6,
        moduleTitle: 'Postulación y organización',
        lessonNumber: 1,
        type: 'video',
        title: 'Kit de postulación y cover letters',
        duration: '7 min',
        videoDuration: '3:45 min',
        completed: false,
        description:
          'La combinación exacta de materiales según el canal: CV, Carta de Presentación concisa, Portfolio de proyectos y mensaje de acompañamiento.',
        takeaways: [
          'Estructura del Kit de Postulación: CV adaptado en PDF, Carta de Presentación de 3 párrafos y enlaces a LinkedIn/Portfolio.',
          'Fórmula de la Carta de 3 Párrafos: Gancho y puesto + Logro concreto con métricas + Llamada a la acción con disponibilidad.',
          'Asunto de correo profesional: `Postulación [Puesto] - [Nombre y Apellido] | [Herramienta Clave]` para asegurar lectura inmediata.',
        ],
        actionItems: [
          {
            id: 'act-pst-1-1',
            title: 'Redactar tu Carta de Presentación base',
            description: 'Escribí tu mensaje de 3 párrafos destacando tu mayor logro y herramientas clave.',
          },
          {
            id: 'act-pst-1-2',
            title: 'Verificar el formato de tu CV en PDF',
            description: 'Guardá el archivo con nomenclatura profesional: `CV_Nombre_Apellido_Puesto.pdf`.',
          },
        ],
        mindsetPrompt:
          'El CV cuenta tu historia laboral, pero el mensaje de acompañamiento es el que demuestra por qué sos la persona indicada para este proyecto puntual.',
        resources: [
          {
            id: 'plantillas-carta-presentacion-cover-letter',
            title: 'Plantillas de Carta de Presentación (Cover Letter)',
            type: 'word',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 6,
            category: 'Plantillas de Redacción',
            description: 'Modelos de cartas de presentación en 3 párrafos para diferentes niveles y tipos de postulación.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ Enviar un correo diciendo simplemente 'Adjunto mi CV' o postularte en un portal sin una nota de presentación es desperdiciar la oportunidad de generar una primera impresión memorable.
🏷️ Error Común: Postulaciones frías sin contexto ⚠️📄
🔊 Swoosh suave
🖼️ Placa comparativa mostrando: Email vacío con PDF adjunto vs. Email estructurado con Kit de Postulación.
🗣️ El currículum cuenta tu historia laboral, pero el mensaje de acompañamiento es el que explica por qué sos la persona indicada para este proyecto puntual.
🏷️ La Carta de Presentación como Gancho Comercial 🎯✍️
🔊 Pop sutil
🗣️ En esta clase vamos a armar tu Kit de Postulación profesional: tu carta de presentación concisa en tres párrafos, la selección de enlaces relevantes y las plantillas para postularte por correo o formulario web.
🏷️ Kit de Postulación: CV Adaptado + Carta de 3 Párrafos + Enlaces 📁🚀
🔊 Pop de confirmación

[1:30 - SECCIÓN 2: DESARROLLO CONCEPTUAL — PIEZAS DEL KIT Y CARTA EN 3 PÁRRAFOS]
🗣️ Tu Kit de Postulación reúne tres piezas fundamentales que debés tener listas antes de enviar cualquier solicitud:
🗣️ Primero, tu CV adaptado en formato PDF, guardado siempre con un nombre claro: tu nombre, apellido y cargo objetivo.
🏷️ 1. CV en PDF: Nombre_Apellido_Puesto.pdf 📄✅
🔊 Swoosh suave
🗣️ Segundo, una carta de presentación de solo tres párrafos concisos:
🗣️ En el primer párrafo mencionás el puesto al que aplicás; en el segundo destacás un logro concreto con métricas de tu experiencia previa; y en el tercero cerrás invitando cordialmente a una breve entrevista.
🏷️ 2. Carta de 3 Párrafos: Gancho · Logro Concreto · Llamada a la Acción ✍️🎯
🔊 Click sutil
🖼️ Captura flotante mostrando la plantilla de correo de postulación con los 3 bloques resaltados.
🗣️ Y tercero, un enlace directo a tu perfil de LinkedIn optimizado o a tu portafolio de proyectos si tu rol lo requiere.
🏷️ 3. Enlaces Clave: Perfil de LinkedIn · Portafolio · Proyectos 🔗🌐
🔊 Click sutil
🗣️ Si enviás tu postulación por correo, utilizá un asunto profesional con tu nombre, puesto y herramienta fuerte para que el selector te identifique de inmediato en su bandeja de entrada.
🏷️ Asunto Claro: Postulación [Puesto] - [Nombre y Apellido] | [Herramienta] 📬⭐
🔊 Pop de confirmación

[5:30 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Tomate diez minutos para redactar esos tres párrafos con tus propios logros: tener este mensaje guardado te va a ahorrar horas enteras de duda cada vez que encuentres una vacante interesante.
🏷️ Kit Listo = Respuesta Rápida y Cero Fricción ⏱️✅
🔊 Pop sutil
🗣️ En la siguiente lección nos enfocamos en cómo organizar todas tus postulaciones para que tengas el control absoluto de cada oportunidad que abras.
🏷️ Control y Organización de Procesos 📋💼
🔊 Fin de lección limpio`,
      },
      {
        id: 'exp-pst-02',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-6',
        moduleNumber: 6,
        moduleTitle: 'Postulación y organización',
        lessonNumber: 2,
        type: 'video',
        title: 'Gestión de postulaciones con el Tracker',
        duration: '6 min',
        videoDuration: '3:30 min',
        completed: false,
        description:
          'Cómo registrar cada oportunidad en el Tracker integrado de la plataforma y analizar tus métricas para saber qué ajustar.',
        takeaways: [
          'Registro metódico en el Job Tracker: Empresa, cargo, canal de postulación, rango salarial y estado del proceso.',
          'Diagnóstico del embudo: Si no hay respuestas, corregir CV/Keywords; si te quedás en el screening inicial, entrenar pitch y comunicación.',
          'Tomar decisiones estratégicas basadas en números reales para no cambiar de rumbo a ciegas.',
        ],
        actionItems: [
          {
            id: 'act-pst-2-1',
            title: 'Cargar tus primeras 3 postulaciones en el Tracker',
            description: 'Registrá empresa, puesto, canal y estado actual para inicializar tu panel de control.',
          },
          {
            id: 'act-pst-2-2',
            title: 'Auditar tus tasas de respuesta semanales',
            description: 'Revisá en qué columna del embudo se concentran tus procesos para calibrar tu foco.',
          },
        ],
        mindsetPrompt:
          'Lo que no se mide no se puede mejorar: tratar tu búsqueda como un proyecto profesional te da control y previsibilidad sobre tus resultados.',
        resources: [
          {
            id: 'guia-metricas-conversion-tracker',
            title: 'Guía de Métricas y Diagnóstico del Tracker',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 6,
            category: 'Métricas de Selección',
            description: 'Matriz para diagnosticar en qué etapa del embudo se frenan tus postulaciones y qué corregir.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ Lo que no se mide no se puede mejorar: si no llevás un registro de tus postulaciones, tu búsqueda se convierte en una ruleta de adivinanzas y frustración.
🏷️ Control Métrico: De la Adivinanza a los Datos Reales 📊🎯
🔊 Swoosh suave
🗣️ Tener un sistema de seguimiento te permite saber con exactitud científica en qué parte del embudo se frenan tus oportunidades.
🏷️ Diagnóstico del Embudo de Selección 🔍⚙️
🔊 Pop sutil
🖼️ Placa interactiva mostrando las etapas del embudo: Postulación -> Contacto -> Entrevista -> Oferta.
🗣️ En esta clase vamos a ver cómo utilizar el Tracker integrado del campus para registrar cada vacante, analizar tus tasas de conversión y tomar decisiones basadas en números reales.
🏷️ El Job Tracker: Tu Panel de Control Diario 🖥️📈
🔊 Pop de confirmación

[1:15 - SECCIÓN 2: DESARROLLO CONCEPTUAL — CARGA EN EL TRACKER Y DIAGNÓSTICO DE ESCENARIOS]
🗣️ En la barra superior del campus tenés acceso a tu Job Tracker, tu panel de control para registrar cada oportunidad con su empresa, puesto, canal de envío y estado actual.
🏷️ 1. Carga de Datos: Empresa · Cargo · Canal · Estado 🖥️📁
🔊 Swoosh suave
🖼️ Video flotante mostrando la interfaz del Job Tracker del campus agregando una nueva postulación.
🗣️ Al cabo de dos semanas, el análisis de tus números te indica con exactitud qué parte de tu estrategia necesita ajustes:
🗣️ Si enviaste veinte solicitudes y no recibiste ningún contacto, el cuello de botella está en tu CV o en las palabras clave del filtro ATS.
🏷️ Escenario A: Muchas postulaciones y 0 contactos -> Ajustar CV y Keywords 📄📉
🔊 Click sutil
🗣️ Si tenés llamadas iniciales pero no pasás a la entrevista con el líder de área, el CV funciona perfecto y lo que debemos entrenar es tu pitch de presentación y seguridad al hablar.
🏷️ Escenario B: Contacto inicial sin pase a técnica -> Entrenar Pitch Verbal 🎙️💬
🔊 Click sutil
🗣️ Tener esta lectura te ahorra semanas de frustración porque dejás de cambiar cosas al azar y empezás a solucionar el problema real.
🏷️ Decisiones Estratégicas basadas en tu Embudo Real 📈🎯
🔊 Pop de confirmación

[4:45 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Tratar tu búsqueda como un proyecto medible es lo que te diferencia de la gran mayoría que postula a ciegas.
🏷️ De Candidato Pasivo a Gestor de tu Carrera 💼📈
🔊 Swoosh suave
🗣️ Con tu tablero activo, pasemos a ver el protocolo exacto para hacer seguimiento de cada postulación sin perder la postura profesional.
🏷️ Estrategia de Seguimiento y Tiempos de Recontacto ⏱️🎯
🔊 Fin de lección limpio`,
      },
      {
        id: 'exp-pst-03',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-6',
        moduleNumber: 6,
        moduleTitle: 'Postulación y organización',
        lessonNumber: 3,
        type: 'video',
        title: 'Estrategia de seguimiento (Follow-Up)',
        duration: '5 min',
        videoDuration: '3:15 min',
        completed: false,
        description:
          'Tiempos recomendados para el seguimiento (5 a 7 días hábiles) y redacción de mensajes profesionales que reafirmen tu interés.',
        takeaways: [
          'Ventana óptima de seguimiento: Entre 5 y 7 días hábiles posteriores al envío del CV o de la entrevista.',
          'Diferenciar los 2 escenarios: Follow-Up post-postulación (consultar cronograma en el mismo hilo) vs. Follow-Up post-entrevista (agradecimiento y conexión con lo conversado).',
          'Tono profesional: Mantener empatía, brevedad y valor, evitando preguntas secas o exigencias.',
        ],
        actionItems: [
          {
            id: 'act-pst-3-1',
            title: 'Identificar postulaciones de +5 días hábiles',
            description: 'Revisá tu Tracker y detectá qué candidaturas están a tiempo de un recontacto.',
          },
          {
            id: 'act-pst-3-2',
            title: 'Enviar mensaje de seguimiento profesional',
            description: 'Redactá un correo breve sobre el mismo hilo reafirmando tu interés con cordialidad.',
          },
        ],
        mindsetPrompt:
          'Hacer seguimiento no es insistir ni rogar: es liderar tu propio proceso de búsqueda con proactividad, respeto y altura profesional.',
        resources: [
          {
            id: 'plantillas-mensajes-seguimiento-followup',
            title: 'Plantillas de Mensajes de Seguimiento y Follow-Up',
            type: 'pdf',
            fileSize: 'Guía In-App',
            url: '#',
            programId: 'exp-busqueda-laboral',
            programTitle: 'Experiencia Búsqueda Laboral',
            moduleNumber: 6,
            category: 'Plantillas de Seguimiento',
            description: 'Guiones estructurados para recontactar selectores tras postulaciones y entrevistas.',
            isEssential: false,
          },
        ],
        videoScript:
          `[0:00 - SECCIÓN 1: INTRODUCCIÓN Y ENGANCHE]
🗣️ Cuando pasan varios días en silencio tras enviar un CV o terminar una entrevista, la mayoría de los candidatos no hace nada por timidez o temor a molestar.
🏷️ El Miedo al Seguimiento: La parálisis del candidato ⚠️
🔊 Swoosh suave
🗣️ Los selectores suelen estar desbordados de trabajo y muchas veces los procesos se demoran por agendas internas, no porque hayan descartado tu perfil.
🏷️ La Realidad del Selector: Sobrecarga y demoras de agenda ⏱️📁
🔊 Pop sutil
🖼️ Placa comparativa: Silencio pasivo (80% de los candidatos) vs. Seguimiento elegante (20% que avanza).
🗣️ En esta clase te voy a enseñar el protocolo exacto de seguimiento: cuándo recontactar, qué decir para aportar valor y cómo redactar mensajes que reactiven el interés sin sonar insistente.
🏷️ El Arte del Follow-Up: Tiempos · Tono · Valor 📩✨
🔊 Pop de confirmación

[1:10 - SECCIÓN 2: DESARROLLO CONCEPTUAL — LA REGLA DE 5-7 DÍAS Y LOS 2 ESCENARIOS]
🗣️ La regla de oro del seguimiento es el tiempo: la ventana ideal para recontactar es entre cinco y siete días hábiles posteriores al envío de tu postulación o de tu entrevista.
🏷️ Ventana Óptima: 5 a 7 días hábiles ⏱️📅
🔊 Swoosh suave
🗣️ Para una postulación sin respuesta, respondé sobre el mismo correo que enviaste saludando con calidez, reafirmando tu interés en la vacante y consultando amablemente cómo sigue el cronograma del proceso.
🏷️ 1. Follow-Up Post-Postulación: Reafirmar Interés + Consulta de Cronograma 📬
🔊 Click sutil
🖼️ Captura flotante mostrando el modelo de correo de seguimiento sobre el hilo original.
🗣️ Si es después de una entrevista, el mensaje sirve para agradecer el espacio y consultar el estado de la búsqueda mencionando un tema concreto que hayan conversado en la llamada.
🏷️ 2. Follow-Up Post-Entrevista: Agradecimiento + Conexión con lo Conversado 🤝💬
🔊 Click sutil
🗣️ Evitá siempre las frases secas como '¿hay novedades?': un seguimiento profesional aporta empatía, reconoce la carga de trabajo del selector y reafirma tu postura de valor.
🏷️ Tono Profesional: Empatía + Cero Exigencias 🛡️✨
🔊 Pop de confirmación

[4:00 - SECCIÓN 3: CIERRE Y LLAMADA A LA ACCIÓN]
🗣️ Revisá tu Tracker: si tenés postulaciones que ya cumplieron una semana sin respuesta, redactá tu mensaje de seguimiento y reactivá esas conversaciones.
🏷️ Acción: Recontactar Procesos de +5 Días Hábiles ⏱️📩
🔊 Pop sutil
🗣️ En la próxima clase cerramos este módulo con un tema clave para protegerte: cómo identificar ofertas sospechosas, banderas rojas y evitar estafas laborales que abundan en internet.
🏷️ Próxima clase: Cómo detectar ofertas sospechosas 🔍🛡️
🔊 Fin de lección suave`,
      },
      {
        id: 'exp-pst-04',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-6',
        moduleNumber: 6,
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
            moduleNumber: 6,
            category: 'Guía PDF',
            description: 'Lista de verificación de seguridad para blindar tus datos personales en internet.',
          },
        ],
        videoScript:
          `[0:00 - Introducción]\nEn internet hay personas malintencionadas que se aprovechan de la necesidad de quienes buscan empleo. Hoy aprendés a blindarte contra cualquier estafa.\n\n[1:00 - Desarrollo del concepto]\nRegla de oro número 1: ninguna empresa seria jamás te va a pedir dinero para comprar un software, pagar un trámite o iniciar un proceso de selección. Analizamos las señales de alerta típicas: mensajes directos por WhatsApp sin haberte postulado, ofertas de 5.000 dólares por 2 horas de trabajo y contrataciones inmediatas sin videollamada. Cuidá tu información y aprendé a reportar estos avisos.\n\n[3:50 - Llamada a la acción]\nGuardá esta guía de seguridad y avanzamos al Módulo 7 para dominar las entrevistas cara a cara.`,
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
    totalDuration: '36 min · 5 clases',
    lessons: [
      {
        id: 'exp-ent-01',
        programId: 'exp-busqueda-laboral',
        moduleId: 'exp-mod-7',
        moduleNumber: 7,
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
            moduleNumber: 7,
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
        moduleId: 'exp-mod-7',
        moduleNumber: 7,
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
            moduleNumber: 7,
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
        moduleId: 'exp-mod-7',
        moduleNumber: 7,
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
            moduleNumber: 7,
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
        moduleId: 'exp-mod-7',
        moduleNumber: 7,
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
            moduleNumber: 7,
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
        moduleId: 'exp-mod-7',
        moduleNumber: 7,
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
            moduleNumber: 7,
            category: 'Matriz Excel',
            description: 'Herramienta para calcular tu piso salarial y plantilla de correo para negociar ofertas.',
          },
        ],
        videoScript:
          `[0:00 - Introducción]\nEl momento más incómodo para muchos es cuando preguntan por el sueldo. Hoy aprendés a manejar la conversación económica con total naturalidad y firmeza.\n\n[1:30 - Desarrollo del concepto]\nNunca des un número fijo cerrado en la primera charla; trabajamos siempre con rangos salariales basados en el mercado y decimos: 'Mi expectativa para una posición con estas responsabilidades se sitúa entre X e Y, dependiendo del paquete integral de beneficios y proyectos'. Y cuando llega la oferta formal por escrito, te enseño cómo evaluar el paquete completo y solicitar un ajuste de manera profesional.\n\n[5:45 - Llamada a la acción]\nDefiní tu banda salarial piso y objetivo con la calculadora del campus y practicá el guion de respuesta.\n\nCon esto completamos el Módulo 7 de Entrevistas. En el Módulo 8 (optativo) vamos a ver casos especiales de búsqueda: empleo internacional, postulación sin experiencia y cambio de carrera.`,
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
    tagline: 'Estrategias a medida para trabajo internacional, primer empleo y transición de carrera',
    totalDuration: '23 min · 3 clases',
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
            moduleNumber: 8,
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
        moduleId: 'exp-mod-8',
        moduleNumber: 8,
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
            moduleNumber: 8,
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
        moduleId: 'exp-mod-8',
        moduleNumber: 8,
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
            moduleNumber: 8,
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

