import { isLeft } from '@common/util/Either';
import { eitherToResponse, generateResponse } from '@common/util/Res';
import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, Res } from '@nestjs/common';
import { Auth } from '@type/auth';
import { Response } from 'express';
import { AuthService } from './provider/auth.service';
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @TypedRoute.Get('/')
  checkLogin() {
    return 'login';
  }

  @TypedRoute.Post('/login')
  async login(
    @TypedBody() dto: Auth.Login.Request.Dto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto);
    if (isLeft(result)) {
      return eitherToResponse(result);
    }
    const { refreshToken, ...rest } = result.value;
    res.cookie('_r', refreshToken, {
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
  refreshToken() {}

  @TypedRoute.Post('/logout')
  logout() {}

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
