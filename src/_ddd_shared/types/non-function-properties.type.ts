export type NonFunctionPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

/**
 * 함수 속성을 제외합니다.
 */
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
