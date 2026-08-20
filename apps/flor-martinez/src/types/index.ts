export type BranchStatus = 'active' | 'coming_soon';

export interface EcosystemBranch {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  status: BranchStatus;
  statusLabel: string;
  ctaText: string;
  href: string;
  badgeText?: string;
  icon: string;
}

export type ProjectCategory = 'comercio-exterior' | 'marketing' | 'desarrollo' | 'ecosistema' | 'todos';

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'Comercio Exterior' | 'Marketing & Estrategia' | 'Educación & Carrera' | 'Ecosistema Digital';
  categorySlug: ProjectCategory;
  summary: string;
  tags: string[];
  year: string;
  role: string;
  impact?: string;
  challenge: string;
  solution: string;
  highlights: string[];
  featured: boolean;
  linkText?: string;
  linkUrl?: string;
  imageAlt: string;
}

export interface TrajectoryItem {
  id: string;
  year: string;
  title: string;
  institution: string;
  category: 'Experiencia' | 'Formación' | 'Hito Profesional';
  description: string;
  badge?: string;
}

export interface SocialChannel {
  name: string;
  handle: string;
  url: string;
  description: string;
  badge: string;
  icon: 'linkedin' | 'instagram' | 'mail' | 'globe';
}

export interface CorePillar {
  title: string;
  description: string;
  icon: string;
  stats?: string;
}
