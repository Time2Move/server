import { Match, Result } from '../types';

export const Ok = <T>(ok: T) => ({ result: ok, unwrap: () => ok });
export const Err = <E extends Error>(err: E) => ({
  failure: err,
  unwrap: () => {
    throw err;
  },
});

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
