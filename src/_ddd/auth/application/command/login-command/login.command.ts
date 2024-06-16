import { OauthProvider } from '@/_ddd/auth/domain/value-object/oauth.value-object';
import { Command, CommandProps } from '@/_ddd_shared/app/command/command.base';

export interface LocalLoginCommandProps {
  readonly type: 'LOCAL';
  readonly account: string;
  readonly password: string;
}

export interface OauthLoginCommandProps {
  readonly type: OauthProvider;
  readonly accessToken: string;
}

export class LoginCommand extends Command {
  readonly local?: LocalLoginCommandProps;
  readonly oauth?: OauthLoginCommandProps;
  constructor(props: CommandProps<LoginCommand>) {
    super(props);
    this.local = props.local;
    this.oauth = props.oauth;
  }
}
