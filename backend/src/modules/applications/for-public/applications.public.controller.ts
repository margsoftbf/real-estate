import { Body, Controller, Post } from '@nestjs/common';
import { ApplicationsPublicService } from './applications.public.service';
import { ApplicationsPublicCreateDto } from './dto/applications-public-create.dto';

@Controller('applications')
export class ApplicationsPublicController {
  constructor(
    private readonly applicationsPublicService: ApplicationsPublicService,
  ) {}

  @Post()
  create(@Body() createApplicationDto: ApplicationsPublicCreateDto) {
    return this.applicationsPublicService.create(createApplicationDto);
  }
}
