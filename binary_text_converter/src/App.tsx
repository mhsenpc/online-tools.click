import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [binary, setBinary] = useState('');
  const [mode, setMode] = useState<'text-to-binary' | 'binary-to-text'>('text-to-binary');

  const textToBinary = (t: string) => {
    return t.split('').map(char => {
      return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
  };

  const binaryToText = (b: string) => {
    const cleaned = b.replace(/[^01\s]/g, '');
    try {
      return cleaned.split(/\s+/).filter(Boolean).map(bin => {
        return String.fromCharCode(parseInt(bin, 2));
      }).join('');
    } catch {
      return '';
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    if (mode === 'text-to-binary') {
      setBinary(textToBinary(val));
    }
  };

  const handleBinaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setBinary(val);
    if (mode === 'binary-to-text') {
      setText(binaryToText(val));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Binary ↔ Text Converter</h1>
        <p className="text-gray-600">Convert between ASCII text and binary code (0s and 1s).</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <label className="block text-sm font-medium mb-2">Text</label>
          <textarea
            value={text}
            onChange={handleTextChange}
            className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Type text here..."
          />
        </section>
        <section>
          <label className="block text-sm font-medium mb-2">Binary</label>
          <textarea
            value={binary}
            onChange={handleBinaryChange}
            className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Type binary here (e.g., 01000001)..."
          />
        </section>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => {
            setMode('text-to-binary');
            setBinary(textToBinary(text));
          }}
          className={`px-4 py-2 rounded ${mode === 'text-to-binary' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Convert Text to Binary
        </button>
        <button
          onClick={() => {
            setMode('binary-to-text');
            setText(binaryToText(binary));
          }}
          className={`px-4 py-2 rounded ${mode === 'binary-to-text' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Convert Binary to Text
        </button>
      </div>
    </div>
  );
}

export default App;
