import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  INestApplication,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { ApplicationsTenantController } from './applications.tenant.controller';
import { ApplicationsTenantService } from './applications.tenant.service';
import { JwtAuthGuard } from '../../auth/jwt';
import { ApplicationStatus } from '../entities/application.entity';
import {
  createLandlordUser,
  createMockApplication,
  createMockProperty,
  createMockUser,
} from '../../../../test/test-helpers';

describe('ApplicationsTenantController (e2e)', () => {
  let app: INestApplication;
  let applicationsTenantService: jest.Mocked<ApplicationsTenantService>;

  const mockTenant = createMockUser({ id: 'tenant-id' });
  const mockLandlord = createLandlordUser({ id: 'landlord-id' });
  const mockProperty = createMockProperty({
    slug: 'test-property-slug',
    owner: mockLandlord,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationsTenantController],
      providers: [
        {
          provide: ApplicationsTenantService,
          useValue: {
            create: jest.fn(),
            findMyApplications: jest.fn(),
            findMyRentals: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn((context) => {
          const request = context.switchToHttp().getRequest();
          // Return false for unauthenticated requests (no user header)
          return !!request.headers.user;
        }),
      })
      .compile();

    app = module.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    // Mock middleware to set user from header
    app.use('/tenant/applications', (req, res, next) => {
      if (req.headers.user) {
        req.user = JSON.parse(req.headers.user as string);
      }
      next();
    });

    await app.init();

    applicationsTenantService = module.get(ApplicationsTenantService);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /tenant/applications', () => {
    it('should create a new application for authenticated tenant', async () => {
      const createApplicationDto = {
        propertySlug: 'test-property-slug',
        message: 'I am interested in this property',
        preferredMoveInDate: '2025-03-01T00:00:00.000Z',
      };

      const mockCreatedApplication = createMockApplication({
        applicant: mockTenant,
        property: mockProperty,
        message: createApplicationDto.message,
        proposedRent: null,
        status: ApplicationStatus.PENDING,
      });

      applicationsTenantService.create.mockResolvedValue(
        mockCreatedApplication,
      );

      const response = await request(app.getHttpServer())
        .post('/tenant/applications')
        .set('user', JSON.stringify(mockTenant))
        .send(createApplicationDto);

      if (response.status !== 201) {
        console.log('Validation error:', response.body);
      }

      expect(response.status).toBe(201);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: mockCreatedApplication.id,
          message: createApplicationDto.message,
          proposedRent: null,
          status: ApplicationStatus.PENDING,
        }),
      );
      expect(applicationsTenantService.create).toHaveBeenCalledWith(
        createApplicationDto,
        mockTenant.id,
      );
    });

    it('should create application with minimal required fields', async () => {
      const createApplicationDto = {
        propertySlug: 'test-property-slug',
      };

      const mockCreatedApplication = createMockApplication({
        property: mockProperty,
        applicant: mockTenant,
        applicantName: mockTenant.firstName + ' ' + mockTenant.lastName,
        applicantEmail: mockTenant.email,
        message: null,
        proposedRent: null,
        preferredMoveInDate: null,
        status: ApplicationStatus.PENDING,
      });

      applicationsTenantService.create.mockResolvedValue(
        mockCreatedApplication,
      );

      const response = await request(app.getHttpServer())
        .post('/tenant/applications')
        .set('user', JSON.stringify(mockTenant))
        .send(createApplicationDto)
        .expect(201);

      expect(response.body).toEqual(
        expect.objectContaining({
          id: mockCreatedApplication.id,
          status: ApplicationStatus.PENDING,
        }),
      );
      expect(applicationsTenantService.create).toHaveBeenCalledWith(
        createApplicationDto,
        mockTenant.id,
      );
    });

    it('should return 404 for non-existent property', async () => {
      const createApplicationDto = {
        propertySlug: 'non-existent-property',
      };

      applicationsTenantService.create.mockRejectedValue(
        new NotFoundException('Property not found'),
      );

      await request(app.getHttpServer())
        .post('/tenant/applications')
        .set('user', JSON.stringify(mockTenant))
        .send(createApplicationDto)
        .expect(404);
    });

    it('should validate required fields', async () => {
      await request(app.getHttpServer())
        .post('/tenant/applications')
        .set('user', JSON.stringify(mockTenant))
        .send({})
        .expect(400);
    });

    it('should prevent applying to own property', async () => {
      const createApplicationDto = {
        propertySlug: 'own-property-slug',
      };

      applicationsTenantService.create.mockRejectedValue(
        new BadRequestException('Cannot apply to your own property'),
      );

      await request(app.getHttpServer())
        .post('/tenant/applications')
        .set('user', JSON.stringify(mockTenant))
        .send(createApplicationDto)
        .expect(400);
    });
  });

  describe('GET /tenant/applications', () => {
    it('should return tenant applications', async () => {
      const mockTenantApplication = createMockApplication({
        applicant: mockTenant,
        property: mockProperty,
        status: ApplicationStatus.PENDING,
      });

      const mockPaginatedResponse = {
        data: [
          {
            slug: mockTenantApplication.slug,
            status: mockTenantApplication.status,
            message: mockTenantApplication.message,
            proposedRent: mockTenantApplication.proposedRent,
            preferredMoveInDate: mockTenantApplication.preferredMoveInDate,
            landlordNotes: mockTenantApplication.landlordNotes,
            isCurrentRenter: mockTenantApplication.isCurrentRenter || false,
            createdAt: mockTenantApplication.createdAt,
            updatedAt: mockTenantApplication.updatedAt,
            property: {
              slug: mockProperty.slug,
              title: mockProperty.title,
              city: mockProperty.city,
              country: mockProperty.country,
              price: mockProperty.price,
              photos: mockProperty.photos,
            },
            landlord: {
              slug: mockLandlord.slug,
              firstName: mockLandlord.firstName,
              lastName: mockLandlord.lastName,
              email: mockLandlord.email,
              phoneNumber: mockLandlord.phoneNumber,
            },
          },
        ],
        meta: {
          totalItems: 1,
          itemCount: 1,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1,
        },
        links: {
          first: '/tenant/applications?limit=10',
          last: '/tenant/applications?page=1&limit=10',
          current: '/tenant/applications?page=1&limit=10',
        },
      };

      applicationsTenantService.findMyApplications.mockResolvedValue(
        mockPaginatedResponse,
      );

      const response = await request(app.getHttpServer())
        .get('/tenant/applications')
        .set('user', JSON.stringify(mockTenant))
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          data: expect.arrayContaining([
            expect.objectContaining({
              slug: mockTenantApplication.slug,
              status: mockTenantApplication.status,
            }),
          ]),
          meta: expect.objectContaining({ totalItems: 1 }),
        }),
      );
      expect(applicationsTenantService.findMyApplications).toHaveBeenCalledWith(
        expect.any(Object), // PaginateQuery
        mockTenant.id,
      );
    });

    it('should return empty array when no applications exist', async () => {
      const mockEmptyPaginatedResponse = {
        data: [],
        meta: {
          totalItems: 0,
          itemCount: 0,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1,
        },
        links: {
          first: '/tenant/applications?limit=10',
          last: '/tenant/applications?page=1&limit=10',
          current: '/tenant/applications?page=1&limit=10',
        },
      };

      applicationsTenantService.findMyApplications.mockResolvedValue(
        mockEmptyPaginatedResponse,
      );

      const response = await request(app.getHttpServer())
        .get('/tenant/applications')
        .set('user', JSON.stringify(mockTenant))
        .expect(200);

      expect(response.body).toEqual(expect.objectContaining({ data: [] }));
    });
  });

  describe('GET /tenant/applications/rentals', () => {
    it('should return accepted applications (rentals)', async () => {
      const mockAcceptedApplication = createMockApplication({
        applicant: mockTenant,
        property: mockProperty,
        status: ApplicationStatus.ACCEPTED,
      });

      const mockRentalsPaginatedResponse = {
        data: [
          {
            slug: mockAcceptedApplication.slug,
            status: mockAcceptedApplication.status,
            message: mockAcceptedApplication.message,
            proposedRent: mockAcceptedApplication.proposedRent,
            preferredMoveInDate: mockAcceptedApplication.preferredMoveInDate,
            landlordNotes: mockAcceptedApplication.landlordNotes,
            isCurrentRenter: mockAcceptedApplication.isCurrentRenter || true,
            createdAt: mockAcceptedApplication.createdAt,
            updatedAt: mockAcceptedApplication.updatedAt,
            property: {
              slug: mockProperty.slug,
              title: mockProperty.title,
              city: mockProperty.city,
              country: mockProperty.country,
              price: mockProperty.price,
              photos: mockProperty.photos,
            },
            landlord: {
              slug: mockLandlord.slug,
              firstName: mockLandlord.firstName,
              lastName: mockLandlord.lastName,
              email: mockLandlord.email,
              phoneNumber: mockLandlord.phoneNumber,
            },
          },
        ],
        meta: {
          totalItems: 1,
          itemCount: 1,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1,
        },
        links: {
          first: '/tenant/applications/rentals?limit=10',
          last: '/tenant/applications/rentals?page=1&limit=10',
          current: '/tenant/applications/rentals?page=1&limit=10',
        },
      };

      applicationsTenantService.findMyRentals.mockResolvedValue(
        mockRentalsPaginatedResponse,
      );

      const response = await request(app.getHttpServer())
        .get('/tenant/applications/rentals')
        .set('user', JSON.stringify(mockTenant))
        .expect(200);

      expect(response.body).toEqual(
        expect.objectContaining({
          data: expect.arrayContaining([
            expect.objectContaining({
              slug: mockAcceptedApplication.slug,
              status: mockAcceptedApplication.status,
            }),
          ]),
          meta: expect.objectContaining({ totalItems: 1 }),
        }),
      );
      expect(applicationsTenantService.findMyRentals).toHaveBeenCalledWith(
        expect.any(Object), // PaginateQuery
        mockTenant.id,
      );
    });

    it('should return empty array when no accepted applications exist', async () => {
      const mockEmptyRentalsPaginatedResponse = {
        data: [],
        meta: {
          totalItems: 0,
          itemCount: 0,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1,
        },
        links: {
          first: '/tenant/applications/rentals?limit=10',
          last: '/tenant/applications/rentals?page=1&limit=10',
          current: '/tenant/applications/rentals?page=1&limit=10',
        },
      };

      applicationsTenantService.findMyRentals.mockResolvedValue(
        mockEmptyRentalsPaginatedResponse,
      );

      const response = await request(app.getHttpServer())
        .get('/tenant/applications/rentals')
        .set('user', JSON.stringify(mockTenant))
        .expect(200);

      expect(response.body).toEqual(expect.objectContaining({ data: [] }));
    });
  });

  describe('Authentication', () => {
    it('should require authentication for POST /tenant/applications', async () => {
      await request(app.getHttpServer())
        .post('/tenant/applications')
        .send({ propertySlug: 'test-property-slug' })
        .expect(403);
    });

    it('should require authentication for GET /tenant/applications', async () => {
      await request(app.getHttpServer())
        .get('/tenant/applications')
        .expect(403);
    });

    it('should require authentication for GET /tenant/applications/rentals', async () => {
      await request(app.getHttpServer())
        .get('/tenant/applications/rentals')
        .expect(403);
    });
  });
});
