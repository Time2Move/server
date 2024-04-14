import { PrismaService } from '@common/prisma/prisma.service';
import { PrismaTxType } from '@common/prisma/prisma.type';
import { Injectable } from '@nestjs/common';
import { CERTIFICATION_STATUS, Prisma } from '@prisma/client';
import { v4 } from 'uuid';

@Injectable()
export class CertificationCodeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    input: Omit<Prisma.CertificationCodeCreateInput, 'id'>,
    tx?: PrismaTxType,
  ) {
    return (tx ?? this.prismaService).certificationCode.create({
      data: { ...input, id: this.generateId() },
    });
  }

  async findMany(where: Prisma.CertificationCodeWhereInput, tx?: PrismaTxType) {
    return (tx ?? this.prismaService).certificationCode.findMany({
      where,
    });
  }

  async findOne(where: Prisma.CertificationCodeWhereInput, tx?: PrismaTxType) {
    return (tx ?? this.prismaService).certificationCode.findFirst({
      where,
    });
  }

  async updateManyStatus(
    where: Prisma.CertificationCodeWhereInput,
    status: CERTIFICATION_STATUS,
    tx?: PrismaTxType,
  ) {
    return (tx ?? this.prismaService).certificationCode.updateMany({
      where: where,
      data: {
        status,
      },
    });
  }

  generateId() {
    return v4();
  }
}
