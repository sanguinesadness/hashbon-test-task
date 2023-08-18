import { BOT_INIT_MESSAGE, MessageSenderType } from 'common/constants';
import { Message } from 'common/types';
import { handleReadableStreamResponse } from 'common/utils';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { sendMessage, SendMessageRequestModel } from '../api';

class ChatService {
  private _currentMessage: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private _messages: BehaviorSubject<Array<Message>> = new BehaviorSubject<
    Array<Message>
  >([]);
  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public currentMessage$: Observable<string> =
    this._currentMessage.asObservable();
  public messages$: Observable<Array<Message>> = this._messages.asObservable();
  public messagesSorted$: Observable<Array<Message>> = this.messages$.pipe(
    map((messages) =>
      messages
        .slice()
        .filter((msg) => !!msg.content)
        .sort((a, b) => a.timestamp - b.timestamp)
    )
  );
  public isLoading$: Observable<boolean> = this._isLoading.asObservable();

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

  private updateMessage(id: string, content: string): void {
    const messages = this._messages.value;
    const newMessages = messages.map((msg: Message) => {
      if (msg.id === id) {
        return new Message({ ...msg, content: content });
      }
      return msg;
    });
    this._messages.next(newMessages);
  }

  public init(): void {
    this.addMessage(
      new Message({
        type: MessageSenderType.BOT,
        content: BOT_INIT_MESSAGE
      })
    );
  }

  public reset(): void {
    this._currentMessage.next('');
    this._messages.next([]);
  }

  public requestMessageSend(message: string): Promise<void> {
    if (!message) {
      return Promise.reject();
    }
    this._isLoading.next(true);

    // // Remove current message, add it to message history
    // if (this._currentMessage.value) {
    //   this.addMessage(
    //     new Message({
    //       type: MessageSenderType.BOT,
    //       content: this._currentMessage.value
    //     })
    //   );
    //   this._currentMessage.next('');
    // }

    this.addMessage(
      new Message({
        type: MessageSenderType.USER,
        content: message
      })
    );

    const newBotMessage = new Message({
      type: MessageSenderType.BOT,
      content: ''
    });
    this.addMessage(newBotMessage);

    const payload = new SendMessageRequestModel({ message });
    return sendMessage(payload)
      .then(
        handleReadableStreamResponse(
          (value: string) => {
            this.updateCurrentMessage((prev: string) => {
              return prev.concat(value);
            });
          },
          () => {
            this.updateMessage(newBotMessage.id, this._currentMessage.value);
            this._currentMessage.next('');
          }
        )
      )
      .finally(() => {
        this._isLoading.next(false);
      });
  }
}

export const chatService = new ChatService();
