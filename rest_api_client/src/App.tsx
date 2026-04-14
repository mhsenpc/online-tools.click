import React, { useState } from 'react';
import { Send, History, Folder, Save, Trash2 } from 'lucide-react';

export default function App() {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const startTime = performance.now();
      const res = await fetch(url, {
        method,
        body: ['GET', 'HEAD'].includes(method) ? null : body,
        headers: { 'Content-Type': 'application/json' },
      });
      const endTime = performance.now();
      const data = await res.json();
      setResponse({
        status: res.status,
        time: Math.round(endTime - startTime),
        data,
      });
    } catch (err: any) {
      setResponse({ status: 'Error', data: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-['Syne']">REST API Client</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 md:col-span-3 space-y-4">
          <div className="flex gap-2">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="bg-[#111] border border-gray-800 p-2 rounded"
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
              className="flex-1 bg-[#111] border border-gray-800 p-2 rounded"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-600 px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50"
            >
              <Send size={16} /> Send
            </button>
          </div>

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Request Body (JSON)"
            className="w-full h-48 bg-[#111] border border-gray-800 p-4 rounded font-mono text-sm"
          />

          {response && (
            <div className="bg-[#111] border border-gray-800 p-4 rounded">
              <div className="flex justify-between mb-2 text-sm text-gray-400">
                <span>Status: {response.status}</span>
                <span>Time: {response.time}ms</span>
              </div>
              <pre className="font-mono text-sm overflow-auto">
                {JSON.stringify(response.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
