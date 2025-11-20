import React, { useEffect, useState } from 'react';
import StatCard from '../components/Shared/StatCard';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { fetchLeave } from '../services/leaveService';
import { LeaveRequest } from '../types';
import Badge from '../components/Shared/Badge';
import Loader from '../components/Shared/Loader';

const Dashboard: React.FC = () => {
  const [leave, setLeave] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeave()
      .then(setLeave)
      .finally(() => setLoading(false));
  }, []);

  const data = [
    { name: 'Holiday', remaining: 14, used: 6 },
    { name: 'Sickness', remaining: 8, used: 2 },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Allowance left" value="14 days" hint="Out of 20 days annual" />
        <StatCard title="Bradford score" value="42" hint="Low risk" />
        <StatCard title="Team absent today" value="2" hint="Keep projects covered" />
        <StatCard title="Payroll countdown" value="5 days" />
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Usage overview</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="remaining" stackId="a" fill="#22c55e" />
              <Bar dataKey="used" stackId="a" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">Recent leave activity</h3>
        {loading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-slate-500 text-sm">
                <tr>
                  <th className="py-2">Employee</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {leave.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="py-2">{item.user?.email || 'User'}</td>
                    <td className="capitalize">{item.type.toLowerCase()}</td>
                    <td>{item.durationDays} days</td>
                    <td>
                      <Badge
                        color={item.status === 'APPROVED' ? 'green' : item.status === 'PENDING' ? 'amber' : 'red'}
                        label={item.status}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
