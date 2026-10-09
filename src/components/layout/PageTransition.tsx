import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { prefersReducedMotion } from '../../lib/motion';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [transitionKey, setTransitionKey] = useState(location.pathname);

  useEffect(() => {
    setTransitionKey(location.pathname);
  }, [location.pathname]);

  if (prefersReducedMotion()) {
    return <>{children}</>;
  }

  return (
    <div key={transitionKey} className="animate-page-enter w-full min-h-full">
      {children}
    </div>
  );
};
