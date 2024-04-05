import { Auth } from '@type/auth';

export interface JwtPayload {
  id: string;
  account: string;
  type: Auth.LocalType;
}

export interface BasicAuthJWTService {
  accessTokenSign(payload: JwtPayload): string;
  accessTokenVerify(token: string): JwtPayload;
  refreshTokenSign(payload: JwtPayload): string;
  refreshTokenVerify(toke: string): JwtPayload;
}

export interface BasicAuthPasswordService {
  hash(password: string): Promise<string>;
  compare(password: string, hashed: string): Promise<boolean>;
  changePassword(
    dto: Auth.ChangePassword.Request.Dto,
  ): Promise<{ email: string; id: string }>;
}

export interface BasicAuthService {
  signup(dto: Auth.SignUp.Request.Dto): Promise<{ email: string; id: string }>;

  login(dto: Auth.Login.Request.Dto): Promise<{
    access_token: string;
    refresh_token: string;
    payload: JwtPayload;
  }>;
}

export interface BasicAuthServiceAdapter extends BasicAuthService {
  changePassword(dto: Auth.ChangePassword.Request.Dto): Promise<{
    account: string;
    id: string;
  }>;

  logout(payload: JwtPayload): Promise<void>;
  refresh(
    payload: JwtPayload,
  ): Promise<{ access_token: string; refresh_token: string }>;
}

export interface BasicAuthCacheService {
  setCache(id: string, token: string): Promise<void>;
  deleteCache(id: string): Promise<void>;
  getCache(id: string): Promise<string | undefined>;
  checkBlacklist(token: string): Promise<boolean>;
  addBlacklist(token: string): Promise<void>;
}

export interface BasicAuthApiKeyCacheService {
  setCache(id: string, date: Date, token: string): Promise<void>;
  increaseCount(id: string, date: Date): Promise<void>;
  getCache(id: string, date: Date): Promise<string | undefined>;
  getCount(id: string): Promise<number>;
  deleteCache(id: string): Promise<void>;
  checkBlacklist(key: string): Promise<boolean>;
  addBlacklist(key: string): Promise<void>;
}
