import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const sessionUser = this.extractSessionUserFromRequest(request);
    if (!sessionUser) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractSessionUserFromRequest(
    request: Request & Record<'session', Record<'user', any>>,
  ): string | undefined {
    return request.session.user;
  }
}
