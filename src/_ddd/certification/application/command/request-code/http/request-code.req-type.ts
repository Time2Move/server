import {
  CertificationTargetType,
  CertificationType,
} from '@/_ddd/certification/domain/type/certification.code.type';
export interface RequestCodeHttpReq {
  /**
   * 인증번호 사용 목적
   */
  type: CertificationType;
  /**
   * 인증 대상 종류
   */
  targetType: CertificationTargetType;
  /**
   * 인증 대상
   */
  target: string;
}
