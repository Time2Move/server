export interface SerializedException {
  message: string;
  code: string;
  correlationId?: string;
  //   correlationId: string;
  stack?: string;
  cause?: string;
  metadata?: unknown;
  /**
   * ^ Consider adding optional `metadata` object to
   * exceptions (if language doesn't support anything
   * similar by default) and pass some useful technical
   * information about the exception when throwing.
   * This will make debugging easier.  // 번역
   *
   *   만약 예외가 발생한 요청의 컨텍스트를 알고 싶다면,
   *   예외를 던지는 코드에서 컨텍스트를 가져온 다음
   *   예외 생성자에서 correlationId를 설정하세요.
   */
}

/**
 * Base class for custom exceptions.
 *
 *
 * @abstract
 * @class ExceptionBase
 * @extends {Error}
 */
export abstract class ExceptionBase extends Error {
  abstract code: string;

  public readonly correlationId?: string;

  /**
   * @param {string} message
   * @param {ObjectLiteral} [metadata={}]
   * **BE CAREFUL** not to include sensitive info in 'metadata'
   * to prevent leaks since all exception's data will end up
   * in application's log files. Only include non-sensitive
   * info that may help with debugging.
   */
  constructor(
    readonly message: string,
    readonly cause?: string,
    readonly metadata?: unknown,
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * By default in NodeJS Error objects are not
   * serialized properly when sending plain objects
   * to external processes. This method is a workaround.
   * Keep in mind not to return a stack trace to user when in production.
   * https://iaincollins.medium.com/error-handling-in-javascript-a6172ccdf9af
   */
  toJSON(): SerializedException {
    return {
      message: this.message,
      code: this.code,
      stack: this.stack,
      correlationId: this.correlationId,
      cause: this.cause,
      metadata: this.metadata,
    };
  }
}
