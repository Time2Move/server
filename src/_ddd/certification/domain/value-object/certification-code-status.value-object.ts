import {
  DomainPrimitive,
  ValueObject,
} from '@/_ddd_shared/ddd/value-object/value-object.base';
import typia from 'typia';
import { CertificationCodeStatusEnum } from '../type/certification.code.type';

export class CertificationCodeStatus extends ValueObject<CertificationCodeStatusEnum> {
  constructor(value: CertificationCodeStatusEnum) {
    super({ value });
  }
  static PENDING = new CertificationCodeStatus('PENDING');
  static EXPIRED = new CertificationCodeStatus('EXPIRED');
  static VERIFIED = new CertificationCodeStatus('VERIFIED');
  static SUCCESS = new CertificationCodeStatus('SUCCESS');

  validate({ value }: DomainPrimitive<CertificationCodeStatusEnum>): void {
    if (!typia.is<CertificationCodeStatusEnum>(value)) {
      throw new Error('Invalid certification code status');
    }
  }
}
