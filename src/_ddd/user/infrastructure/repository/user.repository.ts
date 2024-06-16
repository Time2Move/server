import { PrismaRepositoryBase } from '@/_ddd_shared/db/prisma.repository.base';
import { PrismaService } from '@common/prisma/prisma.service';
import { PrismaTxType } from '@common/prisma/prisma.type';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../domain/entity/user.root-entity';
import { UserMapper } from '../../domain/user.mapper';

@Injectable()
export class UserRepository extends PrismaRepositoryBase<UserEntity> {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly userMapper: UserMapper,
  ) {
    super(prisma);
  }
  async save(userEntity: UserEntity, tx?: PrismaTxType): Promise<UserEntity> {
    const check = userEntity.isChanged();
    if (check) {
      userEntity.addSnapshot();
    }
    const { create, update } = this.userMapper.toPersistence(userEntity);
    await this.excute(async (prisma) => {
      return await prisma.user.upsert({
        where: { id: userEntity.id },
        update: update,
        create: create,
      });
    }, tx);
    return userEntity;
  }

  async findByAccount(
    account: string,
    tx?: PrismaTxType,
  ): Promise<UserEntity | null> {
    return await this.excute(async (prisma) => {
      const record = await prisma.user.findUnique({ where: { account } });
      return record ? this.userMapper.toDomain(record) : null;
    }, tx);
  }

  async findByPhone(
    phone: { countryCode: string; phone: string },
    tx?: PrismaTxType,
  ): Promise<UserEntity | null> {
    return await this.excute(async (prisma) => {
      const record = await prisma.user.findUnique({
        where: {
          countryCode: phone.countryCode,
          phone: phone.phone,
        },
      });
      return record ? this.userMapper.toDomain(record) : null;
    }, tx);
  }

  async findByNickname(
    nickname: string,
    tx?: PrismaTxType,
  ): Promise<UserEntity | null> {
    return await this.excute(async (prisma) => {
      const record = await prisma.user.findUnique({ where: { nickname } });
      return record ? this.userMapper.toDomain(record) : null;
    }, tx);
  }
}
