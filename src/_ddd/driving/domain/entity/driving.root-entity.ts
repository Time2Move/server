import { AggregateRoot } from '@/_ddd_shared/ddd/aggregate-root.base';
import { v4 } from 'uuid';
import {
  DrivingSnapshot,
  DrivingSnapshotProps,
} from '../value-object/driving-snapshot.value-object';
import { CreateParkingEntityProps, ParkingEntity } from './parking.entity';

interface DrivingEntityProps {
  id: string;
  carId: string;
  userId: string;
  rentalId?: string;
  snapshots: DrivingSnapshot[];
  parkings: ParkingEntity[];
  status: DrivingStatus;
}

interface CreateDrivingEntityProps {
  carId: string;
  userId: string;
  rentalId?: string;
}

export type DrivingStatus = 'DRIVING' | 'END';

export class DrivingEntity extends AggregateRoot<DrivingEntityProps> {
  static create(createProps: CreateDrivingEntityProps): DrivingEntity {
    const id = v4();
    const carId = createProps.carId;
    const userId = createProps.userId;
    const rentalId = createProps.rentalId;
    const snapshots: DrivingSnapshot[] = [];
    const parkings: ParkingEntity[] = [];
    const props: DrivingEntityProps = {
      id,
      carId,
      userId,
      rentalId,
      snapshots,
      parkings,
      status: 'DRIVING',
    };
    return new DrivingEntity({ id, props });
  }

  //----------------
  // parkings
  //----------------
  parking(parkingProps: Omit<CreateParkingEntityProps, 'status'>) {
    const parking = ParkingEntity.create({ ...parkingProps, status: 'PARKED' });
    this.props.parkings.push(parking);
  }

  parkingEnd(parkingId: string) {
    const parking = this.props.parkings.find(
      (parking) => parking.id === parkingId,
    );
    if (!parking) {
      throw new Error('Parking not found');
    }
    parking.end();
  }

  //----------------
  // snapshots
  //----------------
  addSnapshot(snapshotProps: DrivingSnapshotProps): void {
    const snapshot = new DrivingSnapshot({
      ...snapshotProps,
      id: v4(),
    });
    this.props.snapshots.push(snapshot);
  }

  validate(): void {}
}
