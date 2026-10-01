import { useState } from 'react';
import type { PanelSectionId } from '../types/portfolio';

export function usePortfolioNavigation() {
  const [night, setNight] = useState(true);
  const [activeSection, setActiveSection] = useState<PanelSectionId>('about');

  function openSection(section: PanelSectionId) {
    setActiveSection(section);
  }

  function openFromRoom(section: PanelSectionId) {
    setActiveSection(section);
    document.getElementById('profile-tab-' + section)?.focus({ preventScroll: true });
    document.getElementById('profile-panel')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'nearest',
    });
  }

  return {
    night,
    activeSection,
    openSection,
    openFromRoom,
    toggleLight: () => setNight((current) => !current),
  };
}
