import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import fastifyHelmet from '@fastify/helmet';
import Multipart from '@fastify/multipart';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerDocumentOptions, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from './app.config';

async function bootstrap() {
  let globalPrefix = 'api';
  let app: any = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true, bodyLimit: 20000*1024 }));
  await app.register(fastifyHelmet);
  await app.register(Multipart);
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalPipes(new ValidationPipe());
  let options: SwaggerDocumentOptions =  {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey
  }
  let swaggerConfig = new DocumentBuilder()
    .setTitle('Payever Assessment')
    .setDescription('API documentation for Payever assessment')
    .setVersion('1.0.0')
    .build();
  let document = SwaggerModule.createDocument(app, swaggerConfig, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(AppConfig().PORT);
}
bootstrap();
