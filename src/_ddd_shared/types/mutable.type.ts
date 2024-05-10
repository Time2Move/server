/**
 * 모든 속성을 변경 가능한 타입으로 만듭니다.
 * (readonly 플래그를 제거합니다)
 */
export type Mutable<T> = {
  -readonly [key in keyof T]: T[key];
};

/**
 * 모든 속성을 변경 가능한 타입으로 만듭니다.
 * (readonly 플래그를 제거합니다, 중첩된 객체도 포함합니다)
 */
export type DeepMutable<T> = { -readonly [P in keyof T]: DeepMutable<T[P]> };
