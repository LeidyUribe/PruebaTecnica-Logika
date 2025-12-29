/**
 * Hook personalizado para manejo de acciones
 * Encapsula la lógica de obtener y crear acciones
 */

import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { actionsService } from '@/api/actions.service';
import { Action, CreateActionRequest, ActionsListResponse, PaginationParams, ApiError } from '@/types';
import { PAGINATION, MESSAGES } from '@/constants';

interface UseActionsReturn {
  actions: Action[];
  pagination: {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  } | null;
  isLoading: boolean;
  error: string | null;
  fetchActions: (params?: Partial<PaginationParams>) => Promise<void>;
  createAction: (actionData: CreateActionRequest) => Promise<Action>;
  clearError: () => void;
}

/**
 * Hook para manejar las acciones
 * 
 * @returns Objeto con estado y funciones para gestionar acciones
 * 
 * @example
 * ```tsx
 * const { actions, fetchActions, createAction, isLoading } = useActions();
 * 
 * useEffect(() => {
 *   fetchActions({ pageNumber: 1, pageSize: 10 });
 * }, []);
 * ```
 */
export const useActions = (): UseActionsReturn => {
  const [actions, setActions] = useState<Action[]>([]);
  const [pagination, setPagination] = useState<UseActionsReturn['pagination']>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Obtiene el listado de acciones con paginación
   */
  const fetchActions = useCallback(async (params?: Partial<PaginationParams>): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const paginationParams: PaginationParams = {
        pageNumber: params?.pageNumber ?? PAGINATION.DEFAULT_PAGE_NUMBER,
        pageSize: params?.pageSize ?? PAGINATION.DEFAULT_PAGE_SIZE,
      };

      const response: ActionsListResponse = await actionsService.getActionsList(paginationParams);
      const actionsArray = Array.isArray(response.data) ? response.data : [];
      
      setActions(actionsArray);
      setPagination({
        pageNumber: response.pageNumber ?? paginationParams.pageNumber,
        pageSize: response.pageSize ?? paginationParams.pageSize,
        totalCount: response.totalCount ?? 0,
        totalPages: response.totalPages ?? 0,
        hasPreviousPage: response.hasPreviousPage ?? false,
        hasNextPage: response.hasNextPage ?? false,
      });
    } catch (err) {
      const apiError = err as ApiError;
      const errorMessage = apiError.message || MESSAGES.ACTIONS.LOAD_ERROR;
      setError(errorMessage);
      setActions([]);
      setPagination(null);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Crea una nueva acción
   */
  const createAction = useCallback(async (actionData: CreateActionRequest): Promise<Action> => {
    setIsLoading(true);
    setError(null);

    try {
      const newAction = await actionsService.createAction(actionData);
      toast.success(MESSAGES.ACTIONS.CREATE_SUCCESS);
      return newAction;
    } catch (err) {
      const apiError = err as ApiError;
      const errorMessage = apiError.message || MESSAGES.ACTIONS.CREATE_ERROR;
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Limpia el error actual
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    actions,
    pagination,
    isLoading,
    error,
    fetchActions,
    createAction,
    clearError,
  };
};

