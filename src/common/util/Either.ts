import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';
import { Base } from '@type/index';

export type Either<L extends Base.ERROR<string, ErrorHttpStatusCode>, R> =
  | Left<L>
  | Right<R>;
export class Left<T extends Base.ERROR<string, ErrorHttpStatusCode>> {
  readonly error: T;
  constructor(error: T) {
    this.error = error;
  }
  isLeft(): this is Left<T> {
    return true;
  }
  isRight(): this is Right<never> {
    return false;
  }
  static create<U extends Base.ERROR<string, ErrorHttpStatusCode>>(
    error: U,
  ): Left<U> {
    return new Left(error);
  }
  static of<T extends Base.ERROR<string, ErrorHttpStatusCode>>(
    error: T,
  ): Left<T> {
    return new Left(error);
  }
}
export class Right<T> {
  readonly value: T;
  constructor(value: T) {
    this.value = value;
  }
  isLeft(): this is Left<never> {
    return false;
  }
  isRight(): this is Right<T> {
    return true;
  }
  static create<U>(value: U): Right<U> {
    return new Right(value);
  }
  static of<T>(value: T): Right<T> {
    return new Right(value);
  }
  getOrElse(): T {
    return this.value;
  }
}
