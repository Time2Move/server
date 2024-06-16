import { AuthJwtInvalidException } from '@/_ddd/auth/domain/error';
import { TokenPayload } from '@/_ddd/auth/domain/port/out/token.port';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import typia from 'typia';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }

  private validateRequest(request: any) {
    try {
      const isApp = request.headers['x-app'] === 'app';
      const token = isApp
        ? request.headers?.authorization?.split(' ')[1]
        : request.cookies?._r;
      if (!token) throw AuthJwtInvalidException('Invalid refresh token');
      const user = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      if (!user || !typia.is<TokenPayload>(user))
        throw AuthJwtInvalidException('Invalid refresh token');
      request.user = user;
      return true;
    } catch (e) {
      throw e;
    }
  }
}
