import { AUTH_ERROR } from '@/constant/error/auth.error';
import { throwError } from '@common/util/throwError';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_OPTIONS } from '../auth.constant';
import {
  BasicAuthJWTService,
  JwtOptions,
  JwtPayload,
} from '../interface/auth.service.interface';

export class AuthJWTService implements BasicAuthJWTService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(JWT_OPTIONS)
    private option: JwtOptions,
  ) {}

  accessTokenSign(payLoad: JwtPayload) {
    return this.jwtService.sign(payLoad, {
      secret: this.option.access_secret,
      expiresIn: this.option.access_expires_in,
    });
  }

  accessTokenVerify(token: string) {
    try {
      return this.jwtService.verify<JwtPayload>(token, {
        secret: this.option.access_secret,
      });
    } catch (_) {
      return throwError(AUTH_ERROR.TOKEN_INVALID);
    }
  }

  refreshTokenSign(payLoad: JwtPayload) {
    return this.jwtService.sign(payLoad, {
      secret: this.option.refresh_secret,
      expiresIn: this.option.refresh_expires_in,
    });
  }

  refreshTokenVerify(token: string) {
    try {
      return this.jwtService.verify<JwtPayload>(token, {
        secret: this.option.refresh_secret,
      });
    } catch (_) {
      return throwError(AUTH_ERROR.TOKEN_INVALID);
    }
  }
}
