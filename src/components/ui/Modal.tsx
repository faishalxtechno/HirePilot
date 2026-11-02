import React, { useEffect } from 'react';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'md',
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-[#030014]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative w-full bg-[#060317] rounded-[16px] border border-white/10 shadow-[inset_0_0_24px_rgba(255,255,255,0.04)] p-6 z-10 animate-slide-up text-[#f4f0ff]',
          maxWidths[maxWidth]
        )}
      >
        <div className="flex items-center justify-between pb-3">
          <div>
            {title && <h3 className="text-lg font-medium text-[#f4f0ff]">{title}</h3>}
            {description && <p className="text-xs text-[#a8a6b7] mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#918ea0] hover:text-[#f4f0ff] rounded-[5px] hover:bg-white/[0.04] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};
