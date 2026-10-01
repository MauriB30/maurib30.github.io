import { Code2, Mail, Monitor, UserRound } from 'lucide-react';
import type { PortfolioNavigationItem } from '../types/portfolio';

export const navigationItems: PortfolioNavigationItem[] = [
  { id: 'projects', title: 'Mis proyectos', icon: Monitor },
  { id: 'about', title: 'Sobre mí', icon: UserRound },
  { id: 'contact', title: 'Contacto', icon: Mail },
  { id: 'technologies', title: 'Tecnologías', icon: Code2 },
];
