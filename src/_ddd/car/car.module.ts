import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DDD_AuthModule } from '../auth/auth.module';
import { CreateCarCommandHandler } from './application/command/create-car/create-car.command-hander';
import { CreateCarController } from './application/command/create-car/http/create-carr.controller';
import { RequestRentalController } from './application/command/request-rental/http/request-rental.controller';
import { RequestRentalCommandHandler } from './application/command/request-rental/request-rental.command-handler';
import { CarMapper } from './car.mapper';
import { CarRepository } from './infrastructure/car.repository';

const httpControllers = [CreateCarController, RequestRentalController];
const commandHandlers = [CreateCarCommandHandler, RequestRentalCommandHandler];
const repositories = [CarRepository];

const mappers = [CarMapper];

@Module({
  imports: [CqrsModule, DDD_AuthModule],
  controllers: [...httpControllers],
  providers: [...commandHandlers, ...repositories, ...mappers],
})
export class DDD_CarModule {}
