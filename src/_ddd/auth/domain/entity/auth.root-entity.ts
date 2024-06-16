import { AggregateRoot } from '@/_ddd_shared/ddd/aggregate-root.base';
import { AuthPasswordInvalidException } from '../error';
import { HashPort } from '../port/out/hashPassword.port';
import { AuthJwtPort } from '../port/out/token.port';
import { JwtToken } from '../value-object/jwt.value-object';
import { Oauth } from '../value-object/oauth.value-object';

interface AuthEntityProps {
  account: string;
  password?: string;
  jwt?: JwtToken;
  oauths: Oauth[];
  nickname: string;
}

interface CreateAuthEntityProps {
  id: string;
  account: string;
  password?: string;
  nickname: string;
  oauths?: Oauth[];
}

export class AuthEntity extends AggregateRoot<AuthEntityProps> {
  constructor({ props, id }: { props: AuthEntityProps; id: string }) {
    super({ id, props });
  }

  override getProps() {
    return {
      ...super.getProps(),
      password: undefined,
    };
  }

  static create(authEntityProps: CreateAuthEntityProps): AuthEntity {
    const props = {
      ...authEntityProps,
      oauths: authEntityProps.oauths ?? [],
      nickname: authEntityProps.nickname,
    };
    const auth = new AuthEntity({ id: props.id, props });
    auth.validate();
    return auth;
  }

  async hashPassword(hashService: HashPort): Promise<void> {
    if (!this.props.password) {
      throw new Error('ONLY LOCAL AUTH');
    }
    this.props.password = await hashService.hash(this.props.password);
  }

  async comparePassword(
    hashService: HashPort,
    password: string,
  ): Promise<boolean> {
    if (!this.props.password) {
      throw new Error('ONLY LOCAL AUTH');
    }
    const result = await hashService.compare(password, this.props.password);
    if (!result) {
      throw AuthPasswordInvalidException(
        '잘못된 계정정보입니다. 다시 확인해주세요',
      );
    }
    return result;
  }

  // 모든곳에서 JWT가 필요한것이 아니기에 set 메소드 이용
  setJwt(jwtService: AuthJwtPort) {
    this.props.jwt = JwtToken.create(jwtService, {
      sub: this.id,
      account: this.props.account,
      nickname: this.props.nickname,
    });
    return this;
  }

  getJwt() {
    return this.props.jwt;
  }

  public validate(): void {}
}
