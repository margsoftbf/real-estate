import { ApplicationStatus } from '../../entities/application.entity';
import {
  PropertyFeatures,
  PropertyType,
} from '../../../properties/entities/property.entity';

export class ApplicationsTenantReadOneDto {
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
    type: PropertyType;
    price: number;
    photos: string[];
    description: string | null;
    features: PropertyFeatures | null;
  };

  landlord: {
    slug: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string;
    phoneNumber: string | null;
    city: string | null;
    country: string | null;
  } | null;
}
