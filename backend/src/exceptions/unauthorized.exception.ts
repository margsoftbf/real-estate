import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionConstants } from './exceptions.constants';
import { IException } from './exception.interface';

export class UnauthorizedException extends HttpException {
  code: number;
  cause: Error;
  message: string;
  description: string;
  timestamp: string;
  traceId: string;

  constructor(exception: IException) {
    super(exception.message, HttpStatus.UNAUTHORIZED, {
      cause: exception.cause,
      description: exception.description,
    });

    this.message = exception.message;
    this.cause = exception.cause!;
    this.description = exception.description!;
    this.code = exception.code!;
    this.timestamp = new Date().toISOString();
  }

  setTraceId = (traceId: string) => {
    this.traceId = traceId;
  };

  static INVALID_CREDENTIALS = (msg?: string) => {
    return new UnauthorizedException({
      message: msg || 'Invalid credentials',
      code: ExceptionConstants.UnauthorizedCodes.INVALID_CREDENTIALS,
    });
  };

  static AUTHENTICATION_FAILED = (msg?: string) => {
    return new UnauthorizedException({
      message: msg || 'Authentication failed',
      code: ExceptionConstants.UnauthorizedCodes.AUTHENTICATION_FAILED,
    });
  };

  static UNAUTHORIZED_ACCESS = (msg?: string) => {
    return new UnauthorizedException({
      message: msg || 'Access to the requested resource is unauthorized',
      code: ExceptionConstants.UnauthorizedCodes.UNAUTHORIZED_ACCESS,
    });
  };

  static USER_NOT_VERIFIED = (msg?: string) => {
    return new UnauthorizedException({
      message: msg || 'User not verified. Please complete verification process',
      code: ExceptionConstants.UnauthorizedCodes.USER_NOT_VERIFIED,
    });
  };

  static TOKEN_EXPIRED_ERROR = (msg?: string) => {
    return new UnauthorizedException({
      message: msg || 'The authentication token provided has expired',
      code: ExceptionConstants.UnauthorizedCodes.TOKEN_EXPIRED_ERROR,
    });
  };
}
