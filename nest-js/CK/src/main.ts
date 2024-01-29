import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UtilsService } from './utils.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 5000;

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);

}
bootstrap();