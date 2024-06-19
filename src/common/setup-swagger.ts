import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigKeyPaths } from '~/config';
import { IAppConfig } from '~/config/app.config';
import { ResOp } from './model/response.model';

export function setupSwagger(
  app: INestApplication,
  configService: ConfigService<ConfigKeyPaths>,
) {
  const { name } = configService.get<IAppConfig>('app');
  const documentBuilder = new DocumentBuilder()
    .setTitle(name)
    .setDescription(`${name} API document`)
    .setVersion('1.0');

  const document = SwaggerModule.createDocument(app, documentBuilder.build(), {
    ignoreGlobalPrefix: false,
    extraModels: [ResOp],
  });
  SwaggerModule.setup('api', app, document);
}
