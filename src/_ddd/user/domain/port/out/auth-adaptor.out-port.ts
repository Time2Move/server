export interface AuthAdaptorPort {
  // 회원가입시 비밀번호 암호화
  hash(password: string): Promise<string>;

  // 비밀번호 변경과 같은 기능에 사용
  compare(hash: string, password: string): Promise<boolean>;
}
