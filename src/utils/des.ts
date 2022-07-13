import forge from 'node-forge';

export const key = 'P\x00G\x00R\x00S\x00';
export const iv = key;

export default function decrypt(source: string) {
  const decipher = forge.cipher.createDecipher('DES-CBC', key);
  decipher.start({ iv });
  decipher.update(forge.util.createBuffer(window.atob(decodeURIComponent(source))));
  decipher.finish();
  const td = new TextDecoder('utf-16le');
  return td.decode(forge.util.binary.hex.decode(decipher.output.toHex()));
}
