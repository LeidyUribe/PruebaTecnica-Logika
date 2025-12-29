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
    const response = await authApi.post<string | { token: string }>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    
    const data = response.data;
    if (typeof data === 'string') {
      return { token: data };
    }
    
    return data;
  } catch (error) {
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

