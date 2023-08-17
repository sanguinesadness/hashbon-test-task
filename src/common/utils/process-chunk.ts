import { MessageChunkStatus, TMessageChunk } from 'common/api';

export function processChunk(
  chunk: BufferSource,
  onContent: (value: string) => void,
  onDone?: VoidFunction
): void {
  const result = new TextDecoder().decode(chunk);
  let buffer = '';

  for (let i = 0; i < result.length; i++) {
    buffer += result[i];

    try {
      const chunk = JSON.parse(buffer) as TMessageChunk;
      if (chunk.status === MessageChunkStatus.CONTENT) {
        console.log(
          new Date(Date.now()).getTime(),
          'Received chunk value:',
          chunk.value
        );
        chunk.value && onContent(chunk.value);
      } else if (chunk.status === MessageChunkStatus.DONE) {
        console.log('End of chunks.');
        onDone && onDone();
      }
      buffer = '';
    } catch {
      // Continue attempts to parse JSON
    }
  }
}
