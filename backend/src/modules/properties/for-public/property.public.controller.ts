import { Controller, Get, Param, Query } from '@nestjs/common';
import { PropertyPublicService } from './property.public.service';
import { PaginateQuery } from 'nestjs-paginate';

@Controller('public/properties')
export class PropertyPublicController {
  constructor(private readonly propertyPublicService: PropertyPublicService) {}

  @Get()
  findAll(@Query() query: PaginateQuery) {
    return this.propertyPublicService.findAll(query);
  }

  @Get('popular')
  findPopular() {
    return this.propertyPublicService.findPopular();
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.propertyPublicService.findBySlug(slug);
  }
}