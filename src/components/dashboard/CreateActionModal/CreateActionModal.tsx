import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useActions } from '@/hooks/useActions';
import { CreateActionRequest } from '@/types';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Switch } from '@/components/common/Switch';
import { Modal } from '@/components/common/Modal';
import { MESSAGES, VALIDATION } from '@/constants';

interface CreateActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CreateActionModal: React.FC<CreateActionModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { createAction, isLoading, error, clearError } = useActions();
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [charCount, setCharCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
    clearErrors,
    watch,
  } = useForm<CreateActionRequest>({
    defaultValues: {
      name: '',
      description: '',
      color: '#3B82F6',
      status: 1,
    },
  });

  const description = watch('description');

  useEffect(() => {
    if (description) {
      setCharCount(description.length);
    } else {
      setCharCount(0);
    }
  }, [description]);

  useEffect(() => {
    if (isOpen) {
      clearError();
      reset();
      setIconFile(null);
      setCharCount(0);
    }
  }, [isOpen, clearError, reset]);

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      setValue('icon', file, { shouldValidate: true, shouldDirty: true });
      clearErrors('icon');
    } else {
      setIconFile(null);
      setValue('icon', undefined, { shouldValidate: false });
    }
  };

  const handleStatusChange = (checked: boolean) => {
    setValue('status', checked ? 1 : 0, { shouldValidate: true });
  };

  const onSubmit = async (data: CreateActionRequest) => {
    if (!iconFile) {
      setError('icon', {
        type: 'required',
        message: 'El icono es requerido',
      });
      toast.error('Por favor selecciona un archivo icon');
      return;
    }

    try {
      const formData: CreateActionRequest = {
        name: data.name,
        description: data.description,
        color: data.color,
        status: Number(data.status),
        icon: iconFile,
      };

      await createAction(formData);
      reset();
      setIconFile(null);
      setCharCount(0);
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      // Error manejado en el hook
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crear categoria" size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Input
            label="Nombre de la categoria *"
            type="text"
            placeholder="Escribe el nombre de la buena acción"
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
            Descripción de la buena acción *
          </label>
          <textarea
            id="description"
            rows={4}
            maxLength={VALIDATION.MAX_DESCRIPTION_LENGTH}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors resize-none ${
              errors.description
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }`}
            placeholder="Agregar descripción"
            {...register('description', {
              required: 'La descripción es requerida',
              maxLength: {
                value: VALIDATION.MAX_DESCRIPTION_LENGTH,
                message: MESSAGES.ACTIONS.DESCRIPTION_TOO_LONG,
              },
            })}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.description ? (
              <p className="text-sm text-red-600">{errors.description.message}</p>
            ) : (
              <div></div>
            )}
            <p className="text-sm text-gray-500">
              {charCount}/{VALIDATION.MAX_DESCRIPTION_LENGTH}
            </p>
          </div>
        </div>

        <div>
          <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
            Icon *
          </label>
          <div className="relative">
            <input
              id="icon"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleIconChange}
            />
            <label
              htmlFor="icon"
              className={`flex items-center justify-between w-full px-3 py-2 border rounded-lg cursor-pointer transition-colors ${
                errors.icon && !iconFile
                  ? 'border-red-500'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <span className={`text-sm ${iconFile ? 'text-gray-900' : 'text-gray-500'}`}>
                {iconFile ? iconFile.name : 'Carga archivo'}
              </span>
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </label>
          </div>
          {errors.icon && !iconFile && (
            <p className="mt-1 text-sm text-red-600">{errors.icon.message}</p>
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
              errors.color
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado *
          </label>
          <Switch
            checked={watch('status') === 1}
            onChange={handleStatusChange}
            label="Activo"
          />
        </div>

        {error && <ErrorMessage message={error} />}

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
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
    </Modal>
  );
};

