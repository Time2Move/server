import { Injectable } from '@nestjs/common';
import { AuthAdaptor } from '../../infrastructure/adaptor/auth.adaptor';
import { CertificationAdaptor } from '../../infrastructure/adaptor/cerification.adaptor';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import { UserEntity } from '../entity/user.root-entity';
import {
  UserAccountExist,
  UserCertificationCodeInvalid,
  UserNicknameExist,
  UserPasswordInvailid,
  UserPhoneExist,
} from '../error';
import { PhoneProps } from '../type/phone.props';

@Injectable()
export class UserValidator {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly authAdaptor: AuthAdaptor,
    private readonly certificationAdaptor: CertificationAdaptor,
  ) {}

  async canSignup({
    account,
    phone,
    countryCode,
    nickname,
    certificationId,
  }: {
    account: string;
    phone: string;
    countryCode: string;
    nickname: string;
    certificationId: string;
  }) {
    const existAccount = await this.userRepo.findByAccount(account);
    if (existAccount) {
      throw UserAccountExist('이미 존재하는 계정');
    }

    const existPhone = await this.userRepo.findByPhone({
      countryCode,
      phone,
    });
    if (existPhone) {
      throw UserPhoneExist('이미 존재하는 핸드폰');
    }

    const existNickname = await this.userRepo.findByNickname(nickname);
    if (existNickname) {
      throw UserNicknameExist('이미 존재하는 닉네임');
    }

    const certification =
      await this.certificationAdaptor.findVerifiedCertificationCode({
        certificationId: certificationId,
        type: 'SIGN_UP',
        target: countryCode + phone,
        targetType: 'PHONE',
      });
    if (!certification) {
      throw UserCertificationCodeInvalid('인증정보가 올바르지 않습니다.');
    }
    return true;
  }

  async canChangeUserNickname(nickname: string) {
    const existNickname = await this.userRepo.findByNickname(nickname);
    if (existNickname) {
      throw UserNicknameExist('이미 존재하는 닉네임');
    }
    return true;
  }

  async checkPassword(user: UserEntity, nowPassword: string) {
    const props = user.getProps();
    const compare = await this.authAdaptor.compare(
      nowPassword,
      props.account.unpack().password,
    );
    if (!compare) {
      throw UserPasswordInvailid('비밀번호가 틀렸습니다.');
    }
    return true;
  }

  async canChangePhone(newPhone: PhoneProps, certificationId: string) {
    const existPhone = await this.userRepo.findByPhone({
      countryCode: newPhone.countryCode,
      phone: newPhone.phone,
    });
    if (existPhone) {
      throw UserPhoneExist('이미 존재하는 핸드폰');
    }
    const check = await this.certificationAdaptor.findVerifiedCertificationCode(
      {
        certificationId,
        target: newPhone.countryCode + newPhone.phone,
        type: 'CHANGE_PHONE',
        targetType: 'PHONE',
      },
    );
    if (!check) {
      throw UserCertificationCodeInvalid('인증번호가 유효하지 않습니다.');
    }
    return true;
  }
}
