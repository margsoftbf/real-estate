export class ExceptionConstants {
  public static readonly BadRequestCodes = {
    MISSING_REQUIRED_PARAMETER: 10_001,
    INVALID_PARAMETER_VALUE: 10_002,
    UNSUPPORTED_PARAMETER: 10_003,
    INVALID_CONTENT_TYPE: 10_004,
    INVALID_REQUEST_BODY: 10_005,
    RESOURCE_ALREADY_EXISTS: 10_006,
    RESOURCE_NOT_FOUND: 10_007,
    REQUEST_TOO_LARGE: 10_008,
    REQUEST_ENTITY_TOO_LARGE: 10_009,
    REQUEST_URI_TOO_LONG: 10_010,
    UNSUPPORTED_MEDIA_TYPE: 10_011,
    METHOD_NOT_ALLOWED: 10_012,
    HTTP_REQUEST_TIMEOUT: 10_013,
    VALIDATION_ERROR: 10_014,
    UNEXPECTED_ERROR: 10_015,
    INVALID_INPUT: 10_016,
    EXTERNAL_SERVICE_CALL_ERROR: 10_017,
    USER_NOT_CONFIRMED: 10_018,
    USER_ALREADY_APPLIED_FOR_JOB: 10_019,
    USER_ALREADY_EXISTS: 10_020,
    USER_ALREADY_VERIFIED: 10_021,
    PASSWORD_POLICY_VIOLATION: 10_022,
    USER_ACCOUNT_DELETED: 10_023,
  };

  public static readonly UnauthorizedCodes = {
    UNAUTHORIZED_ACCESS: 20_001,
    INVALID_CREDENTIALS: 20_002,
    JSON_WEB_TOKEN_ERROR: 20_003,
    AUTHENTICATION_FAILED: 20_004,
    ACCESS_TOKEN_EXPIRED: 20_005,
    TOKEN_EXPIRED_ERROR: 20_006,
    UNEXPECTED_ERROR: 20_007,
    RESOURCE_NOT_FOUND: 20_008,
    USER_NOT_VERIFIED: 20_009,
    REQUIRED_RE_AUTHENTICATION: 20_010,
    INVALID_RESET_PASSWORD_TOKEN: 20_011,
    USER_DISABLED: 20_012,
  };

  public static readonly InternalServerErrorCodes = {
    INTERNAL_SERVER_ERROR: 30_001,
    DATABASE_ERROR: 30_002,
    NETWORK_ERROR: 30_003,
    THIRD_PARTY_SERVICE_ERROR: 30_004,
    SERVER_OVERLOAD: 30_005,
    UNEXPECTED_ERROR: 30_006,
  };

  public static readonly ForbiddenCodes = {
    FORBIDDEN: 40_001,
    MISSING_PERMISSIONS: 40_002,
    EXCEEDED_RATE_LIMIT: 40_003,
    RESOURCE_NOT_FOUND: 40_004,
    TEMPORARILY_UNAVAILABLE: 40_005,
  };
  public static readonly PropertyErrors = {
    propertyNotFound: {
      code: 50_001,
      message: 'Property not found',
    },
    unauthorizedPropertyAccess: {
      code: 50_002,
      message: 'You do not have access to this property',
    },
    propertyCreationFailed: {
      code: 50_003,
      message: 'Failed to create property',
    },
  };

  public static readonly AuthErrors = {
    userAlreadyExists: {
      code: 60_001,
      message: 'User with this email already exists',
    },
    invalidCredentials: {
      code: 60_002,
      message: 'Invalid email or password',
    },
    registrationFailed: {
      code: 60_003,
      message: 'Failed to register user',
    },
  };

  public static readonly UsersErrors = {
    userNotFound: {
      code: 70_001,
      message: 'User not found',
    },
    userProfileUpdateFailed: {
      code: 70_002,
      message: 'Failed to update user profile',
    },
    userInactive: {
      code: 70_003,
      message: 'User account is inactive',
    },
  };
}
