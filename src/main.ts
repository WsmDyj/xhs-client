import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './common/shared/setup-swagger';
import { ConfigService } from '@nestjs/config';
import { ConfigKeyPaths } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<ConfigKeyPaths>);
  setupSwagger(app, configService);
  await app.listen(3000);
}
bootstrap();
