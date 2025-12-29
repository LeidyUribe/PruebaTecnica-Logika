/**
 * Hook personalizado para manejo de autenticación
 * Encapsula la lógica de login, logout y estado de autenticación
 */

import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { authService } from '@/api/auth.service';
import { setAuthToken, removeAuthToken, getAuthToken } from '@/utils/storage';
import { LoginRequest, ApiError } from '@/types';
import { MESSAGES } from '@/constants';

interface UseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

/**
 * Hook para manejar la autenticación del usuario
 * 
 * @returns Objeto con estado y funciones de autenticación
 * 
 * @example
 * ```tsx
 * const { login, logout, isAuthenticated } = useAuth();
 * 
 * await login({ username: 'user@example.com', password: 'pass' });
 * ```
 */
export const useAuth = (): UseAuthReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!getAuthToken();
  });

  const login = useCallback(async (credentials: LoginRequest): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);
      
      const token = typeof response === 'string' 
        ? response 
        : response.token || 
          (response as any).data?.token || 
          (response as any).accessToken ||
          (response as any).access_token;

      if (token && typeof token === 'string') {
        setAuthToken(token);
        setIsAuthenticated(true);
        toast.success(MESSAGES.LOGIN.SUCCESS);
      } else {
        const errorMsg = 'Token no recibido en la respuesta del servidor';
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (err) {
      const apiError = err as ApiError;
      const errorMessage = apiError.message || MESSAGES.LOGIN.ERROR;
      setError(errorMessage);
      setIsAuthenticated(false);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    removeAuthToken();
    setIsAuthenticated(false);
    setError(null);
    toast.success('Sesión cerrada exitosamente');
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    clearError,
  };
};

