import { HttpStatus } from '@nestjs/common';
import { Base } from '..';

export namespace AuthError {
  export type USER_ALREADY_EXISTS = Base.ERROR<
    'USER_ALREADY_EXISTS',
    HttpStatus.BAD_REQUEST
  >;

  export type AUTH_INVALID = Base.ERROR<
    'AUTH_INVALID',
    HttpStatus.UNAUTHORIZED
  >;

  export type OAUTH_NOT_SUPPORTED = Base.ERROR<
    'OAUTH_NOT_SUPPORTED',
    HttpStatus.BAD_REQUEST
  >;

  export type TOKEN_EXPIRED = Base.ERROR<
    'TOKEN_EXPIRED',
    HttpStatus.UNAUTHORIZED
  >;

  export type TOKEN_INVALID = Base.ERROR<
    'TOKEN_INVALID',
    HttpStatus.UNAUTHORIZED
  >;

  export type TOKEN_BLACKLISTED = Base.ERROR<
    'TOKEN_BLACKLISTED',
    HttpStatus.UNAUTHORIZED
  >;

  export type CERTIFICATION_NOT_SUPPORTED = Base.ERROR<
    'CERTIFICATION_NOT_SUPPORTED',
    HttpStatus.BAD_REQUEST
  >;

  export type CERTIFICATION_INVALID = Base.ERROR<
    'CERTIFICATION_INVALID',
    HttpStatus.BAD_REQUEST
  >;

  export type CERTIFICATION_EXPIRED = Base.ERROR<
    'CERTIFICATION_EXPIRED',
    HttpStatus.BAD_REQUEST
  >;

  export type CERTIFICATION_ALREADY_VERIFIED = Base.ERROR<
    'CERTIFICATION_ALREADY_VERIFIED',
    HttpStatus.BAD_REQUEST
  >;

  export type CERTIFICATION_LIMIT_EXCEEDED = Base.ERROR<
    'CERTIFICATION_LIMIT_EXCEEDED',
    HttpStatus.BAD_REQUEST
  >;

  export type CERTIFICATION_NOT_FOUND = Base.ERROR<
    'CERTIFICATION_NOT_FOUND',
    HttpStatus.BAD_REQUEST
  >;

  export type CERTIFICATION_FAILED = Base.ERROR<
    'CERTIFICATION_FAILED',
    HttpStatus.BAD_REQUEST
  >;

  export type TYPE_NOT_SUPPORTED = Base.ERROR<
    'TYPE_NOT_SUPPORTED',
    HttpStatus.BAD_REQUEST
  >;
}
