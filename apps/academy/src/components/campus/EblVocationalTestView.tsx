'use client';

import React, { useState } from 'react';
import {
  Compass,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Brain,
  Users,
  BarChart,
  Palette,
  Briefcase,
  Target,
  FileText,
  Share2,
  Zap,
  GraduationCap,
  Star,
  AlertTriangle,
  Send,
  HelpCircle,
} from 'lucide-react';
import styles from './EblVocationalTestView.module.css';

interface EblVocationalTestViewProps {
  onBackToDashboard: () => void;
  onGoToModule?: (targetView: string) => void;
}

type Archetype = 'estrategia' | 'analitico' | 'personas' | 'creativo';

interface QuestionOption {
  text: string;
  archetype: Archetype;
}

interface Question {
  id: number;
  title: string;
  situation: string;
  options: QuestionOption[];
}

const questions: Question[] = [
  {
    id: 1,
    title: 'Resolución de problemas en equipo',
    situation: 'Tu equipo de trabajo se enfrenta a un cuello de botella urgente en un proyecto clave. ¿Cuál es tu primera reacción natural?',
    options: [
      {
        text: 'Analizar métricas, flujos de datos y reportes históricos para encontrar la causa raíz objetiva.',
        archetype: 'analitico',
      },
      {
        text: 'Reunir al equipo, escuchar qué siente cada persona y facilitar un espacio para destrabar tensiones.',
        archetype: 'personas',
      },
      {
        text: 'Reestructurar los objetivos, priorizar el alcance del negocio y reasignar responsabilidades.',
        archetype: 'estrategia',
      },
      {
        text: 'Proponer una lluvia de ideas con soluciones no convencionales y cambiar el formato de entrega.',
        archetype: 'creativo',
      },
    ],
  },
  {
    id: 2,
    title: 'Entorno de trabajo ideal',
    situation: 'Si pudieras elegir tu día de trabajo soñado, ¿en qué tipo de actividades te gustaría invertir la mayor parte de tu energía?',
    options: [
      {
        text: 'Planificando hojas de ruta de productos, definiendo presupuestos y negociando con clientes clave.',
        archetype: 'estrategia',
      },
      {
        text: 'Modelando hojas de cálculo, automatizando procesos y construyendo dashboards de control.',
        archetype: 'analitico',
      },
      {
        text: 'Diseñando conceptos de comunicación, creando contenido de impacto o prototipando experiencias.',
        archetype: 'creativo',
      },
      {
        text: 'Entrevistando personas, acompañando procesos de mentoría y potenciando el clima laboral.',
        archetype: 'personas',
      },
    ],
  },
  {
    id: 3,
    title: 'Toma de decisiones bajo incertidumbre',
    situation: 'Tenés que tomar una decisión importante y contás con información incompleta. ¿Qué criterio priorizás?',
    options: [
      {
        text: 'Consultar a las personas más afectadas y buscar un consenso donde todos se sientan respaldados.',
        archetype: 'personas',
      },
      {
        text: 'Evaluar el costo de oportunidad, el alineamiento estratégico con el negocio y los riesgos comerciales.',
        archetype: 'estrategia',
      },
      {
        text: 'Construir una matriz de evaluación numérica para ponderar variables de manera lógica y neutral.',
        archetype: 'analitico',
      },
      {
        text: 'Confiar en la intuición creativa, probar un experimento rápido y pivotar según la respuesta.',
        archetype: 'creativo',
      },
    ],
  },
  {
    id: 4,
    title: 'Tu mayor fortaleza profesional reconocida',
    situation: '¿Qué cualidad suelen destacar tus colegas, jefes o compañeros de estudio sobre tu forma de aportar valor?',
    options: [
      {
        text: 'Capacidad para detectar patrones numéricos, errores que otros pasan por alto y estructurar información.',
        archetype: 'analitico',
      },
      {
        text: 'Habilidad para inspirar a otros, mediar en conflictos y generar confianza genuina en minutos.',
        archetype: 'personas',
      },
      {
        text: 'Visión de negocio para convertir ideas caóticas en proyectos ejecutables con metas claras.',
        archetype: 'estrategia',
      },
      {
        text: 'Facilidad para comunicar ideas complejas de forma visual, fresca y atractiva para el público.',
        archetype: 'creativo',
      },
    ],
  },
  {
    id: 5,
    title: 'Tipo de proyecto que más te motiva',
    situation: 'Te ofrecen liderar una de las siguientes iniciativas dentro de una organización. ¿Cuál elegís sin dudar?',
    options: [
      {
        text: 'Lanzamiento de una nueva campaña de marca y rediseño integral de la experiencia de usuario.',
        archetype: 'creativo',
      },
      {
        text: 'Expansión de una nueva línea de negocios y cierre de alianzas estratégicas internacionales.',
        archetype: 'estrategia',
      },
      {
        text: 'Programa de bienestar, capacitación de talento y plan de carrera para los colaboradores.',
        archetype: 'personas',
      },
      {
        text: 'Implementación de un sistema de Business Intelligence y optimización de costos operativos.',
        archetype: 'analitico',
      },
    ],
  },
  {
    id: 6,
    title: 'Reacción frente a tareas repetitivas',
    situation: 'Tenés que realizar una tarea manual que requiere mucho tiempo y se repite todas las semanas. ¿Qué hacés?',
    options: [
      {
        text: 'Busco herramientas de automatización, macros o scripts para sistematizarla y no volver a hacerla a mano.',
        archetype: 'analitico',
      },
      {
        text: 'Evalúo si la tarea aporta valor real al negocio; si no, propongo eliminarla o delegarla estratégicamente.',
        archetype: 'estrategia',
      },
      {
        text: 'Le busco una vuelta estética o un formato visual diferente para que sea más entretenida y visual.',
        archetype: 'creativo',
      },
      {
        text: 'Coordino una sesión de trabajo colaborativo o capacito a alguien del equipo para resolverla juntos.',
        archetype: 'personas',
      },
    ],
  },
  {
    id: 7,
    title: 'Forma favorita de aprender algo nuevo',
    situation: 'Querés capacitarte en una nueva disciplina profesional. ¿Qué formato te resulta más efectivo?',
    options: [
      {
        text: 'Debates grupales, entrevistas a referentes del sector y dinámicas de role-playing.',
        archetype: 'personas',
      },
      {
        text: 'Estudios de caso empresariales reales, modelos de negocio y análisis de decisiones de directores ejecutivos.',
        archetype: 'estrategia',
      },
      {
        text: 'Documentación técnica estructurada, análisis de bases de datos y ejercicios con respuestas verificables.',
        archetype: 'analitico',
      },
      {
        text: 'Talleres prácticos de creación libre, prototipado rápido y experimentación visual.',
        archetype: 'creativo',
      },
    ],
  },
  {
    id: 8,
    title: 'Criterio de éxito personal',
    situation: 'Al final de un año de trabajo, ¿qué logro te hace sentir mayor orgullo profesional?',
    options: [
      {
        text: 'Haber superado los objetivos de facturación, abierto nuevos mercados o liderado un cambio importante.',
        archetype: 'estrategia',
      },
      {
        text: 'Haber creado algo memorable y reconocido que conectó emocionalmente con la audiencia.',
        archetype: 'creativo',
      },
      {
        text: 'Haber ayudado a miembros de mi equipo a crecer, conseguir ascensos o superar momentos difíciles.',
        archetype: 'personas',
      },
      {
        text: 'Haber construido un sistema robusto, sin fallas, con métricas precisas y alta eficiencia demostrable.',
        archetype: 'analitico',
      },
    ],
  },
  {
    id: 9,
    title: 'Comunicación en presentaciones',
    situation: 'Tenés que presentar una propuesta ante directivos de una empresa. ¿Cómo estructurás tu presentación?',
    options: [
      {
        text: 'Con gráficos claros, tablas comparativas, métricas de sustento y fuentes estadísticas validadas.',
        archetype: 'analitico',
      },
      {
        text: 'Con una historia atractiva (storytelling), diseño visual impactante y metáforas memorables.',
        archetype: 'creativo',
      },
      {
        text: 'Enfocándome en el beneficio humano, el impacto en los colaboradores y la alineación de valores.',
        archetype: 'personas',
      },
      {
        text: 'Yendo directo al ROI (retorno de inversión), riesgos mitigados, plan de acción y próximos hitos ejecutivos.',
        archetype: 'estrategia',
      },
    ],
  },
  {
    id: 10,
    title: 'Manejo de la frustración',
    situation: 'Una iniciativa en la que trabajaste durante semanas no obtiene los resultados esperados. ¿Cuál es tu balance?',
    options: [
      {
        text: 'Reviso los datos paso a paso para identificar exactamente en qué punto falló el modelo o la hipótesis.',
        archetype: 'analitico',
      },
      {
        text: 'Me reúno con el equipo para contener el ánimo, validar los aprendizajes y mantener la motivación alta.',
        archetype: 'personas',
      },
      {
        text: 'Repienso el concepto desde cero y propongo un enfoque totalmente diferente para relanzar la idea.',
        archetype: 'creativo',
      },
      {
        text: 'Evalúo si vale la pena pivotar o cortar pérdidas rápidamente para enfocar los recursos en otra prioridad.',
        archetype: 'estrategia',
      },
    ],
  },
  {
    id: 11,
    title: 'Rol en reuniones de trabajo',
    situation: 'Durante una reunión de equipo con muchas opiniones cruzadas, ¿cuál suele ser tu rol espontáneo?',
    options: [
      {
        text: 'El que resume las conclusiones, define los acuerdos accionables y asigna responsables con fechas límite.',
        archetype: 'estrategia',
      },
      {
        text: 'El que aporta datos duros y cuestiona afirmaciones que no tienen respaldo numérico o metodológico.',
        archetype: 'analitico',
      },
      {
        text: 'El que se asegura de que todos hayan podido hablar y busca puntos de encuentro entre posturas opuestas.',
        archetype: 'personas',
      },
      {
        text: 'El que lanza ideas disparadoras y conecta conceptos de otras industrias para abrir el debate.',
        archetype: 'creativo',
      },
    ],
  },
  {
    id: 12,
    title: 'Proyección laboral deseada',
    situation: 'Mirando hacia los próximos 2 a 3 años, ¿qué tipo de desafíos profesionales te entusiasma asumir?',
    options: [
      {
        text: 'Liderar equipos multidisciplinarios, definir la visión de negocios o gestionar presupuestos importantes.',
        archetype: 'estrategia',
      },
      {
        text: 'Especializarme en análisis avanzado, toma de decisiones basada en datos e inteligencia de negocios.',
        archetype: 'analitico',
      },
      {
        text: 'Liderar áreas de personas, talento, selección internacional o programas de formación y cultura.',
        archetype: 'personas',
      },
      {
        text: 'Dirigir proyectos de innovación, marcas digitales, diseño de experiencias o creación de contenidos.',
        archetype: 'creativo',
      },
    ],
  },
];

interface ArchetypeProfile {
  name: string;
  badge: string;
  icon: React.ReactNode;
  color: string;
  tagline: string;
  description: string;
  keyStrengths: string[];
  recommendedRoles: string[];
  idealEnvironments: string[];
  eblRecommendations: {
    cvFocus: string;
    linkedinFocus: string;
    interviewFocus: string;
  };
}

const archetypeProfiles: Record<Archetype, ArchetypeProfile> = {
  estrategia: {
    name: 'Estratega & Gestor de Negocios',
    badge: 'ARQUETIPO ESTRATÉGICO',
    icon: <Target size={30} />,
    color: '#EC4899',
    tagline: 'Visión global, orientación a resultados y liderazgo de proyectos de alto impacto.',
    description:
      'Tu perfil destaca por la capacidad de conectar la visión a largo plazo con la ejecución táctica. Tenés facilidad natural para priorizar, negociar con partes interesadas, optimizar recursos y liderar equipos hacia metas cuantificables.',
    keyStrengths: [
      'Pensamiento sistémico y priorización de impacto comercial.',
      'Liderazgo ejecutivo y delegación orientada a resultados.',
      'Negociación de alcance, presupuestos y plazos.',
      'Toma de decisiones pragmática bajo incertidumbre.',
    ],
    recommendedRoles: [
      'Product Manager / Product Owner',
      'Project & Operations Manager',
      'Business Development Lead',
      'Consultor de Estrategia & Gestión',
      'Chief of Staff / Account Director',
    ],
    idealEnvironments: [
      'Startups en escala y empresas con autonomía operativa.',
      'Equipos donde se valore la iniciativa y el cumplimiento de KPIs.',
      'Organizaciones con posibilidad de liderar proyectos transversales.',
    ],
    eblRecommendations: {
      cvFocus: 'Enfocá tu CV en logros con impacto numérico ($ facturación, % crecimiento, horas ahorradas).',
      linkedinFocus: 'Tu titular debe comunicar liderazgo de proyectos y metodologías de gestión ágil.',
      interviewFocus: 'En tus entrevistas utilizá el método STAR resaltando tus decisiones estratégicas y liderazgo.',
    },
  },
  analitico: {
    name: 'Analista de Datos & Optimización',
    badge: 'ARQUETIPO ANALÍTICO',
    icon: <BarChart size={30} />,
    color: '#0891B2',
    tagline: 'Rigor lógico, detección de patrones y construcción de soluciones basadas en evidencia.',
    description:
      'Tu mayor valor radica en transformar datos caóticos en certezas operativas. Disfrutás investigar a fondo, construir modelos estructurados, encontrar eficiencias y fundamentar cada decisión en hechos demostrables.',
    keyStrengths: [
      'Análisis cuantitativo y modelado de datos.',
      'Detección de ineficiencias y optimización de procesos.',
      'Pensamiento crítico y reducción de sesgos subjetivos.',
      'Sistematización y documentación de alta precisión.',
    ],
    recommendedRoles: [
      'Data Analyst / Business Intelligence Specialist',
      'Business & Process Analyst',
      'Consultor de Operaciones & Finanzas',
      'Especialista en Pricing & Revenue Management',
      'Growth & Performance Analyst',
    ],
    idealEnvironments: [
      'Empresas data-driven donde las decisiones se justifiquen con métricas.',
      'Entornos que premien la exactitud, el orden y la mejora continua.',
      'Proyectos de tecnología, finanzas, supply chain o consultoría técnica.',
    ],
    eblRecommendations: {
      cvFocus: 'Detallá en tu CV tus herramientas técnicas (Excel avanzado, SQL, BI) y procesos que optimizaste.',
      linkedinFocus: 'Destacá en tu Acerca De tu capacidad para resolver problemas complejos con datos duros.',
      interviewFocus: 'En tus entrevistas explicá tu metodología analítica paso a paso ante preguntas técnicas.',
    },
  },
  personas: {
    name: 'Gestor de Personas & Talento Humano',
    badge: 'ARQUETIPO HUMANO & RELACIONAL',
    icon: <Users size={30} />,
    color: '#059669',
    tagline: 'Inteligencia emocional, facilitación de consensos y desarrollo del potencial humano.',
    description:
      'Tu fortaleza es la empatía activa y la habilidad para construir vínculos de confianza sólidos. Sabés cómo motivar a las personas, resolver tensiones interpersonales, comunicar con calidez y cultivar una cultura de colaboración genuina.',
    keyStrengths: [
      'Inteligencia emocional y escucha activa.',
      'Selección de talento y evaluación de competencias.',
      'Resolución de conflictos y facilitación de consensos.',
      'Acompañamiento pedagógico y diseño de planes de carrera.',
    ],
    recommendedRoles: [
      'HR Specialist / IT Recruiter / Talent Acquisition',
      'People Partner & Clima Organizacional',
      'Customer Success & Community Manager',
      'Especialista en Capacitación & Desarrollo (L&D)',
      'Consultor de Gestión del Cambio y Comunicación Interna',
    ],
    idealEnvironments: [
      'Organizaciones con fuerte enfoque en cultura y bienestar de las personas.',
      'Equipos colaborativos con comunicación abierta y horizontal.',
      'Empresas en crecimiento que necesiten estructurar sus áreas de talento.',
    ],
    eblRecommendations: {
      cvFocus: 'En tu CV enfatizá métricas de retención, volumen de contrataciones exitosas y programas liderados.',
      linkedinFocus: 'Utilizá tu perfil de LinkedIn para hacer networking activo y compartir contenido de valor humano.',
      interviewFocus: 'En tus entrevistas demostrá tu calidez, storytelling empático y manejo de situaciones difíciles.',
    },
  },
  creativo: {
    name: 'Creador de Experiencias & Marca',
    badge: 'ARQUETIPO CREATIVO & COMUNICACIÓN',
    icon: <Palette size={30} />,
    color: '#EC4899',
    tagline: 'Innovación, pensamiento lateral, narrativa visual y conexión con audiencias.',
    description:
      'Tu diferencial es la creatividad estratégica. Tenés una sensibilidad única para el diseño, el storytelling y la estética visual, con la capacidad de transformar ideas abstractas en mensajes memorables que cautivan al público.',
    keyStrengths: [
      'Pensamiento lateral y generación de conceptos disruptivos.',
      'Storytelling persuasivo y redacción de impacto (copywriting).',
      'Diseño visual de experiencias y branding.',
      'Agilidad para experimentar, validar y reinventar propuestas.',
    ],
    recommendedRoles: [
      'Content & Brand Strategist',
      'UX / UI Designer / Diseñador de Producto Digital',
      'Especialista en Marketing Digital & Social Media',
      'Copywriter Creativo & Redactor Publicitario',
      'Director de Arte / Creativo de Campañas',
    ],
    idealEnvironments: [
      'Agencias creativas, estudios de diseño y marcas con identidad fuerte.',
      'Startups de producto donde el diseño y la experiencia de usuario sean clave.',
      'Espacios flexibles con libertad para proponer soluciones no tradicionales.',
    ],
    eblRecommendations: {
      cvFocus: 'Adjuntá links directos a tu portfolio en tu CV y cuidá la pulcritud tipográfica y jerarquía visual.',
      linkedinFocus: 'Optimizá tu banner y publicaciones destacadas en LinkedIn con muestras reales de tu trabajo visual.',
      interviewFocus: 'En tus entrevistas explicá el proceso creativo detrás de tus proyectos más exitosos.',
    },
  },
};

export function EblVocationalTestView({
  onBackToDashboard,
  onGoToModule,
}: EblVocationalTestViewProps) {
  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, Archetype>>({});

  // AI Feedback widget state
  const [feedbackRating, setFeedbackRating] = useState<number>(0);
  const [feedbackHoverRating, setFeedbackHoverRating] = useState<number>(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  const currentQ = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPct = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (archetype: Archetype) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: archetype,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setStep('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSkipCurrentQuestion = () => {
    setSelectedAnswers((prev) => {
      const updated = { ...prev };
      delete updated[currentQuestionIndex];
      return updated;
    });
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setStep('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setFeedbackRating(0);
    setFeedbackText('');
    setFeedbackSent(false);
    setStep('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSkipToResult = () => {
    const mockAnswers: Record<number, Archetype> = {
      0: 'estrategia',
      1: 'estrategia',
      2: 'analitico',
      3: 'estrategia',
      4: 'creativo',
      5: 'estrategia',
      6: 'personas',
      7: 'estrategia',
      8: 'analitico',
      9: 'estrategia',
      10: 'estrategia',
      11: 'estrategia',
    };
    setSelectedAnswers(mockAnswers);
    setStep('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackRating === 0 && !feedbackText.trim()) return;
    setFeedbackSent(true);
  };

  // Calculate Scores
  const scores = Object.values(selectedAnswers).reduce<Record<Archetype, number>>(
    (acc, arch) => {
      acc[arch] = (acc[arch] || 0) + 1;
      return acc;
    },
    { estrategia: 0, analitico: 0, personas: 0, creativo: 0 }
  );

  // Find dominant archetype
  let dominantArchetype: Archetype = 'estrategia';
  let maxScore = -1;
  (Object.keys(scores) as Archetype[]).forEach((arch) => {
    if (scores[arch] > maxScore) {
      maxScore = scores[arch];
      dominantArchetype = arch;
    }
  });

  const dominantProfile = archetypeProfiles[dominantArchetype];
  const isInsufficientAnswers = answeredCount < 5;

  return (
    <div className={styles.container}>
      {/* Top Header Bar */}
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={onBackToDashboard}
          title="Volver al Tablero"
        >
          <ArrowLeft size={16} />
          <span>Volver al Tablero</span>
        </button>

        <div className={styles.badgeWrap}>
          <span className={styles.topBadge}>
            <Compass size={14} />
            <span>HERRAMIENTA GRATUITA · ORIENTACIÓN VOCACIONAL</span>
          </span>
        </div>
      </header>

      {/* 1. INTRO SCREEN */}
      {step === 'intro' && (
        <div className={styles.introCard}>
          <div className={styles.introIconCircle}>
            <Compass size={36} className={styles.introIcon} />
          </div>

          <span className={styles.introTag}>Test Vocacional & Orientación de Carrera</span>
          <h1 className={styles.introTitle}>Descubrí tu perfil profesional y roles con mayor proyección</h1>
          <p className={styles.introDesc}>
            Este test interactivo evalúa tus preferencias naturales frente a <strong>12 situaciones reales del mundo del trabajo</strong> para identificar tus fortalezas dominantes, tu arquetipo laboral y las posiciones donde podés generar mayor impacto profesional.
          </p>

          <div className={styles.perksGrid}>
            <div className={styles.perkItem}>
              <Brain size={20} className={styles.perkIcon} />
              <div>
                <strong>12 Preguntas Situacionales</strong>
                <p>Basadas en dilemas laborales reales sin opciones correctas o incorrectas.</p>
              </div>
            </div>

            <div className={styles.perkItem}>
              <Sparkles size={20} className={styles.perkIcon} />
              <div>
                <strong>Diagnóstico Personalizado</strong>
                <p>Arquetipo dominante, porcentajes de afinidad y puestos ideales.</p>
              </div>
            </div>

            <div className={styles.perkItem}>
              <TrendingUp size={20} className={styles.perkIcon} />
              <div>
                <strong>Estrategia para tu Búsqueda</strong>
                <p>Recomendaciones exactas para orientar tu CV y tu perfil de LinkedIn.</p>
              </div>
            </div>
          </div>

          <div className={styles.introActions}>
            <button
              type="button"
              className={styles.startBtn}
              onClick={() => {
                setStep('test');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span>Comenzar Test Vocacional (5 min)</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className={styles.skipDevBtn}
              onClick={handleSkipToResult}
              title="Saltear todas las preguntas y ver el diagnóstico directamente"
            >
              <Zap size={14} className={styles.zapIcon} />
              <span>Saltear test (Ver resultado directo)</span>
            </button>

            <span className={styles.introNote}>✨ 100% gratuito · Requiere responder al menos 5 preguntas</span>
          </div>
        </div>
      )}

      {/* 2. TEST QUESTIONS SCREEN */}
      {step === 'test' && currentQ && (
        <div className={styles.testWrapper}>
          {/* Progress Indicator */}
          <div className={styles.progressBarBox}>
            <div className={styles.progressTopRow}>
              <span className={styles.questionCounter}>
                Pregunta <strong>0{currentQuestionIndex + 1}</strong> de <strong>{totalQuestions}</strong>
                <span className={styles.answeredCounterPill}>
                  {answeredCount} respondidas {answeredCount < 5 ? '(Mínimo: 5)' : '✓'}
                </span>
              </span>
              <span className={styles.progressPercentText}>{progressPct}% completado</span>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
            </div>
          </div>

          {/* Question Card */}
          <div className={styles.questionCard}>
            <div className={styles.qHeader}>
              <span className={styles.qTopicTag}>{currentQ.title}</span>
              <h2 className={styles.qSituation}>{currentQ.situation}</h2>
            </div>

            {/* Options List (Clean: without biasing detail subtitles) */}
            <div className={styles.optionsList}>
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === opt.archetype;
                const letter = String.fromCharCode(65 + idx); // A, B, C, D

                return (
                  <button
                    key={idx}
                    type="button"
                    className={`${styles.optionBtn} ${isSelected ? styles.optionSelected : ''}`}
                    onClick={() => handleSelectOption(opt.archetype)}
                  >
                    <div className={styles.optionLetterBadge}>{letter}</div>
                    <div className={styles.optionTextContent}>
                      <span className={styles.optionMainText}>{opt.text}</span>
                    </div>
                    <div className={styles.optionRadioCircle}>
                      {isSelected && <CheckCircle2 size={18} className={styles.radioCheckedIcon} />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Footer with Skip Question */}
            <div className={styles.testFooter}>
              <button
                type="button"
                className={styles.prevBtn}
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft size={16} />
                <span>Anterior</span>
              </button>

              <button
                type="button"
                className={styles.skipQuestionBtn}
                onClick={handleSkipCurrentQuestion}
                title="Omitir esta pregunta si no te sentís identificado"
              >
                <HelpCircle size={14} />
                <span>No me identifico / Saltear</span>
              </button>

              <button
                type="button"
                className={styles.nextBtn}
                onClick={handleNext}
              >
                <span>
                  {currentQuestionIndex === totalQuestions - 1
                    ? 'Ver Diagnóstico'
                    : 'Siguiente Pregunta'}
                </span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. FINAL RESULTS OR INSUFFICIENT WARNING */}
      {step === 'result' && (
        isInsufficientAnswers ? (
          /* SCREEN A: INSUFFICIENT ANSWERS (< 5) */
          <div className={styles.insufficientCard}>
            <div className={styles.insufficientIconCircle}>
              <AlertTriangle size={36} className={styles.insufficientIcon} />
            </div>

            <span className={styles.insufficientTag}>DIAGNÓSTICO INCOMPLETO</span>
            <h2 className={styles.insufficientTitle}>
              Respuestas insuficientes para un diagnóstico confiable
            </h2>
            <p className={styles.insufficientDesc}>
              Respondiste <strong>{answeredCount} de 12 preguntas</strong>. Para que nuestro modelo de orientación vocacional pueda calcular con precisión tu arquetipo profesional dominante, fortalezas y roles recomendados, es necesario responder un <strong>mínimo de 5 preguntas</strong>.
            </p>

            <div className={styles.insufficientActions}>
              <button
                type="button"
                className={styles.restartBtn}
                onClick={handleRestart}
              >
                <RotateCcw size={16} />
                <span>Rehacer Test Vocacional</span>
              </button>

              <button
                type="button"
                className={styles.primaryActionBtn}
                onClick={onBackToDashboard}
              >
                <span>Volver al Tablero Principal</span>
              </button>
            </div>
          </div>
        ) : (
          /* SCREEN B: COMPLETE VOCATIONAL DIAGNOSIS & ACTION PLAN */
          <div className={styles.resultsWrapper}>
            {/* TOP 2-COLUMN SECTION: DOMINANT HERO (LEFT) + EBL PROMO SIDEBAR (RIGHT) */}
            <div className={styles.resultsTopSplit}>
              {/* Left: Dominant Profile & Dimension Breakdown */}
              <div className={styles.resultsMainCol}>
                {/* Result Hero Banner in Rose Theme */}
                <div className={styles.resultHeroRose}>
                  <div className={styles.resultHeroTop}>
                    <div className={styles.heroIconBoxRose}>
                      {dominantProfile.icon}
                    </div>
                    <div>
                      <span className={styles.resultBadgeRose}>{dominantProfile.badge}</span>
                      <h1 className={styles.dominantTitleRose}>{dominantProfile.name}</h1>
                      <p className={styles.dominantTaglineRose}>{dominantProfile.tagline}</p>
                    </div>
                  </div>

                  <p className={styles.dominantDescRose}>{dominantProfile.description}</p>
                </div>

                {/* Archetype Breakdown Bars */}
                <div className={styles.resultCard}>
                  <h3 className={styles.cardHeading}>
                    <BarChart size={18} className={styles.cardHeadingIcon} />
                    <span>Desglose de tus 4 Dimensiones Vocacionales</span>
                  </h3>

                  <div className={styles.breakdownList}>
                    {(Object.keys(scores) as Archetype[]).map((arch) => {
                      const prof = archetypeProfiles[arch];
                      const count = scores[arch];
                      const pct = answeredCount > 0 ? Math.round((count / answeredCount) * 100) : 0;
                      const isDominant = arch === dominantArchetype;

                      return (
                        <div key={arch} className={styles.breakdownItem}>
                          <div className={styles.breakdownHeader}>
                            <div className={styles.breakdownLabelGroup}>
                              <strong className={styles.archName}>{prof.name}</strong>
                              {isDominant && (
                                <span className={styles.dominantPill}>DOMINANTE</span>
                              )}
                            </div>
                            <span className={styles.archPct}>{pct}% ({count}/{answeredCount})</span>
                          </div>
                          <div className={styles.archBarTrack}>
                            <div
                              className={styles.archBarFill}
                              style={{
                                width: `${pct}%`,
                                background: isDominant
                                  ? 'linear-gradient(90deg, #EC4899 0%, #DB2777 100%)'
                                  : prof.color,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right: EBL Sticky Top Promo Card + AI Feedback Card */}
              <div className={styles.resultsSideCol}>
                {/* 1. TOP EBL PROMO CARD (100% visible without scrolling) */}
                <div className={styles.eblSideCard}>
                  <div className={styles.eblSideTag}>
                    <Sparkles size={13} />
                    <span>PRÓXIMO PASO RECOMENDADO</span>
                  </div>
                  <h3 className={styles.eblSideTitle}>
                    Llevá tu perfil {dominantProfile.name} a ofertas reales
                  </h3>
                  <p className={styles.eblSideDesc}>
                    Conocer tu vocación es el primer paso. En la <strong>Experiencia Búsqueda Laboral (EBL)</strong> te acompañamos a plasmar tus fortalezas en un <strong>CV ATS de alto impacto</strong>, optimizar tu <strong>LinkedIn</strong> y dominar entrevistas con Flor Martínez.
                  </p>

                  <div className={styles.eblSidePerks}>
                    <div className={styles.eblSidePerkItem}>
                      <CheckCircle2 size={15} className={styles.perkCheck} />
                      <span>7 Módulos de formación práctica</span>
                    </div>
                    <div className={styles.eblSidePerkItem}>
                      <CheckCircle2 size={15} className={styles.perkCheck} />
                      <span>Plantillas de CV ATS y LinkedIn</span>
                    </div>
                    <div className={styles.eblSidePerkItem}>
                      <CheckCircle2 size={15} className={styles.perkCheck} />
                      <span>Clases semanales en vivo por Zoom</span>
                    </div>
                  </div>

                  <div className={styles.eblSideActions}>
                    <a href="/experiencia" className={styles.eblSideJoinBtn}>
                      <span>Sumarme a la Experiencia</span>
                      <ArrowRight size={15} />
                    </a>
                    <a href="/campus" className={styles.eblSideCampusBtn}>
                      <GraduationCap size={15} />
                      <span>Ver Campus Virtual</span>
                    </a>
                  </div>
                </div>

                {/* 2. INTERACTIVE AI FEEDBACK WIDGET */}
                <div className={styles.feedbackCard}>
                  <div className={styles.feedbackHead}>
                    <Sparkles size={16} className={styles.feedbackIcon} />
                    <strong className={styles.feedbackTitle}>Calibrá nuestro Modelo de IA</strong>
                  </div>
                  <p className={styles.feedbackSubtitle}>
                    ¿Qué tan acertado sentís tu resultado? Tu feedback entrena nuestro algoritmo vocacional.
                  </p>

                  {feedbackSent ? (
                    <div className={styles.feedbackSuccess}>
                      <CheckCircle2 size={20} className={styles.feedSuccessIcon} />
                      <div>
                        <strong>¡Gracias por tu aporte!</strong>
                        <p>Tus respuestas fueron registradas para el re-entrenamiento del modelo.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitFeedback} className={styles.feedbackForm}>
                      <div className={styles.starsRow}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={styles.starBtn}
                            onMouseEnter={() => setFeedbackHoverRating(star)}
                            onMouseLeave={() => setFeedbackHoverRating(0)}
                            onClick={() => setFeedbackRating(star)}
                            aria-label={`Calificar ${star} estrellas`}
                          >
                            <Star
                              size={22}
                              className={
                                (feedbackHoverRating || feedbackRating) >= star
                                  ? styles.starFilled
                                  : styles.starEmpty
                              }
                            />
                          </button>
                        ))}
                        {feedbackRating > 0 && (
                          <span className={styles.starLabel}>
                            {feedbackRating === 5 ? '¡Excelente!' : feedbackRating >= 3 ? 'Alineado' : 'A mejorar'}
                          </span>
                        )}
                      </div>

                      <input
                        type="text"
                        placeholder="Ej: Me gustaría que incluya roles de IA o Marketing..."
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        className={styles.feedbackInput}
                      />

                      <button
                        type="submit"
                        disabled={feedbackRating === 0 && !feedbackText.trim()}
                        className={styles.feedbackSubmitBtn}
                      >
                        <Send size={13} />
                        <span>Enviar Feedback para la IA</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* MIDDLE SECTION: STRENGTHS & RECOMMENDED ROLES */}
            <div className={styles.middleGrid}>
              {/* Key Strengths */}
              <div className={styles.resultCard}>
                <h3 className={styles.cardHeading}>
                  <Sparkles size={18} className={styles.cardHeadingIcon} />
                  <span>Tus Fortalezas Clave Diferenciales</span>
                </h3>
                <ul className={styles.strengthsList}>
                  {dominantProfile.keyStrengths.map((str, idx) => (
                    <li key={idx} className={styles.strengthItem}>
                      <CheckCircle2 size={16} className={styles.checkIcon} />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Roles */}
              <div className={styles.resultCard}>
                <h3 className={styles.cardHeading}>
                  <Briefcase size={18} className={styles.cardHeadingIcon} />
                  <span>Puestos & Roles con Mayor Afinidad</span>
                </h3>
                <p className={styles.cardSubText}>
                  Posiciones en el mercado donde tu perfil natural tiene ventaja competitiva:
                </p>

                <div className={styles.rolesPillList}>
                  {dominantProfile.recommendedRoles.map((role, idx) => (
                    <div key={idx} className={styles.rolePill}>
                      <Target size={14} className={styles.rolePillIcon} />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BOTTOM SECTION: EBL ACTION PLAN ACROSS 3 KEY STAGES */}
            <div className={styles.resultCardHighlight}>
              <h3 className={styles.cardHeadingHighlight}>
                <Compass size={18} />
                <span>Cómo orientar tu Búsqueda Laboral con este Arquetipo</span>
              </h3>

              <div className={styles.eblSteps}>
                <div className={styles.eblStep}>
                  <div className={styles.eblStepIconBox}>
                    <FileText size={16} />
                  </div>
                  <div>
                    <strong className={styles.eblStepTitle}>Módulo 01 & 02 (Currículum ATS):</strong>
                    <p className={styles.eblStepText}>{dominantProfile.eblRecommendations.cvFocus}</p>
                  </div>
                </div>

                <div className={styles.eblStep}>
                  <div className={styles.eblStepIconBox}>
                    <Share2 size={16} />
                  </div>
                  <div>
                    <strong className={styles.eblStepTitle}>Módulo 03 (Perfil de LinkedIn):</strong>
                    <p className={styles.eblStepText}>{dominantProfile.eblRecommendations.linkedinFocus}</p>
                  </div>
                </div>

                <div className={styles.eblStep}>
                  <div className={styles.eblStepIconBox}>
                    <Users size={16} />
                  </div>
                  <div>
                    <strong className={styles.eblStepTitle}>Módulo 06 (Entrevistas STAR):</strong>
                    <p className={styles.eblStepText}>{dominantProfile.eblRecommendations.interviewFocus}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Footer Actions */}
            <div className={styles.resultsActionsBar}>
              <button
                type="button"
                className={styles.restartBtn}
                onClick={handleRestart}
              >
                <RotateCcw size={16} />
                <span>Rehacer Test Vocacional</span>
              </button>

              <button
                type="button"
                className={styles.primaryActionBtn}
                onClick={() => {
                  if (onGoToModule) {
                    onGoToModule('modulo-fundamentos');
                  } else {
                    onBackToDashboard();
                  }
                }}
              >
                <span>🎓 Comenzar Experiencia Búsqueda Laboral (Módulo 01)</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

