/**
 * Configuración centralizada de Axios
 * Maneja interceptores para autenticación y errores
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URLS } from '@/constants';
import { getAuthToken, removeAuthToken } from '@/utils/storage';
import { ApiError } from '@/types';

/**
 * Crea una instancia de Axios para autenticación
 */
export const authApi: AxiosInstance = axios.create({
  baseURL: API_BASE_URLS.AUTH,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Crea una instancia de Axios para acciones (requiere autenticación)
 */
export const actionsApi: AxiosInstance = axios.create({
  baseURL: API_BASE_URLS.ACTIONS,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor para agregar token a las peticiones de acciones
 * También maneja FormData para que Axios configure automáticamente el Content-Type
 */
actionsApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Si los datos son FormData, eliminar Content-Type para que Axios lo configure automáticamente
    // con el boundary correcto
    if (config.data instanceof FormData && config.headers) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor para manejar errores de respuesta
 */
const setupResponseInterceptor = (apiInstance: AxiosInstance) => {
  apiInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // Manejo de errores 401 (No autorizado)
      if (error.response?.status === 401) {
        removeAuthToken();
        // Redirigir al login si estamos en el navegador
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }

      // Formatear error para consumo consistente
      const responseData = error.response?.data as any;
      const errorMessage = 
        responseData?.message || 
        responseData?.error || 
        error.message || 
        'Error desconocido';

      const apiError: ApiError = {
        message: errorMessage,
        statusCode: error.response?.status,
        errors: responseData?.errors || (responseData?.error ? { general: [responseData.error] } : undefined),
      };

      return Promise.reject(apiError);
    }
  );
};

// Aplicar interceptor a ambas instancias
setupResponseInterceptor(authApi);
setupResponseInterceptor(actionsApi);

