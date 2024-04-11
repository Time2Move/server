import { AUTH_ERROR } from '@/constant/error/auth.error';
import { Either, isLeft, left } from '@common/util/Either';
import { Inject, Injectable } from '@nestjs/common';
import { Auth } from '@type/auth';
import { AuthError } from '@type/auth/error';
import { assertPrune } from 'typia/lib/misc';
import { AUTH_CACHE_SERVICE } from '../auth.constant';
import { AuthLocalService } from '../implement/auth.local.service';
import {
  BasicAuthCacheService,
  BasicAuthService,
  JwtPayload,
} from '../interface/auth.service.interface';
import { AuthJWTService } from './auth.jwt.service';
import { PhoneCertificationService } from './phone.certification.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly phoneCertificationService: PhoneCertificationService,
    private readonly localService: AuthLocalService,
    @Inject(AUTH_CACHE_SERVICE)
    private readonly cacheService: BasicAuthCacheService,
    private readonly jwtService: AuthJWTService,
  ) {}

  async login(dto: Auth.Login.Request.Dto): Promise<
    Either<
      AuthError.AUTH_INVALID | AuthError.TYPE_NOT_SUPPORTED,
      {
        accessToken: string;
        refreshToken: string;
        nickname: string;
        userId: string;
      }
    >
  > {
    switch (dto.type) {
      case 'LOCAL':
        // return await this.localService.login(dto);
        return await this.processLogin(
          this.localService.login.bind(this.localService),
        )(dto);
      default:
        return left(AUTH_ERROR.TYPE_NOT_SUPPORTED);
    }
  }

  async signup(
    dto: Auth.Signup.Request.Dto,
  ): Promise<
    Either<
      | AuthError.CERTIFICATION_INVALID
      | AuthError.CERTIFICATION_NOT_FOUND
      | AuthError.USER_ALREADY_EXISTS
      | AuthError.TYPE_NOT_SUPPORTED,
      { userId: string }
    >
  > {
    switch (dto.type) {
      case 'LOCAL':
        return await this.localService.signup(dto);
      default:
        return left(AUTH_ERROR.TYPE_NOT_SUPPORTED);
    }
  }

  async logout(payload: JwtPayload) {
    const _payload = assertPrune<JwtPayload>(payload);
    await this.cacheService.addBlacklist(_payload.id);
    return true;
  }

  async refreshToken(payload: JwtPayload) {
    const _payload = assertPrune<JwtPayload>(payload);
    const accessToken = this.jwtService.accessTokenSign(_payload);
    const refreshToken = this.jwtService.refreshTokenSign(_payload);
    await this.cacheService.setCache(_payload.id, refreshToken);
    return { accessToken, refreshToken };
  }

  async requsetCertificationCode(
    dto: Auth.RequsetCertificationCode.Request.Dto,
  ): Promise<
    Either<
      | AuthError.CERTIFICATION_LIMIT_EXCEEDED
      | AuthError.CERTIFICATION_FAILED
      | AuthError.USER_ALREADY_EXISTS
      | AuthError.TYPE_NOT_SUPPORTED,
      boolean
    >
  > {
    switch (dto.targetType) {
      case 'PHONE':
        const code = await this.generateCertificationCode();
        return await this.phoneCertificationService.sendCertificationCode(
          `${dto.contryCode}${dto.target}`,
          code,
          dto.type,
        );
      default:
        return left(AUTH_ERROR.TYPE_NOT_SUPPORTED);
    }
  }

  async validateCertificationCode(
    dto: Auth.ValidateCertificationCode.Request.Dto,
  ): Promise<
    Either<
      | AuthError.CERTIFICATION_INVALID
      | AuthError.CERTIFICATION_EXPIRED
      | AuthError.CERTIFICATION_NOT_FOUND
      | AuthError.CERTIFICATION_ALREADY_VERIFIED
      | AuthError.TYPE_NOT_SUPPORTED,
      { cetificationId: string }
    >
  > {
    switch (dto.targetType) {
      case 'PHONE':
        return await this.phoneCertificationService.verifyCertificationCode(
          `${dto.contryCode}${dto.target}`,
          dto.code,
          dto.type,
        );
      default:
        return left(AUTH_ERROR.TYPE_NOT_SUPPORTED);
    }
  }

  private async generateCertificationCode() {
    return Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
  }

  private processLogin(login: BasicAuthService['login']) {
    return async (dto: Auth.Login.Request.Dto) => {
      const result = await login(dto);
      if (isLeft(result)) return result;
      const { refreshToken, userId } = result.value;
      await this.cacheService.setCache(userId, refreshToken);
      return result;
    };
  }
}
