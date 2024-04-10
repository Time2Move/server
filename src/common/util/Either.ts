export type Either<L, R> =
  | { _tag: 'LEFT'; value: L }
  | { _tag: 'RIGHT'; value: R };
export type Left = <L>(value: L) => Either<L, never>;
export type Right = <R>(value: R) => Either<never, R>;

export const isLeft = <L, R>(
  either: Either<L, R>,
): either is Either<L, never> => either._tag === 'LEFT';

export const isRight = <L, R>(
  either: Either<L, R>,
): either is Either<never, R> => either._tag === 'RIGHT';

// fold 함수 구현
export type fold = <L, R, T>(
  either: Either<L, R>,
  onLeft: (left: L) => T,
  onRight: (right: R) => T,
) => T;
export const fold: fold = <L, R, T>(
  either: Either<L, R>,
  onLeft: (left: L) => T,
  onRight: (right: R) => T,
): T => {
  if (isLeft(either)) {
    return onLeft(either.value as L);
  } else if (isRight(either)) {
    return onRight(either.value as R);
  }
  throw new Error('Either must be either left or right');
};

export const left: Left = (value) => ({ _tag: 'LEFT', value: value });
export const right: Right = (value) => ({ _tag: 'RIGHT', value: value });
