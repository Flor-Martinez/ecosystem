import { Testimonial } from '@/types';

export const testimonialsData: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Valentina Rossi',
    role: 'Estudiante de Marketing → Analista Junior',
    currentCompanyOrField: 'Agencia de Medios',
    transformation: 'De no tener respuestas a 3 ofertas en 15 días',
    content:
      'Llevaba 4 meses mandando el mismo CV en Canva y no me llamaba nadie. En una tarde rehíce toda la estructura con el taller de CV de Alto Impacto y la diferencia fue abismal: a la semana tuve 3 entrevistas y cerré mi primera pasantía remunerada.',
    courseTaken: 'Taller Intensivo: CV de Alto Impacto & Filtros ATS',
    avatarText: 'VR',
    avatarBg: '#7C3AED',
    highlightMetric: '3 entrevistas en 1 semana',
  },
  {
    id: 'test-2',
    name: 'Tomás Benítez',
    role: 'Desarrollador Trainee',
    currentCompanyOrField: 'Software Factory',
    transformation: 'Optimizó su LinkedIn y lo contactó un recruiter',
    content:
      'Pensaba que LinkedIn era para directores o gente con 10 años de experiencia. Apliqué la fórmula del titular y completé la sección de proyectos del curso. A los 12 días me escribió un selector de una software factory para una entrevista técnica.',
    courseTaken: 'LinkedIn Magnético: Atraé Reclutadores',
    avatarText: 'TB',
    avatarBg: '#2563EB',
    highlightMetric: 'Mensaje de recruiter en 12 días',
  },
  {
    id: 'test-3',
    name: 'Camila Morales',
    role: 'Comercio Internacional → Analista de Operaciones',
    currentCompanyOrField: 'Empresa de Logística',
    transformation: 'Negoció un 30% más de salario en su propuesta',
    content:
      'Siempre me congelaba cuando me preguntaban por la remuneración pretendida. El módulo del método STAR y la matriz salarial me dieron la seguridad exacta para defender mi valor sin titubear. Conseguí el puesto con el paquete que quería.',
    courseTaken: 'Hackeá tus Entrevistas: Método STAR',
    avatarText: 'CM',
    avatarBg: '#059669',
    highlightMetric: '+30% de remuneración negociada',
  },
];
