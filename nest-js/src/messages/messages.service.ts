import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  message: Message[] = [{name: 'Marius', text: 'Hello World...'}];
  clientToUser = {};

  identify(name: string, clientId: string){
    this.clientToUser[clientId] = name;
    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string){
    return this.clientToUser[clientId]
  }

  create(createMessageDto: CreateMessageDto) {
    const message = {...createMessageDto};
    return this.message.push(message);
  }

  findAll() {
    return this.message;
  }
}
