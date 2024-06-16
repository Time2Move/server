// import { JwtPayload } from '@/auth/interface/auth.service.interface';
// import { CAR_ERROR } from '@/constant/error/car.error';
// import { RENTAL_ERROR } from '@/constant/error/rental.error';
// import { DrivingRepository } from '@/repository/driving/driving.repository';
// import { PrismaService } from '@common/prisma/prisma.service';
// import { Left, Right } from '@common/util/Either';
// import { Injectable } from '@nestjs/common';
// import { Driving } from '@type/driving';
// import { v4 } from 'uuid';

// @Injectable()
// export class DrivingService {
//   constructor(
//     private readonly prismaService: PrismaService,
//     private readonly drivingRepository: DrivingRepository,
//   ) {}

//   // 운행 시작
//   async startDriving(dto: Driving.Start.Request.Dto, user: JwtPayload) {
//     switch (dto.type) {
//       case 'MY_CAR':
//         return this.startDrivingMyCar(dto, user.id);
//       case 'RENT_CAR':
//         return this.startDrivingRentCar(dto, user.id);
//       default:
//         break;
//     }
//   }

//   async startDrivingMyCar(dto: Driving.Start.Request.MyCarDto, userId: string) {
//     dto;
//     userId;
//     const { carId } = dto;
//     const isExistMyCar = await this.prismaService.car.findUnique({
//       where: {
//         id: carId,
//         ownerId: userId,
//       },
//     });
//     if (!isExistMyCar) {
//       return Left.create(CAR_ERROR.CAR_NOT_FOUND('존재하지 않는 차량입니다.'));
//     }

//     const newDriving = await this.drivingRepository.create({
//       id: v4(),
//       userId,
//       carId,
//     });

//     return Right.create(newDriving);
//   }

//   async startDrivingRentCar(
//     dto: Driving.Start.Request.RentCarDto,
//     userId: string,
//   ) {
//     dto;
//     userId;

//     const { rentalId } = dto;
//     const rentalInfo = await this.prismaService.rental.findUnique({
//       where: {
//         id: rentalId,
//         userId,
//       },
//     });
//     if (!rentalInfo) {
//       return Left.create(
//         RENTAL_ERROR.RENTAL_NOT_FOUND('대여 정보가 존재하지 않습니다.'),
//       );
//     }
//     const newDriving = await this.drivingRepository.create({
//       id: v4(),
//       userId,
//       carId: rentalInfo.carId,
//       rentalId,
//     });
//     return Right.create(newDriving);
//   }

//   async endDriving() {}

//   async getMyDrivingList() {}
// }
