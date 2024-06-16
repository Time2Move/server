import { RefreshQuery } from '@/_ddd/auth/application/query/refresh/refresh.query';
import { Result } from '@/_ddd_shared/types';
import {
  AuthJwtFailExceptionType,
  AuthJwtInvalidExceptionType,
} from '../../error';

export interface RefreshSuccess {
  accessToken: string;
  refreshToken?: string;
  user: {
    account: string;
    nickname: string;
  };
}

export interface RefreshUseCase {
  execute(
    query: RefreshQuery,
  ): Promise<
    Result<
      RefreshSuccess,
      AuthJwtFailExceptionType | AuthJwtInvalidExceptionType
    >
  >;
}
