import cluster from 'node:cluster';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './common/setup-swagger';
import { ConfigService } from '@nestjs/config';
import { ConfigKeyPaths } from './config';
import { LoggerService } from './common/shared/logger/logger.service';
import {
  HttpStatus,
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { isDev, isMainProcess } from './common/global/env';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { fastifyApp } from './common/adapters/fastify.adapter';
import { LoggingInterceptor } from './common/interceptors/loggin.interceptor';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyApp,
    {
      bufferLogs: true, // 暂时储存日志数据
      snapshot: true, // 系统备份
    },
  );
  const configService = app.get(ConfigService<ConfigKeyPaths>);

  const { port, globalPrefix } = configService.get('app');

  app.setGlobalPrefix(globalPrefix); // 设置全局api前缀

  // 全局拦截器
  if (isDev) app.useGlobalInterceptors(new LoggingInterceptor());
  // 全局校验管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
      // forbidNonWhitelisted: true, // 禁止 无装饰器验证的数据通过
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      stopAtFirstError: true,
      exceptionFactory: (errors) =>
        new UnprocessableEntityException(
          errors.map((e) => {
            const rule = Object.keys(e.constraints!)[0];
            const msg = e.constraints![rule];
            return msg;
          })[0],
        ),
    }),
  );

  setupSwagger(app, configService); // 注册swagger
  await app.listen(port, '0.0.0.0', async () => {
    app.useLogger(app.get(LoggerService));
    const url = await app.getUrl();
    const { pid } = process;
    const env = cluster.isPrimary; // 是否主进程
    const prefix = env ? 'P' : 'W';

    if (!isMainProcess) return;

    const logger = new Logger('NestApplication');
    logger.log(`[${prefix + pid}] Server running on ${url}`);
  });
  // 热更新处理机制
  // * 当代码发生变更触发热更新时,旧的应用实例会被替换掉。
  // * 在替换之前,我们需要先关闭旧的应用实例,以释放占用的资源,如网络连接、定时器等。
  // * 这可以确保应用在热更新后能平滑地重新启动,避免出现资源泄漏等问题。
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
