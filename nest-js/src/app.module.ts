import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { GatewayModule } from './socket/gateway.module';
import { MessagesModule } from './messages/messages.module';
import { SocketModule } from './socket/socket.module';
import { UsersModule } from './users/users.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';


@Module({
  imports: [
    TestModule, 
    GatewayModule, 
    MessagesModule, 
    SocketModule, 
    UsersModule,
    ThrottlerModule.forRoot([{name: 'short', ttl: 1000, limit: 3,}, //no more than 3 requests in 1 sec
    {name: 'long', ttl: 60000, limit: 100,}]),
    MyLoggerModule //limit the request; no more than 100 request in 1 min. -> 60000 is 1 min
    
  ],
  controllers: [AppController],
  providers: [AppService, {provide:APP_GUARD, useClass: ThrottlerGuard,}],
})
export class AppModule {}
