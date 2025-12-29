/**
 * Componente ActionsTable
 * Muestra el listado de acciones en formato tabla
 */

import React from 'react';
import { Action } from '@/types';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { MESSAGES } from '@/constants';

interface ActionsTableProps {
  actions: Action[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Componente de tabla para mostrar acciones
 * Maneja estados de loading, error y empty
 * 
 * @example
 * ```tsx
 * <ActionsTable
 *   actions={actions}
 *   isLoading={isLoading}
 *   error={error}
 * />
 * ```
 */
export const ActionsTable: React.FC<ActionsTableProps> = ({
  actions,
  isLoading,
  error,
}) => {
  const safeActions = Array.isArray(actions) ? actions : [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (safeActions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">{MESSAGES.ACTIONS.EMPTY_LIST}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Descripción
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Fecha de Creación
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {safeActions.map((action) => {
            const actionName = action.name || action.title || 'Sin título';
            const description = action.description || 'Sin descripción';
            const status = action.status !== undefined && action.status !== null 
              ? String(action.status) 
              : 'N/A';
             
            const formatDate = (dateString?: string): string => {
               if (!dateString) return 'N/A';
               try {
                 const date = new Date(dateString);
                 if (isNaN(date.getTime())) return 'N/A';
                 return date.toLocaleDateString('es-ES', {
                   day: '2-digit',
                   month: '2-digit',
                   year: 'numeric'
                 });
               } catch {
                 return 'N/A';
               }
             };
             
            const getStatusBadgeClass = (status: string): string => {
              const baseClass = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full';
              
              if (status === 'N/A' || status === 'null' || status === 'undefined' || status === '') {
                return `${baseClass} bg-gray-100 text-gray-600`;
              }
              
              const statusNum = Number(status);
              
              if (statusNum === 1) {
                return `${baseClass} bg-green-100 text-green-800`;
              }
              
              if (statusNum === 0) {
                return `${baseClass} bg-gray-100 text-gray-600`;
              }
              
              return `${baseClass} bg-blue-100 text-blue-800`;
            };
             
            const getStatusText = (status: string): string => {
               if (status === 'N/A' || status === 'null' || status === 'undefined' || status === '') {
                 return 'N/A';
               }
               
               const statusNum = Number(status);
               if (statusNum === 1) {
                 return 'Activo';
               }
               if (statusNum === 0) {
                 return 'Inactivo';
               }
               
               return status;
             };
            
            return (
              <tr key={action.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                  {action.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {actionName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                  <div className="truncate" title={description}>
                    {description}
                  </div>
                </td>
                 <td className="px-6 py-4 whitespace-nowrap">
                   <span className={getStatusBadgeClass(status)}>
                     {getStatusText(status)}
                   </span>
                 </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(action.createdAt)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

