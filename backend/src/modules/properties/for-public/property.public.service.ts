import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property, PropertyType } from '../entities/property.entity';
import {
  FilterOperator,
  paginate,
  PaginateConfig,
  PaginateQuery,
} from 'nestjs-paginate';
import {
  PropertyPublicReadManyDto,
  PropertyPublicReadManyResponseDto,
} from './dto/properties-public-read-many.response.dto';
import { PropertiesPublicReadOneResponseDto } from './dto/properties-public-read-one.response.dto';

@Injectable()
export class PropertyPublicService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  async findAll(
    query: PaginateQuery,
  ): Promise<PropertyPublicReadManyResponseDto> {
    const queryBuilder = this.propertyRepository
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.owner', 'owner')
      .where('property.isActive = :isActive', { isActive: true })
      .andWhere('property.deletedAt IS NULL');

    this.applyFeaturesFilters(query, queryBuilder);

    const paginatedResult = await paginate(
      query,
      queryBuilder,
      findAllPropertiesPublicConfig,
    );

    return {
      data: this.mapPropertiesToDto(paginatedResult.data),
      meta: paginatedResult.meta,
      links: paginatedResult.links,
    };
  }

  async findBySlug(
    slug: string,
  ): Promise<PropertiesPublicReadOneResponseDto | null> {
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
      latitude: property.latitude,
      longitude: property.longitude,
      title: property.title,
      photos: property.photos,
      description: property.description,
      features: property.features,
      isPopular: property.isPopular,
      priceHistory: property.priceHistory || [],
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

  async findRentProperties(
    query: PaginateQuery,
  ): Promise<PropertyPublicReadManyResponseDto> {
    return this.findPropertiesByType(query, PropertyType.RENT);
  }

  async findSellProperties(
    query: PaginateQuery,
  ): Promise<PropertyPublicReadManyResponseDto> {
    return this.findPropertiesByType(query, PropertyType.SELL);
  }

  private async findPropertiesByType(
    query: PaginateQuery,
    propertyType: PropertyType,
  ): Promise<PropertyPublicReadManyResponseDto> {
    const queryBuilder = this.createBaseQueryBuilder(propertyType);
    this.applyCityFilter(query, queryBuilder);
    this.applyPriceFilters(query, queryBuilder);
    this.applyFeaturesFilters(query, queryBuilder);

    const config = this.getPaginateConfig();
    const paginatedResult = await paginate(query, queryBuilder, config);

    return {
      data: this.mapPropertiesToDto(paginatedResult.data),
      meta: paginatedResult.meta,
      links: paginatedResult.links,
    };
  }

  private createBaseQueryBuilder(propertyType: PropertyType) {
    return this.propertyRepository
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.owner', 'owner')
      .where('property.isActive = :isActive', { isActive: true })
      .andWhere('property.deletedAt IS NULL')
      .andWhere('property.type = :type', { type: propertyType });
  }

  private applyCityFilter(query: PaginateQuery, queryBuilder: any): void {
    if (query['filter.city$eq']) {
      queryBuilder.andWhere('property.city = :city', {
        city: query['filter.city$eq'],
      });
      delete query['filter.city$eq'];
    }
  }

  private applyPriceFilters(query: PaginateQuery, queryBuilder: any): void {
    if (query['filter.price']) {
      const priceFilter = query['filter.price'];

      if (typeof priceFilter === 'string' && priceFilter.startsWith('$lte:')) {
        const maxPrice = Number.parseInt(priceFilter.replace('$lte:', ''), 10);
        queryBuilder.andWhere('property.price <= :maxPrice', { maxPrice });
        delete query['filter.price'];
      } else if (
        typeof priceFilter === 'string' &&
        priceFilter.startsWith('$gte:')
      ) {
        const minPrice = Number.parseInt(priceFilter.replace('$gte:', ''), 10);
        queryBuilder.andWhere('property.price >= :minPrice', { minPrice });
        delete query['filter.price'];
      }
    }
  }

  private mapPropertiesToDto(properties: any[]): PropertyPublicReadManyDto[] {
    return properties.map((property) => ({
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
  }

  private getPaginateConfig() {
    const config = {
      ...findAllPropertiesPublicConfig,
      filterableColumns: {
        ...findAllPropertiesPublicConfig.filterableColumns,
      },
    };
    delete (config.filterableColumns as any).city;
    return config;
  }

  private applyFeaturesFilters(query: PaginateQuery, queryBuilder: any): void {
    const booleanFilters = [
      'balcony',
      'furnished',
      'garden',
      'garage',
      'elevator',
      'airConditioning',
      'petsAllowed',
      'smokingAllowed',
      'dishwasher',
      'washerDryer',
      'internet',
      'cable',
    ];

    const stringFilters = ['homeType', 'laundry', 'heating'];

    const rangeFilters = [
      'bedrooms',
      'bathrooms',
      'area',
      'parkingSpaces',
      'yearBuilt',
    ];

    for (const field of booleanFilters) {
      const filterKey = `filter.features.${field}`;
      if (query[filterKey] !== undefined) {
        const boolValue = query[filterKey].toString();
        if (boolValue === 'false') {
          queryBuilder.andWhere(
            `(property.features->>'${field}' = :${field} OR property.features->>'${field}' IS NULL)`,
            { [field]: 'false' },
          );
        } else {
          queryBuilder.andWhere(`property.features->>'${field}' = 'true'`);
        }
        delete query[filterKey];
      }
    }

    for (const field of stringFilters) {
      const filterKey = `filter.features.${field}`;
      if (query[filterKey]) {
        queryBuilder.andWhere(`property.features->>'${field}' = :${field}`, {
          [field]: query[filterKey].toString(),
        });
        delete query[filterKey];
      }
    }

    for (const field of rangeFilters) {
      const gteKey = `filter.features.${field}$gte`;
      const lteKey = `filter.features.${field}$lte`;

      if (query[gteKey]) {
        queryBuilder.andWhere(
          `(property.features->>'${field}')::int >= :min${field}`,
          {
            [`min${field}`]: Number.parseInt(query[gteKey].toString()),
          },
        );
        delete query[gteKey];
      }

      if (query[lteKey]) {
        queryBuilder.andWhere(
          `(property.features->>'${field}')::int <= :max${field}`,
          {
            [`max${field}`]: Number.parseInt(query[lteKey].toString()),
          },
        );
        delete query[lteKey];
      }
    }
  }

  async findEntityBySlug(slug: string): Promise<Property | null> {
    return this.propertyRepository.findOne({
      where: { slug, isActive: true },
    });
  }
}

export const findAllPropertiesPublicConfig: PaginateConfig<Property> = {
  sortableColumns: ['createdAt', 'price', 'city', 'isPopular'],
  nullSort: 'last',
  relations: ['owner'],
  defaultSortBy: [
    ['isPopular', 'DESC'],
    ['createdAt', 'DESC'],
  ],
  searchableColumns: ['title', 'description', 'city', 'country'],
  filterableColumns: {
    city: [FilterOperator.EQ],
    country: [FilterOperator.ILIKE],
    type: [FilterOperator.EQ],
    price: [FilterOperator.GTE, FilterOperator.LTE],
    'features.bedrooms': [
      FilterOperator.GTE,
      FilterOperator.LTE,
      FilterOperator.EQ,
    ],
    'features.bathrooms': [
      FilterOperator.GTE,
      FilterOperator.LTE,
      FilterOperator.EQ,
    ],
    'features.area': [FilterOperator.GTE, FilterOperator.LTE],
    'features.parkingSpaces': [
      FilterOperator.GTE,
      FilterOperator.LTE,
      FilterOperator.EQ,
    ],
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
