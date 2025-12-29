/**
 * Página de Login
 * Maneja la autenticación del usuario
 * 
 * Principio: Separation of Concerns - La página solo orquesta, la lógica está en hooks
 */

import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '@/context/AuthContext';
import { LoginRequest } from '@/types';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { ROUTES, MESSAGES } from '@/constants';

/**
 * Página de inicio de sesión
 * 
 * Características:
 * - Validación de formulario con React Hook Form
 * - Manejo de estados: loading, error, success
 * - Redirección automática si ya está autenticado
 * - Redirección al dashboard después del login exitoso
 */
const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isLoading, error, clearError } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    mode: 'onBlur', // Validar al perder el foco, no en cada cambio
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || ROUTES.DASHBOARD;
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Limpiar error cuando el componente se monta
  useEffect(() => {
    clearError();
  }, [clearError]);

  /**
   * Maneja el submit del formulario
   */
  const onSubmit = async (data: LoginRequest) => {
    try {
      await login(data);
      // Navegar después de login exitoso
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || ROUTES.DASHBOARD;
      navigate(from, { replace: true });
    } catch (err) {
      // El error ya está manejado en el hook useAuth y se muestra en el estado error
      console.error('Login error:', err);
      // No necesitamos hacer nada más, el error ya se muestra en el UI
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ingresa tus credenciales para acceder
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px space-y-4">
            <Input
              label="Usuario"
              type="text"
              autoComplete="username"
              placeholder="usuario@ejemplo.com"
              error={errors.username?.message}
              {...register('username', {
                required: MESSAGES.LOGIN.REQUIRED_USERNAME,
              })}
            />

            <Input
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password', {
                required: MESSAGES.LOGIN.REQUIRED_PASSWORD,
                minLength: {
                  value: 3,
                  message: 'La contraseña debe tener al menos 3 caracteres',
                },
              })}
            />
          </div>

          {error && (
            <ErrorMessage message={error} />
          )}

          <div>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              disabled={isLoading}
            >
              Iniciar Sesión
            </Button>
          </div>

          <div className="text-sm text-center text-gray-600">
            <p>Credenciales de prueba:</p>
            <p className="mt-1 font-mono text-xs">
              usuario: a.berrio@yopmail.com
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

