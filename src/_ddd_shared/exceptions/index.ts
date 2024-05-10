import {
  BadRequestException,
  ConflictException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorResponse } from '../types/response.type';
import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
  ArgumentOutOfRangeException,
  DomainException,
} from './exception';

export * from './exception';
export * from './exception.base';
export * from './exception.codes';

const err = (error: any): ErrorResponse => {
  return {
    message: error.message,
    isSuccess: false,
    code: error.code,
    cause: error?.cause,
  };
};

export function handleException<T extends Error>(error: T): T {
  if (error instanceof DomainException) {
    throw new HttpException(err(error), error.status);
  }
  if (error instanceof ArgumentInvalidException) {
    throw new BadRequestException(err(error));
  }
  if (error instanceof ArgumentNotProvidedException) {
    throw new BadRequestException(err(error));
  }
  if (error instanceof ArgumentOutOfRangeException) {
    throw new BadRequestException(err(error));
  }
  if (error instanceof ConflictException) {
    throw new ConflictException(err(error));
  }
  if (error instanceof NotFoundException) {
    throw new NotFoundException(err(error));
  }
  if (error instanceof InternalServerErrorException) {
    throw new InternalServerErrorException(err(error));
  }

  throw error;
}
