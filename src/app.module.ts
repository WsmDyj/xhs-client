import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { ThrottlerGuard, ThrottlerModule, seconds } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { SharedModule } from './common/shared/shared.module';
import { CatsModule } from './modules/cats/cats.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { AllExceptionsFilter } from './common/exceptions/all-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { DatabaseModule } from './common/shared/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      // 指定多个 env 文件时，第一个优先级最高
      envFilePath: ['.env.local', `.env.${process.env.NODE_ENV}`, '.env'],
      load: [...Object.values(config)],
    }),
    // 避免暴力请求，限制同一个接口 10 秒内不能超过 7 次请求
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        errorMessage: '当前操作过于频繁，请稍后再试！',
        throttlers: [{ ttl: seconds(10), limit: 7 }],
      }),
    }),
    AccountModule,
    SharedModule,
    DatabaseModule,
    CatsModule,
    MiddlewareModule,
  ],
  providers: [
    // 错误拦截
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    {
      // 统一返回封装
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      // 接口超时
      provide: APP_INTERCEPTOR,
      useFactory: () => new TimeoutInterceptor(5 * 1000),
    },
    { provide: APP_GUARD, useClass: ThrottlerGuard }, // 限流
  ],
})
export class AppModule {}
