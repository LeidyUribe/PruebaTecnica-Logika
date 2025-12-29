/**
 * Contexto de autenticación
 * Proporciona estado y funciones de autenticación a toda la aplicación
 * 
 * Principio: Single Responsibility - Solo maneja autenticación
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LoginRequest } from '@/types';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider del contexto de autenticación
 * Envuelve la aplicación y proporciona el estado de autenticación
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

/**
 * Hook para acceder al contexto de autenticación
 * 
 * @throws Error si se usa fuera del AuthProvider
 * 
 * @example
 * ```tsx
 * const { isAuthenticated, login, logout } = useAuthContext();
 * ```
 */
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

