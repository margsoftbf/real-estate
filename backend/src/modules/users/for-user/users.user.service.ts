import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserReadInfoDto } from './dto/user-read-info-response.dto';
import { UpdateUserDto } from './dto/user-update-response.dto';
import { ExceptionConstants } from '../../../exceptions';

@Injectable()
export class UsersUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async readUserInfo(userId: string): Promise<UserReadInfoDto> {
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
      country: user.country,
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

  async updateUser(
    userId: string,
    updateData: UpdateUserDto,
  ): Promise<UserReadInfoDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(
        ExceptionConstants.UsersErrors.userNotFound.message,
      );
    }

    await this.userRepository.update(userId, updateData);

    return this.readUserInfo(userId);
  }

  async findById(userId: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: userId },
    });
  }
}
