import { CertificationMapper } from '@/_ddd/certification/domain/cerfication.mapper';
import { CertificationCodeEntity } from '@/_ddd/certification/domain/entity/certification-code.root-entity';
import { SaveCertificationPort } from '@/_ddd/certification/domain/port/out/save-certification.port';
import {
  CertificationTargetType,
  CertificationType,
} from '@/_ddd/certification/domain/type/certification.code.type';
import { CertificationCodeStatus } from '@/_ddd/certification/domain/value-object/certification-code-status.value-object';
import { CertificationTarget } from '@/_ddd/certification/domain/value-object/certification-target.value-object';
import { PrismaRepositoryBase } from '@/_ddd_shared/db/prisma.repository.base';
import { PrismaService } from '@common/prisma/prisma.service';
import { PrismaTxType } from '@common/prisma/prisma.type';
import { Injectable } from '@nestjs/common';
import { CERTIFICATION_STATUS } from '@prisma/client';

@Injectable()
export class CertificationRepository
  extends PrismaRepositoryBase<CertificationCodeEntity>
  implements SaveCertificationPort
{
  private readonly include = {
    certification: true,
  };
  private readonly range = {
    gt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    lt: new Date(Date.now()).toISOString(),
  };

  constructor(
    protected readonly prisma: PrismaService,
    private readonly mapper: CertificationMapper,
  ) {
    super(prisma);
  }

  async save(
    certificationCode: CertificationCodeEntity,
    tx?: PrismaTxType,
  ): Promise<CertificationCodeEntity> {
    const { create, update } = this.mapper.toPersistence(certificationCode);
    const result = await this.excute(async (prisma) => {
      return await prisma.certificationCode.upsert({
        where: {
          id: certificationCode.id,
        },
        update,
        create,
        include: this.include,
      });
    }, tx);
    return this.mapper.toDomain(result);
  }
  /**
   * 인증코드 조회는 하루 기준으로 한다.
   */
  async findManyByTarget(
    targetVO: CertificationTarget,
    tx?: PrismaTxType,
  ): Promise<CertificationCodeEntity[]> {
    const { target, targetType } = targetVO.unpack();
    const result = await this.excute(async (prisma) => {
      return await prisma.certificationCode.findMany({
        where: {
          target,
          targetType,
          status: {
            notIn: [CertificationCodeStatus.VERIFIED.unpack()],
          },
          createdAt: this.range,
        },
        include: this.include,
      });
    }, tx);
    return result.map((item) => this.mapper.toDomain(item));
  }

  async findOneByTargetAndCode(
    input: {
      target: string;
      targetType: CertificationTargetType;
      type: CertificationType;
      code: string;
      status?: CERTIFICATION_STATUS;
    },
    tx?: PrismaTxType,
  ): Promise<CertificationCodeEntity | null> {
    const { status = 'PENDING' } = input;
    const result = await this.excute(async (prisma) => {
      return await prisma.certificationCode.findFirst({
        where: {
          targetType: input.targetType,
          type: input.type,
          target: input.target,
          code: input.code,
          expiresAt: { gt: new Date(Date.now()).toISOString() },
          status,
        },
        include: this.include,
      });
    }, tx);
    return result ? this.mapper.toDomain(result) : null;
  }

  async findById(
    id: string,
    tx?: PrismaTxType,
  ): Promise<CertificationCodeEntity | null> {
    const result = await this.excute(async (prisma) => {
      return await prisma.certificationCode.findUnique({
        where: {
          id,
          expiresAt: { gt: new Date(Date.now()).toISOString() },
        },
        include: this.include,
      });
    }, tx);
    return result ? this.mapper.toDomain(result) : null;
  }
}
