/**
 * Servicio de autenticación
 * Encapsula todas las llamadas API relacionadas con autenticación
 */

import { authApi } from './axios.config';
import { API_ENDPOINTS } from '@/constants';
import { LoginRequest, LoginResponse } from '@/types';

/**
 * Realiza el login del usuario
 * @param credentials - Credenciales de usuario (username y password)
 * @returns Token de autenticación y datos del usuario
 * @throws ApiError si las credenciales son inválidas
 */
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    console.log('Intentando login con:', { username: credentials.username, password: '***' });
    const response = await authApi.post<string | { token: string }>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    console.log('Respuesta del login:', response.data);
    
    // El API puede retornar el token directamente como string o como objeto
    // Normalizar la respuesta para que siempre sea un objeto con token
    const data = response.data;
    if (typeof data === 'string') {
      // Si es un string, es el token directamente
      return { token: data };
    }
    
    return data;
  } catch (error) {
    console.error('Error en login:', error);
    // El error ya fue formateado por el interceptor
    throw error;
  }
};

/**
 * Servicio de autenticación exportado como objeto
 * Facilita testing y extensión futura
 */
export const authService = {
  login,
};

