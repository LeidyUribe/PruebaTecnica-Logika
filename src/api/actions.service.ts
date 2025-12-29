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
    const response = await actionsApi.get<any>(
      API_ENDPOINTS.ACTIONS.LIST,
      { params }
    );
    
    const data = response.data;
    
    if (Array.isArray(data)) {
      return {
        data: data,
        pageNumber: params.pageNumber,
        pageSize: params.pageSize,
        totalCount: data.length,
        totalPages: Math.ceil(data.length / params.pageSize),
        hasPreviousPage: params.pageNumber > 1,
        hasNextPage: false,
      };
    }
    
    if (data && typeof data === 'object') {
      let actionsArray: any[] = [];
      
      if (Array.isArray(data.data)) {
        actionsArray = data.data;
      } else if (Array.isArray(data.items)) {
        actionsArray = data.items;
      } else if (Array.isArray(data.results)) {
        actionsArray = data.results;
      } else if (Array.isArray(data.actions)) {
        actionsArray = data.actions;
      } else if (Array.isArray(data)) {
        actionsArray = data;
      } else if (data.data && typeof data.data === 'object' && Array.isArray(data.data.data)) {
        actionsArray = data.data.data;
      }
      
      const paginationInfo = data.data && typeof data.data === 'object' && !Array.isArray(data.data)
        ? data.data
        : data;
      
      const rawPageNumber = paginationInfo?.pageNumber ?? data.pageNumber ?? params.pageNumber;
      const normalizedPageNumber = rawPageNumber === 0 ? 1 : Math.max(1, rawPageNumber);
      
      const totalCount = paginationInfo?.totalCount ?? paginationInfo?.total ?? data.totalCount ?? data.total ?? (Array.isArray(actionsArray) ? actionsArray.length : 0);
      const pageSize = paginationInfo?.pageSize ?? data.pageSize ?? params.pageSize;
      const calculatedTotalPages = Math.ceil(totalCount / pageSize);
      
      return {
        data: Array.isArray(actionsArray) ? actionsArray : [],
        pageNumber: normalizedPageNumber,
        pageSize: pageSize,
        totalCount: totalCount,
        totalPages: paginationInfo?.totalPages ?? data.totalPages ?? calculatedTotalPages,
        hasPreviousPage: paginationInfo?.hasPreviousPage ?? data.hasPreviousPage ?? (normalizedPageNumber > 1),
        hasNextPage: paginationInfo?.hasNextPage ?? data.hasNextPage ?? (normalizedPageNumber < calculatedTotalPages),
      };
    }
    
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
    const formData = new FormData();
    
    if (actionData.name) {
      formData.append('name', actionData.name);
    }
    
    if (actionData.description) {
      formData.append('description', actionData.description);
    }
    
    if (actionData.color) {
      formData.append('color', actionData.color);
    }
    
    if (actionData.status !== undefined && actionData.status !== null) {
      formData.append('status', String(actionData.status));
    }
    
    if (actionData.icon instanceof File) {
      formData.append('icon', actionData.icon);
    }
    
    const response = await actionsApi.post<Action>(
      API_ENDPOINTS.ACTIONS.CREATE,
      formData
    );
    
    return response.data;
  } catch (error) {
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

