import { useState } from 'react';
import {
  llmApi,
  GenerateDescriptionRequest,
  GeneratedDescription,
} from '@/lib/llm/api';
import { useToast } from '@/hooks/useToast';

export const useAIDescription = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] =
    useState<GeneratedDescription | null>(null);
  const { showSuccess, showError } = useToast();

  const generateDescription = async (data: GenerateDescriptionRequest) => {
    setIsGenerating(true);
    try {
      const result = await llmApi.generateDescription(data);

      if (result.success && result.data) {
        setGeneratedData(result.data);
        showSuccess('Description generated successfully!');
        return result.data;
      } else {
        showError(result.error || 'Failed to generate description');
        return null;
      }
    } catch (error) {
      console.error('Error generating description:', error);
      showError('Failed to generate description. Please try again.');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const clearGenerated = () => {
    setGeneratedData(null);
  };

  return {
    generateDescription,
    isGenerating,
    generatedData,
    clearGenerated,
  };
};
