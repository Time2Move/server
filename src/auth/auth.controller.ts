import { CurrentUser } from '@common/decorator/CurrentUser';
import { LoginOnly } from '@common/decorator/LoginOnly';
import { eitherToResponse, generateResponse } from '@common/util/Res';
import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, Res, UseGuards } from '@nestjs/common';
import { Auth } from '@type/auth';
import { Base } from '@type/index';
import { Response } from 'express';
import { REFRESH_COOKIE_NAME } from './auth.constant';
import { RefreshGuard } from './guard/refresh.guard';
import { JwtPayload } from './interface/auth.service.interface';
import { AuthService } from './provider/auth.service';
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @TypedRoute.Get('/')
  @LoginOnly()
  checkLogin(@CurrentUser() user: JwtPayload) {
    if (user) {
      return generateResponse({ isLogin: true, user: user });
    }
    return generateResponse({ isLogin: false });
  }

  @TypedRoute.Post('/login')
  async login(
    @TypedBody() dto: Auth.Login.Request.Dto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto);
    if (result.isLeft()) {
      result;
      return eitherToResponse(result);
    }
    const { refreshToken, ...rest } = result.value;
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    return generateResponse({ ...rest });
  }

  @TypedRoute.Post('/signup')
  async signup(@TypedBody() dto: Auth.Signup.Request.Dto) {
    const result = await this.authService.signup(dto);
    return eitherToResponse(result);
  }

  @TypedRoute.Get('/token')
  @UseGuards(RefreshGuard)
  async refreshToken(
    @CurrentUser() user: JwtPayload,
    @Res({ passthrough: true }) res: Response,
  ): Promise<
    Base.SUCCESS<{
      accessToken: string;
    }>
  > {
    const { refreshToken, accessToken } =
      await this.authService.refreshToken(user);
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    return generateResponse({ accessToken });
  }

  @TypedRoute.Post('/logout')
  @LoginOnly()
  logout(@Res() res: Response, @CurrentUser() user: JwtPayload) {
    this.authService.logout(user);
    res.clearCookie(REFRESH_COOKIE_NAME);
    return generateResponse({
      isLogin: false,
    });
  }

  @TypedRoute.Post('/certification')
  async requsetCertificationCode(
    @TypedBody() dto: Auth.RequsetCertificationCode.Request.Dto,
  ) {
    const result = await this.authService.requsetCertificationCode(dto);
    return eitherToResponse(result);
  }

  @TypedRoute.Post('/certification/validate')
  async validateCertificationCode(
    @TypedBody() dto: Auth.ValidateCertificationCode.Request.Dto,
  ) {
    const result = await this.authService.validateCertificationCode(dto);
    return eitherToResponse(result);
  }
}
