import { PrismaService } from '@common/prisma/prisma.service';
import { PrismaTxType } from '@common/prisma/prisma.type';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async checkUserExists(
    where: Prisma.UserWhereUniqueInput,
    tx?: PrismaTxType,
  ): Promise<boolean> {
    const user = await (tx ?? this.prisma).user.findUnique({ where });
    return !!user;
  }
}
