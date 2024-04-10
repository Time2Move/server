import { PrismaService } from '@common/prisma/prisma.service';
import { PrismaTxType } from '@common/prisma/prisma.type';
import { Injectable } from '@nestjs/common';
import { User } from '@type/user';

import { v4 } from 'uuid';

@Injectable()
export class UserSnapshotService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(user: User, tx?: PrismaTxType) {
    const { id: userId, deletedAt: _, updatedAt: __, ...rest } = user;
    const snapshot = await (tx ?? this.prismaService).userSnapshot.create({
      data: {
        ...rest,
        id: v4(),
        userId: userId,
      },
    });
    await (tx ?? this.prismaService).userLastSnapshot.upsert({
      where: {
        userId,
      },
      update: {
        snapshotId: snapshot.id,
      },
      create: {
        snapshotId: snapshot.id,
        userId,
      },
    });
    return snapshot;
  }
}
