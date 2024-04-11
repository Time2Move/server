import { JwtPayload } from '@/auth/interface/auth.service.interface';
import { CurrentUser } from '@common/decorator/CurrentUser';
import { LoginOnly } from '@common/decorator/LoginOnly';
import { TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';

@Controller('car')
export class CarController {
  @TypedRoute.Post('/')
  @LoginOnly()
  async add(@CurrentUser() user: JwtPayload) {
    console.log(user);
    return 'add';
  }
}
