import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { PropertyLandlordService } from './property.landlord.service';
import { PropertiesLandlordCreateDto } from './dto/properties-landlord-create.dto';
import { PropertiesLandlordUpdateDto } from './dto/properties-landlord-update.dto';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import { AuthUser } from '../../auth/decorator/auth-user.decorator';
import { User } from '../../users/entities/user.entity';

@Controller('landlord/properties')
@UseGuards(JwtAuthGuard)
export class PropertyLandlordController {
  constructor(private readonly propertyLandlordService: PropertyLandlordService) {}

  @Post()
  create(@Body() createPropertyDto: PropertiesLandlordCreateDto, @AuthUser() user: User) {
    return this.propertyLandlordService.create(createPropertyDto, user.id);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery, @AuthUser() user: User) {
    return this.propertyLandlordService.findAll(query, user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @AuthUser() user: User) {
    return this.propertyLandlordService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: PropertiesLandlordUpdateDto,
    @AuthUser() user: User,
  ) {
    return this.propertyLandlordService.update(id, updatePropertyDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @AuthUser() user: User) {
    return this.propertyLandlordService.remove(id, user.id);
  }
}