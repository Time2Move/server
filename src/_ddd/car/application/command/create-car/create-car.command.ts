import { Command, CommandProps } from '@/_ddd_shared/app/command/command.base';

export interface CreateCarCommandProps {
  ownerId: string;
  type: string;
  number: string;
  images: string[];
}

export class CreateCarCommand extends Command {
  readonly props: CreateCarCommandProps;

  constructor(props: CommandProps<CreateCarCommandProps>) {
    super(props);
    this.props = props;
  }
}
