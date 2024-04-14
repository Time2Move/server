import { PrismaService } from '@common/prisma/prisma.service';
import { PrismaTxType } from '@common/prisma/prisma.type';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { v4 } from 'uuid';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findUnique(where: Prisma.UserWhereUniqueInput, tx?: PrismaTxType) {
    return (tx ?? this.prismaService).user.findUnique({ where });
  }

  async create(data: Omit<Prisma.UserCreateInput, 'id'>, tx?: PrismaTxType) {
    return (tx ?? this.prismaService).user.create({
      data: { ...data, id: this.generagteId() },
    });
  }

  private generagteId() {
    return v4();
  }
}
