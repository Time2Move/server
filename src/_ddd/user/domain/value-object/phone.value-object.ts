import { ValueObject } from '@/_ddd_shared/ddd/value-object/value-object.base';
import { PhoneProps } from '../type/phone.props';

export class Phone extends ValueObject<PhoneProps> {
  constructor(props: PhoneProps) {
    super(props);
  }

  protected validate(props: PhoneProps): void {
    if (props.countryCode.length !== 3) {
      throw new Error('Invalid country code');
    }
  }
}
