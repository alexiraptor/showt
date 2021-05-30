import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors()
  // app.enableCors({
  // origin: true,
  // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  // credentials: true,
  // });
  // app.use(cors())
  await app.listen(3000);
}
bootstrap();