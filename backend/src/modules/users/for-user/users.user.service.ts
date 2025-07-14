import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ReadUserInfoDto } from './dto/read-user-info.dto';
import { ExceptionConstants } from '../../../exceptions';

@Injectable()
export class UsersUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async readUserInfo(userId: string): Promise<ReadUserInfoDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(
        ExceptionConstants.UsersErrors.userNotFound.message,
      );
    }

    return {
      slug: user.slug!,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      avatarUrl: user.avatarUrl,
      role: user.role,
      address: user.address,
      city: user.city,
      postalCode: user.postalCode,
      emailVerified: user.emailVerified,
      privacyConsent: user.privacyConsent,
      marketingConsent: user.marketingConsent,
      isActive: user.isActive,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
