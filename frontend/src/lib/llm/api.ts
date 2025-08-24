import { BaseApiClient } from '../base-api';

export interface GenerateDescriptionRequest {
  propertyType: 'apartment' | 'house' | 'studio' | 'room';
  listingType: 'rent' | 'sale';
  rooms: number;
  area: number;
  location: string;
  price?: number;
  features?: string;
  additionalInfo?: string;
}

export interface GeneratedDescription {
  title: string;
  description: string;
  tags: string[];
  highlights: string[];
}

export interface GenerateDescriptionResponse {
  success: boolean;
  data?: GeneratedDescription;
  error?: string;
}

class LlmApiClient extends BaseApiClient {
  async generateDescription(
    data: GenerateDescriptionRequest
  ): Promise<GenerateDescriptionResponse> {
    return this.request<GenerateDescriptionResponse>(
      '/llm/properties/generate-description',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  }
}

export const llmApi = new LlmApiClient();
