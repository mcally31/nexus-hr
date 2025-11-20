import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CalendarCheck, Users, FileText, Receipt, Bot } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2 rounded-2xl transition ${isActive ? 'bg-brand-50 text-brand-500' : 'hover:bg-slate-100'}`;

  return (
    <aside className="w-64 p-4 space-y-2">
      <div className="text-2xl font-semibold mb-4">Nexus HR</div>
      <NavLink to="/dashboard" className={navLinkClass}>
        <Home size={18} /> Dashboard
      </NavLink>
      <NavLink to="/absence" className={navLinkClass}>
        <CalendarCheck size={18} /> Absence
      </NavLink>
      <NavLink to="/directory" className={navLinkClass}>
        <Users size={18} /> Directory
      </NavLink>
      <NavLink to="/documents" className={navLinkClass}>
        <FileText size={18} /> Documents
      </NavLink>
      {user?.department === 'Sales' && (
        <NavLink to="/expenses" className={navLinkClass}>
          <Receipt size={18} /> Expenses
        </NavLink>
      )}
      <NavLink to="/ai" className={navLinkClass}>
        <Bot size={18} /> AI Assistant
      </NavLink>
    </aside>
  );
};

export default Sidebar;
