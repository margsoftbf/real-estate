import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { ApplicationsTenantService } from './applications.tenant.service';
import { ApplicationsTenantCreateDto } from './dto/applications-tenant-create.dto';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import { AuthUser } from '../../auth/decorator/auth-user.decorator';
import { PaginateQuery } from 'nestjs-paginate';
import { Paginate } from 'nestjs-paginate';

@Controller('tenant/applications')
@UseGuards(JwtAuthGuard)
export class ApplicationsTenantController {
  constructor(private readonly applicationsTenantService: ApplicationsTenantService) {}

  @Post()
  create(
    @Body() createApplicationDto: ApplicationsTenantCreateDto,
    @AuthUser('id') userId: string,
  ) {
    return this.applicationsTenantService.create(createApplicationDto, userId);
  }

  @Get()
  findMyApplications(
    @Paginate() query: PaginateQuery,
    @AuthUser('id') userId: string,
  ) {
    return this.applicationsTenantService.findMyApplications(query, userId);
  }

  @Get('rentals')
  findMyRentals(
    @Paginate() query: PaginateQuery,
    @AuthUser('id') userId: string,
  ) {
    return this.applicationsTenantService.findMyRentals(query, userId);
  }
}