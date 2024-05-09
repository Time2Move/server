import { BAD_REQUEST_ERROR, NOT_FOUND_ERROR } from '@common/util/Error';

export namespace CAR_ERROR {
  export const CAR_NOT_FOUND = NOT_FOUND_ERROR('CAR_NOT_FOUND');
  export const CAR_ALREADY_EXISTS = BAD_REQUEST_ERROR('CAR_ALREADY_EXISTS');
}
