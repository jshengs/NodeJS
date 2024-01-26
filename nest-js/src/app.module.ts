import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { GatewayModule } from './socket/gateway.module';
import { MessagesModule } from './messages/messages.module';
import { SocketModule } from './socket/socket.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TestModule, GatewayModule, MessagesModule, SocketModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
