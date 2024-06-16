import { AggregateID } from '@/_ddd_shared/ddd/entity.base';
import { ArgumentInvalidException } from '@/_ddd_shared/exceptions';
import { Result } from '@/_ddd_shared/types';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RequestCodeCommand } from '../request-code.command';
import { IdGqlResponse } from './dto/id.gql-res.dto';
import { RequestCodeGqlRequestDto } from './dto/request-code.gql-req.dto';

@Resolver()
export class RequestCodeGraphqlResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => IdGqlResponse)
  async create(
    @Args('input') input: RequestCodeGqlRequestDto,
  ): Promise<IdGqlResponse> {
    const command = new RequestCodeCommand(input);
    const id: Result<AggregateID, ArgumentInvalidException> =
      await this.commandBus.execute(command);
    return new IdGqlResponse(id.unwrap());
  }
}
