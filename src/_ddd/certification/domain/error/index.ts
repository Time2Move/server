import { DomainException } from '@/_ddd_shared/exceptions';
import { ExceptionType } from '@/_ddd_shared/types/exception.type';
import { DomainExceptionRes } from '@/_ddd_shared/types/response.type';
import * as code from './exception.codes';

export class CertificationException<
  T extends string,
  S extends number,
> extends DomainException<T, S> {}

// 하루인증 제한횟수 초과
export const CertificationLimitExceeded = CertificationException.create(
  code.CERTIFICATION_LIMIT_EXCEEDED,
  400,
);
export type CertificationLimitExceededType = ExceptionType<
  typeof CertificationLimitExceeded
>;
export type CertificationLimitExceededRes =
  DomainExceptionRes<CertificationLimitExceededType>;

// 코드 존재 안함
export const CertificationCodeNotFound = CertificationException.create(
  code.CERTIFICATION_CODE_NOT_FOUND,
  404,
);
export type CertificationCodeNotFoundType = ExceptionType<
  typeof CertificationCodeNotFound
>;
export type CertificationCodeNotFoundRes =
  DomainExceptionRes<CertificationCodeNotFoundType>;

// 코드 만료
export const CertificationCodeExpired = CertificationException.create(
  code.CERTIFICATION_CODE_EXPIRED,
  400,
);
export type CertificationCodeExpiredType = ExceptionType<
  typeof CertificationCodeExpired
>;
export type CertificationCodeExpiredRes =
  DomainExceptionRes<CertificationCodeExpiredType>;

// 이미 인증 완료
export const CertificationCodeAlreadyVerified = CertificationException.create(
  code.CERTIFICATION_CODE_ALREADY_VERIFIED,
  400,
);
export type CertificationCodeAlreadyVerifiedType = ExceptionType<
  typeof CertificationCodeAlreadyVerified
>;
export type CertificationCodeAlreadyVerifiedRes =
  DomainExceptionRes<CertificationCodeAlreadyVerifiedType>;

// 인증 안됨
export const CertificationCodeNotVerified = CertificationException.create(
  code.CERTIFICATION_CODE_NOT_VERIFIED,
  400,
);
export type CertificationCodeNotVerifiedType = ExceptionType<
  typeof CertificationCodeNotVerified
>;
export type CertificationCodeNotVerifiedRes =
  DomainExceptionRes<CertificationCodeNotVerifiedType>;
