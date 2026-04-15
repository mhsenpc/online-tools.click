import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [csvOutput, setCsvOutput] = useState('');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [allFields, setAllFields] = useState<string[]>([]);

  const convertAndFilter = () => {
    try {
      const data = JSON.parse(input);
      if (!Array.isArray(data)) return;
      
      const fields = Array.from(new Set(data.flatMap(d => Object.keys(d))));
      setAllFields(fields);
      
      const filteredData = data.map(item => {
        const filteredItem: any = {};
        (selectedFields.length > 0 ? selectedFields : fields).forEach(f => {
            filteredItem[f] = item[f] || '';
        });
        return filteredItem;
      });

      const headers = selectedFields.length > 0 ? selectedFields : fields;
      const csv = [
        headers.join(','),
        ...filteredData.map(item => headers.map(h => JSON.stringify(item[h])).join(','))
      ].join('\n');
      
      setCsvOutput(csv);
    } catch (e) {
      setCsvOutput('Error: Invalid JSON');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Advanced JSON to CSV Converter</h1>
      <textarea 
        style={{ width: '100%', height: '150px', marginBottom: '1rem' }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste JSON array here..."
      />
      <button onClick={convertAndFilter}>Generate Preview</button>
      
      <div style={{ margin: '1rem 0' }}>
        <h3>Select Columns:</h3>
        {allFields.map(f => (
          <label key={f}>
            <input type="checkbox" checked={selectedFields.includes(f)} onChange={(e) => {
              if (e.target.checked) setSelectedFields([...selectedFields, f]);
              else setSelectedFields(selectedFields.filter(s => s !== f));
            }} /> {f}
          </label>
        ))}
      </div>
      
      <textarea 
        style={{ width: '100%', height: '200px', marginTop: '1rem' }}
        value={csvOutput}
        readOnly
      />
    </div>
  );
}

export default App;
