import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { User } from '../users/entities/user.entity';

import { PropertyAdminController } from './for-admin/property.admin.controller';
import { PropertyAdminService } from './for-admin/property.admin.service';

import { PropertyLandlordController } from './for-landlord/property.landlord.controller';
import { PropertyLandlordService } from './for-landlord/property.landlord.service';

import { PropertyPublicController } from './for-public/property.public.controller';
import { PropertyPublicService } from './for-public/property.public.service';
import { PropertyCronService } from './property-cron.service';

@Module({
  imports: [TypeOrmModule.forFeature([Property, User])],
  controllers: [
    PropertyAdminController,
    PropertyLandlordController,
    PropertyPublicController,
  ],
  providers: [
    PropertyAdminService,
    PropertyLandlordService,
    PropertyPublicService,
    PropertyCronService,
  ],
  exports: [
    PropertyAdminService,
    PropertyLandlordService,
    PropertyPublicService,
  ],
})
export class PropertiesModule {}