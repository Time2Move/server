import { JwtPayload } from '@/auth/interface/auth.service.interface';
import { CurrentUser } from '@common/decorator/CurrentUser';
import { LoginOnly } from '@common/decorator/LoginOnly';
import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { Rental } from '@type/rental';

/**
 * 대여 API
 *
 * 현재 기획상에는 없지만
 * 추후 대여 기능이 추가될 수 있으므로
 * 대여 API를 미리 구현합니다.
 */
@Controller()
export class RentalController {
  @TypedRoute.Get('/rental')
  @LoginOnly()
  async getMyRentalList() {}

  // 대여 제안
  @TypedRoute.Post('/rental')
  @LoginOnly()
  async sendRental(
    @TypedBody() dto: Rental.SendRequest.Request.Dto,
    @CurrentUser() user: JwtPayload,
  ) {
    dto;
    user;
  }

  // 대여 제안 응답 // 요청받은 사람만 응답 가능
  @TypedRoute.Patch('/rental/:id')
  @LoginOnly()
  async updateRental() {}

  @TypedRoute.Get('/rental/:id')
  @LoginOnly()
  async getRental() {}

  // 대여 제안 삭제 // 요청한 사람만 삭제 가능
  // 대여 제안 삭제 시, 대여 제안 상태가 '취소'로 변경되어야 함
  @TypedRoute.Delete('/rental/:id')
  @LoginOnly()
  async deleteRental() {}
}
