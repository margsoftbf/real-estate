import React from 'react';
import { PageLoading } from '@/components/ui/Loading';

interface LoadingStateProps {
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  className = "flex items-center justify-center py-12"
}) => {
  return (
    <div className={className}>
      <PageLoading />
    </div>
  );
};

export default LoadingState;