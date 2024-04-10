import { PrismaService } from '@common/prisma/prisma.service';
import { PrismaTxType } from '@common/prisma/prisma.type';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { User } from '@type/user';
import { UserRepository } from '../../repository/user.repository';
import { UserSnapshotService } from './user.snapshot.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userRepository: UserRepository,
    private readonly userSnapshotService: UserSnapshotService,
  ) {}

  async checkUserExists(
    where: Prisma.UserWhereUniqueInput,
    tx?: PrismaTxType,
  ): Promise<boolean> {
    const user = await this.userRepository.findUnique(where, tx);
    return !!user;
  }

  async findUser(
    where: Prisma.UserWhereUniqueInput,
    tx?: PrismaTxType,
  ): Promise<User | null> {
    return this.userRepository.findUnique(where, tx);
  }

  async createUser(
    data: Omit<Prisma.UserCreateInput, 'id'>,
    tx?: PrismaTxType,
  ) {
    const user = await this.userRepository.create(data, tx);
    await this.userSnapshotService.create(user, tx);
    return user;
  }
}
