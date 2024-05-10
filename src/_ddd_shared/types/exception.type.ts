import { DomainException } from '../exceptions';

export type ExceptionType<
  T extends (...args: any) => DomainException<any, any>,
> = ReturnType<T>;
