import { Result } from '@/_ddd_shared/types/result.type';
import { Query } from './query-handler.interface';

export const QUERY_BUS = Symbol('QueryBus');

export interface QueryBusPort {
  execute<Q extends Query, ReturnType>(
    command: Q,
  ): Promise<Result<ReturnType, Error>>;
}
