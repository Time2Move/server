import {
  LocalSignupCommandProps,
  OauthSignupCommandProps,
} from '../signup.command';

export type SignupHttpReq = LocalSignupCommandProps | OauthSignupCommandProps;
