import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterCatsDto {
  @ApiProperty({ description: '姓名搜索', required: false })
  @IsOptional() // 可选
  @IsString()
  name: string;
}

export class CreateCats {
  @ApiProperty({ description: 'id', required: true })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '姓名' })
  @IsString()
  name: string;

  @ApiProperty({ description: '年龄' })
  @IsInt()
  age: number;
}
