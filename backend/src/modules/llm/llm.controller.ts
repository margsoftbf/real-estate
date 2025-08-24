import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { LlmService } from './llm.service';
import {
  GenerateDescriptionDto,
  PropertyDescriptionResponse,
} from './dto/generate-description.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { AuthUser } from '../auth/decorator/auth-user.decorator';
import { User, UserRole } from '../users/entities/user.entity';
import { ForbiddenException } from '@nestjs/common';

@Controller('llm/properties')
@UseGuards(JwtAuthGuard)
export class LlmController {
  constructor(private readonly llmService: LlmService) {}

  @Post('generate-description')
  @HttpCode(HttpStatus.OK)
  async generatePropertyDescription(
    @Body() generateDescriptionDto: GenerateDescriptionDto,
    @AuthUser() user: User,
  ): Promise<{
    success: boolean;
    data?: PropertyDescriptionResponse;
    error?: string;
  }> {
    try {
      // Only landlords and admins can generate descriptions
      if (user.role !== UserRole.LANDLORD && user.role !== UserRole.ADMIN) {
        throw new ForbiddenException(
          'Only landlords and admins can generate property descriptions',
        );
      }

      const result = await this.llmService.generatePropertyDescription(
        generateDescriptionDto,
      );

      if (result.error) {
        return {
          success: false,
          error: result.error.message,
        };
      }

      return {
        success: true,
        data: result.response || undefined,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
