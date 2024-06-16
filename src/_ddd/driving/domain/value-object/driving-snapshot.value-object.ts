import { ValueObject } from '@/_ddd_shared/ddd/value-object/value-object.base';
import { DrivingStatus } from '../entity/driving.root-entity';

export interface DrivingSnapshotProps {
  id: string;
  location: string;
  latitude: number;
  longitude: number;
  status: DrivingStatus;
}

export class DrivingSnapshot extends ValueObject<DrivingSnapshotProps> {
  constructor(props: DrivingSnapshotProps) {
    super(props);
  }

  validate(): void {}
}
