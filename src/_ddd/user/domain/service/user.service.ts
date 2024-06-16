import { UserEntity } from '@/_ddd/user/domain/entity/user.root-entity';
import { UserRepository } from '@/_ddd/user/infrastructure/repository/user.repository';
import { PrismaTxType } from '@common/prisma/prisma.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async findByAccount(account: string, tx?: PrismaTxType) {
    const user = await this.userRepository.findByAccount(account, tx);
    if (!user) return null;
    const phone = user.getProps().phone.unpack();
    const accout = user.getProps().account.unpack();
    const { nickname } = user.getProps();
    return {
      id: user.id,
      ...phone,
      ...accout,
      nickname,
    };
  }

  async findByPhone(
    input: { phone: string; countryCode: string },
    tx?: PrismaTxType,
  ) {
    const user = await this.userRepository.findByPhone(input, tx);
    if (!user) return null;
    const phone = user.getProps().phone.unpack();
    const accout = user.getProps().account.unpack();
    const { nickname } = user.getProps();
    return {
      id: user.id,
      ...phone,
      ...accout,
      nickname,
    };
  }

  private mapUser(user: UserEntity) {
    const userProps = user.getProps();
    const phone = userProps.phone.unpack();
    const accout = userProps.account.unpack();
    const { nickname } = userProps;
    return {
      id: user.id,
      ...phone,
      ...accout,
      nickname,
    };
  }
}
