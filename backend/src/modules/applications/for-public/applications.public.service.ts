import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application, ApplicationStatus } from '../entities/application.entity';
import { ApplicationsPublicCreateDto } from './dto/applications-public-create.dto';
import { Property } from '../../properties/entities/property.entity';
import { generateRandomString } from '../../../utils/utils';
import { ExceptionConstants } from '../../../exceptions/exceptions.constants';

@Injectable()
export class ApplicationsPublicService {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
  ) {}

  async create(
    createApplicationDto: ApplicationsPublicCreateDto,
  ): Promise<Application> {
    const property = await this.propertiesRepository.findOne({
      where: { slug: createApplicationDto.propertySlug },
    });

    if (!property) {
      throw new NotFoundException(
        ExceptionConstants.ApplicationsErrors.applicationPropertyNotFound,
      );
    }

    if (!property.isActive) {
      throw new BadRequestException(
        ExceptionConstants.ApplicationsErrors.applicationPropertyNotAvailable,
      );
    }

    const existingApplication = await this.applicationsRepository.findOne({
      where: {
        property: { id: property.id },
        applicantEmail: createApplicationDto.applicantEmail,
        status: ApplicationStatus.PENDING,
      },
    });

    if (existingApplication) {
      throw new BadRequestException(
        ExceptionConstants.ApplicationsErrors.applicationAlreadyExists,
      );
    }

    const applicantName = createApplicationDto.applicantName
      .toLowerCase()
      .replaceAll(/\s+/g, '-');
    const slug = `${applicantName}-${property.slug}-${generateRandomString(6)}`;

    const application = this.applicationsRepository.create({
      ...createApplicationDto,
      slug,
      property,
      applicant: null,
      preferredMoveInDate: createApplicationDto.preferredMoveInDate
        ? new Date(createApplicationDto.preferredMoveInDate)
        : null,
    });

    return this.applicationsRepository.save(application);
  }
}
