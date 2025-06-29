import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionConstants } from './exceptions.constants';
import { IException } from './exception.interface';

export class BadRequestException extends HttpException {
  code: number;
  cause: Error;
  message: string;
  description: string;
  timestamp: string;
  traceId: string;

  constructor(exception: IException) {
    super(exception.message, HttpStatus.BAD_REQUEST, {
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

  static RESOURCE_NOT_FOUND = (msg?: string) => {
    return new BadRequestException({
      message: msg || 'Resource Not Found',
      code: ExceptionConstants.BadRequestCodes.RESOURCE_NOT_FOUND,
    });
  };

  static INVALID_INPUT = (msg?: string) => {
    return new BadRequestException({
      message: msg || 'Invalid Input',
      code: ExceptionConstants.BadRequestCodes.INVALID_INPUT,
    });
  };

  static USER_ALREADY_EXISTS = (msg?: string) => {
    return new BadRequestException({
      message: msg || 'User Already Exists',
      code: ExceptionConstants.BadRequestCodes.USER_ALREADY_EXISTS,
    });
  };

  static VALIDATION_ERROR = (msg?: string) => {
    return new BadRequestException({
      message: msg || 'Validation Error',
      code: ExceptionConstants.BadRequestCodes.VALIDATION_ERROR,
    });
  };

  static USER_ACCOUNT_DELETED = (msg?: string) => {
    return new BadRequestException({
      message: msg || 'Account with this email was previously deleted',
      code: ExceptionConstants.BadRequestCodes.USER_ACCOUNT_DELETED,
    });
  };

  static EXTERNAL_SERVICE_ERROR = (msg?: string) => {
    return new BadRequestException({
      message: msg || 'External Service Error',
      code: ExceptionConstants.BadRequestCodes.EXTERNAL_SERVICE_CALL_ERROR,
    });
  };
}
