import { Entity } from '@/_ddd_shared/ddd/entity.base';
import { v4 } from 'uuid';
import { ParkingSnapshot } from '../value-object/parking-snapshot.value-object';

export interface ParkingEntityProps {
  id: string;
  location: string;
  latitude: number;
  longitude: number;
  status: ParkingStatus;
  startDate: Date;
  endDate: Date;
  snapshots: ParkingSnapshot[];
}
export interface CreateParkingEntityProps {
  location: string;
  latitude: number;
  longitude: number;
  status: ParkingStatus;
  startDate: Date;
  endDate: Date;
}

export type ParkingStatus = 'PARKED' | 'COMPLETED';

export class ParkingEntity extends Entity<ParkingEntityProps> {
  public static create(createProps: CreateParkingEntityProps): ParkingEntity {
    const id = v4();
    const location = createProps.location;
    const latitude = createProps.latitude;
    const longitude = createProps.longitude;
    const status = createProps.status;
    const startDate = createProps.startDate;
    const endDate = createProps.endDate;
    const props = {
      id,
      location,
      latitude,
      longitude,
      status,
      startDate,
      endDate,
      snapshots: [],
    };
    return new ParkingEntity({ id, props }).addSnapshot();
  }

  end() {
    this.props.status = 'COMPLETED';
    return this.addSnapshot();
  }

  // --------------------
  // snapshot
  // --------------------
  addSnapshot() {
    const props = this.props;
    const snapshot = new ParkingSnapshot({
      id: v4(),
      location: props.location,
      latitude: props.latitude,
      longitude: props.longitude,
      status: props.status,
      startDate: props.startDate,
      endDate: props.endDate,
    });
    this.props.snapshots.push(snapshot);
    return this;
  }

  // --------------------
  // validate
  // --------------------
  public validate(): void {}
}
