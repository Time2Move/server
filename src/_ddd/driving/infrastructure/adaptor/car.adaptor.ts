import { PrismaService } from '@common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CarAdaptor {
  constructor(private readonly prisma: PrismaService) {}

  async getCar(carId: string, userId: string) {
    const car = await this.prisma.car.findUnique({
      where: {
        id: carId,
        OR: [
          {
            ownerId: userId,
          },
          {
            rentals: {
              some: {
                userId: userId,
                status: {
                  in: ['APPROVED'],
                },
              },
            },
          },
        ],
      },
    });

    return car;
  }
}
