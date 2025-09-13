import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const allowedOrigins = [
  'https://real-estate-six-tawny-67.vercel.app',
  'https://real-estate.marcingarski.com',
];

export const isOriginAllowed = (origin?: string): boolean => {
  if (!origin) return true;

  return (
    allowedOrigins.includes(origin) ||
    origin.includes('vercel.app') ||
    origin.includes('localhost')
  );
};

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
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
};
