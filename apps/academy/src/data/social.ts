import { SocialChannel } from '@/types';

export const socialChannels: SocialChannel[] = [
  {
    name: 'Instagram',
    handle: '@flormartinez.ok',
    url: 'https://www.instagram.com',
    description: 'Tips diarios de empleabilidad, videos explicativos de CV y LinkedIn, análisis de ofertas de trabajo y novedades de la Academia.',
    badge: 'Comunidad Diaria',
    icon: 'instagram',
  },
  {
    name: 'LinkedIn',
    handle: 'Flor Martinez',
    url: 'https://www.linkedin.com',
    description: 'Artículos de análisis sobre el mercado laboral, tendencias de contratación, desarrollo de talento y reflexiones profesionales.',
    badge: 'Red Profesional',
    icon: 'linkedin',
  },
  {
    name: 'Contacto Directo',
    handle: 'contacto@flormartinez.com',
    url: 'mailto:contacto@flormartinez.com',
    description: 'Consultas sobre inscripciones, capacitaciones para empresas o mentorías personalizadas de desarrollo de carrera.',
    badge: 'Email',
    icon: 'mail',
  },
];
