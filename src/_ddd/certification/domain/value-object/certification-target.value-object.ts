import { ValueObject } from '@/_ddd_shared/ddd/value-object/value-object.base';
import { ArgumentInvalidException } from '@/_ddd_shared/exceptions';
import typia from 'typia';
import { CertificationTargetProps } from '../type/certification.code.type';

export class CertificationTarget extends ValueObject<CertificationTargetProps> {
  constructor(props: CertificationTargetProps) {
    super(props);
  }

  protected validate(props: CertificationTargetProps): void {
    if (!typia.is<CertificationTargetProps>(props)) {
      throw new ArgumentInvalidException('Invalid certification target props');
    }
  }
}
