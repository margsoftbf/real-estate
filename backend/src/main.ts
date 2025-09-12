import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { corsConfig } from './config/cors.config';

let app: INestApplication;

async function bootstrap(): Promise<INestApplication> {
  if (!app) {
    app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log'],
    });

    app.enableCors(corsConfig);
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  }
  return app;
}

// eslint-disable-next-line unicorn/no-anonymous-default-export
export default async (req, res) => {
  try {
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    const app = await bootstrap();
    const expressApp = app.getHttpAdapter().getInstance();

    return expressApp(req, res);
  } catch (error) {
    console.error('Error in serverless function:', error);
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};
