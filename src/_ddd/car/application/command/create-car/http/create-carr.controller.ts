import { TokenPayload } from '@/_ddd/auth/domain/port/out/token.port';
import { CarAlreadyExistsType } from '@/_ddd/car/domain/error';
import { CurrentUser } from '@/_ddd_shared/decorator/CurrentUser';
import { handleException } from '@/_ddd_shared/exceptions';
import { AuthGuard } from '@/_ddd_shared/guard/auth.guard';
import { Result, match } from '@/_ddd_shared/types';
import { res } from '@/_ddd_shared/ui/response-base';
import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCarCommand } from '../create-car.command';
import { CreateCarHttpReq } from './create-car.req-type';

@Controller('car')
export class CreateCarController {
  constructor(private readonly commandBus: CommandBus) {}

  @TypedRoute.Post()
  @UseGuards(AuthGuard)
  async createCar(
    @TypedBody() body: CreateCarHttpReq,
    @CurrentUser() user: TokenPayload,
  ) {
    const command = new CreateCarCommand({
      ...body,
      ownerId: user.sub,
    });
    const result: Result<'success', CarAlreadyExistsType> =
      await this.commandBus.execute(command);
    return match(result, {
      Ok: (s) => res(s),
      Err: handleException,
    });
  }
}
