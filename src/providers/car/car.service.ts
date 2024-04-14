import { JwtPayload } from '@/auth/interface/auth.service.interface';
import { CarRepository } from '@/repository/car/car.respository';
import { PrismaService } from '@common/prisma/prisma.service';
import { Left, Right } from '@common/util/Either';
import { BAD_REQUEST_ERROR, NOT_FOUND_ERROR } from '@common/util/Error';
import { Injectable } from '@nestjs/common';
import { Car } from '@type/car';
import { v4 } from 'uuid';

@Injectable()
export class CarService {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async create(dto: Car.Create.Request.Dto, user: JwtPayload) {
    const { id } = user;
    const checkExist = await this.carRepository.findOne({
      number: dto.number,
      status: 'ACTIVE',
    });
    if (checkExist)
      return Left.create(BAD_REQUEST_ERROR('CAR_ALREADY_EXISTS')());

    const newCar = await this.carRepository.create({
      ...dto,
      ownerId: id,
      status: 'ACTIVE',
      snapshots: {
        create: {
          id: v4(),
          ownerId: id,
          status: 'ACTIVE',
          ...dto,
        },
      },
    });

    return Right.create(newCar);
  }

  async getMyCarList(user: JwtPayload) {
    return this.prismaService.car.findMany({
      where: { ownerId: user.id, status: 'ACTIVE' },
      include: {
        drivings: {
          where: {
            userId: user.id,
          },
          include: {
            parking: true,
          },
        },
      },
    });
  }

  // 폐차처리
  async deleteCar(id: string, user: JwtPayload) {
    const car = await this.carRepository.findOne({ id, ownerId: user.id });
    if (!car) return Left.create(NOT_FOUND_ERROR('CAR_NOT_FOUND')());
    await this.prismaService.$transaction(async (tx) => {
      const updatedCar = await this.carRepository.update(
        { id },
        { status: 'SCRAPPED' },
        tx,
      );
      tx.carSnapshot.create({
        data: {
          id: v4(),
          carId: id,
          ownerId: user.id,
          status: 'SCRAPPED',
          type: updatedCar.type,
          number: updatedCar.number,
        },
      });
    });
    return Right.create('SUCCESS');
  }
}
