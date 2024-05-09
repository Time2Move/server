import { BAD_REQUEST_ERROR, NOT_FOUND_ERROR } from '@common/util/Error';

export namespace RENTAL_ERROR {
  export const RENTAL_NOT_FOUND = NOT_FOUND_ERROR('RENTAL_NOT_FOUND');
  export const RENTAL_ALREADY_EXISTS = BAD_REQUEST_ERROR(
    'RENTAL_ALREADY_EXISTS',
  );
}
