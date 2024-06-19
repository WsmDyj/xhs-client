import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { LoginDto, LoginToken } from './dao/account';
import { ApiResult } from 'src/common/decorators/api-result.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('小红书账户模块')
@Controller('xhs')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('login')
  @ApiOperation({ summary: '邮箱密码登录' })
  @ApiResult({ type: LoginToken })
  async login(@Body() dto: LoginDto) {
    const token = await this.accountService.getToken(dto.email, dto.password);
    return { token };
  }
}
