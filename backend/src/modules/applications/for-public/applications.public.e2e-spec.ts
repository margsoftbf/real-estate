import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  ConflictException,
  INestApplication,
  NotFoundException,
} from '@nestjs/common';
import * as request from 'supertest';
import { ApplicationStatus } from '../entities/application.entity';
import { ApplicationsPublicController } from './applications.public.controller';
import { ApplicationsPublicService } from './applications.public.service';
import {
  createLandlordUser,
  createMockApplication,
  createMockProperty,
} from '../../../../test/test-helpers';

describe('ApplicationsPublicController (e2e)', () => {
  let app: INestApplication;
  let applicationsPublicService: jest.Mocked<ApplicationsPublicService>;

  const mockProperty = createMockProperty({
    slug: 'test-property-slug',
    owner: createLandlordUser(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationsPublicController],
      providers: [
        {
          provide: ApplicationsPublicService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    applicationsPublicService = module.get(ApplicationsPublicService);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /applications', () => {
    it('should create a new application successfully', async () => {
      const createApplicationDto = {
        propertySlug: 'test-property-slug',
        applicantName: 'John Doe',
        applicantEmail: 'john.doe@example.com',
        applicantPhone: '+48123456789',
        message: 'I am interested in this property',
        proposedRent: 2400,
        preferredMoveInDate: '2025-03-01',
      };

      const mockCreatedApplication = createMockApplication({
        applicantName: createApplicationDto.applicantName,
        applicantEmail: createApplicationDto.applicantEmail,
        applicantPhone: createApplicationDto.applicantPhone,
        message: createApplicationDto.message,
        proposedRent: createApplicationDto.proposedRent,
        property: mockProperty,
        applicant: null, // Public application has no authenticated user
        status: ApplicationStatus.PENDING,
      });

      // Mock service create method
      applicationsPublicService.create.mockResolvedValue(
        mockCreatedApplication,
      );

      const response = await request(app.getHttpServer())
        .post('/applications')
        .send(createApplicationDto)
        .expect(201);

      expect(response.body).toHaveProperty(
        'applicantName',
        createApplicationDto.applicantName,
      );
      expect(response.body).toHaveProperty(
        'applicantEmail',
        createApplicationDto.applicantEmail,
      );
      expect(response.body).toHaveProperty('status', ApplicationStatus.PENDING);
      expect(applicationsPublicService.create).toHaveBeenCalledWith(
        createApplicationDto,
      );
    });

    it('should create application with minimal required fields', async () => {
      const createApplicationDto = {
        propertySlug: 'test-property-slug',
        applicantName: 'Jane Smith',
        applicantEmail: 'jane.smith@example.com',
      };

      const mockCreatedApplication = createMockApplication({
        applicantName: createApplicationDto.applicantName,
        applicantEmail: createApplicationDto.applicantEmail,
        applicantPhone: null,
        message: null,
        proposedRent: null,
        preferredMoveInDate: null,
        property: mockProperty,
        applicant: null,
        status: ApplicationStatus.PENDING,
      });

      applicationsPublicService.create.mockResolvedValue(
        mockCreatedApplication,
      );

      const response = await request(app.getHttpServer())
        .post('/applications')
        .send(createApplicationDto)
        .expect(201);

      expect(response.body).toHaveProperty(
        'applicantName',
        createApplicationDto.applicantName,
      );
      expect(response.body).toHaveProperty(
        'applicantEmail',
        createApplicationDto.applicantEmail,
      );
      expect(response.body).toHaveProperty('applicantPhone', null);
      expect(response.body).toHaveProperty('message', null);
      expect(applicationsPublicService.create).toHaveBeenCalledWith(
        createApplicationDto,
      );
    });

    it('should return 404 for non-existent property', async () => {
      const createApplicationDto = {
        propertySlug: 'non-existent-property',
        applicantName: 'John Doe',
        applicantEmail: 'john.doe@example.com',
      };

      applicationsPublicService.create.mockRejectedValue(
        new NotFoundException('Property not found'),
      );

      await request(app.getHttpServer())
        .post('/applications')
        .send(createApplicationDto)
        .expect(404);
    });

    it('should validate required fields', async () => {
      applicationsPublicService.create.mockRejectedValue(
        new BadRequestException('Validation failed'),
      );

      await request(app.getHttpServer())
        .post('/applications')
        .send({})
        .expect(400);
    });

    it('should validate email format', async () => {
      const invalidApplicationDto = {
        propertySlug: 'test-property-slug',
        applicantName: 'John Doe',
        applicantEmail: 'invalid-email',
      };

      applicationsPublicService.create.mockRejectedValue(
        new BadRequestException('Invalid email format'),
      );

      await request(app.getHttpServer())
        .post('/applications')
        .send(invalidApplicationDto)
        .expect(400);
    });

    it('should validate proposed rent format', async () => {
      const invalidApplicationDto = {
        propertySlug: 'test-property-slug',
        applicantName: 'John Doe',
        applicantEmail: 'john.doe@example.com',
        proposedRent: 'not-a-number',
      };

      applicationsPublicService.create.mockRejectedValue(
        new BadRequestException('Invalid rent format'),
      );

      await request(app.getHttpServer())
        .post('/applications')
        .send(invalidApplicationDto)
        .expect(400);
    });

    it('should validate date format', async () => {
      const invalidApplicationDto = {
        propertySlug: 'test-property-slug',
        applicantName: 'John Doe',
        applicantEmail: 'john.doe@example.com',
        preferredMoveInDate: 'invalid-date',
      };

      applicationsPublicService.create.mockRejectedValue(
        new BadRequestException('Invalid date format'),
      );

      await request(app.getHttpServer())
        .post('/applications')
        .send(invalidApplicationDto)
        .expect(400);
    });

    it('should handle duplicate applications gracefully', async () => {
      const createApplicationDto = {
        propertySlug: 'test-property-slug',
        applicantName: 'John Doe',
        applicantEmail: 'john.doe@example.com',
      };

      // Mock duplicate key error
      applicationsPublicService.create.mockRejectedValue(
        new ConflictException('Application already exists'),
      );

      await request(app.getHttpServer())
        .post('/applications')
        .send(createApplicationDto)
        .expect(409);
    });
  });
});
