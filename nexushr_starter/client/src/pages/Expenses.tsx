import React, { useEffect, useMemo, useState } from 'react';
import { fetchExpenses, createExpense } from '../services/expenseService';
import { Expense } from '../types';
import Modal from '../components/Shared/Modal';
import { pushToast } from '../components/Shared/Toast';
import { useAuth } from '../hooks/useAuth';

const Expenses: React.FC = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ amount: 0, description: '', category: 'Travel' });

  useEffect(() => {
    fetchExpenses().then(setExpenses);
  }, []);

  const total = useMemo(() => expenses.reduce((sum, exp) => sum + exp.amount, 0), [expenses]);

  const submit = async () => {
    try {
      const created = await createExpense(form);
      setExpenses((prev) => [created, ...prev]);
      setOpen(false);
      pushToast({ type: 'success', text: 'Expense logged' });
    } catch (err) {
      pushToast({ type: 'error', text: 'Only Sales can log expenses' });
    }
  };

  if (user?.department !== 'Sales') {
    return <div className="card p-6">Expenses are available for Sales only.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="card p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Total claimed</p>
          <div className="text-3xl font-semibold">£{total.toFixed(2)}</div>
        </div>
        <button onClick={() => setOpen(true)} className="px-4 py-2 rounded-2xl bg-brand-500 text-white">
          Log expense
        </button>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-3">Recent expenses</h3>
        <div className="space-y-2">
          {expenses.map((exp) => (
            <div key={exp.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
              <div>
                <p className="font-medium">{exp.description}</p>
                <p className="text-xs text-slate-400">{exp.category}</p>
              </div>
              <div className="font-semibold">£{exp.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={open} title="Log expense" onClose={() => setOpen(false)}>
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-sm text-slate-600">Amount</label>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) })}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-slate-600">Description</label>
            <input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-slate-600">Category</label>
            <input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200"
            />
          </div>
          <button onClick={submit} className="w-full py-3 rounded-2xl bg-brand-500 text-white font-semibold">
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Expenses;
