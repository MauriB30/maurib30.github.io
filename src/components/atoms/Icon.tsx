import type { LucideIcon } from 'lucide-react';

interface IconProps {
  icon: LucideIcon;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function Icon({
  icon: Component,
  size = 18,
  strokeWidth = 1.7,
  className = '',
}: IconProps) {
  return (
    <Component
      size={size}
      strokeWidth={strokeWidth}
      className={`shrink-0 ${className}`}
      aria-hidden='true'
      focusable='false'
    />
  );
}
