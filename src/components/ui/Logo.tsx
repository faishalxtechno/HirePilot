import React from 'react';
import { Link } from 'react-router-dom';

export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'custom';

export interface LogoProps {
  /** Size preset for the logo */
  size?: LogoSize;
  /** Whether to render as a clickable Link to home */
  asLink?: boolean;
  /** Target path if rendered as a link (defaults to "/") */
  to?: string;
  /** Whether to display the text wordmark alongside the logo */
  withText?: boolean;
  /** Custom text styling if withText is true */
  textClassName?: string;
  /** Custom container class */
  className?: string;
  /** Custom image class */
  imgClassName?: string;
  /** Meaningful alt text (defaults to "HirePilot") */
  alt?: string;
  /** Optional onClick handler */
  onClick?: (e: React.MouseEvent) => void;
}

const sizeClasses: Record<LogoSize, { img: string; text: string }> = {
  xs: { img: 'h-6 w-6', text: 'text-sm' },
  sm: { img: 'h-8 w-8', text: 'text-base' },
  md: { img: 'h-10 w-10', text: 'text-lg sm:text-xl' },
  lg: { img: 'h-12 w-12', text: 'text-xl sm:text-2xl' },
  xl: { img: 'h-16 w-16', text: 'text-2xl sm:text-3xl' },
  '2xl': { img: 'h-20 w-20', text: 'text-3xl' },
  custom: { img: '', text: '' },
};

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  asLink = false,
  to = '/',
  withText = false,
  textClassName = '',
  className = '',
  imgClassName = '',
  alt = 'HirePilot',
  onClick,
}) => {
  const currentSize = sizeClasses[size] || sizeClasses.md;

  const content = (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <img
        src="/assets/hirepilot-logo.png"
        alt={alt}
        className={`object-contain transition-transform duration-200 ${currentSize.img} ${imgClassName}`}
        loading="eager"
      />
      {withText && (
        <span
          className={`font-sans font-extrabold tracking-tight text-current ${currentSize.text} ${textClassName}`}
        >
          HirePilot
        </span>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className="inline-flex items-center focus:outline-none group"
        aria-label="HirePilot Home"
      >
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
