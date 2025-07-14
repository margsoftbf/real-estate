import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  BadRequestException,
  ExceptionConstants,
  UnauthorizedException,
} from '../../exceptions';
import { generateRandomString } from '@/utils/utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new BadRequestException(
        ExceptionConstants.AuthErrors.userAlreadyExists,
      );
    }

    const passwordHash = await bcrypt.hash(registerDto.password, 10);

    const user = this.userRepository.create({
      firstName: registerDto.firstName || null,
      lastName: registerDto.lastName || null,
      email: registerDto.email,
      passwordHash,
      role: registerDto.role,
      privacyConsent: registerDto.privacyConsent,
      marketingConsent: registerDto.marketingConsent || false,
      slug: generateRandomString(12),
    });

    await this.userRepository.save(user);
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException(
        ExceptionConstants.AuthErrors.invalidCredentials,
      );
    }

    if (!user.passwordHash) {
      throw new UnauthorizedException(
        ExceptionConstants.AuthErrors.invalidCredentials,
      );
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        ExceptionConstants.AuthErrors.invalidCredentials,
      );
    }

    await this.userRepository.update(user.id, {
      lastLoginAt: new Date(),
    });

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
