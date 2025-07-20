import { useState, useCallback } from 'react';

interface ToastData {
  id: string;
  message: string;
  type: 'success' | 'error';
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error') => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastData = { id, message, type };
    
    setToasts(prev => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccess = useCallback((message: string) => {
    addToast(message, 'success');
  }, [addToast]);

  const showError = useCallback((message: string) => {
    addToast(message, 'error');
  }, [addToast]);

  return {
    toasts,
    removeToast,
    showSuccess,
    showError,
  };
};