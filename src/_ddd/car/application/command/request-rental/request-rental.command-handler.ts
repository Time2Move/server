import {
  CarNotFound,
  CarNotFoundType,
  CarOwnerCannotRent,
  CarOwnerCannotRentType,
} from '@/_ddd/car/domain/error';
import { CarRepository } from '@/_ddd/car/infrastructure/car.repository';
import { DomainException, handleException } from '@/_ddd_shared/exceptions';
import { Result } from '@/_ddd_shared/types';
import { Err, Ok } from '@/_ddd_shared/util/Result';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RequestRentalCommand } from './request-rental.command';

@CommandHandler(RequestRentalCommand)
export class RequestRentalCommandHandler
  implements ICommandHandler<RequestRentalCommand>
{
  constructor(private readonly carRepository: CarRepository) {}

  async execute(
    command: RequestRentalCommand,
  ): Promise<Result<'success', CarOwnerCannotRentType | CarNotFoundType>> {
    try {
      const { carId, startDate, endDate, userId } = command.props;

      const car = await this.carRepository.findById(carId);

      if (car?.isOwner(userId)) {
        throw CarOwnerCannotRent('You are the owner of the car');
      }

      if (!car) {
        throw CarNotFound('Car not found');
      }

      car.addRental({ userId, startDate, endDate });
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
