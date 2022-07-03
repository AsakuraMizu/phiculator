export async function readbin(files: FileList): Promise<ArrayBuffer> {
  if (files.length === 0) return new ArrayBuffer(0);
  const file = files[0];
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result as ArrayBuffer);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export async function readtext(files: FileList): Promise<string> {
  if (files.length === 0) return '';
  const file = files[0];
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
