import { AuthAccountInvalidExceptionType } from '@/_ddd/auth/domain/error';
import { LoginSuccess } from '@/_ddd/auth/domain/port/in/login.use-case';
import { handleException } from '@/_ddd_shared/exceptions';
import { Result, match } from '@/_ddd_shared/types';
import { Response } from '@/_ddd_shared/types/response.type';
import { res } from '@/_ddd_shared/ui/response-base';
import { TypedBody, TypedHeaders, TypedRoute } from '@nestia/core';
import { Controller, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response as ExpressResponse } from 'express';
import { LoginCommand } from '../login.command';
import { LoginHttpReq } from './login.http-req.type';
import { LoginHttpRes } from './login.http-res.type';

@Controller('/login')
export class LoginHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TypedRoute.Post('')
  async login(
    @TypedBody() dto: LoginHttpReq,
    @TypedHeaders() headers: { 'x-app'?: 'app' | 'web' },
    @Res({ passthrough: true }) response: ExpressResponse,
  ): Promise<Response<LoginHttpRes> | AuthAccountInvalidExceptionType> {
    const commadInput = dto.type === 'LOCAL' ? { local: dto } : { oauth: dto };
    const result: Result<LoginSuccess, AuthAccountInvalidExceptionType> =
      await this.commandBus.execute(new LoginCommand(commadInput));

    const isApp = headers['x-app'] === 'app';

    !isApp && response.cookie('_r', result.unwrap().refreshToken);

    return match(result, {
      Ok: ({ user, accessToken, refreshToken }) =>
        res({
          user,
          accessToken,
          refreshToken: isApp ? refreshToken : undefined,
        }),
      Err: handleException,
    });
  }
}
