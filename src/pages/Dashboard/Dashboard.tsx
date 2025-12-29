/**
 * Página Dashboard
 * Muestra el listado paginado de acciones
 * 
 * Principio: Separation of Concerns - La página orquesta, la lógica está en hooks
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { useActions } from '@/hooks/useActions';
import { ActionsTable } from '@/components/dashboard/ActionsTable';
import { Pagination } from '@/components/dashboard/Pagination';
import { Button } from '@/components/common/Button';
import { PAGINATION, ROUTES } from '@/constants';

/**
 * Página principal del dashboard
 * 
 * Características:
 * - Listado paginado de acciones
 * - Navegación entre páginas
 * - Botón para crear nueva acción
 * - Botón de logout
 * - Manejo de estados: loading, error, empty
 */
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthContext();
  const { actions, pagination, isLoading, error, fetchActions } = useActions();
  const [currentPage, setCurrentPage] = useState(PAGINATION.DEFAULT_PAGE_NUMBER);

  // Cargar acciones al montar el componente y cuando cambie la página
  useEffect(() => {
    fetchActions({
      pageNumber: currentPage,
      pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
    });
  }, [currentPage, fetchActions]);

  // Si venimos de crear una acción, recargar la lista
  useEffect(() => {
    if (location.state && (location.state as { refresh?: boolean }).refresh) {
      // Limpiar el state para evitar recargas infinitas
      navigate(location.pathname, { replace: true, state: {} });
      // Recargar acciones
      fetchActions({
        pageNumber: currentPage,
        pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
      });
    }
  }, [location.state, navigate, location.pathname, currentPage, fetchActions]);

  /**
   * Maneja el cambio de página
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  /**
   * Maneja el logout
   */
  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  /**
   * Navega al formulario de crear acción
   */
  const handleCreateAction = () => {
    navigate('/dashboard/create-action');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex gap-2">
              <Button variant="primary" onClick={handleCreateAction}>
                Crear Acción
              </Button>
              <Button variant="secondary" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Listado de Acciones
          </h2>

          <ActionsTable
            actions={actions}
            isLoading={isLoading}
            error={error}
          />

          {pagination && (
            <Pagination
              currentPage={pagination.pageNumber}
              totalPages={pagination.totalPages}
              hasPreviousPage={pagination.hasPreviousPage}
              hasNextPage={pagination.hasNextPage}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

