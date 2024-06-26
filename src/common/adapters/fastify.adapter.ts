/**
 * @description fastify 适配器
 */

import { FastifyAdapter } from '@nestjs/platform-fastify';

const app: FastifyAdapter = new FastifyAdapter({
  // @see https://www.fastify.io/docs/latest/Reference/Server/#trustproxy
  trustProxy: true,
  logger: false,
});
export { app as fastifyApp };
