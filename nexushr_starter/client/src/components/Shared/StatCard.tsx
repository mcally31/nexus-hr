import React from 'react';

const StatCard: React.FC<{ title: string; value: string; hint?: string; children?: React.ReactNode }> = ({ title, value, hint, children }) => (
  <div className="card p-6">
    <p className="text-sm text-slate-500">{title}</p>
    <div className="text-3xl font-semibold mt-2">{value}</div>
    {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    {children && <div className="mt-4">{children}</div>}
  </div>
);

export default StatCard;
