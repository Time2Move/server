import { PrismaTxType } from '@common/prisma/prisma.type';

export interface FindVerifiedCertificationCode {
  target: string;
  targetType: 'PHONE' | 'EMAIL';
  type: 'SIGN_UP' | 'CHANGE_PHONE' | 'FIND_PASSWORD';
  certificationId: string;
}

export interface CertificationAdaptorPort {
  findVerifiedCertificationCode(
    command: FindVerifiedCertificationCode,
    tx?: PrismaTxType,
  ): Promise<boolean>;

  changeStatusSuccessAndRecord(
    id: string,
    userId: string,
    tx?: PrismaTxType,
  ): Promise<boolean>;
}
