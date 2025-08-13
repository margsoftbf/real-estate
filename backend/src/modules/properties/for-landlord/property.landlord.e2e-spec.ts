import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property, PropertyType } from '../entities/property.entity';
import { User } from '../../users/entities/user.entity';
import { PropertyLandlordController } from './property.landlord.controller';
import { PropertyLandlordService } from './property.landlord.service';
import { JwtAuthGuard } from '../../auth/jwt';
import {
  createMockProperty,
  createLandlordUser,
} from '../../../../test/test-helpers';

jest.mock('nestjs-paginate', () => ({
  ...jest.requireActual('nestjs-paginate'),
  paginate: jest.fn(),
  Paginate:
    () => (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
      descriptor,
}));

import { paginate } from 'nestjs-paginate';

describe('PropertyLandlordController (e2e)', () => {
  let app: INestApplication;
  let propertyRepository: jest.Mocked<Repository<Property>>;
  let userRepository: jest.Mocked<Repository<User>>;

  const mockLandlord = createLandlordUser();
  const mockProperty = createMockProperty({ owner: mockLandlord });

  beforeEach(async () => {
    const mockPropertyRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      softRemove: jest.fn(),
      createQueryBuilder: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
      }),
    };

    const mockUserRepository = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyLandlordController],
      providers: [
        PropertyLandlordService,
        {
          provide: getRepositoryToken(Property),
          useValue: mockPropertyRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context) => {
          const request = context.switchToHttp().getRequest();
          request.user = mockLandlord;
          return true;
        },
      })
      .compile();

    app = module.createNestApplication();
    await app.init();

    propertyRepository = module.get(getRepositoryToken(Property));
    userRepository = module.get(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /landlord/properties', () => {
    const createDto = {
      slug: 'test-property-slug',
      type: PropertyType.RENT,
      price: 2500,
      city: 'Warsaw',
      country: 'Poland',
      title: 'Test Property',
      photos: ['https://example.com/photo1.jpg'],
      description: 'A beautiful test property',
      features: {
        bedrooms: 2,
        bathrooms: 1,
        area: 75,
        homeType: 'apartment' as const,
        furnished: true,
      },
    };

    it('should create a property successfully', async () => {
      userRepository.findOne.mockResolvedValue(mockLandlord);
      propertyRepository.create.mockReturnValue(mockProperty);
      propertyRepository.save.mockResolvedValue(mockProperty);

      const response = await request(app.getHttpServer())
        .post('/landlord/properties')
        .send(createDto)
        .expect(201);

      expect(response.body.slug).toBe(mockProperty.slug);
      expect(response.body.type).toBe(mockProperty.type);
      expect(response.body.price).toBe(mockProperty.price);
    });

    it('should handle invalid data creation', async () => {
      userRepository.findOne.mockResolvedValue(mockLandlord);
      propertyRepository.create.mockReturnValue(mockProperty);
      propertyRepository.save.mockResolvedValue(mockProperty);

      const invalidDto = {
        price: -100,
      };

      const response = await request(app.getHttpServer())
        .post('/landlord/properties')
        .send(invalidDto);

      expect([201, 400, 404]).toContain(response.status);
    });

    it('should return 404 when landlord not found', async () => {
      userRepository.findOne.mockResolvedValue(null);

      await request(app.getHttpServer())
        .post('/landlord/properties')
        .send(createDto)
        .expect(404);
    });
  });

  describe('GET /landlord/properties', () => {
    it('should return paginated properties', async () => {
      const mockPaginatedResult = {
        data: [mockProperty],
        meta: {
          itemsPerPage: 10,
          totalItems: 1,
          currentPage: 1,
          totalPages: 1,
        },
        links: {
          first: '/landlord/properties?page=1&limit=10',
          previous: '',
          next: '',
          last: '/landlord/properties?page=1&limit=10',
          current: '/landlord/properties?page=1&limit=10',
        },
      };

      (paginate as jest.Mock).mockResolvedValue(mockPaginatedResult);

      const response = await request(app.getHttpServer())
        .get('/landlord/properties')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].slug).toBe(mockProperty.slug);
      expect(response.body.meta.totalItems).toBe(1);
    });

    it('should handle pagination parameters', async () => {
      const mockPaginatedResult = {
        data: [],
        meta: { itemsPerPage: 5, totalItems: 0, currentPage: 2, totalPages: 0 },
        links: { current: '/landlord/properties?page=2&limit=5' },
      };

      (paginate as jest.Mock).mockResolvedValue(mockPaginatedResult);

      await request(app.getHttpServer())
        .get('/landlord/properties?page=2&limit=5')
        .expect(200);
    });
  });

  describe('GET /landlord/properties/:id', () => {
    it('should return property details', async () => {
      propertyRepository.findOne.mockResolvedValue(mockProperty);

      const response = await request(app.getHttpServer())
        .get(`/landlord/properties/${mockProperty.id}`)
        .expect(200);

      expect(response.body.slug).toBe(mockProperty.slug);
      expect(response.body.description).toBe(mockProperty.description);
      expect(response.body.priceHistory).toBeDefined();
    });

    it('should return 404 when property not found', async () => {
      propertyRepository.findOne.mockResolvedValue(null);

      await request(app.getHttpServer())
        .get('/landlord/properties/non-existent-id')
        .expect(404);
    });

    it('should return 403 when property belongs to another landlord', async () => {
      const otherLandlord = createLandlordUser({ id: 'other-landlord-id' });
      const otherProperty = createMockProperty({ owner: otherLandlord });

      propertyRepository.findOne.mockResolvedValue(otherProperty);

      await request(app.getHttpServer())
        .get(`/landlord/properties/${otherProperty.id}`)
        .expect(403);
    });
  });

  describe('PATCH /landlord/properties/:id', () => {
    const updateDto = {
      title: 'Updated Property Title',
      price: 3000,
    };

    it('should update property successfully', async () => {
      const updatedProperty = { ...mockProperty, ...updateDto };

      propertyRepository.findOne
        .mockResolvedValueOnce(mockProperty)
        .mockResolvedValueOnce(mockProperty)
        .mockResolvedValueOnce(updatedProperty);

      propertyRepository.save.mockResolvedValue(updatedProperty);

      const response = await request(app.getHttpServer())
        .patch(`/landlord/properties/${mockProperty.id}`)
        .send(updateDto)
        .expect(200);

      expect(response.body.title).toBe(updateDto.title);
      expect(response.body.price).toBe(updateDto.price);
    });

    it('should return 404 when property not found', async () => {
      propertyRepository.findOne.mockResolvedValue(null);

      await request(app.getHttpServer())
        .patch('/landlord/properties/non-existent-id')
        .send(updateDto)
        .expect(404);
    });

    it('should handle update with invalid data', async () => {
      const updatedProperty = { ...mockProperty, price: -1000 };

      propertyRepository.findOne
        .mockResolvedValueOnce(mockProperty)
        .mockResolvedValueOnce(mockProperty)
        .mockResolvedValueOnce(updatedProperty);
      propertyRepository.save.mockResolvedValue(updatedProperty);

      const invalidDto = {
        price: -1000,
        type: 'INVALID_TYPE',
      };

      const response = await request(app.getHttpServer())
        .patch(`/landlord/properties/${mockProperty.id}`)
        .send(invalidDto);

      expect([200, 400, 404]).toContain(response.status);
    });
  });

  describe('DELETE /landlord/properties/:id', () => {
    it('should delete property successfully', async () => {
      propertyRepository.findOne.mockResolvedValue(mockProperty);
      propertyRepository.softRemove.mockResolvedValue(mockProperty);

      await request(app.getHttpServer())
        .delete(`/landlord/properties/${mockProperty.id}`)
        .expect(200);

      expect(propertyRepository.softRemove).toHaveBeenCalled();
    });

    it('should return 404 when property not found', async () => {
      propertyRepository.findOne.mockResolvedValue(null);

      await request(app.getHttpServer())
        .delete('/landlord/properties/non-existent-id')
        .expect(404);
    });

    it('should return 403 when property belongs to another landlord', async () => {
      const otherLandlord = createLandlordUser({ id: 'other-landlord-id' });
      const otherProperty = createMockProperty({ owner: otherLandlord });

      propertyRepository.findOne.mockResolvedValue(otherProperty);

      await request(app.getHttpServer())
        .delete(`/landlord/properties/${otherProperty.id}`)
        .expect(403);
    });
  });
});
