import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property, PropertyType } from '../entities/property.entity';
import { PropertyPublicController } from './property.public.controller';
import { PropertyPublicService } from './property.public.service';
import { createMockProperty, createLandlordUser } from '../../../../test/test-helpers';

// Mock paginate function
jest.mock('nestjs-paginate', () => ({
  ...jest.requireActual('nestjs-paginate'),
  paginate: jest.fn(),
}));

import { paginate } from 'nestjs-paginate';

describe('PropertyPublicController (e2e)', () => {
  let app: INestApplication;
  let propertyRepository: jest.Mocked<Repository<Property>>;

  const mockLandlord = createLandlordUser();
  const mockProperty = createMockProperty({ 
    owner: mockLandlord,
    isActive: true, 
    isPopular: true 
  });
  const mockProperty2 = createMockProperty({ 
    id: 'property-2-id',
    slug: 'second-property-slug',
    owner: mockLandlord,
    isActive: true, 
    isPopular: false,
    title: 'Second Property'
  });

  beforeEach(async () => {
    const mockPropertyRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      createQueryBuilder: jest.fn().mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyPublicController],
      providers: [
        PropertyPublicService,
        {
          provide: getRepositoryToken(Property),
          useValue: mockPropertyRepository,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    propertyRepository = module.get(getRepositoryToken(Property));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /properties', () => {
    it('should return paginated properties', async () => {
      const mockPaginatedResult = {
        data: [mockProperty, mockProperty2],
        meta: {
          itemsPerPage: 10,
          totalItems: 2,
          currentPage: 1,
          totalPages: 1,
        },
        links: {
          first: '/properties?page=1&limit=10',
          previous: '',
          next: '',
          last: '/properties?page=1&limit=10',
          current: '/properties?page=1&limit=10',
        },
      };

      (paginate as jest.Mock).mockResolvedValue(mockPaginatedResult);

      const response = await request(app.getHttpServer())
        .get('/properties')
        .expect(200);

      expect(response.body.data).toHaveLength(2);
      expect(response.body.data[0]).toEqual(
        expect.objectContaining({
          slug: mockProperty.slug,
          title: mockProperty.title,
          price: mockProperty.price,
          city: mockProperty.city,
          owner: expect.objectContaining({
            email: mockLandlord.email,
          }),
        })
      );
      expect(response.body.meta.totalItems).toBe(2);
    });

    it('should handle search query parameters', async () => {
      const searchResults = {
        data: [mockProperty],
        meta: { itemsPerPage: 10, totalItems: 1, currentPage: 1, totalPages: 1 },
        links: { current: '/properties?search=Warsaw' },
      };

      (paginate as jest.Mock).mockResolvedValue(searchResults);

      await request(app.getHttpServer())
        .get('/properties?search=Warsaw')
        .expect(200);

      expect(paginate).toHaveBeenCalled();
    });

    it('should handle filter parameters', async () => {
      const filteredResults = {
        data: [mockProperty],
        meta: { itemsPerPage: 10, totalItems: 1, currentPage: 1, totalPages: 1 },
        links: { current: '/properties?filter.type=rent&filter.city=Warsaw' },
      };

      (paginate as jest.Mock).mockResolvedValue(filteredResults);

      await request(app.getHttpServer())
        .get('/properties?filter.type=rent&filter.city=Warsaw')
        .expect(200);

      expect(paginate).toHaveBeenCalled();
    });

    it('should handle pagination parameters', async () => {
      const paginatedResults = {
        data: [],
        meta: { itemsPerPage: 5, totalItems: 0, currentPage: 2, totalPages: 0 },
        links: { current: '/properties?page=2&limit=5' },
      };

      (paginate as jest.Mock).mockResolvedValue(paginatedResults);

      await request(app.getHttpServer())
        .get('/properties?page=2&limit=5')
        .expect(200);

      expect(paginate).toHaveBeenCalled();
    });

    it('should handle sorting parameters', async () => {
      const sortedResults = {
        data: [mockProperty2, mockProperty],
        meta: { itemsPerPage: 10, totalItems: 2, currentPage: 1, totalPages: 1 },
        links: { current: '/properties?sortBy=price:ASC' },
      };

      (paginate as jest.Mock).mockResolvedValue(sortedResults);

      await request(app.getHttpServer())
        .get('/properties?sortBy=price:ASC')
        .expect(200);

      expect(paginate).toHaveBeenCalled();
    });
  });


  describe('GET /properties/:slug', () => {
    it('should return property by slug', async () => {
      propertyRepository.findOne.mockResolvedValue(mockProperty);

      const response = await request(app.getHttpServer())
        .get(`/properties/${mockProperty.slug}`)
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          slug: mockProperty.slug,
          title: mockProperty.title,
          description: mockProperty.description,
          price: mockProperty.price,
          owner: expect.objectContaining({
            email: mockLandlord.email,
            firstName: mockLandlord.firstName,
            lastName: mockLandlord.lastName,
            phoneNumber: mockLandlord.phoneNumber,
            avatarUrl: mockLandlord.avatarUrl,
          }),
        })
      );

      expect(propertyRepository.findOne).toHaveBeenCalledWith({
        where: { slug: mockProperty.slug, isActive: true },
        relations: ['owner'],
      });
    });

    it('should return null when property not found', async () => {
      propertyRepository.findOne.mockResolvedValue(null);

      const response = await request(app.getHttpServer())
        .get('/properties/non-existent-slug')
        .expect(200);

      expect(response.body).toEqual({});
    });

    it('should return null when property is inactive', async () => {
      const inactiveProperty = createMockProperty({
        owner: mockLandlord,
        isActive: false,
      });
      
      propertyRepository.findOne.mockResolvedValue(null); // Service filters inactive

      const response = await request(app.getHttpServer())
        .get(`/properties/${inactiveProperty.slug}`)
        .expect(200);

      expect(response.body).toEqual({});
      expect(propertyRepository.findOne).toHaveBeenCalledWith({
        where: { slug: inactiveProperty.slug, isActive: true },
        relations: ['owner'],
      });
    });

    it('should include owner information in response', async () => {
      propertyRepository.findOne.mockResolvedValue(mockProperty);

      const response = await request(app.getHttpServer())
        .get(`/properties/${mockProperty.slug}`)
        .expect(200);

      expect(response.body.owner).toBeDefined();
      expect(response.body.owner.email).toBe(mockLandlord.email);
      expect(response.body.owner.firstName).toBe(mockLandlord.firstName);
      expect(response.body.owner.lastName).toBe(mockLandlord.lastName);
    });
  });
});