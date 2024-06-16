import { DomainException } from '@/_ddd_shared/exceptions';
import { ExceptionType } from '@/_ddd_shared/types/exception.type';
import { DomainExceptionRes } from '@/_ddd_shared/types/response.type';
import * as codes from './car-error.codes';

export class CarException<
  C extends string,
  S extends number,
> extends DomainException<C, S> {}

// 이미 존재하는 차량 정보입니다.
export const CarAlreadyExists = CarException.create(
  codes.CAR_ALREADY_EXISTS,
  400,
);
export type CarAlreadyExistsType = ExceptionType<typeof CarAlreadyExists>;
export type CarAlreadyExistsErr = DomainExceptionRes<CarAlreadyExistsType>;

// 차량 정보를 찾을 수 없습니다.
export const CarNotFound = CarException.create(codes.CAR_NOT_FOUND, 404);
export type CarNotFoundType = ExceptionType<typeof CarNotFound>;
export type CarNotFoundErr = DomainExceptionRes<CarNotFoundType>;

export const CarOwnerCannotRent = CarException.create(
  codes.CAR_OWNER_CANNOT_RENT,
  400,
);
export type CarOwnerCannotRentType = ExceptionType<typeof CarOwnerCannotRent>;
export type CarOwnerCannotRentErr = DomainExceptionRes<CarOwnerCannotRentType>;
