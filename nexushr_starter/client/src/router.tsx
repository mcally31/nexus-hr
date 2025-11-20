import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Absence from './pages/Absence';
import Directory from './pages/Directory';
import Documents from './pages/Documents';
import Expenses from './pages/Expenses';
import AIAssistant from './pages/AIAssistant';
import NotFound from './pages/NotFound';
import { useAuth } from './hooks/useAuth';
import AppLayout from './layouts/AppLayout';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return element;
};

export const AppRoutes = () => {
  const routes: RouteObject[] = [
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/',
      element: (
        <PrivateRoute
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
      ),
    },
    {
      path: '/dashboard',
      element: (
        <PrivateRoute
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
      ),
    },
    {
      path: '/absence',
      element: (
        <PrivateRoute
          element={
            <AppLayout>
              <Absence />
            </AppLayout>
          }
        />
      ),
    },
    {
      path: '/directory',
      element: (
        <PrivateRoute
          element={
            <AppLayout>
              <Directory />
            </AppLayout>
          }
        />
      ),
    },
    {
      path: '/documents',
      element: (
        <PrivateRoute
          element={
            <AppLayout>
              <Documents />
            </AppLayout>
          }
        />
      ),
    },
    {
      path: '/expenses',
      element: (
        <PrivateRoute
          element={
            <AppLayout>
              <Expenses />
            </AppLayout>
          }
        />
      ),
    },
    {
      path: '/ai',
      element: (
        <PrivateRoute
          element={
            <AppLayout>
              <AIAssistant />
            </AppLayout>
          }
        />
      ),
    },
    { path: '*', element: <NotFound /> },
  ];
  return useRoutes(routes);
};
