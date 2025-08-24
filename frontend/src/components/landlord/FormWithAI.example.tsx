import React, { useState } from 'react';
import AIGenerateButton from './AIGenerateButton';

const ExampleForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'apartment' as 'apartment' | 'house' | 'studio' | 'room',
    location: '',
  });

  const handleAIGenerated = (aiData: {
    title?: string;
    description?: string;
    tags?: string[];
    highlights?: string[];
  }) => {
    setFormData((prev) => ({
      ...prev,
      ...(aiData.title && { title: aiData.title }),
      ...(aiData.description && { description: aiData.description }),
    }));
  };

  return (
    <form>
      <div>
        <label>Title</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="flex-1"
          />
          <AIGenerateButton
            onDescriptionGenerated={handleAIGenerated}
            propertyType={formData.type}
            location={formData.location}
            variant="secondary"
            className="px-3"
          />
        </div>
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          rows={6}
          className="w-full"
        />
      </div>
      <div className="my-6">
        <AIGenerateButton
          onDescriptionGenerated={handleAIGenerated}
          propertyType={formData.type}
          location={formData.location}
          variant="primary"
          className="w-full py-3"
        />
      </div>
    </form>
  );
};

export default ExampleForm;
