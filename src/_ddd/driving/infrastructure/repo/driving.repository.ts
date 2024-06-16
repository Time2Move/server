import { PrismaRepositoryBase } from '@/_ddd_shared/db/prisma.repository.base';
import { PrismaService } from '@common/prisma/prisma.service';
import { PrismaTxType } from '@common/prisma/prisma.type';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DrivingMapper } from '../../domain/driving.mapper';
import { DrivingEntity } from '../../domain/entity/driving.root-entity';

@Injectable()
export class DrivingRepository extends PrismaRepositoryBase<DrivingEntity> {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly drivingMapper: DrivingMapper,
  ) {
    super(prisma);
  }

  private includes = {
    snapshots: true,
    parkings: {
      include: {
        snapshots: true,
      },
    },
  } satisfies Prisma.DrivingInclude;

  async save(
    aggregate: DrivingEntity,
    tx?: PrismaTxType,
  ): Promise<DrivingEntity> {
    const { create, update } = this.drivingMapper.toPersistence(aggregate);
    await this.excute((prisma) => {
      return prisma.driving.upsert({
        where: {
          id: aggregate.id,
        },
        update,
        create,
      });
    }, tx);
    return aggregate;
  }

  async findById(id: string): Promise<DrivingEntity | null> {
    const record = await this.prisma.driving.findUnique({
      where: { id },
      include: this.includes,
    });
    return record ? this.drivingMapper.toDomain(record) : null;
  }
}
