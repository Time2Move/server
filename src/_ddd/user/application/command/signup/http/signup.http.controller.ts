import {
  UserCertificationCodeInvalidType,
  UserNicknameExistType,
} from '@/_ddd/user/domain/error';
import { handleException } from '@/_ddd_shared/exceptions';
import { Result, match } from '@/_ddd_shared/types';
import { res } from '@/_ddd_shared/ui/response-base';
import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignupCommand } from '../signup.command';
import { SignupHttpReq } from './signup.req-type';

@Controller('signup')
export class SignupHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TypedRoute.Post()
  async signup(@TypedBody() dto: SignupHttpReq) {
    const input = dto.type === 'LOCAL' ? { local: dto } : { oauth: dto };
    const command = new SignupCommand(input);
    const result: Result<
      'success',
      UserNicknameExistType | UserCertificationCodeInvalidType
    > = await this.commandBus.execute(command);
    return match(result, {
      Ok: (s) => res(s),
      Err: handleException,
    });
  }
}
