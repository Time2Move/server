import { ValueObject } from '@/_ddd_shared/ddd/value-object/value-object.base';
import { AccountProps } from '../type/account.props';

export class Account extends ValueObject<AccountProps> {
  constructor(props: AccountProps) {
    super(props);
  }

  protected validate(props: AccountProps): void {
    if (!props.account || !props.password) {
      throw new Error('Email and password are required');
    }
  }
}
