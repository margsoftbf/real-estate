import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  FilterOperator,
  paginate,
  PaginateConfig,
  PaginateQuery,
} from 'nestjs-paginate';
import { Application, ApplicationStatus } from '../entities/application.entity';
import { ApplicationsLandlordUpdateDto } from './dto/applications-landlord-update.dto';
import { PropertyAvailabilityStatus } from '../../properties/entities/property.entity';
import { PropertyLandlordService } from '../../properties/for-landlord/property.landlord.service';
import { ExceptionConstants } from '@/exceptions';
import {
  ApplicationsLandlordReadManyDto,
  ApplicationsLandlordReadManyResponseDto,
} from './dto/applications-landlord-read-many.response.dto';
import { ApplicationsLandlordReadOneDto } from './dto/applications-landlord-read-one.response.dto';

export const applicationsLandlordPaginateConfig: PaginateConfig<Application> = {
  sortableColumns: ['createdAt', 'status', 'proposedRent'],
  nullSort: 'last',
  relations: ['property', 'applicant'],
  defaultSortBy: [['createdAt', 'DESC']],
  searchableColumns: ['applicantName', 'applicantEmail', 'message'],
  filterableColumns: {
    status: [FilterOperator.EQ],
    'property.type': [FilterOperator.EQ],
    proposedRent: [FilterOperator.GTE, FilterOperator.LTE],
  },
};

@Injectable()
export class ApplicationsLandlordService {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
    private propertyLandlordService: PropertyLandlordService,
  ) {}

  async findMyPropertyApplications(
    query: PaginateQuery,
    landlordId: string,
  ): Promise<ApplicationsLandlordReadManyResponseDto> {
    const queryBuilder = this.applicationsRepository
      .createQueryBuilder('application')
      .leftJoin('application.property', 'property')
      .leftJoin('property.owner', 'owner')
      .leftJoin('application.applicant', 'applicant')
      .where('owner.id = :landlordId', { landlordId });

    const paginatedResult = await paginate(
      query,
      queryBuilder,
      applicationsLandlordPaginateConfig,
    );

    return {
      data: this.mapApplicationsToDto(paginatedResult.data),
      meta: paginatedResult.meta,
      links: paginatedResult.links,
    };
  }

  async findMyRenters(
    query: PaginateQuery,
    landlordId: string,
  ): Promise<ApplicationsLandlordReadManyResponseDto> {
    const queryBuilder = this.applicationsRepository
      .createQueryBuilder('application')
      .leftJoin('application.property', 'property')
      .leftJoin('property.owner', 'owner')
      .leftJoin('application.applicant', 'applicant')
      .where('owner.id = :landlordId', { landlordId })
      .andWhere('application.status = :status', {
        status: ApplicationStatus.ACCEPTED,
      });

    const paginatedResult = await paginate(
      query,
      queryBuilder,
      applicationsLandlordPaginateConfig,
    );

    return {
      data: this.mapApplicationsToDto(paginatedResult.data),
      meta: paginatedResult.meta,
      links: paginatedResult.links,
    };
  }

  async updateApplication(
    slug: string,
    updateApplicationDto: ApplicationsLandlordUpdateDto,
    landlordId: string,
  ): Promise<ApplicationsLandlordReadOneDto> {
    const application = await this.applicationsRepository.findOne({
      where: {
        slug,
        property: {
          owner: { id: landlordId },
        },
      },
      relations: ['property', 'applicant'],
    });

    if (!application) {
      throw new NotFoundException(
        ExceptionConstants.ApplicationsErrors.applicationNotFound,
      );
    }

    if (updateApplicationDto.status === ApplicationStatus.ACCEPTED) {
      await this.propertyLandlordService.updateAvailabilityStatus(
        application.property.id,
        false,
        PropertyAvailabilityStatus.RENTED,
      );
    }

    Object.assign(application, updateApplicationDto);
    await this.applicationsRepository.save(application);

    return this.findOne(slug, landlordId);
  }

  async findOne(
    slug: string,
    landlordId: string,
  ): Promise<ApplicationsLandlordReadOneDto> {
    const application = await this.applicationsRepository.findOne({
      where: {
        slug,
        property: {
          owner: { id: landlordId },
        },
      },
      relations: ['property', 'applicant'],
    });

    if (!application) {
      throw new NotFoundException(
        ExceptionConstants.ApplicationsErrors.applicationNotFound,
      );
    }

    return {
      slug: application.slug,
      status: application.status,
      applicantName: application.applicantName,
      applicantEmail: application.applicantEmail,
      applicantPhone: application.applicantPhone,
      message: application.message,
      proposedRent: application.proposedRent,
      preferredMoveInDate: application.preferredMoveInDate,
      landlordNotes: application.landlordNotes,
      createdAt: application.createdAt,
      updatedAt: application.updatedAt,
      property: {
        slug: application.property.slug,
        title: application.property.title,
        city: application.property.city,
        country: application.property.country,
        type: application.property.type,
        price: application.property.price,
        photos: application.property.photos,
        description: application.property.description,
        features: application.property.features,
      },
      applicant: application.applicant
        ? {
            slug: application.applicant.slug,
            firstName: application.applicant.firstName,
            lastName: application.applicant.lastName,
            email: application.applicant.email,
            phoneNumber: application.applicant.phoneNumber,
            city: application.applicant.city,
            country: application.applicant.country,
          }
        : null,
    };
  }

  private mapApplicationsToDto(
    applications: Application[],
  ): ApplicationsLandlordReadManyDto[] {
    return applications.map((app) => ({
      slug: app.slug,
      status: app.status,
      applicantName: app.applicantName,
      applicantEmail: app.applicantEmail,
      applicantPhone: app.applicantPhone,
      message: app.message,
      proposedRent: app.proposedRent,
      preferredMoveInDate: app.preferredMoveInDate,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
      property: {
        slug: app.property.slug,
        title: app.property.title,
        city: app.property.city,
        price: app.property.price,
      },
      applicant: app.applicant
        ? {
            slug: app.applicant.slug,
            firstName: app.applicant.firstName,
            lastName: app.applicant.lastName,
            email: app.applicant.email,
          }
        : null,
    }));
  }
}
