export type Result<S, F extends Error> = Ok<S> | Failure<F>;

export type Ok<S> = {
  result: S;
  unwrap: () => S;
};

export type Failure<F extends Error> = {
  failure: F;
  unwrap: () => never;
};

export type Match<S, F extends Error, R, E> = {
  Ok: (result: S) => R;
  Err: (result: F) => E;
};

export const match = <S, F extends Error, R, E>(
  result: Result<S, F>,
  handlers: Match<S, F, R, E>,
): R | E => {
  if ('result' in result) {
    return handlers.Ok(result.result);
  } else {
    return handlers.Err(result.failure);
  }
};
