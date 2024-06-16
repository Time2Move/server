import { TokenPayload } from '@/_ddd/auth/domain/port/out/token.port';
import { Query } from '@/_ddd_shared/app/query/query-handler.interface';

export class IsLoginQuery extends Query {
  readonly user: TokenPayload;
  constructor(user: TokenPayload) {
    super();
    this.user = user;
  }
}
