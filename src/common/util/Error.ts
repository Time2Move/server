import { HttpException } from '@nestjs/common';
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
