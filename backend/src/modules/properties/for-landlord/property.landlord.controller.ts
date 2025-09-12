import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
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
  constructor(
    private readonly propertyLandlordService: PropertyLandlordService,
  ) {}

  @Post()
  create(
    @Body() createPropertyDto: PropertiesLandlordCreateDto,
    @AuthUser() user: User,
  ) {
    return this.propertyLandlordService.create(createPropertyDto, user.id);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery, @AuthUser() user: User) {
    return this.propertyLandlordService.findAll(query, user.id);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string, @AuthUser() user: User) {
    return this.propertyLandlordService.findOne(slug, user.id);
  }

  @Patch(':slug')
  update(
    @Param('slug') slug: string,
    @Body() updatePropertyDto: PropertiesLandlordUpdateDto,
    @AuthUser() user: User,
  ) {
    return this.propertyLandlordService.update(
      slug,
      updatePropertyDto,
      user.id,
    );
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string, @AuthUser() user: User) {
    return this.propertyLandlordService.remove(slug, user.id);
  }
}
