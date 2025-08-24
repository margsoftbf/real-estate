import React, { useState } from 'react';
import Button from '@/components/ui/Button/Button';
import { useAIDescription } from '@/hooks/llm/useAIDescription';

interface AIDescriptionGeneratorProps {
  propertyData: {
    type?: 'apartment' | 'house' | 'studio' | 'room';
    rooms?: number;
    area?: number;
    location?: string;
    price?: number;
    features?: string;
  };
  onDescriptionGenerated: (description: string) => void;
  className?: string;
}

const AIDescriptionGenerator: React.FC<AIDescriptionGeneratorProps> = ({
  propertyData,
  onDescriptionGenerated,
  className = '',
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const { generateDescription, isGenerating, generatedData } =
    useAIDescription();

  const handleGenerateDescription = async () => {
    if (
      !propertyData.type ||
      !propertyData.rooms ||
      !propertyData.area ||
      !propertyData.location
    ) {
      return;
    }

    const result = await generateDescription({
      propertyType: propertyData.type!,
      listingType: 'rent',
      rooms: propertyData.rooms!,
      area: propertyData.area!,
      location: propertyData.location!,
      price: propertyData.price,
      features: propertyData.features,
      additionalInfo: '',
    });

    if (result) {
      setShowPreview(true);
    }
  };

  const useDescription = () => {
    if (generatedData) {
      onDescriptionGenerated(generatedData.description);
      setShowPreview(false);
    }
  };

  const canGenerate =
    propertyData.type &&
    propertyData.rooms &&
    propertyData.area &&
    propertyData.location;

  return (
    <div
      className={`bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            🤖 AI Description Generator
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              FREE
            </span>
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Generate professional property descriptions automatically
          </p>
        </div>
        <Button
          onClick={handleGenerateDescription}
          disabled={!canGenerate || isGenerating}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Generating...
            </>
          ) : (
            <>✨ Generate Description</>
          )}
        </Button>
      </div>

      {!canGenerate && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
          <p className="text-sm text-yellow-800">
            💡 Fill in <strong>property type</strong>, <strong>rooms</strong>,{' '}
            <strong>area</strong>, and <strong>location</strong> first to
            generate a description.
          </p>
        </div>
      )}

      {showPreview && generatedData && (
        <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-800">
              Generated Description
            </h4>
            <div className="flex gap-2">
              <Button
                onClick={useDescription}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                ✓ Use This Description
              </Button>
              <Button
                onClick={() => setShowPreview(false)}
                size="sm"
                variant="outline"
              >
                ✕ Close
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h5 className="font-medium text-gray-700 mb-1">Title:</h5>
              <p className="text-gray-600 text-sm bg-gray-50 p-2 rounded">
                {generatedData.title}
              </p>
            </div>

            <div>
              <h5 className="font-medium text-gray-700 mb-1">Description:</h5>
              <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded leading-relaxed">
                {generatedData.description}
              </p>
            </div>

            {generatedData.tags && generatedData.tags.length > 0 && (
              <div>
                <h5 className="font-medium text-gray-700 mb-1">Tags:</h5>
                <div className="flex flex-wrap gap-1">
                  {generatedData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {generatedData.highlights &&
              generatedData.highlights.length > 0 && (
                <div>
                  <h5 className="font-medium text-gray-700 mb-1">
                    Key Highlights:
                  </h5>
                  <ul className="text-gray-600 text-sm bg-gray-50 p-2 rounded">
                    {generatedData.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIDescriptionGenerator;
