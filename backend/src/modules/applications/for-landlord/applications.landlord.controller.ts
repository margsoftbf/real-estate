import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApplicationsLandlordService } from './applications.landlord.service';
import { ApplicationsLandlordUpdateDto } from './dto/applications-landlord-update.dto';
import { ApplicationsLandlordReadManyResponseDto } from './dto/applications-landlord-read-many.response.dto';
import { ApplicationsLandlordReadOneDto } from './dto/applications-landlord-read-one.response.dto';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import { AuthUser } from '../../auth/decorator/auth-user.decorator';

@Controller('landlord/applications')
@UseGuards(JwtAuthGuard)
export class ApplicationsLandlordController {
  constructor(
    private readonly applicationsLandlordService: ApplicationsLandlordService,
  ) {}

  @Get()
  findMyPropertyApplications(
    @Paginate() query: PaginateQuery,
    @AuthUser('id') landlordId: string,
  ): Promise<ApplicationsLandlordReadManyResponseDto> {
    return this.applicationsLandlordService.findMyPropertyApplications(
      query,
      landlordId,
    );
  }

  @Get('renters')
  findMyRenters(
    @Paginate() query: PaginateQuery,
    @AuthUser('id') landlordId: string,
  ): Promise<ApplicationsLandlordReadManyResponseDto> {
    return this.applicationsLandlordService.findMyRenters(query, landlordId);
  }

  @Get(':slug')
  findOne(
    @Param('slug') slug: string,
    @AuthUser('id') landlordId: string,
  ): Promise<ApplicationsLandlordReadOneDto> {
    return this.applicationsLandlordService.findOne(slug, landlordId);
  }

  @Patch(':slug')
  update(
    @Param('slug') slug: string,
    @Body() updateApplicationDto: ApplicationsLandlordUpdateDto,
    @AuthUser('id') landlordId: string,
  ): Promise<ApplicationsLandlordReadOneDto> {
    return this.applicationsLandlordService.updateApplication(
      slug,
      updateApplicationDto,
      landlordId,
    );
  }
}
