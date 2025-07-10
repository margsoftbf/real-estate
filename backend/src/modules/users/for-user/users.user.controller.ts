import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersUserService } from './users.user.service';
import { JwtAuthGuard } from '../../auth/jwt';
import { ReadUserInfoDto } from './dto/read-user-info.dto';
import { AuthUser } from '../../auth/decorator/auth-user.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersUserController {
  constructor(private readonly usersUserService: UsersUserService) {}

  @Get('userinfo')
  async readUserInfo(@AuthUser('id') userId: string): Promise<ReadUserInfoDto> {
    return this.usersUserService.readUserInfo(userId);
  }
}
