import { LoginSuccess } from '@/_ddd/auth/domain/port/in/login.use-case';

export type LoginHttpRes = {
  user: LoginSuccess['user'];
  accessToken: string;
  /**
   * x-app = 'app' 일경우
   */
  refreshToken?: string;
};