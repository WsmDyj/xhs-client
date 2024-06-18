import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);
  constructor(private readonly httpService: HttpService) {}

  getStatisticUrl() {
    return 'https://customer.xiaohongshu.com/api/';
  }
  /**
   * 获取账号token
   * https://customer.xiaohongshu.com/api/cas/loginWithAccount
   */
  async getToken(email: string, password: string): Promise<string> {
    const LOGIN_SETUP =
      'https://customer.xiaohongshu.com/api/cas/loginWithAccount';
    const { data } = await this.httpService.axiosRef.post(LOGIN_SETUP, {
      account: email,
      password,
      service: 'https://pro.xiaohongshu.com',
    });
    if (data.statusCode === 200) {
      return data.data;
    }
    return '';
  }
}
