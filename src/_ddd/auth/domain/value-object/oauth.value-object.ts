import { ValueObject } from '@/_ddd_shared/ddd/value-object/value-object.base';

export type OauthProvider = 'GOOGLE' | 'KAKAO';

export interface OauthProps {
  provider: OauthProvider;
  providerId: string;
}

export interface CreateOauthProps {
  provider: OauthProvider;
  providerId: string;
}

/**
 * @deprecated
 */
// TODO: 구현예정
export class Oauth extends ValueObject<OauthProps> {
  protected validate(): void {}
}
