/**
 * 모든 속성을 부분적으로 완료된 타입으로 만듭니다.
 * (중첩된 객체도 포함합니다)
 */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
