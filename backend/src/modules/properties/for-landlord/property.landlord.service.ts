import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  FilterOperator,
  paginate,
  PaginateConfig,
  PaginateQuery,
} from 'nestjs-paginate';
import { Property } from '../entities/property.entity';
import { User } from '../../users/entities/user.entity';
import { PropertiesLandlordCreateDto } from './dto/properties-landlord-create.dto';
import { PropertiesLandlordUpdateDto } from './dto/properties-landlord-update.dto';
import {
  PropertyLandlordReadManyDto,
  PropertyLandlordReadManyResponseDto,
} from './dto/properties-landlord-read-many.response.dto';
import { PropertyLandlordReadOneDto } from './dto/properties-landlord-read-one.response.dto';
import { ExceptionConstants } from '../../../exceptions/exceptions.constants';
import { generateRandomString } from '../../../utils/utils';

export const propertiesLandlordFindAllConfig: PaginateConfig<Property> = {
  sortableColumns: ['createdAt', 'price', 'city'],
  nullSort: 'last',
  relations: [],
  defaultSortBy: [['createdAt', 'DESC']],
  searchableColumns: ['title', 'city', 'country', 'description'],
  filterableColumns: {
    type: [FilterOperator.EQ],
    city: [FilterOperator.EQ],
    country: [FilterOperator.EQ],
    isActive: [FilterOperator.EQ],
  },
};

@Injectable()
export class PropertyLandlordService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    createPropertyDto: PropertiesLandlordCreateDto,
    ownerId: string,
  ) {
    const owner = await this.userRepository.findOne({ where: { id: ownerId } });
    if (!owner) {
      throw new NotFoundException(ExceptionConstants.UsersErrors.userNotFound);
    }

    const titleSlug = createPropertyDto.title
      ? createPropertyDto.title
          .slice(0, 50)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '')
      : 'property';
    const slug =
      createPropertyDto.slug || `${titleSlug}-${generateRandomString(8)}`;

    const property = this.propertyRepository.create({
      ...createPropertyDto,
      slug,
      owner,
      priceHistory: [
        {
          price: createPropertyDto.price,
          date: new Date(),
          reason: 'Initial listing',
        },
      ],
    });

    const savedProperty = await this.propertyRepository.save(property);

    return {
      id: savedProperty.id,
      slug: savedProperty.slug,
      type: savedProperty.type,
      price: savedProperty.price,
      city: savedProperty.city,
      country: savedProperty.country,
      title: savedProperty.title,
      photos: savedProperty.photos,
      description: savedProperty.description,
      features: savedProperty.features,
      priceHistory: savedProperty.priceHistory,
      isPopular: savedProperty.isPopular,
      isActive: savedProperty.isActive,
      createdAt: savedProperty.createdAt,
      updatedAt: savedProperty.updatedAt,
    };
  }

  async findAll(
    query: PaginateQuery,
    ownerId: string,
  ): Promise<PropertyLandlordReadManyResponseDto> {
    const queryBuilder = this.propertyRepository
      .createQueryBuilder('property')
      .where('property.owner = :ownerId', { ownerId })
      .andWhere('property.deletedAt IS NULL');

    const paginatedResult = await paginate(
      query,
      queryBuilder,
      propertiesLandlordFindAllConfig,
    );

    const mappedProperties: PropertyLandlordReadManyDto[] =
      paginatedResult.data.map((property) => ({
        slug: property.slug,
        type: property.type,
        price: property.price,
        city: property.city,
        country: property.country,
        title: property.title,
        photos: property.photos,
        features: property.features,
        isPopular: property.isPopular,
        isActive: property.isActive,
        createdAt: property.createdAt,
        updatedAt: property.updatedAt,
      }));

    return {
      data: mappedProperties,
      meta: paginatedResult.meta,
      links: paginatedResult.links,
    };
  }

  async findOne(
    slug: string,
    ownerId: string,
  ): Promise<PropertyLandlordReadOneDto> {
    const property = await this.propertyRepository.findOne({
      where: { slug },
      relations: ['owner'],
    });

    if (!property) {
      throw new NotFoundException(
        ExceptionConstants.PropertyErrors.propertyNotFound,
      );
    }

    if (property.owner.id !== ownerId) {
      throw new ForbiddenException(
        ExceptionConstants.PropertyErrors.propertyIsNotYours,
      );
    }

    return {
      slug: property.slug,
      type: property.type,
      price: property.price,
      city: property.city,
      country: property.country,
      title: property.title,
      photos: property.photos,
      description: property.description,
      features: property.features,
      priceHistory: property.priceHistory,
      isPopular: property.isPopular,
      isActive: property.isActive,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
    };
  }

  async update(
    slug: string,
    updatePropertyDto: PropertiesLandlordUpdateDto,
    ownerId: string,
  ): Promise<PropertyLandlordReadOneDto> {
    const propertyData = await this.findOne(slug, ownerId);

    const property = await this.propertyRepository.findOne({
      where: { slug },
      relations: ['owner'],
    });

    if (!property) {
      throw new NotFoundException(
        ExceptionConstants.PropertyErrors.propertyNotFound,
      );
    }

    Object.assign(property, updatePropertyDto);
    await this.propertyRepository.save(property);

    return this.findOne(slug, ownerId);
  }

  async remove(slug: string, ownerId: string) {
    const property = await this.propertyRepository.findOne({
      where: { slug },
      relations: ['owner'],
    });

    if (!property) {
      throw new NotFoundException(
        ExceptionConstants.PropertyErrors.propertyNotFound,
      );
    }

    if (property.owner.id !== ownerId) {
      throw new ForbiddenException(
        ExceptionConstants.PropertyErrors.propertyIsNotYours,
      );
    }

    await this.propertyRepository.softDelete({ slug });
    return { message: 'Property deleted successfully' };
  }
}
