/**
 * Servicio de acciones
 * Encapsula todas las llamadas API relacionadas con acciones
 */

import { actionsApi } from './axios.config';
import { API_ENDPOINTS } from '@/constants';
import { Action, CreateActionRequest, ActionsListResponse, PaginationParams } from '@/types';

/**
 * Obtiene el listado paginado de acciones
 * @param params - Parámetros de paginación (pageNumber y pageSize)
 * @returns Lista de acciones con metadatos de paginación
 * @throws ApiError si hay un error en la petición
 */
export const getActionsList = async (
  params: PaginationParams
): Promise<ActionsListResponse> => {
  try {
    console.log('Obteniendo lista de acciones con params:', params);
    const response = await actionsApi.get<any>(
      API_ENDPOINTS.ACTIONS.LIST,
      { params }
    );
    console.log('Respuesta del API de acciones:', response.data);
    
    // El API podría retornar diferentes estructuras
    // Normalizar la respuesta
    const data = response.data;
    
    // Si la respuesta es directamente un array
    if (Array.isArray(data)) {
      return {
        data: data,
        pageNumber: params.pageNumber,
        pageSize: params.pageSize,
        totalCount: data.length,
        totalPages: Math.ceil(data.length / params.pageSize),
        hasPreviousPage: params.pageNumber > 1,
        hasNextPage: false, // Si es array directo, asumimos que no hay más páginas
      };
    }
    
    // Si tiene la estructura esperada
    if (data && typeof data === 'object') {
      // Intentar diferentes posibles estructuras
      // El API podría retornar: { data: [...] } o directamente el array en data.data
      let actionsArray: any[] = [];
      
      // Intentar diferentes campos donde podría estar el array
      if (Array.isArray(data.data)) {
        actionsArray = data.data;
      } else if (Array.isArray(data.items)) {
        actionsArray = data.items;
      } else if (Array.isArray(data.results)) {
        actionsArray = data.results;
      } else if (Array.isArray(data.actions)) {
        actionsArray = data.actions;
      } else if (Array.isArray(data)) {
        // Si data es directamente un array
        actionsArray = data;
      } else if (data.data && typeof data.data === 'object' && Array.isArray(data.data.data)) {
        // Estructura anidada: { data: { data: [...] } }
        actionsArray = data.data.data;
      }
      
      console.log('Array de acciones extraído:', actionsArray);
      
      // Extraer información de paginación
      const paginationInfo = data.data && typeof data.data === 'object' && !Array.isArray(data.data)
        ? data.data // Si data.data es un objeto con info de paginación
        : data; // Si la info está en el nivel superior
      
      return {
        data: Array.isArray(actionsArray) ? actionsArray : [],
        pageNumber: paginationInfo?.pageNumber ?? data.pageNumber ?? params.pageNumber,
        pageSize: paginationInfo?.pageSize ?? data.pageSize ?? params.pageSize,
        totalCount: paginationInfo?.totalCount ?? paginationInfo?.total ?? data.totalCount ?? data.total ?? (Array.isArray(actionsArray) ? actionsArray.length : 0),
        totalPages: paginationInfo?.totalPages ?? data.totalPages ?? Math.ceil((paginationInfo?.totalCount ?? paginationInfo?.total ?? data.totalCount ?? data.total ?? 0) / (paginationInfo?.pageSize ?? data.pageSize ?? params.pageSize)),
        hasPreviousPage: paginationInfo?.hasPreviousPage ?? data.hasPreviousPage ?? ((paginationInfo?.pageNumber ?? data.pageNumber ?? params.pageNumber) > 1),
        hasNextPage: paginationInfo?.hasNextPage ?? data.hasNextPage ?? false,
      };
    }
    
    // Si no tiene estructura reconocida, retornar vacío
    console.warn('Estructura de respuesta no reconocida:', data);
    return {
      data: [],
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
      totalCount: 0,
      totalPages: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    };
  } catch (error) {
    console.error('Error obteniendo acciones:', error);
    throw error;
  }
};

/**
 * Crea una nueva acción
 * @param actionData - Datos de la acción a crear
 * @returns La acción creada
 * @throws ApiError si hay un error en la petición
 */
export const createAction = async (actionData: CreateActionRequest): Promise<Action> => {
  try {
    console.log('Creando acción con datos:', actionData);
    
    // El API requiere multipart/form-data (probablemente por el campo de archivo)
    // Usar FormData para enviar los datos
    const formData = new FormData();
    
    // Agregar cada campo del actionData al FormData
    // name (requerido)
    if (actionData.name) {
      formData.append('name', actionData.name);
    }
    
    // description (opcional, pero enviar si existe)
    if (actionData.description) {
      formData.append('description', actionData.description);
    }
    
    // color (requerido)
    if (actionData.color) {
      formData.append('color', actionData.color);
    }
    
    // status (requerido, debe ser número)
    if (actionData.status !== undefined && actionData.status !== null) {
      formData.append('status', String(actionData.status));
    }
    
    // icon (requerido, archivo)
    if (actionData.icon instanceof File) {
      formData.append('icon', actionData.icon);
    }
    
    console.log('Enviando como multipart/form-data');
    
    // No especificar Content-Type manualmente, Axios lo detectará automáticamente
    // para FormData y agregará el boundary necesario (ej: multipart/form-data; boundary=...)
    const response = await actionsApi.post<Action>(
      API_ENDPOINTS.ACTIONS.CREATE,
      formData
      // Sin headers personalizados - Axios manejará el Content-Type automáticamente
    );
    
    console.log('Respuesta de crear acción:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creando acción:', error);
    throw error;
  }
};

/**
 * Servicio de acciones exportado como objeto
 * Facilita testing y extensión futura
 */
export const actionsService = {
  getActionsList,
  createAction,
};

