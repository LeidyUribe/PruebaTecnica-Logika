/**
 * Componente Pagination
 * Maneja la navegación entre páginas
 */

import React from 'react';
import { Button } from '@/components/common/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

/**
 * Componente de paginación
 * 
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={1}
 *   totalPages={5}
 *   hasPreviousPage={false}
 *   hasNextPage={true}
 *   onPageChange={(page) => fetchActions({ pageNumber: page })}
 * />
 * ```
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
  isLoading = false,
}) => {
  // No mostrar paginación si solo hay una página o menos
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (hasPreviousPage && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNextPage && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg mt-4">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          variant="outline"
          size="small"
          onClick={handlePrevious}
          disabled={!hasPreviousPage || isLoading}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="small"
          onClick={handleNext}
          disabled={!hasNextPage || isLoading}
        >
          Siguiente
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Página <span className="font-medium">{currentPage}</span> de{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <Button
              variant="outline"
              size="small"
              onClick={handlePrevious}
              disabled={!hasPreviousPage || isLoading}
              className="rounded-r-none"
            >
              Anterior
            </Button>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="small"
              onClick={handleNext}
              disabled={!hasNextPage || isLoading}
              className="rounded-l-none"
            >
              Siguiente
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
};

