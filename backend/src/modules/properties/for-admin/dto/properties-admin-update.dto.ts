import { PartialType, OmitType } from '@nestjs/mapped-types';
import { PropertiesAdminCreateDto } from './properties-admin-create.dto';

export class PropertiesAdminUpdateDto extends PartialType(
  OmitType(PropertiesAdminCreateDto, ['ownerId'] as const)
) {}