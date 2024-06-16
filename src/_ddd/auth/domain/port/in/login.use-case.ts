import { LoginCommand } from '@/_ddd/auth/application/command/login-command/login.command';
import { Result } from '@/_ddd_shared/types';
import { AuthAccountInvalidExceptionType } from '../../error';

export interface LoginSuccess {
  accessToken: string;
  refreshToken: string;
  user: {
    account: string;
    nickname: string;
  };
}

export interface LoginUseCase {
  execute(
    command: LoginCommand,
  ): Promise<
    Result<
      LoginSuccess,
      AuthAccountInvalidExceptionType | AuthAccountInvalidExceptionType
    >
  >;
}
