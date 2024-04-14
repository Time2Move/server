export interface User {
  id: string;
  account: string;
  password: string;
  nickname: string;
  phone: string;
  countryCode: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export namespace User {
  export interface Snapshot {
    id: string;
    userId: string;
    account: string;
    password: string;
    nickname: string;
    phone: string;
    countryCode: string;
    createdAt: Date;
  }
}
