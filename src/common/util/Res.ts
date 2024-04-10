import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';
import { Base } from '@type/index';
import { Either, isLeft } from './Either';
import { throwError } from './Error';

export const generateResponse = <T>(data: T): Base.SUCCESS<T> => {
  return {
    isSuccess: true,
    result: data,
    message: 'SUCCESS',
  };
};

export const eitherToResponse = <
  E extends Base.ERROR<string, ErrorHttpStatusCode>,
  T,
>(
  either: Either<E, T>,
): Base.SUCCESS<T> | E => {
  if (isLeft(either)) {
    return throwError(either.value);
  }
  return generateResponse(either.value);
};
