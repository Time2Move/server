import { TokenPayload } from '@/_ddd/auth/domain/port/out/token.port';
import { CurrentUser } from '@/_ddd_shared/decorator/CurrentUser';
import { handleException } from '@/_ddd_shared/exceptions';
import { AuthGuard } from '@/_ddd_shared/guard/auth.guard';
import { match } from '@/_ddd_shared/types';
import { res } from '@/_ddd_shared/ui/response-base';
import { TypedBody, TypedParam, TypedRoute } from '@nestia/core';
import { Controller, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RequestRentalCommand } from '../request-rental.command';
import { RequestRentalHttpReq } from './request-rental.req-type';

@Controller('/car')
export class RequestRentalController {
  constructor(private readonly commandBus: CommandBus) {}

  @TypedRoute.Post('/:id/rental')
  @UseGuards(AuthGuard)
  async requestRental(
    @TypedParam('id') id: string,
    @TypedBody() body: RequestRentalHttpReq,
    @CurrentUser() user: TokenPayload,
  ) {
    const command = new RequestRentalCommand({
      carId: id,
      userId: user.sub,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
    });
    const result = await this.commandBus.execute(command);
    return match(result, {
      Ok: () => {
        return res('success');
      },
      Err: handleException,
    });
  }
}
