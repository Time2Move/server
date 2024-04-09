import { AuthError } from '@type/auth/error';
import typia from 'typia';
export namespace AUTH_ERROR {
  export const USER_ALREADY_EXISTS =
    typia.random<AuthError.USER_ALREADY_EXISTS>();

  export const AUTH_INVALID = typia.random<AuthError.AUTH_INVALID>();

  export const OAUTH_NOT_SUPPORTED =
    typia.random<AuthError.OAUTH_NOT_SUPPORTED>();

  export const TOKEN_EXPIRED = typia.random<AuthError.TOKEN_EXPIRED>();

  export const TOKEN_INVALID = typia.random<AuthError.TOKEN_INVALID>();

  export const TOKEN_BLACKLISTED = typia.random<AuthError.TOKEN_BLACKLISTED>();

  export const CERTIFICATION_NOT_SUPPORTED =
    typia.random<AuthError.CERTIFICATION_NOT_SUPPORTED>();

  export const CERTIFICATION_INVALID =
    typia.random<AuthError.CERTIFICATION_INVALID>();

  export const CERTIFICATION_EXPIRED =
    typia.random<AuthError.CERTIFICATION_EXPIRED>();

  export const CERTIFICATION_LIMIT_EXCEEDED =
    typia.random<AuthError.CERTIFICATION_LIMIT_EXCEEDED>();

  export const CERTIFICATION_NOT_FOUND =
    typia.random<AuthError.CERTIFICATION_NOT_FOUND>();

  export const CERTIFICATION_FAILED =
    typia.random<AuthError.CERTIFICATION_FAILED>();
}
