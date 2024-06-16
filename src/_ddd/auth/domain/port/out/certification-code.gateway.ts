export interface CertificationCodeGatewayPort {
  findByPhone({
    countryCode,
    phone,
  }: {
    countryCode: string;
    phone: string;
  }): Promise<{
    id: string;
    status: 'PENDING' | 'EXPIRED' | 'VERIFIED';
  } | null>;
}
