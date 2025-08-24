import {
  IsObject,
  IsOptional,
  IsString,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LlmRequestData, LlmOptions } from '../llm.interface';

export class LlmRequestDataDto implements LlmRequestData {
  @IsString()
  message: string;
}

export class LlmOptionsDto implements LlmOptions {
  @IsOptional()
  @IsNumber()
  max_completion_tokens?: number;

  @IsOptional()
  @IsString()
  response_format?: 'json_object' | 'text';

  @IsOptional()
  @IsString()
  object_type?: 'property_description';
}

export class LlmRequestDto {
  @IsObject()
  @ValidateNested()
  @Type(() => LlmRequestDataDto)
  requestData: LlmRequestDataDto;

  @IsObject()
  @ValidateNested()
  @Type(() => LlmOptionsDto)
  llmOptions: LlmOptionsDto;
}
