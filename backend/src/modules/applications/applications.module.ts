import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Property } from '../properties/entities/property.entity';
import { User } from '../users/entities/user.entity';
import { PropertyLandlordService } from '../properties/for-landlord/property.landlord.service';
import { PropertyPublicService } from '../properties/for-public/property.public.service';
import { UsersUserService } from '../users/for-user/users.user.service';

import { ApplicationsPublicController } from './for-public/applications.public.controller';
import { ApplicationsPublicService } from './for-public/applications.public.service';

import { ApplicationsLandlordController } from './for-landlord/applications.landlord.controller';
import { ApplicationsLandlordService } from './for-landlord/applications.landlord.service';

import { ApplicationsTenantController } from './for-tenant/applications.tenant.controller';
import { ApplicationsTenantService } from './for-tenant/applications.tenant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Application, Property, User])],
  controllers: [
    ApplicationsPublicController,
    ApplicationsLandlordController,
    ApplicationsTenantController,
  ],
  providers: [
    ApplicationsPublicService,
    ApplicationsLandlordService,
    ApplicationsTenantService,
    PropertyLandlordService,
    PropertyPublicService,
    UsersUserService,
  ],
  exports: [
    ApplicationsPublicService,
    ApplicationsLandlordService,
    ApplicationsTenantService,
  ],
})
export class ApplicationsModule {}
