import { AUTH_ERROR } from '@/constant/error/auth.error';
import { UserService } from '@/providers/user/user.service';
import { PrismaService } from '@common/prisma/prisma.service';
import { Either, isLeft, left, right } from '@common/util/Either';
import { Injectable } from '@nestjs/common';
import { CertificationCode } from '@prisma/client';

import { Auth } from '@type/auth';
import { AuthError } from '@type/auth/error';
import { v4 } from 'uuid';
import { AuthJWTService } from '../provider/auth.jwt.service';
import { AuthPasswordService } from './../provider/auth.password.service';

//* Service for local authentication
@Injectable()
export class AuthLocalService {
  constructor(
    private readonly authPasswordService: AuthPasswordService,
    private readonly authJwtService: AuthJWTService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  async login(dto: Auth.Login.Request.LocalDto): Promise<
    Either<
      AuthError.AUTH_INVALID,
      {
        accessToken: string;
        refreshToken: string;
        nickname: string;
        userId: string;
      }
    >
  > {
    const { account, password } = dto;
    const user = await this.userService.findUser({ account });
    if (!user) {
      return left(AUTH_ERROR.AUTH_INVALID);
    }
    const { password: hashedPassword } = user;
    const isMatch = await this.authPasswordService.compare(
      password,
      hashedPassword,
    );
    if (isLeft(isMatch)) {
      return isMatch;
    }
    const accessToken = this.authJwtService.accessTokenSign({
      id: user.id,
      account: user.account,
      type: dto.type,
    });
    const refreshToken = this.authJwtService.refreshTokenSign({
      id: user.id,
      account: user.account,
      type: dto.type,
    });

    return right({
      accessToken,
      refreshToken,
      nickname: user.nickname,
      userId: user.id,
    });
  }

  async signup(
    dto: Auth.Signup.Request.LocalDto,
  ): Promise<
    Either<
      | AuthError.CERTIFICATION_INVALID
      | AuthError.CERTIFICATION_NOT_FOUND
      | AuthError.USER_ALREADY_EXISTS,
      { userId: string }
    >
  > {
    const { certificationId, account, password, phone, contryCode, nickname } =
      dto;
    const phonefull = `${contryCode}${phone}`;
    const accountExists = await this.userService.checkUserExists({
      account,
    });
    if (accountExists) {
      return left(AUTH_ERROR.USER_ALREADY_EXISTS);
    }

    const phoneExists = await this.userService.checkUserExists({
      phone,
    });
    if (phoneExists) {
      return left(AUTH_ERROR.USER_ALREADY_EXISTS);
    }
    const certificationCode = await this.validateSignupCertificationCode({
      certificationId,
      phone: phonefull,
    });
    if (isLeft(certificationCode)) {
      return certificationCode;
    }

    const hashedPassword = await this.authPasswordService.hash(password);
    return await this.prismaService.$transaction(async (tx) => {
      const newUser = await this.userService.createUser(
        {
          account,
          phone: phone,
          contryCode: contryCode,
          password: hashedPassword,
          nickname,
        },
        tx,
      );
      const { id: userId } = newUser;
      await tx.certification.create({
        data: {
          id: v4(),
          certificationCodeId: certificationId,
          userId: userId,
          targetType: 'PHONE',
          type: 'SIGN_UP',
        },
      });
      await tx.certificationCode.update({
        where: { id: certificationId },
        data: { status: 'SUCCESS' },
      });
      return right({ userId });
    });
  }

  private async validateSignupCertificationCode(dto: {
    certificationId: string;
    phone: string;
  }): Promise<
    Either<
      AuthError.CERTIFICATION_INVALID | AuthError.CERTIFICATION_NOT_FOUND,
      CertificationCode
    >
  > {
    const { certificationId, phone } = dto;
    const certificationCode =
      await this.prismaService.certificationCode.findUnique({
        where: { id: certificationId },
      });
    if (!certificationCode) {
      return left(AUTH_ERROR.CERTIFICATION_NOT_FOUND);
    }
    if (certificationCode.status !== 'VERIFIED') {
      return left(AUTH_ERROR.CERTIFICATION_INVALID);
    }
    if (certificationCode.type !== 'SIGN_UP') {
      return left(AUTH_ERROR.CERTIFICATION_INVALID);
    }
    if (certificationCode.targetType !== 'PHONE') {
      return left(AUTH_ERROR.CERTIFICATION_INVALID);
    }
    if (certificationCode.target !== phone) {
      return left(AUTH_ERROR.CERTIFICATION_INVALID);
    }
    return right(certificationCode);
  }
}
