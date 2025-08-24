import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

let app: INestApplication;

async function bootstrap(): Promise<INestApplication> {
  if (!app) {
    app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log'],
    });
    app.enableCors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        const allowedOrigins = [
          'https://real-estate-six-tawny-67.vercel.app',
          'https://real-estate.marcingarski.com'
        ];

        const isAllowed =
          allowedOrigins.includes(origin) ||
          origin.includes('vercel.app') ||
          origin.includes('localhost');

        if (isAllowed) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'X-Requested-With',
        'x-requested-with',
      ],
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: 200,
    });
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  }
  return app;
}

export default async (req, res) => {
  try {
    const origin = req.headers.origin;
    const allowedOrigins = [
      'https://real-estate-six-tawny-67.vercel.app',
      'https://real-estate.marcingarski.com'
    ];

    const isAllowed =
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.includes('vercel.app') ||
      origin.includes('localhost');

    if (isAllowed && origin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    } else if (!origin) {
      res.setHeader('Access-Control-Allow-Origin', '*');
    }

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type,Authorization,Accept,X-Requested-With,x-requested-with',
    );
    res.setHeader('Access-Control-Max-Age', '86400');

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
