import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApplicationStatus } from '../../entities/application.entity';

export class ApplicationsLandlordUpdateDto {
  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;

  @IsOptional()
  @IsString()
  landlordNotes?: string;

  @IsOptional()
  @IsBoolean()
  isCurrentRenter?: boolean;
}
