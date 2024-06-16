import { OauthProvider } from '@/_ddd/auth/domain/value-object/oauth.value-object';
import { Command, CommandProps } from '@/_ddd_shared/app/command/command.base';

export interface LocalSignupCommandProps {
  readonly account: string;
  readonly password: string;
  readonly type: 'LOCAL';

  readonly nickname: string;
  readonly phone: string;
  readonly countryCode: string;

  // Certification
  readonly certificationId: string;
}

export interface OauthSignupCommandProps {
  readonly type: OauthProvider;
  readonly accessToken: string;
}

export class SignupCommand extends Command {
  readonly local?: LocalSignupCommandProps;
  readonly oauth?: OauthSignupCommandProps;

  constructor(props: CommandProps<SignupCommand>) {
    super(props);
    this.local = props.local;
    this.oauth = props.oauth;
  }
}
