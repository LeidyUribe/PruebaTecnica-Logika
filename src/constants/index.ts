/**
 * Constantes de la aplicación
 * Centraliza valores que no deberían cambiar durante la ejecución
 */

// ==================== API ENDPOINTS ====================
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/Authentication/Login',
  },
  ACTIONS: {
    LIST: '/api/v1/actions/admin-list',
    CREATE: '/api/v1/actions/admin-add',
  },
} as const;

// ==================== API BASE URLS ====================
export const API_BASE_URLS = {
  AUTH: 'https://dev.apinetbo.bekindnetwork.com',
  ACTIONS: 'https://dev.api.bekindnetwork.com',
} as const;

// ==================== STORAGE KEYS ====================
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
} as const;

// ==================== ROUTES ====================
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  ROOT: '/',
} as const;

// ==================== PAGINATION ====================
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE_NUMBER: 1,
} as const;

// ==================== VALIDATION ====================
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 3,
  MAX_TITLE_LENGTH: 200,
  MAX_DESCRIPTION_LENGTH: 1000,
} as const;

// ==================== MESSAGES ====================
export const MESSAGES = {
  LOGIN: {
    SUCCESS: 'Inicio de sesión exitoso',
    ERROR: 'Error al iniciar sesión. Verifica tus credenciales',
    REQUIRED_USERNAME: 'El usuario es requerido',
    REQUIRED_PASSWORD: 'La contraseña es requerida',
  },
  ACTIONS: {
    CREATE_SUCCESS: 'Acción creada exitosamente',
    CREATE_ERROR: 'Error al crear la acción',
    LOAD_ERROR: 'Error al cargar las acciones',
    EMPTY_LIST: 'No hay acciones disponibles',
    REQUIRED_TITLE: 'El título es requerido',
    TITLE_TOO_LONG: `El título no puede exceder ${VALIDATION.MAX_TITLE_LENGTH} caracteres`,
    DESCRIPTION_TOO_LONG: `La descripción no puede exceder ${VALIDATION.MAX_DESCRIPTION_LENGTH} caracteres`,
  },
  AUTH: {
    UNAUTHORIZED: 'No autorizado. Por favor inicia sesión',
    SESSION_EXPIRED: 'Tu sesión ha expirado. Por favor inicia sesión nuevamente',
  },
} as const;

