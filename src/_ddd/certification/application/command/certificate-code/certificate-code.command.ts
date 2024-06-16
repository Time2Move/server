import {
  CertificationTargetType,
  CertificationType,
} from '@/_ddd/certification/domain/type/certification.code.type';
import { Command, CommandProps } from '@/_ddd_shared/app/command/command.base';

export class CertificateCodeCommand extends Command {
  readonly type: CertificationType;
  readonly targetType: CertificationTargetType;
  readonly target: string;
  readonly code: string;
  constructor(
    props: CommandProps<{
      target: {
        type: CertificationType;
        targetType: CertificationTargetType;
        target: string;
      };
      code: string;
    }>,
  ) {
    super(props);
    this.type = props.target.type;
    this.targetType = props.target.targetType;
    this.target = props.target.target;
    this.code = props.code;
  }
}
