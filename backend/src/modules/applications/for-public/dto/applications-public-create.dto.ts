import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class ApplicationsPublicCreateDto {
  @IsString()
  propertySlug: string;

  @IsString()
  applicantName: string;

  @IsEmail()
  applicantEmail: string;

  @IsOptional()
  @IsString()
  applicantPhone?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  proposedRent?: number;

  @IsOptional()
  @IsDateString()
  preferredMoveInDate?: string;
}
