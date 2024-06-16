import { CertificationRecordEntity } from '../entity/certification-record.entity';
import { CertificationCodeStatus } from '../value-object/certification-code-status.value-object';
import { CertificationTarget } from '../value-object/certification-target.value-object';

export interface CertificationCodeProps {
  id: string;
  status: CertificationCodeStatus;
  code: string;
  target: CertificationTarget;
  expiresAt: Date;
  certificationRecord?: CertificationRecordEntity;
}

export type CertificationTargetType = 'PHONE';
export type CertificationType =
  | 'SIGN_UP'
  | 'FIND_PASSWORD'
  | 'CHANGE_PHONE_INFO';

export interface CertificationTargetProps {
  type: CertificationType;
  targetType: CertificationTargetType;
  target: string;
}

export type CertificationCodeStatusEnum =
  | 'PENDING'
  | 'EXPIRED'
  | 'VERIFIED'
  | 'SUCCESS';

export interface CreateCertificationCodeProps
  extends CertificationTargetProps {}
