import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}

  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    console.log('before request middleware');
    next();
    console.log('after request middleware');
  }
}
