import { ValueObject } from '@/_ddd_shared/ddd/value-object/value-object.base';
import { AccountProps } from '../type/account.props';
import { PhoneProps } from '../type/phone.props';

export interface SnapshotProps {
  id: string;
  account: AccountProps;
  phone: PhoneProps;
  nickname: string;
}

export class Snapshot extends ValueObject<SnapshotProps> {
  static create(props: SnapshotProps) {
    return new Snapshot(props);
  }
  protected validate(): void {}
}
