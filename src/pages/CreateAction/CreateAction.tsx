/**
 * Página CreateAction
 * Formulario para crear una nueva acción
 * 
 * Principio: Separation of Concerns - La página orquesta, la lógica está en hooks
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useActions } from '@/hooks/useActions';
import { CreateActionRequest } from '@/types';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { MESSAGES, VALIDATION } from '@/constants';

/**
 * Página para crear una nueva acción
 * 
 * Características:
 * - Formulario con validaciones
 * - Manejo de estados: loading, error, success
 * - Redirección al dashboard después de crear exitosamente
 * - Refresh del listado al volver
 */
const CreateAction: React.FC = () => {
  const navigate = useNavigate();
  const { createAction, isLoading, error, clearError } = useActions();
  const [iconFile, setIconFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CreateActionRequest>({
    defaultValues: {
      name: '',
      description: '',
      color: '#3B82F6', // Color por defecto (azul)
      status: 1, // Status por defecto (1 = Activo, válido según API)
    },
  });

  // Observar cambios en los campos para mostrar previews
  const selectedColor = watch('color');
  const iconValue = watch('icon');

  // Limpiar error cuando el componente se monta
  useEffect(() => {
    clearError();
  }, [clearError]);

  /**
   * Maneja el cambio del archivo icon
   */
  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      setValue('icon', file, { shouldValidate: true });
    }
  };

  /**
   * Maneja el submit del formulario
   */
  const onSubmit = async (data: CreateActionRequest) => {
    try {
      // Asegurar que el archivo icon esté incluido
      if (!iconFile) {
        toast.error('Por favor selecciona un archivo icon');
        return;
      }
      
      const formData: CreateActionRequest = {
        name: data.name,
        description: data.description || '',
        color: data.color,
        status: Number(data.status), // Asegurar que sea número
        icon: iconFile,
      };
      
      await createAction(formData);
      // Resetear formulario
      reset();
      setIconFile(null);
      // Redirigir al dashboard con un parámetro para forzar refresh
      navigate('/dashboard', { replace: true, state: { refresh: true } });
    } catch (err) {
      // El error ya está manejado en el hook useActions
      console.error('Create action error:', err);
    }
  };

  /**
   * Maneja la cancelación
   */
  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Crear Nueva Acción</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input
                label="Nombre *"
                type="text"
                placeholder="Ingresa el nombre de la acción"
                error={errors.name?.message}
                {...register('name', {
                  required: 'El nombre es requerido',
                  maxLength: {
                    value: VALIDATION.MAX_TITLE_LENGTH,
                    message: `El nombre no puede exceder ${VALIDATION.MAX_TITLE_LENGTH} caracteres`,
                  },
                })}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                id="description"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingresa la descripción de la acción (opcional)"
                {...register('description', {
                  maxLength: {
                    value: VALIDATION.MAX_DESCRIPTION_LENGTH,
                    message: MESSAGES.ACTIONS.DESCRIPTION_TOO_LONG,
                  },
                })}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                Color *
              </label>
              <input
                id="color"
                type="color"
                className={`w-full h-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors cursor-pointer ${
                  errors.color ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                {...register('color', {
                  required: 'El color es requerido',
                })}
              />
              {errors.color && (
                <p className="mt-1 text-sm text-red-600">{errors.color.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Estado * (0 o 1)
              </label>
              <select
                id="status"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register('status', {
                  required: 'El estado es requerido',
                  valueAsNumber: true,
                  validate: (value) => {
                    const numValue = Number(value);
                    if (numValue !== 0 && numValue !== 1) {
                      return 'El estado debe ser 0 o 1';
                    }
                    return true;
                  },
                })}
              >
                <option value="">Selecciona un estado</option>
                <option value="0">0 - Inactivo</option>
                <option value="1">1 - Activo</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>

            {/* Campo Icon (archivo requerido) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icono * (Archivo)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-2 text-center w-full">
                  {iconFile ? (
                    // Mostrar información del archivo seleccionado
                    <div className="space-y-2">
                      <div className="flex items-center justify-center">
                        <svg
                          className="h-12 w-12 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm font-medium text-green-800 mb-1">
                          Archivo seleccionado:
                        </p>
                        <p className="text-sm text-green-700 font-mono break-all">
                          {iconFile.name}
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          Tamaño: {(iconFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <label className="inline-block text-sm text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
                        Cambiar archivo
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleIconChange}
                        />
                      </label>
                    </div>
                  ) : (
                    // Mostrar área de carga
                    <div className="space-y-1">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                          <span>Subir archivo</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleIconChange}
                          />
                        </label>
                        <p className="pl-1">o arrastra y suelta</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG hasta 10MB</p>
                    </div>
                  )}
                  {errors.icon && (
                    <p className="text-xs text-red-600 mt-2">{errors.icon.message}</p>
                  )}
                </div>
              </div>
            </div>

            {error && <ErrorMessage message={error} />}

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Crear Acción
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateAction;

