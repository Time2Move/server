import { Entity } from '@/_ddd_shared/ddd/entity.base';
import { v4 } from 'uuid';
import { RentalSnapshot } from '../value-object/rental-snapshot.value-object';

export interface RentalProps {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  status: RentalStatus;
  snapshots: RentalSnapshot[];
}

export interface CreateRentalProps {
  userId: string;
  startDate: Date;
  endDate: Date;
}
/**
 * 렌트 상태
 * - REQUESTED: 렌트 요청
 * - APPROVED: 렌트 수락
 * - REJECTED: 렌트 거절
 * - COMPLETED: 렌트 완료  (계약 완료, 렌트 종료)
 */
export type RentalStatus = 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'COMPLETED';

export class RentalEntity extends Entity<RentalProps> {
  static create(createProps: CreateRentalProps): RentalEntity {
    const id = v4();
    const props = {
      id,
      ...createProps,
      status: 'REQUESTED' as RentalStatus,
      snapshots: [],
    };
    return new RentalEntity({ id, props }).addSnapshot();
  }

  updateStatus(status: RentalStatus): RentalEntity {
    this.props.status = status;
    return this;
  }

  addSnapshot(): RentalEntity {
    const snapshot = new RentalSnapshot({
      id: v4(),
      status: this.props.status,
      startDate: this.props.startDate,
      endDate: this.props.endDate,
    });
    this.props.snapshots.push(snapshot);
    return this;
  }

  public validate(): void {}
}
