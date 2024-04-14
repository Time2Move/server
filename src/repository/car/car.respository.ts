import { PrismaService } from '@common/prisma/prisma.service';
import { PrismaTxType } from '@common/prisma/prisma.type';
import { Injectable } from '@nestjs/common';
import { Car, Prisma } from '@prisma/client';
import { v4 } from 'uuid';

@Injectable()
export class CarRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: Omit<Prisma.CarUncheckedCreateInput, 'id'>,
    tx?: PrismaTxType,
  ) {
    return (tx ?? this.prismaService).car.create({
      data: { ...data, id: v4() },
    });
  }

  async findOne(
    where: Prisma.CarWhereInput,
    tx?: PrismaTxType,
  ): Promise<Car | null> {
    return (tx ?? this.prismaService).car.findFirst({ where });
  }

  async update(
    where: Prisma.CarWhereUniqueInput,
    data: Omit<Prisma.CarUpdateInput, 'id' | 'createdAt'>,
    tx?: PrismaTxType,
  ) {
    return (tx ?? this.prismaService).car.update({ where, data });
  }
}
