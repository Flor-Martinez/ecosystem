export type CourseLevel = 'Inicial' | 'Intermedio' | 'Avanzado' | 'Todos los niveles';
export type CourseStatus = 'Disponible' | 'Próximamente' | 'Gratis';
export type CourseModality = 'Online en vivo' | 'Grabado + Asesoría' | 'Auto-guiado' | 'Workshop intensivo';

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  description: string;
  lessons: string[];
  duration: string;
  takeaway?: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  categorySlug: string;
  colorTheme?: string;
  level: CourseLevel;
  duration: string;
  workload: string;
  modality: CourseModality;
  status: CourseStatus;
  badge?: string;
  featured?: boolean;
  popular?: boolean;
  price?: {
    current: string;
    original?: string;
    currency: string;
    installments?: string;
  };
  summary: string;
  description: string[];
  targetAudience: string[];
  outcomes: string[];
  prerequisites: string[];
  modules: CourseModule[];
  included: string[];
  rating?: number;
  reviewsCount?: number;
}

export interface ResourceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
}

export type ResourceType = 'Plantilla' | 'Guía PDF' | 'Checklist' | 'Directorio' | 'Herramienta';

export interface Resource {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  type: ResourceType;
  format: string;
  tagline: string;
  description: string;
  highlights: string[];
  downloadUrl?: string;
  isExternal?: boolean;
  isFree: boolean;
  badge?: string;
  featured?: boolean;
  publishedDate: string;
  readingTime?: string;
  pagesOrItems?: string;
  instagramReference?: {
    postTitle: string;
    account: string;
  };
}

export interface LearningCategory {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  icon: string;
  colorBg: string;
  colorBorder: string;
  colorText: string;
  coursesCount: number;
  resourcesCount: number;
  highlightSkill: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  currentCompanyOrField?: string;
  transformation: string;
  content: string;
  courseTaken: string;
  avatarText: string;
  avatarBg?: string;
  highlightMetric?: string;
}

export interface SocialChannel {
  name: string;
  handle: string;
  url: string;
  description: string;
  badge: string;
  icon: 'linkedin' | 'instagram' | 'mail' | 'youtube';
}
