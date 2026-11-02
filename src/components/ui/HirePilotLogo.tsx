import React from 'react';
import { Link } from 'react-router-dom';

export type LogoVariant = 'navbar' | 'sidebar' | 'auth' | 'footer' | 'mobile' | 'header' | 'loading' | 'custom';

export interface HirePilotLogoProps {
  /** Display preset tailored for each page section */
  variant?: LogoVariant;
  /** Whether to wrap the logo in a clickable React Router Link (default: true) */
  asLink?: boolean;
  /** Destination route if asLink is true (default: '/') */
  to?: string;
  /** Additional container styling */
  className?: string;
  /** Additional img styling */
  imgClassName?: string;
  /** Accessible alt text */
  alt?: string;
  /** Optional click handler */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** Priority eager loading for above-the-fold assets */
  priority?: boolean;
}

const variantConfig: Record<LogoVariant, { container: string; img: string }> = {
  navbar: {
    container: 'inline-flex items-center',
    img: 'w-full max-w-[145px] sm:max-w-[165px] h-auto max-h-11 sm:max-h-12 object-contain',
  },
  sidebar: {
    container: 'w-full flex items-center justify-start',
    img: 'w-full max-w-[170px] h-auto max-h-14 object-contain',
  },
  auth: {
    container: 'inline-flex items-center justify-center',
    img: 'w-full max-w-[200px] sm:max-w-[220px] h-auto max-h-16 object-contain',
  },
  footer: {
    container: 'inline-flex items-center',
    img: 'w-full max-w-[155px] sm:max-w-[170px] h-auto max-h-12 object-contain',
  },
  mobile: {
    container: 'inline-flex items-center',
    img: 'w-auto max-w-[125px] sm:max-w-[140px] h-auto max-h-9 object-contain',
  },
  header: {
    container: 'inline-flex items-center',
    img: 'w-full max-w-[150px] h-auto max-h-10 object-contain',
  },
  loading: {
    container: 'inline-flex items-center justify-center',
    img: 'w-full max-w-[220px] h-auto max-h-16 object-contain',
  },
  custom: {
    container: 'inline-flex items-center',
    img: 'w-full h-auto object-contain',
  },
};

export const HirePilotLogo: React.FC<HirePilotLogoProps> = ({
  variant = 'navbar',
  asLink = false,
  to = '/',
  className = '',
  imgClassName = '',
  alt = 'HirePilot - Practice, Prepare, Get Hired',
  onClick,
  priority = true,
}) => {
  const currentConfig = variantConfig[variant] || variantConfig.navbar;

  const imageElement = (
    <div
      className={`relative inline-flex items-center select-none transition-transform duration-150 rounded-lg bg-white/95 dark:bg-white p-1 dark:p-1.5 shadow-xs dark:shadow-md ${currentConfig.container} ${className}`}
    >
      <img
        src="/images/hirepilot-logo.png"
        alt={alt}
        className={`object-contain transition-opacity duration-200 ${currentConfig.img} ${imgClassName}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        width={2172}
        height={724}
      />
    </div>
  );

  if (asLink) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className="inline-flex items-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg group"
        aria-label="HirePilot Home - Practice, Prepare, Get Hired"
      >
        {imageElement}
      </Link>
    );
  }

  return imageElement;
};

export default HirePilotLogo;

