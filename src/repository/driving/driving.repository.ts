import { PrismaService } from '@common/prisma/prisma.service';
import { PrismaTxType } from '@common/prisma/prisma.type';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class DrivingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.DrivingUncheckedCreateInput, tx?: PrismaTxType) {
    return (tx ?? this.prismaService).driving.create({ data });
  }
}
