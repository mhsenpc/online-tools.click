import React, { useState, useEffect, useRef } from 'react';
import * as jsonld from 'jsonld';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import './index.css';

export default function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [activeTab, setActiveTab] = useState('preview');
  const [error, setError] = useState('');
  const networkRef = useRef<HTMLDivElement>(null);
  
  const validateAndVisualize = async () => {
    try {
      const json = JSON.parse(jsonInput);
      const expanded = await jsonld.expand(json);
      setError('');
      
      const nodes = new DataSet<any>([]);
      const edges = new DataSet<any>([]);
      
      const traverse = (node: any, parentId: string | null) => {
        if (typeof node !== 'object' || node === null) return;
        
        const id = Math.random().toString(36).substr(2, 9);
        const label = node['@type'] || node['@id'] || 'Node';
        
        nodes.add({ id, label });
        if (parentId) {
          edges.add({ from: parentId, to: id });
        }
        
        Object.keys(node).forEach(key => {
          if (Array.isArray(node[key])) {
            node[key].forEach((child: any) => traverse(child, id));
          } else {
            traverse(node[key], id);
          }
        });
      };
      
      expanded.forEach((node: any) => traverse(node, null));
      
      if (networkRef.current) {
        new Network(networkRef.current, { nodes, edges }, {});
      }
      
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>JSON-LD Playground & Validator</h1>
      <textarea 
        value={jsonInput} 
        onChange={(e) => setJsonInput(e.target.value)} 
        placeholder="Paste JSON-LD here..."
      />
      <button onClick={validateAndVisualize}>Validate & Visualize</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <div className="tabs">
        <div className={`tab ${activeTab === 'preview' ? 'active' : ''}`} onClick={() => setActiveTab('preview')}>Preview</div>
        <div className={`tab ${activeTab === 'graph' ? 'active' : ''}`} onClick={() => setActiveTab('graph')}>Graph</div>
      </div>
      
      {activeTab === 'preview' && <pre>{JSON.stringify(JSON.parse(jsonInput || '{}'), null, 2)}</pre>}
      {activeTab === 'graph' && <div ref={networkRef} style={{ height: '400px', border: '1px solid #ccc' }}></div>}
    </div>
  );
}
