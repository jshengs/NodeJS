import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket} from 'socket.io';

@WebSocketGateway({ namespace: '/ws' })
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer() server: Server;

  private connectedClients: Set<Socket> = new Set();

  handleConnection(socket: Socket) {
    this.connectedClients.add(socket);
    console.log('Client connected:', socket.id);
  }

  handleDisconnect(socket: Socket) {
    this.connectedClients.delete(socket);
    console.log('Client disconnected:', socket.id);
  }

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }

  sendToClients(message: string) {
    this.server.emit('message', message);
  }
}