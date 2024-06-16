import { HashService } from '@/_ddd/auth/domain/service/HashService';
import { Injectable } from '@nestjs/common';
import { AuthAdaptorPort } from '../../domain/port/out/auth-adaptor.out-port';

/**
 * 만약 서버 분리가 될경우 API통신이나 rpc등의 기능을 사용해야합니다.
 */
@Injectable()
export class AuthAdaptor implements AuthAdaptorPort {
  constructor(private readonly authService: HashService) {}

  async hash(password: string): Promise<string> {
    return await this.authService.hash(password);
  }

  async compare(hash: string, password: string): Promise<boolean> {
    return await this.authService.compare(hash, password);
  }
}
