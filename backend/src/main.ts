import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

let app: INestApplication;

async function bootstrap(): Promise<INestApplication> {
  if (!app) {
    app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log'],
    });
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  }
  return app;
}

export default async (req, res) => {
  const app = await bootstrap();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const server = app.getHttpAdapter().getInstance();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return server(req, res);
};
