import { AUTH_ERROR } from '@/constant/error/auth.error';
import { throwError } from '@common/util/Error';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import typia from 'typia';
import { JwtPayload } from '../interface/auth.service.interface';
import { AuthJWTService } from '../provider/auth.jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: AuthJWTService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }

  private validateRequest(request: any) {
    const token = request.headers?.authorization?.split(' ')[1];
    if (!token) return throwError(AUTH_ERROR.TOKEN_MISSING);

    const user = this.jwtService.accessTokenVerify(token);
    if (!user || !typia.is<JwtPayload>(user))
      return throwError(AUTH_ERROR.TOKEN_INVALID);
    request.user = user;
    return true;
  }
}
