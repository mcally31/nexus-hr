import React, { useEffect, useState } from 'react';

interface ToastMessage {
  id: number;
  type: 'success' | 'error';
  text: string;
}

let pushToastInternal: ((msg: Omit<ToastMessage, 'id'>) => void) | null = null;

export const pushToast = (msg: Omit<ToastMessage, 'id'>) => {
  if (pushToastInternal) pushToastInternal(msg);
};

const Toast: React.FC = () => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  useEffect(() => {
    pushToastInternal = (msg) => {
      const id = Date.now();
      setMessages((prev) => [...prev, { ...msg, id }]);
      setTimeout(() => setMessages((prev) => prev.filter((m) => m.id !== id)), 3000);
    };
  }, []);

  const color = (type: 'success' | 'error') => (type === 'success' ? 'bg-green-600' : 'bg-red-600');

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {messages.map((msg) => (
        <div key={msg.id} className={`text-white px-4 py-2 rounded-2xl shadow-lg ${color(msg.type)}`}>
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default Toast;
