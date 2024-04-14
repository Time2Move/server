import { JwtPayload } from '@/auth/interface/auth.service.interface';
import { PrismaService } from '@common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Parking } from '@type/parking';
import { v4 } from 'uuid';
import { ParkingRepository } from '../../repository/parking/parking.repository';
import { ParkingSnapshotRepository } from '../../repository/parking/parking.snapshot.repository';

@Injectable()
export class ParkingService {
  constructor(
    private readonly parkingRepository: ParkingRepository,
    private readonly parkingSnapshotService: ParkingSnapshotRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async create(dto: Parking.Create.Request.Dto, user: JwtPayload) {
    dto;
    user;

    const checkDriving = await this.prismaService.driving.findUnique({
      where: {
        id: dto.drivingId,
        userId: user.id,
      },
    });
    if (!checkDriving) {
      // TODO: ERROR 작성
      throw new Error('주행 정보가 존재하지 않습니다.');
    }

    const { latitude, longitude, address } = dto;
    const parking = await this.parkingRepository.create({
      id: v4(),
      carId: checkDriving.carId,
      drivingId: dto.drivingId,
      location: address,
      latitude,
      longitude,
      status: 'PARKING',
      startDate: dto.startDate,
      endDate: dto.endDate,
    });
    return parking;
  }
}
