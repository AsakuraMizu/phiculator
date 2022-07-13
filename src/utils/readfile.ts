export async function readbin(files: FileList): Promise<ArrayBuffer> {
  if (files.length === 0) return new ArrayBuffer(0);
  const file = files[0];
  return await file.arrayBuffer();
}

export async function readtext(files: FileList): Promise<string> {
  if (files.length === 0) return '';
  const file = files[0];
  return await file.text();
}
