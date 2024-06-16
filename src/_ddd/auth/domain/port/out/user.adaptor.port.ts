export interface UserAdaptorPort {
  findByAccount(account: string): Promise<{
    id: string;
    account: string;
    password: string;
    phone: string;
    countryCode: string;
    nickname: string;
  } | null>;

  findByPhone({
    countryCode,
    phone,
  }: {
    countryCode: string;
    phone: string;
  }): Promise<{
    id: string;
    account: string;
    password: string;
    phone: string;
    countryCode: string;
    nickname: string;
  } | null>;
}
