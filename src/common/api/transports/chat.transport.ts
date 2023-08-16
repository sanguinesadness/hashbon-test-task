import { API_URL, ApiEndpoints } from 'common/constants';
import { SendMessageRequestModel } from '../models';

export function sendMessage(
  data: SendMessageRequestModel
): Promise<ReadableStream<Uint8Array> | null> {
  return fetch(API_URL + ApiEndpoints.SEND_MESSAGE, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response: Response) => response.body);
}
