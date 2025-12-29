/**
 * Componente principal de la aplicación
 * Configura el router y el provider de autenticación
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/routes/ProtectedRoute';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { CreateAction } from '@/pages/CreateAction';
import { ROUTES } from '@/constants';

/**
 * Componente raíz de la aplicación
 * 
 * Estructura:
 * - AuthProvider: Proporciona contexto de autenticación
 * - BrowserRouter: Maneja el enrutamiento
 * - Routes: Define las rutas de la aplicación
 */
const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta raíz: redirige al dashboard si está autenticado, sino al login */}
          <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.DASHBOARD} replace />} />

          {/* Ruta pública: Login */}
          <Route path={ROUTES.LOGIN} element={<Login />} />

          {/* Rutas protegidas */}
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/create-action"
            element={
              <ProtectedRoute>
                <CreateAction />
              </ProtectedRoute>
            }
          />

          {/* Ruta 404: redirige al dashboard */}
          <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        </Routes>
        {/* Configuración global de Toaster para notificaciones */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#333',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

