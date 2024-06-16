import { JwtSignOptions } from '@nestjs/jwt';

export interface TokenPayload {
  sub: string;
  account: string;
  nickname: string;
}

export interface AuthJwtPort {
  sign(payload: TokenPayload, options?: JwtSignOptions): string;
  verify(token: string): TokenPayload;
}
