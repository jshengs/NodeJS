import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //cors
  app.enableCors()
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
  .setTitle('Nest API')
  .setDescription('The description of the API')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document);
  
  await app.listen(5000);
}

bootstrap();