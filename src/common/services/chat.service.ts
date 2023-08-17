import { BOT_INIT_MESSAGE, MessageSenderType } from 'common/constants';
import { Message } from 'common/types';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { sendMessage, SendMessageRequestModel } from '../api';
import { processChunk } from '../utils';

class ChatService {
  private _currentMessage: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private _messages: BehaviorSubject<Array<Message>> = new BehaviorSubject<
    Array<Message>
  >([]);

  public currentMessage$: Observable<string> =
    this._currentMessage.asObservable();
  public messages$: Observable<Array<Message>> = this._messages.asObservable();
  public messagesSorted$: Observable<Array<Message>> = this.messages$.pipe(
    map((messages) =>
      messages.slice().sort((a, b) => a.timestamp - b.timestamp)
    )
  );

  private updateCurrentMessage(
    callbackOrValue: ((value: string) => string) | string
  ): void {
    if (typeof callbackOrValue === 'function') {
      this._currentMessage.next(callbackOrValue(this._currentMessage.value));
    } else {
      this._currentMessage.next(callbackOrValue);
    }
  }

  private addMessage(value: Message): void {
    const messages = this._messages.value;
    this._messages.next([...messages, value]);
  }

  public init(): void {
    this._currentMessage.next(BOT_INIT_MESSAGE);
  }

  public reset(): void {
    this._currentMessage.next('');
    this._messages.next([]);
  }

  public requestMessageSend(message: string): Promise<void> {
    if (!message) {
      return Promise.reject();
    }

    if (this._currentMessage.value) {
      this.addMessage(
        new Message({
          type: MessageSenderType.BOT,
          content: this._currentMessage.value
        })
      );
      this._currentMessage.next('');
    }

    this.addMessage(
      new Message({
        type: MessageSenderType.USER,
        content: message
      })
    );

    const payload = new SendMessageRequestModel({ message });
    return sendMessage(payload).then(
      (resp: ReadableStream<Uint8Array> | null) => {
        const writableStream = new WritableStream({
          write: (chunk: BufferSource) => {
            processChunk(chunk, (value: string) =>
              this.updateCurrentMessage((prev: string) => {
                return prev.concat(value);
              })
            );
          }
        });

        void resp?.pipeTo(writableStream);
      }
    );
  }
}

export const chatService = new ChatService();
