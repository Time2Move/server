import { Injectable } from '@nestjs/common';
import {
  Driving,
  DrivingSnapshot,
  Parking,
  ParkingSnapshot,
  Prisma,
} from '@prisma/client';
import { Mapper } from './../../../_ddd_shared/ddd/mapper.interface';
import { DrivingEntity } from './entity/driving.root-entity';
import { ParkingEntity } from './entity/parking.entity';
import { DrivingSnapshot as DrivingSnapshotVO } from './value-object/driving-snapshot.value-object';
import { ParkingSnapshot as ParkingSnapshotVO } from './value-object/parking-snapshot.value-object';

export type FindDrivingRecord = Driving & {
  snapshots: DrivingSnapshot[];
  parkings: (Parking & {
    snapshots: ParkingSnapshot[];
  })[];
};

@Injectable()
export class DrivingMapper implements Mapper<DrivingEntity, FindDrivingRecord> {
  toPersistence(aggregate: DrivingEntity): {
    create: Prisma.DrivingCreateInput;
    update: Prisma.DrivingUpdateInput;
  } {
    const { snapshots, parkings, userId, carId, ...driving } =
      aggregate.getProps();
    const DrivingSnapshot = snapshots.map((snapshot) => {
      return {
        ...snapshot.unpack(),
      };
    });
    const parking = parkings.map((parking) => {
      const props = parking.getProps();
      const snapshots = props.snapshots.map((snapshot) => {
        return {
          ...snapshot.unpack(),
        };
      });
      return {
        ...props,
        snapshots,
      };
    });
    const create: Prisma.DrivingCreateInput = {
      ...driving,
      user: {
        connect: {
          id: userId,
        },
      },
      car: {
        connect: {
          id: carId,
        },
      },
      snapshots: {
        createMany: {
          data: DrivingSnapshot.map((snapshot) => {
            return {
              ...snapshot,
            };
          }),
        },
      },
      parkings: {
        connectOrCreate: parking.map(({ snapshots, ...parking }) => {
          return {
            where: {
              id: parking.id,
            },
            create: {
              ...parking,
              carId,
              snapshots: {
                createMany: {
                  data: snapshots.map((snapshot) => {
                    return {
                      ...snapshot,
                    };
                  }),
                },
              },
            },
          };
        }),
      },
    };

    const update: Prisma.DrivingUpdateInput = {
      ...driving,
      snapshots: {
        upsert: DrivingSnapshot.map(({ id, ...snapshot }) => {
          return {
            where: {
              id,
            },
            update: {
              ...snapshot,
            },
            create: {
              id,
              ...snapshot,
            },
          };
        }),
      },
      parkings: {
        upsert: parking.map(({ id, snapshots, ...parking }) => {
          return {
            where: {
              id,
            },
            update: {
              ...parking,
              snapshots: {
                upsert: snapshots.map(({ id, ...snapshot }) => {
                  return {
                    where: {
                      id,
                    },
                    update: {
                      ...snapshot,
                    },
                    create: {
                      id,
                      ...snapshot,
                    },
                  };
                }),
              },
            },
            create: {
              id,
              ...parking,
              carId,
              snapshots: {
                createMany: {
                  data: snapshots.map((snapshot) => {
                    return {
                      ...snapshot,
                    };
                  }),
                },
              },
            },
          };
        }),
      },
    };

    return {
      create,
      update,
    };
  }
  toDomain(record: FindDrivingRecord): DrivingEntity {
    const { snapshots, parkings, rentalId, ...driving } = record;
    const drivingSnapshots = snapshots.map((snapshot) => {
      return new DrivingSnapshotVO(snapshot);
    });
    const parking = parkings.map((p) => {
      const { snapshots, ...parking } = p;
      const parkingSnapshots = snapshots.map((snapshot) => {
        return new ParkingSnapshotVO(snapshot);
      });
      return new ParkingEntity({
        id: parking.id,
        props: { ...parking, snapshots: parkingSnapshots },
      });
    });

    const aggregate = new DrivingEntity({
      id: driving.id,
      props: {
        ...driving,
        rentalId: rentalId ?? undefined,
        snapshots: drivingSnapshots,
        parkings: parking,
      },
    });
    return aggregate;
  }

  toResponse(aggregate: DrivingEntity) {
    aggregate;
    throw new Error('Method not implemented.');
  }
}
