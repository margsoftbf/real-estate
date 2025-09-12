import { IsDateString, IsDecimal, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class ApplicationsTenantCreateDto {
  @IsString()
  propertySlug: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @Transform(({ value }) => Number.parseFloat(value))
  @IsDecimal({ decimal_digits: '0,2' })
  proposedRent?: number;

  @IsOptional()
  @IsDateString()
  preferredMoveInDate?: string;
}
