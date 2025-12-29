/**
 * Tipos principales de la aplicación
 * Centraliza todas las definiciones de tipos TypeScript
 */

// ==================== AUTHENTICATION ====================
export interface LoginRequest {
  username: string;
  password: string;
}

// El API puede retornar el token directamente como string o como objeto
export type LoginResponse = string | {
  token: string;
  // Agregar otros campos si el API los retorna
  expiresIn?: number;
  user?: User;
};

export interface User {
  id: string;
  username: string;
  email: string;
  // Agregar otros campos según el API
}

// ==================== ACTIONS ====================
export interface Action {
  id: string;
  name?: string; // Nombre de la acción (el API usa 'name' en lugar de 'title')
  title?: string; // Mantener por compatibilidad
  description?: string;
  status?: string | number; // Estado puede ser string o número
  color?: string; // Color de la acción
  createdAt?: string;
  updatedAt?: string;
  // Agregar otros campos según la respuesta del API
  [key: string]: unknown;
}

export interface CreateActionRequest {
  name: string; // El API espera 'name', no 'title'
  description?: string;
  color: string; // Requerido por el API
  status: number; // Requerido por el API (Integer)
  icon: File; // Requerido por el API (MultipartFile)
  [key: string]: unknown;
}

export interface ActionsListResponse {
  data: Action[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
}

// ==================== API RESPONSES ====================
export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

// ==================== UI STATES ====================
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

