import { AuthEntity } from '@/_ddd/auth/domain/entity/auth.root-entity';
import {
  AuthAccountInvalidException,
  AuthAccountInvalidExceptionType,
  AuthExction,
  AuthJwtFailException,
} from '@/_ddd/auth/domain/error';
import {
  LoginSuccess,
  LoginUseCase,
} from '@/_ddd/auth/domain/port/in/login.use-case';
import { HashService } from '@/_ddd/auth/domain/service/HashService';
import { UserAdaptor } from '@/_ddd/auth/infrastructure/adaptor/user.adaptor';
import { handleException } from '@/_ddd_shared/exceptions';
import { Result } from '@/_ddd_shared/types';
import { Err, Ok } from '@/_ddd_shared/util/Result';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import {
  LocalLoginCommandProps,
  LoginCommand,
  OauthLoginCommandProps,
} from './login.command';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler, LoginUseCase {
  constructor(
    private readonly userAdaptor: UserAdaptor,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    command: LoginCommand,
  ): Promise<Result<LoginSuccess, AuthAccountInvalidExceptionType>> {
    const { local, oauth } = command;
    try {
      if (local) {
        return Ok(await this.localLogin(local));
      }
      if (oauth) {
        return Ok(await this.oauthLogin(oauth));
      }
      throw new Error('Invalid login command');
    } catch (e) {
      if (e instanceof AuthExction) {
        return Err(e);
      }
      throw handleException(e as Error);
    }
  }

  private async localLogin(
    local: LocalLoginCommandProps,
  ): Promise<LoginSuccess> {
    const user = await this.userAdaptor.findByAccount(local.account);
    console.log('localLogin', user);
    if (!user) {
      throw AuthAccountInvalidException(
        '존재하지않는 계정정보입니다. 확인해주세요',
      );
    }

    // 로그인시 해당 로그기록을 기록하기에 Entity - 현재는 기록 X
    const auth = AuthEntity.create({
      id: user.id,
      account: user.account,
      password: user.password,
      nickname: user.nickname,
    });
    await auth.comparePassword(this.hashService, local.password);
    const jwt = auth.setJwt(this.jwtService).getJwt()?.unpack();
    if (!jwt) {
      throw AuthJwtFailException('JWT 토큰 생성 실패');
    }

    return {
      accessToken: jwt.accessToken,
      refreshToken: jwt.refreshToken,
      user,
    };
  }

  private async oauthLogin(
    command: OauthLoginCommandProps,
  ): Promise<LoginSuccess> {
    command;
    throw new Error('Not implemented');
  }
}
