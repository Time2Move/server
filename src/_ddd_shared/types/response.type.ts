import { DomainException } from '../exceptions';

export interface Response<T> {
  isSuccess: true;
  message: string;
  result: T;
}

export interface ErrorResponse {
  isSuccess: false;
  message: string;
  cause?: string;
  code: string;
}

export interface Cursor<T> {
  data: T[];
  cursor: {
    /**
     * 다음 페이지요청시 사용
     *
     * 가져온 데이터의 마지막 id
     */
    next: string;
    /**
     * 현재 페이지
     *
     * 요청에 사용한 id
     */
    current?: string;

    /**
     * 몇개 가져왔는지
     */
    take: number;
  };
}

export type CursorPagination<T> = Response<Cursor<T>>;

export type DomainExceptionRes<S extends DomainException<any, any>> = {
  message: S['message'];
  cause: S['cause'];
  code: S['code'];
  isSuccess: false;
};
