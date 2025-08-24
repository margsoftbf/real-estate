export interface LlmRequestData {
  message: string;
}

export interface LlmOptions {
  max_completion_tokens?: number;
  response_format?: TypeOfResponse;
  object_type?: TypeOfResponseObjectSchema;
}

export interface LlmRequest {
  requestData: LlmRequestData;
  llmOptions: LlmOptions;
}

export interface LlmResponse<T> {
  response: T | null;
  error: Error | null;
}

export type TypeOfResponse = 'json_object' | 'text';

export type TypeOfResponseObjectSchema = 'property_description';
