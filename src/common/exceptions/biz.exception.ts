import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorEnum, ErrorMessage } from '../constants/error-code.constant';
import { RESPONSE_SUCCESS_CODE } from '../constants/response.constant';
import { isString } from 'class-validator';

export class BusinessException extends HttpException {
  private errorCode: number;

  constructor(errorCode: ErrorEnum | string, errorMsg?: string) {
    // 如果是非 ErrorEnum
    if (isString(errorCode)) {
      super(
        HttpException.createBody({
          code: RESPONSE_SUCCESS_CODE,
          message: errorCode || errorMsg,
        }),
        HttpStatus.OK,
      );
      this.errorCode = RESPONSE_SUCCESS_CODE;
      return;
    }
    super(
      HttpException.createBody({
        code: errorCode,
        message: errorMsg || ErrorMessage[errorCode],
      }),
      HttpStatus.OK,
    );
    this.errorCode = errorCode as number;
  }
  getErrorCode(): number {
    return this.errorCode;
  }
}
export { BusinessException as BizException };
