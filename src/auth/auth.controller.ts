import { eitherToResponse } from '@common/util/Res';
import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { Auth } from '@type/auth';
import { AuthService } from './provider/auth.service';
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @TypedRoute.Get('/')
  checkLogin() {
    return 'login';
  }

  @TypedRoute.Post('/login')
  login() {}

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
