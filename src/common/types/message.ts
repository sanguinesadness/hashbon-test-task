import { v4 } from 'uuid';
import { MessageSenderType } from '../constants';

export type TMessage = {
  id: string;
  content: string;
  timestamp: number;
  type: MessageSenderType;
};

export class Message implements TMessage {
  id!: string;
  content!: string;
  timestamp!: number;
  type!: MessageSenderType;

  constructor(data: Pick<Message, 'content' | 'type'>) {
    this.id = v4();
    this.content = data.content;
    this.type = data.type;
    this.timestamp = new Date(Date.now()).getTime();
  }
}
