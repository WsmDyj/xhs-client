import { Global, Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './database/database.module';

// 全局模块
@Global()
@Module({
  imports: [LoggerModule.forRoot(), DatabaseModule],
})
export class SharedModule {}
