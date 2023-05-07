import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import RedisStore from 'connect-redis';
import IoRedis from 'ioredis';

const redisClient = new IoRedis('redis://localhost:6379');

// Initialize store.
const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'myapp:',
});
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      store: redisStore,
      secret: 'super-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true, // prevents javascript from accessing the cookies
        maxAge: 15000, // cookie expiration date = 15 minutes
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
