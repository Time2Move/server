import { AUTH_ERROR } from '@/constant/error/auth.error';
import { throwError } from '@common/util/Error';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import typia from 'typia';
import { AUTH_CACHE_SERVICE, REFRESH_COOKIE_NAME } from '../auth.constant';
import {
  BasicAuthCacheService,
  JwtPayload,
} from '../interface/auth.service.interface';
import { AuthJWTService } from '../provider/auth.jwt.service';

// TODO: refresh token blacklist implementation
@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(
    // @Inject(JWT_SERVICE)
    private readonly jwtService: AuthJWTService,
    @Inject(AUTH_CACHE_SERVICE)
    private readonly cacheService: BasicAuthCacheService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private async validateRequest(request: any) {
    const token = this.extractToken(request);
    if (!token) return throwError(AUTH_ERROR.TOKEN_MISSING);

    const user = this.jwtService.refreshTokenVerify(token);
    if (!user || !this.isValidPayload(user))
      return throwError(AUTH_ERROR.TOKEN_INVALID);

    if (!(await this.isTokenValid(user.id, token))) {
      return throwError(AUTH_ERROR.TOKEN_BLACKLISTED);
    }

    request.user = user;
    return true;
  }

  private async isTokenValid(id: string, token: string) {
    const cacheToken = await this.cacheService.getCache(id);
    if (cacheToken !== token) {
      await this.addToBlacklist(token);
      cacheToken && (await this.addToBlacklist(cacheToken));
      return false;
    }

    return await this.cacheService.checkBlacklist(token);
  }

  private async addToBlacklist(token: string | null) {
    if (!token) return;
    await this.cacheService.addBlacklist(token);
  }

  private extractToken(request: any) {
    return request.cookies[REFRESH_COOKIE_NAME];
  }

  private isValidPayload(payload: any): payload is JwtPayload {
    return typia.is<JwtPayload>(payload);
  }
}
