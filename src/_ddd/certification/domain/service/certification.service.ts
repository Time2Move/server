import { PrismaTxType } from '@common/prisma/prisma.type';
import { Injectable } from '@nestjs/common';
import { CertificationRepository } from '../../infrastructure/repository/certification-code.repository';
import { CertificationCodeNotFound } from '../error';

@Injectable()
export class CertificationService {
  constructor(private readonly repo: CertificationRepository) {}

  async findById(id: string) {
    const certification = await this.repo.findById(id);
    if (!certification) {
      throw CertificationCodeNotFound('존재하지 않는 코드입니다.');
    }
    const props = certification.getProps();
    const targetInfo = props.target.unpack();
    const status = props.status.unpack();
    return { id, ...targetInfo, status };
  }

  async changeStatusSuccess(id: string, tx?: PrismaTxType) {
    const certification = await this.repo.findById(id);
    if (!certification) {
      throw CertificationCodeNotFound('존재하지 않는 코드입니다.');
    }
    certification.success();
    await this.repo.save(certification, tx);
  }

  async recordCertificationCode(
    certificationId: string,
    userId: string,
    tx?: PrismaTxType,
  ) {
    const certification = await this.repo.findById(certificationId, tx);
    if (!certification) {
      throw CertificationCodeNotFound('존재하지 않는 코드입니다.');
    }
    certification.record(userId);
    await this.repo.save(certification, tx);
    return true;
  }
}
