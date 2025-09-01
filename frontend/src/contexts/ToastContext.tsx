import React, { createContext, useContext, useState, useCallback } from 'react';

interface ToastData {
  id: string;
  message: string;
  type: 'success' | 'error';
}

interface ToastContextType {
  toasts: ToastData[];
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error') => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastData = { id, message, type };

    setToasts((prev) => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showSuccess = useCallback(
    (message: string) => {
      addToast(message, 'success');
    },
    [addToast]
  );

  const showError = useCallback(
    (message: string) => {
      addToast(message, 'error');
    },
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        removeToast,
        showSuccess,
        showError,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};