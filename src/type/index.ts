/**
 * 기본 타입 정의
 */
export namespace Base {
  /**
   * 성공 응답
   */
  export interface SUCCESS<T> {
    result: T;
    message: 'SUCCESS';
    isSuccess: true;
  }

  /**
   * 실패 응답
   */
  export interface ERROR<T, H extends HttpStatus.ErrorCode> {
    error: T;
    status: H;
    message: 'FAIL';
    isSuccess: false;
  }

  export namespace Page {
    /**
     * Offset 방식 페이징
     */
    export type Offset<T> = {
      /**
       * 페이지네이션 메타데이터 - Offset
       */
      pagenation: Offset.Pagenation;
      data: T[];
    };
    export namespace Offset {
      export interface Pagenation {
        /**
         * 페이징 타입
         */
        type: 'offset';
        /**
         * 현재 페이지
         */
        current: number;
        /**
         * 페이지당 데이터 수
         */
        limit: number;
        /**
         * 전체 데이터 수
         */
        total: number;
        /**
         * 전체 페이지 수
         */
        totalPage: number;
      }
      export type SUCCESS<T> = Base.SUCCESS<Base.Page.Offset<T>>;
    }

    /**
     * Cursor 방식 페이징
     */
    export interface Cursor<T> {
      /**
       * 페이지네이션 메타데이터 - Cursor
       */
      pagenaion: Cursor.Pagenation;
      /**
       * 응답 데이터
       */
      data: T[];
    }
    export namespace Cursor {
      export interface Pagenation {
        /**
         * 페이징 타입
         */
        type: 'cursor';
        /**
         * 이전 기준점
         * - 이전 페이지로의 기준점
         * - 없을 경우 null (첫 페이지)
         */
        prev?: string;
        /**
         * 현재 기준점
         * - 현재 페이지로의 기준점
         * - 없을 경우 null (첫 페이지)
         */
        now?: string;
        /**
         * 다음 기준점
         */
        next: string;
        /**
         * 다음 페이지 존재 여부
         * - true: 다음 페이지 존재
         * - false: 다음 페이지 없음
         */
        hasNext: boolean;
        /**
         * 몇개의 데이터를 가져왔는지
         */
        take: number;
      }
      export type SUCCESS<T> = Base.SUCCESS<Base.Page.Cursor<T>>;
    }
  }

  export enum HttpStatus {
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,
    EARLYHINTS = 103,
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    AMBIGUOUS = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    PAYLOAD_TOO_LARGE = 413,
    URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    REQUESTED_RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    I_AM_A_TEAPOT = 418,
    MISDIRECTED = 421,
    UNPROCESSABLE_ENTITY = 422,
    FAILED_DEPENDENCY = 424,
    PRECONDITION_REQUIRED = 428,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
  }
  export namespace HttpStatus {
    export type ErrorCode =
      | HttpStatus.BAD_GATEWAY
      | HttpStatus.BAD_REQUEST
      | HttpStatus.CONFLICT
      | HttpStatus.FORBIDDEN
      | HttpStatus.GATEWAY_TIMEOUT
      | HttpStatus.GONE
      | HttpStatus.I_AM_A_TEAPOT
      | HttpStatus.INTERNAL_SERVER_ERROR
      | HttpStatus.METHOD_NOT_ALLOWED
      | HttpStatus.NOT_ACCEPTABLE
      | HttpStatus.NOT_FOUND
      | HttpStatus.NOT_IMPLEMENTED
      | HttpStatus.PAYLOAD_TOO_LARGE
      | HttpStatus.PRECONDITION_FAILED
      | HttpStatus.REQUEST_TIMEOUT
      | HttpStatus.SERVICE_UNAVAILABLE
      | HttpStatus.UNAUTHORIZED
      | HttpStatus.UNPROCESSABLE_ENTITY
      | HttpStatus.UNSUPPORTED_MEDIA_TYPE;
  }
}
