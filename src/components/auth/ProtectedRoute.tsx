import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { Compass } from 'lucide-react';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-marine-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full border border-teal-500/30 flex items-center justify-center relative mb-4 bg-marine-900 shadow-console">
          <div className="absolute inset-0 rounded-full border border-t-teal-400 animate-spin" />
          <Compass className="w-7 h-7 text-teal-400" />
        </div>
        <div className="space-y-1 font-mono">
          <div className="text-sm font-semibold text-marine-100 tracking-wider">
            AUTHENTICATING SURVEILLANCE SESSION
          </div>
          <div className="text-xs text-teal-400/80">
            Verifying analyst credentials & clearance...
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Preserve the current path so the user is brought back after login/signup
    const redirectParam = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirectParam}`} replace state={{ from: location }} />;
  }

  return children ? <>{children}</> : <Outlet />;
};
