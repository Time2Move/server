import { GqlResponse } from '@/_ddd_shared/ui/response-base';
import { RequestCodeHttpRes } from '../../http/request-code.res-type';

class RequestCodeResDto implements RequestCodeHttpRes {
  id!: string;
}

export class RequestCodeGqlResDto extends GqlResponse(RequestCodeResDto) {}
