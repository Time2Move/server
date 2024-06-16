import { CarEntity } from '@/_ddd/car/domain/entity/car.root-entity';
import {
  CarAlreadyExists,
  CarAlreadyExistsType,
} from '@/_ddd/car/domain/error';
import { CarRepository } from '@/_ddd/car/infrastructure/car.repository';
import { DomainException, handleException } from '@/_ddd_shared/exceptions';
import { Result } from '@/_ddd_shared/types';
import { Err, Ok } from '@/_ddd_shared/util/Result';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCarCommand } from './create-car.command';

@CommandHandler(CreateCarCommand)
export class CreateCarCommandHandler implements ICommandHandler {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(
    command: CreateCarCommand,
  ): Promise<Result<'success', CarAlreadyExistsType>> {
    try {
      const { props } = command;
      const existCheck = await this.carRepository.findByNumberAndStatus(
        props.number,
        'ACTIVE',
      );
      if (existCheck) {
        throw CarAlreadyExists('이미 존재하는 차량입니다.');
      }
      const car = CarEntity.create(props);
      console.log(car);
      await this.carRepository.save(car);
      return Ok('success');
    } catch (error) {
      if (error instanceof DomainException) {
        return Err(error);
      }
      throw handleException(error as Error);
    }
  }
}
