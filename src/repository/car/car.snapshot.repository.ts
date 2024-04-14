import { PrismaService } from '@common/prisma/prisma.service';
import { PrismaTxType } from '@common/prisma/prisma.type';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { v4 } from 'uuid';

@Injectable()
export class CarSnapshotRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: Prisma.CarSnapshotUncheckedCreateInput,
    tx?: PrismaTxType,
  ) {
    const { id } = data;
    return (tx ?? this.prismaService).carSnapshot.create({
      data: {
        ...data,
        carId: id,
        id: v4(),
      },
    });
  }
}
