import { ApplicationStatus } from '../../entities/application.entity';
import {
  PropertyType,
  PropertyFeatures,
} from '../../../properties/entities/property.entity';

export class ApplicationsLandlordReadOneDto {
  slug: string;
  status: ApplicationStatus;
  applicantName: string | null;
  applicantEmail: string | null;
  applicantPhone: string | null;
  message: string | null;
  proposedRent: number | null;
  preferredMoveInDate: Date | null;
  landlordNotes: string | null;
  createdAt: Date;
  updatedAt: Date;

  property: {
    slug: string;
    title: string | null;
    city: string;
    country: string;
    type: PropertyType;
    price: number;
    photos: string[];
    description: string | null;
    features: PropertyFeatures | null;
  };

  applicant: {
    slug: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string;
    phoneNumber: string | null;
    city: string | null;
    country: string | null;
  } | null;
}
