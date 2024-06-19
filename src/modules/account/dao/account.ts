import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '邮箱' })
  @IsString()
  email: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  password: string;
}

export class LoginToken {
  @ApiProperty({ description: '账号的token' })
  token: string;
}
