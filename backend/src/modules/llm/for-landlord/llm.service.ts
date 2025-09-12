import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  LlmRequest,
  LlmRequestData,
  LlmResponse,
  TypeOfResponse,
  TypeOfResponseObjectSchema,
} from '../llm.interface';
import { MODEL } from '../const/llm-parameters';
import { PROPERTY_DESCRIPTION_INSTRUCTION } from '../const/prompts';
import { ResponseObjectSchemas } from '../schemas/response-schema';
import { LlmRequestDto } from './dto/llm-request.dto';
import {
  GenerateDescriptionDto,
  PropertyDescriptionResponse,
} from './dto/generate-description.dto';

@Injectable()
export class LlmService {
  private readonly defaultPropertyLlmOptions = {
    response_format: 'json_object' as TypeOfResponse,
    max_completion_tokens: 1000,
    object_type: 'property_description' as TypeOfResponseObjectSchema,
  };

  constructor(
    private readonly gemini: GoogleGenerativeAI,
    private readonly logger: Logger,
  ) {}

  public async generatePropertyDescription(
    propertyData: GenerateDescriptionDto,
  ): Promise<LlmResponse<PropertyDescriptionResponse>> {
    const propertyInfo = this.formatPropertyData(propertyData);

    const requestData = {
      message: propertyInfo,
    };

    return this.callLlm({
      requestData,
      llmOptions: this.defaultPropertyLlmOptions,
    });
  }

  public async callLlm<T>(params: LlmRequestDto): Promise<LlmResponse<T>> {
    const llmRequest = this.transformDtoToLlmRequest(params);
    const { llmOptions } = llmRequest;

    if (llmOptions && llmOptions.response_format === 'json_object') {
      return this.getStructuredResponse(llmRequest);
    }

    return {
      response: null,
      error: null,
    };
  }

  private formatPropertyData(data: GenerateDescriptionDto): string {
    let info = `Property type: ${data.propertyType}\n`;
    info += `Listing type: ${data.listingType}\n`;
    info += `Number of rooms: ${data.rooms}\n`;
    info += `Area: ${data.area} m²\n`;
    info += `Location: ${data.location}\n`;

    if (data.price) {
      info += `Price: ${data.price} PLN\n`;
    }

    if (data.features) {
      info += `Additional features: ${data.features}\n`;
    }

    if (data.additionalInfo) {
      info += `Additional information: ${data.additionalInfo}\n`;
    }

    return info;
  }

  private async getStructuredResponse<T>(
    params: LlmRequest,
  ): Promise<LlmResponse<T>> {
    let llmResponse: LlmResponse<T> = {
      response: null,
      error: null,
    };

    let response: object;
    const { requestData, llmOptions } = params;

    if (
      !llmOptions.object_type ||
      !(llmOptions.object_type in ResponseObjectSchemas)
    ) {
      return llmResponse;
    }

    try {
      const model = this.gemini.getGenerativeModel({ model: MODEL });

      const prompt = this.prepareGeminiPrompt(
        requestData,
        llmOptions.object_type,
      );

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      let jsonText = responseText;
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        jsonText = jsonMatch[1];
      }

      try {
        response = JSON.parse(jsonText);
      } catch (parseError) {
        this.logger.warn(
          'Failed to parse JSON response, using fallback',
          parseError,
        );
        response = {
          title: 'Generated Property Title',
          description: responseText,
          tags: [],
          highlights: [],
        };
      }

      llmResponse = {
        response: response as T,
        error: null,
      };
    } catch (error) {
      this.logger.error('Error calling Gemini:', error);
      return {
        response: null,
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
    return llmResponse;
  }

  private prepareGeminiPrompt(
    requestData: LlmRequestData,
    objectType: string,
  ): string {
    const instruction =
      objectType === 'property_description'
        ? PROPERTY_DESCRIPTION_INSTRUCTION
        : '';

    return `${instruction}

Property Data:
${requestData.message}

Please respond with a JSON object containing:
{
  "title": "attractive property title",
  "description": "professional description 150-300 words",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "highlights": ["highlight1", "highlight2", "highlight3"]
}`;
  }

  private transformDtoToLlmRequest(llmRequestDto: LlmRequestDto): LlmRequest {
    return {
      requestData: llmRequestDto.requestData,
      llmOptions: {
        max_completion_tokens: llmRequestDto.llmOptions.max_completion_tokens,
        response_format: llmRequestDto.llmOptions
          .response_format as TypeOfResponse,
        object_type: llmRequestDto.llmOptions
          .object_type as TypeOfResponseObjectSchema,
      },
    };
  }
}
