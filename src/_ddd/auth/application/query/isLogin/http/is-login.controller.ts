import { TokenPayload } from '@/_ddd/auth/domain/port/out/token.port';
import { CurrentUser } from '@/_ddd_shared/decorator/CurrentUser';
import { AuthGuard } from '@/_ddd_shared/guard/auth.guard';
import { res } from '@/_ddd_shared/ui/response-base';
import { TypedRoute } from '@nestia/core';
import { Controller, UseGuards } from '@nestjs/common';

@Controller('/auth')
export class IsLoginController {
  @TypedRoute.Get('/is-login')
  @UseGuards(AuthGuard)
  async isLogin(@CurrentUser() user: TokenPayload) {
    return res({
      user: { account: user.account, nickname: user.nickname },
      isLogin: true,
    });
  }
}
