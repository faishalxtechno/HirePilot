import React, { useEffect, useState } from 'react';
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
  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setIsClosing(false);
      document.body.style.overflow = 'hidden';
    } else if (mounted) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setMounted(false);
        setIsClosing(false);
        document.body.style.overflow = 'unset';
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isClosing) {
        handleDismiss();
      }
    };

    if (mounted) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [mounted, isOpen, isClosing]);

  const handleDismiss = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  if (!mounted) return null;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-[220ms] ease-out',
          isClosing ? 'opacity-0' : 'opacity-100'
        )}
        onClick={handleDismiss}
      />

      {/* Modal Dialog Card */}
      <div
        className={cn(
          'relative w-full max-h-[90vh] flex flex-col rounded-2xl border border-white/10 p-6 z-10 transition-all duration-[220ms] ease-out overflow-hidden',
          'bg-[#121212] shadow-2xl',
          maxWidths[maxWidth],
          isClosing ? 'opacity-0 scale-[0.97] translate-y-2' : 'opacity-100 scale-100 translate-y-0'
        )}
      >
        <div className="flex items-start justify-between pb-4 gap-3 border-b border-white/5 shrink-0">
          <div>
            {title && (
              <h3 id="modal-title" className="text-lg font-medium text-white tracking-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-brand-secondary mt-1.5">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={handleDismiss}
            aria-label="Close modal"
            className="p-2 text-brand-muted hover:text-white rounded-full hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-4 overflow-y-auto flex-1 pr-1">{children}</div>
      </div>
    </div>
  );
};
