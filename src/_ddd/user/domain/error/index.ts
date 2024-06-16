import { DomainException } from '@/_ddd_shared/exceptions';
import { ExceptionType } from '@/_ddd_shared/types/exception.type';
import { DomainExceptionRes } from '@/_ddd_shared/types/response.type';
import * as codes from './user-error.codes';

export class UserException<
  C extends string,
  S extends number,
> extends DomainException<C, S> {}

// 유저가 존재하지 않습니다.
export const UserNotFound = UserException.create(codes.USER_NOT_FOUND, 404);
export type UserNotFoundType = ExceptionType<typeof UserNotFound>;
export type UserNotFoundRes = DomainExceptionRes<UserNotFoundType>;

// 유저 폰 번호 중복
export const UserPhoneExist = UserException.create(codes.USER_PHONE_EXIST, 400);
export type UserPhoneExistType = ExceptionType<typeof UserPhoneExist>;
export type UserPhoneExistRes = DomainExceptionRes<UserPhoneExistType>;

// 계정 중복
export const UserAccountExist = UserException.create(
  codes.USER_ACCOUNT_EXIST,
  400,
);
export type UserAccountExistType = ExceptionType<typeof UserAccountExist>;
export type UserAccountExistRes = DomainExceptionRes<UserAccountExistType>;

// 닉네임 중복
export const UserNicknameExist = UserException.create(
  codes.USER_NICKNAME_EXIST,
  400,
);
export type UserNicknameExistType = ExceptionType<typeof UserNicknameExist>;
export type UserNicknameExistRes = DomainExceptionRes<UserNicknameExistType>;

// 비밀번호 불일치
export const UserPasswordInvailid = UserException.create(
  codes.USER_PASSWORD_INVALID,
  400,
);
export type UserPasswordInvailidType = ExceptionType<
  typeof UserPasswordInvailid
>;
export type UserPasswordInvailidRes =
  DomainExceptionRes<UserPasswordInvailidType>;

// 인증번호 invailid
export const UserCertificationCodeInvalid = UserException.create(
  codes.USER_CERTIFICATION_CODE_INVALID,
  400,
);
export type UserCertificationCodeInvalidType = ExceptionType<
  typeof UserCertificationCodeInvalid
>;
export type UserCertificationCodeInvalidRes =
  DomainExceptionRes<UserCertificationCodeInvalidType>;
