import { v4 } from 'uuid';

type DomainEventMetadata = {
  /**
   * 이벤트가 발생한 시간입니다.
   */
  readonly timestamp: number;
  /**
   * 도메인 이벤트의 상호 연관성을 나타냅니다.
   * 예를 들어, 주문 생성 이벤트는 주문 ID를 사용하여 생성됩니다.
   */
  readonly correlationId: string;
  /**
   * 원인이 되는 이벤트의 식별자입니다.
   * 실행 순서를 복원해야 하는 경우 사용되는 식별자입니다.
   */
  readonly causationId?: string;

  /**
   * 이벤트를 발생시킨 사용자의 식별자입니다.
   * 디버깅과 로깅에 사용됩니다.
   */
  readonly userId?: string;
};

export type DomainEventProps<T> = Omit<T, 'id' | 'metadata'> & {
  aggregateId: string;
  metadata?: DomainEventMetadata;
};

export abstract class DomainEvent {
  public readonly id: string;
  public readonly aggregateId: string;
  public readonly metadata: DomainEventMetadata;

  constructor(props: DomainEventProps<unknown>) {
    this.id = v4();
    this.aggregateId = props.aggregateId;
    this.metadata = {
      correlationId: props?.metadata?.correlationId || this.id,
      causationId: props?.metadata?.causationId,
      timestamp: props?.metadata?.timestamp || Date.now(),
      userId: props?.metadata?.userId,
    };
  }
}
