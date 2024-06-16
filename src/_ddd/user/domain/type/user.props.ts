import { Account } from '../value-object/account.value-object';
import { Phone } from '../value-object/phone.value-object';
import { Snapshot } from '../value-object/snapshot.value-object';
import { AccountProps } from './account.props';
import { PhoneProps } from './phone.props';

export interface UserProps {
  id: string;
  account: Account;
  phone: Phone;
  nickname: string;
  snapshots: Snapshot[];
}

export interface CreateUserProps {
  nickname: string;
  account: AccountProps;
  phone: PhoneProps;
}
