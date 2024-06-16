import { ValueObject } from '@/_ddd_shared/ddd/value-object/value-object.base';
import { CAR_STATUS } from '@prisma/client';

export interface CarSnapshotProps {
  id: string;
  ownerId: string;
  type: string;
  number: string;
  status: CAR_STATUS;
}

export class CarSnapshot extends ValueObject<CarSnapshotProps> {
  static create(props: CarSnapshotProps): CarSnapshot {
    const snapshot = new CarSnapshot(props);
    snapshot.validate();
    return snapshot;
  }
  protected validate(): void {}
}
