import { db, Role, CourseCategory, CourseLevel } from './index';

async function main() {
  console.log('🌱 Iniciando carga de datos iniciales (Seed) del Ecosistema Flor Martinez...');

  // 1. Usuarios Principales
  const adminUser = await db.user.upsert({
    where: { email: 'flor@flormartinez.com' },
    update: {},
    create: {
      email: 'flor@flormartinez.com',
      name: 'Flor Martinez',
      role: Role.ADMIN,
      headline: 'Especialista en Comercio Exterior, Marketing & Marca Personal',
      bio: 'Fundadora del Ecosistema Flor Martinez. Directora en Agencia y formadora en Academia Flor Martinez.',
    },
  });

  const demoStudent = await db.user.upsert({
    where: { email: 'santiago.morales@ejemplo.com' },
    update: {},
    create: {
      email: 'santiago.morales@ejemplo.com',
      name: 'Santiago Morales',
      role: Role.STUDENT,
      headline: 'Profesional en Desarrollo & Gestión',
    },
  });

  console.log(`✓ Usuarios creados: Admin (${adminUser.email}), Alumno Demo (${demoStudent.email})`);

  // 2. Cursos de la Academia
  const coursesData = [
    {
      slug: 'experiencia-busqueda-laboral',
      title: 'Experiencia Búsqueda Laboral',
      tagline: 'Tu hoja de ruta definitiva con 7 módulos, Tracker de postulaciones y acompañamiento en vivo.',
      description:
        'Programa integral para profesionales que buscan empleo de alto valor o remoto internacional: estrategia, CV ATS, LinkedIn, mercado oculto, organización y entrevistas.',
      price: 45000,
      originalPrice: 65000,
      currency: 'ARS',
      category: CourseCategory.EMPLEABILIDAD,
      level: CourseLevel.TODOS_LOS_NIVELES,
      durationHours: 18.0,
      lessonsCount: 30,
      badge: 'Membresía Activa ⭐',
      isFeatured: true,
      orderIndex: 0,
      modules: [
        {
          title: 'Módulo 1: ¿Cómo funciona la búsqueda laboral?',
          orderIndex: 1,
          lessons: [
            { title: 'La mentalidad del reclutador: Por qué mandar 100 CVs no funciona', durationMinutes: 6, isFreePreview: true, orderIndex: 1 },
            { title: 'Expectativas reales: Tiempos y fases de un proceso de selección', durationMinutes: 5, isFreePreview: true, orderIndex: 2 },
            { title: 'Definición del Target Laboral y Matriz de No Negociables', durationMinutes: 8, isFreePreview: false, orderIndex: 3 },
            { title: 'Los 5 errores típicos y Plan de Acción Semanal', durationMinutes: 7, isFreePreview: false, orderIndex: 4 },
          ],
        },
        {
          title: 'Módulo 2: Creación y mejora de CV',
          orderIndex: 2,
          lessons: [
            { title: 'Anatomía, estructura y formato estándar de un CV moderno', durationMinutes: 8, isFreePreview: false, orderIndex: 1 },
            { title: 'Desmitificando los Filtros ATS (Applicant Tracking Systems)', durationMinutes: 7, isFreePreview: false, orderIndex: 2 },
            { title: 'Identificación de Palabras Clave y Tailoring de CV', durationMinutes: 7, isFreePreview: false, orderIndex: 3 },
            { title: 'Redacción de Impacto: Verbos de Acción y Resultados Cuantificables', durationMinutes: 8, isFreePreview: false, orderIndex: 4 },
            { title: 'Checklist Final y Errores que Descartan tu CV', durationMinutes: 5, isFreePreview: false, orderIndex: 5 },
          ],
        },
        {
          title: 'Módulo 3: Creación y mejora de LinkedIn',
          orderIndex: 3,
          lessons: [
            { title: 'Configuración y Optimización Visual: Foto, Banner y URL', durationMinutes: 7, isFreePreview: false, orderIndex: 1 },
            { title: 'El Titular Magnético y la Sección Acerca de mí', durationMinutes: 8, isFreePreview: false, orderIndex: 2 },
            { title: 'Experiencia, Educación, Aptitudes y Recomendaciones', durationMinutes: 6, isFreePreview: false, orderIndex: 3 },
            { title: 'Cómo Escribirle a Recruiters: Mensajes de Conexión e InMails', durationMinutes: 7, isFreePreview: false, orderIndex: 4 },
            { title: 'Estrategia de Contenido y Oportunidades Ocultas en el Feed', durationMinutes: 6, isFreePreview: false, orderIndex: 5 },
          ],
        },
        {
          title: 'Módulo 4: Dónde buscar ofertas',
          orderIndex: 4,
          lessons: [
            { title: 'El Mapa de Portales de Empleo y Agencias por País y Modalidad', durationMinutes: 6, isFreePreview: false, orderIndex: 1 },
            { title: 'Operadores de Búsqueda en Google (Google Dorks) y Comunidades', durationMinutes: 7, isFreePreview: false, orderIndex: 2 },
            { title: 'Cómo Detectar Empresas en Contratación Activa (Sin Oferta Publicada)', durationMinutes: 5, isFreePreview: false, orderIndex: 3 },
            { title: 'Investigación Previa de la Empresa: Cultura, Salarios y Clima', durationMinutes: 6, isFreePreview: false, orderIndex: 4 },
          ],
        },
        {
          title: 'Módulo 5: Postulación y organización',
          orderIndex: 5,
          lessons: [
            { title: 'El Kit de Postulación: Qué Enviar en Cada Caso', durationMinutes: 7, isFreePreview: false, orderIndex: 1 },
            { title: 'Gestión Profesional con el Tracker del Campus y Métricas', durationMinutes: 6, isFreePreview: false, orderIndex: 2 },
            { title: 'Estrategia de Follow-Up: Cuándo y Cómo Recontactar', durationMinutes: 5, isFreePreview: false, orderIndex: 3 },
            { title: 'Cómo Detectar Ofertas Fraudulentas o Sospechosas', durationMinutes: 5, isFreePreview: false, orderIndex: 4 },
          ],
        },
        {
          title: 'Módulo 6: Entrevista Laboral',
          orderIndex: 6,
          lessons: [
            { title: 'Tipos de Entrevistas y Qué Evalúa Cada Interlocutor', durationMinutes: 7, isFreePreview: false, orderIndex: 1 },
            { title: 'El Método STAR para Preguntas por Competencias', durationMinutes: 8, isFreePreview: false, orderIndex: 2 },
            { title: 'Respuestas Estratégicas a las Preguntas Más Temidas', durationMinutes: 8, isFreePreview: false, orderIndex: 3 },
            { title: 'Manejo de Nervios y Preguntas Inteligentes para el Selector', durationMinutes: 6, isFreePreview: false, orderIndex: 4 },
            { title: 'Salario y Negociación: Cómo Responder y Cuándo Negociar', durationMinutes: 7, isFreePreview: false, orderIndex: 5 },
          ],
        },
        {
          title: 'Módulo 7: Casos especiales de Búsqueda (optativa)',
          orderIndex: 7,
          lessons: [
            { title: 'Búsqueda de Trabajo en el Exterior y Contratación Remota Internacional', durationMinutes: 8, isFreePreview: false, orderIndex: 1 },
            { title: 'Cómo Postularte y Destacar sin Experiencia Laboral Previa', durationMinutes: 7, isFreePreview: false, orderIndex: 2 },
            { title: 'Transición y Cambio de Carrera: Capitalizar Habilidades Transferibles', durationMinutes: 8, isFreePreview: false, orderIndex: 3 },
          ],
        },
      ],
    },
    {
      slug: 'cv-de-alto-impacto',
      title: 'CV de Alto Impacto & Optimización ATS',
      tagline: 'Superá los filtros automáticos y conseguí un 300% más de entrevistas laborales.',
      description:
        'Aprenderás a estructurar un currículum vitae editorial de nivel ejecutivo, optimizado palabra por palabra para los algoritmos ATS y diseñado para captar la atención de reclutadores en los primeros 6 segundos.',
      price: 24900,
      originalPrice: 38000,
      currency: 'ARS',
      category: CourseCategory.EMPLEABILIDAD,
      level: CourseLevel.TODOS_LOS_NIVELES,
      durationHours: 3.5,
      lessonsCount: 12,
      badge: 'Más Vendido 🔥',
      isFeatured: true,
      orderIndex: 1,
      modules: [
        {
          title: 'Módulo 1: Fundamentos y Cómo leen los ATS',
          orderIndex: 1,
          lessons: [
            { title: 'Cómo funciona un Applicant Tracking System', durationMinutes: 15, isFreePreview: true, orderIndex: 1 },
            { title: 'Los 5 errores que descartan tu CV al instante', durationMinutes: 18, isFreePreview: true, orderIndex: 2 },
            { title: 'Tipografías, espaciados y jerarquía visual editorial', durationMinutes: 20, isFreePreview: false, orderIndex: 3 },
          ],
        },
        {
          title: 'Módulo 2: Redacción Estratégica & Métricas',
          orderIndex: 2,
          lessons: [
            { title: 'Fórmula Acción + Contexto + Resultado Cuantificable', durationMinutes: 22, isFreePreview: false, orderIndex: 1 },
            { title: 'Estructura del perfil profesional y resumen de impacto', durationMinutes: 25, isFreePreview: false, orderIndex: 2 },
            { title: 'Plantillas editables y exportación correcta en PDF', durationMinutes: 15, isFreePreview: false, orderIndex: 3 },
          ],
        },
      ],
    },
    {
      slug: 'linkedin-estrategico-y-marca-personal',
      title: 'LinkedIn Estratégico & Posicionamiento de Marca Personal',
      tagline: 'Convertí tu perfil en un imán de propuestas laborales y clientes sin enviar solicitudes frías.',
      description:
        'Metodología completa para optimizar tu titular, extracto, sección de experiencia y algoritmo de alcance orgánico para posicionarte como referente en tu industria.',
      price: 29900,
      originalPrice: 45000,
      currency: 'ARS',
      category: CourseCategory.LINKEDIN,
      level: CourseLevel.INTERMEDIO,
      durationHours: 5.0,
      lessonsCount: 16,
      badge: 'Edición 2025 ✨',
      isFeatured: true,
      orderIndex: 2,
      modules: [
        {
          title: 'Módulo 1: Configuración & Headline Magnético',
          orderIndex: 1,
          lessons: [
            { title: 'Configuración técnica y privacidad estratégica', durationMinutes: 15, isFreePreview: true, orderIndex: 1 },
            { title: 'Creación de titulares con palabras clave de búsqueda', durationMinutes: 25, isFreePreview: false, orderIndex: 2 },
          ],
        },
        {
          title: 'Módulo 2: Creación de Contenido & Networking B2B',
          orderIndex: 2,
          lessons: [
            { title: 'Pilares de contenido que generan autoridad', durationMinutes: 30, isFreePreview: false, orderIndex: 1 },
            { title: 'Cómo conectar con decisores y directores de RRHH', durationMinutes: 22, isFreePreview: false, orderIndex: 2 },
          ],
        },
      ],
    },
    {
      slug: 'simulacion-y-tecnicas-de-entrevista',
      title: 'Simulación & Estrategias para Entrevistas Laborales',
      tagline: 'Dominá el método STAR, negociá tu salario con seguridad y transmití liderazgo.',
      description:
        'Entrenamiento práctico con casos reales, preguntas trampa de reclutadores, lenguaje no verbal y negociación de paquete de compensaciones.',
      price: 27500,
      originalPrice: 39000,
      currency: 'ARS',
      category: CourseCategory.ENTREVISTAS,
      level: CourseLevel.TODOS_LOS_NIVELES,
      durationHours: 4.0,
      lessonsCount: 14,
      badge: 'Práctico 🎯',
      isFeatured: false,
      orderIndex: 3,
      modules: [
        {
          title: 'Módulo 1: Preparación y Método STAR',
          orderIndex: 1,
          lessons: [
            { title: 'Estructura de respuestas con el método STAR', durationMinutes: 25, isFreePreview: true, orderIndex: 1 },
            { title: 'Cómo responder sobre debilidades y fracasos', durationMinutes: 20, isFreePreview: false, orderIndex: 2 },
          ],
        },
      ],
    },
  ];

  for (const courseData of coursesData) {
    const { modules, ...courseFields } = courseData;
    const course = await db.course.upsert({
      where: { slug: courseFields.slug },
      update: courseFields,
      create: courseFields,
    });

    for (const modData of modules) {
      const { lessons, ...modFields } = modData;
      let existingMod = await db.module.findFirst({
        where: { courseId: course.id, title: modFields.title },
      });

      if (!existingMod) {
        existingMod = await db.module.create({
          data: {
            ...modFields,
            courseId: course.id,
          },
        });
      }

      for (const lessonData of lessons) {
        const existingLesson = await db.lesson.findFirst({
          where: { moduleId: existingMod.id, title: lessonData.title },
        });

        if (!existingLesson) {
          await db.lesson.create({
            data: {
              ...lessonData,
              moduleId: existingMod.id,
            },
          });
        }
      }
    }
  }
  console.log(`✓ Cursos y lecciones de la Academia creados correctamente.`);

  // 3. Inscripción demo
  const firstCourse = await db.course.findUnique({ where: { slug: 'cv-de-alto-impacto' } });
  if (firstCourse && demoStudent) {
    await db.enrollment.upsert({
      where: {
        userId_courseId: {
          userId: demoStudent.id,
          courseId: firstCourse.id,
        },
      },
      update: {},
      create: {
        userId: demoStudent.id,
        courseId: firstCourse.id,
        progressPercent: 35,
      },
    });
    console.log(`✓ Inscripción demo vinculada al alumno Santiago Morales.`);
  }

  // 4. Experiencia Búsqueda Laboral & Herramientas para Santiago Morales
  if (demoStudent) {
    // 4.1. Expediente del Alumno
    await db.studentProfile.upsert({
      where: { userId: demoStudent.id },
      update: {
        targetRole: 'Product Designer / UX Lead',
        seniority: 'Senior',
        modality: '100% Remoto (Latam / Global)',
        expectedSalary: '$2.200 USD / mes',
        linkedinUrl: 'https://linkedin.com/in/santiago-martinez-demo',
        cvFileName: 'CV_Santiago_Martinez_ATS_2025.pdf',
        atsScore: 85,
        linkedinScore: 70,
        starScore: 60,
        negotiationScore: 40,
        networkingScore: 55,
      },
      create: {
        userId: demoStudent.id,
        targetRole: 'Product Designer / UX Lead',
        seniority: 'Senior',
        modality: '100% Remoto (Latam / Global)',
        expectedSalary: '$2.200 USD / mes',
        linkedinUrl: 'https://linkedin.com/in/santiago-martinez-demo',
        cvFileName: 'CV_Santiago_Martinez_ATS_2025.pdf',
        atsScore: 85,
        linkedinScore: 70,
        starScore: 60,
        negotiationScore: 40,
        networkingScore: 55,
      },
    });

    // 4.2. Postulaciones en el Tracker
    const jobApps = [
      {
        company: 'Mercado Libre',
        role: 'Especialista en Marketing B2B',
        status: 'Entrevista RRHH',
        salary: '$1.400.000 ARS',
        date: '12 Ago 2025',
        nextStep: 'Llamada con Hiring Manager (Jueves 15:00 hs)',
        notes: 'Aplicado con CV ATS Editorial y mensaje personalizado al selector.',
        jobUrl: 'https://mercadolibre.com/careers/marketing-b2b',
        isFavorite: true,
        interviewDate: new Date('2025-08-21T15:00:00Z'),
      },
      {
        company: 'Globant',
        role: 'Product Operations Analyst',
        status: 'Prueba Técnica',
        salary: '$1.650 USD / mes',
        date: '08 Ago 2025',
        nextStep: 'Entrega de caso práctico (Viernes)',
        notes: 'Uso de método STAR para responder las preguntas de screening.',
        jobUrl: 'https://globant.com/jobs/product-operations',
        isFavorite: false,
      },
      {
        company: 'Auth0 / Okta',
        role: 'Talent Acquisition Partner',
        status: 'Postulado',
        salary: '$2.000 USD / mes',
        date: '14 Ago 2025',
        nextStep: 'Esperando primera revisión ATS',
        notes: 'Keywords adaptadas a la descripción en inglés.',
        jobUrl: 'https://auth0.com/careers/talent-partner',
        isFavorite: true,
      },
      {
        company: 'Ualá',
        role: 'Content & Brand Strategist',
        status: 'Oferta Recibida',
        salary: '$1.800.000 ARS',
        date: '28 Jul 2025',
        nextStep: 'Negociación de paquete y bono anual',
        notes: 'Técnica de anclaje alto aplicada en la llamada salarial.',
        jobUrl: 'https://uala.com.ar/careers/brand-strategist',
        isFavorite: false,
      },
    ];

    for (const app of jobApps) {
      const existing = await db.jobApplication.findFirst({
        where: { userId: demoStudent.id, company: app.company, role: app.role },
      });
      if (!existing) {
        await db.jobApplication.create({
          data: {
            ...app,
            userId: demoStudent.id,
          },
        });
      }
    }

    // 4.3. Eventos en la Agenda / Zooms
    const calendarEvents = [
      {
        title: '🎙️ Zoom Semanal: Auditoría de CVs & LinkedIn en Vivo',
        type: 'zoom',
        date: '2025-08-20',
        time: '19:00 hs (Arg/Uru) · 17:00 hs (Col/Per)',
        notes: 'Espacio semanal de mentoría y feedback directo con Flor Martinez.',
        zoomLink: 'https://zoom.us/j/mock-academia-flor-martinez',
        isGlobal: true,
        userId: null,
      },
      {
        title: '🎙️ Zoom Semanal: Simulación de Entrevistas & Negociación USD',
        type: 'zoom',
        date: '2025-08-27',
        time: '19:00 hs (Arg/Uru) · 17:00 hs (Col/Per)',
        notes: 'Preguntas trampa, método STAR y técnicas de anclaje de salario.',
        zoomLink: 'https://zoom.us/j/mock-academia-flor-martinez',
        isGlobal: true,
        userId: null,
      },
      {
        title: '🎙️ Zoom Semanal: Búsqueda en Portales Remotos & Networking',
        type: 'zoom',
        date: '2025-09-03',
        time: '19:00 hs (Arg/Uru) · 17:00 hs (Col/Per)',
        notes: 'Optimización de filtros en Wellfound, Remotive y mensajes en frío.',
        zoomLink: 'https://zoom.us/j/mock-academia-flor-martinez',
        isGlobal: true,
        userId: null,
      },
      {
        title: '💼 Entrevista con Mercado Libre (Especialista en Marketing)',
        type: 'entrevista',
        date: '2025-08-21',
        time: '15:00 hs (Arg)',
        company: 'Mercado Libre',
        notes: 'Llamada con Hiring Manager sobre proyectos B2B.',
        isGlobal: false,
        userId: demoStudent.id,
      },
    ];

    for (const evt of calendarEvents) {
      const existing = await db.calendarEvent.findFirst({
        where: { title: evt.title, date: evt.date },
      });
      if (!existing) {
        await db.calendarEvent.create({
          data: evt,
        });
      }
    }

    console.log(`✓ Expediente, Tracker y Agenda inicializados para el alumno demo.`);
  }

  // 5. Productos de la Tienda
  const productsData = [
    {
      slug: 'cuaderno-ejecutivo-flor-martinez',
      name: 'Cuaderno Ejecutivo Flor Martinez (Edición de Autor)',
      tagline: 'Tapa dura con acabados dorados en hot stamping y hojas ecológicas de 90g.',
      description: 'Herramienta de organización diaria para profesionales y directivos con visión de excelencia.',
      price: 18500,
      currency: 'ARS',
      stock: 50,
      images: ['/images/products/cuaderno-fm.jpg'],
      category: 'Papelería Ejecutiva',
    },
    {
      slug: 'kit-onboarding-empresarial-b2b',
      name: 'Kit Onboarding & Bienvenida Corporativa B2B',
      tagline: 'Set corporativo personalizado para colaboradores y clientes estratégicos.',
      description: 'Incluye agenda premium, lapicera metálica grabada, termo térmico y packaging de presentación.',
      price: 45000,
      currency: 'ARS',
      stock: 120,
      images: ['/images/products/kit-onboarding.jpg'],
      category: 'Merchandising B2B',
    },
  ];

  for (const prod of productsData) {
    await db.product.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod,
    });
  }
  console.log(`✓ Productos de la Tienda creados correctamente.`);

  console.log('🎉 Carga de datos iniciales completada con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
