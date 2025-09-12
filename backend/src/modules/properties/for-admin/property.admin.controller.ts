import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PropertyAdminService } from './property.admin.service';
import { PropertiesAdminCreateDto } from './dto/properties-admin-create.dto';
import { PropertiesAdminUpdateDto } from './dto/properties-admin-update.dto';
import { PaginateQuery } from 'nestjs-paginate';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
// import { AuthUser } from '../../auth/decorator/auth-user.decorator';
// import { User, UserRole } from '../../users/entities/user.entity';

@Controller('admin/properties')
@UseGuards(JwtAuthGuard)
export class PropertyAdminController {
  constructor(private readonly propertyAdminService: PropertyAdminService) {}

  @Post()
  create(@Body() createPropertyDto: PropertiesAdminCreateDto) {
    const { ownerId, ...propertyData } = createPropertyDto;
    return this.propertyAdminService.create(propertyData, ownerId);
  }

  @Get()
  findAll(@Query() query: PaginateQuery) {
    return this.propertyAdminService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyAdminService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: PropertiesAdminUpdateDto,
  ) {
    return this.propertyAdminService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyAdminService.remove(id);
  }
}
