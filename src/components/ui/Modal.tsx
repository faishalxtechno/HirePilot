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
      }, 200);
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
    }, 200);
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
          'fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-200',
          isClosing ? 'opacity-0' : 'opacity-100 animate-fade-in'
        )}
        onClick={handleDismiss}
      />

      {/* Modal Dialog Card */}
      <div
        className={cn(
          'relative w-full max-h-[90vh] flex flex-col rounded-2xl border border-white/[0.1] shadow-glass-lg p-5 sm:p-6 z-10 transition-all duration-200 overflow-hidden',
          'bg-[rgba(12,20,37,0.9)] backdrop-blur-2xl',
          maxWidths[maxWidth],
          isClosing ? 'animate-modal-out' : 'animate-modal-in'
        )}
      >
        <div className="flex items-start justify-between pb-3 gap-3 border-b border-white/[0.06] shrink-0">
          <div>
            {title && (
              <h3 id="modal-title" className="text-base sm:text-lg font-bold text-white tracking-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs text-slate-400 mt-1">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={handleDismiss}
            aria-label="Close modal"
            className="p-2 text-slate-500 hover:text-white rounded-xl hover:bg-white/[0.06] transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-3 overflow-y-auto flex-1 pr-0.5">{children}</div>
      </div>
    </div>
  );
};
