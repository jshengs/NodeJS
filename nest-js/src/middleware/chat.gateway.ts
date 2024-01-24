import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

class ChatMessage{
    nickname: string;
    message: string;
}

@WebSocketGateway()
export class ChatGateway{
    
    @SubscribeMessage('text-chat')
    handleMessage(@MessageBody() message: ChatMessage){
        console.log(message);
    }
}