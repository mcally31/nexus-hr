import React, { useEffect, useState } from 'react';
import StatCard from '../components/Shared/StatCard';
import { submitLeave, fetchLeave } from '../services/leaveService';
import { LeaveRequest } from '../types';
import Badge from '../components/Shared/Badge';
import { pushToast } from '../components/Shared/Toast';

const Absence: React.FC = () => {
  const [tab, setTab] = useState<'HOLIDAY' | 'SICKNESS' | 'CARRY_OVER'>('HOLIDAY');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState(1);
  const [reason, setReason] = useState('');
  const [requests, setRequests] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    fetchLeave().then(setRequests);
  }, []);

  const remaining = 10;
  const warning = duration > remaining;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (new Date(startDate) > new Date(endDate)) {
      pushToast({ type: 'error', text: 'End date must be after start date' });
      return;
    }
    if (warning && !reason) {
      pushToast({ type: 'error', text: 'Provide a reason when exceeding allowance' });
      return;
    }
    try {
      const created = await submitLeave({ type: tab, startDate, endDate, durationDays: duration, reason });
      setRequests((prev) => [created, ...prev]);
      pushToast({ type: 'success', text: 'Request submitted' });
    } catch (err) {
      pushToast({ type: 'error', text: 'Could not submit request' });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="card p-6 space-y-4">
        <h3 className="text-lg font-semibold">Balances</h3>
        <StatCard title="Holiday" value={`${remaining} days`} hint="Annual allowance" />
        <StatCard title="Sickness" value="8 days" />
        <StatCard title="Carry over" value="2 days" />
      </div>

      <div className="lg:col-span-2 card p-6 space-y-4">
        <div className="flex gap-2">
          {(['HOLIDAY', 'SICKNESS', 'CARRY_OVER'] as const).map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${tab === item ? 'bg-brand-500 text-white' : 'bg-slate-100'}`}
            >
              {item.replace('_', ' ')}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-600">Start date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-600">End date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-600">Duration (days)</label>
            <input
              type="number"
              min={0.5}
              step={0.5}
              value={duration}
              onChange={(e) => setDuration(parseFloat(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-600">Reason (optional)</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200"
            />
          </div>
          {warning && <p className="text-amber-600 text-sm md:col-span-2">Duration exceeds remaining balance. Reason required.</p>}
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="px-6 py-3 bg-brand-500 text-white rounded-2xl hover:bg-brand-500/90">
              Submit request
            </button>
          </div>
        </form>

        <div className="mt-4">
          <h4 className="font-semibold mb-2">Existing requests</h4>
          <div className="space-y-2">
            {requests.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                <div>
                  <p className="font-medium">{r.type}</p>
                  <p className="text-sm text-slate-500">
                    {r.startDate} → {r.endDate} ({r.durationDays}d)
                  </p>
                </div>
                <Badge
                  color={r.status === 'APPROVED' ? 'green' : r.status === 'PENDING' ? 'amber' : 'red'}
                  label={r.status}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Absence;
