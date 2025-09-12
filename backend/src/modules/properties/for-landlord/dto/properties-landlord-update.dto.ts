import { PartialType } from '@nestjs/mapped-types';
import { PropertiesLandlordCreateDto } from './properties-landlord-create.dto';

export class PropertiesLandlordUpdateDto extends PartialType(
  PropertiesLandlordCreateDto,
) {}
