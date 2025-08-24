import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { User } from '../../users/entities/user.entity';
import { PropertiesAdminCreateDto } from './dto/properties-admin-create.dto';
import { PropertiesAdminUpdateDto } from './dto/properties-admin-update.dto';
import { FilterOperator, paginate, PaginateConfig, PaginateQuery } from 'nestjs-paginate';
import { ExceptionConstants } from '../../../exceptions';

export const findAllPropertiesAdminConfig: PaginateConfig<Property> = {
  sortableColumns: ['createdAt', 'price', 'city', 'isPopular', 'isActive'],
  nullSort: 'last',
  relations: ['owner'],
  defaultSortBy: [['createdAt', 'DESC']],
  searchableColumns: ['title', 'description', 'city', 'country', 'owner.email'],
  filterableColumns: {
    city: [FilterOperator.ILIKE],
    country: [FilterOperator.ILIKE],
    type: [FilterOperator.EQ],
    isActive: [FilterOperator.EQ],
    isPopular: [FilterOperator.EQ],
    'owner.id': [FilterOperator.EQ],
  },
  defaultLimit: 20,
  maxLimit: 100,
};

@Injectable()
export class PropertyAdminService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createPropertyDto: Omit<PropertiesAdminCreateDto, 'ownerId'>, ownerId: string) {
    const owner = await this.userRepository.findOne({ where: { id: ownerId } });
    if (!owner) {
      throw new NotFoundException(ExceptionConstants.UsersErrors.userNotFound);
    }

    const property = this.propertyRepository.create({
      ...createPropertyDto,
      owner,
      priceHistory: [
        {
          price: createPropertyDto.price,
          date: new Date(),
          reason: 'Initial listing by admin',
        },
      ],
    });

    return this.propertyRepository.save(property);
  }

  async findAll(query: PaginateQuery) {
    const queryBuilder = this.propertyRepository
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.owner', 'owner');

    return paginate(query, queryBuilder, findAllPropertiesAdminConfig);
  }

  async findOne(id: string) {
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: ['owner'],
      withDeleted: true,
    });

    if (!property) {
      throw new NotFoundException(ExceptionConstants.PropertyErrors.propertyNotFound);
    }

    return property;
  }

  async update(id: string, updatePropertyDto: PropertiesAdminUpdateDto) {
    const property = await this.findOne(id);
    Object.assign(property, updatePropertyDto);
    return this.propertyRepository.save(property);
  }

  async remove(id: string) {
    const property = await this.findOne(id);
    return this.propertyRepository.softRemove(property);
  }

}