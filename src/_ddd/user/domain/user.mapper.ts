import { Mapper } from '@/_ddd_shared/ddd/mapper.interface';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserEntity } from './entity/user.root-entity';
import { UserProps } from './type/user.props';
import { Account } from './value-object/account.value-object';
import { Phone } from './value-object/phone.value-object';

@Injectable()
export class UserMapper implements Mapper<UserEntity> {
  toPersistence(entity: UserEntity): {
    create: Prisma.UserCreateInput;
    update: Prisma.UserUpdateInput;
  } {
    const user = entity.getProps();
    const accountInput = user.account.unpack();
    const phoneInput = user.phone.unpack();
    const snapshots = user.snapshots.map((snapshot) => {
      const sn = snapshot.unpack();
      const { id, nickname } = sn;
      const phone = sn.phone;
      const account = sn.account;
      return {
        id,
        nickname,
        ...phone,
        ...account,
      };
    });
    const create: Prisma.UserCreateInput = {
      id: user.id,
      nickname: user.nickname,
      ...accountInput,
      ...phoneInput,
      snapshots: {
        createMany: {
          data: snapshots,
        },
      },
    };

    const update: Prisma.UserUpdateInput = {
      nickname: user.nickname,
      ...phoneInput,
      snapshots: {
        createMany: {
          data: snapshots,
        },
      },
    };

    return { create, update };
  }

  toDomain(record: User): UserEntity {
    const account = new Account({
      account: record.account,
      password: record.password,
    });
    const phone = new Phone({
      phone: record.phone,
      countryCode: record.countryCode,
    });
    const props: UserProps = {
      id: record.id,
      nickname: record.nickname,
      account,
      phone,
      snapshots: [],
    };
    const user = new UserEntity({
      id: record.id,
      props,
    });

    return user;
  }
  toResponse(entity: any): any {
    return entity;
  }
}
