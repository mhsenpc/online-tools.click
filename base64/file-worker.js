/**
 * Web Worker: File → Base64 encoding
 *
 * Receives: { file: File, urlSafe: boolean }
 * Posts back: { type: 'progress', percent: number }
 *           | { type: 'done', result: string, mimeType: string, fileName: string }
 *           | { type: 'error', message: string }
 */
self.addEventListener('message', (e) => {
  const { file, urlSafe } = e.data;

  const CHUNK = 1024 * 1024; // 1 MB chunks
  const reader = new FileReader();
  let offset = 0;
  let binaryStr = '';

  function readNextChunk() {
    const slice = file.slice(offset, Math.min(offset + CHUNK, file.size));
    reader.readAsArrayBuffer(slice);
  }

  const uint8Array = new Uint8Array(file.size);

  reader.onload = (ev) => {
    const chunk = new Uint8Array(ev.target.result);
    uint8Array.set(chunk, offset);
    offset += chunk.length;

    const percent = Math.min(100, Math.round((offset / file.size) * 100));
    self.postMessage({ type: 'progress', percent });

    if (offset < file.size) {
      readNextChunk();
    } else {
      // All chunks read — encode to Base64
      try {
        let binary = "";
        for (let i = 0; i < uint8Array.byteLength; i++) {
            binary += String.fromCharCode(uint8Array[i]);
        }
        let b64 = btoa(binary);
        if (urlSafe) {
          b64 = b64.replace(/\+/g, '-').replace(/\//g, '_');
        }
        self.postMessage({
          type: 'done',
          result: b64,
          mimeType: file.type || 'application/octet-stream',
          fileName: file.name,
        });
      } catch (err) {
        self.postMessage({ type: 'error', message: err.message });
      }
    }
  };

  reader.onerror = () => {
    self.postMessage({ type: 'error', message: 'Failed to read file.' });
  };

  readNextChunk();
});
