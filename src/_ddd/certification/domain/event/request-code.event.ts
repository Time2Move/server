import {
  DomainEvent,
  DomainEventProps,
} from '@/_ddd_shared/ddd/domain-event/domain-event.base';
import {
  CertificationTargetType,
  CertificationType,
} from '../type/certification.code.type';

export class RequestCertificationCodeEvent extends DomainEvent {
  readonly targetType: CertificationTargetType;
  readonly type: CertificationType;
  readonly target: string;
  readonly code: string;

  constructor(props: DomainEventProps<RequestCertificationCodeEvent>) {
    super(props);
    this.targetType = props.targetType;
    this.type = props.type;
    this.target = props.target;
    this.code = props.code;
  }
}
