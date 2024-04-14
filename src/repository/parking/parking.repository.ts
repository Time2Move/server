import { PrismaService } from '@common/prisma/prisma.service';
import { PrismaTxType } from '@common/prisma/prisma.type';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ParkingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.ParkingUncheckedCreateInput, tx?: PrismaTxType) {
    return (tx ?? this.prismaService).parking.create({ data });
  }
}
