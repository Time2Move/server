import { Mapper } from '@/_ddd_shared/ddd/mapper.interface';
import { Injectable } from '@nestjs/common';
import {
  Car,
  CarSnapshot,
  Prisma,
  Rental,
  RentalSnapshot,
} from '@prisma/client';
import { CarEntity } from './domain/entity/car.root-entity';
import { RentalEntity } from './domain/entity/rental.entity';
import { CarSnapshot as CarSnapshotVO } from './domain/value-object/car-snapshot.value-object';
import { RentalSnapshot as RentalSnapshotVO } from './domain/value-object/rental-snapshot.value-object';

@Injectable()
export class CarMapper implements Mapper<CarEntity> {
  toPersistence(entity: CarEntity): {
    create: Prisma.CarCreateInput;
    update: Prisma.CarUpdateInput;
  } {
    const car = entity.getProps();
    // CarSnapshot 데이터 준비
    const carSnapshot = car.snapshots.map((s) => {
      const { id, ownerId, type, number, status } = s.unpack();
      return { id, ownerId, type, number, status };
    });
    // Rental 데이터 준비
    const rentals = car.rentals.map((r) => {
      const { id, userId, startDate, endDate, status, snapshots } =
        r.getProps();
      return {
        id,
        userId,
        startDate,
        endDate,
        status,
        snapshots: snapshots.map((s) => {
          const { id, startDate, endDate, status } = s.unpack();
          return { id, startDate, endDate, status };
        }),
      };
    });

    // Create Input 준비
    // 이미 존재할경우 렌탈정보는 없으므로 생략
    const create: Prisma.CarCreateInput = {
      id: car.id,
      type: car.type,
      number: car.number,
      owner: {
        connect: {
          id: car.ownerId,
        },
      },
      snapshots: {
        createMany: {
          data: carSnapshot.map(({ id, ownerId, type, number, status }) => {
            return { id, ownerId, type, number, status };
          }),
        },
      },
      status: car.status,
    };
    console.log(create);

    // Update Input 준비
    const update: Prisma.CarUpdateInput = {
      ...car,
      snapshots: {
        upsert: carSnapshot.map(({ id, ...s }) => ({
          where: {
            id: id,
          },
          update: { ...s },
          create: { id, ...s },
        })),
      },
      rentals: {
        upsert: rentals.map(({ snapshots, ...r }) => ({
          where: {
            id: r.id,
          },
          update: {
            ...r,
            snapshots: {
              upsert: snapshots.map(({ id, ...s }) => ({
                where: {
                  id: id,
                },
                update: {},
                create: { id, ...s },
              })),
            },
          },
          create: {
            ...r,
            snapshots: {
              createMany: {
                data: snapshots,
              },
            },
          },
        })),
      },
      images: {
        upsert: car.images.map((image) => ({
          where: {
            id: image,
          },
          create: { id: image, image: { connect: { id: image } } },
          update: {},
        })),
      },
    };

    return { create, update };
  }

  toDomain(record: FindByID): CarEntity {
    const { snapshots, rentals, ...car } = record;
    const carSnapshotVOs = snapshots.map((s) => new CarSnapshotVO(s));
    const rentalEntities = rentals.map((r) => {
      const { snapshots, ...rental } = r;
      const rentalSnapshotVOs = snapshots.map((s) => new RentalSnapshotVO(s));
      return new RentalEntity({
        id: rental.id,
        props: { ...rental, snapshots: rentalSnapshotVOs },
      });
    });

    const carEntity = new CarEntity({
      id: car.id,
      props: {
        ...car,
        snapshots: carSnapshotVOs,
        rentals: rentalEntities,
        images: [],
      },
    });

    return carEntity;
  }

  toResponse(entity: CarEntity) {
    entity;
    throw new Error('Method not implemented.');
  }
}

type FindByID = Car & {
  snapshots: CarSnapshot[];
  rentals: (Rental & {
    snapshots: RentalSnapshot[];
  })[];
};
