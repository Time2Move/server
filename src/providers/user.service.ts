import { PrismaService } from '@common/prisma/prisma.service';
import { PrismaTxType } from '@common/prisma/prisma.type';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserRepository } from './../repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userRepository: UserRepository,
  ) {}

  async checkUserExists(
    where: Prisma.UserWhereUniqueInput,
    tx?: PrismaTxType,
  ): Promise<boolean> {
    const user = this.userRepository.checkUserExists(where, tx);
    return !!user;
  }
}
