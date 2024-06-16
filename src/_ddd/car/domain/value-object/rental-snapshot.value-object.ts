import { ValueObject } from '@/_ddd_shared/ddd/value-object/value-object.base';
import { RentalStatus } from '../entity/rental.entity';

export interface RentalSnapshotProps {
  id: string;
  status: RentalStatus;
  startDate: Date;
  endDate: Date;
}

export class RentalSnapshot extends ValueObject<RentalSnapshotProps> {
  constructor(props: RentalSnapshotProps) {
    super(props);
  }

  validate(): void {}
}
