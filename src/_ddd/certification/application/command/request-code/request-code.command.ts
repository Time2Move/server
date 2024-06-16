import {
  CertificationTargetType,
  CertificationType,
} from '@/_ddd/certification/domain/type/certification.code.type';
import { Command, CommandProps } from '@/_ddd_shared/app/command/command.base';

export class RequestCodeCommand extends Command {
  readonly type: CertificationType;
  readonly targetType: CertificationTargetType;
  readonly target: string;
  constructor(props: CommandProps<RequestCodeCommand>) {
    super(props);
    this.type = props.type;
    this.targetType = props.targetType;
    this.target = props.target;
  }
}
