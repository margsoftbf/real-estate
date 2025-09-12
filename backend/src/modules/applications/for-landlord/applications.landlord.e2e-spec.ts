import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application, ApplicationStatus } from '../entities/application.entity';
import { Property } from '../../properties/entities/property.entity';
import { ApplicationsLandlordController } from './applications.landlord.controller';
import { ApplicationsLandlordService } from './applications.landlord.service';
import { JwtAuthGuard } from '../../auth/jwt';
import {
  createMockApplication,
  createMockProperty,
  createLandlordUser,
  createMockUser,
} from '../../../../test/test-helpers';

describe('ApplicationsLandlordController (e2e)', () => {
  let app: INestApplication;
  let applicationsLandlordService: jest.Mocked<ApplicationsLandlordService>;

  const mockLandlord = createLandlordUser({ id: 'landlord-id' });
  const mockProperty = createMockProperty({ owner: mockLandlord });
  const mockApplication = createMockApplication({
    property: mockProperty,
    status: ApplicationStatus.PENDING,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationsLandlordController],
      providers: [
        {
          provide: ApplicationsLandlordService,
          useValue: {
            findMyPropertyApplications: jest.fn(),
            findMyRenters: jest.fn(),
            findOne: jest.fn(),
            updateApplication: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile();

    app = module.createNestApplication();
    
    app.useGlobalPipes(new ValidationPipe());
    
    // Mock middleware to set user from header
    app.use('/landlord/applications', (req, res, next) => {
      if (req.headers.user) {
        req.user = JSON.parse(req.headers.user as string);
      }
      next();
    });
    
    await app.init();

    applicationsLandlordService = module.get(ApplicationsLandlordService);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /landlord/applications', () => {
    it('should return landlord property applications', async () => {
      applicationsLandlordService.findMyPropertyApplications.mockResolvedValue({
        data: [mockApplication],
        meta: {
          itemsPerPage: 10,
          totalItems: 1,
          currentPage: 1,
          totalPages: 1,
        },
        links: {
          first: '/landlord/applications?page=1',
          current: '/landlord/applications?page=1',
          last: '/landlord/applications?page=1',
        },
      });

      const response = await request(app.getHttpServer())
        .get('/landlord/applications')
        .set('user', JSON.stringify(mockLandlord))
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0]).toEqual(expect.objectContaining({
        id: mockApplication.id,
        slug: mockApplication.slug,
        status: mockApplication.status,
        applicantName: mockApplication.applicantName,
        applicantEmail: mockApplication.applicantEmail,
      }));
      expect(response.body.meta).toEqual(expect.objectContaining({
        itemsPerPage: 10,
        totalItems: 1,
        currentPage: 1,
        totalPages: 1,
      }));
      expect(
        applicationsLandlordService.findMyPropertyApplications,
      ).toHaveBeenCalledWith(expect.any(Object), 'landlord-id');
    });
  });

  describe('GET /landlord/applications/renters', () => {
    it('should return landlord renters', async () => {
      const mockRenter = createMockUser();
      const mockAcceptedApplication = createMockApplication({
        property: mockProperty,
        applicant: mockRenter,
        status: ApplicationStatus.ACCEPTED,
      });

      applicationsLandlordService.findMyRenters.mockResolvedValue({
        data: [mockAcceptedApplication],
        meta: {
          itemsPerPage: 10,
          totalItems: 1,
          currentPage: 1,
          totalPages: 1,
        },
        links: {
          first: '/landlord/applications/renters?page=1',
          current: '/landlord/applications/renters?page=1',
          last: '/landlord/applications/renters?page=1',
        },
      });

      const response = await request(app.getHttpServer())
        .get('/landlord/applications/renters')
        .set('user', JSON.stringify(mockLandlord))
        .expect(200);

      expect(response.body.data).toEqual([
        expect.objectContaining({
          id: mockAcceptedApplication.id,
          slug: mockAcceptedApplication.slug,
          status: mockAcceptedApplication.status,
          applicantName: mockAcceptedApplication.applicantName,
          applicantEmail: mockAcceptedApplication.applicantEmail,
        }),
      ]);
      expect(response.body.meta).toEqual(expect.objectContaining({
        itemsPerPage: 10,
        totalItems: 1,
        currentPage: 1,
        totalPages: 1,
      }));
      expect(applicationsLandlordService.findMyRenters).toHaveBeenCalledWith(
        expect.any(Object),
        'landlord-id',
      );
    });
  });

  describe('GET /landlord/applications/:slug', () => {
    it('should return a specific application', async () => {
      applicationsLandlordService.findOne.mockResolvedValue(mockApplication);

      const response = await request(app.getHttpServer())
        .get(`/landlord/applications/${mockApplication.slug}`)
        .set('user', JSON.stringify(mockLandlord))
        .expect(200);

      expect(response.body).toEqual(expect.objectContaining({
        id: mockApplication.id,
        slug: mockApplication.slug,
        status: mockApplication.status,
        applicantName: mockApplication.applicantName,
        applicantEmail: mockApplication.applicantEmail,
      }));
      expect(applicationsLandlordService.findOne).toHaveBeenCalledWith(
        mockApplication.slug,
        'landlord-id',
      );
    });

    it('should return 404 for non-existent application', async () => {
      applicationsLandlordService.findOne.mockRejectedValue(
        new NotFoundException('Application not found')
      );

      await request(app.getHttpServer())
        .get('/landlord/applications/non-existent-slug')
        .set('user', JSON.stringify(mockLandlord))
        .expect(404);
    });
  });

  describe('PATCH /landlord/applications/:slug', () => {
    it('should update application status', async () => {
      const updateDto = {
        status: ApplicationStatus.ACCEPTED,
        landlordNotes: 'Application approved',
      };

      const updatedApplication = {
        ...mockApplication,
        ...updateDto,
      };

      applicationsLandlordService.updateApplication.mockResolvedValue(
        updatedApplication,
      );

      const response = await request(app.getHttpServer())
        .patch(`/landlord/applications/${mockApplication.slug}`)
        .set('user', JSON.stringify(mockLandlord))
        .send(updateDto)
        .expect(200);

      expect(response.body).toHaveProperty(
        'status',
        ApplicationStatus.ACCEPTED,
      );
      expect(response.body).toHaveProperty(
        'landlordNotes',
        'Application approved',
      );
      expect(
        applicationsLandlordService.updateApplication,
      ).toHaveBeenCalledWith(mockApplication.slug, updateDto, 'landlord-id');
    });

    it('should return 404 for non-existent application', async () => {
      const updateDto = {
        status: ApplicationStatus.ACCEPTED,
      };

      applicationsLandlordService.updateApplication.mockRejectedValue(
        new NotFoundException('Application not found')
      );

      await request(app.getHttpServer())
        .patch('/landlord/applications/non-existent-slug')
        .set('user', JSON.stringify(mockLandlord))
        .send(updateDto)
        .expect(404);
    });

    it('should validate required fields', async () => {
      const invalidUpdateDto = {
        status: 'invalid-status',
      };

      await request(app.getHttpServer())
        .patch(`/landlord/applications/${mockApplication.slug}`)
        .set('user', JSON.stringify(mockLandlord))
        .send(invalidUpdateDto)
        .expect(400);
    });
  });
});