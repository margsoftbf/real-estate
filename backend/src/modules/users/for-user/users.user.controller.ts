import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersUserService } from './users.user.service';
import { JwtAuthGuard } from '../../auth/jwt';
import { UserReadInfoDto } from './dto/user-read-info-response.dto';
import { UpdateUserDto } from './dto/user-update-response.dto';
import { AuthUser } from '../../auth/decorator/auth-user.decorator';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersUserController {
  constructor(private readonly usersUserService: UsersUserService) {}

  @Get('userinfo')
  @ApiOperation({ operationId: 'getUserInfo' })
  async readUserInfo(@AuthUser('id') userId: string): Promise<UserReadInfoDto> {
    return this.usersUserService.readUserInfo(userId);
  }

  @Patch('userinfo')
  @ApiOperation({ operationId: 'updateUserInfo' })
  async updateUser(
    @AuthUser('id') userId: string,
    @Body() updateData: UpdateUserDto,
  ): Promise<UserReadInfoDto> {
    return this.usersUserService.updateUser(userId, updateData);
  }
}
