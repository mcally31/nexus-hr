import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { getCurrentUser } from '../services/authService';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(localStorage.getItem('token'));

  const setToken = (value: string | null) => {
    if (value) {
      localStorage.setItem('token', value);
    } else {
      localStorage.removeItem('token');
    }
    setTokenState(value);
  };

  useEffect(() => {
    const loadUser = async () => {
      if (!token) return;
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (err) {
        console.error(err);
        setToken(null);
      }
    };
    loadUser();
  }, [token]);

  return <AuthContext.Provider value={{ user, token, setUser, setToken }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
