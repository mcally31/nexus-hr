import React, { useState } from 'react';
import { queryAI } from '../services/aiService';
import { AIMessage } from '../types';
import Loader from '../components/Shared/Loader';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<AIMessage[]>([{ role: 'assistant', content: 'How can I help with HR today?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input) return;
    const newMessage: AIMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setLoading(true);
    try {
      const response = await queryAI(newMessage.content, 'hr');
      setMessages((prev) => [...prev, { role: 'assistant', content: response.reply }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-6 flex flex-col gap-4 h-[70vh]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">AI HR Assistant</h3>
        <span className="text-xs text-slate-400">Ask policy or payroll questions</span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 bg-slate-50 rounded-3xl p-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`max-w-xl px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-brand-500 text-white ml-auto' : 'bg-white'}`}>
            {msg.content}
          </div>
        ))}
        {loading && <Loader />}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question"
          className="flex-1 px-4 py-3 rounded-2xl border border-slate-200"
        />
        <button onClick={sendMessage} className="px-4 py-3 rounded-2xl bg-brand-500 text-white">
          Send
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
