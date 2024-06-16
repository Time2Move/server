import { DomainException } from '@/_ddd_shared/exceptions';
import { ExceptionType } from '@/_ddd_shared/types/exception.type';
import { DomainExceptionRes } from '@/_ddd_shared/types/response.type';
import * as codes from './exception.codes';

export class AuthExction<
  E extends string,
  S extends number,
> extends DomainException<E, S> {}

// 잘못된 계정 - 존재하지 않는 계정
export const AuthAccountInvalidException = AuthExction.create(
  codes.AUTH_ACCOUNT_INVALID,
  400,
);
export type AuthAccountInvalidExceptionType = ExceptionType<
  typeof AuthAccountInvalidException
>;
export type AuthAccountInvalidExceptionRes =
  DomainExceptionRes<AuthAccountInvalidExceptionType>;

// 비밀번호 틀림
export const AuthPasswordInvalidException = AuthExction.create(
  codes.AUTH_PASSWORD_INVALID,
  400,
);
export type AuthPasswordInvalidExceptionType = ExceptionType<
  typeof AuthPasswordInvalidException
>;
export type AuthPasswordInvalidExceptionRes =
  DomainExceptionRes<AuthPasswordInvalidExceptionType>;

// JWT fail
export const AuthJwtFailException = AuthExction.create(
  codes.AUTH_JWT_FAIL,
  400,
);
export type AuthJwtFailExceptionType = ExceptionType<
  typeof AuthJwtFailException
>;
export type AuthJwtFailExceptionRes =
  DomainExceptionRes<AuthJwtFailExceptionType>;

// JWT INVALID
export const AuthJwtInvalidException = AuthExction.create(
  codes.AUTH_JWT_INVALID,
  401,
);
export type AuthJwtInvalidExceptionType = ExceptionType<
  typeof AuthJwtInvalidException
>;
export type AuthJwtInvalidExceptionRes =
  DomainExceptionRes<AuthJwtInvalidExceptionType>;
