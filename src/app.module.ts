import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { ThrottlerGuard, ThrottlerModule, seconds } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { SharedModule } from './common/shared/shared.modules';
import { CatsModule } from './modules/cats/cats.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { AllExceptionsFilter } from './common/exceptions/all-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true, // 缓存环境遍历
      isGlobal: true, // 全局模块
      expandVariables: true, // 变量替换
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

    { provide: APP_GUARD, useClass: ThrottlerGuard }, // 限流
  ],
})
export class AppModule {}
