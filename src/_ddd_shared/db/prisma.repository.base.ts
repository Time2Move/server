import { PrismaService } from '@common/prisma/prisma.service';
import { PrismaTxType } from '@common/prisma/prisma.type';
import { AggregateRoot } from '../ddd/aggregate-root.base';

export abstract class PrismaRepositoryBase<T extends AggregateRoot<any>> {
  constructor(protected readonly prisma: PrismaService) {}
  protected excute<T>(
    action: (prisma: PrismaService | PrismaTxType) => Promise<T>,
    tx?: PrismaTxType,
  ) {
    return tx ? action(tx) : action(this.prisma);
  }

  abstract save(aggregate: T, tx?: PrismaTxType): Promise<T>;
}
