import { ApplicationStatus } from '../../entities/application.entity';
import { BasePaginatedResponse } from '../../../../shared/types/base.dto';

export class ApplicationsTenantReadManyDto {
  slug: string;
  status: ApplicationStatus;
  message: string | null;
  proposedRent: number | null;
  preferredMoveInDate: Date | null;
  landlordNotes: string | null;
  isCurrentRenter: boolean;
  createdAt: Date;
  updatedAt: Date;

  property: {
    slug: string;
    title: string | null;
    city: string;
    country: string;
    price: number;
    photos: string[];
  };

  landlord: {
    slug: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string;
    phoneNumber: string | null;
  } | null;
}

export class ApplicationsTenantReadManyResponseDto extends BasePaginatedResponse<ApplicationsTenantReadManyDto> {}
