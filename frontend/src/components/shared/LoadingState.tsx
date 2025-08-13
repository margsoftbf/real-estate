import React from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner';

interface LoadingStateProps {
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  className = "flex items-center justify-center py-12"
}) => {
  return (
    <div className={className}>
      <LoadingSpinner />
    </div>
  );
};

export default LoadingState;