import axios, { AxiosInstance } from 'axios';
import { API_URL } from 'common/constants';
import { SendMessageRequestModel } from './models';

const CHAT_ENDPOINT = '/chat/send-message';

class MessagesTransport {
  private readonly _axios: AxiosInstance;

  constructor() {
    this._axios = axios.create({
      baseURL: API_URL
    });
  }

  public sendMessage(payload: SendMessageRequestModel): Promise<any> {
    return this._axios.post(CHAT_ENDPOINT, payload).then(console.log);
  }
}

export const messagesTransport = new MessagesTransport();
