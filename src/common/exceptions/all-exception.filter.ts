/**
 * @description 全局错误拦截
 */
import { FastifyReply, FastifyRequest } from 'fastify';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BusinessException } from './biz.exception';
import { QueryFailedError } from 'typeorm';
import { ErrorEnum, ErrorMessage } from '../constants/error-code.constant';
import { isDev } from '../global/env';

interface myError {
  readonly status: number;
  readonly statusCode?: number;

  readonly message?: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  constructor() {
    this.registerCatchAllExceptionsHook();
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();

    const url = request.raw.url!;
    const status = this.getStatus(exception);
    let message = this.getErrorMessage(exception);

    // 系统内部错误时
    if (
      status === HttpStatus.INTERNAL_SERVER_ERROR &&
      !(exception instanceof BusinessException)
    ) {
      Logger.error(exception, undefined, 'Catch');
      // 生产环境下隐藏错误信息
      if (!isDev) message = ErrorMessage[ErrorEnum.SERVER_ERROR];
    } else {
      this.logger.warn(
        `错误信息：(${status}) ${message} Path: ${decodeURI(url)}`,
      );
    }

    const apiErrorCode =
      exception instanceof BusinessException
        ? exception.getErrorCode()
        : status;
    // 返回基础响应结果
    response.status(status).send({
      code: apiErrorCode,
      message,
      data: null,
    });
  }
  getErrorMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      return exception.message;
    } else if (exception instanceof QueryFailedError) {
      return exception.message;
    } else {
      return (
        (exception as any)?.response?.message ??
        (exception as myError)?.message ??
        `${exception}`
      );
    }
  }
  getStatus(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    } else if (exception instanceof QueryFailedError) {
      // console.log('driverError', exception.driverError.code)
      return HttpStatus.INTERNAL_SERVER_ERROR;
    } else {
      return (
        (exception as myError)?.status ??
        (exception as myError)?.statusCode ??
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  registerCatchAllExceptionsHook() {
    // 未处理
    process.on('unhandledRejection', (reason) => {
      console.error('unhandledRejection: ', reason);
    });
    // 未捕获
    process.on('uncaughtException', (err) => {
      console.error('uncaughtException: ', err);
    });
  }
}
