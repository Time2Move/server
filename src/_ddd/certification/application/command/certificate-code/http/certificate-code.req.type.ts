import {
  CertificationTargetType,
  CertificationType,
} from '@/_ddd/certification/domain/type/certification.code.type';

export interface CertificateCodeHttpReq {
  /**
   * 인증번호
   */
  code: string;

  /**
   * 인증대상 : 이메일주소, 핸드폰번호
   */
  target: string;

  /**
   * 인증대상 종류: PHONE, EMAIL
   */
  targetType: CertificationTargetType;

  /**
   * 인증 종류: SIGN_UP, FIND_PASSWORD
   */
  type: CertificationType;
}
