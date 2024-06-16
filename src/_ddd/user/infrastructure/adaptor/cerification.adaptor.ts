import { CertificationService } from '@/_ddd/certification/domain/service/certification.service';
import { PrismaTxType } from '@common/prisma/prisma.type';
import { Injectable } from '@nestjs/common';
import {
  CertificationAdaptorPort,
  FindVerifiedCertificationCode,
} from '../../domain/port/out/certification-adaptor.out-port';

@Injectable()
export class CertificationAdaptor implements CertificationAdaptorPort {
  constructor(private readonly service: CertificationService) {}
  async findVerifiedCertificationCode(
    command: FindVerifiedCertificationCode,
  ): Promise<boolean> {
    const { target, certificationId, targetType, type } = command;
    const certification = await this.service.findById(certificationId);
    const isCertificationVaild =
      targetType === certification.targetType &&
      target === certification.target &&
      type === certification.type &&
      certification.status === 'VERIFIED';
    return isCertificationVaild;
  }

  // TODO: certification code - user record 로 변경
  async changeStatusSuccessAndRecord(
    id: string,
    userId: string,
    tx?: PrismaTxType,
  ): Promise<boolean> {
    await this.service.changeStatusSuccess(id, tx);
    await this.service.recordCertificationCode(id, userId, tx);
    return true;
  }
}
