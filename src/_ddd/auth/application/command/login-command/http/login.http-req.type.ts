import {
  LocalLoginCommandProps,
  OauthLoginCommandProps,
} from '../login.command';

export type LoginHttpReq = LocalLoginCommandProps | OauthLoginCommandProps;
