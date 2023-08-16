import { BehaviorSubject, Observable } from 'rxjs';
import { sendMessage, SendMessageRequestModel } from '../api';
import { processChunk } from '../utils';

class ChatService {
  private _currentMessage: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  public currentMessage$: Observable<string> =
    this._currentMessage.asObservable();

  private updateCurrentMessage(
    callbackOrValue: ((value: string) => string) | string
  ): void {
    if (typeof callbackOrValue === 'function') {
      this._currentMessage.next(callbackOrValue(this._currentMessage.value));
    } else {
      this._currentMessage.next(callbackOrValue);
    }
  }

  public requestMessageSend(message: string): Promise<void> {
    if (!message) {
      return Promise.reject();
    }

    this.updateCurrentMessage('');
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
