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
  signup() {}

  @TypedRoute.Get('/token')
  refreshToken() {}

  @TypedRoute.Post('/logout')
  logout() {}

  @TypedRoute.Post('/certification')
  requsetCertificationCode(
    @TypedBody() dto: Auth.RequsetCertificationCode.Request.Dto,
  ) {
    const result = this.authService.requsetCertificationCode(dto);
    return result;
  }

  @TypedRoute.Post('/certification/validate')
  validateCertificationCode(
    @TypedBody() dto: Auth.ValidateCertificationCode.Request.Dto,
  ) {
    const result = this.authService.validateCertificationCode(dto);
    return result;
  }
}
