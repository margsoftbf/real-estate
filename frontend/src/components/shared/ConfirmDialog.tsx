import React, { useEffect } from 'react';
import { CloseOutline } from '@/assets/icons';
import Button from '@/components/ui/Button/Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'outline' | 'white' | 'gray' | 'secondary';
}

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
}: ConfirmDialogProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/70 transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="flex items-start justify-between p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <CloseOutline className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <p className="text-gray-700 leading-relaxed">
              {message}
            </p>
          </div>

          <div className="flex gap-3 p-6 border-t bg-gray-50 rounded-b-lg">
            <Button
              variant="outline"
              size="md"
              onClick={onClose}
              className="flex-1"
            >
              {cancelText}
            </Button>
            <Button
              variant={confirmVariant}
              size="md"
              onClick={handleConfirm}
              className={`flex-1 ${
                confirmText === 'Delete' 
                  ? 'bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 text-white' 
                  : ''
              }`}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;