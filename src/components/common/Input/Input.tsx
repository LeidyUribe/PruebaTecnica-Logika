/**
 * Componente Input reutilizable
 * Integrado con React Hook Form para validaciones
 */

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Componente Input con label, error y helper text
 * Compatible con React Hook Form usando forwardRef
 * 
 * @example
 * ```tsx
 * <Input
 *   label="Usuario"
 *   type="text"
 *   error={errors.username?.message}
 *   {...register('username')}
 * />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const hasError = !!error;

  const baseStyles = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors';
  const errorStyles = hasError 
    ? 'border-red-500 focus:ring-red-500' 
    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';
  
  const inputStyles = `${baseStyles} ${errorStyles} ${className}`.trim();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={inputStyles}
        aria-invalid={hasError}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

