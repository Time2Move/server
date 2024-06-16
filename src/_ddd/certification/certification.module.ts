import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CertificateCodeCommandHandler } from './application/command/certificate-code/certificate-code.command-handler';
import { CertificateCodeHttpController } from './application/command/certificate-code/http/certification-code.http.controller';
import { RequestCodeGraphqlResolver } from './application/command/request-code/graphql/request-code.resolver';
import { RequestCodeHttpController } from './application/command/request-code/http/request-code.http.controller';
import { RequestCodeCommandHandler } from './application/command/request-code/request-code.command-handler';
import { FindCertificationByPhoneQueryResolver } from './application/query/find-certification-by-phone.graphql-resolver';
import { CertificationMapper } from './domain/cerfication.mapper';
import { SaveCertificationPort } from './domain/port/out/save-certification.port';
import { CertificationService } from './domain/service/certification.service';
import { CertificationRepository } from './infrastructure/repository/certification-code.repository';

/**
 * 컨트롤러
 */
const messageController = [];
const httpController = [
  RequestCodeHttpController,
  CertificateCodeHttpController,
];

/**
 * 프로바이더
 */
// 도메인 서비스
const graphQlResolvers = [
  RequestCodeGraphqlResolver,
  FindCertificationByPhoneQueryResolver,
];
const commands: Provider[] = [
  RequestCodeCommandHandler,
  CertificateCodeCommandHandler,
];
const queries: Provider[] = [];
const mapper: Provider[] = [CertificationMapper];
const service: Provider[] = [CertificationService];
// 인프라 서비스
const repositories: Provider[] = [
  {
    provide: SaveCertificationPort,
    useClass: CertificationRepository,
  },
  CertificationRepository,
];

@Module({
  imports: [CqrsModule],
  controllers: [...messageController, ...httpController],
  providers: [
    ...graphQlResolvers,
    ...repositories,
    ...commands,
    ...queries,
    ...mapper,
    ...service,
  ],
  exports: [...service],
})
export class CertificationModule {}
