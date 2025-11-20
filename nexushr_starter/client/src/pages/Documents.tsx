import React from 'react';
import { Document } from '../types';

const documents: Document[] = [
  { id: '1', title: 'HR Policy Handbook', url: 'https://example.com/policy.pdf' },
  { id: '2', title: 'Payslip - August', url: 'https://example.com/payslip-aug.pdf' },
];

const Documents: React.FC = () => {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Documents</h3>
      <ul className="space-y-3">
        {documents.map((doc) => (
          <li key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
            <div>
              <p className="font-medium">{doc.title}</p>
              <p className="text-xs text-slate-400">Secure link</p>
            </div>
            <a href={doc.url} target="_blank" rel="noreferrer" className="text-brand-500 font-semibold">
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Documents;
