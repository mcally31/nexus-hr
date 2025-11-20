import React from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Topbar from '../components/Layout/Topbar';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex gap-4 p-4">
      <Sidebar />
      <main className="flex-1 space-y-4">
        <Topbar />
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
