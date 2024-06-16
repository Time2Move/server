import { ValueObject } from '@/_ddd_shared/ddd/value-object/value-object.base';
import { AuthJwtPort, TokenPayload } from '../port/out/token.port';

interface JwtValueObjectProps {
  accessToken: string;
  refreshToken: string;
}
export class JwtToken extends ValueObject<JwtValueObjectProps> {
  constructor(props: JwtValueObjectProps) {
    super(props);
  }

  static create(jwtService: AuthJwtPort, payload: TokenPayload): JwtToken {
    const accessToken = jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
    const refreshToken = jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    return new JwtToken({ accessToken, refreshToken });
  }

  protected validate(): void {}
}
