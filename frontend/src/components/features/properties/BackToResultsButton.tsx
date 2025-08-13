import React from 'react';
import { ChevronLeftOutline } from '@/assets/icons';

interface BackToResultsButtonProps {
  onClick: () => void;
  isMobile?: boolean;
}

const BackToResultsButton: React.FC<BackToResultsButtonProps> = ({
  onClick,
  isMobile = false,
}) => {
  if (isMobile) {
    return (
      <div className="lg:hidden bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="px-4 py-3">
          <button
            onClick={onClick}
            className="flex items-center gap-1 text-primary-violet font-medium font-jakarta cursor-pointer"
          >
            <ChevronLeftOutline className="w-5 h-5" />
            <span>Back to results</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 pt-6">
      <button
        onClick={onClick}
        className="flex items-center gap-2 text-primary-violet font-medium mb-6 cursor-pointer"
      >
        <ChevronLeftOutline className="w-5 h-5" />
        <span>Back to results</span>
      </button>
    </div>
  );
};

export default BackToResultsButton;
