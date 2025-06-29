import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.getOrThrow('DATABASE_URL'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        retryAttempts: 3,
        synchronize: false,
        migrationsRun: true,
        ssl:
          process.env.CI === 'true'
            ? false
            : {
                rejectUnauthorized: false,
              },
        logging: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
