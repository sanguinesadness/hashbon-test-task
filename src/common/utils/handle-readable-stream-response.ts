import { MessageChunkStatus, TMessageChunk } from 'common/api';
import { extractChunkBrokenPart } from './extract-chunk-broken-part.ts';

export const handleReadableStreamResponse =
  (onContent: (value: string) => void, onDone: VoidFunction) =>
  (resp: ReadableStream<Uint8Array> | null): void => {
    let prevBrokenPart = '';
    const writableStream = new WritableStream({
      write: async (chunk: BufferSource) => {
        let chunkDecoded = new TextDecoder().decode(chunk);

        if (prevBrokenPart) {
          chunkDecoded = prevBrokenPart + chunkDecoded;
          prevBrokenPart = '';
        }

        const brokenPart = extractChunkBrokenPart(chunkDecoded);
        if (brokenPart) {
          prevBrokenPart = brokenPart;
        }

        let buffer = '';

        for (let i = 0; i < chunkDecoded.length; i++) {
          buffer += chunkDecoded[i];

          try {
            const chunk = JSON.parse(buffer) as TMessageChunk;
            if (chunk.status === MessageChunkStatus.CONTENT) {
              chunk.value && onContent(chunk.value);
              buffer = '';
            } else if (chunk.status === MessageChunkStatus.DONE) {
              onDone();
              return;
            }
          } catch {
            // Continue attempts to parse JSON
          }
        }
      }
    });

    void resp?.pipeTo(writableStream);
  };
