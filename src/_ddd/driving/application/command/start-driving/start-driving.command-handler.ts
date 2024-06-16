import { CarNotFound } from '@/_ddd/car/domain/error';
import { DrivingEntity } from '@/_ddd/driving/domain/entity/driving.root-entity';
import { CarAdaptor } from '@/_ddd/driving/infrastructure/adaptor/car.adaptor';
import { DrivingRepository } from '@/_ddd/driving/infrastructure/repo/driving.repository';
import { PrismaService } from '@common/prisma/prisma.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StartDrivingCommand } from './start-driving.command';

@CommandHandler(StartDrivingCommand)
export class StartDrivingCommandHandler implements ICommandHandler {
  constructor(
    private readonly carAdaptor: CarAdaptor,
    private readonly prisma: PrismaService,
    private readonly drivingRepository: DrivingRepository,
  ) {}

  async execute(command: StartDrivingCommand): Promise<any> {
    const { carId, userId, rentalId } = command.props;
    const car = await this.carAdaptor.getCar(carId, userId);
    if (!car) {
      throw CarNotFound('차량을 찾을 수 없습니다.');
    }
    const existDriving = await this.prisma.driving.findMany({
      where: {
        carId,
        status: {
          in: ['DRIVING'],
        },
      },
    });

    if (existDriving.length) {
      throw new Error('이미 운행중인 차량입니다.');
    }
    const driving = DrivingEntity.create({
      carId,
      rentalId,
      userId,
    });
    await this.drivingRepository.save(driving);
  }
}
