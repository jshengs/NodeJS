import { ArgumentsHost, Catch, WsExceptionFilter } from "@nestjs/common";

@Catch()
export class WebSocketExceptionFilter implements WsExceptionFilter{
    catch(exception: any, host: ArgumentsHost){
        const socket = host.switchToWs().getClient();
        socket.emit('exception', {
            status:'error', 
            message:'Ws message is invalid',
        });
        // throw new Error("Metod not implemented");
    }
}