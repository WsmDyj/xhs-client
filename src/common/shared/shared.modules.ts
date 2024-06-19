import { Global, Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';

// 全局模块
@Global()
@Module({
  imports: [LoggerModule.forRoot()],
})
export class SharedModule {}
