import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class FindCertificationByPhoneQueryResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => String)
  async findCertificationByPhone(@Args('phone') phone: string) {
    return phone;
  }
}
