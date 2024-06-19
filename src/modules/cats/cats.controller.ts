import {
  Body,
  Controller,
  Get,
  Headers,
  Ip,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCats, FilterCatsDto } from './dto/cats.dto';
import { Cat } from './interface.ts/cat.interface';
import { ParseIntPipe } from '~/common/pipes/parse-init.pipe';
import { AuthGuard } from '~/common/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('cats')
export class CatsController {
  // 依赖注入
  // Nest 将通过创建并返回 CatsService 的实例来解析 catsService
  // （或者，在单例的正常情况下，如果已在其他地方请求过，则返回现有实例）。
  // 此依赖已解析并传递给控制器的构造函数（或分配给指示的属性）：
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(
    @Query() dto: FilterCatsDto,
    // @Ip() ip: string,
    // @Param() params: string,
    // @Headers('app_id') app_id: string,
  ): Promise<Cat[]> {
    return this.catsService.findAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateCats) {
    this.catsService.create(dto);
  }
}
