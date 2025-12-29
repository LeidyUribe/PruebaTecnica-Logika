import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { useActions } from '@/hooks/useActions';
import { ActionsTable } from '@/components/dashboard/ActionsTable';
import { Pagination } from '@/components/dashboard/Pagination';
import { CreateActionModal } from '@/components/dashboard/CreateActionModal';
import { Button } from '@/components/common/Button';
import { PAGINATION, ROUTES } from '@/constants';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthContext();
  const { actions, pagination, isLoading, error, fetchActions } = useActions();
  const [currentPage, setCurrentPage] = useState(PAGINATION.DEFAULT_PAGE_NUMBER);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    fetchActions({
      pageNumber: currentPage,
      pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
    });
  }, [currentPage]);

  useEffect(() => {
    if (pagination && isInitialMount.current) {
      const apiPageNumber = pagination.pageNumber;
      const normalizedPage = apiPageNumber === 0 ? 1 : Math.max(1, apiPageNumber);
      if (normalizedPage !== currentPage) {
        setCurrentPage(normalizedPage);
      }
      isInitialMount.current = false;
    }
  }, [pagination?.pageNumber]);

  useEffect(() => {
    if (location.state && (location.state as { refresh?: boolean }).refresh) {
      navigate(location.pathname, { replace: true, state: {} });
      fetchActions({
        pageNumber: currentPage,
        pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
      });
    }
  }, [location.state]);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, page));
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const handleCreateAction = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateSuccess = () => {
    fetchActions({
      pageNumber: currentPage,
      pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              hasPreviousPage={pagination.hasPreviousPage}
              hasNextPage={pagination.hasNextPage}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          )}
        </div>
      </main>

      <CreateActionModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
};

export default Dashboard;

