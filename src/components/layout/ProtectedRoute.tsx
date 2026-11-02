import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HirePilotLogo } from '../ui/HirePilotLogo';
import { Loader2 } from 'lucide-react';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-600 gap-4">
        <HirePilotLogo variant="loading" />
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <Loader2 className="w-4 h-4 animate-spin text-brand-600" />
          <span>Authenticating session...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
