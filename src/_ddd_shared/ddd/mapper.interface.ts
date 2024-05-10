import { Entity } from './entity.base';

export interface Mapper<
  DomainEntity extends Entity<any>,
  DbRecord = any,
  Response = any,
> {
  toPersistence(entity: DomainEntity): any;
  toDomain(record: DbRecord): DomainEntity;
  toResponse(entity: DomainEntity): Response;
}
