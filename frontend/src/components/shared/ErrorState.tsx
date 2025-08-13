import React from 'react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="text-center py-12">
      <p className="text-red-600 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-primary-violet text-white rounded-lg hover:bg-primary-violet-dark transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorState;