import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { GatewayModule } from './socket/gateway.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [TestModule, GatewayModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
