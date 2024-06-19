import { CanActivate, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
// import { FastifyRequest } from 'fastify';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate() // context: ExecutionContext,
  : boolean | Promise<boolean> | Observable<boolean> {
    // const roles = this.reflector.get(Roles, context.getHandler());
    // const request = context.switchToHttp().getRequest<FastifyRequest>();
    // console.log(request.url, request.user);
    return true;
  }
}
