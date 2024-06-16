import { PrismaRepositoryBase } from '@/_ddd_shared/db/prisma.repository.base';
import { PrismaService } from '@common/prisma/prisma.service';
import { PrismaTxType } from '@common/prisma/prisma.type';
import { Injectable } from '@nestjs/common';
import { CAR_STATUS } from '@prisma/client';
import { CarMapper } from '../car.mapper';
import { CarEntity } from '../domain/entity/car.root-entity';

@Injectable()
export class CarRepository extends PrismaRepositoryBase<CarEntity> {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly carMapper: CarMapper,
  ) {
    super(prisma);
  }

  async save(car: CarEntity, tx?: PrismaTxType): Promise<CarEntity> {
    const { create, update } = this.carMapper.toPersistence(car);
    await this.excute(async (prisma) => {
      await prisma.car.upsert({
        where: { id: car.id },
        update,
        create,
      });
    }, tx);
    return car;
  }

  async findById(id: string, tx?: PrismaTxType): Promise<CarEntity | null> {
    return await this.excute(async (prisma) => {
      const car = await prisma.car.findUnique({
        where: { id },
        include: {
          snapshots: true,
          rentals: {
            include: {
              snapshots: true,
            },
          },
        },
      });
      return car ? this.carMapper.toDomain(car) : null;
    }, tx);
  }
  async findByNumberAndStatus(
    number: string,
    status: CAR_STATUS,
    tx?: PrismaTxType,
  ): Promise<CarEntity | null> {
    return await this.excute(async (prisma) => {
      const car = await prisma.car.findFirst({
        where: { number, status },
        include: {
          snapshots: true,
          rentals: {
            include: {
              snapshots: true,
            },
          },
        },
      });
      return car ? this.carMapper.toDomain(car) : null;
    }, tx);
  }
}
