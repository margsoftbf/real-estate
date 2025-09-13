import { Controller, Get, Param, Query } from '@nestjs/common';
import { PropertyPublicService } from './property.public.service';
import { PaginateQuery } from 'nestjs-paginate';

@Controller('properties')
export class PropertyPublicController {
  constructor(private readonly propertyPublicService: PropertyPublicService) {}

  @Get()
  findAll(@Query() query: PaginateQuery) {
    return this.propertyPublicService.findAll(query);
  }

  @Get('rent')
  findRentProperties(@Query() query: PaginateQuery) {
    return this.propertyPublicService.findRentProperties(query);
  }

  @Get('buy')
  findBuyProperties(@Query() query: PaginateQuery) {
    return this.propertyPublicService.findSellProperties(query);
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.propertyPublicService.findBySlug(slug);
  }
}
