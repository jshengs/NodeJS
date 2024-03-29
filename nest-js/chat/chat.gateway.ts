import { Logger } from "@nestjs/common";
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';



@WebSocketGateway({namespace: '/chat'})
export class ChatGateway implements OnGatewayInit{

    @WebSocketServer() was: Server;

    private logger: Logger = new Logger('ChatGateway');

    afterInit(server: any) {
        this.logger.log('Initialized');
    }

    @SubscribeMessage('chatToServer')
    handleMessage(client: Socket, message:{ sender: string, room: string, message: string}){
        this.was.to(message.room).emit('chatToClient', message);
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, room: string){
        client.join(room);
        client.emit('joinedRoom', room);
    }


    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(client: Socket, room: string){
        client.leave(room);
        client.emit('leftRoom', room);
    }



}