import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';
import { Base } from '@type/index';

export const isError = (
  error: any,
): error is Base.ERROR<string, ErrorHttpStatusCode> => {
  return error?.is_success === false;
};

export const throwError = (err: Base.ERROR<string, ErrorHttpStatusCode>) => {
  throw new HttpException(err, err.status);
};

export class ERROR<E extends string, T extends ErrorHttpStatusCode>
  extends Error
  implements Base.ERROR<string, T>
{
  readonly isSuccess = false;
  readonly message: string;
  readonly status: T;
  readonly error: E;
  constructor(message: string = 'FAIL', status: T, error: E) {
    super(message);
    this.message = message;
    this.status = status;
    this.error = error;
  }
  excute() {
    throw new HttpException(this, this.status);
  }

  static generate<E extends string, T extends ErrorHttpStatusCode>(
    error: E,
    status: T,
  ) {
    return (message?: string) => new ERROR(message, status, error);
  }
}
export function createErrorGenerator<T extends ErrorHttpStatusCode>(
  statusCode: T,
) {
  return <E extends string>(errorType: E) =>
    (message?: string) =>
      ERROR.generate<E, T>(errorType, statusCode)(message);
}

//400
export const BAD_REQUEST_ERROR = createErrorGenerator(HttpStatus.BAD_REQUEST);
//401
export const UNAUTHORIZED_ERROR = createErrorGenerator(HttpStatus.UNAUTHORIZED);
//403
export const FORBIDDEN_ERROR = createErrorGenerator(HttpStatus.FORBIDDEN);
//404
export const NOT_FOUND_ERROR = createErrorGenerator(HttpStatus.NOT_FOUND);
//409
export const CONFLICT_ERROR = createErrorGenerator(HttpStatus.CONFLICT);

//500
export const INTERNAL_SERVER_ERROR = createErrorGenerator(
  HttpStatus.INTERNAL_SERVER_ERROR,
);
//503
export const SERVICE_UNAVAILABLE_ERROR = createErrorGenerator(
  HttpStatus.SERVICE_UNAVAILABLE,
);
