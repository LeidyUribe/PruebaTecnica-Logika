/**
 * Componente ErrorMessage
 * Muestra mensajes de error de forma consistente
 */

import React from 'react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

/**
 * Componente para mostrar mensajes de error
 * 
 * @example
 * ```tsx
 * <ErrorMessage message="Error al cargar los datos" />
 * ```
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  className = '',
}) => {
  return (
    <div
      className={`bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg ${className}`}
      role="alert"
    >
      <p className="font-medium">Error</p>
      <p className="text-sm">{message}</p>
    </div>
  );
};

