import type { LucideIcon } from 'lucide-react';

export type SectionId = 'projects' | 'about' | 'contact';
export type PanelSectionId = SectionId | 'technologies';

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  technologies?: string[];
  image?: string;
  imageAlt?: string;
  sourceUrl?: string;
  status?: string;
  highlights?: string[];
}

export interface TechnologyGroup {
  title: string;
  items: string[];
}

export interface ProfileEntry {
  title: string;
  organization: string;
  period?: string;
  description?: string;
}

export interface Portfolio {
  name: string;
  role: string;
  intro: string;
  note: string;
  location: string;
  availability: string;
  languages: string[];
  email: string;
  links: { label: string; url: string }[];
  technologies: TechnologyGroup[];
  projects: Project[];
  education: ProfileEntry[];
  experience: ProfileEntry[];
}

export interface PortfolioNavigationItem {
  id: PanelSectionId;
  title: string;
  icon: LucideIcon;
}

export type OpenSection = (id: PanelSectionId, trigger?: HTMLElement) => void;
