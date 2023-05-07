import {
  Controller,
  Get,
  Post,
  Session as GetSession,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Session } from 'express-session';
import { AuthGuard } from './auth.guard';

type UserSession = Session & Record<'user', any>;

@Controller()
export class AppController {
  @UseGuards(AuthGuard)
  @Get('me')
  me(@GetSession() session: UserSession) {
    return session.user;
  }

  @Post('auth')
  auth(@GetSession() session: UserSession) {
    session.user = {
      email: 'stephanmingoes@gmail.com',
    };
    return 'successful authentication';
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logout(@GetSession() session: UserSession) {
    return new Promise((resolve, reject) => {
      session.destroy((err) => {
        if (err) reject(err);
        resolve(undefined);
      });
    });
  }
}
