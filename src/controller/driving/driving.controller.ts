import { JwtPayload } from '@/auth/interface/auth.service.interface';
import { DrivingService } from '@/providers/driving/driving.service';
import { CurrentUser } from '@common/decorator/CurrentUser';
import { LoginOnly } from '@common/decorator/LoginOnly';
import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { Driving } from '@type/driving';

@Controller()
export class DrivingController {
  constructor(private readonly drivingService: DrivingService) {}

  // 운행 목록
  @TypedRoute.Get('/driving')
  @LoginOnly()
  async getMyDrivingList() {}

  // 운행 시작
  @TypedRoute.Post('/driving')
  @LoginOnly()
  async start(
    @TypedBody() dto: Driving.Start.Request.Dto,
    @CurrentUser() user: JwtPayload,
  ) {
    dto;
    user;
  }

  // 운행 상태 변경
  @TypedRoute.Patch('/driving/:id')
  @LoginOnly()
  async updateStatus() {}
}
