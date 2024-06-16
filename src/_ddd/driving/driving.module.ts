import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { StartDrivingController } from './application/command/start-driving/http/start-driving.controller';
import { StartDrivingCommandHandler } from './application/command/start-driving/start-driving.command-handler';
import { DrivingMapper } from './domain/driving.mapper';
import { CarAdaptor } from './infrastructure/adaptor/car.adaptor';
import { DrivingRepository } from './infrastructure/repo/driving.repository';

const controllers = [StartDrivingController];
const commandHandlers = [StartDrivingCommandHandler];

const mapper = [DrivingMapper];
const repositories = [DrivingRepository];

const adaptors = [CarAdaptor];
@Module({
  imports: [CqrsModule],
  controllers,
  providers: [...commandHandlers, ...mapper, ...repositories, ...adaptors],
})
export class DDD_DrivingModule {}
