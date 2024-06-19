import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { BusinessException } from '~/common/exceptions/biz.exception';
import { ErrorEnum } from '~/common/constants/error-code.constant';
import {
  RESPONSE_SUCCESS_CODE,
  RESPONSE_SUCCESS_MSG,
} from '~/common/constants/response.constant';

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
    if (data.statusCode !== RESPONSE_SUCCESS_CODE) {
      throw new BusinessException(ErrorEnum.XHS_LOGIN_ERROR, data?.errorMsg);
    }
    return data.data;
  }
}
