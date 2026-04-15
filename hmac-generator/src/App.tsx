import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

type Algorithm = 'SHA-1' | 'SHA-256' | 'SHA-512';

const HMACGenerator: React.FC = () => {
  const [message, setMessage] = useState('');
  const [secret, setSecret] = useState('');
  const [algo, setAlgo] = useState<Algorithm>('SHA-256');
  const [hash, setHash] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const generateHMAC = async () => {
      if (!message || !secret) {
        setHash('');
        return;
      }

      const encoder = new TextEncoder();
      const keyData = encoder.encode(secret);
      const messageData = encoder.encode(message);

      const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: algo },
        false,
        ['sign']
      );

      const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
      
      const hashArray = Array.from(new Uint8Array(signature));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setHash(hashHex);
    };

    generateHMAC();
  }, [message, secret, algo]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">HMAC Generator</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Algorithm</label>
          <select 
            value={algo} 
            onChange={(e) => setAlgo(e.target.value as Algorithm)}
            className="w-full border rounded p-2"
          >
            <option value="SHA-1">SHA-1</option>
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-512">SHA-512</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Secret Key</label>
          <input 
            type="text" 
            value={secret} 
            onChange={(e) => setSecret(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter secret key..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded p-2 h-32"
            placeholder="Enter message..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">HMAC Result</label>
          <div className="flex items-center gap-2 border rounded p-2 bg-gray-50 font-mono text-sm break-all">
            <span className="flex-grow">{hash || 'Waiting for input...'}</span>
            <button 
              onClick={copyToClipboard}
              disabled={!hash}
              className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HMACGenerator;
