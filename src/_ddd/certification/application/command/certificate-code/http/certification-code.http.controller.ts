import {
  CertificationCodeExpiredType,
  CertificationCodeNotFoundType,
} from '@/_ddd/certification/domain/error';
import { handleException } from '@/_ddd_shared/exceptions';
import { Result, match } from '@/_ddd_shared/types';
import { Response } from '@/_ddd_shared/types/response.type';
import { res } from '@/_ddd_shared/ui/response-base';
import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CertificateCodeCommand } from '../certificate-code.command';
import { CertificateCodeHttpReq } from './certificate-code.req.type';
import { CertificateCodeHttpRes } from './certificate-code.res-type';

@Controller('certification')
export class CertificateCodeHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TypedRoute.Patch('')
  async createCertificationCode(
    @TypedBody() body: CertificateCodeHttpReq,
  ): Promise<
    | Response<CertificateCodeHttpRes>
    | CertificationCodeNotFoundType
    | CertificationCodeExpiredType
  > {
    const { targetType, target, type, code } = body;
    const command = new CertificateCodeCommand({
      target: { target, targetType, type },
      code,
    });
    const result: Result<
      string,
      CertificationCodeNotFoundType | CertificationCodeExpiredType
    > = await this.commandBus.execute(command);
    return match(result, {
      Ok: (code) => res({ id: code }),
      Err: handleException,
    });
  }
}
