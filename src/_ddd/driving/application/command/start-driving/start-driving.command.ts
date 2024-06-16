import { Command } from '@/_ddd_shared/app/command/command.base';

export interface StartDrivingCommandProps {
  carId: string;
  userId: string;
  rentalId?: string;
}

export class StartDrivingCommand extends Command {
  readonly props: StartDrivingCommandProps;

  constructor(props: StartDrivingCommandProps) {
    super(props);
    this.props = props;
  }
}
