export function extractChunkBrokenPart(input: string): string | null {
  const chunks = input.match(/(\{.*?\})/g);

  if (!chunks) {
    return null;
  }

  let result = input;
  chunks.forEach((chunk: string) => {
    result = result.replace(chunk, '');
  });
  return result;
}
