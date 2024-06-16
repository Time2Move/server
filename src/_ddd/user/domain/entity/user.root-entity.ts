import { AggregateRoot } from '@/_ddd_shared/ddd/aggregate-root.base';
import { v4 } from 'uuid';
import { AuthAdaptor } from '../../infrastructure/adaptor/auth.adaptor';
import { UserValidator } from '../service/user.validator';
import { PhoneProps } from '../type/phone.props';
import { CreateUserProps, UserProps } from '../type/user.props';
import { Account } from '../value-object/account.value-object';
import { Phone } from '../value-object/phone.value-object';
import { Snapshot } from '../value-object/snapshot.value-object';

export class UserEntity extends AggregateRoot<UserProps> {
  protected readonly _id!: string;
  private changed: boolean = false;

  static create(createProps: CreateUserProps): UserEntity {
    const id = v4();
    const account = new Account(createProps.account);
    const phone = new Phone(createProps.phone);
    const nickname = createProps.nickname;
    const props: UserProps = {
      id,
      account,
      phone,
      nickname,
      snapshots: [],
    };
    return new UserEntity({ id, props }).addSnapshot();
  }

  isChanged(): boolean {
    return this.changed;
  }

  async changePhone(
    validator: UserValidator,
    newPhoneProps: PhoneProps,
    certificationId: string,
  ): Promise<UserEntity> {
    await validator.canChangePhone(newPhoneProps, certificationId);
    const phone = new Phone(newPhoneProps);
    this.props.phone = phone;
    this.changed = true;
    return this;
  }

  async changeNickname(
    validator: UserValidator,
    nickname: string,
  ): Promise<UserEntity> {
    await validator.canChangeUserNickname(nickname);
    this.props.nickname = nickname;
    this.changed = true;
    return this;
  }

  async changePassword(
    validator: UserValidator,
    authAdaptor: AuthAdaptor,
    nowPassword: string,
    newPassword: string,
  ): Promise<UserEntity> {
    await validator.checkPassword(this, nowPassword);
    const hashedPassword = await authAdaptor.hash(newPassword);
    this.props.account = new Account({
      ...this.props.account.unpack(),
      password: hashedPassword,
    });
    this.changed = true;
    return this;
  }

  addSnapshot() {
    const { snapshots: _, account, phone, nickname } = this.getProps();
    console.log(phone.unpack);
    const snapshot = Snapshot.create({
      account: account.unpack(),
      phone: phone.unpack(),
      nickname,
      id: v4(),
    });
    this.props.snapshots.push(snapshot);
    return this;
  }
  public validate(): void {}
}
