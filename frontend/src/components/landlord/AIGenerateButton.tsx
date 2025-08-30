import React, { useState } from 'react';
import Button from '@/components/ui/Button/Button';
import AIDescriptionModal from './AIDescriptionModal';
import { useToast } from '@/contexts/ToastContext';

interface AIGenerateButtonProps {
  onDescriptionGenerated: (data: {
    title?: string;
    description?: string;
    tags?: string[];
    highlights?: string[];
    city?: string;
    price?: number;
  }) => void;
  propertyType?: 'apartment' | 'house' | 'studio' | 'room';
  location?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const AIGenerateButton: React.FC<AIGenerateButtonProps> = ({
  onDescriptionGenerated,
  propertyType,
  location,
  className = '',
  variant = 'primary',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showSuccess } = useToast();

  const handleGenerated = (data: {
    title: string;
    description: string;
    tags: string[];
    highlights: string[];
    city?: string;
    price?: number;
  }) => {
    onDescriptionGenerated(data);
    showSuccess('AI description generated and applied to your listing!');
  };

  const buttonStyles = {
    primary:
      'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white',
    secondary:
      'bg-white border-2 border-blue-300 text-blue-600 hover:bg-blue-50',
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className={`${buttonStyles[variant]} ${className}`}
      >
        {variant === 'primary' ? (
          <>
            🤖 Generate with AI
            <span className="ml-1 text-xs bg-white text-black font-bold bg-opacity-20 px-1.5 py-0.5 rounded-full">
              FREE
            </span>
          </>
        ) : (
          <>AI Generate</>
        )}
      </Button>

      <AIDescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerated={handleGenerated}
        propertyType={propertyType}
        location={location}
      />
    </>
  );
};

export default AIGenerateButton;
