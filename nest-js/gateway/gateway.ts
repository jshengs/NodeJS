import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()//cors insert here
export class MyGateway implements OnModuleInit{


    @WebSocketServer()
    server:Server;

    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log('Connected!');
        });
    }

    //send message
    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: any){
        console.log(body);
        this.server.emit('onMessage', {
            content: body, 
        });
    }
}