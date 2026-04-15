import React, { useState } from 'react';
import VennDiagram from './VennDiagram';

function App() {
  const [table1, setTable1] = useState('users');
  const [table2, setTable2] = useState('orders');
  const [column1, setColumn1] = useState('id');
  const [column2, setColumn2] = useState('user_id');
  const [joinType, setJoinType] = useState('INNER JOIN');

  const query = `${joinType} ${table2} ON ${table1}.${column1} = ${table2}.${column2}`;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>SQL Join Visualizer</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <input placeholder="Table 1" value={table1} onChange={(e) => setTable1(e.target.value)} />
        <input placeholder="Table 2" value={table2} onChange={(e) => setTable2(e.target.value)} />
        <input placeholder="Column 1" value={column1} onChange={(e) => setColumn1(e.target.value)} />
        <input placeholder="Column 2" value={column2} onChange={(e) => setColumn2(e.target.value)} />
      </div>
        <select value={joinType} onChange={(e) => setJoinType(e.target.value)}>
          <option>INNER JOIN</option>
          <option>LEFT JOIN</option>
          <option>RIGHT JOIN</option>
          <option>FULL OUTER JOIN</option>
        </select>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
          <VennDiagram joinType={joinType} />
        </div>
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#333' }}>
        <code>SELECT * FROM {table1} {query}</code>
      </div>
      <button onClick={() => navigator.clipboard.writeText(`SELECT * FROM ${table1} ${query}`)}>Copy SQL</button>
    </div>
  );
}

export default App;
