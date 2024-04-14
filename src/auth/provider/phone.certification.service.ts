import { AUTH_ERROR } from '@/constant/error/auth.error';
import { SmsService } from '@/providers/sms.service';
import { CertificationCodeRepository } from '@/repository/certification/certificationCode.repository';
import { PrismaService } from '@common/prisma/prisma.service';
import { PrismaTxType } from '@common/prisma/prisma.type';
import { Either, Left, Right } from '@common/util/Either';
import { Injectable, Logger } from '@nestjs/common';
import { CERTIFICATION_TYPE } from '@prisma/client';
import { AuthError } from '@type/auth/error';
import { UserService } from '../../providers/user/user.service';

@Injectable()
export class PhoneCertificationService {
  private readonly logger = new Logger(PhoneCertificationService.name);
  private readonly targetType = 'PHONE';
  constructor(
    private readonly prismaService: PrismaService,
    private readonly smsService: SmsService,
    private readonly userService: UserService,
    private readonly certificationCodeRepo: CertificationCodeRepository,
  ) {}

  async sendCertificationCode(
    target: string,
    code: string,
    type: CERTIFICATION_TYPE,
  ): Promise<
    Either<
      | AuthError.CERTIFICATION_LIMIT_EXCEEDED
      | AuthError.CERTIFICATION_FAILED
      | AuthError.USER_ALREADY_EXISTS,
      boolean
    >
  > {
    return await this.prismaService
      .$transaction(async (tx) => {
        // 회원가입 여부 확인
        const userExists = await this.userService.checkUserExists(
          {
            phone: target,
          },
          tx,
        );
        if (userExists) {
          return Left.create(AUTH_ERROR.USER_ALREADY_EXISTS());
        }

        // 인증번호 발송 횟수 제한
        const checkCertificationCodeCount =
          await this.checkCertificationCodeCount(target, type, tx);
        if (checkCertificationCodeCount.isLeft()) {
          return checkCertificationCodeCount;
        }
        await this.createCertificationCode(target, code, type, tx);
        const sms = await this.smsService.send(target, code);
        if (!sms) {
          throw new Error('SMS 전송에 실패했습니다.');
        }
        return Right.create(true);
      })
      .catch(() => {
        this.logger.error(`인증번호 발송에 실패했습니다: ${target} ${code}`);
        return Left.create(
          AUTH_ERROR.CERTIFICATION_FAILED('인증번호 발송 실패'),
        );
      });
  }

  async verifyCertificationCode(
    target: string,
    code: string,
    type: CERTIFICATION_TYPE,
  ): Promise<
    Either<
      | AuthError.CERTIFICATION_INVALID
      | AuthError.CERTIFICATION_EXPIRED
      | AuthError.CERTIFICATION_NOT_FOUND
      | AuthError.CERTIFICATION_ALREADY_VERIFIED,
      { cetificationId: string }
    >
  > {
    return await this.prismaService
      .$transaction(async (tx) => {
        const certificationCode = await this.certificationCodeRepo.findOne(
          {
            target,
            code,
            targetType: this.targetType,
            type,
          },
          tx,
        );
        if (!certificationCode) {
          return Left.create(AUTH_ERROR.CERTIFICATION_INVALID());
        }
        if (certificationCode.status === 'VERIFIED') {
          return Left.create(AUTH_ERROR.CERTIFICATION_ALREADY_VERIFIED());
        }

        if (certificationCode.expiredAt < new Date()) {
          await this.certificationCodeRepo.updateManyStatus(
            {
              target,
              status: 'PENDING',
              expiredAt: {
                lte: new Date(),
              },
            },
            'EXPIRED',
            tx,
          );
          return Left.create(AUTH_ERROR.CERTIFICATION_EXPIRED());
        }
        await this.certificationCodeRepo.updateManyStatus(
          {
            target,
            code,
            targetType: this.targetType,
            type,
          },
          'VERIFIED',
          tx,
        );
        return Right.create({ cetificationId: certificationCode.id });
      })
      .catch(() => {
        this.logger.error(`인증번호 검증에 실패했습니다: ${target} ${code}`);
        return Left.create(AUTH_ERROR.CERTIFICATION_INVALID());
      });
  }

  //////////////////////////
  // Private Methods
  private async checkCertificationCodeCount(
    target: string,
    type: CERTIFICATION_TYPE,
    tx?: PrismaTxType,
  ) {
    const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
    const MAX_DAILY_CODES = 5;
    const todayCodes = await this.certificationCodeRepo.findMany(
      {
        target,
        targetType: this.targetType,
        type,
        createdAt: {
          gte: new Date(Date.now() - ONE_DAY_IN_MS),
          lte: new Date(),
        },
      },
      tx,
    );
    if (todayCodes.length >= MAX_DAILY_CODES) {
      this.logger.error(
        `인증번호 발송 횟수 초과: ${target} ${todayCodes.length}`,
      );
      return Left.create(AUTH_ERROR.CERTIFICATION_LIMIT_EXCEEDED());
    }
    return Right.create(true);
  }

  private async createCertificationCode(
    target: string,
    code: string,
    type: CERTIFICATION_TYPE,
    tx?: PrismaTxType,
  ) {
    const FIVE_MINUTES_IN_MS = 1000 * 60 * 5;
    await this.certificationCodeRepo.updateManyStatus(
      {
        target,
        status: {
          in: ['PENDING', 'VERIFIED'],
        },
      },
      'EXPIRED',
      tx,
    );
    await this.certificationCodeRepo.create(
      {
        code,
        target,
        status: 'PENDING',
        expiredAt: new Date(Date.now() + FIVE_MINUTES_IN_MS), /// 3분
        targetType: this.targetType,
        type,
      },
      tx,
    );
  }
}
