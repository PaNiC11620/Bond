import React from 'react';
import { AdminLogin } from './AdminLogin';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  onLogin: (username: string, password: string) => Promise<boolean>;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  isAuthenticated, 
  onLogin 
}) => {
  if (!isAuthenticated) {
    return <AdminLogin onLogin={onLogin} />;
  }

  return <>{children}</>;
};