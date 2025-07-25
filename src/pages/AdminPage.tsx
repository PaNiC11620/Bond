import React, { useState, useEffect } from 'react';
import { AdminHeader } from '../components/AdminHeader';
import { AdminPanel } from '../components/AdminPanel';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { authService } from '../utils/auth';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    const success = await authService.login(username, password);
    if (success) {
      setIsAuthenticated(true);
    }
    return success;
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-8 shadow-xl">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-200 border-t-amber-900 mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 bg-amber-900 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-700 font-medium text-lg">Перевірка авторизації...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute isAuthenticated={isAuthenticated} onLogin={handleLogin}>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader onLogout={handleLogout} />
        <AdminPanel />
      </div>
    </ProtectedRoute>
  );
};