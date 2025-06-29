import { Logger } from '@nestjs/common';

const originalLog = console.log;
const originalError = console.error;

console.error = (...args: any[]) => {
  if (
    args[0] &&
    typeof args[0] === 'string' &&
    (args[0].includes('query failed:') ||
      args[0].includes('error: error:') ||
      args[0].includes('SELECT') ||
      args[0].includes('invalid input syntax'))
  ) {
    return;
  }
  originalError.apply(console, args);
};

Logger.overrideLogger(false);

jest.setTimeout(30_000);

process.env.NODE_NO_WARNINGS = '1';
