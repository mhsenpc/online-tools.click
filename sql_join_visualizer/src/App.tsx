import React, { useState } from 'react';
import VennDiagram from './VennDiagram';

function App() {
  const [table1, setTable1] = useState('users');
  const [table2, setTable2] = useState('orders');
  const [column1, setColumn1] = useState('id');
  const [column2, setColumn2] = useState('user_id');
  const [joinType, setJoinType] = useState('INNER JOIN');

  const query = `SELECT * FROM ${table1}\n${joinType} ${table2}\n  ON ${table1}.${column1} = ${table2}.${column2};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(query);
    alert('SQL copied to clipboard!');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#fff', marginBottom: '1.5rem' }}>SQL Join Visualizer</h1>

      {/* Join Type Selection */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ color: '#fff', marginRight: '0.5rem', fontWeight: 'bold' }}>Join Type:</label>
        <select
          value={joinType}
          onChange={(e) => setJoinType(e.target.value)}
          style={{
            padding: '0.5rem',
            backgroundColor: '#1a1a1a',
            color: '#fff',
            border: '1px solid #333',
            borderRadius: '4px',
            fontSize: '1rem'
          }}
        >
          <option>INNER JOIN</option>
          <option>LEFT JOIN</option>
          <option>RIGHT JOIN</option>
          <option>FULL OUTER JOIN</option>
        </select>
      </div>

      {/* Venn Diagram Visualization */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0', backgroundColor: '#1a1a1a', padding: '1.5rem', borderRadius: '8px' }}>
        <VennDiagram joinType={joinType} table1={table1} table2={table2} />
      </div>

      {/* Table Configuration */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Table Configuration</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ color: '#fff', display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Left Table</label>
            <input
              placeholder="Table 1"
              value={table1}
              onChange={(e) => setTable1(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#1a1a1a',
                color: '#fff',
                border: '1px solid #333',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
            <label style={{ color: '#fff', display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', marginTop: '0.5rem' }}>Join Column</label>
            <input
              placeholder="Column 1"
              value={column1}
              onChange={(e) => setColumn1(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#1a1a1a',
                color: '#fff',
                border: '1px solid #333',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ color: '#fff', display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Right Table</label>
            <input
              placeholder="Table 2"
              value={table2}
              onChange={(e) => setTable2(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#1a1a1a',
                color: '#fff',
                border: '1px solid #333',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
            <label style={{ color: '#fff', display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', marginTop: '0.5rem' }}>Join Column</label>
            <input
              placeholder="Column 2"
              value={column2}
              onChange={(e) => setColumn2(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#1a1a1a',
                color: '#fff',
                border: '1px solid #333',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>
      </div>

      {/* Generated SQL */}
      <div>
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Generated SQL</h3>
        <div style={{ backgroundColor: '#1a1a1a', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', border: '1px solid #333' }}>
          <pre style={{ margin: 0, color: '#4ade80', fontFamily: 'monospace', fontSize: '1rem', lineHeight: '1.6' }}>
            <code>{query}</code>
          </pre>
        </div>
        <button
          onClick={handleCopy}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          Copy SQL
        </button>
      </div>
    </div>
  );
}

export default App;
