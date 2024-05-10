import typia from 'typia';

export const Guard = {
  isEmpty: (value: unknown): value is null | undefined | '' => {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return true;
      }
      if (value.every((item) => Guard.isEmpty(item))) {
        return true;
      }
    }
    if (value instanceof Object) {
      if (Object.keys(value).length === 0) {
        return true;
      }
    }
    return typia.is<null | undefined | '' | 0 | false>(value);
  },
  /**
   * Checks length range of a provided number/string/array
   */
  lengthIsBetween(
    value: number | string | Array<unknown>,
    minim: number,
    max: number,
  ): boolean {
    if (Guard.isEmpty(value)) {
      throw new Error(
        'Cannot check length of a value. Provided value is empty',
      );
    }
    const valueLength =
      typeof value === 'number'
        ? Number(value).toString().length
        : value.length;
    if (valueLength >= minim && valueLength <= max) {
      return true;
    }
    return false;
  },
};
