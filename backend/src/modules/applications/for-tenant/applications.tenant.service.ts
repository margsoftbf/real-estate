import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  FilterOperator,
  paginate,
  PaginateConfig,
  PaginateQuery,
} from 'nestjs-paginate';
import { Application, ApplicationStatus } from '../entities/application.entity';
import { ApplicationsTenantCreateDto } from './dto/applications-tenant-create.dto';
import {
  ApplicationsTenantReadManyDto,
  ApplicationsTenantReadManyResponseDto,
} from './dto/applications-tenant-read-many.response.dto';
import { PropertyPublicService } from '../../properties/for-public/property.public.service';
import { UsersUserService } from '../../users/for-user/users.user.service';
import { generateRandomString } from '../../../utils/utils';
import { ExceptionConstants } from '../../../exceptions/exceptions.constants';

export const applicationsTenantPaginateConfig: PaginateConfig<Application> = {
  sortableColumns: ['createdAt', 'status', 'proposedRent'],
  nullSort: 'last',
  relations: ['property', 'property.owner'],
  defaultSortBy: [['createdAt', 'DESC']],
  searchableColumns: ['message'],
  filterableColumns: {
    status: [FilterOperator.EQ],
    'property.city': [FilterOperator.EQ],
    'property.type': [FilterOperator.EQ],
    proposedRent: [FilterOperator.GTE, FilterOperator.LTE],
  },
};

@Injectable()
export class ApplicationsTenantService {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
    private propertyPublicService: PropertyPublicService,
    private usersUserService: UsersUserService,
  ) {}

  async create(
    createApplicationDto: ApplicationsTenantCreateDto,
    userId: string,
  ): Promise<Application> {
    const property = await this.propertyPublicService.findEntityBySlug(
      createApplicationDto.propertySlug,
    );

    if (!property) {
      throw new NotFoundException(
        ExceptionConstants.ApplicationsErrors.applicationPropertyNotFound,
      );
    }

    const existingApplication = await this.applicationsRepository.findOne({
      where: {
        property: { id: property.id },
        applicant: { id: userId },
        status: ApplicationStatus.PENDING,
      },
    });

    if (existingApplication) {
      throw new BadRequestException(
        ExceptionConstants.ApplicationsErrors.applicationAlreadyExists,
      );
    }

    const applicant = await this.usersUserService.findById(userId);

    const applicantName =
      `${applicant?.firstName || ''}-${applicant?.lastName || ''}`
        .toLowerCase()
        .replaceAll(/\s+/g, '-');
    const slug = `${applicantName}-${property.slug}-${generateRandomString(6)}`;

    const application = this.applicationsRepository.create({
      ...createApplicationDto,
      slug,
      property,
      applicant,
      applicantName: `${applicant?.firstName} ${applicant?.lastName}`,
      applicantEmail: applicant?.email,
      applicantPhone: applicant?.phoneNumber,
      preferredMoveInDate: createApplicationDto.preferredMoveInDate
        ? new Date(createApplicationDto.preferredMoveInDate)
        : null,
    });

    return this.applicationsRepository.save(application);
  }

  async findMyApplications(
    query: PaginateQuery,
    userId: string,
  ): Promise<ApplicationsTenantReadManyResponseDto> {
    const queryBuilder = this.applicationsRepository
      .createQueryBuilder('application')
      .leftJoin('application.property', 'property')
      .leftJoin('property.owner', 'owner')
      .leftJoin('application.applicant', 'applicant')
      .where('applicant.id = :userId', { userId });

    const paginatedResult = await paginate(
      query,
      queryBuilder,
      applicationsTenantPaginateConfig,
    );

    return {
      data: this.mapApplicationsToDto(paginatedResult.data),
      meta: paginatedResult.meta,
      links: paginatedResult.links,
    };
  }

  async findMyRentals(
    query: PaginateQuery,
    userId: string,
  ): Promise<ApplicationsTenantReadManyResponseDto> {
    const queryBuilder = this.applicationsRepository
      .createQueryBuilder('application')
      .leftJoin('application.property', 'property')
      .leftJoin('property.owner', 'owner')
      .leftJoin('application.applicant', 'applicant')
      .where('applicant.id = :userId', { userId })
      .andWhere('application.status = :status', {
        status: ApplicationStatus.ACCEPTED,
      });

    const paginatedResult = await paginate(
      query,
      queryBuilder,
      applicationsTenantPaginateConfig,
    );

    return {
      data: this.mapApplicationsToDto(paginatedResult.data),
      meta: paginatedResult.meta,
      links: paginatedResult.links,
    };
  }

  private mapApplicationsToDto(
    applications: Application[],
  ): ApplicationsTenantReadManyDto[] {
    return applications.map((app) => ({
      slug: app.slug,
      status: app.status,
      message: app.message,
      proposedRent: app.proposedRent,
      preferredMoveInDate: app.preferredMoveInDate,
      landlordNotes: app.landlordNotes,
      isCurrentRenter: app.isCurrentRenter,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
      property: {
        slug: app.property.slug,
        title: app.property.title,
        city: app.property.city,
        country: app.property.country,
        price: app.property.price,
        photos: app.property.photos,
      },
      landlord: app.property.owner
        ? {
            slug: app.property.owner.slug,
            firstName: app.property.owner.firstName,
            lastName: app.property.owner.lastName,
            email: app.property.owner.email,
            phoneNumber: app.property.owner.phoneNumber,
          }
        : null,
    }));
  }
}
