import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property, PropertyType } from '../entities/property.entity';
import { FilterOperator, paginate, PaginateConfig, PaginateQuery } from 'nestjs-paginate';
import { PropertyPublicReadManyDto, PropertyPublicReadManyResponseDto } from './dto/properties-public-read-many.response.dto';
import { PropertiesPublicReadOneResponseDto } from './dto/properties-public-read-one.response.dto';

export const findAllPropertiesPublicConfig: PaginateConfig<Property> = {
  sortableColumns: ['createdAt', 'price', 'city', 'isPopular'],
  nullSort: 'last',
  relations: ['owner'],
  defaultSortBy: [['isPopular', 'DESC'], ['createdAt', 'DESC']],
  searchableColumns: ['title', 'description', 'city', 'country'],
  filterableColumns: {
    city: [FilterOperator.ILIKE],
    country: [FilterOperator.ILIKE],
    type: [FilterOperator.EQ],
    price: [FilterOperator.GTE, FilterOperator.LTE],
    'features.bedrooms': [FilterOperator.GTE, FilterOperator.LTE, FilterOperator.EQ],
    'features.bathrooms': [FilterOperator.GTE, FilterOperator.LTE, FilterOperator.EQ],
    'features.area': [FilterOperator.GTE, FilterOperator.LTE],
    'features.parkingSpaces': [FilterOperator.GTE, FilterOperator.LTE, FilterOperator.EQ],
    'features.homeType': [FilterOperator.EQ],
    'features.laundry': [FilterOperator.EQ],
    'features.heating': [FilterOperator.EQ],
    'features.yearBuilt': [FilterOperator.GTE, FilterOperator.LTE],
    'features.furnished': [FilterOperator.EQ],
    'features.petsAllowed': [FilterOperator.EQ],
    'features.smokingAllowed': [FilterOperator.EQ],
    'features.balcony': [FilterOperator.EQ],
    'features.garden': [FilterOperator.EQ],
    'features.garage': [FilterOperator.EQ],
    'features.elevator': [FilterOperator.EQ],
    'features.airConditioning': [FilterOperator.EQ],
    'features.dishwasher': [FilterOperator.EQ],
    'features.washerDryer': [FilterOperator.EQ],
    'features.internet': [FilterOperator.EQ],
    'features.cable': [FilterOperator.EQ],
  },
  defaultLimit: 10,
  maxLimit: 50,
};

@Injectable()
export class PropertyPublicService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  private applyFeaturesFilters(query: PaginateQuery, queryBuilder: any): void {
    const booleanFilters = [
      'balcony', 'furnished', 'garden', 'garage', 'elevator', 'airConditioning',
      'petsAllowed', 'smokingAllowed', 'dishwasher', 'washerDryer', 'internet', 'cable'
    ];


    const stringFilters = ['homeType', 'laundry', 'heating'];

    const rangeFilters = ['bedrooms', 'bathrooms', 'area', 'parkingSpaces', 'yearBuilt'];

    booleanFilters.forEach(field => {
      const filterKey = `filter.features.${field}`;
      if (query[filterKey] !== undefined) {
        const boolValue = query[filterKey].toString();
        if (boolValue === 'false') {
          // For false, show properties that are explicitly false OR don't have this feature set
          queryBuilder.andWhere(
            `(property.features->>'${field}' = :${field} OR property.features->>'${field}' IS NULL)`,
            { [field]: 'false' }
          );
        } else {
          // For true, show only properties that are explicitly true
          queryBuilder.andWhere(`property.features->>'${field}' = :${field}`, {
            [field]: boolValue,
          });
        }
        delete query[filterKey];
      }
    });

    stringFilters.forEach(field => {
      const filterKey = `filter.features.${field}`;
      if (query[filterKey]) {
        queryBuilder.andWhere(`property.features->>'${field}' = :${field}`, {
          [field]: query[filterKey].toString(),
        });
        delete query[filterKey];
      }
    });

    rangeFilters.forEach(field => {
      const minKey = `filter.features.min${field.charAt(0).toUpperCase() + field.slice(1)}`;
      const maxKey = `filter.features.max${field.charAt(0).toUpperCase() + field.slice(1)}`;
      
      if (query[minKey]) {
        queryBuilder.andWhere(`(property.features->>'${field}')::int >= :min${field}`, {
          [`min${field}`]: parseInt(query[minKey].toString()),
        });
        delete query[minKey];
      }
      
      if (query[maxKey]) {
        queryBuilder.andWhere(`(property.features->>'${field}')::int <= :max${field}`, {
          [`max${field}`]: parseInt(query[maxKey].toString()),
        });
        delete query[maxKey];
      }
    });
  }

  async findAll(query: PaginateQuery): Promise<PropertyPublicReadManyResponseDto> {
    const queryBuilder = this.propertyRepository
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.owner', 'owner')
      .where('property.isActive = :isActive', { isActive: true })
      .andWhere('property.deletedAt IS NULL');

    const paginatedResult = await paginate(query, queryBuilder, findAllPropertiesPublicConfig);

    const mappedProperties: PropertyPublicReadManyDto[] =
      paginatedResult.data.map((property) => ({
        slug: property.slug,
        type: property.type,
        price: property.price,
        city: property.city,
        country: property.country,
        title: property.title,
        photos: property.photos,
        description: property.description,
        features: property.features,
        isPopular: property.isPopular,
        createdAt: property.createdAt,
        updatedAt: property.updatedAt,
        owner: {
          firstName: property.owner.firstName,
          lastName: property.owner.lastName,
          email: property.owner.email,
          phoneNumber: property.owner.phoneNumber,
          avatarUrl: property.owner.avatarUrl,
        },
      }));

    return {
      data: mappedProperties,
      meta: paginatedResult.meta,
      links: paginatedResult.links,
    };
  }

  async findBySlug(slug: string): Promise<PropertiesPublicReadOneResponseDto | null> {
    const property = await this.propertyRepository.findOne({
      where: { slug, isActive: true },
      relations: ['owner'],
    });

    if (!property) {
      return null;
    }

    return {
      id: property.id,
      slug: property.slug,
      type: property.type,
      price: property.price,
      city: property.city,
      country: property.country,
      title: property.title,
      photos: property.photos,
      description: property.description,
      features: property.features,
      isPopular: property.isPopular,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
      owner: {
        id: property.owner.id,
        firstName: property.owner.firstName,
        lastName: property.owner.lastName,
        email: property.owner.email,
        phoneNumber: property.owner.phoneNumber,
        avatarUrl: property.owner.avatarUrl,
      },
    };
  }

  async findRentProperties(query: PaginateQuery): Promise<PropertyPublicReadManyResponseDto> {
    const queryBuilder = this.propertyRepository
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.owner', 'owner')
      .where('property.isActive = :isActive', { isActive: true })
      .andWhere('property.deletedAt IS NULL')
      .andWhere('property.type = :type', { type: PropertyType.RENT });

    this.applyFeaturesFilters(query, queryBuilder);

    const paginatedResult = await paginate(query, queryBuilder, findAllPropertiesPublicConfig);

    const mappedProperties: PropertyPublicReadManyDto[] =
      paginatedResult.data.map((property) => ({
        slug: property.slug,
        type: property.type,
        price: property.price,
        city: property.city,
        country: property.country,
        title: property.title,
        photos: property.photos,
        description: property.description,
        features: property.features,
        isPopular: property.isPopular,
        createdAt: property.createdAt,
        updatedAt: property.updatedAt,
        owner: {
          firstName: property.owner.firstName,
          lastName: property.owner.lastName,
          email: property.owner.email,
          phoneNumber: property.owner.phoneNumber,
          avatarUrl: property.owner.avatarUrl,
        },
      }));

    return {
      data: mappedProperties,
      meta: paginatedResult.meta,
      links: paginatedResult.links,
    };
  }

  async findSellProperties(query: PaginateQuery): Promise<PropertyPublicReadManyResponseDto> {
    const queryBuilder = this.propertyRepository
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.owner', 'owner')
      .where('property.isActive = :isActive', { isActive: true })
      .andWhere('property.deletedAt IS NULL')
      .andWhere('property.type = :type', { type: PropertyType.SELL });

    const paginatedResult = await paginate(query, queryBuilder, findAllPropertiesPublicConfig);

    const mappedProperties: PropertyPublicReadManyDto[] =
      paginatedResult.data.map((property) => ({
        slug: property.slug,
        type: property.type,
        price: property.price,
        city: property.city,
        country: property.country,
        title: property.title,
        photos: property.photos,
        description: property.description,
        features: property.features,
        isPopular: property.isPopular,
        createdAt: property.createdAt,
        updatedAt: property.updatedAt,
        owner: {
          firstName: property.owner.firstName,
          lastName: property.owner.lastName,
          email: property.owner.email,
          phoneNumber: property.owner.phoneNumber,
          avatarUrl: property.owner.avatarUrl,
        },
      }));

    return {
      data: mappedProperties,
      meta: paginatedResult.meta,
      links: paginatedResult.links,
    };
  }
}