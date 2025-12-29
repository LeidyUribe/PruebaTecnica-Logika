/**
 * Hook personalizado para manejo de autenticación
 * Encapsula la lógica de login, logout y estado de autenticación
 */

import { useState, useCallback } from 'react';
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
    // Verificar si hay token al inicializar
    return !!getAuthToken();
  });

  /**
   * Realiza el login del usuario
   */
  const login = useCallback(async (credentials: LoginRequest): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);
      
      // El API puede retornar el token directamente como string o como objeto
      // Extraer el token de la respuesta normalizada
      const token = typeof response === 'string' 
        ? response 
        : response.token || 
          (response as any).data?.token || 
          (response as any).accessToken ||
          (response as any).access_token;

      if (token && typeof token === 'string') {
        setAuthToken(token);
        setIsAuthenticated(true);
      } else {
        console.error('Respuesta del API:', response);
        throw new Error('Token no recibido en la respuesta del servidor');
      }
    } catch (err) {
      const apiError = err as ApiError;
      const errorMessage = apiError.message || MESSAGES.LOGIN.ERROR;
      setError(errorMessage);
      setIsAuthenticated(false);
      throw err; // Re-lanzar para que el componente pueda manejar el error
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Cierra la sesión del usuario
   */
  const logout = useCallback(() => {
    removeAuthToken();
    setIsAuthenticated(false);
    setError(null);
  }, []);

  /**
   * Limpia el error actual
   */
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

