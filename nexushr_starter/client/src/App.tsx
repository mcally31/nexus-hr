import React from 'react';
import { AppRoutes } from './router';
import { AuthProvider } from './hooks/useAuth';
import Toast from './components/Shared/Toast';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <AppRoutes />
        <Toast />
      </div>
    </AuthProvider>
  );
};

export default App;
