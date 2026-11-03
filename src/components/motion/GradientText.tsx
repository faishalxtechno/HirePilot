import React from 'react';

export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  animated?: boolean;
  withUnderline?: boolean;
  variant?: 'cosmic' | 'lavender' | 'aurora' | 'blue';
}

export const GradientText: React.FC<GradientTextProps> = ({
  animated = true,
  withUnderline = false,
  variant = 'blue',
  className = '',
  children,
  ...props
}) => {
  const gradientClasses = {
    blue: 'bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent',
    cosmic: animated ? 'animated-gradient-text' : 'cosmic-text-gradient',
    lavender: 'bg-gradient-to-r from-[#ba9cff] to-[#9382ff] bg-clip-text text-transparent',
    aurora: 'bg-gradient-to-r from-[#e59cff] via-[#9382ff] to-[#7cc8fb] bg-clip-text text-transparent',
  };

  return (
    <span
      className={`relative inline-block font-semibold ${gradientClasses[variant]} ${className}`}
      {...props}
    >
      {children}
      {withUnderline && (
        <span
          className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-transparent rounded-full opacity-80"
          aria-hidden="true"
        />
      )}
    </span>
  );
};

