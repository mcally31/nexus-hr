import React from 'react';

const Badge: React.FC<{ color?: 'green' | 'red' | 'amber'; label: string }> = ({ color = 'green', label }) => {
  const colorMap: Record<string, string> = {
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    amber: 'bg-amber-100 text-amber-700',
  };
  return <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorMap[color]}`}>{label}</span>;
};

export default Badge;
