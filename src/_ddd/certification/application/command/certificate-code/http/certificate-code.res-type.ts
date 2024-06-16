export interface CertificateCodeHttpRes {
  /**
   * 인증번호 ID
   *
   * 인증이 완료된 코드의 ID로써,
   *
   * 인증번호가 필요한 API의 경우 해당 ID를 포함하여 요청해야한다.
   */
  id: string;
}
