import React, { useState } from 'react';

const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy'];
const jobs = ['Developer', 'Designer', 'Manager', 'Analyst', 'Tester', 'Architect'];
const countries = ['USA', 'Canada', 'UK', 'Germany', 'Japan', 'Australia'];

function App() {
  const [count, setCount] = useState(1);
  const [users, setUsers] = useState<any[]>([]);

  const generateUsers = () => {
    const newUsers = Array.from({ length: count }, () => ({
      name: names[Math.floor(Math.random() * names.length)],
      email: `${names[Math.floor(Math.random() * names.length)].toLowerCase()}@example.com`,
      job: jobs[Math.floor(Math.random() * jobs.length)],
      country: countries[Math.floor(Math.random() * countries.length)],
    }));
    setUsers(newUsers);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Random User Generator</h1>
      <label>
        Count:
        <input type="number" value={count} onChange={(e) => setCount(Math.max(1, Number(e.target.value)))} min="1" max="50" />
      </label>
      <button onClick={generateUsers}>Generate</button>
      <div style={{ marginTop: '1rem' }}>
        <textarea 
          style={{ width: '100%', height: '300px' }}
          value={JSON.stringify(users, null, 2)}
          readOnly
        />
        <button onClick={() => navigator.clipboard.writeText(JSON.stringify(users, null, 2))}>Copy JSON</button>
      </div>
    </div>
  );
}

export default App;
