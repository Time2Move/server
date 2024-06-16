import { CertificationLimitExceededRes } from '@/_ddd/certification/domain/error';
import { AggregateID } from '@/_ddd_shared/ddd/entity.base';
import {
  ArgumentInvalidException,
  handleException,
} from '@/_ddd_shared/exceptions';
import { Result, match } from '@/_ddd_shared/types';
import { Response } from '@/_ddd_shared/types/response.type';
import { res } from '@/_ddd_shared/ui/response-base';
import { TypedBody, TypedException, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RequestCodeCommand } from '../request-code.command';
import { RequestCodeHttpReq } from './request-code.req-type';
import { RequestCodeHttpRes } from './request-code.res-type';

@Controller('certification')
export class RequestCodeHttpController {
  constructor(private readonly commandBus: CommandBus) {}
  /**
   * 인증 요청 API
   *
   * @Tag Certification
   */
  @TypedRoute.Post('')
  @TypedException<ArgumentInvalidException>(
    400,
    'AggregateRoot Validation Error',
  )
  @TypedException<CertificationLimitExceededRes>(400, 'LIMIT_EXCEEDED')
  async requestCode(
    @TypedBody() body: RequestCodeHttpReq,
  ): Promise<Response<RequestCodeHttpRes> | ArgumentInvalidException> {
    const command = new RequestCodeCommand(body);
    const result: Result<AggregateID, ArgumentInvalidException> =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (id) => res({ id }),
      Err: handleException,
    });
  }
}
