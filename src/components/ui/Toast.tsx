import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onClose: (id: string) => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ id, message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500 animate-[pop_300ms_ease-out_forwards] scale-75" />,
    error: <XCircle className="w-5 h-5 text-red-500 animate-[pop_300ms_ease-out_forwards] scale-75" />,
    info: <Info className="w-5 h-5 text-blue-500 animate-[pop_300ms_ease-out_forwards] scale-75" />
  };

  const borderColors = {
    success: 'border-green-500/20',
    error: 'border-red-500/20',
    info: 'border-blue-500/20'
  };

  return (
    <div className={`flex items-center gap-3 bg-[#1a1a1c] border ${borderColors[type]} p-4 rounded-xl shadow-lg animate-toast pointer-events-auto min-w-[300px]`}>
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      <p className="text-sm font-medium text-white flex-1">{message}</p>
      <button 
        onClick={() => onClose(id)} 
        className="text-gray-400 hover:text-white transition-colors icon-button"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
