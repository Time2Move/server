import { AUTH_ERROR } from '@/constant/error/auth.error';
import { Either, left } from '@common/util/Either';
import { Injectable } from '@nestjs/common';
import { Auth } from '@type/auth';
import { AuthError } from '@type/auth/error';
import { AuthLocalService } from '../implement/auth.local.service';
import { PhoneCertificationService } from './phone.certification.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly phoneCertificationService: PhoneCertificationService,
    private readonly localService: AuthLocalService,
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
        return await this.localService.login(dto);
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
}
