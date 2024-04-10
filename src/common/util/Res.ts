import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';
import { Base } from '@type/index';
import { Either } from './Either';
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
  if (either.left) {
    return throwError(either.left);
  }
  if (either.right) {
    return generateResponse(either.right);
  }
  throw new Error('Either is not defined');
};
