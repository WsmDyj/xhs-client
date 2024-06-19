import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// 控制器应该处理 HTTP 请求并将更复杂的任务委托给提供器
@Module({
  imports: [],
  providers: [CatsService],
  controllers: [CatsController],
  exports: [], // 这个模块提供的 providers 的子集应该在导入这个模块的其他模块中可用。
})
export class CatsModule {}
