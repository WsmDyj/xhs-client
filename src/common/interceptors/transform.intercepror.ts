import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResOp } from '../model/response.model';
import { Reflector } from '@nestjs/core';

/**
 * 统一处理接口请求与响应结果，如果不需要则添加 @Bypass 装饰器
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const bypass = this.reflector.get<boolean>(
    //   BYPASS_KEY,
    //   context.getHandler(),
    // );

    // if (bypass) return next.handle();

    return next.handle().pipe(
      map((data) => {
        return new ResOp(HttpStatus.OK, data ?? null);
      }),
    );
  }
}
