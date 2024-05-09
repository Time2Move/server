import { JwtPayload } from '@/auth/interface/auth.service.interface';
import { CarService } from '@/providers/car/car.service';
import { CurrentUser } from '@common/decorator/CurrentUser';
import { LoginOnly } from '@common/decorator/LoginOnly';
import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { Car } from '@type/car';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @TypedRoute.Get('/')
  @LoginOnly()
  async getMyCar(@CurrentUser() user: JwtPayload) {
    return this.carService.getMyCarList(user);
  }

  @TypedRoute.Post('/')
  @LoginOnly()
  async create(
    @CurrentUser() user: JwtPayload,
    @TypedBody() dto: Car.Create.Request.Dto,
  ) {
    const result = await this.carService.create(dto, user);

    return result;
  }

  // @TypedRoute.Patch('/:id')
  // @LoginOnly()
  // async update() {}

  // /// soft delete를 사용하기에 delete는 put으로 대체
  // @TypedRoute.Put('/:id')
  // @LoginOnly()
  // async delete() {}
}
