import React from 'react';
import AIGenerateButton from '@/components/landlord/AIGenerateButton';

interface AIData {
  title?: string;
  description?: string;
  tags?: string[];
  highlights?: string[];
  city?: string;
  price?: number;
}

interface AIGeneratorSectionProps {
  propertyType: 'apartment' | 'house' | 'studio' | 'room';
  location: string;
  onDescriptionGenerated: (data: AIData) => void;
}

const AIGeneratorSection: React.FC<AIGeneratorSectionProps> = ({
  propertyType,
  location,
  onDescriptionGenerated,
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            AI-Powered Description Generator
          </h3>
          <p className="text-sm text-gray-600">
            Generate professional title and description instantly
          </p>
        </div>
        <AIGenerateButton
          onDescriptionGenerated={onDescriptionGenerated}
          propertyType={propertyType}
          location={location}
          variant="primary"
          className="px-6 py-2"
        />
      </div>
    </div>
  );
};

export default AIGeneratorSection;