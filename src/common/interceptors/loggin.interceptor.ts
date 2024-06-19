import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger(LoggingInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const content = `${request.method} -> ${request.url}`;
    const now = Date.now();
    const isSse = request.headers.accept === 'text/event-stream';
    this.logger.debug(`+++请求：${content}`);
    return next.handle().pipe(
      tap(() => {
        if (isSse) return;
        this.logger.debug(`---响应：${content}${` +${Date.now() - now}ms`}`);
      }),
    );
  }
}
