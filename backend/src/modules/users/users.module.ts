import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersUserController } from './for-user/users.user.controller';
import { UsersUserService } from './for-user/users.user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [
    UsersUserController,
  ],
  providers: [
    UsersUserService,
  ],
  exports: [UsersUserService],
})
export class UsersModule {}
