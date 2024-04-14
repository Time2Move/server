import { JwtPayload } from '@/auth/interface/auth.service.interface';
import { CurrentUser } from '@common/decorator/CurrentUser';
import { LoginOnly } from '@common/decorator/LoginOnly';
import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { Parking } from '@type/parking';

@Controller('/parking')
export class ParkingController {
  constructor() {}

  /**
   * 주차 리스트 조회
   *
   * 주차 리스트를 조회합니다.
   * 지도에 표시할 주차장 리스트를 조회합니다.
   *
   *
   */
  // @TypedRoute.Get('/')
  // getList(@TypedQuery() query: Parking.GetList.Request.Query) {}

  @TypedRoute.Post('/')
  @LoginOnly()
  createParking(
    @TypedBody() dto: Parking.Create.Request.Dto,
    @CurrentUser() user: JwtPayload,
  ) {
    dto;
    user;
    // const { latitude, longitude, address, drivingId } = dto;
  }

  @TypedRoute.Patch('/:id')
  updateParking() {}

  @TypedRoute.Delete('/:id')
  deleteParking() {}
}
