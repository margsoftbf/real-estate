import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  GenerateDescriptionDto,
  PropertyDescriptionResponse,
} from './dto/generate-description.dto';
import { ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/jwt';
import { LlmService } from './llm.service';
import { User, UserRole } from '@/modules/users/entities/user.entity';
import { AuthUser } from '@/modules/auth/decorator/auth-user.decorator';

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
