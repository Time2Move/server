import { TokenPayload } from '@/_ddd/auth/domain/port/out/token.port';
import { CurrentUser } from '@/_ddd_shared/decorator/CurrentUser';
import { AuthGuard } from '@/_ddd_shared/guard/auth.guard';
import { TypedBody, TypedParam, TypedRoute } from '@nestia/core';
import { Controller, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { StartDrivingCommand } from '../start-driving.command';
import { StartDrivingHttpReq } from './start-driving.req-type';

@Controller('car/:carId/driving')
export class StartDrivingController {
  constructor(private readonly commandBus: CommandBus) {}

  @TypedRoute.Post('')
  @UseGuards(AuthGuard)
  async startDriving(
    @TypedParam('carId') carId: string,
    @TypedBody() body: StartDrivingHttpReq,
    @CurrentUser() user: TokenPayload,
  ): Promise<void> {
    const { sub: userId } = user;
    await this.commandBus.execute(
      new StartDrivingCommand({
        carId,
        userId,
        rentalId: body.rentalId,
      }),
    );
  }
}
