import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Topbar: React.FC = () => {
  const { user, setToken, setUser } = useAuth();

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <header className="flex items-center justify-between p-6 bg-white rounded-3xl shadow-sm">
      <div>
        <p className="text-sm text-slate-500">Welcome back</p>
        <h2 className="text-xl font-semibold">{user?.email || 'Guest'}</h2>
      </div>
      <button onClick={logout} className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-sm font-medium">
        Logout
      </button>
    </header>
  );
};

export default Topbar;
