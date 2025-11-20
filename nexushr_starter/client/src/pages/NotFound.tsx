import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
    <h1 className="text-4xl font-semibold mb-3">404</h1>
    <p className="text-slate-500 mb-4">Page not found.</p>
    <Link to="/" className="text-brand-500 font-semibold">Return home</Link>
  </div>
);

export default NotFound;
