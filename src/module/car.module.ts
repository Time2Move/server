import { CarController } from '@/controller/car/car.controller';
import { CarService } from '@/providers/car/car.service';
import { CarRepository } from '@/repository/car/car.respository';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CarController],
  providers: [CarRepository, CarService],
})
export class CarModule {}
