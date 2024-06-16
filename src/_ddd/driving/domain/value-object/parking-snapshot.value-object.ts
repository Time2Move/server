import { ValueObject } from '@/_ddd_shared/ddd/value-object/value-object.base';
import { ParkingStatus } from '../entity/parking.entity';

export interface ParkingSnapshotProps {
  id: string;
  location: string;
  latitude: number;
  longitude: number;
  status: ParkingStatus;
  startDate: Date;
  endDate: Date;
}

export class ParkingSnapshot extends ValueObject<ParkingSnapshotProps> {
  constructor(props: ParkingSnapshotProps) {
    super(props);
  }

  validate(): void {}
}
