import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { Response } from '../types/response.type';

export const res = <T>(result: T, message: string = 'success'): Response<T> => {
  return {
    result,
    message,
    isSuccess: true,
  };
};

export const GqlResponse = <T>(classRef: Type<T>) => {
  @ObjectType(`${classRef.name}Response`)
  abstract class GqlResponse implements Response<T> {
    @Field()
    isSuccess!: true;
    @Field()
    message!: string;
    @Field(() => classRef)
    result!: T;
  }
  return GqlResponse;
};
