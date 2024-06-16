import { AggregateRoot } from '@/_ddd_shared/ddd/aggregate-root.base';
import { v4 } from 'uuid';
import { CarSnapshot } from '../value-object/car-snapshot.value-object';
import { CreateRentalProps, RentalEntity, RentalStatus } from './rental.entity';

interface CarProps {
  id: string;
  type: string; // SEDAN, SUV, ...
  ownerId: string;
  number: string; // 123가 1234
  images: string[];
  snapshots: CarSnapshot[];
  rentals: RentalEntity[];
  status: CarStatus;
}
interface CarCreateProps {
  type: string;
  ownerId: string;
  number: string;
  images: string[];
}
type CarStatus = 'ACTIVE' | 'SCRAPPED';
export class CarEntity extends AggregateRoot<CarProps> {
  /**
   * 해당 생성은 도메인상의 생성을 의미한다.
   * 실제 검증은 외부 서비스를 통해 진행후 이루어져야한다.
   * 예를 들어, 차량정보 API를 통해 유저가 실제 소유자가 맞는지 등의 검증을 외부서비스를 통해 진행해야한다.
   */
  static create(createProps: CarCreateProps) {
    const id = v4();
    const props = {
      id,
      ...createProps,
      rentals: [],
      status: 'ACTIVE' as CarStatus,
      snapshots: [],
    };
    return new CarEntity({ id, props }).addSnapshot();
  }

  isOwner(userId: string): boolean {
    return this.props.ownerId === userId;
  }

  // ------------------------------------------------
  // Rental
  // ------------------------------------------------
  /**
   * 렌트정보는 추가시 제거할수 없다.
   * 렌트정보는 반드시 양방향의 동의가 필요하다.
   * 즉, 렌탈정보 생성은 요청과 동시에 이루어져야한다.
   */
  addRental(rental: CreateRentalProps): CarEntity {
    if (!this.canRent()) {
      throw new Error('Car is not available');
    }
    const newRental = RentalEntity.create(rental);
    this.props.rentals.push(newRental);
    return this;
  }

  updateRentalStatus(rentalId: string, status: RentalStatus): CarEntity {
    const rental = this.props.rentals.find((r) => r.id === rentalId);
    if (!rental) {
      throw new Error('Rental not found');
    }
    rental.updateStatus(status).addSnapshot();
    return this;
  }

  canRent(): boolean {
    // 차량이 대여중인지 확인
    const rental = this.props.rentals.find(
      (r) => r.getProps().status === 'APPROVED',
    );
    if (rental) {
      return false;
    }
    return this.props.status === 'ACTIVE';
  }

  // ------------------------------------------------
  // Snapshot
  // ------------------------------------------------
  addSnapshot(): CarEntity {
    const { id: _, images: __, snapshots: ___, ...rest } = this.getProps();
    const snapshot = CarSnapshot.create({
      id: v4(),
      ...rest,
    });
    this.props.snapshots.push(snapshot);
    return this;
  }

  public validate(): void {}
}
