import React from 'react';

const Loader: React.FC = () => (
  <div className="flex items-center justify-center py-6">
    <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default Loader;
