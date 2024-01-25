import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway()//cors insert here
export class MyClass{

    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: any){
        console.log(body);
    }
}