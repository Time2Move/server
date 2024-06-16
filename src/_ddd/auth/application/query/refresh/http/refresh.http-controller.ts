import {
  AuthJwtFailExceptionType,
  AuthJwtInvalidExceptionType,
} from '@/_ddd/auth/domain/error';
import { RefreshSuccess } from '@/_ddd/auth/domain/port/in/refresh.use-case';
import { TokenPayload } from '@/_ddd/auth/domain/port/out/token.port';
import { RefreshGuard } from '@/_ddd/auth/guard/refresh.guard';
import { CurrentUser } from '@/_ddd_shared/decorator/CurrentUser';
import { handleException } from '@/_ddd_shared/exceptions';
import { Response } from '@/_ddd_shared/types/response.type';
import { Result } from '@/_ddd_shared/types/result.type';
import { res } from '@/_ddd_shared/ui/response-base';
import { match } from '@/_ddd_shared/util/Result';
import { TypedRoute } from '@nestia/core';
import { Controller, Req, Res, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Response as ExpressResponse } from 'express';
import { RefreshQuery } from '../refresh.query';

@Controller('auth')
export class RefreshHttpController {
  constructor(private readonly queryBus: QueryBus) {}
  @TypedRoute.Get('')
  @UseGuards(RefreshGuard)
  async refresh(
    @CurrentUser() user: TokenPayload,
    @Req() req: Request,
    @Res({ passthrough: true }) response: ExpressResponse,
  ): Promise<
    | Response<RefreshSuccess>
    | AuthJwtFailExceptionType
    | AuthJwtInvalidExceptionType
  > {
    const query: RefreshQuery = new RefreshQuery(user);
    const result: Result<
      RefreshSuccess,
      AuthJwtFailExceptionType | AuthJwtInvalidExceptionType
    > = await this.queryBus.execute(query);
    const headers = req.headers;
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
