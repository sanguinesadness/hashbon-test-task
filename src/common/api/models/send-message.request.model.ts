export class SendMessageRequestModel {
  message!: string;

  constructor(data: SendMessageRequestModel) {
    Object.assign(this, data);
  }
}
