import { Result } from '@/_ddd_shared/types/result.type';

export abstract class Query {}

export interface IQueryHandler<Q extends Query, ReturnType> {
  execute(query: Q): Promise<Result<ReturnType, Error>>;
}
