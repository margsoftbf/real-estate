import { ApplicationStatus } from '../../entities/application.entity';
import { BasePaginatedResponse } from '../../../../shared/types/base.dto';

export class ApplicationsLandlordReadManyDto {
  slug: string;
  status: ApplicationStatus;
  applicantName: string | null;
  applicantEmail: string | null;
  applicantPhone: string | null;
  message: string | null;
  proposedRent: number | null;
  preferredMoveInDate: Date | null;
  createdAt: Date;
  updatedAt: Date;

  property: {
    slug: string;
    title: string | null;
    city: string;
    price: number;
  };

  applicant: {
    slug: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string;
  } | null;
}

export class ApplicationsLandlordReadManyResponseDto extends BasePaginatedResponse<ApplicationsLandlordReadManyDto> {}
