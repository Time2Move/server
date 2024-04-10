export type Either<L, R> = { left?: L; right?: R };
export type Left = <L>(value: L) => Either<L, never>;
export type Right = <R>(value: R) => Either<never, R>;

export const isLeft = <L, R>(
  either: Either<L, R>,
): either is Either<L, never> => 'left' in either;

export const isRight = <L, R>(
  either: Either<L, R>,
): either is Either<never, R> => 'right' in either;

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
    return onLeft(either.left as L);
  } else if (isRight(either)) {
    return onRight(either.right as R);
  }
  throw new Error('Either must be either left or right');
};

export const left: Left = (value) => ({ left: value });
export const right: Right = (value) => ({ right: value });
