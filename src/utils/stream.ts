import type { ReadableStream, WritableStream } from 'web-streams-polyfill/ponyfill';

export async function readstream(stream: ReadableStream<Uint8Array>): Promise<Uint8Array> {
  const reader = stream.getReader();
  const bufs: Uint8Array[] = [];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bufs.push(value);
  }

  const result = new Uint8Array(bufs.reduce((total, buf) => total + buf.byteLength, 0));
  bufs.reduce((offset, buf) => {
    result.set(new Uint8Array(buf), offset);
    return offset + buf.byteLength;
  }, 0);
  return result;
}

export async function writestream(
  stream: WritableStream<Uint8Array>,
  data: Uint8Array
): Promise<void> {
  const writer = stream.getWriter();
  await writer.ready;
  await writer.write(data);
  await writer.ready;
}
