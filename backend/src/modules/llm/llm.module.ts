import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { LlmController } from './for-landlord/llm.controller';
import { LlmService } from './for-landlord/llm.service';

@Module({
  imports: [ConfigModule],
  controllers: [LlmController],
  providers: [
    LlmService,
    {
      provide: GoogleGenerativeAI,
      useFactory: (configService: ConfigService) => {
        const apiKey = configService.get<string>('GEMINI_API_KEY');
        if (!apiKey) {
          throw new Error('GEMINI_API_KEY is required but not provided');
        }
        return new GoogleGenerativeAI(apiKey);
      },
      inject: [ConfigService],
    },
    {
      provide: Logger,
      useFactory: () => {
        return new Logger(LlmService.name);
      },
    },
  ],
  exports: [LlmService],
})
export class LlmModule {}
