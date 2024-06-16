import { UserService } from '@/_ddd/user/domain/service/user.service';
import { PrismaTxType } from '@common/prisma/prisma.type';
import { Injectable } from '@nestjs/common';
import { UserAdaptorPort } from '../../domain/port/out/user.adaptor.port';

// TODO: 이벤트기반으로 변경
@Injectable()
export class UserAdaptor implements UserAdaptorPort {
  constructor(private readonly userService: UserService) {}
  async findByAccount(account: string, tx?: PrismaTxType) {
    return this.userService.findByAccount(account, tx);
  }
  async findByPhone(
    input: { phone: string; countryCode: string },
    tx?: PrismaTxType,
  ) {
    return this.userService.findByPhone(input, tx);
  }
}
