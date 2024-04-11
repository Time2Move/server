import { CarController } from '@/controller/car/car.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CarController],
})
export class CarModule {}
