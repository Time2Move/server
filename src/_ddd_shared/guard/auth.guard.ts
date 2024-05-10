import { AuthJwtInvalidException } from '@/_ddd/auth/domain/error';
import { TokenPayload } from '@/_ddd/auth/domain/port/out/token.port';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import typia from 'typia';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }

  private validateRequest(request: any) {
    try {
      const token = request.headers?.authorization?.split(' ')[1];
      if (!token) throw AuthJwtInvalidException('토큰확인해주세요.');

      const user = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      if (!user || !typia.is<TokenPayload>(user))
        throw AuthJwtInvalidException('토큰확인해주세요.');
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('토큰확인해주세요.');
    }
  }
}
