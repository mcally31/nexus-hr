import React, { useEffect, useState } from 'react';
import { searchDirectory } from '../services/directoryService';
import { User } from '../types';
import Loader from '../components/Shared/Loader';

const Directory: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    searchDirectory(query).then(setResults).finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="card p-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h3 className="text-lg font-semibold">Employee directory</h3>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, role, department"
          className="px-4 py-3 rounded-2xl border border-slate-200 w-full md:w-80"
        />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.map((user) => (
            <div key={user.id} className="p-4 bg-slate-50 rounded-3xl">
              <div className="font-semibold">{user.firstName || 'Employee'} {user.lastName || ''}</div>
              <div className="text-sm text-slate-500">{user.email}</div>
              <div className="text-xs text-slate-400">{user.department || 'General'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Directory;
