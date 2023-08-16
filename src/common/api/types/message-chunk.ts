export enum MessageChunkStatus {
  CONTENT = 'content',
  DONE = 'done'
}

export type TMessageChunk = {
  status: MessageChunkStatus;
  value: string | null;
};
