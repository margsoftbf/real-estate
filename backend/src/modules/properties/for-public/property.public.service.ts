import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { FilterOperator, paginate, PaginateConfig, PaginateQuery } from 'nestjs-paginate';

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

  async findAll(query: PaginateQuery) {
    const queryBuilder = this.propertyRepository
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.owner', 'owner')
      .where('property.isActive = :isActive', { isActive: true })
      .andWhere('property.deletedAt IS NULL');

    return paginate(query, queryBuilder, findAllPropertiesPublicConfig);
  }

  async findBySlug(slug: string) {
    return this.propertyRepository.findOne({
      where: { slug, isActive: true },
      relations: ['owner'],
    });
  }

  async findPopular() {
    return this.propertyRepository.find({
      where: { isActive: true, isPopular: true },
      relations: ['owner'],
      order: { createdAt: 'DESC' },
      take: 8,
    });
  }

}