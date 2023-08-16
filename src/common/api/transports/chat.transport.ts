import { API_URL } from 'common/constants';
import { ApiEndpoints } from 'common/constants/api-endpoints.ts';
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
