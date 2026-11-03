import React from 'react';

export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  animated?: boolean;
  withUnderline?: boolean;
  variant?: 'cosmic' | 'lavender' | 'aurora';
}

export const GradientText: React.FC<GradientTextProps> = ({
  animated = true,
  withUnderline = false,
  variant = 'cosmic',
  className = '',
  children,
  ...props
}) => {
  const gradientClasses = {
    cosmic: animated ? 'animated-gradient-text' : 'cosmic-text-gradient',
    lavender: 'bg-gradient-to-r from-[#ba9cff] to-[#9382ff] bg-clip-text text-transparent',
    aurora: 'bg-gradient-to-r from-[#e59cff] via-[#9382ff] to-[#7cc8fb] bg-clip-text text-transparent',
  };

  return (
    <span
      className={`relative inline-block font-medium ${gradientClasses[variant]} ${className}`}
      {...props}
    >
      {children}
      {withUnderline && (
        <span
          className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-[#ba9cff] via-[#9382ff] to-transparent rounded-full opacity-80"
          aria-hidden="true"
        />
      )}
    </span>
  );
};

