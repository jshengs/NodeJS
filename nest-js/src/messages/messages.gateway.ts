// message.gateway.ts

import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IsNotEmpty, IsString } from 'class-validator';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { WebSocketExceptionFilter } from 'src/socket/ws-exception.filter';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

class ChatMessage {
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseFilters(new WebSocketExceptionFilter())
export class MessagesGateway {

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('text-chat')
  @UsePipes(new ValidationPipe())
  handleMessage(@MessageBody() message: ChatMessage, @ConnectedSocket() client: Socket) {
    this.server.emit('text-chat', {
      ...message,
      time: new Date().toDateString(),
    });
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
