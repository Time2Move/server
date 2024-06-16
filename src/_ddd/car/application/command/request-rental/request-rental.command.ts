import { Command } from '@/_ddd_shared/app/command/command.base';

export interface RequestRentalCommandProps {
  carId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
}

export class RequestRentalCommand extends Command {
  readonly props: RequestRentalCommandProps;
  constructor(props: RequestRentalCommandProps) {
    super(props);
    this.props = props;
  }
}
