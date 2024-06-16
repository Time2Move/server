import { AuthEntity } from '@/_ddd/auth/domain/entity/auth.root-entity';
import {
  AuthJwtFailExceptionType,
  AuthJwtInvalidExceptionType,
} from '@/_ddd/auth/domain/error';
import {
  RefreshSuccess,
  RefreshUseCase,
} from '@/_ddd/auth/domain/port/in/refresh.use-case';
import { DomainException, handleException } from '@/_ddd_shared/exceptions';
import { Result } from '@/_ddd_shared/types';
import { Err, Ok } from '@/_ddd_shared/util/Result';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtFailException } from './../../../domain/error/index';
import { RefreshQuery } from './refresh.query';

@QueryHandler(RefreshQuery)
export class RefreshQueryHandler implements IQueryHandler, RefreshUseCase {
  constructor(private readonly jwtService: JwtService) {}
  async execute(
    query: RefreshQuery,
  ): Promise<
    Result<
      RefreshSuccess,
      AuthJwtFailExceptionType | AuthJwtInvalidExceptionType
    >
  > {
    try {
      const user = query.user;
      const auth = AuthEntity.create({ ...user, id: user.sub });
      const token = auth.setJwt(this.jwtService)?.getJwt()?.unpack();
      if (!token) throw AuthJwtFailException('');
      return Ok({
        user: {
          nickname: user.nickname,
          account: user.account,
        },
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      });
    } catch (e) {
      if (e instanceof DomainException) return Err(e);
      throw handleException(e as Error);
    }
  }
}
